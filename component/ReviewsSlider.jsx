"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import Typewriter from "@/component/Typewriter.jsx";

const reviews = [
  {
    title: "Affordable & Secure Transport!",
    name: "Sarah Johnson",
    text: "I needed a budget-friendly option for moving my car, and Cheap Hauling LLC delivered! Their open trailer transport was safe, efficient, and right on schedule.",
    rating: 5,
    img: "/image/review/review1.webp",
  },
  {
    title: "Fast & Reliable Service!",
    name: "Michael Lee",
    text: "Cheap Hauling LLC made my car shipping process so easy! They provided real time tracking, and my vehicle arrived on time without any issues. Highly recommend!",
    rating: 4,
    img: "/image/review/review3.webp",
  },
  {
    title: "Luxury Car Handled with Care!",
    name: "Ayesha Khan",
    text: "I shipped my classic car using their enclosed trailer service, and it was handled with extreme care. No scratches, no damage, just a smooth and secure delivery.",
    rating: 5,
    img: "/image/review//review2.webp",
  },
  {
    title: "Best Auto Transport Company!",
    name: "David Smith",
    text: "From pickup to delivery, everything was smooth and hassle free. The pricing was fair, and their communication was top notch. Will definitely use them again!",
    rating: 5,
    img: "/image/review/review4.webp",
  },
  {
    title: "Stress-Free and Smooth Process!",
    name: "David Smith111",
    text: "Cheap Hauling exceeded my expectations! The booking process was simple, and they kept me updated throughout the journey. My car arrived in perfect condition. Definitely using them again!",
    rating: 5,
    img: "/image/review/review5.webp",
  },
];

export default function ReviewsSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8  md:py-20 relative">
      <div data-aos="fade-down" className="flex justify-center items-center text-center mb-6 md:mb-12">
        <Typewriter
          texts={["Customer Response Insights"]}
          speed={100}
          delay={1500}
        />
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white mb-10 shadow-md border-2 border-primary p-6  h-72 flex flex-col justify-between hover:shadow-xl transition ">
              <div>
                <div className="flex text-yellow-400 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <h2 className="text-lg font-semibold py-2 text-secondary">
                  {review.title}
                </h2>
                <p className="text-gray-600 italic line-clamp-4">
                  “{review.text}”
                </p>
              </div>

              {/* User Image + Name */}
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
                <h4 className="font-semibold text-gray-900 text-sm">
                  - {review.name}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
