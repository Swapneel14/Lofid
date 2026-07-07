import React from "react";

function TermsAndConditions({ onClose }) {
  return (
    <div className="fixed! inset-0! z-[9999]! flex! items-center! justify-center! bg-slate-900/40! backdrop-blur-sm! p-4! sm:p-6!">
      {/* Modal Container */}
      <div className="w-full! max-w-4xl! bg-white! rounded-2xl! shadow-2xl! border! border-slate-200! flex! flex-col! max-h-[90vh]! animate-in! fade-in! zoom-in-95! duration-200!">
        
        {/* Sticky Header */}
        <div className="flex! justify-between! items-center! p-6! border-b! border-slate-100! bg-white/95! backdrop-blur-md! sticky! top-0! rounded-t-2xl!">
          <h1 className="text-2xl! md:text-3xl! font-bold! text-slate-900! tracking-tight!">
            Chat Room Terms and Conditions
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2! text-slate-400! hover:text-slate-700! hover:bg-slate-100! rounded-full! transition-colors! focus:outline-none! focus:ring-2! focus:ring-slate-200!"
              aria-label="Close"
            >
              <svg className="w-6! h-6!" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="p-6! md:p-8! overflow-y-auto! text-slate-600! space-y-6! text-sm! md:text-base! leading-relaxed!">
          <p className="text-slate-500! italic! text-sm! mb-2!">
            Last Updated: July 7, 2026
          </p>

          <p className="text-slate-700!">
            Welcome to our chat platform. By accessing or using the chat feature, you acknowledge that you have read, understood, and agree to comply with the following Terms and Conditions. These terms are intended to ensure a safe, respectful, and enjoyable environment for all users.
          </p>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              1. Acceptance of Terms
            </h2>
            <p>
              By using the chat room, you agree to abide by these Terms and Conditions, as well as any additional policies, guidelines, or rules published by the platform. Failure to comply with these terms may result in suspension or permanent termination of your access to the chat services.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              2. Privacy and Security
            </h2>
            
            <h3 className="text-lg! font-medium! text-slate-800! mt-5! mb-2!">
              2.1 No End-to-End Encryption
            </h3>
            <p className="mb-3!">
              The chat service provided on this platform is not end-to-end encrypted. While we implement reasonable security measures to protect user data, messages exchanged through the chat system should not be considered completely private or secure from unauthorized access.
            </p>
            <p className="mb-5!">
              Users acknowledge that electronic communications inherently involve certain security risks, and the platform cannot guarantee absolute confidentiality of chat messages.
            </p>

            <h3 className="text-lg! font-medium! text-slate-800! mt-5! mb-2!">
              2.2 Sharing Personal Information
            </h3>
            <p className="mb-3!">
              Users are strongly advised not to share sensitive, confidential, or personally identifiable information through the chat system. This includes, but is not limited to:
            </p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Passwords</li>
              <li>Banking or financial information</li>
              <li>Credit/Debit card details</li>
              <li>Government-issued identification numbers</li>
              <li>Aadhaar, Passport, PAN, Social Security or equivalent identification documents</li>
              <li>Home addresses</li>
              <li>Phone numbers</li>
              <li>Personal email addresses</li>
              <li>Medical information</li>
              <li>Confidential business information</li>
              <li>One-Time Passwords (OTPs)</li>
              <li>Authentication codes</li>
              <li>Private documents</li>
              <li>Any other sensitive personal information</li>
            </ul>
            <p className="mb-3!">
              The platform, its administrators, moderators, owners, employees, and affiliates shall not be held liable or responsible for any loss, damage, fraud, identity theft, financial loss, data breach, or any other consequences resulting from users voluntarily sharing such information with others.
            </p>
            <p className="font-medium! text-slate-700!">
              Users assume full responsibility for the information they choose to disclose.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              3. User Conduct
            </h2>
            <p className="mb-3!">All users are expected to maintain a respectful and welcoming environment.</p>
            
            <p className="font-medium! text-slate-800! mt-4! mb-2!">Users must:</p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Treat all members with respect and courtesy.</li>
              <li>Communicate in a civil and professional manner.</li>
              <li>Respect differences in opinions, cultures, and backgrounds.</li>
              <li>Engage in constructive discussions.</li>
            </ul>

            <p className="font-medium! text-slate-800! mt-4! mb-2!">Users must not:</p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Harass, threaten, intimidate, or bully other users.</li>
              <li>Use abusive, offensive, hateful, discriminatory, or obscene language.</li>
              <li>Promote violence or illegal activities.</li>
              <li>Share sexually explicit or inappropriate content.</li>
              <li>Attempt to impersonate another individual.</li>
              <li>Engage in activities intended to disrupt normal conversations.</li>
            </ul>
            <p>
              The platform reserves the right to remove any content or take disciplinary action against users whose behavior violates these standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              4. Reporting and Enforcement Policy
            </h2>
            <p className="mb-4!">To maintain a healthy community, users may report inappropriate behavior.</p>

            <h3 className="text-lg! font-medium! text-slate-800! mt-5! mb-2!">
              4.1 Report Threshold
            </h3>
            <p className="mb-3!">
              If a user receives more than three (3) valid reports, the user will receive an official warning or notification from the platform regarding their conduct.
            </p>
            <p className="mb-5!">
              If the user subsequently receives a fourth (4th) valid report, following review by the moderation team, the account may be suspended from the chat platform for two (2) days.
            </p>

            <h3 className="text-lg! font-medium! text-slate-800! mt-5! mb-2!">
              4.2 Serious Violations
            </h3>
            <p className="mb-3!">
              Certain violations may warrant immediate disciplinary action regardless of the number of reports received. Examples include, but are not limited to:
            </p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Hate speech</li>
              <li>Severe harassment</li>
              <li>Threats of violence</li>
              <li>Sexual exploitation</li>
              <li>Illegal activities</li>
              <li>Repeated abusive behavior</li>
              <li>Any conduct deemed harmful to the community</li>
            </ul>
            <p className="mb-3!">
              Depending on the severity of the violation, the platform may impose:
            </p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Extended temporary suspensions</li>
              <li>Long-term account restrictions</li>
              <li>Permanent bans</li>
              <li>Immediate termination of chat privileges without prior warning</li>
            </ul>
            <p>
              All disciplinary decisions shall be made at the sole discretion of the moderation team after reviewing the available evidence.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              5. Misuse of the Reporting System
            </h2>
            <p className="mb-3!">
              The reporting feature exists to protect the community and must be used responsibly.
            </p>
            <p className="font-medium! text-slate-800! mt-4! mb-2!">Users must not:</p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Submit false reports.</li>
              <li>Repeatedly report users without legitimate reasons.</li>
              <li>Abuse the reporting system to harass or target other users.</li>
              <li>Coordinate mass reporting against individuals.</li>
            </ul>
            <p className="mb-3!">
              If the platform determines that a user is intentionally abusing or spamming the reporting system, disciplinary action may be taken against the reporting user. Such actions may include:
            </p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>Warning notifications</li>
              <li>Temporary suspension</li>
              <li>Restriction of reporting privileges</li>
              <li>Temporary ban</li>
              <li>Permanent ban in cases of repeated or malicious abuse</li>
            </ul>
            <p>
              The platform reserves the exclusive right to determine whether a report has been submitted in bad faith.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              6. Moderation Rights
            </h2>
            <p className="mb-3!">
              The platform reserves the right to monitor chat activity, investigate reports, review user behavior, and take appropriate moderation actions when necessary.
            </p>
            <p className="mb-3!">
              Moderators may remove messages, issue warnings, temporarily suspend accounts, or permanently ban users who violate these Terms and Conditions or otherwise threaten the safety and integrity of the community.
            </p>
            <p>
              Moderation decisions will be based on available evidence and the platform's internal policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              7. Limitation of Liability
            </h2>
            <p className="mb-3!">The chat platform is provided on an "as available" basis.</p>
            <p className="mb-3!">
              To the fullest extent permitted by applicable law, the platform, its owners, administrators, moderators, employees, affiliates, and partners shall not be liable for:
            </p>
            <ul className="list-disc! pl-6! mb-4! space-y-1! text-slate-700!">
              <li>User-generated content.</li>
              <li>Statements or opinions expressed by users.</li>
              <li>Disputes arising between users.</li>
              <li>Loss of data.</li>
              <li>Financial losses.</li>
              <li>Emotional distress.</li>
              <li>Identity theft.</li>
              <li>Privacy breaches resulting from users voluntarily sharing information.</li>
              <li>Any direct, indirect, incidental, consequential, or special damages arising from the use of the chat service.</li>
            </ul>
            <p className="font-medium! text-slate-800!">
              Each user remains solely responsible for their own communications and interactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              8. Changes to These Terms
            </h2>
            <p className="mb-3!">
              The platform reserves the right to modify, amend, or update these Terms and Conditions at any time without prior notice.
            </p>
            <p className="mb-3!">
              Continued use of the chat service after any modifications constitutes acceptance of the revised Terms.
            </p>
            <p>
              Users are encouraged to review these Terms periodically to remain informed of any updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl! font-semibold! text-slate-800! mt-8! mb-3! border-b! border-slate-100! pb-2!">
              9. Acceptance
            </h2>
            <p>
              By accessing or using the chat feature, you acknowledge that you have read, understood, and agreed to these Chat Room Terms and Conditions. If you do not agree with any part of these Terms, you should discontinue use of the chat service immediately.
            </p>
          </section>
        </div>

        {/* Footer / Acknowledge Button */}
        <div className="p-4! md:p-6! border-t! border-slate-100! bg-slate-50! flex! justify-end! rounded-b-2xl!">
          <button
            onClick={onClose}
            className="px-6! py-2.5! bg-blue-600! hover:bg-blue-700! text-white! font-medium! rounded-lg! shadow-sm! transition-colors! focus:outline-none! focus:ring-4! focus:ring-blue-100!"
          >
            I Understand and Agree
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;