"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Aurora from "../Aurora";
import { Confetti, type ConfettiRef } from "@/registry/magicui/confetti";

export function YouTubeNetworkHero() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <section 
      className="relative overflow-hidden pt-36 lg:pt-28 flex flex-col items-center"
      onMouseEnter={() => {
        confettiRef.current?.fire({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#DA35F7", "#EA621F", "#802CEE"],
        });
      }}
    >
      <Confetti
        ref={confettiRef}
        manualstart
        className="absolute top-0 left-0 z-0 size-full pointer-events-none"
      />
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
