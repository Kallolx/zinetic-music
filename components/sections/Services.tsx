"use client";

import { motion, Variants } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";

export function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      title: "MONETIZATION",
      description:
        "Maximize your earnings across all platforms. We collect your royalties from streaming, downloads, YouTube Content ID, and advanced audio fingerprinting worldwide.",
      image: "/icons/1.png",
      imageSize: "h-36",
    },
    {
      title: "DISTRIBUTION",
      description:
        "Deliver your releases to global platforms like Spotify, Apple Music, and Amazon. Track real-time listener analytics and plan targeted marketing or tours easily.",
      image: "/icons/3.png",
      imageSize: "w-full h-36",
    },
    {
      title: "VEVO DISTRIBUTION",
      description:
        "Launch your Official Vevo Channel with ease. Upload premium music videos, reach a massive global audience, and keep the maximum share of all royalties generated.",
      image: "/icons/2.png",
      imageSize: "w-full h-36",
    },
    {
      title: "YOUTUBE NETWORK",
      description:
        "Join our exclusive YouTube Network to expand your channel's reach. We help video creators and musicians boost their views, secure content, and multiply revenues.",
      image: "/icons/6.png",
      imageSize: "w-full h-36",
    },
    {
      title: "SOCIAL MEDIA MANAGEMENT",
      description:
        "Elevate your online presence across all major platforms. Our team handles content creation, publishing, and deep analytics for YouTube, Instagram, and Facebook.",
      image: "/icons/5.png",
      imageSize: "w-full h-36",
    },
    {
      title: "GROWTH OPTIMIZATION",
      description:
        "Unlock your channel's full potential with dedicated growth strategies. Gain a loyal, highly-engaged following through algorithm-driven promotional campaigns.",
      image: "/icons/4.png",
      imageSize: "w-full h-36",
    },
  ];

  return (
    <section className="relative py-12 bg-black overflow-hidden z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white leading-[1]">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Zinetic Music
            </span> <br /> {" "}
            for Your Distribution?
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="h-full group"
            >
              <BorderGlow
                className="h-full w-full rounded-[20px]"
                borderRadius={20}
              >
                <div className="p-6 pt-8 h-full flex flex-col rounded-[20px] bg-zinc-900/60 transition-colors duration-300">
                  <h3 className="text-xl font-heading font-bold tracking-tight mb-3 text-white group-hover:text-fuchsia-400 transition-colors text-left uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-8 text-left">
                    {feature.description}
                  </p>
                  <div className="mt-auto flex justify-center pb-2">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className={`${feature.imageSize} object-contain transition-all duration-300 group-hover:-translate-y-1`}
                    />
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
