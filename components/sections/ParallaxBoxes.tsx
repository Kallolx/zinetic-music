"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const COLORS = [
  "#812BED", // Primary Purple
  "#DA35F7", // Secondary Pink
  "#EA621F", // Orange
  "#18181b", // Dark Zinc
  "#4F46E5", // Indigo
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Amber
];

const ROW_1_COLORS = [...COLORS, ...COLORS];
const ROW_2_COLORS = [...COLORS.slice().reverse(), ...COLORS.slice().reverse()];

export function ParallaxBoxes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1Raw = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const x2Raw = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const x1 = useSpring(x1Raw, { stiffness: 40, damping: 30, restDelta: 0.001 });
  const x2 = useSpring(x2Raw, { stiffness: 40, damping: 30, restDelta: 0.001 });

  return (
    <div
      ref={containerRef}
      className="relative w-full py-20 overflow-hidden bg-black"
    >
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Row 1: Left to Right */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-4 md:gap-6 whitespace-nowrap"
        >
          {ROW_1_COLORS.map((color, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex-shrink-0 w-36 h-36 md:w-56 md:h-56 rounded-md md:rounded-lg shadow-2xl"
              style={{ backgroundColor: color }}
            />
          ))}
        </motion.div>

        {/* Row 2: Right to Left */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-4 md:gap-6 whitespace-nowrap -ml-[200px]"
        >
          {ROW_2_COLORS.map((color, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex-shrink-0 w-36 h-36 md:w-56 md:h-56 rounded-md md:rounded-lg shadow-2xl"
              style={{ backgroundColor: color }}
            />
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
