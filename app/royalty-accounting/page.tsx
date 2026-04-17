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
  title: "Royalty Accounting",
  description:
    "Automate royalty calculations, streamline approvals, and distribute earnings to artists with complete accuracy. Built for labels managing complex catalogs at scale.",
  alternates: { canonical: "/royalty-accounting" },
  openGraph: {
    title: "Royalty Accounting | Zinetic Music",
    description:
      "Generate accurate royalty statements, manage approvals, and pay artists on time — all in one system.",
    url: "https://zineticmusic.com/royalty-accounting",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royalty Accounting | Zinetic Music",
    description:
      "Automate royalty processing and ensure every artist gets paid accurately and on time.",
    images: ["/logo.png"],
  },
};

const BENEFITS = [
  {
    title: "Automate Back Office",
    description:
      "Eliminate manual accounting workflows and operational overhead.",
  },
  {
    title: "Transparent Workflows",
    description:
      "Maintain end-to-end clarity across approvals, reporting, and payouts.",
  },
  {
    title: "Client Portal Access",
    description:
      "Empower artists with secure, real-time access to their earnings and statements.",
  },
];

const SHOWCASE = [
  {
    title: "Automate Royalty Processing",
    description:
      "Simplify how your label handles royalty calculations and reporting. Zinetic Music automates complex workflows so you can generate accurate royalty statements across your entire catalog without manual effort. Reduce errors, save time, and scale your operations as your artist roster grows.",
    image: "/features/24.png",
    ctaText: "Get Started",
  },
  {
    title: "Simplify Approval Workflows",
    description:
      "Maintain full control over your royalty process with a structured approval system. Review and approve statements before payouts are processed, ensuring complete accuracy at every stage. This workflow reduces discrepancies, improves transparency, and keeps operations organized across all your artists and releases.",
    image: "/features/25.png",
    ctaText: "Get Started",
  },
  {
    title: "Analyze Royalty Earnings",
    description:
      "Gain deeper insights into your revenue across platforms, artists, and releases. Zinetic Music provides clear, structured data so you understand exactly where income is generated and how your catalog is performing across every DSP. Identify trends, monitor growth, and make informed decisions to scale your music business.",
    image: "/features/26.png",
    ctaText: "Get Started",
  },
  {
    title: "Accelerate Royalty Distribution",
    description:
      "Distribute earnings to your artists and collaborators quickly and reliably. Once balances are confirmed and approved, royalties flow efficiently through a secure global payment system. Support your roster with consistent, timely payments while maintaining complete control over your financial operations.",
    image: "/features/27.png",
    ctaText: "Get Started",
  },
  {
    title: "YouTube CMS & Channel Revenue",
    description:
      "Manage your YouTube network with full visibility and control. Track channel performance, monitor earnings, and distribute revenue accurately across multiple creators and channels. From Content ID revenue to channel monetization, everything is structured and transparent — helping you scale MCN operations without added complexity.",
    image: "/features/28.png",
    ctaText: "Get Started",
  },
  {
    title: "Secure & Flexible Global Payouts",
    description:
      "Pay every rights holder accurately through traditional or blockchain-based payment methods. Zinetic Music supports global bank transfers, PayPal, Payoneer, Wise, and digital asset options — eliminating manual tasks, reducing errors, and delivering complete transparency for every transaction.",
    image: "/features/29.png",
    ctaText: "Get Started",
  },
];

export default function RoyaltyAccountingPage() {
  return (
    <main className="bg-black text-white">
      <ServiceHero
        badge="Royalty Accounting"
        title={
          <>
            Automate Your
            <br />
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Royalty Accounting
            </span>
          </>
        }
        description="Automate complex royalty calculations, manage multi-artist statements, and distribute earnings reliably at scale. Purpose-built for labels that need precision, speed, and full transparency."
        ctaText="Start Managing"
      />

      {/* Tablet Mockup Section */}
      <div className="hidden md:block w-full mt-8 mb-20 px-4">
        <TabletMockup thumbnail="/dashboard/3.png" />
      </div>

      <FeatureBenefitGrid
        benefits={BENEFITS}
        images={["/images/4.png", "/images/12.png", "/images/13.png"]}
      />
      <FeatureShowcaseSection items={SHOWCASE} />
      <FeatureExploreGrid />
      <ServiceCTA
        title="Pay Every Artist Accurately and On Time."
        description="Zinetic Music gives you the tools to automate royalty processing, manage approvals, and distribute earnings to your entire roster — with full transparency at every step. Stop managing royalties manually and start scaling your label with confidence."
        ctaText="Get Started"
      />
    </main>
  );
}
