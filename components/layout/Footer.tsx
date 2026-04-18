"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const quickLinks = [
    { name: "Artist Service", href: "/artist" },
    { name: "Label Service", href: "/label" },
    { name: "AI Music Tools", href: "/ai-tools" },
    { name: "YouTube Network", href: "/youtube-network" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const primarySocials = [
    {
      icon: "/icons/facebook.svg",
      href: "https://www.facebook.com/ZineticMusic",
      name: "Facebook",
    },
    {
      icon: "/icons/whatsapp.svg",
      href: "https://api.whatsapp.com/send?phone=%2B8801540199410&app=facebook&entry_point=page_cta",
      name: "WhatsApp",
    },
    {
      icon: "/icons/linkedin.svg",
      href: "https://www.linkedin.com/company/zineticmusic",
      name: "LinkedIn",
    },
    {
      icon: "/icons/youtube.png",
      href: "https://www.youtube.com/@ZineticMusic/featured",
      name: "YouTube",
    },
  ];

  const secondarySocials = [
    {
      icon: "/icons/instagram.svg",
      href: "https://instagram.com/zineticmusic",
      name: "Instagram",
    },
    { icon: "/icons/x.svg", href: "https://x.com/zineticmusic", name: "X" },
    {
      icon: "/icons/soundcloud.png",
      href: "https://soundcloud.com/zinetic-music",
      name: "SoundCloud",
    },
    {
      icon: "/icons/spotify.png",
      href: "https://open.spotify.com",
      name: "Spotify",
    },
    { icon: "/icons/tiktok.svg", href: "#", name: "TikTok" },
  ];

  return (
    <footer className="relative bg-black border-t border-zinc-900 z-10 pt-20 pb-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#762BED]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-[#762BED]/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* 4-Column Mega Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Branding, Bios & Socials */}
          <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <img
                src="/logo.png"
                alt="zinetic-logo"
                className="h-9 w-auto -mt-2 md:mt-0"
              />
              <span className="font-heading text-xl font-semibold tracking-tight text-white">
                Zinetic Music
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed md:pr-4">
              Elevating and distributing the best
              <br className="block md:hidden" /> independent music globally.
              <br className="block md:hidden" /> We are structurally primed to
              <br className="block md:hidden" /> support you anywhere in the
              world.
            </p>

            {/* Social Links Matrix */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              {primarySocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:border-[#EA621F]/50 hover:-translate-y-1 transition-all duration-300 group shadow-md"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-7 h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left lg:pl-12">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3 items-center md:items-start">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-[#EA621F] hover:translate-x-1 transition-all w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: UK Office */}
          <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center md:justify-start gap-2">
              <img
                src="/icons/uk.svg"
                alt="UK"
                className="w-5 h-5 rounded-full object-cover border border-zinc-800 shadow-xl"
              />
              United Kingdom
            </h4>
            <div className="flex flex-col gap-4 items-center md:items-start text-sm text-zinc-400">
              <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-zinc-600 shrink-0" />
                <span className="leading-relaxed">
                  71-75 Shelton Street, Covent Garden,
                  <br className="hidden md:block" />
                  London, WC2H 9JQ
                </span>
              </div>
              <a
                href="tel:+447307601744"
                className="flex gap-3 items-center justify-center md:justify-start hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-zinc-600 group-hover:text-[#EA621F]" />
                +44 7307 601 744
              </a>
              <a
                href="mailto:contact@zineticmusic.com"
                className="flex gap-3 items-center justify-center md:justify-start hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-zinc-600 group-hover:text-[#EA621F]" />
                contact@zineticmusic.com
              </a>
            </div>
          </div>

          {/* Column 4: Bangladesh Office */}
          <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center md:justify-start gap-2">
              <div className="w-5 h-5 rounded-full bg-fuchsia-600 flex items-center justify-center overflow-hidden border border-zinc-800 shrink-0 shadow-xl">
                <img
                  src="/icons/bd.svg"
                  alt="BD"
                  className="w-full h-full object-cover"
                />
              </div>
              Bangladesh
            </h4>
            <div className="flex flex-col gap-4 items-center md:items-start text-sm text-zinc-400">
              <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-zinc-600 shrink-0" />
                <span className="leading-relaxed">
                  Batar Goli, Boro Moghbazar,
                  <br className="hidden md:block" />
                  Ramna, Dhaka, 1217
                </span>
              </div>
              <a
                href="tel:+8809696797267"
                className="flex gap-3 items-center justify-center md:justify-start hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-zinc-600 group-hover:text-[#EA621F]" />
                +880 9696 797 267
              </a>
              <a
                href="mailto:info@zineticmusic.com"
                className="flex flex-col flex-wrap md:flex-row gap-3 items-center justify-center md:justify-start hover:text-white transition-colors group w-full truncate text-center md:text-left"
              >
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-4 h-4 text-zinc-600 group-hover:text-[#EA621F] shrink-0" />
                  <span className="truncate">info@zineticmusic.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Trustpilot */}
        <div className="border-t border-zinc-900/80 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-6">
          {/* Copyright */}
          <div className="text-zinc-500 text-xs md:text-sm font-medium text-center md:text-left opacity-60 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
            <span>© Copyright 2026 | Zinetic Music Limited | All Right Reserved</span>
            <span className="hidden md:inline">|</span>
            <Link href="/privacy-policy" className="hover:text-[#EA621F] transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-and-conditions" className="hover:text-[#EA621F] transition-colors">Terms and Conditions</Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-6">
            {/* Trustpilot Native Icon */}
            <div className="flex items-center">
              <a
                href="https://uk.trustpilot.com/review/zineticmusic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100"
              >
                <img
                  src="/icons/trust.svg"
                  alt="Trustpilot Review"
                  className="h-8 w-auto drop-shadow-md"
                />
              </a>
            </div>
            <div className="h-8 w-[1px] bg-zinc-700 hidden md:block" />

            <div className="flex items-center gap-3">
              {secondarySocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900/30 border border-zinc-900 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 group"
                  title={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
