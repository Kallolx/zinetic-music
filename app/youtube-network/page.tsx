import { YouTubeOnboarding } from "@/components/sections/YouTubeOnboarding";
import { YouTubeNetworkHero } from "@/components/sections/YouTubeNetworkHero";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Network MCN',
  description: 'Join the Zinetic Music Multi-Channel Network. We help music channels maximize their monetization, clear claims, and scale securely on YouTube.',
  alternates: {
    canonical: '/youtube-network',
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
