import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import Aurora from "@/components/Aurora";

export const metadata: Metadata = {
  title: "Contact Us - Zinetic Music Limited",
  description:
    "Get in touch with Zinetic Music Limited for support, partnership inquiries, or general questions about our music distribution services.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black pt-10 md:pt-20 relative overflow-hidden">
      {/* Dynamic Aurora Background - Fixed to top section */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={["#802CEE", "#EA621F", "#DA35F7"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <Contact />
    </main>
  );
}
