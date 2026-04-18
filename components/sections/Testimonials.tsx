"use client";

import { motion } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
        {
      name: "Samiya Chowdhury",
      role: "Singer",
      image: "/clients/sam.jpg",
      quote: "The global reach I've achieved through this platform is incredible. My traditional melodies are now being heard by audiences across Europe and America."
    },
    {
      name: "Shahrid Belal",
      role: "Singer",
      image: "/clients/sha.jpg",
      quote: "As a producer, I need precision and speed. Zinetic delivers on both fronts perfectly, making the distribution process feel completely effortless."
    },
    {
      name: "Rubel Khandokar",
      role: "Singer",
      image: "/clients/rub.jpg",
      quote: "Their content ID system is a lifesaver. It ensures that every time my music is used in a video, I'm getting credited and paid correctly. Highly recommend."
    },
    {
      name: "JS Sojib",
      role: "Singer and Composer",
      image: "/clients/js.jpg",
      quote: "The transparency in reporting is what sets them apart. I always know exactly where my revenue is coming from and when to expect it. Pure professional."
    },
    {
      name: "Monir Sarker",
      role: "Singer and Composer",
      image: "/clients/mon.jpg",
      quote: "Finally, a platform that understands the needs of independent folk artists. Their support team helped me navigate the digital landscape with ease."
    },
    {
      name: "Jahid Hasan",
      role: "Singer and Composer",
      image: "/clients/jah.jpg",
      quote: "Managing a local label's digital presence was tough until I joined Zinetic. Their bulk upload tools have saved us hundreds of hours of manual work."
    },
    {
      name: "Sojib Sorkar",
      role: "Baul Singer and Composer",
      image: "/clients/soj.jpg",
      quote: "Brilliant service and even more brilliant results. The way they synchronize music across all major social platforms is truly state-of-the-art."
    },
    {
      name: "AL Rafi",
      role: "Singer and Composer & Lyricist",
      image: "/clients/al.jpg",
      quote: "From underground beats to global streaming charts—this team made it happen. The marketing tools available in the dashboard are next-level."
    },
    {
      name: "Prem Islam",
      role: "Independent Creator",
      image: "/clients/pre.webp",
      quote: "Zinetic Music completely changed the game for me. Their fast royalty payments and clear dashboard are exactly what I needed to scale my global reach."
    },
    {
      name: "Ahmmed Humayun",
      role: "Independent Creator",
      image: "/clients/hum.webp",
      quote: "The level of detailed analytics and the incredible speed at which my releases hit platforms like Spotify is simply unmatched. Truly premium service."
    },
    {
      name: "Najmul Hasan",
      role: "Independent Creator",
      image: "/clients/naj.webp",
      quote: "Switching to their CMS network was the greatest decision for my YouTube channel. The content protection instantly multiplied my monthly revenue."
    },
    {
      name: "Rinku",
      role: "Recording Singer",
      image: "/clients/rin.avif",
      quote: "My audience grew faster than I ever thought possible. They manage all my distribution with zero headaches, so I just focus on singing and creating."
    },
    {
      name: "Rakib Singer",
      role: "Independent Singer",
      image: "/clients/rak.webp",
      quote: "A game changer for independent musicians looking to go global. The platform UI is extremely sleek and their distribution tools are just outstanding."
    },
    {
      name: "Siraj Khan",
      role: "Independent Creator",
      image: "/clients/sir.webp",
      quote: "Maximum royalties and incredible reach from day one. I've worked with many networks, but none provide the hands-on transparency that this team does."
    },
    {
      name: "Rana Bappy",
      role: "Independent Creator",
      image: "/clients/ran.webp",
      quote: "Delivering my music to Apple and YouTube has never been this smooth. I recommend this specific distribution pipeline to every creator I meet."
    },
    {
      name: "Miss Liton",
      role: "Independent Creator",
      image: "/clients/miss.webp",
      quote: "I can't imagine scaling my fanbase without their powerful marketing analytics. Five stars specifically for their amazing 24/7 client support!"
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden z-10 w-full">
      <div className="container mx-auto px-4 max-w-7xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white leading-[1]">
            Trusted by <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Creators Globally
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite Horizontal Sliding Marquee */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Left/Right Fading Overlays for smoothness */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div 
          className="flex gap-6 w-max py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 80, /* Increased to slow down the scrolling */
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="w-[350px] md:w-[450px] shrink-0 h-[280px]"
            >
              <BorderGlow
                className="h-full w-full rounded-[24px]"
                borderRadius={24}
              >
                <div className="p-8 h-full flex flex-col rounded-[24px] bg-zinc-900/60 transition-colors duration-300">
                  <div className="flex gap-1 text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-zinc-300 text-sm md:text-base italic leading-relaxed flex-1 mb-6">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  
                  <div className="mt-auto flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full border-2 border-zinc-800 object-cover"
                    />
                    <div>
                      <h4 className="text-white font-heading font-semibold text-lg leading-tight">
                        {testimonial.name}
                      </h4>
                      <div className="text-xs text-[#38bdf8] uppercase tracking-wider mt-1 font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Quote Mark */}
                  <Quote className="absolute right-6 opacity-60 bottom-6 w-16 h-16 text-white/[0.03] pointer-events-none" />
                </div>
              </BorderGlow>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
