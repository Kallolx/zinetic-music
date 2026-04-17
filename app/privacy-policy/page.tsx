import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Zinetic Music Limited",
  description: "Learn how Zinetic Music Limited collects, uses, and protects your personal information and music metadata.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us when you create an account, apply for distribution, or communicate with us. This includes your name, email address, phone number, payment information, and any music-related data (metadata, audio files, artwork) you upload to our platform.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `Your information is used to provide, maintain, and improve our services, including processing your music distribution to DSPs, calculating and paying royalties, and communicating with you about your account and platform updates.`,
    },
    {
      title: "3. Data Sharing and Disclosure",
      content: `We share your music and related metadata with Digital Service Providers (DSPs) such as Spotify, Apple Music, and YouTube to fulfill our distribution services. We do not sell your personal information to third parties. We may disclose information if required by law or to protect our rights.`,
    },
    {
      title: "4. Data Security",
      content: `We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "5. Your Rights",
      content: `You have the right to access, correct, or delete your personal information. You can manage your data through your account dashboard or by contacting our support team.`,
    },
    {
      title: "6. Cookies and Tracking",
      content: `We use cookies to enhance your experience, analyze site usage, and remember your preferences. You can control cookie settings through your browser.`,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
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
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@zineticmusic.com" className="text-orange-500 hover:underline transition-all">privacy@zineticmusic.com</a></p>
        </footer>
      </div>
    </main>
  );
}
