"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabletMockupProps {
  className?: string;
  thumbnail?: string;
}

const DASHBOARD_IMAGES = [
  "/dashboard/1.png",
  "/dashboard/2.png",
  "/dashboard/3.png",
  "/dashboard/4.png",
  "/dashboard/5.png",
];

export function TabletMockup({ className, thumbnail }: TabletMockupProps) {
  const images = thumbnail ? [thumbnail, ...DASHBOARD_IMAGES] : DASHBOARD_IMAGES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn(
        "hidden md:block relative mx-auto w-full max-w-6xl px-4",
        className,
      )}
    >
      {/* Tablet Frame */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        whileHover="hover"
        variants={{
          hover: { scale: 1.01 },
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-white/10 ring-1 ring-white/10 backdrop-blur-2xl shadow-2xl shadow-white/5 group bg-black/5"
      >
        {/* Shimmering Light Reflection (triggered on hover) */}
        <motion.div
          variants={{
            hover: {
              x: ["-150%", "250%"],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              },
            },
          }}
          initial={{ x: "-150%", skewX: -45 }}
          className="absolute inset-0 z-20 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />

        {/* The Screen */}
        <div
          className="relative aspect-[15/8] overflow-hidden rounded-[1.8rem] bg-zinc-950 cursor-pointer"
          onClick={togglePlay}
        >
          {/* Main Content (Mockup Slideshow) */}
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`Dashboard ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 0.9, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Glass Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/5 pointer-events-none" />

          {/* Play/Pause Button Overlay - Only visible on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="group/btn relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl md:h-28 md:w-28 cursor-pointer"
              onClick={togglePlay}
            >
              <div className="absolute -inset-4 animate-pulse rounded-full bg-white/20 blur-xl group-hover/btn:bg-white/30" />
              <div className="absolute -inset-8 animate-pulse rounded-full bg-white/10 blur-2xl delay-75 group-hover/btn:bg-white/20" />

              {isPlaying ? (
                <Pause className="h-10 w-10 fill-black text-black md:h-12 md:w-12" />
              ) : (
                <Play className="ml-1 h-10 w-10 fill-black text-black md:h-12 md:w-12" />
              )}
            </div>
          </div>

          {/* Mini Playback Status (Visible when playing) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 1 : 0 }}
            className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-none"
          >
            <div className="w-2 h-2 rounded-full bg-[#EA621F] animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">
              Demo
            </span>
          </motion.div>

          {/* Bottom Bar Indicator (iOS style) */}
          <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
        </div>

        {/* Outer Glow Effect */}
        <div className="absolute -inset-10 -z-10 bg-purple-500/20 blur-[100px] opacity-50" />
      </motion.div>
    </div>
  );
}
