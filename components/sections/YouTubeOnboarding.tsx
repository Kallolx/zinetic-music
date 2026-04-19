"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  UploadCloud,
  Search,
  AlertCircle,
  X,
  FileText,
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
  DialogTitle,
} from "@/components/ui/dialog";
import BorderGlow from "@/components/BorderGlow";
import { Confetti, type ConfettiRef } from "@/registry/magicui/confetti";
import confetti from "canvas-confetti";

// ==========================================
// Types
// ==========================================
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: Date | undefined;
  id_number: string;
  id_file: File | null;
  address: string;
  country: string;
  state: string;
  cond1: boolean;
  cond2: boolean;
  cond3: boolean;
  channel_handle: string;
}

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
    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
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
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-zinc-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <BorderGlow borderRadius={16} className="w-full shadow-lg">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full h-14 bg-black/60 px-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
      />
    </BorderGlow>
  </div>
);

// ==========================================
// File Upload with Preview (shared)
// ==========================================
function FileUploadPreview({
  file, onChange, onClear,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
  onClear: () => void;
}) {
  const previewUrl = file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="text-sm font-semibold text-zinc-300">
        Upload Identification File <span className="text-red-500">*</span>
      </label>
      <BorderGlow borderRadius={16} className="w-full shadow-lg">
        {file ? (
          <div className="bg-black/60 rounded-2xl p-4 flex items-center gap-4 relative">
            {previewUrl ? (
              <img src={previewUrl} alt="ID Preview" className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0" />
            ) : (
              <div className="w-20 h-20 bg-zinc-900 rounded-xl border border-white/10 flex flex-col items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-zinc-500 mb-1" />
                <span className="text-[10px] text-zinc-600 font-bold uppercase">{file.name.split(".").pop()}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{file.name}</p>
              <p className="text-zinc-500 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB · {file.type || "document"}</p>
              <p className="text-green-400 text-xs font-bold mt-2 flex items-center gap-1">
                <Check className="w-3 h-3" /> File ready to submit
              </p>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="absolute top-3 right-3 p-1.5 bg-white/5 hover:bg-red-500/20 rounded-lg text-zinc-500 hover:text-red-400 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-28 bg-black/60 hover:bg-zinc-900/90 rounded-2xl border border-dashed border-zinc-700 cursor-pointer transition-all relative group">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
            <UploadCloud className="h-8 w-8 text-zinc-500 mb-2 group-hover:text-zinc-300 transition-colors" />
            <span className="text-sm text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors">Click or drag file to upload</span>
            <span className="text-xs text-zinc-600 mt-1">JPG, PNG, PDF · Max 10MB</span>
          </div>
        )}
      </BorderGlow>
    </div>
  );
}

// ------------------------------------------
// Step 1: Personal Info
// ------------------------------------------
function StepPersonalInfo({
  onNext,
  formData,
  setFormData,
}: {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, id_file: file }));
  };

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
            <GlowingInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter first name" required />
            <GlowingInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter last name" required />
            <GlowingInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required />
            <GlowingInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <Popover>
                  <PopoverTrigger className="w-full inline-flex items-center h-14 justify-start px-5 text-left text-sm font-medium border-none rounded-2xl bg-black/60 text-white outline-none focus:bg-zinc-900/90 hover:bg-zinc-900/90 transition-colors cursor-pointer">
                    <CalendarIcon className="mr-3 h-5 w-5 text-zinc-400" />
                    {formData.dob ? (
                      format(formData.dob, "PPP")
                    ) : (
                      <span className="text-zinc-500 font-normal">Pick a date</span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-zinc-800 text-white" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dob}
                      onSelect={(d) => setFormData((prev) => ({ ...prev, dob: d }))}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1940}
                      toYear={new Date().getFullYear()}
                      className="bg-[#0a0a0a] text-white"
                    />
                  </PopoverContent>
                </Popover>
              </BorderGlow>
            </div>

            <GlowingInput label="Identification Number" name="id_number" value={formData.id_number} onChange={handleChange} placeholder="NID/Passport" required />

            {/* File Upload with Preview */}
            <FileUploadPreview
              file={formData.id_file}
              onChange={(f) => setFormData((prev) => ({ ...prev, id_file: f }))}
              onClear={() => setFormData((prev) => ({ ...prev, id_file: null }))}
            />

            <div className="md:col-span-2">
              <GlowingInput label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" required />
            </div>

            <GlowingInput label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter your country" required />
            <GlowingInput label="State / Province" name="state" value={formData.state} onChange={handleChange} placeholder="Enter your state" required />
          </div>

          <div className="flex justify-end mt-10">
            <Button
              onClick={onNext}
              disabled={!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.dob || !formData.id_number || !formData.id_file || !formData.address || !formData.country || !formData.state}
              className="bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 rounded-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
  formData,
  setFormData,
}: {
  onNext: () => void;
  onPrev: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const allAgreed = formData.cond1 && formData.cond2 && formData.cond3;

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
            Thanks for your interest in linking your channel(s) to Zinetic Music MCN.
          </p>

          <div className="flex flex-col gap-6">
            <p className="text-zinc-300 font-medium mb-2 border-b border-white/10 pb-4">
              To ensure linking your channel is beneficial and appropriate for you, please review and acknowledge these points carefully:
            </p>

            {[
              {
                id: "cond1" as const,
                label: "I have read and understand the Conditions for maintaining your YouTube channel in Zinetic Music MCN.",
                link: "See full conditions",
              },
              {
                id: "cond2" as const,
                label: "I understand and acknowledge, to avoid issues with my account, I must only link channels I trust will follow YouTube's requirements and guidelines.",
                link: "YouTube Partner Requirements",
              },
              {
                id: "cond3" as const,
                label: "I will inform channel owners that any valid strike or violation can result in the channel being unlinked, and they must only upload music-related content.",
                link: "Avoiding YouTube Copyright Strikes",
              },
            ].map(({ id, label, link }) => (
              <div key={id} className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <Checkbox
                  id={id}
                  checked={formData[id]}
                  onCheckedChange={(c) => setFormData((prev) => ({ ...prev, [id]: c === true }))}
                  className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#FF0000] data-[state=checked]:border-[#FF0000]"
                />
                <div className="space-y-1">
                  <label htmlFor={id} className="text-base font-medium text-white cursor-pointer select-none">{label}</label>
                  <p className="text-sm text-blue-400 cursor-pointer hover:underline pt-2">{link}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-10">
            <Button onClick={onPrev} variant="ghost" className="text-zinc-400 hover:text-white px-0 hover:bg-transparent">
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={onNext}
              disabled={!allAgreed}
              className="bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 rounded-full text-base disabled:opacity-40 disabled:cursor-not-allowed"
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
type SearchState = "idle" | "searching" | "found" | "manual" | "added";

function StepChannelSubmit({
  onPrev,
  onSubmit,
  formData,
  setFormData,
  isSubmitting,
}: {
  onPrev: () => void;
  onSubmit: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isSubmitting: boolean;
}) {
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [foundChannel, setFoundChannel] = useState<{ name: string; avatar: string } | null>(null);
  const [manualName, setManualName] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleVerify = async () => {
    const input = formData.channel_handle.trim();
    if (!input) return;

    setSearchState("searching");
    setFoundChannel(null);

    const fallbackTimer = setTimeout(() => setSearchState("manual"), 7000);

    try {
      let targetUrl = input;
      if (!input.startsWith("http")) {
        if (input.startsWith("UC") && input.length > 20) {
          targetUrl = `https://www.youtube.com/channel/${input}`;
        } else {
          const handle = input.startsWith("@") ? input : `@${input}`;
          targetUrl = `https://www.youtube.com/${handle}`;
        }
      }

      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&timestamp=${Date.now()}`
      );
      clearTimeout(fallbackTimer);

      if (!res.ok) throw new Error("proxy failed");
      const { contents } = await res.json();

      const getMeta = (prop: string) => {
        const m =
          contents.match(new RegExp(`<meta[^>]*property=["']${prop}["'][^>]*content=["']([^"']+)["']`, "i")) ||
          contents.match(new RegExp(`<meta[^>]*name=["']${prop}["'][^>]*content=["']([^"']+)["']`, "i"));
        return m ? m[1] : null;
      };

      const title = getMeta("og:title") || getMeta("twitter:title") || contents.match(/<title>([^<]+)<\/title>/i)?.[1];
      const image = getMeta("og:image") || getMeta("twitter:image");

      if (title && image && !title.toLowerCase().includes("sign in")) {
        setFoundChannel({
          name: title.replace(/ - YouTube$/i, "").replace(/^YouTube$/i, "Channel"),
          avatar: image,
        });
        setSearchState("found");
      } else {
        setSearchState("manual");
      }
    } catch {
      clearTimeout(fallbackTimer);
      setSearchState("manual");
    }
  };

  const handleChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Auto-strip full youtube URL if pasted
    if (val.includes("youtube.com/")) {
      const parts = val.split("youtube.com/");
      val = parts[1].replace(/^(channel\/|c\/|user\/)/, "");
      if (!val.startsWith("@") && !val.startsWith("UC")) {
        val = `@${val}`;
      }
    }
    setFormData((prev) => ({ ...prev, channel_handle: val }));
    if (searchState !== "idle") setSearchState("idle");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1000px] mx-auto w-full"
    >
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-red-900/10">
        <YoutubeSideBlock imageSrc="/icons/youtube.svg" info="Channel Verification" />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <div className="flex items-center gap-3 mb-4">
            <img src="/icons/youtube.png" alt="YouTube" className="w-10 h-10 object-contain" />
            <h2 className="text-3xl font-bold tracking-tight text-white">Submit YouTube Channel</h2>
          </div>
          <p className="text-zinc-400 text-base mb-6">
            Link your channel to our MCN to maximize monetization opportunities.
          </p>

          <div className="bg-black/60 p-6 rounded-2xl border border-white/5 mb-8">
            <h4 className="text-white font-medium mb-3">Conditions for linking & maintaining channels:</h4>
            <ul className="space-y-2 text-zinc-400 text-sm list-disc pl-5">
              <li>100% of channel content must be music related</li>
              <li>95% of channel content must be original and fully owned by you</li>
              <li>Channel must meet YouTube's partner program acceptance criteria</li>
            </ul>
            <p className="text-sm text-blue-400 hover:underline cursor-pointer mt-4 font-medium">See Full Conditions</p>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold text-white">Channel Identifier</label>
            <div className="flex flex-col gap-3">
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <div className="flex items-center h-14 bg-black/60 rounded-2xl overflow-hidden focus-within:bg-zinc-900/90 transition-colors">
                  <div className="px-5 h-full flex items-center bg-black/80 border-r border-white/5 text-zinc-400 font-medium select-none text-sm">
                    youtube.com/
                  </div>
                  <input
                    type="text"
                    value={formData.channel_handle}
                    onChange={handleChannelInput}
                    placeholder="@handle, Channel ID, or paste full URL"
                    className="flex-1 bg-transparent px-4 text-white placeholder:text-zinc-600 focus:outline-none font-medium h-full"
                  />
                  {searchState === "searching" && (
                    <div className="px-4">
                      <div className="w-5 h-5 border-2 border-zinc-600 border-t-red-500 rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </BorderGlow>

              {/* Verify button — only show in idle state */}
              {searchState === "idle" && (
                <div className="p-1.5 border border-white/20 rounded-md bg-[#050505] w-full">
                  <Button
                    onClick={handleVerify}
                    disabled={!formData.channel_handle.trim()}
                    className={`w-full h-12 rounded-sm text-white font-semibold text-sm tracking-wide disabled:opacity-50 border-0 transition-all flex items-center justify-center gap-3 px-8 ${
                      formData.channel_handle.trim() ? "bg-[#FF0000] hover:bg-red-700" : "bg-zinc-800"
                    }`}
                  >
                    <Search className="w-5 h-5" />
                    {formData.channel_handle.trim() ? "Verify Channel" : "Paste link or handle above"}
                  </Button>
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* Found state */}
                {searchState === "found" && foundChannel && (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-black/70 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={foundChannel.avatar}
                        alt="Channel"
                        className="w-12 h-12 rounded-full border border-white/20 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/icons/youtube.png"; }}
                      />
                      <div>
                        <p className="text-white font-bold">{foundChannel.name}</p>
                        <p className="text-zinc-500 text-xs flex items-center gap-1">
                          <Check className="w-3 h-3 text-blue-500" /> Verified on YouTube
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSearchState("added")}
                      className="bg-white text-black hover:bg-zinc-200 font-bold rounded-full px-6"
                    >
                      Add Channel
                    </Button>
                  </motion.div>
                )}

                {/* Manual fallback state */}
                {searchState === "manual" && (
                  <motion.div
                    key="manual"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-zinc-900 border border-amber-500/25 p-6 rounded-2xl space-y-4"
                  >
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <AlertCircle className="w-5 h-5" /> Manual Verification
                    </div>
                    <p className="text-zinc-400 text-sm">
                      We could not auto-detect your channel. Please type your channel name below so our team can verify it after submission.
                    </p>
                    <BorderGlow borderRadius={12} className="w-full">
                      <input
                        type="text"
                        placeholder="e.g. MrBeast Music"
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        className="w-full h-12 bg-black/50 px-5 rounded-xl text-white outline-none"
                      />
                    </BorderGlow>
                    <Button
                      onClick={() => {
                        if (manualName.trim()) {
                          setFoundChannel({ name: manualName.trim(), avatar: "/icons/youtube.png" });
                          setSearchState("found");
                        }
                      }}
                      disabled={!manualName.trim()}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-11 rounded-xl disabled:opacity-40"
                    >
                      Confirm Channel Name
                    </Button>
                  </motion.div>
                )}

                {/* Added state */}
                {searchState === "added" && (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center gap-3 font-medium"
                  >
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>
                      <span className="font-bold text-green-300">{foundChannel?.name}</span> added to your application.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-zinc-500 mt-1">
                *If approved, it can take up to 7 days for newly added channels to appear in your catalog.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-10">
            <Button
              onClick={onPrev}
              variant="ghost"
              disabled={isSubmitting}
              className="text-zinc-400 hover:text-white px-0 hover:bg-transparent focus-visible:ring-0"
            >
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>

            <BorderGlow
              borderRadius={16}
              glowColor="18 83 52"
              glowIntensity={searchState === "added" && !isSubmitting ? 1 : 0}
              colors={["#762BED", "#EA621F"]}
              className={`w-fit ${searchState !== "added" || isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <button
                onClick={() => setConfirmModalOpen(true)}
                disabled={searchState !== "added" || isSubmitting}
                className="flex items-center gap-3 px-10 py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                )}
                <span className="text-lg tracking-tight">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </span>
              </button>
            </BorderGlow>
          </div>
        </div>
      </div>

      {/* Confirm submission modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="max-w-[440px] p-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 text-white rounded-[32px] overflow-hidden shadow-2xl focus-visible:ring-0">
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <DialogTitle className="text-xl font-extrabold tracking-tight">
              Ready to Submit?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 leading-relaxed">
              By submitting, you confirm all information is accurate and that you own the content on{" "}
              <span className="text-white font-semibold">{foundChannel?.name}</span>.
            </DialogDescription>
            <div className="flex flex-col gap-3 w-full mt-4">
              <Button
                onClick={() => {
                  setConfirmModalOpen(false);
                  onSubmit();
                }}
                className="w-full h-13 bg-white text-black font-bold rounded-2xl text-base py-4"
              >
                Confirm & Submit
              </Button>
              <Button
                onClick={() => setConfirmModalOpen(false)}
                variant="ghost"
                className="text-zinc-500 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// ==========================================
// Main Controller
// ==========================================

const INITIAL_FORM: FormData = {
  first_name: "", last_name: "", email: "", phone: "",
  dob: undefined, id_number: "", id_file: null,
  address: "", country: "", state: "",
  cond1: false, cond2: false, cond3: false,
  channel_handle: "",
};

export function YouTubeOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 3;
  const topRef = useRef<HTMLDivElement>(null);
  const leftConfettiRef = useRef<ConfettiRef>(null);
  const rightConfettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    const fireConfetti = () => {
      const isMobile = window.innerWidth < 768;
      const quantity = isMobile ? 30 : 80;

      // Fire from both sides
      setTimeout(() => {
        confetti({
          particleCount: quantity,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#DA35F7", "#EA621F", "#802CEE"],
        });
        confetti({
          particleCount: quantity,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#DA35F7", "#EA621F", "#802CEE"],
        });
      }, 200);
    };

    if (isSuccess || step === 1) {
      fireConfetti();
    }
  }, [isSuccess, step]);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("type", "youtube");
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("dob", formData.dob ? format(formData.dob, "yyyy-MM-dd") : "");
      data.append("id_number", formData.id_number);
      data.append("address", formData.address);
      data.append("country", formData.country);
      data.append("state", formData.state);
      data.append("channel_handle", formData.channel_handle);
      if (formData.id_file) data.append("id_file", formData.id_file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/submit`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(`Submission failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Could not connect to backend. Please make sure the backend server is running on port 5000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setStep(1);
    setIsSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={topRef} className="w-full flex justify-center pb-12 md:pb-20 px-4 xl:px-0">
      <div className="w-full max-w-5xl flex flex-col gap-10">

        {/* Progress Bar */}
        <div className="w-full max-w-sm mx-auto mb-10 px-4">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
            <span>Onboarding Progress</span>
            <span className="text-white">Step 0{step} / 0{totalSteps}</span>
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

        {/* Steps */}
        <div className="relative min-h-[600px] w-full flex">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepPersonalInfo
                key="step1"
                onNext={handleNext}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <StepAgreement
                key="step2"
                onNext={handleNext}
                onPrev={handlePrev}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 3 && (
              <StepChannelSubmit
                key="step3"
                onPrev={handlePrev}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="max-w-[440px] p-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 text-white rounded-[32px] overflow-hidden shadow-2xl focus-visible:ring-0">
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, delay: 0.1 }}
              className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-green-500 stroke-[2.5px]" />
            </motion.div>
            <DialogTitle className="text-2xl font-extrabold tracking-tight">Application Received!</DialogTitle>
            <DialogDescription className="text-zinc-400 leading-relaxed">
              Your request to join the Zinetic MCN has been received. Our team will review your channel and get back to you within{" "}
              <span className="text-white font-semibold">3–5 business days</span>.
            </DialogDescription>
            <BorderGlow borderRadius={16} glowColor="18 83 52" glowIntensity={1} colors={["#762BED", "#EA621F"]} className="w-full mt-4">
              <button
                onClick={handleReset}
                className="w-full h-14 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold text-lg transition-all hover:bg-black/80 active:scale-[0.98]"
              >
                Submit Another Application
              </button>
            </BorderGlow>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
