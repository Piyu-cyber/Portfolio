"use client";

import React, { useState } from "react";
import { Shield, FileText, CheckCircle2, Copy, Mail, Phone, ExternalLink } from "lucide-react";

export default function RecruiterQuickMode() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const highlights = [
    { title: "Academic Standing", detail: "CGPA 9.1/10.0 B.Tech Data Science & AI at IIIT Dharwad" },
    { title: "Scientific Publications", detail: "ACL SemEval-2026 Author (Multilingual Polarization Detection)" },
    { title: "Core Architecture Skills", detail: "Low-latency C++ Inference + ONNX Runtime (1.75x speedup)" },
    { title: "AI/RAG Automation", detail: "Semantic Caching pgvector RAG (60% API cost reductions)" },
    { title: "Production Capabilities", detail: "FastAPI, Docker, Kubernetes, AWS MLOps configurations" },
  ];

  return (
    <div className="w-full bg-[#12141C] border border-accent-green/30 rounded-xl overflow-hidden shadow-2xl relative glow-green transition-all duration-300">
      {/* Dynamic Header */}
      <div className="bg-accent-green/10 border-b border-accent-green/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-accent-green animate-pulse" />
          <div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Recruiter Quick-Summary Mode Active
            </h3>
            <p className="text-[10px] font-mono text-accent-green/80">
              ATS-Optimized Credentials & Immediate Contact Panels
            </p>
          </div>
        </div>
        <div className="hidden xs:block bg-accent-green/20 text-accent-green border border-accent-green/30 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
          Scan Time: &lt;15 seconds
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Essential details (7 cols) */}
        <div className="lg:col-span-7 space-y-5 font-mono text-xs text-slate-300">
          <div>
            <span className="text-[10px] text-accent-green font-bold block mb-1.5 uppercase tracking-wide">
              {"// Essential Profile Summary:"}
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              B.Tech Data Science & AI student at IIIT Dharwad (expected May 2028). Strong systems engineering portfolio with peer-reviewed NLP paper published in ACL SemEval-2026. Specialized in low-latency C++ ONNX model inference pipelines, vector-embedded pgvector RAG databases with semantic caching, and XGBoost-based intelligent system query routers.
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="text-[10px] text-accent-green font-bold block mb-1.5 uppercase tracking-wide">
              {"// Verified Highlights (Ready for verification):"}
            </span>
            <div className="space-y-2">
              {highlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">{hl.title}:</strong>{" "}
                    <span className="text-slate-400">{hl.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Cards & Direct downloads (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0B0C0E] border border-card-border rounded-lg p-4 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-text-muted block uppercase font-bold tracking-wide">
              {"// Direct Actions:"}
            </span>

            {/* Resume download */}
            <a
              href="/Piyush_Prashant_Resume_Final.docx"
              download
              className="w-full py-2.5 rounded bg-white text-[#0B0C0E] hover:bg-slate-200 font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME.DOCX</span>
            </a>

            {/* Email link */}
            <div className="flex items-center justify-between gap-2 p-2 bg-card-bg border border-card-border rounded">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-accent-blue" />
                <span className="text-slate-300 truncate select-all">piyushprashantmanutd@gmail.com</span>
              </div>
              <button
                onClick={() => handleCopy("piyushprashantmanutd@gmail.com", "email")}
                className="p-1 hover:bg-[#0B0C0E] rounded text-text-muted hover:text-white transition-colors shrink-0"
                title="Copy Email"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Phone link */}
            <div className="flex items-center justify-between gap-2 p-2 bg-card-bg border border-card-border rounded">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-green" />
                <span className="text-slate-300 select-all">+91 7991189767</span>
              </div>
              <button
                onClick={() => handleCopy("+917991189767", "phone")}
                className="p-1 hover:bg-[#0B0C0E] rounded text-text-muted hover:text-white transition-colors shrink-0"
                title="Copy Phone"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {copiedText && (
              <div className="text-[10px] text-accent-green text-center font-bold animate-pulse">
                Copied {copiedText} to clipboard!
              </div>
            )}
          </div>

          {/* Social icons */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <a
              href="https://github.com/Piyu-cyber"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border border-card-border hover:border-slate-700 rounded bg-[#0B0C0E] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-text-muted" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border border-card-border hover:border-slate-700 rounded bg-[#0B0C0E] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-accent-blue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-text-muted" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
