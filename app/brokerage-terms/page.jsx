"use client";

import Typewriter from "@/component/Typewriter.jsx";

export default function Brokerage() {
  return (
    <>
      <div className="w-full bg-white">
        <main className="max-w-7xl m-auto w-full  rounded-2xl  p-8">
          <header className="mb-6">
            <div>
              <Typewriter
                texts={[
                  "Brokerage Terms"
                ]}
                speed={150}
                delay={1500}
              />

            </div>

            <p className="mt-2 text-slate-600">
              Transparency and customer trust are at the heart of our services.
              Please review the terms below before scheduling a vehicle
              shipment.
            </p>
          </header>

          <section className="space-y-6">
            <article>
              <h2 className="text-xl font-semibold">Our Role as Your Broker</h2>
              <p className="mt-2 text-slate-600">
                Cheap Hauling acts as a licensed auto transport broker. We match
                your shipment with qualified, insured carriers to handle your
                vehicle transport.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">Carrier Assignment</h2>
              <p className="mt-2 text-slate-600">
                Once your order is confirmed, we assign your shipment to a
                vetted carrier. All carriers we work with must meet our
                insurance and safety standards.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">Estimated Transit Times</h2>
              <p className="mt-2 text-slate-600">
                Transit estimates are provided at booking. Actual delivery times
                depend on route, weather, traffic, and carrier scheduling. We
                will keep you informed of material changes.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Customer Responsibilities
              </h2>
              <ul className="mt-2 list-disc list-inside text-slate-600 space-y-1">
                <li>Provide accurate pickup and delivery information.</li>
                <li>
                  Ensure the vehicle is ready for transport (remove personal
                  items, deactivate alarms, secure loose parts).
                </li>
                <li>
                  Be available at agreed pickup/delivery times or provide an
                  authorized agent.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Insurance &amp; Liability
              </h2>
              <p className="mt-2  ">
                Carriers provide liability coverage during transit. As a broker,
                Cheap Hauling facilitates insurance information but is not the
                carrier and has limited liability. We will provide documentation
                of carrier coverage upon request.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Payment, Deposits &amp; Cancellations
              </h2>
              <p className="mt-2 text-slate-600">
                Payment terms, required deposits, and cancellation policies will
                be disclosed at the time of booking. Cancellation or
                rescheduling may incur fees depending on timing and carrier
                policies.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">Questions &amp; Contact</h2>
              <p className="mt-2 text-slate-600">
                We encourage customers to review these terms carefully. For full
                terms and any clarifications, speak with one of our
                representatives who will guide you through the process.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="tel:+1 (205) 852-6534"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-primary text-white font-medium shadow hover:bg-light"
                >
                  Call Us
                </a>

                <a
                  href="mailto:admin@cheaphualing.net?subject=Brokerage%20Terms%20Inquiry"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 border border-slate-200  bg-primary text-white font-medium hover:bg-light  shadow-sm"
                >
                  Email a Representative
                </a>

                <a
                  href="/contact"
                  className="ml-auto text-sm text-slate-500 hover:underline"
                >
                  Or visit our contact page
                </a>
              </div>
            </article>

            <footer className="pt-6 border-t mt-6 text-sm text-slate-500">
              By arranging transport through Cheap Hauling you agree to the
              specific carrier terms and the brokerage agreement provided at
              booking. For full legal terms, please request the complete
              brokerage agreement from our team.
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}
