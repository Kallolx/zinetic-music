"use client";

import * as React from "react";
import { AIToolInterface } from "@/components/sections/AIToolInterface";
import { Mic2, Play, Download } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import {
  ProSlider,
  ProSelect,
  ProToggle,
} from "@/components/ui/StudioControls";

export function VocalsClient() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<React.ReactNode | null>(null);

  // Industrial Vocal Synthesis State
  const [model, setModel] = React.useState("Nova");
  const [pitch, setPitch] = React.useState(0);
  const [breath, setBreath] = React.useState(20);
  const [vibrato, setVibrato] = React.useState(15);
  const [cloning, setCloning] = React.useState(false);

  const handleGenerate = (prompt: string, hasAttached: boolean) => {
    setIsProcessing(true);
    setResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      setResult(
        <div className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-6 transition-all">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center border border-white/5">
              <Mic2 className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Vocal Synthesis Rendered
                </h4>
                <span className="px-2 py-0.5 bg-zinc-800 border border-white/5 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Studio 48kHz
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-500 italic max-w-sm truncate">
                "{prompt || "Custom Synth Model: " + model}"
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <Play className="w-5 h-5 text-black fill-current ml-0.5" />
              </button>
              <div className="flex-1 h-10 flex items-end gap-0.5 px-2">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/20 rounded-full"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="h-12 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all">
              <Download className="w-4 h-4" />
              Export Dry Vocal
            </button>
            <button className="h-12 bg-white text-black hover:bg-zinc-200 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all">
              <Download className="w-4 h-4" />
              Download Stems
            </button>
          </div>
        </div>,
      );
    }, 3500);
  };

  const SettingsPanel = (
    <>
      <ProSelect
        label="Vocal Model"
        value={model}
        onChange={setModel}
        options={[
          { value: "Nova", label: "Nova (Pop/R&B Female)" },
          { value: "Echo", label: "Echo (Soulful Male)" },
          { value: "Aria", label: "Aria (Ethereal Soprano)" },
          { value: "Onyx", label: "Onyx (Deep Baritone)" },
        ]}
      />

      <ProSlider
        label="Pitch Shift"
        value={pitch}
        min={-12}
        max={12}
        unit=" st"
        onChange={setPitch}
      />
    </>
  );

  const AdvancedSettings = () => (
    <>
      <ProSlider
        label="Breathiness"
        value={breath}
        min={0}
        max={100}
        unit="%"
        onChange={setBreath}
      />

      <ProSlider
        label="Vibrato Intensity"
        value={vibrato}
        min={0}
        max={100}
        unit="%"
        onChange={setVibrato}
      />

      <ProToggle
        label="Force Vocal Cloning"
        checked={cloning}
        onChange={setCloning}
      />
    </>
  );

  return (
    <AIToolInterface
      title={
        <>
          Vocal{" "}
          <span className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#802CEE] bg-clip-text text-transparent">
            Maker
          </span>
        </>
      }
      description="Add realistic vocals to your project. Just type your lyrics and choose a voice to get a natural performance in seconds."
      placeholder="Enter your lyrics here..."
      buttonLabel="Create Vocals"
      settingsPanel={SettingsPanel}
      advancedSettings={AdvancedSettings}
      isProcessing={isProcessing}
      mockResult={result}
      onGenerate={handleGenerate}
    />
  );
}
