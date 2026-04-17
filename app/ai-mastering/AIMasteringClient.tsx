"use client";

import * as React from "react";
import { AIToolInterface } from "@/components/sections/AIToolInterface";
import { Disc, Play, Activity, Download } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import {
  ProSlider,
  ProSelect,
  ProToggle,
} from "@/components/ui/StudioControls";

export function AIMasteringClient() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<React.ReactNode | null>(null);

  // Industrial Mastering State
  const [preset, setPreset] = React.useState("Warm");
  const [lufs, setLufs] = React.useState(-14);
  const [width, setWidth] = React.useState(100);
  const [ceiling, setCeiling] = React.useState(-0.1);
  const [truePeak, setTruePeak] = React.useState(true);

  const handleGenerate = (prompt: string, hasAttached: boolean) => {
    setIsProcessing(true);
    setResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      setResult(
        <div className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-6 transition-all">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <Disc className="w-6 h-6 text-white" />
              <h4 className="text-xl font-bold text-white tracking-tight">
                Mastering Render Finished
              </h4>
            </div>
            <span className="px-2 py-0.5 bg-zinc-800 border border-white/5 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              32-Bit Float
            </span>
          </div>

          <div className="space-y-4 mb-8">
            {/* Original */}
            <div className="flex items-center gap-4 px-4 py-3 bg-black/40 rounded-xl border border-white/5 opacity-40">
              <Play className="w-4 h-4 text-white fill-current" />
              <div className="flex-1 h-6 flex items-end gap-0.5 opacity-30">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white rounded-full"
                    style={{ height: `${20 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-zinc-600">INPUT</span>
            </div>

            {/* Mastered */}
            <div className="flex items-center gap-4 px-4 py-4 bg-white/5 rounded-xl border border-white/10">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              </button>
              <div className="flex-1 h-10 flex items-end gap-0.5">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white rounded-full"
                    style={{ height: `${40 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
              <Activity className="w-3 h-3 text-white animate-pulse" />
            </div>
          </div>

          <button className="w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all">
            <Download className="w-4 h-4" />
            Download Professional Master
          </button>
        </div>,
      );
    }, 4000);
  };

  const SettingsPanel = (
    <>
      <ProSelect
        label="Mastering Character"
        value={preset}
        onChange={setPreset}
        options={[
          { value: "Warm", label: "Vintage Analog Warmth" },
          { value: "Bright", label: "Modern Radio Brightness" },
          { value: "Punchy", label: "Aggressive Bass Punch" },
          { value: "Transparent", label: "Natural Transparency" },
        ]}
      />

      <ProSlider
        label="Target Loudness"
        value={lufs}
        min={-18}
        max={-6}
        unit=" LUFS"
        onChange={setLufs}
      />
    </>
  );

  const AdvancedSettings = () => (
    <>
      <ProSlider
        label="Stereo Imaging"
        value={width}
        min={50}
        max={150}
        unit="%"
        onChange={setWidth}
      />

      <ProSlider
        label="Output Ceiling"
        value={ceiling}
        min={-1.0}
        max={-0.1}
        step={0.1}
        unit=" dB"
        onChange={setCeiling}
      />

      <ProToggle
        label="True Peak Limiting"
        checked={truePeak}
        onChange={setTruePeak}
      />
    </>
  );

  return (
    <AIToolInterface
      title={
        <>
          Music{" "}
          <span className="bg-gradient-to-r from-[#EA621F] via-[#DA35F7] to-[#802CEE] bg-clip-text text-transparent">
            Finisher
          </span>
        </>
      }
      description="Make your music sound professional. We'll balance the volume and clarity so your song sounds perfect on every speaker."
      placeholder="Enter your track name here..."
      buttonLabel="Finish Track"
      settingsPanel={SettingsPanel}
      advancedSettings={AdvancedSettings}
      isProcessing={isProcessing}
      mockResult={result}
      onGenerate={handleGenerate}
    />
  );
}
