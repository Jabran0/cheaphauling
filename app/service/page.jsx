"use client";
import Typewriter from "@/component/Typewriter.jsx";
import Image from "next/image";
import { Truck, CalendarDays, ClipboardCheck, Package } from "lucide-react";
import Workflow from "@/component/Workflow.jsx";
import ReviewsSlider from "@/component/ReviewsSlider.jsx";
import BrokerPlans from "@/component/BrokerPlans.jsx";

export default function Service() {
  const vehicleds = [
    {
      id: 1,
      title: "Open Trailer Transport",
      desc: "Affordable transport for multiple vehicles on open trucks.",
      img: "/image/about/roadtruck.webp",
    },
    {
      id: 2,
      title: "Enclosed Trailer Transport",
      desc: "Safe delivery for luxury and classic vehicles.",
      img: "/image/about/enclose.webp",
    },
    {
      id: 3,
      title: "Train Transport",
      desc: "Cost-effective and secure long-distance shipping.",
      img: "/image/about/train.webp",
    },
    {
      id: 4,
      title: "Ocean Shipping",
      desc: "International transport using vehiclego ships.",
      img: "/image/about/ship.webp",
    },
    {
      id: 5,
      title: "Container Transport",
      desc: "vehicles shipped safely in steel containers.",
      img: "/image/about/container.webp",
    },
    {
      id: 6,
      title: "Air Transport",
      desc: "Fastest delivery for high-value vehicles.",
      img: "/image/about/air.webp",
    },
  ];
  const steps = [
    {
      icon: <CalendarDays className="w-15 h-20 " />,
      stepNo: "01.",
      title: "Booking & Scheduling",
      desc: "Easily book your shipment and schedule the best time that fits your needs.",
    },
    {
      icon: <ClipboardCheck className="w-15 h-20 " />,
      stepNo: "02.",
      title: "Vehicle Preparation",
      desc: "We ensure your vehicle is ready and secure for safe transportation.",
    },
    {
      icon: <Truck className="w-15 h-20 " />,
      stepNo: "03.",
      title: "Pickup & Transport",
      desc: "Our team picks up your vehicle and transports it with complete care.",
    },
    {
      icon: <Package className="w-15 h-20 " />,
      stepNo: "04.",
      title: "Delivery & Completion",
      desc: "Your vehicle is delivered safely and on time, completing the process smoothly.",
    },
  ];

  return (
    <>
      {/* service banner section */}
      <section>
        <div className="md:py-20 py-10">
          <div  data-aos="zoom-in" className="flex justify-center gap-3 md:gap-6 items-center flex-col">
            <span className="text-gray-600 text-xl">Delivery Services</span>
            <Typewriter
              texts={["Vehicle Shipping Management Services"]}
              speed={100}
              delay={1500}
            />
          </div>
          <div data-aos="fade-down" className="max-w-7xl mx-auto px-2  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 md:pt-4">
              {vehicleds.map((vehicled) => (
                <article
                  key={vehicled.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-[250px] md:h-96 group overflow-hidden">
                    <Image
                      src={vehicled.img}
                      alt={vehicled.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-orange-500 opacity-60 pointer-events-none overlay"></div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {vehicled.title}
                    </h3>
                    <p className="text-sm text-gray-600">{vehicled.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <BrokerPlans/>
      </section>
      {/* service banner section */}
      <section >
       <Workflow/>
      </section>
      {/* reviewa banner section */}
      <section>
        <ReviewsSlider/>
      </section>

    </>
  );
}
