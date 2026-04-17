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
  title: "Rights Management",
  description:
    "Stay in full control of your music rights. Define ownership, manage splits, and protect your earnings with precision rights management built for independent artists.",
  alternates: { canonical: "/rights-management" },
  openGraph: {
    title: "Rights Management | Zinetic Music",
    description: "Define ownership, manage splits, and protect your music rights with precision.",
    url: "https://zineticmusic.com/rights-management",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rights Management | Zinetic Music",
    description: "Stay in full control of your music rights and splits.",
    images: ["/logo.png"],
  },
};

const BENEFITS = [
  {
    title: "Clear Ownership Structure",
    description:
      "Know exactly who owns what in every release. Define rights clearly so there's never confusion over who earns what.",
  },
  {
    title: "Flexible Split Management",
    description:
      "Handle collaborations without disputes. Set custom revenue splits for every contributor and track allocation automatically.",
  },
  {
    title: "Secure Rights Protection",
    description:
      "Your music is protected across all platforms. Content ID, takedown support, and claim management are handled for you.",
  },
];

const SHOWCASE = [
  {
    title: "Digital Contracts",
    description:
      "Create, customize, and manage music contracts in a structured digital environment. Whether working with a few collaborators or large teams, ensure every agreement is clearly defined, securely stored, and fully compliant with industry standards.",
    image: "/features/8.png",
    ctaText: "Get Started",
  },
  {
    title: "Rights Management",
    description:
      "Organize and process complex rights data with ease, including publishing splits and ownership details. Our system ensures every contributor’s share is accurately recorded and maintained across all projects.",
    image: "/features/9.png",
    ctaText: "Get Started",
  },
  {
    title: "Royalty Splits",
    description:
      "Automatically calculate and distribute royalties to all collaborators with precision. Eliminate manual errors, reduce delays, and ensure that every stakeholder receives their correct share on time.",
    image: "/features/10.png",
    ctaText: "Get Started",
  },
  {
    title: "Smart Contracts",
    description:
      "Leverage blockchain-based smart contracts to automate agreements and payments. Provide a secure, transparent, and tamper-resistant system that builds trust among all collaborators.",
    image: "/features/11.png",
    ctaText: "Get Started",
  },
];

export default function RightsManagementPage() {
  return (
    <main className="bg-black text-white">
      <ServiceHero
        badge="Rights Management"
        title={
          <>
            Own Your Music.{" "}
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Protect Every Note.
            </span>
          </>
        }
        description="Define ownership, manage splits, and protect your catalog across every platform. Your rights are your livelihood — we make sure they're always in order."
        ctaText="Protect My Music"
      />

      {/* Tablet Mockup Section */}
      <div className="hidden md:block w-full mt-8 mb-20 px-4">
        <TabletMockup />
      </div>

      <FeatureBenefitGrid
        benefits={BENEFITS}
        images={["/images/4.png", "/images/5.png", "/images/6.png"]}
      />
      <FeatureShowcaseSection items={SHOWCASE} />
      <FeatureExploreGrid />
      <ServiceCTA
        title="Your Rights Deserve More Than a Checkbox"
        description="Most platforms treat rights as an afterthought. At Zinetic, it's a core part of how we manage your music — from first upload to final payout."
        ctaText="Get Started Free"
        ctaHref="/contact"
      />
    </main>
  );
}
