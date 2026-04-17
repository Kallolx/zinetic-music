"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import Aurora from "../Aurora";

interface ServiceHeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string;
  ctaText?: string;
  showCta?: boolean;
  onCtaClick?: () => void;
}

export function ServiceHero({
  badge,
  title,
  description,
  ctaText = "Get Started",
  showCta = true,
  onCtaClick,
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-4 md:pb-0 md:min-h-[70vh] flex flex-col items-center">
      {/* Dynamic Aurora Background - Fixed to top section */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={["#802CEE", "#EA621F", "#DA35F7"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 md:px-6 md:pt-12 lg:pt-16 lg:pb-0 w-full">
        <div className="flex flex-col items-center text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 mb-6"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading mt-2 tracking-tighter max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-7xl leading-[1.1] md:leading-[0.95]"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans mt-8 text-sm text-zinc-400 md:text-base lg:text-lg tracking-tight leading-relaxed max-w-2xl px-4"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Button */}
          {showCta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 relative"
            >
              <Link href="/apply">
                <BorderGlow
                  borderRadius={16}
                  glowColor="18 83 52"
                  glowIntensity={1}
                  colors={["#762BED", "#EA621F"]}
                  className="w-fit cursor-pointer mx-auto"
                >
                  <div
                    onClick={onCtaClick}
                    className="flex items-center gap-3 px-10 py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn"
                  >
                    <Play className="h-5 w-5 fill-white transition-transform group-hover/btn:scale-110" />
                    <span className="text-lg tracking-tight">{ctaText}</span>
                  </div>
                </BorderGlow>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
