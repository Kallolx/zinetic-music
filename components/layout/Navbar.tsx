"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Building2,
  Music2,
  Disc,
  Mic2,
  VideoIcon,
  LayoutDashboard,
  Copyright,
  ChartPie,
  MonitorPlay,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [

  {
    name: "Features",
    href: "#",
    links: [
      { name: "Catalog Management", href: "/catalog-management", icon: LayoutDashboard },
      { name: "Rights Management", href: "/rights-management", icon: Copyright },
      { name: "Distribution", href: "/distribution", icon: MonitorPlay },
      { name: "Analytics & Insights", href: "/analytics-insights", icon: ChartPie },
    ],
  },
  
  {
    name: "Services",
    href: "#",
    links: [
      { name: "Artist Service", href: "/artist", icon: Users },
      { name: "Label Service", href: "/label", icon: Building2 },
      { name: "Youtube Network", href: "/youtube-network", icon: VideoIcon },
    ],
  },
  {
    name: "Ai Tools",
    href: "#",
    links: [
      { name: "AI Music Gen", href: "/ai-gen", icon: Music2 },
      { name: "AI Mastering", href: "/ai-mastering", icon: Disc },
      { name: "Vocal Synthesis", href: "/vocals", icon: Mic2 },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<number | null>(null);
  const [hoveredMenu, setHoveredMenu] = React.useState<number | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0.4)", "rgba(10, 10, 10, 0.8)"],
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(8px)", "blur(16px)"],
  );
  const border = useTransform(
    scrollY,
    [0, 100],
    [
      "1px solid rgba(255, 255, 255, 0.05)",
      "1px solid rgba(255, 255, 255, 0.15)",
    ],
  );
  const y = useTransform(scrollY, [0, 100], [0, -2]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          backgroundColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          border,
          y,
        }}
        className="flex h-16 w-full max-w-6xl items-center justify-between rounded-full px-4 md:px-8 transition-all duration-300"
      >
        {/* Logo Section */}
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src="/logo.png" alt="zinetic-logo" className="h-9 w-auto" />
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              Zinetic<span className="hidden sm:inline"> Music</span>
            </span>
          </Link>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden items-center justify-center md:flex h-full">
          <div
            className="flex items-center gap-2 relative px-2 py-1"
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setActiveItem(null);
                setHoveredMenu(null);
              }, 150);
            }}
          >
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative px-4 py-2"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setActiveItem(index);
                  if (item.links) setHoveredMenu(index);
                  else setHoveredMenu(null);
                }}
              >
                {/* Magic Hover Pill */}
                {activeItem === index && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 z-0 rounded-lg bg-black/10 backdrop-blur-md"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}

                <Link
                  href={item.href}
                  className={`relative z-10 whitespace-nowrap text-base font-medium transition-colors flex items-center gap-1.5 ${
                    activeItem === index ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {item.name}
                  {item.links && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${activeItem === index ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Dropdown Container - Now anchored to its parent */}
                <AnimatePresence>
                  {hoveredMenu === index && item.links && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                      onMouseEnter={() => {
                        if (timeoutRef.current)
                          clearTimeout(timeoutRef.current);
                      }}
                    >
                      <div className="overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#0a0a0a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-3">
                        <div className="flex flex-col gap-1.5 min-w-[280px]">
                          {item.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="group flex items-center gap-4 rounded-xl bg-white/[0.03] p-3 transition-colors hover:bg-white/10"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 transition-colors group-hover:bg-zinc-800">
                                {link.icon && (
                                  <link.icon className="h-5 w-5 text-white" />
                                )}
                              </div>
                              <span className="text-base font-bold text-white">
                                {link.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action Section */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden md:block">
            <Button className="cursor-pointer rounded-full bg-white text-black hover:bg-zinc-200 px-6 text-base font-bold h-10">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full h-11 w-11 hover:bg-white/10 transition-colors"
                >
                  <Menu className="h-7 w-7 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="w-[300px] border-zinc-800 bg-black/95 backdrop-blur-xl p-0"
              showCloseButton={false}
            >
              <div className="flex flex-col h-full">
                {/* Branding in Menu & Custom Close Button */}
                <div className="flex items-center justify-between px-6 py-8 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <img
                      src="/logo.png"
                      alt="zinetic-logo"
                      className="h-10 w-auto -mt-2"
                    />
                    <span className="font-heading text-xl font-bold tracking-tight text-white">
                      Zinetic Music
                    </span>
                  </div>
                  <SheetClose
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10 border-zinc-800 hover:bg-white/10"
                      >
                        <X className="h-10 w-10 text-zinc-400" />
                      </Button>
                    }
                  />
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow py-8 px-6 flex flex-col gap-4 overflow-y-auto">
                  {navItems.map((item, index) => (
                    <div key={item.name} className="flex flex-col">
                      {item.links ? (
                        <div className="flex flex-col">
                          <button
                            onClick={() =>
                              setActiveItem(activeItem === index ? null : index)
                            }
                            className="flex h-14 items-center justify-between text-2xl font-semibold text-zinc-400 transition-colors hover:text-white"
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-6 w-6 transition-transform duration-300 ${activeItem === index ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeItem === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-white/5 rounded-2xl"
                              >
                                <div className="flex flex-col gap-2 p-2">
                                  {item.links.map((link) => (
                                    <Link
                                      key={link.name}
                                      href={link.href}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-4 rounded-xl p-3 text-lg font-bold text-white transition-colors hover:bg-white/5 active:bg-white/10"
                                    >
                                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                                        {link.icon && (
                                          <link.icon className="h-5 w-5 text-white" />
                                        )}
                                      </div>
                                      {link.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex h-14 items-center text-2xl font-semibold text-zinc-400 transition-colors hover:text-white active:text-white"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Footer Action */}
                <div className="p-6 border-t border-zinc-800/50">
                  <Button className="w-full rounded-full h-12 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </header>
  );
}
