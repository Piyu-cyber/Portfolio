"use client";

import React, { useState, useEffect } from "react";
import { Database, Activity, MapPin, GitBranch, Cpu } from "lucide-react";

interface StatusBarProps {
  recruiterMode: boolean;
}

export default function StatusBar({ recruiterMode }: StatusBarProps) {
  const [latency, setLatency] = useState(1.42);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Small fluctuating inference latency simulation
    const interval = setInterval(() => {
      setLatency(Number((1.2 + Math.random() * 0.5).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const tInterval = setInterval(updateTime, 1000);
    return () => clearInterval(tInterval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0C0E]/90 border-t border-card-border/80 backdrop-blur-md h-7 px-4 flex items-center justify-between text-[10px] font-mono text-text-muted select-none">
      {/* Left section: status & branch */}
      <div className="flex items-center gap-4 truncate">
        <div className="flex items-center gap-1.5 text-accent-green">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
          <span className="hidden sm:inline">ENV:</span>
          <span>PRODUCTION</span>
        </div>
        <div className="h-3 w-[1px] bg-card-border"></div>
        <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
          <GitBranch className="w-3 h-3 text-accent-blue" />
          <span>main</span>
        </div>
        <div className="h-3 w-[1px] bg-card-border hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1 text-[#F59E0B]">
          <Cpu className="w-3 h-3" />
          <span>CUDA: 12.4 // active</span>
        </div>
      </div>

      {/* Middle section: latency and database status */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-accent-cyan" />
          <span>INFERENCE_LATENCY: <span className="text-white font-bold">{latency}ms</span></span>
        </div>
        <div className="h-3 w-[1px] bg-card-border"></div>
        <div className="flex items-center gap-1">
          <Database className="w-3 h-3 text-accent-purple" />
          <span>VEC_DB: ChromaDB // pgvector</span>
        </div>
      </div>

      {/* Right section: time and location */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-red-500" />
          <span className="hidden xs:inline">Dharwad, IN</span>
        </div>
        <div className="h-3 w-[1px] bg-card-border"></div>
        <div className="flex items-center gap-1 text-slate-400">
          <span className="hidden lg:inline">{currentTime}</span>
          <span className="lg:hidden">{currentTime.substring(11, 16)}</span>
        </div>
        <div className="h-3 w-[1px] bg-card-border"></div>
        <div className="bg-accent-blue/10 px-2 py-0.5 text-accent-blue rounded text-[9px] font-bold">
          {recruiterMode ? "RECRUITER_OPTIMIZED" : "ENGINEERING_DOCK"}
        </div>
      </div>
    </footer>
  );
}
