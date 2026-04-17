import { ApplyHero } from "@/components/sections/ApplyHero";
import { ApplyForm } from "@/components/sections/ApplyForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Zinetic Music | Artist & Label Application",
  description: "Apply to join Zinetic Music Limited. We provide global music distribution, royalty accounting, and dedicated support for independent artists and labels worldwide.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply to Zinetic Music | The Future of Sound",
    description: "Start your musical journey with professional distribution and support. Fast-track your application today.",
    url: "https://zineticmusic.com/apply",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Zinetic Music | Artist & Label Application",
    description: "Scale your music career with global distribution and 100% royalties.",
    images: ["/logo.png"],
  },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-black">
      <ApplyHero />
      <ApplyForm />
    </main>
  );
}
