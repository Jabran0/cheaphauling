"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuoteForm from "@/component/QuoteForm.jsx";
import CountUp from "react-countup";
import ReviewsSlider from "@/component/ReviewsSlider.jsx";
import Typewriter from "@/component/Typewriter.jsx";
import BrokerPlans from "@/component/BrokerPlans.jsx";

export default function MainBanner() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "International Shipping",
      image: "/image/International Shipping.webp",
      content:
        "Cheap Hauling ensures seamless international shipping with reliable, cost-effective solutions, delivering your goods safely and on time across the globe.",
    },
    {
      title: "Ocean Freight",
      image: "/image/Ocean Freight.webp",
      content:
        "Cheap Hauling provides secure and efficient ocean freight services, offering reliable container solutions and timely deliveries across major global ports.",
    },
    {
      title: "Warehousing",
      image: "/image/Warehousing.webp",
      content:
        "Our warehousing solutions provide secure storage, efficient inventory management, and streamlined handling to keep your supply chain running smoothly.",
    },
    {
      title: "Network Transportation",
      image: "/image/Network Transportation.webp",
      content:
        "Our network transportation services ensure smooth connectivity, optimized routes, and reliable logistics support to move your cargo efficiently across regions. ",
    },
    {
      title: "Rail Freight",
      image: "/image/Rail Freight.webp",
      content:
        "Our rail freight services offer cost-effective, reliable, and environmentally friendly transport solutions, ensuring safe and timely delivery across extensive routes.",
    },
  ];
  const sliderImages = [
    "/image/tracking.webp",
    "/image/Safety.webp",
    "/image/Customer Service.webp",
    "/image/flexbal.webp",
  ];
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  const stats = [
    { end: 500, suffix: "+", label: "New Partners Every Year" },
    { end: 87, suffix: "+", label: "Talented Staffs Worldwide" },
    { end: 557, suffix: "+", label: "Successful Project Completion" },
    { end: 2000, suffix: "+", label: "Tonnes Supplied Annually" },
  ];
  return (
    <div className="w-full overflow-x-hidden">
      <div>
        <Link
          href="/contractform"
          aria-label="Place an Order"
          className="fixed right-[-45px] md:right-[-63px] top-1/2 text-base  md:text-xl -rotate-90 origin-center border-2 tracking-normal md:tracking-widest border-white bg-primary text-white font-semibold px-5 py-3 rounded-tl-lg rounded-tr-lg shadow-lg z-50 "
        >
          Place Order
        </Link>
      </div>
      {/* main banner section */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-center">
          {/* Left Side - Text */}
          <div
            data-aos="fade-right"
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          >
            <div className="pb-4 text-4xl">
              <Typewriter texts={["Cheap Hauling"]} speed={100} delay={1500} />
            </div>

            <h1 className=" text-2xl sm:text-4xl  font-bold text-secondary  mb-4 md:leading-12">
              Ship Your Vehicle the Easy, Safe & Affordable Way{" "}
            </h1>
            <p className=" text-base  text-center text-secondary sm:text-xl mb-6 md:text-justify">
              From instant quotes to secure delivery, we handle it all. Book
              online in minutes and let Cheap Hauling bring reliability to your
              vehicle transport.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <Link href="/quote">
                <button className="bg-primary text-white py-2 px-3 lg:py-3 lg:px-4 rounded media_link  hover:bg-light">
                  Get A Quote
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-primary text-white py-2 px-3 lg:py-3 lg:px-4 rounded media_link  hover:bg-light">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            data-aos="fade-left"
            className="w-full lg:w-1/2 flex justify-center lg:justify-end  "
          >
            <Image
              src="/image/truckbanner.webp"
              alt="Truck Transporting vehicles"
              width={500}
              height={400}
              className="object-contain h-auto w-full md:w-3/4"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      {/* second banner section */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-[url('/image/bg-map-pattarn.webp')] bg-cover bg-center bg-no-repeat "
          aria-hidden="true"
        />

        <div
          data-aos="fade-up"
          className="flex md:justify-between justify-center items-center max-w-7xl mx-auto sm:py-14 py-8 flex-wrap gap-3 px-6"
        >
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
        {/* Optional gradient overlay for extra contrast */}
        <div
          className="absolute inset-0 pointer-events-none
                  bg-gradient-to-t from-[#171b28]/70 via-transparent to-transparent"
        />
      </section>
      {/* service banner section */}
      <section className=" bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:py-15  py-8 ">
          <div className="flex flex-wrap justify-between items-center w-full">
            <div data-aos="fade-right">
              <span className=" text-gray-400 ">Our Services</span>
              <h2 className=" text-secondary font-semibold sm:text-4xl text-lg py-2 capitalize">
                Shipping Solutions
              </h2>
              {/* <p className=" text-gray-600 text-base">
              Convenient vehicle shipping from your pickup location to your
              destination without terminal stops.
            </p> */}
            </div>
            <div data-aos="fade-left">
              <Link href="/service">
                <button className="bg-primary text-white py-2 px-3 lg:py-3 lg:px-4 rounded media_link  hover:bg-light">
                  All Service
                </button>
              </Link>
            </div>
          </div>
          <div
            data-aos="zoom-in"
            className="flex justify-between md:flex-row flex-col md:py-15  py-0"
          >
            {/* Tabs */}
            <div className="flex md:flex-col flex-row flex-wrap justify-between border-b border-gray-300 sm:pt-10 pt-5 md:w-6/12 w-full">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`md:px-4 px-2 md:py-6 py-2 text-lg sm:text-2xl  font-medium transition text-left 
              ${activeTab === index
                      ? "text-white  bg-primary border-l-6 border-secondary"
                      : " text-secondary hover:text-light"
                    }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="sm:p-6 p-2  ">
              <div className=" items-center  ">
                {/* Text */}
                <div className=" text-secondary text-lg leading-relaxed  text-justify">
                  {tabs[activeTab].content}
                </div>
                {/* Image */}
                <div className="w-full h-[300px] md:h-[400px] relative">
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].title}
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* plans section */}
      <section>
        <BrokerPlans />
      </section>

      {/* service banner section */}
      <section className=" bg-primary">
        <div className="max-w-7xl mx-auto px-2 md:py-15 py-8">
          <div>
            <span className="  text-white ">National & International</span>
            <h2 className=" text-white font-semibold sm:text-4xl text-lg  capitalize">
              cost-effective Vehicle shipping services
            </h2>
          </div>
          <div className="flex flex-col-reverse  lg:flex-row justify-between items-center  md:gap-5 gap-0 pt-10">
            <div
              data-aos="zoom-in"
              className="slider w-full lg:w-1/2 rounded-xl overflow-hidden"
            >
              <Slider {...sliderSettings}>
                {sliderImages.map((img, idx) => (
                  <div key={idx}>
                    <Image
                      src={img}
                      alt={`Slider ${idx + 1}`}
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="text-white w-full lg:w-1/2">
              <p className=" text-lg md:text-2xl">
                Cost-effective and widely used transport method for safely
                moving vehicles on open trailers.
              </p>
              <div data-aos="fade-up" data-aos-delay="300" className="py-4">
                <div className="flex items-center gap-2  ">
                  <Check className="w-7 h-7" />
                  <span className=" text-lg md:text-2xl font-semibold">
                    24/7 Customer Support
                  </span>
                </div>
                <p className="  ml-9">
                  24/7 Customer Support: Your Peace of Mind, Around the Clock!
                </p>
              </div>
              <div data-aos="fade-up" data-aos-delay="400" className="py-4">
                <div className="flex items-center gap-2  ">
                  <Check className="w-7 h-7" />
                  <span className=" text-lg md:text-2xl font-semibold">
                    Safety Standards
                  </span>
                </div>
                <p className="  ml-9">
                  Uncompromising Safety Standards: Your Vehicle, Our Priority!
                </p>
              </div>
              <div data-aos="fade-up" data-aos-delay="500" className="py-4">
                <div className="flex items-center gap-2  ">
                  <Check className="w-7 h-7" />
                  <span className=" text-lg md:text-2xl font-semibold">
                    Customer Service
                  </span>
                </div>
                <p className="  ml-9">
                  Exceptional Customer Service: Support You Can Rely On!
                </p>
              </div>
              <div data-aos="fade-up" data-aos-delay="600" className="py-4">
                <div className="flex items-center gap-2  ">
                  <Check className="w-7 h-7" />
                  <span className=" text-lg md:text-2xl font-semibold">
                    Reliable & Flexible
                  </span>
                </div>
                <p className="   ml-9">
                  Reliable & Flexible: Shipping Solutions Tailored to You!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* form section */}
      <section>
        <QuoteForm />
      </section>
      {/* gol section */}
      <section>
        <div className="w-full overflow-hidden  bg-primary py-6">
          <div className="flex gap-10 animate-slide">
            {/* duplicate list ek ke baad ek */}
            <img
              src="image/slidImg/gol1.svg"
              className=" h-8 dm:h-12 w-auto"
              alt="gol1"
            />
            <img
              src="image/slidImg/gol2.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol2"
            />
            <img
              src="image/slidImg/gol3.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol3"
            />
            <img
              src="image/slidImg/gol4.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol4"
            />
            <img
              src="image/slidImg/gol5.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol5"
            />
            <img
              src="image/slidImg/gol6.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol6"
            />
            <img
              src="image/slidImg/gol7.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol7"
            />
            <img
              src="image/slidImg/gol8.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol8"
            />
            <img
              src="image/slidImg/gol9.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol9"
            />

            {/* duplicate again for seamless loop */}
            <img
              src="image/slidImg/gol1.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol1"
            />
            <img
              src="image/slidImg/gol2.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol2"
            />
            <img
              src="image/slidImg/gol3.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol3"
            />
            <img
              src="image/slidImg/gol4.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol4"
            />
            <img
              src="image/slidImg/gol5.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol5"
            />
            <img
              src="image/slidImg/gol6.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol6"
            />
            <img
              src="image/slidImg/gol7.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol7"
            />
            <img
              src="image/slidImg/gol8.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol8"
            />
            <img
              src="image/slidImg/gol9.svg"
              className="h-8 dm:h-12 w-auto"
              alt="gol9"
            />
          </div>
        </div>
      </section>
      {/* review section */}

      <section>
        <div>
          <ReviewsSlider />
        </div>
      </section>
    </div>
  );
}
