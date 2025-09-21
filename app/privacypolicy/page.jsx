"use client";

export default function PrivacyPolicy() {
  return (
    <section className="w-full bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-12  text-white leading-relaxed">
        {/* <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Privacy Policy
      </h1> */}

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
          <p>
            Cheap Hauling is a USA based vehicle transport brokerage. We collect
            and use your information solely to deliver vehicle shipping services
            and to communicate via SMS, email, and phone.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Pickup and delivery locations</li>
            <li>Vehicle year, make, and model</li>
            <li>Preferred shipping dates</li>
            <li>IP address and browser/device info (for security)</li>
          </ul>
          <p className="mt-2">
            We may also receive lead information from third-party lead providers
            that you have authorized.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide accurate transport quotes</li>
            <li>Arrange carrier bookings and pickups</li>
            <li>Send service updates, confirmations, and alerts</li>
            <li>Communicate via SMS, phone, or email</li>
            <li>Improve customer service and operations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            SMS Consent and Communication
          </h2>
          <p>
            By providing your mobile number, you agree to receive transactional
            SMS messages from Cheap Hauling related to your vehicle transport
            request.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Message Frequency:</strong> Varies based on order status
              and interactions
            </li>
            <li>
              <strong>Opt-Out:</strong> Reply STOP to unsubscribe at any time
            </li>
            <li>
              <strong>Help:</strong> Reply HELP or contact
              support@cheaphauling.com
            </li>
            <li>
              <strong>Carrier Charges:</strong> Standard message and data rates
              may apply
            </li>
          </ul>
          <p className="mt-2">
            We do not send promotional or marketing messages without explicit
            consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third
            parties for marketing purposes. Data may be shared only with
            verified carriers and service providers necessary to complete your
            shipment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Data Retention</h2>
          <p>
            We retain quote requests, customer messages, and transaction records
            for as long as needed to fulfill services or comply with legal and
            regulatory obligations. You may request deletion of your data at any
            time (see <strong>Your Rights</strong> section).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Website Cookies & Tracking
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Remember your preferences (e.g., quote form details)</li>
            <li>Enable account login sessions (if applicable)</li>
            <li>Analyze site performance using tools like Google Analytics</li>
          </ul>
          <p className="mt-2">
            You can disable cookies via your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Comments & Embedded Content
          </h2>
          <p>
            When visitors leave comments, we collect the data entered along with
            their IP and browser info to detect spam. Posts may include embedded
            content (e.g., videos, maps) that behaves like you visited the
            third-party site directly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Request a copy of the personal data we hold about you</li>
            <li>Correct or update inaccurate data</li>
            <li>
              Request deletion of your data (excluding data held for legal or
              security purposes)
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email us at{" "}
            <a
              href="mailto:support@cheaphauling.com"
              className="text-primary font-medium underline"
            >
              support@cheaphauling.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p>
            We apply reasonable technical and administrative safeguards to
            protect your data from unauthorized access, alteration, or
            disclosure. Only authorized staff have access to sensitive customer
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated periodically. Continued use of
            our services after changes constitutes your acceptance of the
            updated terms.
          </p>
        </section>
      </div>
    </section>
  );
}
