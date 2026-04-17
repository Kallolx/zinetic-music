"use client";

import * as React from "react";
import { AIToolInterface } from "@/components/sections/AIToolInterface";
import { Music2, Play, Download, Dices } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import {
  ProSlider,
  ProSelect,
  ProToggle,
} from "@/components/ui/StudioControls";

export default function AIGenPage() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<React.ReactNode | null>(null);

  // Advanced Production Settings State
  const [genre, setGenre] = React.useState("EDM");
  const [tempo, setTempo] = React.useState(128);
  const [variation, setVariation] = React.useState(50);
  const [seed, setSeed] = React.useState(4294);
  const [exportStems, setExportStems] = React.useState(true);

  const handleGenerate = (prompt: string, hasAttached: boolean) => {
    setIsProcessing(true);
    setResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      setResult(
        <div className="w-full bg-zinc-900 border border-white/5 rounded-2xl p-6 transition-all">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center border border-white/5">
              <Music2 className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Synthesis Complete
                </h4>
                <span className="px-2 py-0.5 bg-zinc-800 border border-white/5 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  24-bit WAV
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-500 italic truncate max-w-sm">
                "{prompt || "Custom Parametric Synthesis"}"
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <Play className="w-5 h-5 text-black fill-current ml-1" />
              </button>
              <div className="flex-1 h-8 flex items-end gap-1 px-2">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/20 rounded-full"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-zinc-600">
                3:42.12
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="h-12 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all">
              <Download className="w-4 h-4" />
              Export Track
            </button>
            <button className="h-12 bg-white text-black hover:bg-zinc-200 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all">
              <Download className="w-4 h-4" />
              Download Stems
            </button>
          </div>
        </div>,
      );
    }, 3000);
  };

  const SettingsPanel = (
    <>
      <ProSelect
        label="Generation Engine"
        value={genre}
        onChange={setGenre}
        options={[
          { value: "EDM", label: "Industrial EDM (4.1)" },
          { value: "Cinematic", label: "Cinematic Neo-Noir" },
          { value: "HipHop", label: "Modern Trap Synthesis" },
          { value: "Vaporwave", label: "Analog Vaporwave" },
        ]}
      />

      <ProSlider
        label="Synthesis Tempo"
        value={tempo}
        min={60}
        max={180}
        unit=" BPM"
        onChange={setTempo}
      />
    </>
  );

  const AdvancedSettings = () => (
    <>
      <ProSlider
        label="AI Variation"
        value={variation}
        min={0}
        max={100}
        unit="%"
        onChange={setVariation}
      />

      <div className="space-y-2 px-0.5">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          Global Seed
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="flex-1 h-11 bg-[#0c0c0c] border border-white/10 rounded-lg px-4 text-white text-[13px] font-mono focus:border-zinc-500 outline-none transition-colors"
          />
          <button
            onClick={() => setSeed(Math.floor(Math.random() * 9999))}
            className="px-3 h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg border border-white/5 transition-colors flex items-center justify-center"
          >
            <Dices className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      <ProToggle
        label="Export Multi-Stems"
        checked={exportStems}
        onChange={setExportStems}
      />
    </>
  );

  return (
    <AIToolInterface
      title={
        <>
          <span className="bg-gradient-to-r from-[#802CEE] via-[#DA35F7] to-[#EA621F] bg-clip-text text-transparent">
            AI Music
          </span>{" "}
          Generator
        </>
      }
      description="Bring your musical ideas to life. Just describe the style or mood you want, and we'll help you create a track in seconds."
      placeholder="Paste your lyrics here..."
      buttonLabel="Create Music"
      settingsPanel={SettingsPanel}
      advancedSettings={AdvancedSettings}
      isProcessing={isProcessing}
      mockResult={result}
      onGenerate={handleGenerate}
    />
  );
}
