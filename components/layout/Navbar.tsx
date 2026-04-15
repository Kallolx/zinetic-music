"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Music", href: "/music" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0.4)", "rgba(10, 10, 10, 0.8)"]
  )
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(8px)", "blur(16px)"]
  )
  const border = useTransform(
    scrollY,
    [0, 100],
    ["1px solid rgba(255, 255, 255, 0.05)", "1px solid rgba(255, 255, 255, 0.15)"]
  )
  const y = useTransform(scrollY, [0, 100], [0, -2])

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.2, 
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ backgroundColor, backdropFilter, WebkitBackdropFilter: backdropFilter, border, y }}
        className="flex h-16 w-full max-w-5xl items-center justify-between rounded-full px-4 md:px-8 transition-all duration-300"
      >
        {/* Logo Section */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src="/logo.png" alt="zinetic-logo" className="h-9 w-auto -mt-2" />
            <span className="font-heading text-lg font-bold tracking-tight text-white">Zinetic Music</span>
          </Link>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
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
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="md:hidden rounded-full h-11 w-11 hover:bg-white/10 transition-colors">
                <Menu className="h-7 w-7 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            } />
            <SheetContent 
              side="right" 
              className="w-[300px] border-zinc-800 bg-black/95 backdrop-blur-xl p-0"
              showCloseButton={false}
            >
              <div className="flex flex-col h-full">
                {/* Branding in Menu & Custom Close Button */}
                <div className="flex items-center justify-between px-6 py-8 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="zinetic-logo" className="h-10 w-auto -mt-2" />
                    <span className="font-heading text-xl font-bold tracking-tight text-white">Zinetic Music</span>
                  </div>
                  <SheetClose render={
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-zinc-800 hover:bg-white/10">
                      <X className="h-10 w-10 text-zinc-400" />
                    </Button>
                  } />
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow py-8 px-6 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex h-14 items-center text-2xl font-semibold text-zinc-400 transition-colors hover:text-white active:text-white"
                    >
                      {item.name}
                    </Link>
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
  )
}
