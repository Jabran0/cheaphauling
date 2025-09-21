"use client";

export default function BrokerPlans() {
  const plans = [
    {
      name: "Basic Plan",
      fee: "15% of Gross Load Price",
      deposit: "$100 (deducted from final payment)",
      insurance: "Broker verifies carrier insurance only (no extra coverage)",
      bestFor:
        "Budget-conscious customers willing to wait longer for pickup.",
      services: [
        "Standard carrier matching via Central Dispatch",
        "Pickup scheduling within 3–5 business days",
        "Regular phone/email support during business hours",
      ],
      popular: false,
    },
    {
      name: "Premium Plan",
      fee: "20% of Gross Load Price",
      deposit: "$200 (refundable at delivery if no breach)",
      insurance:
        "Broker verifies carrier insurance + adds secondary cargo protection up to $25,000",
      bestFor: "Customers needing faster scheduling and added security.",
      services: [
        "Priority listing on Central Dispatch",
        "Faster pickup window (1–3 business days)",
        "Dedicated dispatch manager",
        "Status updates via SMS/Email",
      ],
      popular: true, // 🔥 Add "Most Popular"
    },
    {
      name: "Gold Plan",
      fee: "25% of Gross Load Price",
      deposit: "$300 (performance bond, refunded upon delivery)",
      insurance: "Comprehensive coverage up to $100,000 cargo protection",
      bestFor:
        "High-value cars, urgent shipments, or customers needing VIP service.",
      services: [
        "Same-day or next-day priority pickup (where available)",
        "Premium carriers with higher ratings (95%+ approval)",
        "24/7 dedicated support line",
        "GPS location tracking of vehicle during transit",
        "Status updates every 12 hours",
      ],
      popular: false,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Car Hauling Broker Plans
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl shadow-lg border ${
                plan.popular ? "border-primary scale-105" : "border-gray-200"
              } p-6 flex flex-col transition-transform`}
            >
              {/* 🔹 Badge */}
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ⭐ Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-primary mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-700 font-medium mb-4">
                Dispatch Fee: {plan.fee}
              </p>

              <ul className="text-gray-600 text-left space-y-2 mb-4">
                {plan.services.map((s, idx) => (
                  <li key={idx}>🔹 {s}</li>
                ))}
              </ul>

              <p className="text-gray-700 text-sm mb-2">
                <strong>Security Deposit:</strong> {plan.deposit}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Insurance:</strong> {plan.insurance}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                <strong>Best For:</strong> {plan.bestFor}
              </p>

              <button
                className={`mt-auto px-4 py-2 rounded-xl transition ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
