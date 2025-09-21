"use client";

export default function SmsConsent() {
  return (
   <section className="w-full bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-12 text-white leading-relaxed">
        {/* Privacy Policy */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
            Privacy Policy
          </h1>
          <p className="mb-4">
            At CheapHauling LLC, we are committed to protecting your privacy.
            This Privacy Policy outlines how we collect, use, and protect your
            personal information when you use our website and services.
          </p>

          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p className="mb-4">
            We may collect the following types of information when you visit our
            website or engage with our services:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>
              <strong>Usage Data:</strong> Information such as IP address,
              browser type, and referral sources.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>To respond to inquiries and provide customer support.</li>
            <li>To send service-related updates, booking confirmations, and transport reminders.</li>
            <li>To provide SMS notifications for clients who have opted in.</li>
            <li>To improve website functionality and enhance user experience.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">SMS Opt-in and Communication</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>Booking confirmations and transport updates.</li>
            <li>Pickup and delivery reminders.</li>
            <li>Responses to your inquiries.</li>
          </ul>
          <p className="mb-6">
            By opting in, you acknowledge message frequency varies depending on
            your shipment. Message and data rates may apply. Your information
            will not be shared with third parties for marketing purposes. You
            may opt out at any time by replying <strong>STOP</strong>. For help,
            reply <strong>HELP</strong> or contact us directly.
          </p>

          <h2 className="text-xl font-semibold mb-2">How We Protect Your Information</h2>
          <p className="mb-6">
            We implement reasonable security measures to protect personal data.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold mb-2">Third-party Disclosure</h2>
          <p className="mb-6">
            We do not sell, trade, or share your personal information for
            marketing purposes. We may share data with service providers (e.g.,
            email, dispatching, payment platforms) or as required by law.
          </p>

          <h2 className="text-xl font-semibold mb-2">Your Rights & Choices</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>Request access to the personal data we hold about you.</li>
            <li>Opt out of SMS communications or update preferences.</li>
            <li>Request deletion of personal data (subject to legal/business needs).</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">Updates to This Privacy Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy periodically. Changes will be
            posted here with an updated revision date.
          </p>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
            Terms & Conditions
          </h1>

          <h2 className="text-xl font-semibold mb-2">Use of the Website</h2>
          <p className="mb-6">
            By accessing and using CheapHauling LLC’s website, you agree to
            comply with these Terms & Conditions. If you do not agree, please
            refrain from using our site.
          </p>

          <h2 className="text-xl font-semibold mb-2">Services Offered</h2>
          <p className="mb-6">
            CheapHauling LLC provides vehicle transport brokerage services by
            connecting customers with licensed and insured motor carriers. The
            information on this site is for general purposes only and does not
            constitute legal, financial, or insurance advice.
          </p>

          <h2 className="text-xl font-semibold mb-2">SMS Communications Terms</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>Messages are strictly related to vehicle transport services.</li>
            <li>Message frequency varies based on your shipment.</li>
            <li>Standard message and data rates may apply.</li>
            <li>Unsubscribe anytime by replying <strong>STOP</strong>.</li>
            <li>For support, reply <strong>HELP</strong> or contact us.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>Do not use our website for unlawful purposes.</li>
            <li>Do not attempt unauthorized access to systems.</li>
            <li>Do not transmit harmful or malicious content.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p className="mb-6">
            CheapHauling LLC is not responsible for content errors, third-party
            links, or damages resulting from website use, including
            interruptions or technical failures.
          </p>

          <h2 className="text-xl font-semibold mb-2">Changes to Terms & Conditions</h2>
          <p className="mb-6">
            We may modify these Terms & Conditions anytime. Continued use of the
            website constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-xl font-semibold mb-2">📧 Contact Us</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:Admin@cheaphualing.net"
                className=" text-secondary underline font-medium"
              >
                Admin@cheaphualing.net
              </a>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
