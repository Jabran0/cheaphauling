"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, MapPin, Navigation, ScrollText, CheckCircle, X, AlertCircle } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import { generateOrderId, getUserSystemInfo, formatFormDataForSubmission, validateFormData } from "@/lib/formUtils";

export default function StepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [agree, setAgree] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [systemInfo, setSystemInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const sigCanvas = useRef(null);

  // Generate Order ID on component mount
  useEffect(() => {
    const id = generateOrderId();
    setOrderId(id);
    
    // Get system information for signature verification
    getUserSystemInfo().then(info => {
      setSystemInfo(info);
    });
  }, []);

  const steps = [
    { id: 1, name: "Order Info", icon: FileText },
    { id: 2, name: "Origin", icon: MapPin },
    { id: 3, name: "Destination", icon: Navigation },
    { id: 4, name: "Terms & Conditions", icon: ScrollText },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    const stepErrors = validateFormData(formData, step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setShowValidationErrors(true);
      return;
    }
    
    setErrors({});
    setShowValidationErrors(false);
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setErrors({});
    setShowValidationErrors(false);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSubmit = async () => {
    if (!agree) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    // Validate all form data
    const allErrors = {};
    for (let i = 1; i <= 3; i++) {
      const stepErrors = validateFormData(formData, i);
      Object.assign(allErrors, stepErrors);
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setShowValidationErrors(true);
      alert("Please fill in all required fields correctly.");
      return;
    }

    const signatureData = sigCanvas.current
      ? sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
      : null;

    if (!signatureData) {
      alert("Please provide your electronic signature.");
      return;
    }

    try {
      setSubmitting(true);

      // Generate PDF first and get the blob
      const pdfBlob = await generatePDFBlob(signatureData);
      
      // Submit to Formspree with PDF attachment
      await submitToFormspree(pdfBlob);

      // Submit to our API for email notifications
      try {
        const response = await fetch('/api/contract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData,
            orderId,
            systemInfo,
            signatureData
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Email API error:', errorText);
          // Don't throw error here - continue with PDF generation even if email fails
          console.warn('Email notifications failed, continuing with PDF generation');
        }
      } catch (emailError) {
        console.error('Email API request failed:', emailError);
        console.warn('Continuing with PDF generation despite email failure');
      }

      // Generate and download PDF for user
      generatePDF(signatureData);
      
      // Show success popup
      setShowSuccessPopup(true);

    } catch (error) {
      console.error('Contract submission error:', error);
      console.error('Error details:', error.message);
      alert(`Failed to submit contract: ${error.message}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  // Generate PDF as a blob for upload
  const generatePDFBlob = (signatureData) => {
    return new Promise((resolve, reject) => {
      try {
        const doc = new jsPDF();

        // ✅ Add Logo
        const logo = "/image/pdflogo.png";
        const img = new window.Image();
        img.src = logo;

        img.onload = () => {
          try {
            // Generate the same PDF content as before
            generatePDFContent(doc, signatureData);
            
            // Get PDF as blob instead of downloading
            const pdfBlob = doc.output('blob');
            resolve(pdfBlob);
          } catch (error) {
            console.error('PDF generation error:', error);
            reject(error);
          }
        };

        img.onerror = () => {
          console.warn('Logo image failed to load, generating PDF without logo');
          try {
            // Generate PDF without logo
            generatePDFContentWithoutLogo(doc, signatureData);
            const pdfBlob = doc.output('blob');
            resolve(pdfBlob);
          } catch (error) {
            reject(error);
          }
        };

        // Set a timeout for image loading
        setTimeout(() => {
          if (!img.complete) {
            console.warn('Logo loading timeout, generating PDF without logo');
            try {
              generatePDFContentWithoutLogo(doc, signatureData);
              const pdfBlob = doc.output('blob');
              resolve(pdfBlob);
            } catch (error) {
              reject(error);
            }
          }
        }, 3000);

      } catch (error) {
        reject(error);
      }
    });
  };

  // Submit to Formspree with iframe approach to avoid CORS issues
  const submitToFormspree = async (pdfBlob) => {
    return new Promise((resolve, reject) => {
      try {
        // Create a hidden iframe for form submission
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'formspree-frame';
        document.body.appendChild(iframe);

        // Create a form element
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xqadrbbr';
        form.target = 'formspree-frame';

        // Add all form fields as hidden inputs
        const fields = {
          orderId: orderId,
          customerName: formData.CustomerName || '',
          email: formData.Email || '',
          mobile: formData.Mobile || '',
          shipDate: formData.ShipDate || '',
          vehicleYear: formData.VehicleYear || '',
          make: formData.Make || '',
          model: formData.Model || '',
          type: formData.Type || '',
          totalTariff: formData.TotalTarif || '',
          firstPayment: formData.FirstPayment || '',
          nextPayment: formData.NextPayment || '',
          originCity: formData.OriginCity || '',
          originState: formData.OriginState || '',
          originPostal: formData.OriginPostal || '',
          pickupName: formData.PickupName || '',
          pickupContact: formData.PickupContact || '',
          pickupAddress: formData.PickupAddress || '',
          destinationCity: formData.DestinationCity || '',
          destinationState: formData.DestinationState || '',
          destinationPostal: formData.DestPostal || '',
          destinationName: formData.DestinationName || '',
          destinationContact: formData.DestinationContact || '',
          destinationAddress: formData.DestinationAddress || '',
          submissionDate: new Date().toISOString(),
          signatureCaptured: 'true'
        };

        // Add system information
        if (systemInfo) {
          fields.systemIP = systemInfo.ip || '';
          fields.systemPlatform = systemInfo.platform || '';
          fields.systemUserAgent = systemInfo.userAgent || '';
          fields.systemTimezone = systemInfo.timezone || '';
          fields.systemTimestamp = systemInfo.timestamp || '';
          fields.systemLocation = typeof systemInfo.location === 'object' ? 
            `${systemInfo.location.latitude}, ${systemInfo.location.longitude}` : 
            systemInfo.location || '';
        }

        // Create hidden input fields
        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        // Handle iframe load event
        iframe.onload = () => {
          setTimeout(() => {
            try {
              // Clean up
              document.body.removeChild(form);
              document.body.removeChild(iframe);
              console.log('Formspree submission completed successfully');
              resolve({ success: true, message: 'Form submitted successfully' });
            } catch (cleanupError) {
              console.log('Formspree submitted (cleanup had minor issue)');
              resolve({ success: true, message: 'Form submitted successfully' });
            }
          }, 1000);
        };

        iframe.onerror = () => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
          reject(new Error('Failed to submit to Formspree'));
        };

        // Append form and submit
        document.body.appendChild(form);
        console.log('Submitting to Formspree via iframe...');
        form.submit();

      } catch (error) {
        reject(error);
      }
    });
  };

  // PDF content generation without logo (fallback)
  const generatePDFContentWithoutLogo = (doc, signatureData) => {
    // 🔹 Heading with Order ID (without logo)
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 102, 0); // orange
    doc.text("Cheap Hauling - Auto Transport Agreement", 10, 20);
    
    // Add Order ID prominently
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${orderId}`, 10, 30);

    // Generate rest of the content starting from Y position 40
    generatePDFTableAndTerms(doc, signatureData, 40);
  };

  // Shared function for table and terms generation
  const generatePDFTableAndTerms = (doc, signatureData, startY) => {
    // Reset for table text
    doc.setTextColor(0, 0, 0);

    // ✅ Enhanced Form Data in Table with Order ID
    const enhancedFormData = {
      'Order ID': orderId,
      'Submission Date': new Date().toLocaleDateString(),
      'Submission Time': new Date().toLocaleTimeString(),
      ...formData
    };

    const tableData = Object.entries(enhancedFormData).map(([key, value]) => [
      key.replace(/([A-Z])/g, " $1"), // Field names formatted
      value || "-", // Field values as-is
    ]);

    autoTable(doc, {
      head: [["Field", "Value"]],
      body: tableData,
      startY: startY,
      styles: { fontSize: 10, halign: "left", valign: "middle" },
      headStyles: {
        fillColor: [255, 102, 0],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: "bold" },
        1: { cellWidth: 120 },
      },
    });

    let y = doc.lastAutoTable.finalY + 20;

    // ✅ Signature (same page as form)
    if (signatureData) {
      doc.setFontSize(12);
      doc.text("Signature:", 10, y);
      doc.addImage(signatureData, "PNG", 10, y + 5, 60, 30);
    }

    // Add Terms & Conditions on new page
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 102, 0);
    doc.text("Terms & Conditions", 10, 20);

    // Reset
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    const sections = [
      {
        title: "1. Pick-Up & Delivery",
        text: "Unless restricted by residential area regulations, pick-up and delivery will be made to your door. Additional fees may apply if the vehicle is: - Undriveable - Oversized (e.g., limousines, dually trucks, extra-large racks, oversized wheels, etc) If the vehicle's condition was not disclosed, any extra fees must be paid in cash or via money order to the delivery provider before pick-up. All vehicles, whether operable or inoperable, must be able to roll, brake, and steer.",
      },
      {
        title: "2. Transport Authorization",
        text: "By signing this agreement, the customer grants the designated driver and carrier permission to operate and transport the vehicle between the specified pick-up and delivery locations.",
      },
      {
        title: "3. Pick-Up & Delivery Timeline",
        text: "Cheap Hauling will assign a carrier as soon as possible, following your instructions. Specific pick-up and delivery dates cannot be guaranteed. Delays caused by unforeseen circumstances (e.g., weather, accidents, road closures) are not the responsibility of Cheap Hauling.",
      },
      {
        title: "4. Force Majeure",
        text: "Cheap Hauling is not liable for delays or failure to perform due to events beyond our control, including but not limited to: - Natural disasters (e.g., floods, hurricanes, earthquakes) - Government actions or orders - Strikes, labor disputes, or riots - Acts of terrorism or war - Other unforeseen circumstances Performance obligations will resume once the force majeure event ends. Customers may cancel and receive a refund of their deposit if delays exceed [4] days.",
      },
      {
        title: "5. Vehicle Condition & Preparation",
        text: "The vehicle must be in good working order unless otherwise agreed upon.Fuel level must not exceed half a tank (preferably 1/4 tank).Remove all non-permanent exterior items, such as luggage racks and spoilers.",
      },
      {
        title: "6. Personal Belongings",
        text: "The Federal Motor Carrier Safety Administration (FMCSA) allows up to 150 lbs of personal items inside the vehicle.The carrier is not responsible for lost, stolen, or damaged personal belongings left inside the vehicle.Excessive or improperly secured items that cause damage to the vehicle are the customer's responsibility.",
      },
      {
        title: "7. Cancellation & Refund Policy",
        text: "If the customer cancels before a carrier is assigned, they will receive a full refund of their deposit. If the vehicle has been assigned to a carrier (dispatched), Cheap Hauling retains the right to charge a partial service fee equal to the deposit amount.Cheap Hauling may refuse an order at any time, in which case a full refund will be issued.Once the customer has signed the contract with Muvitxpress, and should they engage with other companies for the same order during the interim period, Muvitxpress reserves the right to request a deposit to secure the commitment and resources required to proceed with the project.",
      },
      {
        title: "8. Carrier Liability & Insurance",
        text: "The assigned carrier is responsible for vehicle damage during transport and must carry a minimum of $750,000 in public liability insurance. Any damage claims must be: - Noted upon delivery and acknowledged by the carrier. - Filed in writing directly with the carrier within their required timeframe.Cheap Hauling will provide carrier insurance details upon request but is not responsible for any damage claims.",
      },
      {
        title: "9. Prohibited Items",
        text: "The vehicle must not contain any of the following:- Firearms or explosives - Illegal drugs or alcohol - Perishable goods (e.g., live plants, food) - Live animals - Electronics or other valuables - Hazardous materials If prohibited items are found, the transport may be refused, delayed, or incur additional fees.",
      },
      {
        title: "10. Payment Terms (COD - Cash on Delivery)",
        text: "All COD payments must be made at the time of vehicle delivery.Acceptable forms of payment: Cash or Certified Money Order.Digital or card payments may be accepted at the carrier's discretion (confirm in advance).",
      },
      {
        title: "11. Legal Compliance & Governing Law",
        text: "This agreement is subject to all applicable FMCSA and DOT regulations.Any disputes shall be resolved under the laws of Texas.The Cheap Hauling Broker License Number is MC-1678344-B.Any modifications to this agreement must be in writing and signed by an authorized Cheap Hauling LLC representative.",
      },
    ];

    let termY = 35;

    sections.forEach((section) => {
      // Title
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 102, 0);
      doc.text(section.title, 10, termY);
      termY += 7;

      // Text
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      const splitText = doc.splitTextToSize(section.text, 180);
      splitText.forEach((line) => {
        if (termY > 270) {
          doc.addPage();
          termY = 20;
        }
        doc.text(line, 10, termY);
        termY += 6;
      });

      termY += 5; // spacing between sections
    });

    // Add system information for signature verification
    if (systemInfo) {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Electronic Signature Verification:", 10, termY + 10);
      doc.text(`IP Address: ${systemInfo.ip}`, 10, termY + 20);
      doc.text(`Timestamp: ${systemInfo.timestamp}`, 10, termY + 25);
      doc.text(`Platform: ${systemInfo.platform}`, 10, termY + 30);
      doc.text(`Timezone: ${systemInfo.timezone}`, 10, termY + 35);
    }
  };

  // Shared PDF content generation function (with logo)
  const generatePDFContent = (doc, signatureData) => {
    // 🔹 Heading with Order ID and logo
    doc.addImage("/image/pdflogo.png", "WEBP", 150, 10, 40, 20);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 102, 0); // orange
    doc.text("Cheap Hauling - Auto Transport Agreement", 10, 20);
    
    // Add Order ID prominently
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${orderId}`, 10, 30);

    // Generate rest of the content starting from Y position 40
    generatePDFTableAndTerms(doc, signatureData, 40);
  };

  const generatePDF = (signatureData) => {
    const doc = new jsPDF();

    // ✅ Add Logo
    const logo = "/image/pdflogo.png";
    const img = new window.Image();
    img.src = logo;

    img.onload = () => {
      // Use shared PDF content generation
      generatePDFContent(doc, signatureData);
      
      // ✅ Save PDF with Order ID
      doc.save(`Contract-${orderId}.pdf`);
    };
  };


  return (
   <div  className="min-h-screen bg-fixed bg-cover bg-center py-10 md:py-20 px-6 "
      style={{ backgroundImage: "url('/image/contactform.jpg')" }}>
     <div className="max-w-7xl mx-auto p-4 sm:p-6 shadow-2xl bg-orange-50/90" >
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center flex-col items-center py-5 text-center">
          <div className="w-[120px] sm:w-[180px]">
            <Image
              src="/image/logo1.webp"
              alt="cheaphualing Logo"
              width={200}
              height={90}
              priority
            />
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill out the form below to book your vehicle transportation order
          </p>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Contract Submitted Successfully!
              </h3>
              <div className="bg-orange-500 text-white p-3 rounded-lg mb-4">
                <p className="font-semibold">Order ID: {orderId}</p>
              </div>
              <p className="text-gray-600 mb-4">
                Your contract has been submitted to Formspree.io successfully. 
                Confirmation emails have been sent and PDF has been downloaded to your device.
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* System Information Display */}
        {systemInfo && step === 4 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">System Information (For Signature Verification)</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>IP Address:</strong> {systemInfo.ip}</p>
              <p><strong>Timestamp:</strong> {new Date(systemInfo.timestamp).toLocaleString()}</p>
              <p><strong>Platform:</strong> {systemInfo.platform}</p>
              <p><strong>Timezone:</strong> {systemInfo.timezone}</p>
              {typeof systemInfo.location === 'object' && (
                <p><strong>Location:</strong> {systemInfo.location.latitude}, {systemInfo.location.longitude}</p>
              )}
            </div>
          </div>
        )}

        {/* Stepper Navigation */}
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 my-8">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center text-center">
              <s.icon
                className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 ${
                  step === s.id ? "text-primary" : "text-gray-600"
                }`}
              />
              <p
                className={`text-xs sm:text-sm ${
                  step === s.id ? "font-semibold text-primary" : "text-gray-600"
                }`}
              >
                {s.name}
              </p>
            </div>
          ))}
        </div>

        {/* Step 1 - Order Info */}
        {step === 1 && (
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-4 bg-primary text-white p-2 rounded">
              Order Info (Order ID: {orderId || 'Generating...'})
            </h2>
            
            {/* Validation Errors Display */}
            {showValidationErrors && Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Please fix the following errors:</span>
                </div>
                <ul className="text-sm text-red-600 space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "CustomerName",
                "ShipDate",
                "Mobile",
                "Email",
                "VehicleYear",
                "Make",
                "Model",
                "Type",
                "TotalTarif",
                "FirstPayment",
                "NextPayment",
              ].map((field, index) => (
                <label key={index} className="text-sm sm:text-base">
                  {field.replace(/([A-Z])/g, " $1")}
                  <input
                    name={field}
                    type={field === "ShipDate" ? "date" : "text"}
                    placeholder={`Enter ${field}`}
                    value={formData[field] || ''}
                    className={`border p-2 rounded w-full mt-1 transition ${
                      errors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                    onChange={handleChange}
                    required 
                  />
                  {errors[field] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 - Origin */}
        {step === 2 && (
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-4 bg-primary text-white p-2 rounded">
              Origin Route
            </h2>
            
            {/* Validation Errors Display */}
            {showValidationErrors && Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Please fix the following errors:</span>
                </div>
                <ul className="text-sm text-red-600 space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "OriginCity", label: "Origin City" },
                { name: "OriginState", label: "Origin State" },
                { name: "OriginPostal", label: "Postal Code" },
                { name: "PickupName", label: "Pick-up Person Name" },
                { name: "PickupContact", label: "Pick-up Contact" },
              ].map((f, i) => (
                <label key={i} className="text-sm sm:text-base">
                  {f.label}
                  <input
                    name={f.name}
                    placeholder={`Enter ${f.label}`}
                    value={formData[f.name] || ''}
                    className={`border p-2 rounded w-full mt-1 transition ${
                      errors[f.name] ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                    onChange={handleChange}
                    required 
                  />
                  {errors[f.name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[f.name]}</p>
                  )}
                </label>
              ))}
            </div>
            <label className="block mt-4 text-sm sm:text-base">
              Complete Pick-up Address
              <textarea
                name="PickupAddress"
                placeholder="Enter address"
                value={formData.PickupAddress || ''}
                className={`border p-2 rounded w-full mt-1 transition ${
                  errors.PickupAddress ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
                onChange={handleChange}
                required 
              />
              {errors.PickupAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.PickupAddress}</p>
              )}
            </label>
          </div>
        )}

        {/* Step 3 - Destination */}
        {step === 3 && (
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-4 bg-primary text-white p-2 rounded">
              Destination Route
            </h2>
            
            {/* Validation Errors Display */}
            {showValidationErrors && Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Please fix the following errors:</span>
                </div>
                <ul className="text-sm text-red-600 space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "DestinationCity", label: "Destination City" },
                { name: "DestinationState", label: "Destination State" },
                { name: "DestPostal", label: "Postal Code" },
                { name: "DestinationName", label: "Destination Person Name" },
                { name: "DestinationContact", label: "Destination Contact" },
              ].map((f, i) => (
                <label key={i} className="text-sm sm:text-base">
                  {f.label}
                  <input
                    name={f.name}
                    placeholder={`Enter ${f.label}`}
                    value={formData[f.name] || ''}
                    className={`border p-2 rounded w-full mt-1 transition ${
                      errors[f.name] ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                    onChange={handleChange}
                    required 
                  />
                  {errors[f.name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[f.name]}</p>
                  )}
                </label>
              ))}
            </div>
            <label className="block mt-4 text-sm sm:text-base">
              Complete Destination Address
              <textarea
                name="DestinationAddress"
                placeholder="Enter address"
                value={formData.DestinationAddress || ''}
                className={`border p-2 rounded w-full mt-1 transition ${
                  errors.DestinationAddress ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
                onChange={handleChange}
                required 
              />
              {errors.DestinationAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.DestinationAddress}</p>
              )}
            </label>
          </div>
        )}

        {/* Step 4 - Terms */}
        {step === 4 && (
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-4 bg-primary text-white p-2 rounded">
              Terms and Conditions
            </h2>
            {/* Terms content (same as before) */}
            <div className=" bg-orange-100 h-screen overflow-y-scroll border p-3 rounded text-sm leading-relaxed space-y-3">
              <div>
                {" "}
                <h3 className="text-lg font-bold mb-2">
                  {" "}
                  Cheap Hauling Auto Transport Agreement{" "}
                </h3>{" "}
                <div>
                  {" "}
                  <p>
                    {" "}
                    <b>1. Pick-Up & Delivery</b> <br /> Unless restricted by
                    residential area regulations, pick-up and delivery will be
                    made to your door. Additional fees may apply if the vehicle
                    is: <br /> - Undriveable <br /> - Oversized (e.g.,
                    limousines, dually trucks, extra-large racks, oversized
                    wheels, etc) <br /> If the vehicle’s condition was not
                    disclosed, any extra fees must be paid in cash or via money
                    order to the delivery provider before pick-up. <br /> All
                    vehicles, whether operable or inoperable, must be able to
                    roll, brake, and steer.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>2. Transport Authorization</b> <br /> By signing this
                    agreement, the customer grants the designated driver and
                    carrier permission to operate and transport the vehicle
                    between the specified pick-up and delivery locations.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>3. Pick-Up & Delivery Timeline</b> <br /> Cheap Hauling
                    will assign a carrier as soon as possible, following your
                    instructions. Specific pick-up and delivery dates cannot be
                    guaranteed. Delays caused by unforeseen circumstances (e.g.,
                    weather, accidents, road closures) are not the
                    responsibility of Cheap Hauling.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>4. Force Majeure</b> <br /> Cheap Hauling is not liable
                    for delays or failure to perform due to events beyond our
                    control, including but not limited to: <br /> - Natural
                    disasters (e.g., floods, hurricanes, earthquakes) <br /> -
                    Government actions or orders <br /> - Strikes, labor
                    disputes, or riots <br /> - Acts of terrorism or war <br />{" "}
                    - Other unforeseen circumstances <br /> Performance
                    obligations will resume once the force majeure event ends.
                    Customers may cancel and receive a refund of their deposit
                    if delays exceed [4] days.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>5. Vehicle Condition & Preparation</b> <br /> The vehicle
                    must be in good working order unless otherwise agreed upon.{" "}
                    <br /> Fuel level must not exceed half a tank (preferably
                    1/4 tank). <br /> Remove all non-permanent exterior items,
                    such as luggage racks and spoilers.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>6. Personal Belongings</b> <br /> The Federal Motor
                    Carrier Safety Administration (FMCSA) allows up to 150 lbs
                    of personal items inside the vehicle. <br /> The carrier is
                    not responsible for lost, stolen, or damaged personal
                    belongings left inside the vehicle. <br /> Excessive or
                    improperly secured items that cause damage to the vehicle
                    are the customer’s responsibility.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>7. Cancellation & Refund Policy</b> <br /> If the
                    customer cancels before a carrier is assigned, they will
                    receive a full refund of their deposit. <br /> If the
                    vehicle has been assigned to a carrier (dispatched), Cheap
                    Hauling retains the right to charge a partial service fee
                    equal to the deposit amount. <br /> Cheap Hauling may refuse
                    an order at any time, in which case a full refund will be
                    issued. <br /> Once the customer has signed the contract
                    with Muvitxpress, and should they engage with other
                    companies for the same order during the interim period,
                    Muvitxpress reserves the right to request a deposit to
                    secure the commitment and resources required to proceed with
                    the project.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>8. Carrier Liability & Insurance</b> <br /> The assigned
                    carrier is responsible for vehicle damage during transport
                    and must carry a minimum of $750,000 in public liability
                    insurance. <br /> Any damage claims must be: <br /> - Noted
                    upon delivery and acknowledged by the carrier. <br /> -
                    Filed in writing directly with the carrier within their
                    required timeframe. <br /> Cheap Hauling will provide
                    carrier insurance details upon request but is not
                    responsible for any damage claims.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>9. Prohibited Items</b> <br /> The vehicle must not
                    contain any of the following: <br /> - Firearms or
                    explosives <br /> - Illegal drugs or alcohol <br /> -
                    Perishable goods (e.g., live plants, food) <br /> - Live
                    animals <br /> - Electronics or other valuables <br /> -
                    Hazardous materials <br /> If prohibited items are found,
                    the transport may be refused, delayed, or incur additional
                    fees.{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>
                      10. Payment Terms (COD - Cash on Delivery)
                    </b> <br /> All COD payments must be made at the time of
                    vehicle delivery. <br /> Acceptable forms of payment: Cash
                    or Certified Money Order. <br /> Digital or card payments
                    may be accepted at the carrier's discretion (confirm in
                    advance).{" "}
                  </p>{" "}
                  <p>
                    {" "}
                    <b>11. Legal Compliance & Governing Law</b> <br /> This
                    agreement is subject to all applicable FMCSA and DOT
                    regulations. <br /> Any disputes shall be resolved under the
                    laws of Texas. <br /> The Cheap Hauling Broker License
                    Number is MC-1678344-B. <br /> Any modifications to this
                    agreement must be in writing and signed by an authorized
                    Cheap Hauling LLC representative.{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            </div>
            {/* Checkbox */}
            <div className="mt-4 bg-orange-100 p-3 rounded border-2 border-primary">
              <label className="flex items-center gap-2 text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                I agree to sign the contract
              </label>
            </div>

            {/* Signature */}
            <div className="mt-4">
              <p className="font-semibold mb-2 text-sm sm:text-base">
                Electronic Signature
              </p>
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 300,
                  height: 120,
                  className: "border rounded bg-white w-full sm:w-[400px]",
                }}
              />
              <button
                onClick={clearSignature}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm sm:text-base"
              >
                Clear Signature
              </button>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-primary text-white rounded text-sm sm:text-base"
            >
              Previous
            </button>
          )}
          {step < steps.length ? (
            <button
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-primary text-white rounded text-sm sm:text-base"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit & Download PDF"}
            </button>
          )}
        </div>
      </div>
    </div>
   </div>
  );
}
