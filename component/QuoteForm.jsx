// components/QuoteForm.jsx
"use client";
import { useState } from "react";
import { CheckCircle, X } from "lucide-react";

export default function QuoteForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    moveFrom: "",
    moveTo: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email";
    if (!form.moveFrom) e.moveFrom = "Please select a start date";
    if (!form.moveTo) e.moveTo = "Please select an end date";
    if (form.moveFrom && form.moveTo && form.moveTo < form.moveFrom)
      e.moveTo = "End date must be after start date";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      setSubmitting(true);
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send quote request");
      }

      // Show success popup
      setShowSuccessPopup(true);
      
      // Reset form
      setForm({
        fullName: "",
        email: "",
        moveFrom: "",
        moveTo: "",
        message: "",
      });
      
      // Auto-hide popup after 5 seconds
      setTimeout(() => setShowSuccessPopup(false), 5000);
    } catch (error) {
      console.error("Quote form error:", error);
      setErrors({ submit: "Failed to send quote request. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const base =
    "block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition";

  return (
    <>
      <section className="relative overflow-hidden bg-gary-100 px-2">
        <div
          className="absolute inset-0 bg-[url('/image/Filler-with-form-bg.webp')] bg-cover bg-center bg-no-repeat  opacity-5 "
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto  md:py-15 py-8 bg-white/10 backdrop-blur my-4 shadow-lg rounded-3xl">
          <div className="px-6">
            {/* <div data-aos="fade-right" className="  text-gray-400  pb-4">
              Our Location
            </div> */}
            <h2
              data-aos="fade-right"
              data-aos-delay="300"
              className=" text-primary font-semibold sm:text-4xl text-lg  capitalize"
            >
              Leading the Way in Vehicle Shipping, Secure Storage & Seamless
              Distribution.
            </h2>
            <p
              data-aos="fade-right"
              data-aos-delay="500"
              className="text-gray-600 py-4 "
            >
              As a trusted leader in vehicle shipping, Cheap Hauling LLC takes
              pride in delivering reliable supply chain, secure storage, and
              efficient distribution solutions tailored to meet every client’s
              needs.
            </p>
          </div>
          <div>
            <form
              onSubmit={onSubmit}
              className="mx-auto max-w-7xl space-y-4   px-6  py-4"
            >
              {/* Success Popup */}
              {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-4 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Email Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We will contact you soon.
                    </p>
                    <button
                      onClick={() => setShowSuccessPopup(false)}
                      className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all mx-auto"
                    >
                      <X className="w-4 h-4" /> Close
                    </button>
                  </div>
                </div>
              )}
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`${base} ${
                    errors.fullName ? "border-red-400" : ""
                  }`}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${base} ${errors.email ? "border-red-400" : ""}`}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Moving From (Date)
                  </label>
                  <input
                    type="date" // calendar opens on click
                    name="moveFrom"
                    value={form.moveFrom}
                    onChange={handleChange}
                    className={`${base} ${
                      errors.moveFrom ? "border-red-400" : ""
                    }`}
                    aria-invalid={!!errors.moveFrom}
                  />
                  {errors.moveFrom && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.moveFrom}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Moving To (Date)
                  </label>
                  <input
                    type="date" // calendar opens on click
                    name="moveTo"
                    value={form.moveTo}
                    onChange={handleChange}
                    className={`${base} ${
                      errors.moveTo ? "border-red-400" : ""
                    }`}
                    aria-invalid={!!errors.moveTo}
                  />
                  {errors.moveTo && (
                    <p className="mt-1 text-sm text-red-600">{errors.moveTo}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your move..."
                  className={base}
                />
              </div>

              {/* Submit */}
              {errors.submit && (
                <p className="text-sm text-red-600">{errors.submit}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-auto rounded-2xl bg-primary px-5 py-3 text-white shadow-md transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Request Quote"}
              </button>
            </form>
          </div>
        </div>

        {/* Optional gradient overlay for extra contrast */}
        <div className="absolute bottom-4 right-0 w-30  h-20 md:w-90 md:h-50 sm:w-50 sm:h-30">
          <img
            src="/image/minitruck.webp"
            alt="Truck"
            className="w-full h-full object-contain"
          />
        </div>
      </section>
    </>
  );
}
