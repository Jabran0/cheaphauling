"use client";

import Image from "next/image";
import CountUp from "react-countup";
import Typewriter from "@/component/Typewriter.jsx";


export default function About() {
  const stats = [
    { end: 500, suffix: "+", label: "New Partners Every Year" },
    { end: 87, suffix: "+", label: "Talented Staffs Worldwide" },
    { end: 557, suffix: "+", label: "Successful Project Completion" },
    { end: 2000, suffix: "+", label: "Tonnes Supplied Annually" },
  ];
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
  return (
    <>
      {/* second banner section */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-[url('/image/bg-map-pattarn.webp')] bg-cover bg-center bg-no-repeat "
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 md:pt-18 text-white">
          <p className="leading-7 opacity-95 text-center">
            Why You Work With Cheaphualing
          </p>
          <h2 className="text-lg sm:text-4xl font-semibold mb-4   leading-8 md:leading-14 text-center pt-6 md:pt-12 capitalize">
            As a reliable auto transport service provider, we guarantee your
            vehicle reaches its destination safely, on schedule, and without
            hidden risks or damages.
          </h2>
        </div>
        <div className="flex md:justify-between justify-center items-center max-w-7xl mx-auto  sm:py-8 pb-8 flex-wrap gap-3 px-6">
          {stats.map((item, i) => (
            <div key={i} className="text-white text-center py-6">
              <h1 className="sm:text-5xl text-4xl font-bold">
                <CountUp end={item.end} duration={3} separator="," />
                {item.suffix}
              </h1>
              <h5 className="sm:text-lg text-base font-semibold">
                {item.label}
              </h5>
            </div>
          ))}
        </div>
      </section>
      {/* service banner section */}
      <section>
        <div className="md:py-20 py-10">
          <div className="flex justify-center gap-3 md:gap-6 items-center flex-col md:mb-10">
            <span className="text-gray-600 text-xl">Delivery Services</span>
             <Typewriter
                texts={[
                  "Vehicle Shipping Management Services"
                ]}
                speed={100}
                delay={1500}
              />
          </div>
          <div className="max-w-7xl mx-auto px-2 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 md:pt-4">
              {vehicleds.map((vehicled) => (
                <article
                  key={vehicled.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-[250px]  md:h-96">
                    <Image
                      src={vehicled.img}
                      alt={vehicled.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
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
      {/* safty Solution section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left Side Image */}
            <div className="w-full md:w-2/5 h-[250px] sm:h-[320px] md:h-[460px] relative rounded-lg overflow-hidden">
              <Image
                src="/image/about/safe-transport.webp"
                alt="Vehicle transport truck on the road"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Right Side Content */}
            <div className="w-full md:w-3/5 text-center md:text-left">
              <div>
                <p className="text-gray-100 text-lg sm:text-xl">
                  Safe Vehicle Transport
                </p>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl py-4 font-bold leading-snug">
                  Affordable Vehicle Transport – Keep Your Budget Intact
                </h2>
                <p className="text-gray-200 leading-7 text-base sm:text-lg">
                  Discover budget-friendly vehicle transport services you can
                  trust. We offer safe, reliable, and affordable vehicle
                  shipping options— including open, enclosed, and international
                  transport—without hidden costs.
                </p>
              </div>

              {/* Feature List */}
              <div className="mt-6 text-gray-200">
                <ul className="space-y-3 text-base sm:text-lg">
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-white rounded-full mt-2"></div>
                    Secure & Dedicated Warehousing Solutions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-white rounded-full mt-2"></div>
                    Cost-Effective Shared Warehousing Options
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-white rounded-full mt-2"></div>
                    Automated Inventory Management for Efficiency
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-white rounded-full mt-2"></div>
                    Fast & Accurate Order Pick-and-Pack Automation
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-white rounded-full mt-2"></div>
                    Smart Labor Management & Workforce Optimization
                  </li>
                </ul>
              </div>
            </div>
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
             <Typewriter
                texts={[
                  "Why Choose Us"
                ]}
                speed={100}
                delay={1500}
              />
           
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
