"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  UploadCloud,
  Search,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BorderGlow from "@/components/BorderGlow";

// ==========================================
// Reusable Structural Components
// ==========================================

const YoutubeSideBlock = ({
  imageSrc = "/logo.png",
  info,
}: {
  imageSrc?: string;
  info?: string;
}) => (
  <div className="lg:w-[30%] bg-gradient-to-br from-[#FF0000] to-[#b30000] p-10 flex border-r border-[#FF0000]/50 flex-col justify-between items-center relative overflow-hidden min-h-[300px] lg:min-h-[600px]">
    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
    <div className="flex-grow flex items-center justify-center">
      <img
        src={imageSrc}
        alt="Onboarding Icon"
        className={`relative z-10 drop-shadow-2xl transition-all duration-500 ${
          imageSrc === "/logo.png"
            ? "w-32 h-auto brightness-0 invert"
            : "w-44 h-auto"
        }`}
      />
    </div>
    {info && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-xs sm:text-sm font-bold tracking-tighter uppercase relative z-10 w-full text-center"
      >
        {info}
      </motion.p>
    )}
  </div>
);

const GlowingInput = ({
  label,
  type = "text",
  placeholder,
  required = false,
}: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-zinc-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <BorderGlow borderRadius={16} className="w-full shadow-lg">
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-14 bg-black/60 px-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
      />
    </BorderGlow>
  </div>
);

// ------------------------------------------
// Step 1: Personal Info
// ------------------------------------------
function StepPersonalInfo({ onNext }: { onNext: () => void }) {
  const [date, setDate] = useState<Date>();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-red-900/10">
        <YoutubeSideBlock info="Personal Details" />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Personal Information
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Tell us about yourself to begin the application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingInput
              label="First Name"
              placeholder="Enter first name"
              required
            />
            <GlowingInput
              label="Last Name"
              placeholder="Enter last name"
              required
            />
            <GlowingInput
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              required
            />
            <GlowingInput
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              required
            />

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <Popover>
                  <PopoverTrigger className="w-full inline-flex items-center h-14 justify-start px-5 text-left text-sm font-medium border-none rounded-2xl bg-black/60 text-white outline-none focus:bg-zinc-900/90 hover:bg-zinc-900/90 transition-colors">
                    <CalendarIcon className="mr-3 h-5 w-5 text-zinc-400" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span className="text-zinc-500 font-normal">
                        Pick a date
                      </span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-[#0a0a0a] border-zinc-800 text-white"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-[#0a0a0a] text-white"
                    />
                  </PopoverContent>
                </Popover>
              </BorderGlow>
            </div>

            <GlowingInput
              label="Identification Number"
              placeholder="NID/Passport"
              required
            />

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-zinc-300">
                Upload Identification File{" "}
                <span className="text-red-500">*</span>
              </label>
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <div className="flex flex-col items-center justify-center h-28 bg-black/60 hover:bg-zinc-900/90 rounded-2xl border border-dashed border-zinc-700 cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <UploadCloud className="h-8 w-8 text-zinc-500 mb-2" />
                  <span className="text-sm text-zinc-400 font-medium">
                    Click or drag file to upload
                  </span>
                </div>
              </BorderGlow>
            </div>

            <div className="md:col-span-2">
              <GlowingInput
                label="Address"
                placeholder="Enter your address"
                required
              />
            </div>

            <GlowingInput
              label="Country"
              placeholder="Enter your country"
              required
            />

            <GlowingInput
              label="State / Province"
              placeholder="Enter your state"
              required
            />
          </div>

          <div className="flex justify-end mt-10">
            <Button
              onClick={onNext}
              className="bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 rounded-full text-base"
            >
              Next Step <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------
// Step 2: Agreement
// ------------------------------------------
function StepAgreement({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [agreements, setAgreements] = useState({
    cond1: false,
    cond2: false,
    cond3: false,
  });
  const allAgreed = agreements.cond1 && agreements.cond2 && agreements.cond3;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-red-900/10">
        <YoutubeSideBlock info="Agreement Terms" />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Please Read Carefully
          </h2>
          <p className="text-zinc-400 mb-6">
            Thanks for your interest in linking your channel(s) to Zinetic Music
            MCN.
          </p>

          <div className="flex flex-col gap-6">
            <p className="text-zinc-300 font-medium mb-2 border-b border-white/10 pb-4">
              To ensure linking your channel is beneficial and appropriate for
              you, please review and acknowledge these points carefully:
            </p>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox
                id="cond1"
                checked={agreements.cond1}
                onCheckedChange={(c) =>
                  setAgreements({ ...agreements, cond1: c === true })
                }
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
              />
              <div className="space-y-1">
                <label
                  htmlFor="cond1"
                  className="text-base font-medium text-white cursor-pointer select-none"
                >
                  I have read and understand the Conditions for maintaining your
                  YouTube channel in Zinetic Music MCN.
                </label>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline pt-2">
                  See full conditions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox
                id="cond2"
                checked={agreements.cond2}
                onCheckedChange={(c) =>
                  setAgreements({ ...agreements, cond2: c === true })
                }
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
              />
              <div className="space-y-1">
                <label
                  htmlFor="cond2"
                  className="text-base font-medium text-white cursor-pointer select-none"
                >
                  I understand and acknowledge, to avoid issues with my account,
                  I must only link channels I trust will follow YouTube's
                  requirements and guidelines.
                </label>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline pt-2">
                  YouTube Partner Requirements
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox
                id="cond3"
                checked={agreements.cond3}
                onCheckedChange={(c) =>
                  setAgreements({ ...agreements, cond3: c === true })
                }
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
              />
              <div className="space-y-2">
                <label
                  htmlFor="cond3"
                  className="text-base font-medium text-white cursor-pointer select-none"
                >
                  I will inform channel owners that:
                </label>
                <ul className="list-disc pl-5 text-sm text-zinc-400 space-y-2 pb-2">
                  <li>
                    Any valid strike, or violation of YouTube's Terms &
                    guidelines, can result in the channel being unlinked.
                  </li>
                  <li>They must only upload music or music related content.</li>
                </ul>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline pt-2">
                  Avoiding YouTube Copyright Strikes
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-10">
            <Button
              onClick={onPrev}
              variant="ghost"
              className="text-zinc-400 hover:text-white px-0 hover:bg-transparent"
            >
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={onNext}
              disabled={!allAgreed}
              className="bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 rounded-full text-base disabled:opacity-50 disabled:bg-zinc-700 disabled:text-zinc-500"
            >
              Acknowledge & Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------
// Step 3: Channel Submit
// ------------------------------------------
function StepChannelSubmit({
  onPrev,
  onSubmit,
}: {
  onPrev: () => void;
  onSubmit: () => void;
}) {
  const [handle, setHandle] = useState("");
  const [searchState, setSearchState] = useState<
    "idle" | "searching" | "found" | "added"
  >("idle");
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);

  // Fake verification logic
  const handleVerify = () => {
    if (!handle.trim()) return;
    setSearchState("searching");
    setTimeout(() => setSearchState("found"), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-red-900/10">
        <YoutubeSideBlock
          imageSrc="/icons/youtube.svg"
          info="Channel Verification"
        />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/icons/youtube.png"
              alt="YouTube"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Submit YouTube Channel
            </h2>
          </div>
          <p className="text-zinc-400 text-base mb-6">
            Ensure your YouTube channels are maximizing their monetization
            opportunities by linking them to our MCN.
          </p>

          <div className="bg-black/60 p-6 rounded-2xl border border-white/5 mb-8">
            <h4 className="text-white font-medium mb-3">
              Conditions for linking & maintaining channels:
            </h4>
            <ul className="space-y-2 text-zinc-400 text-sm list-disc pl-5">
              <li>100% of channel content must be music related</li>
              <li>
                95% of channel content must be original and fully owned by you
              </li>
              <li>
                Channel must meet YouTube's partner program acceptance criteria
              </li>
              <li>
                Please review our helpdesk article for added conditions related
                to maintaining your status
              </li>
            </ul>
            <p className="text-sm text-blue-400 hover:underline cursor-pointer mt-4 font-medium">
              See Full Conditions
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold text-white">
              Channel Identifier
            </label>
            <div className="flex flex-col gap-3">
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <div className="flex items-center h-14 bg-black/60 rounded-2xl overflow-hidden focus-within:bg-zinc-900/90 transition-colors">
                  <div className="px-5 h-full flex items-center bg-black/80 border-r border-white/5 text-zinc-400 font-medium select-none">
                    youtube.com/
                  </div>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => {
                      setHandle(e.target.value);
                      if (searchState !== "idle") setSearchState("idle");
                    }}
                    placeholder="@handle or Channel ID"
                    className="flex-1 bg-transparent px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0 font-medium h-full"
                  />
                  {searchState === "searching" && (
                    <div className="px-4 text-zinc-400 flex items-center">
                      <div className="w-5 h-5 border-2 border-zinc-500 border-t-red-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </BorderGlow>

              <AnimatePresence>
                {searchState === "found" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-white font-bold">
                          {handle ? `${handle} Music` : "Found Channel"}
                        </p>
                        <p className="text-zinc-500 text-sm">
                          Verified Channel • Ready to add
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSearchState("added")}
                      className="bg-white text-black hover:bg-zinc-200 font-bold rounded-full"
                    >
                      Add Channel
                    </Button>
                  </motion.div>
                )}

                {searchState === "added" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center gap-3 font-medium"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                    Channel added to application queue.
                  </motion.div>
                )}
              </AnimatePresence>

              {searchState === "idle" && (
                <div className="p-1.5 border border-white/20 rounded-md bg-[#050505] w-full">
                  <Button
                    onClick={handleVerify}
                    disabled={!handle.trim()}
                    className={`w-full h-12 rounded-sm text-white font-semibold text-sm tracking-wide disabled:opacity-50 border-0 transition-all flex items-center justify-center gap-3 px-8 shadow-inner ${
                      handle.trim() ? "bg-[#FF0000]" : "bg-zinc-800"
                    }`}
                  >
                    <Search className="w-5 h-5" />
                    {handle.trim() ? "Verify channel" : "No channels"}
                  </Button>
                </div>
              )}

              <p className="text-xs text-left text-zinc-500 mt-2">
                *If approved, it can take up to 7 days for newly added channels
                to appear in your catalog.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-10">
            <Button
              onClick={onPrev}
              variant="ghost"
              className="text-zinc-400 hover:text-white px-0 hover:bg-transparent focus-visible:ring-0"
            >
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <BorderGlow
              borderRadius={16}
              glowColor="18 83 52"
              glowIntensity={searchState === "added" ? 1 : 0}
              colors={["#762BED", "#EA621F"]}
              className={`w-fit cursor-pointer ${searchState !== "added" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <button
                onClick={() => setSubmitModalOpen(true)}
                disabled={searchState !== "added"}
                className="flex items-center gap-3 px-10 py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn"
              >
                <Check className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                <span className="text-lg tracking-tight">
                  Submit Application
                </span>
              </button>
            </BorderGlow>
          </div>
        </div>
      </div>

      <Dialog open={isSubmitModalOpen} onOpenChange={setSubmitModalOpen}>
        <DialogContent className="max-w-[480px] p-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 text-white rounded-[32px] overflow-hidden shadow-2xl focus-visible:ring-0">
          <div className="p-10 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full" />
              <div className="relative w-24 h-24 bg-green-500/5 border border-green-500/20 rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, delay: 0.2 }}
                >
                  <Check className="w-12 h-12 text-green-500 stroke-[3px]" />
                </motion.div>
              </div>
            </div>

            <div className="text-center space-y-4 mb-10">
              <DialogTitle className="text-xl font-extrabold tracking-tight">
                Application Submitted!
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-base leading-relaxed">
                Your request to join the Zinetic MCN has been received. Our team
                will review your channel and get back to you within{" "}
                <span className="text-white font-semibold">
                  3-5 business days
                </span>
                .
              </DialogDescription>
            </div>

            <BorderGlow
              borderRadius={16}
              glowColor="18 83 52"
              glowIntensity={1}
              colors={["#762BED", "#EA621F"]}
              className="w-full"
            >
              <button
                onClick={() => {
                  setSubmitModalOpen(false);
                  onSubmit();
                }}
                className="w-full h-14 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold text-lg transition-all flex items-center justify-center gap-3 hover:bg-black/80 active:scale-[0.98]"
              >
                Back to Dashboard
              </button>
            </BorderGlow>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ==========================================
// Main Controller
// ==========================================
export function YouTubeOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex justify-center pb-12 md:pb-20 px-4 xl:px-0">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        {/* Compact Single Progress Bar */}
        <div className="w-full max-w-sm mx-auto mb-10 px-4">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
            <span>Onboarding Progress</span>
            <span className="text-white">
              Step 0{step} / 0{totalSteps}
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#DA35F7] via-[#EA621F] to-[#802CEE]"
              initial={{ width: "33%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="relative min-h-[600px] w-full flex">
          <AnimatePresence mode="wait">
            {step === 1 && <StepPersonalInfo key="step1" onNext={handleNext} />}
            {step === 2 && (
              <StepAgreement
                key="step2"
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
            {step === 3 && (
              <StepChannelSubmit
                key="step3"
                onSubmit={handleSubmit}
                onPrev={handlePrev}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
