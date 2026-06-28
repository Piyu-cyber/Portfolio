"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download, ExternalLink, Award } from "lucide-react";

interface DocumentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  docType: "resume" | "paper" | null;
}

export default function DocumentPreview({ isOpen, onClose, docType }: DocumentPreviewProps) {
  if (!docType) return null;

  const isResume = docType === "resume";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm"
          />

          {/* Slide-over Glass Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg z-50 glass-hud shadow-2xl p-6 sm:p-8 flex flex-col justify-between font-mono"
            style={{
              background: "rgba(255, 255, 255, 0.75)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "-10px 0 30px rgba(15, 23, 42, 0.1)"
            }}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent-blue" />
                  <span className="font-bold text-slate-900 text-sm">
                    {isResume ? "RESUME_PREVIEW" : "ACL_PAPER_METRICS"}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-slate-200/50 text-slate-700 hover:text-slate-950 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Document Abstract Content */}
              <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 text-slate-800 text-xs leading-relaxed">
                {isResume ? (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1 border-l-2 border-accent-blue pl-2">
                        Piyush Prashant
                      </h4>
                      <p className="text-slate-600 font-sans">
                        B.Tech in Data Science & AI @ IIIT Dharwad (Expected May 2028). CGPA 9.1/10.0.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">Core proficiencies</h5>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        <li>Low-Latency ML: C++, PyTorch, ONNX Runtime, CUDA drivers</li>
                        <li>Data & Retrieval: pgvector semantic caching, ChromaDB</li>
                        <li>Router Engineering: XGBoost queries routing, multi-model pipelines</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">Featured Experience</h5>
                      <div className="space-y-2 font-sans text-slate-600">
                        <div>
                          <strong className="text-slate-800 text-[11px] font-mono">DeepLOB-HFT Inference Engine</strong>
                          <p>Accelerated high-frequency limit order book model outputs to 2.78ms using C++ ONNX Runtime integration.</p>
                        </div>
                        <div>
                          <strong className="text-slate-800 text-[11px] font-mono">DataChat NL-to-SQL Caching</strong>
                          <p>Built semantic caches using pgvector, resulting in 60% API cost reductions and sub-10ms response latencies.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="p-3 bg-accent-purple/5 border border-accent-purple/20 rounded">
                      <div className="flex items-center gap-1.5 text-accent-purple text-[10px] font-bold mb-1 uppercase">
                        <Award className="w-3.5 h-3.5" /> ACL SemEval-2026 Publication
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                        Semantic Vectors and Ensemble Models for Multilingual Word Span Classification
                      </h4>
                      <p className="text-slate-600 font-sans text-[11px]">
                        Accepted paper at ACL SemEval-2026 Task 9. Introduces low-level dual-encoder architectures for token classification.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 mb-1 border-l-2 border-accent-purple pl-2">
                        Abstract & Approach
                      </h5>
                      <p className="text-slate-700 font-sans leading-relaxed">
                        Our work presents an optimized framework combining deep semantic vector representations (mDeBERTa-v3) with low-overhead gradient boosted stacking classifiers. We designed a dual-encoder retrieval fusion module to process context anchors across 22 languages, mitigating semantic drift in low-resource setups.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">Key Metrics</h5>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                        <div className="bg-slate-100 p-2.5 rounded border border-slate-200/50">
                          <div className="text-slate-500 uppercase">F1 Accuracy</div>
                          <div className="text-lg font-bold text-accent-purple">+26.3%</div>
                        </div>
                        <div className="bg-slate-100 p-2.5 rounded border border-slate-200/50">
                          <div className="text-slate-500">Multilingual</div>
                          <div className="text-lg font-bold text-slate-800">22 Langs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-200/50 pt-4 flex items-center gap-3">
              <a
                href={isResume ? "/Piyush_Prashant_Resume_Final.docx" : "/Semantic_Vectors_SemEval_2026.pdf"}
                download
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded bg-accent-blue text-white font-bold text-xs hover:bg-accent-blue/90 transition-colors keep-white"
              >
                <Download className="w-4 h-4 text-white keep-white" />
                <span>DOWNLOAD_{isResume ? "DOCX" : "PDF"}</span>
              </a>
              <a
                href={isResume ? "/Piyush_Prashant_Resume_Final.docx" : "/Semantic_Vectors_SemEval_2026.pdf"}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded border border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
