"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import QuoteForm from "@/component/QuoteForm.jsx";

const faqData = [
  {
    category: "General Shipping",
    questions: [
      {
        q: "What is vehicle shipping management?",
        a: "Vehicle shipping management in auto transport refers to the process of planning, scheduling, and coordinating safe car shipping services from one location to another. It ensures smooth vehicle transportation through reliable carriers, route planning, and insurance coverage, making auto transport secure and cost-effective.",
      },
      {
        q: "How does shipping work in supply chain management?",
        a: "In supply chain management, shipping plays a key role by moving vehicles and goods from suppliers to customers. Reliable vehicle transport services ensure on-time deliveries, minimize delays, and reduce overall logistics costs, creating efficiency throughout the supply chain network.",
      },
      {
        q: "What are the key components of vehicle shipping?",
        a: "The key components of vehicle shipping include shipment scheduling, selecting professional auto transport carriers, efficient route planning, vehicle insurance, and real-time delivery tracking. These essential factors guarantee a safe, timely, and affordable car shipping experience for customers.",
      },
      {
        q: "What is green vehicle shipping?",
        a: "Green vehicle shipping refers to eco-friendly auto transport practices that minimize carbon emissions. It involves using fuel-efficient carriers, hybrid trucks, route optimization, and sustainable transport methods. Eco-conscious shipping ensures environmental protection while providing reliable vehicle transportation.",
      },
      {
        q: "What are some best practices for sustainable shipping?",
        a: "Best practices for sustainable shipping include load optimization, using fuel-efficient or electric transport carriers, minimizing empty runs, and adopting eco-friendly packaging methods. By implementing green strategies, auto transport companies reduce costs and carbon emissions while ensuring reliable vehicle delivery.",
      },
    ],
  },
  {
    category: "Shipping and Transportation",
    questions: [
      {
        q: "What is the difference between shipping and transportation?",
        a: "Shipping generally refers to the movement of goods and vehicles via sea, land, or air, while transportation is the broader term covering the overall movement of people and products. In auto transport, both terms highlight the importance of safe and reliable vehicle delivery.",
      },
      {
        q: "Why is transportation important in logistics?",
        a: "Transportation is vital in logistics because it connects suppliers, carriers, and customers by ensuring efficient vehicle and goods movement. Reliable auto transport services reduce delays, lower costs, and guarantee that cars and shipments reach their destinations safely and on time.",
      },
      {
        q: "What factors affect shipping costs?",
        a: "Shipping costs depend on distance, vehicle type, carrier selection, fuel prices, and seasonal demand. Factors like open vs. enclosed transport also impact pricing. Getting a free vehicle shipping quote helps customers compare and choose cost-effective auto transport services.",
      },
      {
        q: "What types of carriers are used in vehicle shipping?",
        a: "Vehicle shipping carriers include open carriers, enclosed carriers, rail transport, and sea freight. Open carriers are the most affordable, while enclosed carriers provide extra protection for luxury or classic cars. Carrier selection depends on vehicle type, budget, and shipping distance.",
      },
    ],
  },
];

export default function FAQPage() {
  // 👇 First section's first question active by default
  const [openIndex, setOpenIndex] = useState({ section: 0, index: 0 });

  const toggleFAQ = (sectionIndex, questionIndex) => {
    if (openIndex.section === sectionIndex && openIndex.index === questionIndex) {
      // Agar first wala hai to close na ho
      if (sectionIndex === 0 && questionIndex === 0) return;
      setOpenIndex({ section: null, index: null });
    } else {
      setOpenIndex({ section: sectionIndex, index: questionIndex });
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Explore answers to common questions about vehicle shipping, auto
            transport, and transportation management.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto space-y-10">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Title */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-orange-500 inline-block pb-1">
                {section.category}
              </h2>

              {/* FAQs */}
              <div className="space-y-4">
                {section.questions.map((faq, questionIndex) => {
                  const isOpen =
                    openIndex.section === sectionIndex &&
                    openIndex.index === questionIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
                    >
                      <button
                        onClick={() => toggleFAQ(sectionIndex, questionIndex)}
                        className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors"
                      >
                        {faq.q}
                        <ChevronDown
                          className={`w-6 h-6 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-orange-500" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="px-6 pb-4 text-gray-600 overflow-hidden"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <QuoteForm />
      </section>
    </>
  );
}
