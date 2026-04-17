import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import {
  FeatureBenefitGrid,
  FeatureExploreGrid,
  FeatureShowcaseSection,
} from "@/components/sections/FeaturePageSections";
import { TabletMockup } from "@/components/ui/TabletMockup";

export const metadata: Metadata = {
  title: "Analytics & Insights",
  description:
    "Turn your streaming data into actionable growth decisions. Real-time analytics across every platform — audience, revenue, trends, and more.",
  alternates: { canonical: "/analytics-insights" },
  openGraph: {
    title: "Analytics & Insights | Zinetic Music",
    description:
      "Data-driven insights and real-time streaming analytics for independent artists.",
    url: "https://zineticmusic.com/analytics-insights",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics & Insights | Zinetic Music",
    description: "Turn your streaming data into actionable growth decisions.",
    images: ["/logo.png"],
  },
};

const BENEFITS = [
  {
    title: "Unified Performance Dashboard",
    description:
      "All your streaming stats, revenue data, and audience insights consolidated in a single, clear view — no more jumping between platform dashboards.",
  },
  {
    title: "Real-Time Streaming Data",
    description:
      "See how your music performs as it happens. Track plays, saves, and playlist adds in real time so you can react to momentum instantly.",
  },
  {
    title: "Audience Demographics",
    description:
      "Know exactly who is listening, where they're from, and what devices they use — so you can market smarter and grow faster.",
  },
];

const SHOWCASE = [
  {
    title: "Catalog Performance Analysis",
    description:
      "Get unmatched granularity into your catalog's reach. Track streaming volume and revenue trends across every release, platform, and territory from a single, high-fidelity dashboard.",
    image: "/features/18.png",
    ctaText: "Get Started",
  },
  {
    title: "Revenue Growth Tracking",
    description:
      "Visualize your financial trajectory with precision. Breakdown earnings by asset, market, and DSP to identify your primary revenue drivers and optimize your commercial strategy.",
    image: "/features/19.png",
    ctaText: "Get Started",
  },
  {
    title: "Advanced Playlist Insights",
    description:
      "Monitor your music's discovery journey in real-time. Stay notified on every playlist adds and analyze how different placements impact your streaming growth and artist momentum.",
    image: "/features/20.png",
    ctaText: "Get Started",
  },
  {
    title: "Seamless Data Portability",
    description:
      "Export high-resolution data for your entire team. Generate CSV or PDF reports with up to 1000 rows of granular analytics, making it easy to collaborate and make data-backed decisions.",
    image: "/features/21.png",
    ctaText: "Get Started",
  },
  {
    title: "Direct Audience Understanding",
    description:
      "Deep-dive into your fan demographics and engagement patterns. Track daily growth and location data to refine your marketing efforts and expand your global listener base.",
    image: "/features/22.png",
    ctaText: "Get Started",
  },
  {
    title: "UGC & Social Impact Monitoring",
    description:
      "Gain clear visibility into your music's viral performance. Track catalog reach across TikTok, YouTube, Meta, and Vevo to measure social traction and fan interaction globally.",
    image: "/features/23.png",
    ctaText: "Get Started",
  },
];

export default function AnalyticsInsightsPage() {
  return (
    <main className="bg-black text-white">
      <ServiceHero
        badge="Analytics & Insights"
        title={
          <>
            Data That Drives{" "}
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Real Growth.
            </span>
          </>
        }
        description="Stop guessing what's working. Real-time streaming data, audience demographics, and platform insights — all in one powerful dashboard built for artists who take their careers seriously."
        ctaText="Explore Analytics"
      />

      {/* Tablet Mockup Section */}
      <div className="hidden md:block w-full mt-8 mb-20 px-4">
        <TabletMockup thumbnail="/dashboard/4.png" />
      </div>

      <FeatureBenefitGrid
        benefits={BENEFITS}
        images={["/images/8.png", "/images/9.png", "/images/10.png"]}
      />
      <FeatureShowcaseSection items={SHOWCASE} />
      <FeatureExploreGrid />
      <ServiceCTA
        title="Stop Guessing. Start Growing."
        description="Artists who understand their data grow faster. Zinetic Music gives you the full picture — streams, revenue, audience, and trends — so every decision you make is backed by real insight."
        ctaText="Get Started Free"
        ctaHref="/contact"
      />
    </main>
  );
}
