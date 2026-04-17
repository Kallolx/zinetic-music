"use client";

import { motion } from "framer-motion";
import CircularGallery from "@/components/CircularGallery";


export function Features() {
  return (
    <section className="relative pb-24 bg-black pt-24 flex flex-col items-center overflow-hidden z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-1 px-4 pb-4"
      >
        <h2 className="text-4xl md:text-6xl font-heading font-semibold tracking-tighter text-white leading-[0.9]">
          Oparate all <br /> from  {""}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            1 Platform
          </span>
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-[600px] -mt-8"
      >
        <CircularGallery
          bend={2}
          borderRadius={0.05}
          font='bold 24px "Outfit", sans-serif'
        />
      </motion.div>
    </section>
  );
}
