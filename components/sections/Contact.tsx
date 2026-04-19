"use client";

import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.zineticmusic.com';

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", position: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const offices = [
    {
      country: "United Kingdom",
      address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
      phone: "+44 7307 601 744",
      email: "contact@zineticmusic.com",
      hours: "Mon - Fri 3AM - 5PM",
      flag: "/icons/uk.svg",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0039233073383!2d-0.1264871231649666!3d51.5131804102871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604cc799ee82b%3A0xed4b20ef9ba933fc!2s71-75%20Shelton%20St%2C%20London%20WC2H%209JQ%2C%20UK!5e0!3m2!1sen!2sus!4v1700683602131!5m2!1sen!2sus",
    },
    {
      country: "Bangladesh",
      address: "Batar Goli, Boro Moghbazar, Ramna, Dhaka, 1217",
      phone: "+880 9696 797 267",
      email: "info@zineticmusic.com",
      hours: "Mon - Fri 11AM - 5PM",
      flag: "/icons/bd.svg",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.3159981882!2d90.40019253457997!3d23.743714545934653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85a3a718d0d%3A0xe212f3bc3cfcd3fc!2sMoghbazar%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700683602131!5m2!1sen!2sus",
    },
  ];

  return (
    <section className="relative py-24 pb-32 overflow-hidden z-10 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7 h-fit flex flex-col"
          >
            <div className="bg-zinc-900/30 p-8 md:p-12 rounded-[32px] border border-zinc-900 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

              <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
                <h2 className="text-4xl md:text-6xl font-heading font-medium tracking-tighter text-white leading-[1.1] mb-6 flex flex-col md:flex-row items-center gap-3 md:gap-4 flex-wrap">
                  <img
                    src="/logo.png"
                    alt="Zinetic Logo"
                    className="h-12 md:h-12 w-auto object-contain shrink-0 order-1 md:order-2"
                  />
                  <span className="order-2 md:order-1">Ready to</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 order-3">
                    Connect.
                  </span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                  For creators and partners built to support you worldwide, seamlessly.
                </p>
              </div>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-3xl p-10 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-zinc-400">Thanks for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BorderGlow borderRadius={16} className="w-full shadow-lg">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-black/60 p-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
                        required
                      />
                    </BorderGlow>
                    <BorderGlow borderRadius={16} className="w-full shadow-lg">
                      <input
                        type="text"
                        placeholder="Your Position"
                        value={formData.position}
                        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                        className="w-full bg-black/60 p-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
                        required
                      />
                    </BorderGlow>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BorderGlow borderRadius={16} className="w-full shadow-lg">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-black/60 p-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
                        required
                      />
                    </BorderGlow>
                    <BorderGlow borderRadius={16} className="w-full shadow-lg">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-black/60 p-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors"
                        required
                      />
                    </BorderGlow>
                  </div>

                  <BorderGlow
                    borderRadius={16}
                    className="w-full shadow-[0_0_25px_rgba(0,0,0,0.5)] border-glow-textarea"
                  >
                    <textarea
                      placeholder="Tell us what you're building..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-black/60 p-5 rounded-2xl text-white outline-none focus:bg-zinc-900/90 transition-colors resize-y leading-relaxed"
                      required
                    ></textarea>
                  </BorderGlow>

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-10 py-5 font-bold font-heading w-full md:w-auto text-white rounded-2xl bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                      {status === "loading" ? "Sending..." : "Submit Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Integrated Map & Office Cards Stack - Spans narrower logical segment */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 flex flex-col h-fit"
          >
            {offices.map((office, idx) => (
              <BorderGlow key={idx} borderRadius={32} className="w-full">
                <div className="bg-zinc-950 rounded-[32px] overflow-hidden flex flex-col group relative">
                  {/* Dynamic Map Header Block */}
                  <div className="h-48 relative w-full overflow-hidden shrink-0 border-b border-zinc-900">
                    <iframe
                      src={office.map}
                      className="w-full h-[150%] absolute top-[-25%] border-0 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700 pointer-events-none group-hover:pointer-events-auto"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Shadow overlay so text reads nice if they overlap */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />

                    {/* Absolute Map Title Overlay */}
                    <div className="absolute bottom-4 left-5 md:left-6 flex items-center gap-3 z-10 pointer-events-none">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border">
                        {office.flag && (
                          <img
                            src={office.flag}
                            alt={`${office.country} Flag`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <h3 className="text-base font-heading font-medium text-white tracking-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {office.country}
                      </h3>
                    </div>
                  </div>

                  {/* Text Directory Body */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col pt-6 md:pt-8 w-full overflow-visible relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 w-full relative z-10">
                      {/* Left Column: Address & Hours */}
                      <div className="space-y-5">
                        <div className="flex gap-4 items-start group/line">
                          <MapPin className="w-4 h-4 text-zinc-600 shrink-0 mt-1 group-hover/line:text-blue-400 transition-colors" />
                          <span className="text-zinc-400 text-sm tracking-tight leading-relaxed break-words break-all md:break-normal">
                            {office.address}
                          </span>
                        </div>
                        <div className="flex gap-4 items-center group/line">
                          <Clock className="w-4 h-4 text-zinc-600 shrink-0 group-hover/line:text-blue-400 transition-colors" />
                          <span className="text-zinc-500 text-sm uppercase tracking-wider font-semibold">
                            {office.hours}
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Contact Links */}
                      <div className="space-y-5 pt-4 border-t border-zinc-900 md:pt-0 md:border-t-0 md:pl-6 md:border-l md:border-zinc-800">
                        <div className="flex gap-4 items-center group/line">
                          <Phone className="w-4 h-4 text-zinc-600 shrink-0 group-hover/line:text-blue-400 transition-colors" />
                          <a
                            href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                            className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
                          >
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex gap-4 items-center group/line">
                          <Mail className="w-4 h-4 text-zinc-600 shrink-0 group-hover/line:text-blue-400 transition-colors" />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-zinc-400 text-sm font-medium hover:text-white transition-colors truncate"
                          >
                            {office.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
