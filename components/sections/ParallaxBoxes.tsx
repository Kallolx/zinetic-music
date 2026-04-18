"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const COLORS = [
  "#18181b", // Dark Zinc
  "#4F46E5", // Indigo (Blue)
  "#EA621F", // Orange
  "#812BED", // Primary Purple
];

// Helper to create a mixed row (2 Persone : 1 Logo)
const generateMixedRow = (brandStart: number, personStart: number, count: number) => {
  const row = [];
  for (let i = 0; i < count; i++) {
    // 2 People followed by 1 Logo (i=0,1 pers, i=2 logo)
    const isLogo = (i + 1) % 3 === 0;
    const color = COLORS[i % COLORS.length];
    
    if (isLogo) {
      const bIdx = (brandStart + Math.floor(i / 3)) % 20 + 1;
      row.push({ color, icon: `/brands/${bIdx}.svg`, type: 'logo' });
    } else {
      const pIdx = (personStart + i - Math.floor(i / 3)) % 10 + 1;
      row.push({ color, icon: `/brands/p${pIdx}.png`, type: 'person' });
    }
  }
  return row;
};

const ROW_1_DATA = generateMixedRow(1, 1, 15);
const ROW_2_DATA = generateMixedRow(10, 5, 15);

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
      className="relative w-full py-20 overflow-hidden"
    >
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Row 1: Left to Right */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-4 md:gap-6 whitespace-nowrap"
        >
          {ROW_1_DATA.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex-shrink-0 w-36 h-36 md:w-56 md:h-56 rounded-md md:rounded-[40px] shadow-2xl flex items-center justify-center p-0 overflow-hidden"
              style={{ backgroundColor: item.color }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={item.icon}
                  alt={item.type}
                  fill
                  className={`transition-all duration-500 ${
                    item.type === 'logo' 
                      ? "object-contain p-8 opacity-100" 
                      : "object-cover opacity-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2: Right to Left */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-4 md:gap-6 whitespace-nowrap -ml-[200px]"
        >
          {ROW_2_DATA.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex-shrink-0 w-36 h-36 md:w-56 md:h-56 rounded-md md:rounded-[40px] shadow-2xl flex items-center justify-center p-0 overflow-hidden"
              style={{ backgroundColor: item.color }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={item.icon}
                  alt={item.type}
                  fill
                  className={`transition-all duration-500 ${
                    item.type === 'logo' 
                      ? "object-contain p-8 brightness-0 invert opacity-100" 
                      : "object-cover opacity-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
