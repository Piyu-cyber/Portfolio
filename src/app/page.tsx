"use client";

import React, { useState } from "react";
import { FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import TerminalDemo from "@/components/TerminalDemo";
import RecruiterSnapshot from "@/components/RecruiterSnapshot";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchLab from "@/components/ResearchLab";
import EngineeringStack from "@/components/EngineeringStack";
import Timeline from "@/components/Timeline";
import RecruiterQuickMode from "@/components/RecruiterQuickMode";

import { motion } from "framer-motion";
import DocumentPreview from "@/components/DocumentPreview";
import ControlCenter from "@/components/ControlCenter";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<"resume" | "paper" | null>(null);
  const [crtActive, setCrtActive] = useState(false);
  const [gridActive, setGridActive] = useState(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    setMousePos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const trustBarItems = [
    { label: "ACL SemEval-2026 Author", detail: "22-Language NLP Research" },
    { label: "CGPA 9.1 / 10.0", detail: "IIIT Dharwad Honours" },
    { label: "Production RAG Systems", detail: "pgvector + Groq + Cache" },
    { label: "C++ Inference Engineering", detail: "ONNX Runtime Accelerator" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen relative bg-transparent text-slate-100 flex flex-col selection:bg-accent-green/30 selection:text-white"
    >
      {/* Floating dynamic backdrop blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[650px] rounded-full bg-sky-200/45 blur-[100px] animate-blob pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] rounded-full bg-purple-200/45 blur-[100px] animate-blob animation-delay-2000 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[15%] w-[48vw] h-[48vw] max-w-[600px] rounded-full bg-rose-200/40 blur-[100px] animate-blob animation-delay-4000 pointer-events-none z-0" />

      {/* Cyber grid lines overlay */}
      {gridActive && <div className="absolute inset-0 cyber-grid pointer-events-none z-0 opacity-70" />}

      {/* Dynamic Cursor Light Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.35), transparent 50%)`
        }}
      />

      {/* Hidden Recruiter Keywords for Search Engine Crawlers & ATS Parsers */}
      <div className="sr-only" aria-hidden="true">
        AI Engineer, ML Engineer, RAG Engineer, Applied AI, LLM Infrastructure, NLP Research, Quant ML, Deep Learning Engineer, Agentic AI, Supabase, pgvector, ONNX, CUDA, PyTorch, C++, Python, Next.js, React
      </div>

      {/* Navigation */}
      <Navbar recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 space-y-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-8 pb-10 flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/40 text-[10px] font-mono text-accent-blue tracking-wider uppercase shadow-md shadow-accent-blue/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping"></span>
                piyush_prashant // ACTIVE
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-extrabold tracking-tight text-white leading-[1.15]">
                Building{" "}
                <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-green bg-clip-text text-transparent">
                  High-Performance
                </span>{" "}
                AI Systems
              </h1>

              <p className="text-sm sm:text-base text-text-muted font-mono leading-relaxed max-w-2xl">
                B.Tech DSAI honours student at IIIT Dharwad. Specializing in low-latency C++ model inference, pgvector semantic caching, and intelligent query routing.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={(e) => handleScrollTo(e, "#projects")}
                  className="px-5 py-3 rounded bg-accent-blue text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-colors keep-white hover:bg-accent-blue/90"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 text-white keep-white" />
                </button>

                <button
                  onClick={() => {
                    setPreviewType("paper");
                    setPreviewOpen(true);
                  }}
                  className="px-5 py-3 rounded border border-card-border hover:border-slate-700 bg-card-bg text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Research</span>
                </button>

                <button
                  onClick={() => {
                    setPreviewType("resume");
                    setPreviewOpen(true);
                  }}
                  className="px-5 py-3 rounded border border-card-border hover:border-slate-700 bg-card-bg text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-text-muted" />
                  <span>Resume (docx)</span>
                </button>

                <a
                  href="https://github.com/Piyu-cyber"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded border border-card-border hover:border-slate-700 bg-card-bg text-slate-300 hover:text-white transition-colors flex items-center justify-center"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Terminal Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className={`lg:col-span-5 w-full rounded-lg overflow-hidden relative ${crtActive ? "crt-scanlines animate-crt" : ""}`}
            >
              <TerminalDemo />
            </motion.div>
          </div>

          {/* Trust Bar Grid */}
          <div className="border-t border-card-border pt-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none font-mono">
              {trustBarItems.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{"// "}{item.detail}</div>
                  <div className="text-sm font-bold text-white">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECRUITER QUICK SUMMARY PANEL (Conditioned on Recruiter Mode Toggle) */}
        {recruiterMode && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-300">
            <RecruiterQuickMode />
          </section>
        )}

        {/* RECRUITER SNAPSHOT SECTION */}
        <RecruiterSnapshot />

        {/* PROJECTS SECTION */}
        <ProjectsSection />

        {/* RESEARCH SECTION */}
        <ResearchLab />

        {/* SKILLS SECTION */}
        <EngineeringStack />

        {/* TIMELINE SECTION */}
        <Timeline />

        {/* CURRENTLY EXPLORING CORNER FOOTER */}
        <section className="bg-[#12141C]/30 border border-card-border rounded-lg p-6 font-mono text-xs select-none">
          <span className="text-[10px] text-accent-green font-bold block mb-3 uppercase tracking-wide">{"// Currently Exploring:"}</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>
              <span>AI Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
              <span>Efficient Inference Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
              <span>Agentic Workflows</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
              <span>Applied ML Systems</span>
            </div>
          </div>
        </section>

      </main>

      {/* Systems Status Bar footer */}
      <StatusBar recruiterMode={recruiterMode} />

      {/* Document slide-over lightbox previewer */}
      <DocumentPreview 
        isOpen={previewOpen} 
        onClose={() => setPreviewOpen(false)} 
        docType={previewType} 
      />

      {/* iOS-style Control Center Widget */}
      <ControlCenter
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
        crtActive={crtActive}
        setCrtActive={setCrtActive}
        gridActive={gridActive}
        setGridActive={setGridActive}
      />
    </div>
  );
}

