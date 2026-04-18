"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

function TeamMemberCard({ member }: { member: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative w-full flex flex-col h-[500px] bg-zinc-900/40 rounded-[32px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#802CEE]/30 shadow-2xl"
    >
      {/* Top Section: Portrait Image & Reveal Overlay */}
      <div 
        className="relative flex-1 overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={member.image}
          alt={member.name}
          className={`object-cover w-full h-full transition-transform duration-700 ${isOpen ? "scale-105" : "group-hover:scale-105"}`}
        />
        
        {/* Subtle Bottom Fade for Front Face */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`} />

        {/* Reveal Face: Bio & Contacts (Slides over image) */}
        <div
          className={`absolute inset-0 flex flex-col p-6 bg-black/95 backdrop-blur-xl transition-transform duration-500 ease-out z-20 ${
            isOpen ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
          }`}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "A" && !(e.target as HTMLElement).closest("a")) {
              setIsOpen(false);
            }
          }}
        >
          <div className="flex-1 overflow-y-auto no-scrollbar pt-4">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-2 opacity-50">About {member.name.split(" ")[0]}</h4>
            <p className="text-zinc-300 text-sm leading-relaxed mb-8">
              {member.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className={`flex items-center gap-3 text-sm transition-colors ${member.phone ? "text-zinc-200" : "text-zinc-500"}`}>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone className={`w-4 h-4 ${member.phone ? "text-[#802CEE]" : "text-zinc-600"}`} />
                </div>
                {member.phone || "Not Available"}
              </div>
              <div className={`flex items-center gap-3 text-sm transition-colors ${member.email ? "text-zinc-200" : "text-zinc-500"}`}>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className={`w-4 h-4 ${member.email ? "text-[#802CEE]" : "text-zinc-600"}`} />
                </div>
                {member.email || "Not Available"}
              </div>
            </div>
          </div>

          {/* Social Icons (Revealed Face) */}
          <div className="flex gap-3 pt-4">
            {member.socials.map((s: any, i: number) => (
              <div
                key={i}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  s.active
                    ? "bg-white/5 hover:bg-[#802CEE]/20 hover:-translate-y-1"
                    : "bg-white/0 opacity-20 grayscale cursor-not-allowed"
                }`}
              >
                {s.active ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center z-30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={s.icon} alt="social" className="w-4 h-4 object-contain" />
                  </a>
                ) : (
                  <img src={s.icon} alt="social" className="w-4 h-4 object-contain" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Name & Role (Always Visible) */}
      <div 
        className="px-6 py-6 bg-zinc-950/60 backdrop-blur-md border-t border-white/5 cursor-pointer relative z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-[#802CEE] transition-colors duration-300">
          {member.name}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-[#FF7A00]" />
          <div className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">
            {member.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  const team = [
    {
      name: "Zishan Mahmud Rudro",
      role: "Managing Director & CEO",
      description:
        "Managing Director & CEO at Zinetic Music Limited | Digital Music Distribution | Publishing | Licensing | YouTube CMS/MCN | Social Media Management | Artist & Label Services | Content ID | (UGC)",
      phone: "+8801540199410",
      email: "zishan@zineticmusic.com",
      image: "/teams/1.jpg",
      socials: [
        {
          icon: "/icons/facebook.svg",
          href: "https://www.facebook.com/zishanmahmudrudro",
          active: true,
        },
        {
          icon: "/icons/instagram.svg",
          href: "https://www.instagram.com/zishanmahmudrudro/",
          active: true,
        },
        {
          icon: "/icons/linkedin.svg",
          href: "https://www.linkedin.com/in/zishanmahmudrudro/",
          active: true,
        },
      ],
    },
    {
      name: "Ismail Hosen",
      role: "Marketing Director",
      description:
        "Ismail Hosen is a MBBS Student & social media influencer who has been working on YouTube and Music Distribution for the last 5 years.",
      phone: "+8801611879372",
      email: "ismail@zineticmusic.com",
      image: "/teams/2.jpg",
      socials: [
        { icon: "/icons/facebook.svg", href: "#", active: false },
        { icon: "/icons/instagram.svg", href: "#", active: false },
        { icon: "/icons/linkedin.svg", href: "#", active: false },
      ],
    },
    {
      name: "Kawsar Hossain",
      role: "Artist & Label Director",
      description:
        "Kawsar Hossain is an Artist & Label Director of Zinetic Music & Founder of K Tune Music. He is also a social media influencer working in the industry for the last 5 years.",
      phone: "",
      email: "",
      image: "/teams/3.jpg",
      socials: [
        { icon: "/icons/facebook.svg", href: "#", active: false },
        { icon: "/icons/instagram.svg", href: "#", active: false },
        { icon: "/icons/linkedin.svg", href: "#", active: false },
      ],
    },
    {
      name: "Al Mahin",
      role: "Designer & Social Media",
      description:
        "Creative Designer & Media Operator @ Zinetic Music Limited | Thumbnail & Poster Specialist | Music, Islamic Gojol & Drama Visual Designer | Statistics Student | Founder – @ Mahin GFX Studio",
      phone: "",
      email: "",
      image: "/teams/4.jpg",
      socials: [
        {
          icon: "/icons/facebook.svg",
          href: "https://www.facebook.com/abalmahin1",
          active: true,
        },
        {
          icon: "/icons/linkedin.svg",
          href: "https://www.linkedin.com/in/almahinbd71",
          active: true,
        },
        {
          icon: "/icons/behance.svg",
          href: "https://www.behance.net/almahingfx",
          active: true,
        },
        {
          icon: "/icons/instagram.svg",
          href: "https://www.instagram.com/abraham_king_1",
          active: true,
        },
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden z-20 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white leading-[1]">
            Our <span className="text-[#FF7A00]">Hardworking</span> Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, i) => (
            <TeamMemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
