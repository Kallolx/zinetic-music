import { AIMasteringClient } from "./AIMasteringClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Music Mastering",
  description:
    "Professional AI music mastering. Give your tracks the clarity, depth, and loudness they need to compete on global streaming platforms.",
  alternates: {
    canonical: "/ai-mastering",
  },
  openGraph: {
    title: "AI Music Mastering | Zinetic Music",
    description: "Professional AI-powered mastering for independent artists. Achieve studio-quality sound in seconds.",
    url: "https://zineticmusic.com/ai-mastering",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Music Mastering | Zinetic Music",
    description: "Professional AI-powered mastering for independent artists.",
    images: ["/logo.png"],
  },
};

export default function AIMasteringPage() {
  return <AIMasteringClient />;
}
