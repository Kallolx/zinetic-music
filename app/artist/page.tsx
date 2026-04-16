import { ParallaxBoxes } from "@/components/sections/ParallaxBoxes";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { ServiceHero } from "@/components/sections/ServiceHero";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artist Manager Service',
  description: 'Professional music catalog management, global distribution, and automated royalty tracking built specifically for independent artists and their managers.',
  alternates: {
    canonical: '/artist',
  },
};

const ARTIST_FEATURES_DATA = [
  {
    id: "catalog-management",
    title: "Music Catalog Management",
    heading: "Manage Your Music Like a Professional",
    description:
      "Your music is your business — and it deserves a system that keeps everything organized and optimized. Zinetic Music helps you manage your entire catalog with precision, ensuring every release is clean, structured, and ready for global platforms. Avoid metadata errors, keep your releases consistent, and maintain full visibility over your music at every stage.",
    image: "",
    keyFeatures: [
      {
        title: "All-in-One Music Dashboard",
        description: "Manage singles, albums, and releases from one place.",
      },
      {
        title: "Smart Metadata Optimization",
        description:
          "Ensure your music appears correctly across all platforms.",
      },
      {
        title: "Release Planning & Control",
        description: "Schedule, edit, and manage your releases with ease.",
      },
      {
        title: "Instant Catalog Updates",
        description: "Make changes anytime without delays.",
      },
      {
        title: "Performance Tracking",
        description: "Monitor how your music is performing in real time.",
      },
    ],
  },
  {
    id: "rights-ownership",
    title: "Rights & Ownership Control",
    heading: "Stay in Control of Your Music Rights",
    description:
      "Confusion around ownership and splits can cost artists money. Zinetic Music ensures your rights are clearly defined, properly managed, and fully protected. Whether you collaborate or work independently, we help you maintain accurate ownership structures so your earnings are always correct.",
    image: "",
    keyFeatures: [
      {
        title: "Clear Ownership Structure",
        description: "Know exactly who owns what in every release.",
      },
      {
        title: "Flexible Split Management",
        description: "Handle collaborations without confusion.",
      },
      {
        title: "Secure Rights Protection",
        description: "Keep your music protected across platforms.",
      },
      {
        title: "Accurate Revenue Allocation",
        description: "Ensure every contributor gets paid correctly.",
      },
      {
        title: "Transparent Agreements",
        description: "No hidden errors or unclear deals.",
      },
    ],
  },
  {
    id: "distribution-presence",
    title: "Distribution & Platform Presence",
    heading: "Release Globally. Stay Consistent Everywhere.",
    description:
      "Getting your music on platforms is just the start — managing how it appears is what truly matters. Zinetic Music ensures your releases are delivered globally while maintaining consistency across Spotify, Apple Music, YouTube, Facebook, TikTok, and more. We make sure your artist identity stays unified everywhere.",
    image: "",
    keyFeatures: [
      {
        title: "Worldwide Distribution",
        description: "Reach listeners on all major streaming platforms.",
      },
      {
        title: "Artist Profile Alignment",
        description: "Keep your profiles clean, verified, and connected.",
      },
      {
        title: "Flexible Release Control",
        description: "Launch globally or target specific markets.",
      },
      {
        title: "Platform Optimization",
        description: "Improve visibility and presentation of your music.",
      },
      {
        title: "UGC Monetization Enabled",
        description: "Earn from TikTok, Reels, Shorts, and more.",
      },
    ],
  },
  {
    id: "earnings-tracking",
    title: "Earnings & Revenue Tracking",
    heading: "Track Every Dollar You Earn",
    description:
      "Stop guessing your earnings. Zinetic Music gives you a clear, structured view of your revenue across all platforms. Understand where your money is coming from, track your growth, and stay in control of your financial data without complexity.",
    image: "",
    keyFeatures: [
      {
        title: "Unified Earnings Dashboard",
        description: "See all your income in one place.",
      },
      {
        title: "Platform-Level Breakdown",
        description: "Understand revenue from each DSP.",
      },
      {
        title: "Real-Time Data Updates",
        description: "Stay informed with up-to-date earnings.",
      },
      {
        title: "Accurate Financial Tracking",
        description: "No missing or incorrect data.",
      },
      {
        title: "Multi-Currency Support",
        description: "Handle global earnings effortlessly.",
      },
    ],
  },
  {
    id: "royalty-payouts",
    title: "Royalty Management & Payouts",
    heading: "Get Paid Accurately. Without Delays.",
    description:
      "Royalty confusion is one of the biggest problems artists face. Zinetic Music simplifies everything — from tracking to payout. We ensure your earnings are calculated correctly, clearly reported, and paid on time, so you can focus on your music.",
    image: "",
    keyFeatures: [
      {
        title: "Transparent Royalty System",
        description: "Understand exactly how your earnings are calculated.",
      },
      {
        title: "Fast & Reliable Payouts",
        description: "Receive your money without unnecessary delays.",
      },
      {
        title: "Collaboration Support",
        description: "Handle splits across multiple contributors.",
      },
      {
        title: "Detailed Earnings Reports",
        description: "Access full breakdowns anytime.",
      },
      {
        title: "Secure Global Payments",
        description: "Safe and consistent payouts worldwide.",
      },
    ],
  },
  {
    id: "analytics-growth",
    title: "Analytics & Career Growth",
    heading: "Turn Data Into Growth",
    description:
      "Your growth depends on understanding your audience. Zinetic Music provides powerful insights into your performance, helping you make smarter decisions. Track trends, identify opportunities, and build your fanbase with real data — not guesswork.",
    image: "",
    keyFeatures: [
      {
        title: "Complete Performance Overview",
        description: "All your stats in one dashboard.",
      },
      {
        title: "Streaming & Trend Insights",
        description: "Understand what’s working and why.",
      },
      {
        title: "Audience Analytics",
        description: "Know who your listeners are.",
      },
      {
        title: "Growth Opportunities",
        description: "Identify where to scale your music.",
      },
      {
        title: "Easy Data Access",
        description: "Share insights with your team anytime.",
      },
    ],
  },
  {
    id: "artist-support",
    title: "Artist Support & Platform Fixes",
    heading: "Real Support. Real Solutions. Not Just Distribution.",
    description:
      "Most platforms stop at distribution — we don’t. Zinetic Music actively supports artists in solving real problems across platforms. From OAC setup to fixing release issues, we make sure your music and profiles work exactly as they should.",
    image: "",
    isFooter: true,
    keyFeatures: [
      {
        title: "YouTube Official Artist Channel (OAC) Setup",
        description: "Get your channel verified and unified professionally.",
      },
      {
        title: "Spotify, Apple & Social Profile Setup",
        description:
          "Ensure all your artist profiles are correctly linked and optimized.",
      },
      {
        title: "Topic Channel Merge & Fixes",
        description: "Resolve duplicate or incorrect YouTube topic channels.",
      },
      {
        title: "Content ID & Claim Resolution",
        description: "Handle copyright claims and protect your music.",
      },
      {
        title: "UGC Monetization Support",
        description:
          "Earn from TikTok, Facebook, Instagram, and YouTube Shorts.",
      },
      {
        title: "Release & Metadata Issue Fixes",
        description: "Fix missing tracks, wrong data, or delivery errors.",
      },
      {
        title: "Priority Artist Support Team",
        description: "Fast, expert help when you need it.",
      },
    ],
  },
];

export default function ArtistPage() {
  return (
    <main>
      {/* Hero Section */}
      <ServiceHero
        badge="For Artist Managers"
        title={
          <>
            Take Full Control of <br /> Your Music{" "}
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Everywhere It Matters
            </span>
          </>
        }
        description="From distribution to platform management, Zinetic Music gives artists complete control over their music, profiles, rights, and earnings — all in one powerful system."
        ctaText="Get Started"
      />

      <ParallaxBoxes />
      <ServiceFeatures data={ARTIST_FEATURES_DATA} />
      <ServiceCTA
        title="Your Music Deserves More Than Just Distribution"
        description="Zinetic Music gives you the tools, control, and support to grow your music career the right way. From release to revenue — everything is handled, so you can focus on creating."
        ctaText="Get Started"
      />
    </main>
  );
}
