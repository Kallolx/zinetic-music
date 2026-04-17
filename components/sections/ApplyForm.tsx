"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  UploadCloud,
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
// Reusable Structural Components (same as YouTubeOnboarding)
// ==========================================

const ApplySideBlock = ({
  info,
  gradient = "from-[#802CEE] to-[#4a1a8a]",
  borderColor = "border-[#802CEE]/50",
}: {
  info?: string;
  gradient?: string;
  borderColor?: string;
}) => (
  <div className={`lg:w-[30%] bg-gradient-to-br ${gradient} p-10 flex border-r ${borderColor} flex-col justify-between items-center relative overflow-hidden min-h-[300px] lg:min-h-[600px]`}>
    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
    <div className="flex-grow flex items-center justify-center">
      <img
        src="/logo.png"
        alt="Zinetic Music"
        className="relative z-10 drop-shadow-2xl w-32 h-auto brightness-0 invert"
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

const GlowingSelect = ({
  label,
  required = false,
  options,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-zinc-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <BorderGlow borderRadius={16} className="w-full shadow-lg">
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 bg-black/60 px-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="bg-zinc-900 text-zinc-400">
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </BorderGlow>
  </div>
);

// ------------------------------------------
// Step 1: Personal Details  (indigo)
// ------------------------------------------
function StepPersonalDetails({ onNext }: { onNext: () => void }) {
  const [date, setDate] = useState<Date>();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-indigo-900/10">
        <ApplySideBlock
          info="Personal Details"
          gradient="from-[#3730a3] to-[#1e1b4b]"
          borderColor="border-indigo-700/50"
        />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Personal Information
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Tell us about yourself to begin the application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingInput label="First Name" placeholder="John" required />
            <GlowingInput label="Last Name" placeholder="Doe" required />
            <GlowingInput label="Email Address" type="email" placeholder="your@email.com" required />
            <GlowingInput label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" required />

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <Popover>
                  <PopoverTrigger className="w-full inline-flex items-center h-14 justify-start px-5 text-left text-sm font-medium border-none rounded-2xl bg-black/60 text-white outline-none focus:bg-zinc-900/90 hover:bg-zinc-900/90 transition-colors">
                    <CalendarIcon className="mr-3 h-5 w-5 text-zinc-400" />
                    {date ? format(date, "PPP") : <span className="text-zinc-500 font-normal">Pick a date</span>}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-zinc-800 text-white" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="bg-[#0a0a0a] text-white" />
                  </PopoverContent>
                </Popover>
              </BorderGlow>
            </div>

            <GlowingInput label="Identification Number" placeholder="ID or Passport Number" required />

            <div className="md:col-span-2">
              <GlowingInput label="Address" placeholder="Street address" required />
            </div>
            <GlowingInput label="State / Province" placeholder="State" required />
            <GlowingInput label="Country" placeholder="Country" required />

            {/* ID Document Upload */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-zinc-300">
                Upload ID Document <span className="text-red-500">*</span>
              </label>
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <div className="flex flex-col items-center justify-center h-28 bg-black/60 hover:bg-zinc-900/90 rounded-2xl border border-dashed border-zinc-700 cursor-pointer transition-colors relative">
                  <input type="file" accept="image/*,application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                  <UploadCloud className="h-8 w-8 text-zinc-500 mb-2" />
                  <span className="text-sm text-zinc-400 font-medium">Click or drag file to upload</span>
                  <span className="text-xs text-zinc-600 mt-1">JPG, PNG, PDF · Max 10MB</span>
                </div>
              </BorderGlow>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <Button onClick={onNext} className="bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 rounded-full text-base">
              Next Step <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------
// Step 2: Professional Details  (purple)
// ------------------------------------------
function StepProfessionalDetails({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [youAre, setYouAre] = useState("");
  const [genre, setGenre] = useState("");
  const [distributor, setDistributor] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-purple-900/10">
        <ApplySideBlock
          info="Professional Details"
          gradient="from-[#802CEE] to-[#4a1a8a]"
          borderColor="border-[#802CEE]/50"
        />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Professional Information
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Tell us about your music career.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingSelect
              label="You Are"
              required
              value={youAre}
              onChange={setYouAre}
              options={[
                { value: "artist", label: "Artist" },
                { value: "label", label: "Label" },
                { value: "manager", label: "Manager" },
                { value: "sub-distributor", label: "Sub-distributor" },
              ]}
            />
            <GlowingInput label="Artist / Band / Label Name" placeholder="Your artist name" required />
            <GlowingSelect
              label="Main Music Genre"
              required
              value={genre}
              onChange={setGenre}
              options={[
                { value: "pop", label: "Pop" },
                { value: "hip-hop", label: "Hip-Hop" },
                { value: "r&b", label: "R&B" },
                { value: "electronic", label: "Electronic" },
                { value: "rock", label: "Rock" },
                { value: "country", label: "Country" },
                { value: "latin", label: "Latin" },
                { value: "jazz", label: "Jazz" },
                { value: "classical", label: "Classical" },
                { value: "other", label: "Other" },
              ]}
            />
            <GlowingSelect
              label="Current Distributor"
              value={distributor}
              onChange={setDistributor}
              options={[
                { value: "none", label: "None" },
                { value: "distrokid", label: "DistroKid" },
                { value: "cdbaby", label: "CD Baby" },
                { value: "tunecore", label: "TuneCore" },
                { value: "believe", label: "Believe" },
                { value: "amuse", label: "Amuse" },
                { value: "other", label: "Other" },
              ]}
            />
            <div className="md:col-span-2">
              <GlowingSelect
                label="Reason for Leaving (Optional)"
                value={leaveReason}
                onChange={setLeaveReason}
                options={[
                  { value: "payment", label: "Payment Issue" },
                  { value: "support", label: "Support Issue" },
                  { value: "communication", label: "Communication Issue" },
                  { value: "features", label: "Missing Features" },
                  { value: "none", label: "Not working with anyone" },
                ]}
              />
            </div>
            <GlowingInput label="Number of Tracks Released" type="number" placeholder="0" required />
            <GlowingInput label="Total Monthly Listeners" type="number" placeholder="0" required />
          </div>

          <div className="flex items-center justify-between mt-10">
            <Button onClick={onPrev} variant="ghost" className="text-zinc-400 hover:text-white px-0 hover:bg-transparent">
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button onClick={onNext} className="bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 rounded-full text-base">
              Next Step <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------
// Step 3: Social Links, Payout & Agreement
// ------------------------------------------
function StepSocialPayout({
  onPrev,
  onSubmit,
}: {
  onPrev: () => void;
  onSubmit: () => void;
}) {
  const [payout, setPayout] = useState("");
  const [agreements, setAgreements] = useState({
    terms: false,
    rights: false,
  });
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const allAgreed = agreements.terms && agreements.rights;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-orange-900/10">
        <ApplySideBlock
          info="Social & Payouts"
          gradient="from-[#c2410c] to-[#7c2d12]"
          borderColor="border-orange-700/50"
        />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Social Links & Payout
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Connect your profiles and set up your payment preferences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <GlowingSelect
                label="Payout Method"
                required
                value={payout}
                onChange={setPayout}
                options={[
                  { value: "paypal", label: "PayPal" },
                  { value: "bank", label: "Bank Transfer" },
                  { value: "wise", label: "Wise" },
                  { value: "payoneer", label: "Payoneer" },
                ]}
              />
            </div>

            <GlowingInput
              label="Facebook URL"
              type="url"
              placeholder="https://facebook.com/..."
            />

            <GlowingInput
              label="YouTube Channel ID"
              placeholder="UC..."
            />

            <div className="md:col-span-2">
              <GlowingInput
                label="Spotify Artist URL"
                type="url"
                placeholder="https://open.spotify.com/artist/..."
              />
            </div>
          </div>

          {/* Agreement Section */}
          <div className="mt-8 flex flex-col gap-4">
            <p className="text-zinc-300 font-medium border-b border-white/10 pb-4">
              Please read and acknowledge before submitting:
            </p>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox
                id="terms"
                checked={agreements.terms}
                onCheckedChange={(c) =>
                  setAgreements({ ...agreements, terms: c === true })
                }
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#802CEE] data-[state=checked]:border-[#802CEE]"
              />
              <div className="space-y-1">
                <label
                  htmlFor="terms"
                  className="text-base font-medium text-white cursor-pointer select-none"
                >
                  I agree to the Terms of Service and Privacy Policy of Zinetic
                  Music Limited.
                </label>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline pt-2">
                  Read full Terms of Service
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox
                id="rights"
                checked={agreements.rights}
                onCheckedChange={(c) =>
                  setAgreements({ ...agreements, rights: c === true })
                }
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#802CEE] data-[state=checked]:border-[#802CEE]"
              />
              <div className="space-y-1">
                <label
                  htmlFor="rights"
                  className="text-base font-medium text-white cursor-pointer select-none"
                >
                  I confirm that all information provided is accurate and I own
                  or control the rights to the music I intend to distribute.
                </label>
              </div>
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
              glowIntensity={allAgreed ? 1 : 0}
              colors={["#762BED", "#EA621F"]}
              className={`w-fit cursor-pointer ${!allAgreed ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <button
                onClick={() => allAgreed && setSubmitModalOpen(true)}
                disabled={!allAgreed}
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

      {/* Success Dialog */}
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
                Your request to join the Zinetic Music distribution network has
                been received. Our team will review your application and get
                back to you within{" "}
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
                Back to Home
              </button>
            </BorderGlow>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ==========================================
// Main Controller (same pattern as YouTubeOnboarding)
// ==========================================
export function ApplyForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, totalSteps));
    scrollToTop();
  };
  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 1));
    scrollToTop();
  };
  const handleSubmit = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={topRef} className="w-full flex justify-center pb-12 md:pb-20 px-4 xl:px-0">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        {/* Progress Bar */}
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

        {/* Form Steps */}
        <div className="relative min-h-[600px] w-full flex">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepPersonalDetails key="step1" onNext={handleNext} />
            )}
            {step === 2 && (
              <StepProfessionalDetails
                key="step2"
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
            {step === 3 && (
              <StepSocialPayout
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
