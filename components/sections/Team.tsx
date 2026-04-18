"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

function TeamMemberCard({
  member,
  isFeatured = false,
}: {
  member: any;
  isFeatured?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative w-full ${isFeatured ? "max-w-5xl mx-auto" : "max-w-sm mx-auto shadow-2xl rounded-[40px]"} cursor-pointer`}
    >
      <div
        className={`relative overflow-hidden bg-zinc-900 border border-white/5 rounded-[40px] transition-all duration-500 group-hover:border-white/20 ${
          isFeatured ? "md:flex md:items-center min-h-[400px]" : "aspect-square"
        }`}
      >
        {/* Image Container - This acts as a trigger to Open/Close */}
        <div
          onClick={() => !isFeatured && setIsOpen(!isOpen)}
          className={`${
            isFeatured ? "md:w-1/2 aspect-square" : "w-full h-full"
          } relative overflow-hidden`}
        >
          <img
            src={member.image}
            alt={member.name}
            className={`object-cover w-full h-full transition-transform duration-700 ${isOpen ? "scale-110" : "group-hover:scale-110"}`}
          />
          {!isFeatured && (
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-500 ${isOpen ? "opacity-0" : "group-hover:opacity-0"}`}
            />
          )}
        </div>

        {/* Content Area - Reveal logic (No parent onClick here to avoid link interference) */}
        <div
          className={`${
            isFeatured
              ? "p-8 md:p-12 md:w-1/2 flex flex-col justify-center"
              : `absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-black/95 backdrop-blur-md transition-transform duration-500 ease-out ${
                  isOpen ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
                }`
          }`}
          onClick={(e) => {
            // Clicking the background of the reveal toggles it back, but links won't be blocked
            if ((e.target as HTMLElement).tagName !== "A" && !(e.target as HTMLElement).closest("a")) {
              !isFeatured && setIsOpen(!isOpen);
            }
          }}
        >
          <div className={`${isFeatured ? "mb-2" : ""}`}>
            <h3
              className={`${
                isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-xl"
              } font-heading font-bold text-white mb-1`}
            >
              {member.name}
            </h3>
            <div
              className={`text-[#FF7A00] uppercase tracking-[0.2em] ${isFeatured ? "text-xs md:text-sm font-medium" : "text-sm md:text-xs font-black"}`}
            >
              {member.role}
            </div>
          </div>

          <p
            className={`${isFeatured ? "text-base mt-2 mb-6" : "text-sm md:text-xs mt-4 mb-8"} text-zinc-400 leading-relaxed`}
          >
            {member.description}
          </p>

          {/* Contact Info (Row layout) */}
          <div
            className={`flex flex-row flex-wrap gap-x-6 gap-y-3 mb-8 w-full ${isFeatured ? "justify-start" : "justify-center"}`}
          >
            <div
              className={`flex items-center gap-2 transition-colors ${isFeatured ? "text-sm md:text-base" : "text-sm md:text-[11px]"} ${member.phone ? "text-zinc-200" : "text-zinc-500"}`}
            >
              <Phone
                className={`${isFeatured ? "w-4 h-4" : "w-4 h-4 md:w-3 md:h-3"} ${member.phone ? "text-[#FF7A00]" : "text-zinc-600"}`}
              />
              {member.phone || "Not Available"}
            </div>
            <div
              className={`flex items-center gap-2 transition-colors ${isFeatured ? "text-sm md:text-base" : "text-sm md:text-[11px]"} ${member.email ? "text-zinc-200" : "text-zinc-500"}`}
            >
              <Mail
                className={`${isFeatured ? "w-4 h-4" : "w-4 h-4 md:w-3 md:h-3"} ${member.email ? "text-[#FF7A00]" : "text-zinc-600"}`}
              />
              {member.email || "Not Available"}
            </div>
          </div>

          <div
            className={`flex flex-wrap gap-3 mt-auto ${isFeatured ? "justify-start" : "justify-center"}`}
          >
            {member.socials.map((s: any, i: number) => (
              <div
                key={i}
                className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  s.active
                    ? "bg-white/5 hover:bg-[#FF7A00]/20 hover:-translate-y-1"
                    : "bg-white/0 opacity-20 grayscale cursor-not-allowed"
                }`}
              >
                {s.active ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center z-[100]"
                    onClick={(e) => e.stopPropagation()} // Extra safety
                  >
                    <img
                      src={s.icon}
                      alt="social"
                      className="w-4 h-4 object-contain"
                    />
                  </a>
                ) : (
                  <img
                    src={s.icon}
                    alt="social"
                    className="w-4 h-4 object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Static Pill Name/Role - This also acts as a trigger to open */}
        {!isFeatured && (
          <div
            onClick={() => setIsOpen(true)}
            className={`absolute inset-x-0 bottom-8 flex justify-center px-4 transition-all duration-500 z-40 ${
              isOpen 
                ? "opacity-0 translate-y-4 pointer-events-none" 
                : "group-hover:opacity-0 group-hover:translate-y-4 group-hover:pointer-events-none"
            }`}
          >
            <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 px-8 py-3 rounded-xl shadow-2xl flex flex-col items-center">
              <h3 className="text-xl md:text-xl font-heading font-bold text-white whitespace-nowrap">
                {member.name}
              </h3>
              <div className="text-xs md:text-[10px] text-[#FF7A00] font-black uppercase tracking-widest mt-0.5 whitespace-nowrap">
                {member.role}
              </div>
            </div>
          </div>
        )}
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

  const ceo = team[0];
  const members = team.slice(1);

  return (
    <section className="relative py-24 bg-black overflow-hidden z-20 w-full">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white leading-[1]">
            Our <span className="text-[#FF7A00]">Hardworking</span> Team
          </h2>
        </div>

        {/* Featured CEO Card */}
        <div className="mb-24">
          <TeamMemberCard member={ceo} isFeatured={true} />
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, i) => (
            <TeamMemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
