"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SoftAurora from "@/components/SoftAurora";
import BorderGlow from "@/components/BorderGlow";

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
    <section className="relative overflow-hidden pt-36 lg:pt-24 min-h-[70vh] flex flex-col items-center">
      {/* Dynamic Aurora Background */}
      <div className="absolute top-0 left-0 right-0 h-full z-0 overflow-hidden pointer-events-none">
        <SoftAurora
          speed={0.2}
          scale={1.3}
          brightness={1.0}
          color1="#802CEE"
          color2="#DA35F7"
          noiseFrequency={2.5}
          noiseAmplitude={0.7}
          bandHeight={0.3}
          bandSpread={1.5}
          enableMouseInteraction={true}
          mouseInfluence={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-0 md:px-6 md:pt-20 md:pb-0 lg:pt-24 lg:pb-0 w-full">
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
