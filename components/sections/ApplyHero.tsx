"use client";

import { motion } from "framer-motion";
import Aurora from "../Aurora";

export function ApplyHero() {
  return (
    <section className="relative overflow-hidden pt-36 lg:pt-28 flex flex-col items-center">
      {/* Dynamic Aurora Background - Fixed to top section */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={["#802CEE", "#EA621F", "#DA35F7"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-12 md:px-6 md:pt-4 md:pb-16 lg:pt-8 lg:pb-20 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 mb-6"
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300">
            Distribution Onboarding
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading mt-2 tracking-tighter max-w-4xl mx-auto text-4xl font-semibold sm:text-5xl lg:text-7xl leading-[1.1] md:leading-[0.95]"
        >
          Join the Global{" "}
          <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-transparent">
            Zinetic Network
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
