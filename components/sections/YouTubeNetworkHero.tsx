"use client";

import { motion } from "framer-motion";
import SoftAurora from "@/components/SoftAurora";

export function YouTubeNetworkHero() {
  return (
    <section className="relative overflow-hidden pt-36 lg:pt-28 flex flex-col items-center">
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-12 md:px-6 md:pt-4 md:pb-16 lg:pt-8 lg:pb-20 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 mb-6"
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300">
            YouTube Network (MCN)
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading mt-2 tracking-tighter max-w-4xl mx-auto text-4xl font-semibold sm:text-5xl lg:text-7xl leading-[1.1] md:leading-[0.95]"
        >
          Scale Your YouTube Channel <br /> With{" "}
          <span className="bg-gradient-to-r from-[#FF0000] via-[#ff4d4d] to-[#FF0000] bg-clip-text text-transparent">
            Zinetic MCN
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
