"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// --- ProSlider ---
interface ProSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
  className?: string;
}

export function ProSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  className,
}: ProSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between items-center px-0.5">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          {label}
        </label>
        <span className="text-[14px] font-mono font-bold text-white tracking-tight">
          {value}{unit}
        </span>
      </div>
      <div className="relative h-7 flex items-center group">
        <style jsx>{`
          .pro-slider-input {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            background: linear-gradient(to right, #802CEE 0%, #EA621F ${percentage}%, #18181b ${percentage}%, #18181b 100%);
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            outline: none;
            cursor: pointer;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
          }
          .pro-slider-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            border: 2px solid #09090b;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
            transition: all 0.2s;
          }
          .pro-slider-input:hover::-webkit-slider-thumb {
            transform: scale(1.1);
          }
        `}</style>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pro-slider-input"
        />
      </div>
    </div>
  );
}

// --- ProSelect ---
interface ProSelectOption {
  value: string;
  label: string;
}

interface ProSelectProps {
  label: string;
  value: string;
  options: ProSelectOption[];
  onChange: (val: string) => void;
  className?: string;
}

export function ProSelect({
  label,
  value,
  options,
  onChange,
  className,
}: ProSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("space-y-2", className)} ref={dropdownRef}>
      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-0.5">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-11 flex items-center justify-between px-4 bg-[#0c0c0c] border border-white/10 rounded-lg text-white text-[13px] font-bold hover:bg-zinc-900 transition-colors outline-none focus:border-[#DA35F7]/40"
        >
          <span>{selectedOption?.label}</span>
          <ChevronDown
            className={cn("w-4 h-4 text-zinc-500 transition-transform duration-300", isOpen && "rotate-180")}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-zinc-950 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="p-1">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12px] transition-colors text-left",
                      value === option.value
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-500 hover:bg-zinc-900/50 hover:text-white"
                    )}
                  >
                    <span>{option.label}</span>
                    {value === option.value && <Check className="w-3.5 h-3.5 text-zinc-400" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- ProToggle ---
interface ProToggleProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  className?: string;
}

export function ProToggle({
  label,
  checked,
  onChange,
  className,
}: ProToggleProps) {
  return (
    <div className={cn("flex items-center justify-between px-0.5", className)}>
      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
        {label}
      </label>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-10 min-w-[40px] h-6 rounded-full transition-colors duration-200 outline-none p-1 block",
          checked ? "bg-[#DA35F7]" : "bg-zinc-800"
        )}
      >
        <motion.div
          animate={{ x: checked ? 16 : 0 }}
          className="w-4 h-4 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
