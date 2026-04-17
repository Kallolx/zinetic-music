import { AIGenClient } from "./AIGenClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Music Generator",
  description:
    "Transform your musical ideas into reality with our AI Music Generator. Create custom tracks, stems, and variations in seconds.",
  alternates: {
    canonical: "/ai-gen",
  },
  openGraph: {
    title: "AI Music Generator | Zinetic Music",
    description: "Bring your musical ideas to life in seconds with advanced AI synthesis.",
    url: "https://zineticmusic.com/ai-gen",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Music Generator | Zinetic Music",
    description: "Bring your musical ideas to life in seconds with advanced AI synthesis.",
    images: ["/logo.png"],
  },
};

export default function AIGenPage() {
  return <AIGenClient />;
}
