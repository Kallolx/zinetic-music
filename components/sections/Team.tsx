"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export function Team() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const team = [
    {
      name: "Zishan Mahmud Rudro",
      role: "Managing Director & CEO",
      description:
        "Managing Director & CEO at Zinetic Music Limited | Digital Music Distribution | Publishing | Licensing | YouTube CMS/MCN | Social Media Management | Artist & Label Services | Content ID | (UGC)",
      phone: "+8801540199410",
      email: "zishan@zineticmusic.com",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=600&q=80",
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
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80",
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
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
      socials: [
        { icon: "/icons/facebook.svg", href: "#", active: false },
        { icon: "/icons/instagram.svg", href: "#", active: false },
        { icon: "/icons/linkedin.svg", href: "#", active: false },
      ],
    },
  ];

  return (
    <section className="relative py-12 pb-24bg-black overflow-hidden z-10 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white leading-[1]">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Hard <br /> Working
            </span>{" "}
            Team
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col group h-full w-full mx-auto max-w-[340px] md:max-w-none cursor-pointer"
            >
              {/* Core Interactive Card Form */}
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[32px] overflow-hidden bg-zinc-900 shadow-xl border border-zinc-800/80 group-hover:border-zinc-500/50 transition-colors duration-500">
                {/* Background Image base without hover effects */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full block"
                />

                {/* Base Gradient linking text visually while inactive */}
                <div className="absolute inset-x-0 bottom-0 pt-24 pb-8 px-6 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent flex flex-col justify-end items-center text-center transition-opacity duration-500 ease-out group-hover:opacity-0">
                  <h3 className="text-2xl font-heading font-black text-white mb-1 shadow-black drop-shadow-md">
                    {member.name}
                  </h3>
                  <div className="text-sm text-[#762BED] font-bold uppercase tracking-widest drop-shadow-sm">
                    {member.role}
                  </div>
                </div>

                {/* Glassmorphic Interaction Payload (Triggers on hover/tap) */}
                <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md transition-transform duration-500 ease-out flex flex-col justify-center items-center text-center p-6 md:p-8 translate-y-full group-hover:translate-y-0">
                  <h3 className="text-2xl font-heading font-black text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-xs md:text-sm text-[#762BED] font-bold uppercase tracking-widest mb-6">
                    {member.role}
                  </div>

                  {/* Restored Payload Description inside Hover State */}
                  <p className="text-zinc-300 text-sm leading-relaxed mb-8 w-full">
                    {member.description}
                  </p>

                  {/* Condensed Quick Contacts */}
                  {(member.phone || member.email) && (
                    <div className="flex flex-col gap-3 w-full items-center border-t border-zinc-700/50 pt-6 mb-6">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
                          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
                        >
                          <Phone className="w-4 h-4 text-zinc-400" />
                          {member.phone}
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors truncate"
                        >
                          <Mail className="w-4 h-4 text-zinc-400" />
                          {member.email}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Native Social Routing links */}
                  {member.socials.some((s) => s.active) && (
                    <div className="flex gap-4">
                      {member.socials.map((social, i) => {
                        if (!social.active) return null;
                        return (
                          <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:-translate-y-1 transition-transform"
                          >
                            <img
                              src={social.icon}
                              alt="social icon"
                              className="w-6 h-6 object-contain rounded-md shadow-md opacity-80 hover:opacity-100 transition-opacity"
                            />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
