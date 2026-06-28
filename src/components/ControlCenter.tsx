"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Volume2, VolumeX, Tv, Grid, Shield, CheckCircle } from "lucide-react";
import { playUISound } from "@/utils/audio";

interface ControlCenterProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  crtActive: boolean;
  setCrtActive: (val: boolean) => void;
  gridActive: boolean;
  setGridActive: (val: boolean) => void;
}

export default function ControlCenter({
  recruiterMode,
  setRecruiterMode,
  crtActive,
  setCrtActive,
  gridActive,
  setGridActive,
}: ControlCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Sync sound mute state with localStorage on mount
  useEffect(() => {
    const isMuted = localStorage.getItem("ui_sound_muted") === "true";
    setSoundMuted(isMuted);
  }, []);

  const toggleSound = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    localStorage.setItem("ui_sound_muted", String(newMuted));
    if (!newMuted) {
      setTimeout(() => playUISound("success"), 50);
    }
  };

  const handleToggle = (action: () => void) => {
    action();
    if (!soundMuted) {
      playUISound("click");
    }
  };

  return (
    <div className="fixed bottom-12 right-4 z-50 font-mono text-xs select-none">
      {/* Floating Control Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (soundMuted) return;
          playUISound("click");
        }}
        className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-accent-blue text-white border-accent-blue keep-white scale-[1.05]"
            : "bg-white/60 border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100"
        }`}
        title="Toggle Control Center"
      >
        <Sliders className={`w-4 h-4 ${isOpen ? "text-white keep-white" : ""}`} />
      </button>

      {/* Control Panel Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-12 right-0 w-64 glass-hud border border-white/50 rounded-2xl p-4 shadow-2xl flex flex-col gap-4"
            style={{
              background: "rgba(255, 255, 255, 0.75)",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)"
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-1.5 border-b border-slate-200/50 pb-2.5">
              <Sliders className="w-3.5 h-3.5 text-accent-blue" />
              <span className="font-bold text-slate-800 uppercase text-[10px]">HUD Control Center</span>
            </div>

            {/* Switch Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  !soundMuted
                    ? "bg-accent-blue/15 border-accent-blue/40 text-accent-blue font-bold"
                    : "bg-slate-100/50 border-slate-200 text-slate-500"
                }`}
              >
                {!soundMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-[9px]">UI Sound</span>
              </button>

              {/* CRT Scanlines Toggle */}
              <button
                onClick={() => handleToggle(() => setCrtActive(!crtActive))}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  crtActive
                    ? "bg-accent-purple/15 border-accent-purple/40 text-accent-purple font-bold"
                    : "bg-slate-100/50 border-slate-200 text-slate-500"
                }`}
              >
                <Tv className="w-4 h-4" />
                <span className="text-[9px]">CRT Filter</span>
              </button>

              {/* Background Grid Toggle */}
              <button
                onClick={() => handleToggle(() => setGridActive(!gridActive))}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  gridActive
                    ? "bg-accent-cyan/15 border-accent-cyan/40 text-accent-cyan font-bold"
                    : "bg-slate-100/50 border-slate-200 text-slate-500"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="text-[9px]">Background Grid</span>
              </button>

              {/* Recruiter Mode Toggle */}
              <button
                onClick={() => handleToggle(() => setRecruiterMode(!recruiterMode))}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  recruiterMode
                    ? "bg-accent-green/15 border-accent-green/40 text-accent-green font-bold"
                    : "bg-slate-100/50 border-slate-200 text-slate-500"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span className="text-[9px]">Recruiter Snap</span>
              </button>
            </div>

            {/* Quick status report footer */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-2 text-[9px] text-slate-500 flex items-center justify-between font-sans leading-none">
              <span className="flex items-center gap-1 font-mono uppercase text-[8px] font-bold">
                <CheckCircle className="w-3 h-3 text-accent-green" /> Status: Normal
              </span>
              <span className="font-mono text-[8px]">latency: 1.42ms</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
