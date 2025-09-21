"use client";
import QuoteForm from "@/component/QuoteForm.jsx";
import ReviewsSlider from "@/component/ReviewsSlider.jsx";
import Typewriter from "@/component/Typewriter.jsx";


export default function QuotePage() {
  return (
    <>
    {/* get a quotes */}
      <section>
        <div className="w-full  md:pt-16  py-8">
        <div data-aos="fade-down" className="max-w-7xl mx-auto px-4">
        <Typewriter texts={["Get a Quote"]} speed={100} delay={1500} />

        </div>
         
          <QuoteForm />
        </div>
        <ReviewsSlider/>

      </section>
     
    </>
  );
}
