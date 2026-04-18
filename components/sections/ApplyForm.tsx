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

// ==========================================
// Types
// ==========================================
interface ApplyFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: Date | undefined;
  id_number: string;
  id_file: File | null;
  address: string;
  state: string;
  country: string;
  you_are: string;
  artist_name: string;
  genre: string;
  distributor: string;
  leave_reason: string;
  tracks_released: string;
  monthly_listeners: string;
  payout_method: string;
  facebook_url: string;
  youtube_channel_id: string;
  spotify_url: string;
  terms: boolean;
  rights: boolean;
}

const INITIAL_FORM: ApplyFormData = {
  first_name: "", last_name: "", email: "", phone: "",
  dob: undefined, id_number: "", id_file: null,
  address: "", state: "", country: "",
  you_are: "", artist_name: "", genre: "", distributor: "", leave_reason: "",
  tracks_released: "", monthly_listeners: "",
  payout_method: "", facebook_url: "", youtube_channel_id: "", spotify_url: "",
  terms: false, rights: false,
};

// ==========================================
// Shared UI Components
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
    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
    <div className="flex-grow flex items-center justify-center">
      <img src="/logo.png" alt="Zinetic Music" className="relative z-10 drop-shadow-2xl w-32 h-auto brightness-0 invert" />
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
  label, name, type = "text", placeholder, required = false, value, onChange,
}: {
  label: string; name: string; type?: string; placeholder: string;
  required?: boolean; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-zinc-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <BorderGlow borderRadius={16} className="w-full shadow-lg">
      <input
        type={type} name={name} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        className="w-full h-14 bg-black/60 px-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
      />
    </BorderGlow>
  </div>
);

const GlowingSelect = ({
  label, required = false, options, value, onChange,
}: {
  label: string; required?: boolean;
  options: { value: string; label: string }[];
  value: string; onChange: (val: string) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-zinc-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <BorderGlow borderRadius={16} className="w-full shadow-lg">
      <select
        required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 bg-black/60 px-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="bg-zinc-900 text-zinc-400">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">{opt.label}</option>
        ))}
      </select>
    </BorderGlow>
  </div>
);

// ==========================================
// File Upload with Preview
// ==========================================
function FileUploadPreview({
  file,
  onChange,
  onClear,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
  onClear: () => void;
}) {
  const previewUrl = file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null;

  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="text-sm font-semibold text-zinc-300">
        Upload ID Document <span className="text-red-500">*</span>
      </label>
      <BorderGlow borderRadius={16} className="w-full shadow-lg">
        {file ? (
          // Preview state
          <div className="bg-black/60 rounded-2xl p-4 flex items-center gap-4 relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="ID Preview"
                className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0"
              />
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
          // Empty upload state
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

// ==========================================
// Step 1: Personal Details
// ==========================================
function StepPersonalDetails({
  onNext, formData, setFormData,
}: {
  onNext: () => void;
  formData: ApplyFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplyFormData>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-[1000px] mx-auto w-full">
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-indigo-900/10">
        <ApplySideBlock info="Personal Details" gradient="from-[#3730a3] to-[#1e1b4b]" borderColor="border-indigo-700/50" />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Personal Information</h2>
          <p className="text-zinc-400 text-base mb-8">Tell us about yourself to begin the application.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="John" required />
            <GlowingInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Doe" required />
            <GlowingInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
            <GlowingInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required />

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Date of Birth <span className="text-red-500">*</span></label>
              <BorderGlow borderRadius={16} className="w-full shadow-lg">
                <Popover>
                  <PopoverTrigger className="w-full inline-flex items-center h-14 justify-start px-5 text-left text-sm font-medium border-none rounded-2xl bg-black/60 text-white outline-none focus:bg-zinc-900/90 hover:bg-zinc-900/90 transition-colors cursor-pointer">
                    <CalendarIcon className="mr-3 h-5 w-5 text-zinc-400" />
                    {formData.dob ? format(formData.dob, "PPP") : <span className="text-zinc-500 font-normal">Pick a date</span>}
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

            <GlowingInput label="Identification Number" name="id_number" value={formData.id_number} onChange={handleChange} placeholder="ID or Passport Number" required />

            <div className="md:col-span-2">
              <GlowingInput label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" required />
            </div>
            <GlowingInput label="State / Province" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
            <GlowingInput label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />

            {/* File Upload with Preview */}
            <FileUploadPreview
              file={formData.id_file}
              onChange={(f) => setFormData((prev) => ({ ...prev, id_file: f }))}
              onClear={() => setFormData((prev) => ({ ...prev, id_file: null }))}
            />
          </div>

          <div className="flex justify-end mt-10">
            <Button
              onClick={onNext}
              disabled={!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.dob || !formData.id_number || !formData.address || !formData.state || !formData.country || !formData.id_file}
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

// ==========================================
// Step 2: Professional Details
// ==========================================
function StepProfessionalDetails({
  onNext, onPrev, formData, setFormData,
}: {
  onNext: () => void;
  onPrev: () => void;
  formData: ApplyFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplyFormData>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-[1000px] mx-auto w-full">
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-purple-900/10">
        <ApplySideBlock info="Professional Details" gradient="from-[#802CEE] to-[#4a1a8a]" borderColor="border-[#802CEE]/50" />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Professional Information</h2>
          <p className="text-zinc-400 text-base mb-8">Tell us about your music career.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingSelect label="You Are" required value={formData.you_are} onChange={(v) => setFormData((p) => ({ ...p, you_are: v }))}
              options={[
                { value: "artist", label: "Artist" },
                { value: "label", label: "Label" },
                { value: "manager", label: "Manager" },
                { value: "sub-distributor", label: "Sub-distributor" },
              ]}
            />
            <GlowingInput label="Artist / Band / Label Name" name="artist_name" value={formData.artist_name} onChange={handleChange} placeholder="Your artist name" required />
            <GlowingSelect label="Main Music Genre" required value={formData.genre} onChange={(v) => setFormData((p) => ({ ...p, genre: v }))}
              options={[
                { value: "pop", label: "Pop" }, { value: "hip-hop", label: "Hip-Hop" },
                { value: "r&b", label: "R&B" }, { value: "electronic", label: "Electronic" },
                { value: "rock", label: "Rock" }, { value: "country", label: "Country" },
                { value: "latin", label: "Latin" }, { value: "jazz", label: "Jazz" },
                { value: "classical", label: "Classical" }, { value: "other", label: "Other" },
              ]}
            />
            <GlowingSelect label="Current Distributor" value={formData.distributor} onChange={(v) => setFormData((p) => ({ ...p, distributor: v }))}
              options={[
                { value: "none", label: "None" }, { value: "distrokid", label: "DistroKid" },
                { value: "cdbaby", label: "CD Baby" }, { value: "tunecore", label: "TuneCore" },
                { value: "believe", label: "Believe" }, { value: "amuse", label: "Amuse" },
                { value: "other", label: "Other" },
              ]}
            />
            <div className="md:col-span-2">
              <GlowingSelect label="Reason for Leaving (Optional)" value={formData.leave_reason} onChange={(v) => setFormData((p) => ({ ...p, leave_reason: v }))}
                options={[
                  { value: "payment", label: "Payment Issue" }, { value: "support", label: "Support Issue" },
                  { value: "communication", label: "Communication Issue" }, { value: "features", label: "Missing Features" },
                  { value: "none", label: "Not working with anyone" },
                ]}
              />
            </div>
            <GlowingInput label="Number of Tracks Released" name="tracks_released" type="number" value={formData.tracks_released} onChange={handleChange} placeholder="0" required />
            <GlowingInput label="Total Monthly Listeners" name="monthly_listeners" type="number" value={formData.monthly_listeners} onChange={handleChange} placeholder="0" required />
          </div>

          <div className="flex items-center justify-between mt-10">
            <Button onClick={onPrev} variant="ghost" className="text-zinc-400 hover:text-white px-0 hover:bg-transparent">
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={onNext}
              disabled={!formData.you_are || !formData.artist_name || !formData.genre || !formData.tracks_released || !formData.monthly_listeners}
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

// ==========================================
// Step 3: Social Links, Payout & Agreement
// ==========================================
function StepSocialPayout({
  onPrev, onSubmit, formData, setFormData, isSubmitting,
}: {
  onPrev: () => void;
  onSubmit: () => void;
  formData: ApplyFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplyFormData>>;
  isSubmitting: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const allAgreed = formData.terms && formData.rights;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-[1000px] mx-auto w-full">
      <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-orange-900/10">
        <ApplySideBlock info="Social & Payouts" gradient="from-[#c2410c] to-[#7c2d12]" borderColor="border-orange-700/50" />

        <div className="lg:w-[70%] p-8 md:p-12 flex flex-col relative bg-[#111]">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Social Links & Payout</h2>
          <p className="text-zinc-400 text-base mb-8">Connect your profiles and set up your payment preferences.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <GlowingSelect label="Payout Method" required value={formData.payout_method} onChange={(v) => setFormData((p) => ({ ...p, payout_method: v }))}
                options={[
                  { value: "paypal", label: "PayPal" }, { value: "bank", label: "Bank Transfer" },
                  { value: "wise", label: "Wise" }, { value: "payoneer", label: "Payoneer" },
                ]}
              />
            </div>
            <GlowingInput label="Facebook URL" name="facebook_url" type="url" value={formData.facebook_url} onChange={handleChange} placeholder="https://facebook.com/..." />
            <GlowingInput label="YouTube Channel ID" name="youtube_channel_id" value={formData.youtube_channel_id} onChange={handleChange} placeholder="UC..." />
            <div className="md:col-span-2">
              <GlowingInput label="Spotify Artist URL" name="spotify_url" type="url" value={formData.spotify_url} onChange={handleChange} placeholder="https://open.spotify.com/artist/..." />
            </div>
          </div>

          {/* Agreement */}
          <div className="mt-8 flex flex-col gap-4">
            <p className="text-zinc-300 font-medium border-b border-white/10 pb-4">Please read and acknowledge before submitting:</p>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox id="terms" checked={formData.terms}
                onCheckedChange={(c) => setFormData((p) => ({ ...p, terms: c === true }))}
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#802CEE] data-[state=checked]:border-[#802CEE]"
              />
              <div className="space-y-1">
                <label htmlFor="terms" className="text-base font-medium text-white cursor-pointer select-none">
                  I agree to the Terms of Service and Privacy Policy of Zinetic Music Limited.
                </label>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline pt-2">Read full Terms of Service</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-black/60 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox id="rights" checked={formData.rights}
                onCheckedChange={(c) => setFormData((p) => ({ ...p, rights: c === true }))}
                className="mt-1 h-5 w-5 border-zinc-600 data-[state=checked]:bg-[#802CEE] data-[state=checked]:border-[#802CEE]"
              />
              <div>
                <label htmlFor="rights" className="text-base font-medium text-white cursor-pointer select-none">
                  I confirm that all information provided is accurate and I own or control the rights to the music I intend to distribute.
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-10">
            <Button onClick={onPrev} variant="ghost" disabled={isSubmitting} className="text-zinc-400 hover:text-white px-0 hover:bg-transparent focus-visible:ring-0">
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <BorderGlow
              borderRadius={16}
              glowColor="18 83 52"
              glowIntensity={allAgreed && !isSubmitting ? 1 : 0}
              colors={["#762BED", "#EA621F"]}
              className={`w-fit ${!allAgreed || isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <button
                onClick={() => allAgreed && !isSubmitting && setConfirmOpen(true)}
                disabled={!allAgreed || isSubmitting}
                className="flex items-center gap-3 px-10 py-4 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold transition-all group/btn"
              >
                {isSubmitting
                  ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  : <Check className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                }
                <span className="text-lg tracking-tight">{isSubmitting ? "Submitting..." : "Submit Application"}</span>
              </button>
            </BorderGlow>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-[440px] p-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 text-white rounded-[32px] overflow-hidden shadow-2xl focus-visible:ring-0">
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <DialogTitle className="text-xl font-extrabold tracking-tight">Submit Your Application?</DialogTitle>
            <DialogDescription className="text-zinc-400 leading-relaxed">
              By submitting, you confirm all information is accurate and you own the rights to the music you plan to distribute.
            </DialogDescription>
            <div className="flex flex-col gap-3 w-full mt-4">
              <Button
                onClick={() => { setConfirmOpen(false); onSubmit(); }}
                className="w-full py-4 bg-white text-black font-bold rounded-2xl text-base"
              >
                Confirm & Submit
              </Button>
              <Button onClick={() => setConfirmOpen(false)} variant="ghost" className="text-zinc-500">Cancel</Button>
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
export function ApplyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplyFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 3;
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const handleNext = () => { setStep((s) => Math.min(s + 1, totalSteps)); scrollToTop(); };
  const handlePrev = () => { setStep((s) => Math.max(s - 1, 1)); scrollToTop(); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("type", "partner");
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("dob", formData.dob ? format(formData.dob, "yyyy-MM-dd") : "");
      data.append("id_number", formData.id_number);
      data.append("address", formData.address);
      data.append("country", formData.country);
      data.append("state", formData.state);
      // Extra partner fields
      data.append("you_are", formData.you_are);
      data.append("artist_name", formData.artist_name);
      data.append("genre", formData.genre);
      data.append("distributor", formData.distributor);
      data.append("tracks_released", formData.tracks_released);
      data.append("monthly_listeners", formData.monthly_listeners);
      data.append("payout_method", formData.payout_method);
      data.append("facebook_url", formData.facebook_url);
      data.append("youtube_channel_id", formData.youtube_channel_id);
      data.append("spotify_url", formData.spotify_url);
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
      alert("Could not connect to backend. Make sure the backend is running on port 5000.");
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
            {step === 1 && <StepPersonalDetails key="step1" onNext={handleNext} formData={formData} setFormData={setFormData} />}
            {step === 2 && <StepProfessionalDetails key="step2" onNext={handleNext} onPrev={handlePrev} formData={formData} setFormData={setFormData} />}
            {step === 3 && <StepSocialPayout key="step3" onPrev={handlePrev} onSubmit={handleSubmit} formData={formData} setFormData={setFormData} isSubmitting={isSubmitting} />}
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
              Your request to join the Zinetic Music distribution network has been received. Our team will review your application and get back to you within{" "}
              <span className="text-white font-semibold">3–5 business days</span>.
            </DialogDescription>
            <BorderGlow borderRadius={16} glowColor="18 83 52" glowIntensity={1} colors={["#762BED", "#EA621F"]} className="w-full mt-4">
              <button
                onClick={handleReset}
                className="w-full h-14 bg-black/60 backdrop-blur-md rounded-[16px] text-white font-bold text-lg transition-all hover:bg-black/80 active:scale-[0.98]"
              >
                Back to Home
              </button>
            </BorderGlow>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
