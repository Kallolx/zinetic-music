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
  title: "Catalog Management",
  description:
    "Manage your entire music catalog with precision. Organize releases, optimize metadata, and maintain full visibility over your music at every stage.",
  alternates: { canonical: "/catalog-management" },
  openGraph: {
    title: "Catalog Management | Zinetic Music",
    description:
      "Professional music catalog management and metadata optimization for independent artists.",
    url: "https://zineticmusic.com/catalog-management",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalog Management | Zinetic Music",
    description:
      "Professional music catalog management for independent artists.",
    images: ["/logo.png"],
  },
};

const BENEFITS = [
  {
    title: "All-in-One Music Dashboard",
    description:
      "Manage singles, albums, EPs, and every release from a single, unified workspace. No more scattered files or missed releases.",
  },
  {
    title: "Smart Metadata Optimization",
    description:
      "Ensure your music appears correctly with clean, structured metadata across all 150+ platforms — every time.",
  },
  {
    title: "Release Planning & Control",
    description:
      "Schedule, edit, and launch releases at the right time with full scheduling control over when and where your music goes live.",
  },
];

const SHOWCASE = [
  {
    title: "Organize Your Entire Discography in One Place",
    description:
      "From debut singles to full albums, your entire catalog lives in a structured, easy-to-navigate workspace. Search, filter, and update releases in moments — no more hunting through emails or spreadsheets.",
    image: "/features/1.png",
  },
  {
    title: "Metadata That Travels Perfectly",
    description:
      "Wrong song credits or missing ISRCs cost you money. Our metadata optimizer ensures every field is complete, consistent, and accepted by every platform before you hit publish.",
    image: "/features/2.png",
  },
  {
    title: "Precision Content Scheduling",
    description:
      "Plan your releases with absolute accuracy. Set global launch dates, coordinate pre-saves, and manage your rollout timeline with a unified calendar view.",
    image: "/features/3.png",
  },
  {
    title: "Bulk Content Management",
    description:
      "Manage thousands of assets simultaneously. Update rights, modify metadata, or swap artwork across entire catalogs in a single workflow.",
    image: "/features/4.png",
  },
  {
    title: "Advanced Asset Tracking",
    description:
      "Track the journey of every audio file and piece of artwork. See exactly when platforms receive your content and when it goes live for listeners.",
    image: "/features/5.png",
  },
  {
    title: "Collaborative Credit Management",
    description:
      "Ensure everyone gets paid and credited correctly. Detailed split-sheets and contributor management tools built directly into your catalog database.",
    image: "/features/6.png",
  },
  {
    title: "Global Marketplace Distribution",
    description:
      "Your catalog is ready for the world. One-click export to over 150 digital stores and streaming platforms with zero metadata friction.",
    image: "/features/7.png",
  },
];

export default function CatalogManagementPage() {
  return (
    <main className="text-white">
      <ServiceHero
        badge="Catalog Management"
        title={
          <>
            Your Music,{" "}
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Perfectly Organized
            </span>
          </>
        }
        description="Manage your entire music catalog with precision. Keep every release clean, structured, and visible — from first upload to global distribution."
        ctaText="Start Managing"
      />

      {/* Tablet Mockup Section */}
      <div className="hidden md:block w-full mt-8 mb-20 px-4">
        <TabletMockup thumbnail="/dashboard/1.png" />
      </div>

      <FeatureBenefitGrid
        benefits={BENEFITS}
        images={["/images/1.png", "/images/2.png", "/images/3.png"]}
      />
      <FeatureShowcaseSection items={SHOWCASE} />
      <FeatureExploreGrid />
      <ServiceCTA
        title="Take Control of Your Music Catalog Today"
        description="Stop losing track of releases and metadata errors. Zinetic gives you a single, powerful place to manage everything."
        ctaText="Get Started Free"
        ctaHref="/contact"
      />
    </main>
  );
}
