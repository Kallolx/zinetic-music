import { YouTubeOnboarding } from "@/components/sections/YouTubeOnboarding";
import { YouTubeNetworkHero } from "@/components/sections/YouTubeNetworkHero";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "YouTube Network MCN",
  description:
    "Join the Zinetic Music Multi-Channel Network. We help music channels maximize their monetization, clear claims, and scale securely on YouTube.",
  alternates: {
    canonical: "/youtube-network",
  },
  openGraph: {
    title: "YouTube Network MCN | Zinetic Music",
    description: "Maximize your monetization and protect your content with our official YouTube MCN network.",
    url: "https://zineticmusic.com/youtube-network",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Network MCN | Zinetic Music",
    description: "Professional YouTube channel monetization and management.",
    images: ["/logo.png"],
  },
};

export default function YouTubeNetworkPage() {
  return (
    <main>
      <YouTubeNetworkHero />
      <div className="relative pb-32">
        <YouTubeOnboarding />
      </div>
    </main>
  );
}
