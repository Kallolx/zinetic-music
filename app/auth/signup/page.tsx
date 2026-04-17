"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import BorderGlow from "@/components/BorderGlow";
import { Button } from "@/components/ui/button";
import Aurora from "@/components/Aurora";

const SideBlock = ({
  info,
  borderColor,
}: {
  info: string;
  borderColor: string;
}) => (
  <div
    className={`lg:w-[30%] bg-gradient-to-r from-[#DA35F7] to-[#802CEE] p-10 flex border-r ${borderColor} flex-col justify-between items-center relative overflow-hidden min-h-[280px] lg:min-h-0`}
  >
    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
    <div className="flex-grow flex items-center justify-center">
      <img
        src="/logo.png"
        alt="Zinetic Music"
        className="relative z-10 drop-shadow-2xl w-32 h-auto brightness-0 invert"
      />
    </div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white text-xs font-bold tracking-tighter uppercase relative z-10 w-full text-center"
    >
      {info}
    </motion.p>
  </div>
);

const GlowingInput = ({
  label,
  type = "text",
  placeholder,
  required = false,
  end,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  end?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-zinc-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <BorderGlow borderRadius={16} className="w-full shadow-lg">
      <div className="relative">
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full h-14 bg-black/60 px-5 pr-12 rounded-2xl text-white placeholder:text-zinc-600 outline-none focus:bg-zinc-900/90 transition-colors"
        />
        {end && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{end}</div>
        )}
      </div>
    </BorderGlow>
  </div>
);

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [showC, setShowC] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-32 relative overflow-hidden text-white">
      {/* Dynamic Aurora Background - Fixed to top section */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={["#802CEE", "#EA621F", "#DA35F7"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[860px] relative z-10"
      >
        <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-purple-900/10 relative">
          <SideBlock
            info="Create Account"
            borderColor="border-orange-500/30"
          />

          <div className="lg:w-[70%] p-8 md:p-12 flex flex-col bg-[#111] relative">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              Join Zinetic Music
            </h2>
            <p className="text-zinc-400 text-base mb-8">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#EA621F] hover:text-[#ff7a3d] font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlowingInput label="First Name" placeholder="John" required />
              <GlowingInput label="Last Name" placeholder="Doe" required />
              <GlowingInput
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                required
              />
              <GlowingInput
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
              />
              <GlowingInput
                label="Password"
                type={show ? "text" : "password"}
                placeholder="Create a password"
                required
                end={
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    {show ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
              />
              <GlowingInput
                label="Confirm Password"
                type={showC ? "text" : "password"}
                placeholder="Repeat password"
                required
                end={
                  <button
                    type="button"
                    onClick={() => setShowC(!showC)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    {showC ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
              />
            </div>

            <label className="flex items-start gap-3 mt-6 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-[#EA621F] flex-shrink-0"
              />
              <span className="text-zinc-400 text-sm leading-relaxed">
                I agree to Zinetic Music's{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-[#EA621F] hover:text-[#ff7a3d] transition-colors"
                >
                  Terms of Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#EA621F] hover:text-[#ff7a3d] transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <div className="flex justify-end mt-10">
              <BorderGlow
                borderRadius={16}
                glowColor="18 83 52"
                glowIntensity={1}
                colors={["#762BED", "#EA621F"]}
                className={`w-fit cursor-pointer ml-auto transition-opacity ${!agreed ? "opacity-40 pointer-events-none" : "opacity-100"}`}
              >
                <button 
                  type="submit"
                  disabled={!agreed}
                  className="flex items-center gap-3 px-10 py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn"
                >
                  <Play className="h-5 w-5 fill-white transition-transform group-hover/btn:scale-110" />
                  <span className="text-lg tracking-tight">Create Account</span>
                </button>
              </BorderGlow>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
