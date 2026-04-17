import { VocalsClient } from "./VocalsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Vocal Maker",
  description:
    "Generate realistic AI vocals for your music. Choose from a variety of professional voice models and synthesize high-quality performances instantly.",
  alternates: {
    canonical: "/vocals",
  },
  openGraph: {
    title: "AI Vocal Maker | Zinetic Music",
    description: "High-quality AI vocal synthesis for modern music production.",
    url: "https://zineticmusic.com/vocals",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Vocal Maker | Zinetic Music",
    description: "High-quality AI vocal synthesis for modern music production.",
    images: ["/logo.png"],
  },
};

export default function VocalsPage() {
  return <VocalsClient />;
}
