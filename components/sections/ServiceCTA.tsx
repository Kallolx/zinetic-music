"use client";

import { motion } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";
import Link from "next/link";

interface ServiceCTAProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export function ServiceCTA({
  title,
  description,
  ctaText = "Get Started",
  ctaHref = "#",
}: ServiceCTAProps) {
  return (
    <section className="w-full py-10 px-4 md:px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <BorderGlow
          borderRadius={32}
          glowIntensity={0.8}
          colors={["#4F46E5", "#802CEE", "#EA621F"]}
          className="w-full"
        >
          <div className="flex flex-col items-center text-center py-20 px-6 md:px-12 bg-zinc-950/20 backdrop-blur-sm rounded-[32px]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tighter max-w-4xl"
            >
              {title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-md md:text-lg mb-10 max-w-3xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
              >
                {ctaText}
              </Link>
            </motion.div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
