"use client";

import React, { useState } from "react";
import { BookOpen, Award, Layers, Users } from "lucide-react";

export default function ResearchLab() {
  const [selectedLang, setSelectedLang] = useState("all");

  const languages = [
    { code: "en", name: "English", f1: 0.842, type: "High-Resource" },
    { code: "es", name: "Spanish", f1: 0.825, type: "High-Resource" },
    { code: "fr", name: "French", f1: 0.819, type: "High-Resource" },
    { code: "de", name: "German", f1: 0.814, type: "High-Resource" },
    { code: "it", name: "Italian", f1: 0.808, type: "High-Resource" },
    { code: "pt", name: "Portuguese", f1: 0.803, type: "High-Resource" },
    { code: "ru", name: "Russian", f1: 0.795, type: "High-Resource" },
    { code: "zh", name: "Chinese", f1: 0.792, type: "High-Resource" },
    { code: "ar", name: "Arabic", f1: 0.781, type: "Low-Resource" },
    { code: "hi", name: "Hindi", f1: 0.789, type: "Low-Resource" },
    { code: "bn", name: "Bengali", f1: 0.772, type: "Low-Resource" },
    { code: "ta", name: "Tamil", f1: 0.765, type: "Low-Resource" },
    { code: "te", name: "Telugu", f1: 0.762, type: "Low-Resource" },
    { code: "ur", name: "Urdu", f1: 0.758, type: "Low-Resource" },
    { code: "fa", name: "Persian", f1: 0.754, type: "Low-Resource" },
    { code: "tr", name: "Turkish", f1: 0.778, type: "Low-Resource" },
    { code: "id", name: "Indonesian", f1: 0.784, type: "Low-Resource" },
    { code: "vi", name: "Vietnamese", f1: 0.776, type: "Low-Resource" },
    { code: "ko", name: "Korean", f1: 0.788, type: "High-Resource" },
    { code: "ja", name: "Japanese", f1: 0.791, type: "High-Resource" },
    { code: "sw", name: "Swahili", f1: 0.741, type: "Low-Resource" },
    { code: "yo", name: "Yoruba", f1: 0.732, type: "Low-Resource" },
  ];

  const filteredLangs = selectedLang === "all" 
    ? languages 
    : languages.filter(l => l.type.toLowerCase() === selectedLang.toLowerCase());

  const averageF1 = Number((languages.reduce((acc, curr) => acc + curr.f1, 0) / languages.length).toFixed(3));

  const performanceBaselines = [
    { name: "Dual-Encoder Stacking (Ours)", score: 79.7, color: "bg-accent-green", highlight: true },
    { name: "Llama-3-8B-Instruct (Zero-Shot)", score: 53.4, color: "bg-slate-700", highlight: false },
    { name: "mDeBERTa-v3-base (Baseline)", score: 68.2, color: "bg-slate-700", highlight: false },
    { name: "Majority Class Baseline", score: 46.1, color: "bg-slate-800", highlight: false },
  ];

  return (
    <section id="research" className="py-20 border-b border-card-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
            <span className="font-mono text-xs text-accent-purple tracking-widest uppercase">
              Academic Output
            </span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
            Peer-Reviewed Research Lab
          </h2>
          <p className="mt-2 text-sm text-text-muted font-mono max-w-3xl">
            Applying low-level ML engineering, multi-gpu model quantization, and ensemble routing architecture to solve core challenges in multilingual NLP.
          </p>
        </div>

        {/* Paper Details Card */}
        <div className="glass-hud border border-card-border/80 rounded-lg overflow-hidden p-6 mb-10 relative group hover:border-slate-700 transition-all duration-300">
          {/* HUD Corner Accents */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-card-border pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-accent-purple/10 border border-accent-purple/30 text-accent-purple font-mono text-[10px] font-bold">
                <Award className="w-3 h-3" />
                ACL SemEval-2026 Accepted Paper
              </span>
              <h3 className="text-xl font-mono font-bold text-white leading-snug">
                Semantic Vectors at SemEval-2026 Task 9: Robust Multilingual Polarization Detection via Dual-Encoder Fusion and Expert Ensembling
              </h3>
              <p className="text-xs text-text-muted font-mono">
                Ankit Dash, Priyanshu Mittal, <strong className="text-white">Piyush Prashant</strong>, Sunil Saumya | <em>Proceedings of SemEval-2026, Association for Computational Linguistics</em>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
              <a
                href="/Semantic_Vectors_SemEval_2026.pdf"
                download
                className="px-4 py-2 border border-accent-purple/30 hover:border-accent-purple bg-[#0B0C0E] text-accent-purple font-mono text-xs rounded flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>DOWNLOAD PAPER (PDF)</span>
              </a>
              <a
                href="https://aclanthology.org"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-card-border hover:border-slate-700 bg-[#0B0C0E] text-white font-mono text-xs rounded flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>ACL ANTHOLOGY</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            {/* Left Column: Abstract & Innovations */}
            <div className="lg:col-span-7 space-y-6 font-mono text-xs text-slate-300">
              <div>
                <span className="text-accent-purple font-bold block mb-1 uppercase tracking-wide text-[10px]">{"// Research Overview:"}</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Cross-lingual polarization classification suffers from significant semantic shift. We fine-tuned mDeBERTa-v3 and XLM-RoBERTa-large via 4-bit QLoRA, stacking their predictions with an XGBoost classifier and applying Shannon entropy thresholds for dynamic routing.
                </p>
              </div>

              <div>
                <span className="text-accent-purple font-bold block mb-2 uppercase tracking-wide text-[10px]">{"// Model Ensemble Architecture:"}</span>
                <div className="p-4 bg-[#0B0C0E] border border-card-border rounded space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-white font-bold border-b border-card-border/40 pb-2">
                    <Layers className="w-4 h-4 text-accent-cyan" />
                    <span>DUAL-ENCODER META-STACKING LAYER</span>
                  </div>
                  <div className="space-y-2 text-[10px] leading-relaxed text-slate-400">
                    <div className="flex items-start gap-1.5">
                      <span className="text-accent-green">✔</span>
                      <span><strong className="text-white">4-bit QLoRA:</strong> Co-trained dual models across 22 languages on a single GPU.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-accent-green">✔</span>
                      <span><strong className="text-white">Entropy Routing:</strong> Used Shannon entropy metrics to route simple inputs directly, reducing compute overhead by 35%.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-accent-green">✔</span>
                      <span><strong className="text-white">XGBoost Stacking:</strong> Blended base dual-encoders to mitigate model-specific classification bias.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Comparative Benchmarks */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-[10px] text-text-muted mb-3 uppercase block font-bold">{"// Macro-F1 Score Performance Compare (higher is better):"}</span>
                <div className="space-y-3 font-mono">
                  {performanceBaselines.map((base, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className={base.highlight ? "text-accent-green font-bold" : "text-slate-400"}>{base.name}</span>
                        <span className="text-white font-bold">{base.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0B0C0E] border border-card-border rounded-full overflow-hidden">
                        <div
                          className={`h-full ${base.color} transition-all duration-1000`}
                          style={{ width: `${base.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 font-mono text-[9px] text-text-muted leading-snug">
                  * Note: The dual-encoder fusion architecture outperforms Llama-3-8B-Instruct by +26.3 pp and majority class base by +33.6 pp across the 22-language benchmark.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Benchmark Map / Interactive stats */}
        <div className="glass-hud border border-card-border/80 rounded-lg p-6 font-mono text-xs relative group hover:border-slate-700 transition-all duration-300">
          {/* HUD Corner Accents */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-slate-700 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-card-border/60 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent-green" />
              <span className="font-bold text-white">22-Language Evaluation Matrix (SemEval-2026)</span>
            </div>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 select-none">
              <button
                onClick={() => setSelectedLang("all")}
                className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                  selectedLang === "all"
                    ? "bg-accent-green/15 border-accent-green text-accent-green"
                    : "bg-card-bg border-card-border text-text-muted hover:text-white"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setSelectedLang("high-resource")}
                className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                  selectedLang === "high-resource"
                    ? "bg-accent-green/15 border-accent-green text-accent-green"
                    : "bg-card-bg border-card-border text-text-muted hover:text-white"
                }`}
              >
                HIGH-RESOURCE
              </button>
              <button
                onClick={() => setSelectedLang("low-resource")}
                className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                  selectedLang === "low-resource"
                    ? "bg-accent-green/15 border-accent-green text-accent-green"
                    : "bg-card-bg border-card-border text-text-muted hover:text-white"
                }`}
              >
                LOW-RESOURCE
              </button>
            </div>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredLangs.map((lang) => (
              <div
                key={lang.code}
                className="bg-[#0B0C0E]/50 border border-card-border hover:border-slate-800 rounded p-3 text-center flex flex-col justify-between transition-colors"
              >
                <div className="text-[10px] text-text-muted font-bold tracking-widest uppercase">
                  {lang.code.toUpperCase()}
                </div>
                <div className="text-white font-bold my-1 text-[11px]">{lang.name}</div>
                <div className="mt-2 text-[10px] text-accent-green flex items-center justify-center gap-1 font-mono">
                  <span>F1:</span>
                  <span className="font-bold">{lang.f1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-card-border/40 pt-4 flex items-center justify-between text-[10px] text-text-muted">
            <span>Total Languages: 22 evaluated</span>
            <span>Average Multilingual F1: <strong className="text-white">{averageF1}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
