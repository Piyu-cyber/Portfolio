"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Settings, FileText, Cpu, CornerDownLeft } from "lucide-react";
import { playUISound } from "@/utils/audio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  toggleSound: () => void;
  toggleCrt: () => void;
  toggleGrid: () => void;
  toggleRecruiterMode: () => void;
  openDoc: (type: "resume" | "paper") => void;
}

interface CommandItem {
  category: "Navigation" | "Settings" | "Documents" | "Skills";
  title: string;
  subtitle: string;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  toggleSound,
  toggleCrt,
  toggleGrid,
  toggleRecruiterMode,
  openDoc,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        playUISound("click");
        if (isOpen) onClose();
        else onClose(); // Ensure toggle close
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
      setSearch("");
    }
  }, [isOpen]);

  const handleAction = (item: CommandItem) => {
    playUISound("click");
    item.action();
    onClose();
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      // Apply neon flash glow effect
      element.classList.add("flash-highlight");
      setTimeout(() => element.classList.remove("flash-highlight"), 1600);
    }
  };

  const commandList: CommandItem[] = [
    // Navigation
    {
      category: "Navigation",
      title: "Go to Snapshot Metrics",
      subtitle: "Jump to academic CGPA and publication scorecards",
      action: () => scrollToSection("#snapshot"),
    },
    {
      category: "Navigation",
      title: "Go to Projects portfolio",
      subtitle: "Inspect custom C++ inference engine and microservices",
      action: () => scrollToSection("#projects"),
    },
    {
      category: "Navigation",
      title: "Go to Research Lab",
      subtitle: "Read ACL SemEval-2026 NLP publication summary",
      action: () => scrollToSection("#research"),
    },
    {
      category: "Navigation",
      title: "Go to Engineering Stack",
      subtitle: "Interact with C++, CUDA, ONNX server rack slots",
      action: () => scrollToSection("#stack"),
    },
    {
      category: "Navigation",
      title: "Go to Timeline log",
      subtitle: "Scroll to internships, experiences, and academic achievements",
      action: () => scrollToSection("#timeline"),
    },
    // Settings
    {
      category: "Settings",
      title: "Toggle Synthesized UI Sounds",
      subtitle: "Turn click sound chimes on/off",
      action: () => toggleSound(),
    },
    {
      category: "Settings",
      title: "Toggle Terminal CRT Filter",
      subtitle: "Add scanline refresh filters to visual logs",
      action: () => toggleCrt(),
    },
    {
      category: "Settings",
      title: "Toggle Background Grids",
      subtitle: "Enable/disable HUD coordinate grid overlay lines",
      action: () => toggleGrid(),
    },
    {
      category: "Settings",
      title: "Toggle Recruiter Snap-mode",
      subtitle: "Highlight metrics and filter timeline for recruitment",
      action: () => toggleRecruiterMode(),
    },
    // Documents
    {
      category: "Documents",
      title: "Preview Resume Highlights",
      subtitle: "Open slide-over lightbox detailing resume criteria",
      action: () => openDoc("resume"),
    },
    {
      category: "Documents",
      title: "Preview ACL SemEval Research Paper Abstract",
      subtitle: "Open slide-over detailing the NLP pipeline paper",
      action: () => openDoc("paper"),
    },
    // Skills
    {
      category: "Skills",
      title: "C++ (Inference Engine & Microservices)",
      subtitle: "Jump directly to C++ server rack stack",
      action: () => scrollToSection("#stack"),
    },
    {
      category: "Skills",
      title: "ONNX Runtime (TransformerLOB low-latency execution)",
      subtitle: "Jump directly to ONNX model rack stack",
      action: () => scrollToSection("#stack"),
    },
    {
      category: "Skills",
      title: "CUDA GPU Execution provider",
      subtitle: "Jump directly to CUDA execution provider rack stack",
      action: () => scrollToSection("#stack"),
    },
    {
      category: "Skills",
      title: "pgvector & Supabase semantic cache database",
      subtitle: "Jump directly to RAG cache rack stack",
      action: () => scrollToSection("#stack"),
    },
    {
      category: "Skills",
      title: "Neo4j Graph Database query router",
      subtitle: "Jump directly to graph routing stack",
      action: () => scrollToSection("#stack"),
    },
  ];

  // Fuzzy filter commands
  const filteredCommands = commandList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      playUISound("hover");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      playUISound("hover");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        handleAction(filteredCommands[activeIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Navigation":
        return <Compass className="w-4 h-4 text-accent-blue" />;
      case "Settings":
        return <Settings className="w-4 h-4 text-accent-purple" />;
      case "Documents":
        return <FileText className="w-4 h-4 text-accent-green" />;
      case "Skills":
        return <Cpu className="w-4 h-4 text-accent-cyan" />;
      default:
        return <Compass className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-6 md:p-20 font-mono select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/25 backdrop-blur-md"
          />

          {/* Search Palette Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto max-w-xl rounded-2xl border border-white/50 bg-white/75 p-3 shadow-2xl overflow-hidden glass-hud"
            style={{ boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15)" }}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200/50">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search metrics, skills, documents, or settings..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <span className="text-[9px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 font-sans leading-none uppercase">
                ESC
              </span>
            </div>

            {/* Suggestions list */}
            <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAction(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 ${
                      idx === activeIndex
                        ? "bg-accent-blue/10 border border-accent-blue/20 text-slate-900"
                        : "border border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        idx === activeIndex ? "bg-white shadow" : "bg-slate-100"
                      }`}>
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold leading-normal truncate">{item.title}</div>
                        <div className="text-[10px] text-slate-400 leading-normal truncate">{item.subtitle}</div>
                      </div>
                    </div>
                    {idx === activeIndex && (
                      <div className="flex items-center gap-1 text-[9px] text-accent-blue font-sans font-medium">
                        <span>SELECT</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 font-sans">
                  No matching commands found. Try searching &quot;C++&quot;, &quot;Resume&quot;, or &quot;CRT&quot;.
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="bg-slate-50/50 border-t border-slate-200/50 p-2.5 px-4 text-[9px] text-slate-400 flex items-center justify-between font-sans leading-none rounded-b-xl">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="border border-slate-200 bg-white rounded px-1 text-[8px] font-mono leading-none">↑↓</span> Navigate</span>
                <span className="flex items-center gap-1"><span className="border border-slate-200 bg-white rounded px-1 text-[8px] font-mono leading-none">Enter</span> Select</span>
              </div>
              <span className="font-mono text-[8px] uppercase">piyush@spotlight-v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
