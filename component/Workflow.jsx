"use client";
import { Truck, CalendarDays, ClipboardCheck, Package } from "lucide-react";
import Typewriter from "@/component/Typewriter.jsx";

export default function Workflow() {
  const steps = [
    {
      stepNo: "01",
      icon: <CalendarDays className="w-10 h-10" />,
      title: "Booking & Scheduling",
      desc: "Easily book your shipment and schedule the best time that fits your needs.",
    },
    {
      stepNo: "02",
      icon: <ClipboardCheck className="w-10 h-10" />,
      title: "Vehicle Preparation",
      desc: "We ensure your vehicle is ready and secure for safe transportation.",
    },
    {
      stepNo: "03",
      icon: <Truck className="w-10 h-10" />,
      title: "Pickup & Transport",
      desc: "Our team picks up your vehicle and transports it with complete care.",
    },
    {
      stepNo: "04",
      icon: <Package className="w-10 h-10" />,
      title: "Delivery & Completion",
      desc: "Your vehicle is delivered safely and on time, completing the process smoothly.",
    },
  ];

  return (
    <section className="relative py-16 bg-[linear-gradient(#171b28,rgba(23,29,46,1))]">
      <div className="mb-6 md:mb-12">
        <div
        data-aos="zoom-in"
        className="flex justify-center gap-3 md:gap-6 items-center flex-col "
      >
        {/* <span className="text-gray-600 text-xl">Delivery Services</span> */}
        <Typewriter
          texts={["Transportation Flow"]}
          speed={100}
          delay={1500}
        />
      </div>
      </div>
      <div className="relative w-full max-w-6xl mx-auto px-4">
        {/* Vertical animated dotted line */}

        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 animate-dash"></div>

        <div className="flex flex-col gap-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* connector dot (static, no aos) */}
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-white"></div>

              {/* card box (only this animates) */}
              <div
                className={`w-80 p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-md text-center ${
                  index % 2 === 0 ? "ml-10" : "mr-10"
                }`}
                data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
                data-aos-delay={index * 200} // staggered delay
              >
                <div className="flex justify-center mb-4 h-24 w-24 items-center rounded-full bg-primary text-white mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  <span className="text-orange-500">{step.stepNo}</span>{" "}
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
