"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import Aurora from "@/components/Aurora";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background Shader */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        {/* Dynamic Aurora Background - Fixed to top section */}
        <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
          <Aurora
            colorStops={["#802CEE", "#EA621F", "#DA35F7"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Large Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >
          <h1 className="font-heading text-[12rem] font-black leading-none tracking-tighter md:text-[18rem]">
            <span className="bg-gradient-to-b from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent opacity-20">
              404
            </span>
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8"
            >
              <span className="bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE] bg-clip-text text-4xl tracking-tighter font-semibold text-transparent md:text-6xl">
                Lost in Sound
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-4 max-w-md text-balance text-lg text-zinc-400"
        >
          The track you're looking for has hit a silent note. Let's get you back
          to the main stage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12"
        >
          <Link href="/">
            <BorderGlow
              borderRadius={9999}
              glowColor="120 80 80"
              glowIntensity={0.8}
              colors={["#802CEE", "#DA35F7", "#EA621F"]}
              className="cursor-pointer"
            >
              <div className="group flex items-center gap-2 rounded-full bg-black/50 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all hover:bg-black/40">
                <span>Return Home</span>
              </div>
            </BorderGlow>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 flex items-center gap-8 text-zinc-600"
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 transition-colors hover:text-zinc-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Previous Page
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
