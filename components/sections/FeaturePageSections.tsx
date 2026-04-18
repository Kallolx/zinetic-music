"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BorderGlow from "@/components/BorderGlow";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  LayoutGrid,
  ShieldCheck,
  Globe,
  BarChart3,
} from "lucide-react";

// ─── Benefit Card ────────────────────────────────────────────────────────────
interface BenefitCardProps {
  title: string;
  description: string;
  isHighlighted?: boolean;
  image?: string;
}

export function FeatureBenefitCard({
  title,
  description,
  isHighlighted = false,
  image,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col rounded-3xl overflow-hidden border min-h-[380px] md:h-[420px] transition-all duration-300 ${
        isHighlighted
          ? "border-white/20 bg-[#EA621F] shadow-[0_20px_40px_rgba(234,98,31,0.2)]"
          : "border-white/10 bg-zinc-900/40 hover:border-white/20"
      }`}
    >
      {/* Header Info */}
      <div className="p-6 md:p-8 pb-4 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="/icons/spark.png"
            alt="spark"
            width={20}
            height={20}
            className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-all ${isHighlighted ? "brightness-0 invert" : ""}`}
          />
          <h3
            className={`text-lg md:text-xl font-bold tracking-tight text-white`}
          >
            {title}
          </h3>
        </div>
        <p
          className={`text-xs md:text-sm leading-relaxed max-w-[95%] md:max-w-[90%] font-sans ${isHighlighted ? "text-orange-50/90" : "text-zinc-400"}`}
        >
          {description}
        </p>
      </div>

      {/* Image Content - Bottom Touching */}
      <div className="flex-1 relative w-full mt-auto flex items-end overflow-hidden">
        {image && (
          <div className="relative w-full h-[200px] md:h-[240px] px-4">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Benefit Grid ─────────────────────────────────────────────────────────────
interface BenefitGridProps {
  benefits: { title: string; description: string }[];
  images?: string[];
}

export function FeatureBenefitGrid({ benefits, images }: BenefitGridProps) {
  const defaultImages = ["/images/1.png", "/images/2.png", "/images/3.png"];
  const displayImages = images || defaultImages;

  return (
    <section className="relative z-20 w-full py-12 md:py-20 px-4 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold tracking-tighter text-white"
          >
            Benefits
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <FeatureBenefitCard
              key={b.title}
              title={b.title}
              description={b.description}
              isHighlighted={i === 1}
              image={displayImages[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Feature Showcase Row (image + text alternating) ─────────────────────────
interface ShowcaseItem {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  image: string;
  reversed?: boolean;
}

export function FeatureShowcaseRow({
  title,
  description,
  ctaText = "Get Started",
  ctaHref = "/apply",
  image,
  reversed = false,
}: ShowcaseItem) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center w-full"
    >
      {/* Visual side - Raw Image - Symmetric 50% split with outer padding */}
      <div
        className={`w-full relative h-[300px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden px-4 lg:px-14 ${reversed ? "lg:order-last" : "lg:order-first"}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-w-768px) 100vw, 50vw"
        />
      </div>

      {/* Text side - Symmetric 50% split with outer padding */}
      <div
        className={`w-full flex flex-col gap-4 md:gap-6 text-center lg:text-left items-center lg:items-start text-white px-4 lg:px-14 ${
          reversed ? "lg:order-first" : "lg:order-last"
        }`}
      >
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-semibold tracking-tighter leading-[1]">
          {title}
        </h3>
        <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-sans font-normal tracking-tight">
          {description}
        </p>

        {/* BorderGlow CTA Style matching ServiceHero */}
        <div className="mt-1">
          <BorderGlow
            borderRadius={16}
            glowColor="18 83 52"
            glowIntensity={1}
            colors={["#762BED", "#EA621F"]}
            className="w-fit cursor-pointer"
          >
            <Link
              href={ctaHref}
              className="flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn"
            >
              <Play className="h-4 w-4 md:h-5 md:w-5 fill-white" />
              <span className="text-base md:text-lg tracking-tight">
                {ctaText}
              </span>
            </Link>
          </BorderGlow>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Feature Showcase Section ─────────────────────────────────────────────────
interface ShowcaseSectionProps {
  items: Omit<ShowcaseItem, "reversed">[];
}

export function FeatureShowcaseSection({ items }: ShowcaseSectionProps) {
  return (
    <section className="relative z-10 w-full py-20 px-4 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32">
        {items.map((item, i) => (
          <FeatureShowcaseRow
            key={item.title}
            {...item}
            reversed={i % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Explore Card ─────────────────────────────────────────────────────────────
interface ExploreCardProps {
  title: string;
  icon: string;
  href: string;
  color: "purple" | "orange" | "green" | "blue";
}

// ─── Standardized Explore Cards ───────────────────────────────────────────────
export const UNIVERSAL_EXPLORE_CARDS: ExploreCardProps[] = [
  {
    title: "Catalog Management",
    icon: "/icons/cat.svg",
    href: "/catalog-management",
    color: "purple",
  },
  {
    title: "Rights Management",
    icon: "/icons/rig.svg",
    href: "/rights-management",
    color: "orange",
  },
  {
    title: "Digital Distribution",
    icon: "/icons/dis.svg",
    href: "/distribution",
    color: "orange",
  },
  {
    title: "Royalty Accounting",
    icon: "/icons/roy.svg",
    href: "/royalty-accounting",
    color: "orange",
  },
  {
    title: "Analytics & Insights",
    icon: "/icons/ana.svg",
    href: "/analytics-insights",
    color: "purple",
  },
];

export function FeatureExploreCard({
  title,
  icon,
  href,
  color,
}: ExploreCardProps) {
  const bgColors = {
    purple: "bg-[#4E2BB0]",
    orange: "bg-[#FF6A00]",
    green: "bg-[#01AE3F]",
    blue: "bg-[#008DFF]",
  };

  return (
    <Link href={href} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`relative flex flex-row items-center gap-4 h-[80px] md:h-[90px] px-6 rounded-xl overflow-hidden ${bgColors[color]} transition-opacity hover:opacity-90`}
      >
        {/* Icon Logo - Left */}
        <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Feature Name - Right */}
        <div className="relative z-10">
          <h4 className="text-white font-semibold text-base md:text-lg tracking-tight leading-tight">
            {title}
          </h4>
        </div>
      </motion.div>
    </Link>
  );
}

interface ExploreGridProps {
  title?: string;
  cards?: ExploreCardProps[];
}

export function FeatureExploreGrid({
  title = "Explore",
  cards = UNIVERSAL_EXPLORE_CARDS,
}: ExploreGridProps) {
  return (
    <section className="w-full py-20 px-4 md:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tighter text-white"
          >
            {title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-6">
          {cards.map((card) => (
            <FeatureExploreCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
