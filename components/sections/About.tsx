"use client";

import { motion } from "framer-motion";
import { AvatarCircles } from "@/components/ui/AvatarCircles";
import CountUp from "@/components/ui/CountUp";
import { CircleDollarSign } from "lucide-react";

const avatarUrls = [
  {
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop",
    profileUrl: "#",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=2080&auto=format&fit=crop",
    profileUrl: "#",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop",
    profileUrl: "#",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=1965&auto=format&fit=crop",
    profileUrl: "#",
  },
];

const systemSpecs = [
  {
    label: "Channels",
    value: 155,
    suffix: "+",
    gradient: false,
  },
  {
    label: "Revenue Paid",
    value: 249700,
    prefixNode: <CircleDollarSign className="w-7 h-7 md:w-10 md:h-10 self-center mr-1 text-[#EA621F]" />,
    separator: ",",
    gradient: true,
  },
  {
    label: "Subscribers",
    value: 13,
    suffix: "M",
    gradient: true,
  },
  {
    label: "Always active",
    value: 24,
    suffix: "X7",
    gradient: false,
  }
];

export function About() {
  return (
    <section className="relative py-24 bg-black overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-12"
        >
          {/* Centered Header with Logo */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter text-white leading-[1.1] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span>Meet</span>
              <img src="/logo.png" alt="Zinetic Logo" className="h-10 md:h-20 w-auto" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#762BED] to-[#EA621F] text-center">Zinetic Music</span>
            </h2>
            
            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              <p className="text-white font-medium">
                Zinetic Music Limited is the leading Music Distribution Company & Record Label And YouTube CMS/MCN Services Provider.
              </p>
              <p>
                Our service: Empowering artists, labels, and distributors to monetize their music and videos independently. It offers real-time analytics and earnings insights, enabling global releases of singles, albums, and videos at zero cost to the creators.
              </p>
            </div>

            {/* Avatars Side-by-Side with Text */}
            <div className="pt-4 flex items-center justify-center gap-6">
              <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
              <p className="text-white text-base md:text-lg font-medium">Trusted by 10,000+ Artists</p>
            </div>
          </div>

          {/* Stats Grid - Smaller text, specific prefixes/suffixes, explicit gradients */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {systemSpecs.map((spec, index) => (
              <div 
                key={index}
                className="flex flex-col items-center space-y-2"
              >
                <div className={`text-3xl md:text-5xl font-heading font-bold flex items-center justify-center ${!spec.gradient ? 'text-white' : 'text-transparent bg-clip-text bg-[#EA621F]'}`}>
                  {spec.prefixNode && spec.prefixNode}
                  <CountUp 
                    to={spec.value} 
                    duration={2.5} 
                    delay={0.2 * index} 
                    separator={spec.separator || ""}
                  />
                  {spec.suffix && <span className="text-xl md:text-3xl ml-1">{spec.suffix}</span>}
                </div>
                <div className="text-zinc-400 font-medium text-sm md:text-base">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
