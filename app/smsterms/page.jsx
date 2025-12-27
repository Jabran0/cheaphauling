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
            Cheap Hauling LLC (“we,” “our,” or “us”) is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, and
            protect personal information, including information related to SMS
            communications.
          </p>

          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>
              Personal information such as name, phone number, email address,
              and mailing address
            </li>
            <li>Vehicle, transport, and service-related details</li>
            <li>SMS consent records and communication history</li>
            <li>
              IP address and browser/device information for security purposes
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
          <ul className="list-disc list-inside space-y-1 mb-6">
            <li>Provide hauling and logistics services</li>
            <li>
              Communicate with customers regarding quotes, bookings, pickups,
              deliveries, and support
            </li>
            <li>
              Send SMS messages related to service inquiries, confirmations, and
              updates
            </li>
            <li>Improve service quality and comply with legal requirements</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">Information Sharing</h2>
          <p className="mb-6">
            Cheap Hauling LLC does not sell or share personal information for
            marketing purposes. Mobile opt-in, SMS consent, and phone numbers
            collected for SMS communication purposes will not be shared with
            third parties. Information may only be shared when required to
            fulfill services or comply with applicable laws.
          </p>

          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p className="mb-6">
            We maintain reasonable safeguards to protect personal data from
            unauthorized access or disclosure. Only authorized staff have access
            to sensitive information.
          </p>

          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="mb-6">
            Cheap Hauling LLC
            <br />
            54 State St Ste 804, Albany, NY 12207
            <br />
            Phone: 205-852-6534
            <br />
            Email:{" "}
            <a
              href="mailto:Admin@cheaphauling.net"
              className="underline font-medium"
            >
              Admin@cheaphauling.net
            </a>
            <br />
            Website:{" "}
            <a
              href="https://cheaphauling.net"
              className="underline font-medium"
            >
              https://cheaphauling.net
            </a>
          </p>
        </section>

        {/* SMS Terms & Conditions */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
            SMS Terms & Conditions
          </h1>

          <h2 className="text-xl font-semibold mb-2">
            1. SMS Consent Communication
          </h2>
          <p className="mb-4">
            Phone numbers obtained as part of the SMS consent process will not
            be shared with third parties for marketing purposes.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            2. Types of SMS Communications
          </h2>
          <p className="mb-4">
            If you have consented to receive SMS messages from Cheap Hauling
            LLC, messages will be for transactional and service purposes only.
          </p>
          <p className="mb-4 italic">
            Example Message: “Hello, this is Cheap Hauling LLC regarding your
            transport request. Reply STOP to opt out of SMS messaging.”
          </p>

          <h2 className="text-xl font-semibold mb-2">3. Message Frequency</h2>
          <p className="mb-4">
            Message frequency may vary depending on service activity. You may
            receive up to 6–7 messages per week.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            4. Potential Fees for SMS Messaging
          </h2>
          <p className="mb-4">
            Standard message and data rates may apply based on your mobile
            carrier’s pricing plan. Rates may differ for domestic or
            international messages.
          </p>

          <h2 className="text-xl font-semibold mb-2">5. Opt-In Method</h2>
          <p className="mb-4">
            You may opt in verbally during a conversation or via other
            authorized methods.
          </p>

          <h2 className="text-xl font-semibold mb-2">6. Opt-Out Method</h2>
          <p className="mb-4">
            You may opt out at any time by replying <strong>STOP</strong> to any
            SMS message. You may also request removal by contacting us at
            205-852-6534 or{" "}
            <a
              href="mailto:Admin@cheaphauling.net"
              className="underline font-medium"
            >
              Admin@cheaphauling.net
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mb-2">7. Help</h2>
          <p className="mb-4">
            For assistance, reply <strong>HELP</strong> to any SMS message or
            contact us directly:
            <br />
            Phone: 205-852-6534
            <br />
            Email:{" "}
            <a
              href="mailto:Admin@cheaphauling.net"
              className="underline font-medium"
            >
              Admin@cheaphauling.net
            </a>
            <br />
            Website:{" "}
            <a
              href="https://cheaphauling.net"
              className="underline font-medium"
            >
              https://cheaphauling.net
            </a>
          </p>

          <h2 className="text-xl font-semibold mb-2">
            8. Standard Messaging Disclosures
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Message and data rates may apply</li>
            <li>Message frequency may vary</li>
            <li>
              You can opt out at any time by texting <strong>STOP</strong>
            </li>
            <li>
              For assistance, text <strong>HELP</strong> or review our policies
              here:{" "}
              <a
                href="https://cheaphauling.net/smsterms"
                className="underline font-medium"
              >
                SMS Terms & Privacy Policy
              </a>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
