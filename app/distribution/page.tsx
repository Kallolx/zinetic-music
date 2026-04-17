import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { TabletMockup } from "@/components/ui/TabletMockup";
import {
  FeatureBenefitGrid,
  FeatureExploreGrid,
  FeatureShowcaseSection,
} from "@/components/sections/FeaturePageSections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Music Distribution",
  description:
    "Release your music globally to 150+ platforms. Keep 100% of your royalties with fast, reliable distribution powered by Zinetic Music.",
  alternates: { canonical: "/distribution" },
  openGraph: {
    title: "Digital Music Distribution | Zinetic Music",
    description:
      "Release your music globally to 150+ platforms while keeping 100% of your royalties.",
    url: "https://zineticmusic.com/distribution",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Music Distribution | Zinetic Music",
    description:
      "Global music distribution for independent artists. Keep 100% of your royalties.",
    images: ["/logo.png"],
  },
};

const BENEFITS = [
  {
    title: "150+ Platform Reach",
    description:
      "Your music goes everywhere listeners are — Spotify, Apple Music, YouTube Music, Amazon, Tidal, TikTok, and 140+ more stores worldwide.",
  },
  {
    title: "Keep 100% of Your Royalties",
    description:
      "We don't take a cut of your earnings. Every cent your music generates goes directly to you — no hidden fees, no percentage deductions.",
  },
  {
    title: "Flexible Release Control",
    description:
      "Launch globally or target specific markets. Schedule releases in advance, set pre-saves, and maintain full control over your rollout.",
  },
];

const SHOWCASE = [
  {
    title: "Flexible DSP Deals",
    description:
      "Choose how you distribute your music with flexible deal options, including direct DSP, Merlin, or Revelator agreements. Work with our global network or integrate your own partners to build a distribution strategy that fits your needs.",
    image: "/features/12.png",
    ctaText: "Get Started",
  },
  {
    title: "Global Distribution",
    description:
      "Reach audiences worldwide through major and local streaming platforms, social media channels, and emerging ecosystems like gaming and fitness. Expand your visibility and grow your listener base across multiple markets.",
    image: "/features/13.png",
    ctaText: "Get Started",
  },
  {
    title: "UGC Monetization",
    description:
      "Earn from your music across leading user-generated content platforms such as TikTok, YouTube, Facebook, and Instagram. Get paid whenever your content is used, shared, or streamed by audiences globally.",
    image: "/features/14.png",
    ctaText: "Get Started",
  },
  {
    title: "Quality Control",
    description:
      "Maintain high standards with built-in metadata validation tools. Review and ensure your releases meet all platform requirements, reducing errors and delivering consistent, high-quality content across all DSPs.",
    image: "/features/15.png",
    ctaText: "Get Started",
  },
  {
    title: "Delivery Options",
    description:
      "Control how and when your music is released. Customize delivery settings by platform and region, and schedule releases to match your strategy, whether for global launches or targeted rollouts.",
    image: "/features/16.png",
    ctaText: "Get Started",
  },
  {
    title: "Batch Processing",
    description:
      "Manage large catalogs efficiently with batch operations. Deliver, update, or remove multiple releases across platforms in a single action, saving time and simplifying your workflow.",
    image: "/features/17.png",
    ctaText: "Get Started",
  },
];

const EXPLORE_CARDS = [
  {
    title: "Pre-Save Campaigns",
    description:
      "Build anticipation before release day with automated pre-save links.",
    tag: "Marketing",
  },
  {
    title: "UGC Monetization",
    description:
      "Earn from TikTok videos, Instagram Reels, and YouTube Shorts using your music.",
    tag: "Revenue",
  },
  {
    title: "Instant Store Delivery",
    description:
      "Get your music live on platforms faster with priority delivery pipelines.",
    tag: "Speed",
  },
  {
    title: "Regional Targeting",
    description:
      "Select specific countries or regions to focus your initial release push.",
    tag: "Strategy",
  },
  {
    title: "Artist Profile Linking",
    description:
      "Connect your music to verified artist profiles on Spotify, Apple, and more.",
    tag: "Identity",
  },
  {
    title: "Scheduled Re-Releases",
    description:
      "Re-distribute catalog releases with updated terms or metadata at any time.",
    tag: "Catalog",
  },
];

export default function DistributionPage() {
  return (
    <main className="bg-black text-white">
      <ServiceHero
        badge="Distribution"
        title={
          <>
            Release Globally.{" "}
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Keep Everything.
            </span>
          </>
        }
        description="Distribute your music to 150+ platforms worldwide. Keep 100% of your royalties with no hidden fees, no percentage cuts — just pure reach."
        ctaText="Start Distributing"
      />

      {/* Tablet Mockup Section */}
      <div className="hidden md:block w-full mt-8 mb-20 px-4">
        <TabletMockup thumbnail="/dashboard/2.png" />
      </div>

      <FeatureBenefitGrid
        benefits={BENEFITS}
        images={["/images/3.png", "/images/7.png", "/images/11.png"]}
      />
      <FeatureShowcaseSection items={SHOWCASE} />
      <FeatureExploreGrid />
      <ServiceCTA
        title="Your Music Deserves to Be Everywhere"
        description="Stop limiting your reach. With Zinetic Music distribution, your releases land on every major platform — fast, accurately, and without taking a cut of your earnings."
        ctaText="Distribute Now"
        ctaHref="/contact"
      />
    </main>
  );
}
