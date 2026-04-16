"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export interface FeatureSection {
  id: string;
  title: string;
  heading: string;
  description: string;
  image?: string;
  isFooter?: boolean;
  keyFeatures: {
    title: string;
    description: string;
  }[];
}

interface ServiceFeaturesProps {
  data: FeatureSection[];
}

export function ServiceFeatures({ data }: ServiceFeaturesProps) {
  const [activeSection, setActiveSection] = useState(data[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isInView = useInView(containerRef, { amount: 0, once: false });

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = data[0].id;
      const offset = window.innerHeight / 3; // Trigger when section hits upper 1/3 of screen

      for (let i = 0; i < data.length; i++) {
        const section = sectionRefs.current[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = data[i].id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      const scrollY = window.scrollY || window.pageYOffset;
      const top = section.getBoundingClientRect().top + scrollY - 120; // 120px offset for sticky headers
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black min-h-screen py-10 md:py-20"
    >
      <div className="w-full px-4 md:px-6 xl:px-12 grid grid-cols-1 xl:grid-cols-[240px_1fr_240px] gap-8 2xl:gap-16">
        {/* Left Sticky Sidebar (Hidden on smaller screens) */}
        <div className="hidden xl:block w-full">
          <div className="sticky top-32">
            <AnimatePresence>
              {isInView && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <nav className="flex flex-col">
                    {data.map((item, index) => (
                      <div key={item.id} className="flex flex-col">
                        {item.isFooter && (
                          <div className="h-[1px] w-full bg-zinc-800/50 my-4" />
                        )}
                        <button
                          onClick={() => handleNavClick(item.id, index)}
                          className={`text-left py-1.5 tracking-tight px-4 relative transition-colors ${
                            activeSection === item.id
                              ? "text-white font-bold"
                              : "text-zinc-500 hover:text-zinc-300 font-medium"
                          }`}
                        >
                          {item.title}
                        </button>
                      </div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center Content Area */}
        <div className="flex w-full justify-center">
          <div className="w-full max-w-4xl pb-40 flex flex-col gap-32 relative z-10">
            {data.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="scroll-mt-32"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter"
                >
                  {section.heading || section.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-zinc-300 text-base md:text-lg leading-relaxed mb-12 max-w-3xl"
                >
                  {section.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full aspect-[16/10] bg-[#0a0a0a] rounded-2xl md:rounded-3xl border border-white/5 mb-16 overflow-hidden relative flex items-center justify-center"
                >
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-center px-6">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <img 
                          src="/icons/spark.png" 
                          alt="" 
                          className="w-8 h-8 opacity-20" 
                        />
                      </div>
                      <span className="text-zinc-600 font-medium text-lg tracking-tight">
                        {section.title} Dashboard
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Key Features Grid */}
                {section.keyFeatures && section.keyFeatures.length > 0 && (
                  <div>
                    <h3 className="text-3xl font-bold tracking-tighter text-white mb-4">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      {section.keyFeatures.map((feature, fIndex) => (
                        <motion.div
                          key={fIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fIndex * 0.1 }}
                          className="bg-[#1c1c1c] rounded-xl p-6 border border-white/5 hover:bg-[#222] transition-colors"
                        >
                          <img 
                            src="/icons/spark.png" 
                            alt="" 
                            className="w-6 h-6 mb-4" 
                          />
                          <h4 className="text-white font-bold text-lg mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-zinc-400 text-base leading-relaxed">
                            {feature.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Spacer (Balances Grid on Desktop) */}
        <div className="hidden xl:block w-full"></div>
      </div>
    </section>
  );
}
