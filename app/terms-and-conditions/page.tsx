import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Zinetic Music Limited",
  description: "Read the Terms and Conditions for using Zinetic Music Limited's music distribution and artist services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditions() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using the Zinetic Music Limited platform, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.`,
    },
    {
      title: "2. Eligibility",
      content: `You must be at least 18 years of age or the age of legal majority in your jurisdiction to create an account and use our services. If you are under the legal age, you must have the consent of a parent or legal guardian.`,
    },
    {
      title: "3. Service Description",
      content: `Zinetic Music Limited provides digital music distribution, marketing, and royalty accounting services. We act as an intermediary between you and Digital Service Providers (DSPs).`,
    },
    {
      title: "4. Content Ownership and Grant of Rights",
      content: `You retain 100% ownership of your music. By using our service, you grant us a non-exclusive, sub-licensable right to distribute, perform, and present your content to DSPs worldwide.`,
    },
    {
      title: "5. Royalties and Payments",
      content: `Zinetic Music Limited pays out 100% of the royalties received from DSPs to the artist, subject to any applicable processing fees or specific service agreements. Payouts are made according to our payment schedule and minimum threshold requirements.`,
    },
    {
      title: "6. Prohibited Content",
      content: `You may not upload content that infringes on third-party intellectual property rights, contains hate speech, or violates the terms of any DSP. We reserve the right to remove any content that violates these terms.`,
    },
    {
      title: "7. Termination",
      content: `You may terminate your account at any time. Zinetic Music Limited reserves the right to suspend or terminate your account if you violate these terms or for any other reason deemed necessary by the company.`,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms and Conditions</h1>
          <p className="text-zinc-500 text-sm">Last Updated: April 17, 2024</p>
        </header>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-zinc-900 pb-12 last:border-0">
              <h2 className="text-xl font-bold mb-4 text-zinc-100">{section.title}</h2>
              <p className="text-zinc-400 leading-relaxed text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-zinc-900 text-zinc-500 text-sm">
          <p>For any legal inquiries regarding these terms, please contact us at <a href="mailto:legal@zineticmusic.com" className="text-orange-500 hover:underline transition-all">legal@zineticmusic.com</a></p>
        </footer>
      </div>
    </main>
  );
}
