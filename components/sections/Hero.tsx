"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Globe, CheckCircle2 } from "lucide-react";
import SoftAurora from "@/components/SoftAurora";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { TabletMockup } from "@/components/ui/TabletMockup";
import BorderGlow from "@/components/BorderGlow";

const BRANDS = Array.from({ length: 20 }, (_, i) => ({
  src: `/brands/${i + 1}.svg`,
  alt: `Brand ${i + 1}`,
}));

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-38 lg:pt-16 min-h-screen flex flex-col items-center">
      {/* Dynamic Aurora Background - Fixed to top section */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
        <SoftAurora
          speed={0.3}
          scale={1.2}
          brightness={1.2}
          color1="#802CEE"
          color2="#DA35F7"
          noiseFrequency={2.0}
          noiseAmplitude={0.8}
          bandHeight={0.4}
          bandSpread={1.2}
          enableMouseInteraction={true}
          mouseInfluence={0.15}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-20 lg:py-32 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading mt-2 tracking-tighter max-w-5xl text-5xl font-semibold sm:text-4xl lg:text-7xl leading-[0.9] md:leading-[0.9]"
          >
            Revolutionize Your <br />
            <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
              Musical Journey
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans mt-6 text-sm text-zinc-400 md:text-md lg:text-lg tracking-tighter leading-relaxed max-w-2xl"
          >
            Easily release your songs to 150+ platforms. Keep 100% royalties. We
            are structurally primed to support you anywhere in the world.
          </motion.p>

          {/* Mobile-only Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8 text-zinc-500 md:hidden"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#762BED]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                150+ Stores
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EA621F]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                100% Royalties
              </span>
            </div>
          </motion.div>

          {/* CTA & Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 relative"
          >
            {/* Soft Glow behind button for mobile space filling */}
            <div className="absolute inset-0 -top-4 -bottom-4 bg-[#762BED]/20 blur-[40px] md:hidden rounded-full" />

            <BorderGlow
              borderRadius={16}
              glowColor="18 83 52"
              glowIntensity={1}
              colors={["#762BED", "#EA621F"]}
              className="w-fit cursor-pointer mx-auto"
            >
              <div className="flex items-center gap-3 px-8 py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn">
                <Play className="h-5 w-5 fill-white transition-transform group-hover/btn:scale-110" />
                <span className="text-lg tracking-tight">Start Distributing</span>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Logo Loop - Social Proof below button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="w-full mt-24 md:mt-12"
          >
            <LogoLoop
              logos={BRANDS}
              speed={25}
              gap={48}
              fadeOut={true}
              pauseOnHover={true}
            />
          </motion.div>

          {/* Tablet Mockup Section - Desktop only space */}
          <div className="w-full mt-24">
            <TabletMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
