import { ServiceHero } from "@/components/sections/ServiceHero";
import { ParallaxBoxes } from "@/components/sections/ParallaxBoxes";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { FeatureSection } from "@/components/sections/ServiceFeatures";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Label Manager Service",
  description:
    "Comprehensive label management solutions including bulk catalog distribution, multi-artist royalty accounting, and dedicated platform support for growing record labels.",
  alternates: {
    canonical: "/label",
  },
  openGraph: {
    title: "Label Manager Service | Zinetic Music",
    description: "Scale your record label with professional catalog management and royalty accounting.",
    url: "https://zineticmusic.com/label",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Label Manager Service | Zinetic Music",
    description: "Comprehensive label management solutions for growing record labels.",
    images: ["/logo.png"],
  },
};

const LABEL_FEATURES_DATA: FeatureSection[] = [
  {
    id: "catalog-management",
    title: "Catalog Management",
    heading: "Advanced Catalog Management for Growing Labels",
    description:
      "Take full ownership of your entire music catalog with a system built for scale. Zinetic Music allows labels to organize releases, manage artists, and maintain accurate metadata across all platforms — from a single centralized environment. Whether you're handling a few releases or thousands, keep everything structured, optimized, and ready for global distribution without errors or delays.",
    image: "",
    keyFeatures: [
      {
        title: "Centralized Catalog Control",
        description:
          "Manage all artists, releases, and assets in one unified system.",
      },
      {
        title: "Smart Metadata Structuring",
        description:
          "Ensure every release is properly formatted for maximum visibility.",
      },
      {
        title: "Bulk Catalog Management",
        description:
          "Handle large catalogs efficiently with batch tools and workflows.",
      },
      {
        title: "Advanced Audio Format Support",
        description:
          "Manage high-quality and next-gen audio formats effortlessly.",
      },
      {
        title: "Catalog Performance Monitoring",
        description:
          "Track release performance across platforms and territories.",
      },
    ],
  },
  {
    id: "rights-management",
    title: "Rights Management",
    heading: "Complete Rights & Ownership Control",
    description:
      "Manage complex rights structures across multiple artists, collaborators, and releases with confidence. Zinetic Music enables labels to define ownership, automate splits, and maintain full transparency across their entire catalog. Avoid disputes, reduce manual errors, and ensure every stakeholder is accurately accounted for.",
    image: "",
    keyFeatures: [
      {
        title: "Multi-Artist Rights Management",
        description:
          "Handle rights across multiple artists and contributors easily.",
      },
      {
        title: "Automated Royalty Splits",
        description:
          "Ensure accurate revenue distribution across all stakeholders.",
      },
      {
        title: "Contract & Agreement Structuring",
        description: "Maintain clear and flexible deal structures.",
      },
      {
        title: "Content ID & Rights Protection",
        description: "Protect your catalog across UGC platforms globally.",
      },
      {
        title: "Transparent Revenue Allocation",
        description: "Keep full visibility over earnings distribution.",
      },
    ],
  },
  {
    id: "distribution-delivery",
    title: "Distribution & Delivery",
    heading: "Global Distribution with Full Control",
    description:
      "Deliver your catalog worldwide while maintaining full control over how your music is released and managed. Zinetic Music ensures fast, accurate delivery across all major DSPs and UGC platforms. Customize your distribution strategy by territory, platform, or release type — giving your label complete flexibility.",
    image: "",
    keyFeatures: [
      {
        title: "Global DSP Distribution",
        description: "Reach all major streaming platforms worldwide.",
      },
      {
        title: "Custom Distribution Control",
        description: "Set platform-level and territory-level delivery rules.",
      },
      {
        title: "Fast & Reliable Delivery",
        description: "Ensure releases go live without delays.",
      },
      {
        title: "Flexible Release Strategy",
        description: "Launch globally or regionally based on your plan.",
      },
      {
        title: "UGC Monetization Integration",
        description:
          "Earn from TikTok, YouTube, Facebook, Instagram, and more.",
      },
      {
        title: "Bulk Delivery System",
        description: "Distribute large volumes of content efficiently.",
      },
    ],
  },
  {
    id: "income-tracking",
    title: "Income Tracking",
    heading: "Advanced Revenue Tracking for Labels",
    description:
      "Gain complete visibility into your label’s revenue across all artists and platforms. Zinetic Music provides a structured system to track, organize, and analyze earnings without manual complexity. Stay informed, identify discrepancies, and manage financial data with confidence.",
    image: "",
    keyFeatures: [
      {
        title: "Multi-Artist Revenue Tracking",
        description: "Monitor earnings across your entire roster.",
      },
      {
        title: "Detailed Financial Insights",
        description: "Break down revenue by platform, release, and region.",
      },
      {
        title: "Automated Revenue Matching",
        description: "Link earnings directly to your catalog.",
      },
      {
        title: "Real-Time Reconciliation",
        description: "Identify and fix mismatches instantly.",
      },
      {
        title: "High-Volume Data Processing",
        description: "Handle large-scale financial data efficiently.",
      },
      {
        title: "Multi-Currency Support",
        description: "Manage global revenue streams seamlessly.",
      },
    ],
  },
  {
    id: "royalty-accounting",
    title: "Royalty Accounting",
    heading: "Accurate Royalty Accounting at Scale",
    description:
      "Simplify royalty calculations and payouts for your entire label. Zinetic Music automates complex royalty workflows, ensuring accurate reporting and timely payments across all artists and contributors. Reduce manual work while maintaining full transparency and trust.",
    image: "",
    keyFeatures: [
      {
        title: "Automated Royalty Calculations",
        description: "Generate accurate statements without manual effort.",
      },
      {
        title: "Multi-Artist Payment Distribution",
        description: "Handle payouts across large rosters effortlessly.",
      },
      {
        title: "Artist Portal Access",
        description: "Provide artists with real-time earnings visibility.",
      },
      {
        title: "Approval Workflow System",
        description: "Review and approve royalty runs efficiently.",
      },
      {
        title: "Secure Global Payouts",
        description: "Send payments worldwide with reliability.",
      },
      {
        title: "Transparent Financial Reporting",
        description: "Build trust with clear and structured reports.",
      },
    ],
  },
  {
    id: "analytics-insights",
    title: "Analytics & Insights",
    heading: "Data-Driven Growth for Your Label",
    description:
      "Make smarter business decisions with powerful insights into your catalog and artist performance. Zinetic Music transforms data into actionable intelligence — helping you identify trends, optimize releases, and scale your label effectively.",
    image: "",
    keyFeatures: [
      {
        title: "360° Catalog Overview",
        description: "Track performance across all artists and releases.",
      },
      {
        title: "Revenue & Trend Analysis",
        description: "Understand what’s driving your growth.",
      },
      {
        title: "Audience Insights",
        description: "Know who is listening and where.",
      },
      {
        title: "Playlist & Performance Alerts",
        description: "Track key milestones and opportunities.",
      },
      {
        title: "Team Data Access",
        description: "Share insights across your organization.",
      },
    ],
  },
  {
    id: "label-support",
    title: "Label Support & Platform Management",
    heading: "Dedicated Label Support & Platform Management",
    description:
      "Running a label involves more than distribution — it requires constant management across multiple platforms. Zinetic Music provides hands-on support to ensure your artists, releases, and profiles are correctly managed across YouTube, Spotify, Apple Music, Facebook, and UGC platforms.",
    image: "",
    isFooter: true,
    keyFeatures: [
      {
        title: "YouTube Official Artist Channel (OAC) Management",
        description:
          "Setup, verification, and maintenance for all artists under your label.",
      },
      {
        title: "Artist Profile Management (All DSPs)",
        description:
          "Ensure every artist profile is correctly linked and optimized.",
      },
      {
        title: "Topic Channel Merge & Fix Support",
        description:
          "Resolve duplicate or incorrect YouTube topic channels across artists.",
      },
      {
        title: "Content ID & Claim Resolution",
        description: "Handle third-party claims and protect your catalog.",
      },
      {
        title: "UGC Platform Monetization Support",
        description: "Maximize revenue from TikTok, Reels, Shorts, and more.",
      },
      {
        title: "Release Issue & Metadata Fixing",
        description:
          "Resolve missing releases, incorrect metadata, or delivery errors.",
      },
      {
        title: "Priority Label Support Team",
        description: "Fast, expert support tailored for label operations.",
      },
    ],
  },
];

export default function LabelPage() {
  return (
    <main>
      {/* Hero Section */}
      <ServiceHero
        badge="FOR RECORD LABELS"
        title={
          <>
            A Smarter Way to Run <br />
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Your Label
            </span>
          </>
        }
        description="Manage your catalog, artists, distribution, and earnings with a streamlined system designed for today’s music business."
        ctaText="Get Started"
      />

      <ParallaxBoxes />
      <ServiceFeatures data={LABEL_FEATURES_DATA} />
      <ServiceCTA
        title="Scale Your Label with Confidence"
        description="Zinetic Music gives you complete control over your catalog, artists, rights, and revenue — backed by real support and powerful tools. Operate smarter, grow faster, and manage your label without limitations."
        ctaText="Get Started"
      />
    </main>
  );
}
