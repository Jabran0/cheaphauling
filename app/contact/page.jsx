"use client";
import Image from "next/image";
import Typewriter from "@/component/Typewriter.jsx";
import { useState } from "react";

import { MapPin, Phone, Mail, Send, CheckCircle, X } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
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
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Show success popup
      setShowSuccessPopup(true);
      
      // Reset form
      setForm({
        fullName: "",
        email: "",
        message: "",
      });
      
      // Auto-hide popup after 5 seconds
      setTimeout(() => setShowSuccessPopup(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <section
        className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgb(23 29 46 / 90%), rgb(21 27 41 / 60%)), url('/image/contact.webp')",
        }}
      >
        {/* Heading */}
       
        <div data-aos="fade-down">
        <Typewriter texts={["Contact Us"]} speed={100} delay={1500} />

        </div>
        <p
          className="text-gray-200 text-center mb-8 max-w-2xl"
          data-aos="fade-up"
        >
          We’d love to hear from you! Reach out with any questions, feedback, or
          project inquiries.
        </p>

        {/* Content Grid */}
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Get in Touch
            </h2>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Address */}
              <div className="group bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <MapPin className="w-10 h-10 mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 text-sm">
                  54 STATE ST STE 804 <br /> ALBANY, NY 12207
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+12058526534"
                className="group bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <Phone className="w-10 h-10 mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 text-sm">+1 (205) 852-6534</p>
              </a>

              {/* Email */}
              <a
                href="mailto:Admin@cheaphualing.net"
                className="group bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <Mail className="w-10 h-10 mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 text-sm">Admin@cheaphualing.net</p>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div
            className="bg-white shadow-lg rounded-2xl p-8"
            data-aos="fade-left"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Send a Message
            </h2>
            <form onSubmit={onSubmit} className="space-y-5">
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
                      className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all mx-auto"
                    >
                      <X className="w-4 h-4" /> Close
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:outline-none transition ${
                    errors.fullName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:outline-none transition ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message..."
                  className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:outline-none transition ${
                    errors.message ? "border-red-400" : "border-gray-300"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              {errors.submit && (
                <p className="text-sm text-red-600">{errors.submit}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" /> 
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* why Choose us section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
          <div className="flex flex-col justify-center gap-3 md:gap-6 items-center text-center mb-5 md:mb-10">
            <p className="text-gray-500 text-lg sm:text-xl">
              Making the Impossible Possible
            </p>
            <Typewriter texts={["Why Choose Us"]} speed={100} delay={1500} />
          </div>
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className=" p-6 rounded-lg  shadow-sm bg-white">
                  <div>
                    <div className="flex justify-center">
                      <Image
                        src="/image/about/mission.svg"
                        alt="our mission"
                        width={120} // control width
                        height={120} // control height
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                    <h3 className=" text-primary text-2xl font-semibold my-2 text-center">
                      Mission & Vision
                    </h3>
                    <p className="text-gray-600 text-smn text-justify">
                      At Cheap Hauling LLC, we specialize in safe, reliable, and
                      affordable vehicle transport services. Our vehicle
                      shipping solutions are designed to deliver peace of mind,
                      on-time delivery, and exceptional customer service
                      nationwide.
                    </p>
                  </div>
                </div>

                <div className=" p-6 rounded-lg  shadow-sm bg-white">
                  <div>
                    <div className="flex justify-center">
                      <Image
                        src="/image/about/core.svg"
                        alt="our mission"
                        width={120} // control width
                        height={120} // control height
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold my-2  text-primary text-center">
                      Core Objectives
                    </h3>
                    <p className="text-gray-600 text-smn text-justify">
                      At Cheap Hauling LLC, we specialize in affordable vehicle
                      shipping and secure auto transport, ensuring reliable
                      delivery with excellent customer support.
                    </p>
                  </div>
                </div>

                <div className=" p-6 rounded-lg  shadow-sm bg-white">
                  <div>
                    <div className="flex justify-center">
                      <Image
                        src="/image/about/value.svg"
                        alt="Our mission"
                        width={120} // control width
                        height={120} // control height
                        className="object-contain"
                        priority={false}
                      />
                    </div>

                    <h3 className="text-2xl font-semibold my-2 text-primary  text-center">
                      Our Values
                    </h3>
                    <p className="text-gray-600 text-smn text-justify">
                      Cheap Hauling LLC stands on values of trust, reliability,
                      and customer commitment—offering dependable vehicle
                      shipping and auto transport nationwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* faderal section */}
      <section className=" relative w-full  bg-cover bg-center">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(21, 27, 41, 0.51),rgba(23, 29, 46, 1) ), url('/image/about/bgcars.webp')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "auto", // set desired height
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
            <div>
              <h1 className=" text-white text-center text-lg md:text-3xl font-bold leading-snug">
                Cheap Hauling is registered with the Federal Motor Carrier
                Safety Administration (FMCSA), ensuring safe, reliable, and
                compliant vehicle transport services.
              </h1>
            </div>

            <div className="flex gap-0 md:gap-2 justify-center items-center  bg-green-700 text-white text-base md:text-2xl text-center mt-5 py-4 rounded-2xl font-semibold">
              <span>USDOT N0 : 4409615</span>
              <span> | </span>
              <span> MC : MC-1732090</span>
            </div>

            <div className="flex justify-center items-center mt-13 gap-4 flex-wrap">
              <div className="w-48 sm:w-64 md:w-72 relative h-24 sm:h-32 md:h-36">
                <Image
                  src="/image/about/about stemp.webp"
                  alt="federal motor carrier safety administration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="w-48 sm:w-64 md:w-72 relative h-24 sm:h-32 md:h-36">
                <Image
                  src="/image/about/about stemp truck.webp"
                  alt="federal motor carrier safety administration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
