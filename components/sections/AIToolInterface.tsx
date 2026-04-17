"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Send, Loader2, X, Settings } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { ProToggle } from "@/components/ui/StudioControls";
import Aurora from "../Aurora";

export interface AIToolInterfaceProps {
  title: React.ReactNode;
  description: string;
  placeholder: string;
  settingsPanel: React.ReactNode;
  mockResult: React.ReactNode | null;
  isProcessing: boolean;
  onGenerate: (prompt: string, hasAttached: boolean) => void;
  buttonLabel?: string;
  advancedSettings?: (showAdvanced: boolean) => React.ReactNode;
}

export function AIToolInterface({
  title,
  description,
  placeholder,
  settingsPanel,
  mockResult,
  isProcessing,
  onGenerate,
  buttonLabel = "Generate",
  advancedSettings,
}: AIToolInterfaceProps) {
  const [prompt, setPrompt] = React.useState("");
  const [hasAttached, setHasAttached] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if ((!prompt.trim() && !hasAttached) || isProcessing) return;
    onGenerate(prompt, hasAttached);
  };

  return (
    <div className="w-full relative min-h-screen overflow-hidden bg-black">
      {/* Dynamic Aurora Background - Fixed to top section */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] z-0 overflow-hidden pointer-events-none">
        <Aurora
          colorStops={["#802CEE", "#EA621F", "#DA35F7"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pt-40 md:pt-38 pb-32 px-4 xl:px-0">
        <div className="w-full max-w-7xl flex flex-col gap-8 lg:gap-12">
          {/* Header */}
          <div className="w-full text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-6xl font-heading font-extrabold tracking-tight text-white mb-2"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto font-medium"
            >
              {description}
            </motion.p>
          </div>

          {/* Main Interface Workstation */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-4 lg:gap-8 items-start">
            {/* Main Generation Area */}
            <div className="flex flex-col w-full h-full">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl relative min-h-[230px] flex flex-col transition-all duration-500">
                {/* Visual Workspace */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center min-h-[150px]">
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col items-center justify-center space-y-6"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#DA35F7]/20 blur-3xl animate-pulse" />
                          <Loader2 className="w-10 h-10 animate-spin text-[#DA35F7] relative z-10" />
                        </div>
                        <div className="text-center">
                          <p className="text-zinc-400 font-semibold text-md tracking-tight mb-2 -mt-4">
                            Preparing your track
                          </p>
                        </div>
                      </motion.div>
                    ) : mockResult ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full"
                      >
                        {mockResult}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center text-zinc-600"
                      >
                        <img
                          src="/icons/spark.png"
                          alt="Spark"
                          className="w-16 h-16 grayscale opacity-40"
                        />
                        <p className="text-lg tracking-tight">
                          tell us what you want to create and let's get started
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Industrial Input Area */}
                <div className="p-4 pt-0">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#802CEE]/10 to-[#EA621F]/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-3 shadow-inner">
                      {hasAttached && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 bg-zinc-900/50 border border-white/5 rounded-2xl py-2 px-4 mb-3 w-fit"
                        >
                          <Paperclip className="w-4 h-4 text-[#DA35F7]" />
                          <span className="text-xs font-mono text-zinc-300">
                            REFERENCE_STUDIO_MIX.WAV
                          </span>
                          <button
                            onClick={() => setHasAttached(false)}
                            className="hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4 text-zinc-500" />
                          </button>
                        </motion.div>
                      )}

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <textarea
                          ref={inputRef}
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder={placeholder}
                          className="flex-1 bg-transparent text-white placeholder:text-zinc-700 px-4 py-3 min-h-[44px] max-h-[200px] resize-none outline-none text-base leading-relaxed text-center sm:text-left"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit();
                            }
                          }}
                        />

                        <div className="flex items-center justify-between sm:justify-end gap-2 pb-2 sm:pb-0">
                          <button
                            onClick={() => setHasAttached(true)}
                            className="p-3 rounded-full hover:bg-zinc-800/50 text-zinc-500 hover:text-white transition-all active:scale-95"
                          >
                            <Paperclip className="w-5 h-5" />
                          </button>

                          <BorderGlow
                            borderRadius={16}
                            glowColor="18 83 52"
                            glowIntensity={
                              prompt.trim() || hasAttached ? 1 : 0.4
                            }
                            colors={["#762BED", "#EA621F"]}
                            className="shrink-0"
                          >
                            <button
                              onClick={handleSubmit}
                              disabled={
                                (!prompt.trim() && !hasAttached) || isProcessing
                              }
                              className="flex items-center gap-3 px-8 py-3.5 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn hover:bg-black/80"
                            >
                              <span className="text-base tracking-tight">
                                {isProcessing ? "Creating..." : buttonLabel}
                              </span>
                              {isProcessing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                              )}
                            </button>
                          </BorderGlow>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Settings */}
            <div className="w-full space-y-6 h-full">
              <div className="bg-[#050505]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col transition-all duration-500">
                <div className="flex flex-col gap-5 mb-2 shrink-0">
                  <div className="flex items-center gap-3 font-heading">
                    <Settings className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase pt-0.5">
                      Settings
                    </h3>
                  </div>

                  <ProToggle
                    label="Advanced Mode"
                    checked={showAdvanced}
                    onChange={setShowAdvanced}
                    className="py-1"
                  />
                </div>

                <div className="space-y-6 flex-1">
                  {settingsPanel}
                  <AnimatePresence>
                    {showAdvanced && advancedSettings && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 pt-4 border-t border-white/5"
                      >
                        {advancedSettings(showAdvanced)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
