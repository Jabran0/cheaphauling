import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { formData, orderId, systemInfo, signatureData } = body;

    // Validate required data
    if (!formData || !orderId || !formData.Email) {
      return NextResponse.json(
        { error: 'Missing required form data' },
        { status: 400 }
      );
    }

    // Submit data to Formspree
    const formspreeResponse = await fetch(process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        orderId: orderId,
        customerName: formData.CustomerName,
        email: formData.Email,
        mobile: formData.Mobile,
        shipDate: formData.ShipDate,
        vehicleInfo: `${formData.VehicleYear} ${formData.Make} ${formData.Model} (${formData.Type})`,
        totalTariff: formData.TotalTarif,
        firstPayment: formData.FirstPayment,
        nextPayment: formData.NextPayment,
        originRoute: {
          city: formData.OriginCity,
          state: formData.OriginState,
          postal: formData.OriginPostal,
          pickupName: formData.PickupName,
          pickupContact: formData.PickupContact,
          pickupAddress: formData.PickupAddress
        },
        destinationRoute: {
          city: formData.DestinationCity,
          state: formData.DestinationState,
          postal: formData.DestPostal,
          destinationName: formData.DestinationName,
          destinationContact: formData.DestinationContact,
          destinationAddress: formData.DestinationAddress
        },
        systemInfo: {
          ip: systemInfo.ip,
          userAgent: systemInfo.userAgent,
          platform: systemInfo.platform,
          language: systemInfo.language,
          timezone: systemInfo.timezone,
          timestamp: systemInfo.timestamp,
          screenResolution: systemInfo.screenResolution,
          location: systemInfo.location
        },
        signature: {
          captured: !!signatureData,
          timestamp: new Date().toISOString()
        },
        submissionDate: new Date().toISOString()
      })
    });

    if (!formspreeResponse.ok) {
      throw new Error('Failed to submit to Formspree');
    }

    // Send confirmation email to customer
    await sendCustomerConfirmationEmail(formData, orderId);

    // Send admin notification
    await sendAdminNotification(formData, orderId, systemInfo);

    return NextResponse.json({
      message: 'Contract submitted successfully',
      orderId: orderId,
      formspreeStatus: 'success'
    }, { status: 200 });

  } catch (error) {
    console.error('Contract submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contract' },
      { status: 500 }
    );
  }
}

// Send confirmation email to customer
async function sendCustomerConfirmationEmail(formData, orderId) {
  const customerMailOptions = {
    from: process.env.SMTP_FROM || 'noreply@aaanav.com',
    to: formData.Email,
    subject: `Contract Confirmation - Order ID: ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          Contract Submission Confirmation
        </h2>
        
        <p>Dear ${formData.CustomerName},</p>
        
        <p>Thank you for submitting your auto transport contract. Your order has been received and is being processed.</p>
        
        <div style="background-color: #f97316; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0; font-size: 24px;">Order ID: ${orderId}</h3>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Order Summary</h3>
          
          <div style="display: grid; gap: 10px;">
            <p><strong>Vehicle:</strong> ${formData.VehicleYear} ${formData.Make} ${formData.Model}</p>
            <p><strong>Ship Date:</strong> ${formData.ShipDate}</p>
            <p><strong>Origin:</strong> ${formData.OriginCity}, ${formData.OriginState}</p>
            <p><strong>Destination:</strong> ${formData.DestinationCity}, ${formData.DestinationState}</p>
            <p><strong>Total Tariff:</strong> $${formData.TotalTarif}</p>
            <p><strong>First Payment:</strong> $${formData.FirstPayment}</p>
          </div>
        </div>
        
        <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h4 style="color: #1e40af; margin-top: 0;">Next Steps:</h4>
          <ul style="color: #374151; margin: 0; padding-left: 20px;">
            <li>Our team will review your contract within 24 hours</li>
            <li>We will assign a qualified carrier for your vehicle</li>
            <li>You will receive pickup and delivery confirmations</li>
            <li>Track your shipment progress through our system</li>
          </ul>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p><strong>Contact Information:</strong></p>
          <p>📞 Phone: +1 (205) 852-6534</p>
          <p>📧 Email: admin@cheaphualing.net</p>
          <p>🌐 Website: www.cheaphualing.net</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>This email was automatically generated for Order ID: ${orderId}</p>
          <p>Submission time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  };

  // Use the existing email transporter
  const { createTransporter } = await import('@/lib/email');
  const transporter = createTransporter();
  await transporter.sendMail(customerMailOptions);
}

// Send notification to admin
async function sendAdminNotification(formData, orderId, systemInfo) {
  const adminMailOptions = {
    from: process.env.SMTP_FROM || 'noreply@aaanav.com',
    to: process.env.ADMIN_EMAIL || 'dev.aleahmad@gmail.com',
    subject: `🚨 New Contract Submission - Order ID: ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
          🚨 New Contract Form Submission
        </h2>
        
        <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0; font-size: 24px;">Order ID: ${orderId}</h3>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
          
          <div style="display: grid; gap: 8px;">
            <p><strong>Name:</strong> ${formData.CustomerName}</p>
            <p><strong>Email:</strong> ${formData.Email}</p>
            <p><strong>Mobile:</strong> ${formData.Mobile}</p>
            <p><strong>Ship Date:</strong> ${formData.ShipDate}</p>
          </div>
          
          <h4 style="color: #374151; margin-top: 20px;">Vehicle Details</h4>
          <p><strong>Vehicle:</strong> ${formData.VehicleYear} ${formData.Make} ${formData.Model} (${formData.Type})</p>
          
          <h4 style="color: #374151; margin-top: 20px;">Financial Information</h4>
          <p><strong>Total Tariff:</strong> $${formData.TotalTarif}</p>
          <p><strong>First Payment:</strong> $${formData.FirstPayment}</p>
          <p><strong>Next Payment:</strong> $${formData.NextPayment}</p>
          
          <h4 style="color: #374151; margin-top: 20px;">Route Information</h4>
          <p><strong>Origin:</strong> ${formData.OriginCity}, ${formData.OriginState} ${formData.OriginPostal}</p>
          <p><strong>Pickup Contact:</strong> ${formData.PickupName} (${formData.PickupContact})</p>
          <p><strong>Destination:</strong> ${formData.DestinationCity}, ${formData.DestinationState} ${formData.DestPostal}</p>
          <p><strong>Delivery Contact:</strong> ${formData.DestinationName} (${formData.DestinationContact})</p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h4 style="color: #92400e; margin-top: 0;">System Information (Signature Verification)</h4>
          <div style="font-size: 12px; color: #374151;">
            <p><strong>IP Address:</strong> ${systemInfo.ip}</p>
            <p><strong>Timestamp:</strong> ${systemInfo.timestamp}</p>
            <p><strong>Platform:</strong> ${systemInfo.platform}</p>
            <p><strong>Browser:</strong> ${systemInfo.userAgent}</p>
            <p><strong>Timezone:</strong> ${systemInfo.timezone}</p>
            <p><strong>Location:</strong> ${typeof systemInfo.location === 'object' ? 
              `${systemInfo.location.latitude}, ${systemInfo.location.longitude}` : 
              systemInfo.location}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>Contract submission received via Formspree.io</p>
          <p>Submission time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  };

  const { createTransporter } = await import('@/lib/email');
  const transporter = createTransporter();
  await transporter.sendMail(adminMailOptions);
}
