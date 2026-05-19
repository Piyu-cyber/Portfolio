"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ShieldAlert, BarChart2, Activity, Globe, DollarSign, Zap } from "lucide-react";

interface MetricItem {
  id: string;
  metric: string;
  label: string;
  colorClass: string;
  icon: React.ReactNode;
  problem: string;
  scale: string;
  value: string;
  stack: string[];
}

export default function RecruiterSnapshot() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [metricOffset, setMetricOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetricOffset((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const metrics: MetricItem[] = [
    {
      id: "m1",
      metric: "4.5M+",
      label: "Market Data Snapshots Processed",
      colorClass: "border-accent-blue text-accent-blue bg-accent-blue/5",
      icon: <BarChart2 className="w-5 h-5 text-accent-blue" />,
      problem: "Training high-capacity deep learning models (DeepLOB & TransformerLOB) on raw LOB (Limit Order Book) snapshots without memory leakage or sliding window performance bottlenecks.",
      scale: "4.5 Million snapshots (FI-2010 benchmark dataset), processing 100 levels of order book bids/asks across 5 prediction horizons.",
      value: "Enabled high-accuracy mid-price movement forecasts under sub-millisecond conditions for high-frequency trading simulations.",
      stack: ["PyTorch", "NumPy", "C++", "Sliding-Window Cache"],
    },
    {
      id: "m2",
      metric: "22",
      label: "Languages Evaluated & Classified",
      colorClass: "border-accent-purple text-accent-purple bg-accent-purple/5",
      icon: <Globe className="w-5 h-5 text-accent-purple" />,
      problem: "Detecting content polarization and framing anomalies across highly diverse low-resource and high-resource languages without training separate models per language.",
      scale: "22 distinct language datasets evaluated using a single unified model ensemble under the ACL SemEval-2026 Task 9 framework.",
      value: "Achieved a macro-F1 of 0.797, outperforming baseline models by +33.6 percentage points and zero-shot Llama-3-8B-Instruct by +26.3 percentage points.",
      stack: ["mDeBERTa-v3", "XLM-RoBERTa", "4-bit QLoRA", "XGBoost Stacking"],
    },
    {
      id: "m3",
      metric: "97.3%",
      label: "F1 Score in Intelligent Query Routing",
      colorClass: "border-accent-green text-accent-green bg-accent-green/5",
      icon: <ShieldAlert className="w-5 h-5 text-accent-green" />,
      problem: "Eliminating manual query routing and reducing database execution bottlenecks for domain-specific language (DSL) queries requiring relational SQL or Neo4j Graph queries.",
      scale: "Evaluated on a 10,000+ query hybrid workload, classifying query targets dynamically in real-time.",
      value: "Automated routing decisions with an F1 score of 97.3% and incorporated SHAP-based feature weight explainability, cutting manual analysis by 40%.",
      stack: ["XGBoost", "Logistic Regression", "SHAP", "Scikit-Learn"],
    },
    {
      id: "m4",
      metric: "84.3%",
      label: "HFT Mid-Price Prediction Accuracy",
      colorClass: "border-accent-cyan text-accent-cyan bg-accent-cyan/5",
      icon: <Activity className="w-5 h-5 text-accent-cyan" />,
      problem: "Predicting micro-structural price directions from highly volatile, noisy limit order book tick-level streams in real-time trading.",
      scale: "High-frequency limit order book order matching, tested across 5 sequential future time horizons.",
      value: "Achieved state-of-the-art mid-price accuracy of 84.3%, enabling simulated trading strategies to outperform standard random-walk baselines.",
      stack: ["TransformerLOB", "CNN-DeepLOB", "ONNX Runtime", "CUDA Acceleration"],
    },
    {
      id: "m5",
      metric: "60%",
      label: "Inference API Cost Reduction",
      colorClass: "border-accent-green text-accent-green bg-accent-green/5",
      icon: <DollarSign className="w-5 h-5 text-accent-green" />,
      problem: "High token consumption and API cost overhead from redundant natural language questions asked by business users to NL-to-SQL analytics schemas.",
      scale: "Tested against 50k rows CSV file uploads and 10+ relational database schemas under multi-user concurrency.",
      value: "Saved ~60% in LLM API fees and dropped average query response times from 4s to 1.5s via a vector-based semantic cache.",
      stack: ["Supabase", "pgvector", "nomic-embed-text", "Groq API"],
    },
    {
      id: "m6",
      metric: "1.75x",
      label: "C++ Inference Speedup",
      colorClass: "border-accent-blue text-accent-blue bg-accent-blue/5",
      icon: <Zap className="w-5 h-5 text-accent-blue" />,
      problem: "Python interpreter overhead and execution latency delays in deep learning model inference (exceeding maximum time-budgets for high frequency execution).",
      scale: "C++ inference deployment running sliding window feeds of 500k+ sequence sets.",
      value: "Decreased inference time per step to 2.78ms (representing a 1.75x speedup), establishing production-grade deployment capabilities.",
      stack: ["ONNX Runtime C++", "CMake", "LibTorch", "Memory Caching"],
    },
  ];

  return (
    <section id="snapshot" className="py-20 border-b border-card-border relative">
      {/* Subtle background glow grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.03),rgba(0,0,0,0))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-green"></span>
            <span className="font-mono text-xs text-accent-green tracking-widest uppercase">
              Recruiter Snapshot
            </span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
            What recruiters usually look for
          </h2>
          <p className="mt-2 text-sm text-text-muted font-mono max-w-3xl">
            Metrics that prove production execution, low-latency infrastructure design, and mathematical foundation. Hover or click cards to view engineering implementation details.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((item) => {
            const isActive = activeCard === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => setActiveCard(isActive ? null : item.id)}
                className={`relative rounded-lg bg-[#12141C] border transition-all duration-300 cursor-pointer overflow-hidden p-6 flex flex-col justify-between ${
                  isActive
                    ? "border-slate-500 shadow-xl shadow-slate-950/50 scale-[1.01]"
                    : "border-card-border hover:border-slate-800"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded border ${item.colorClass}`}>
                    {item.icon}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-text-muted transition-transform duration-300 ${
                      isActive ? "rotate-90 text-white" : ""
                    }`}
                  />
                </div>

                {/* Big Metric Display */}
                <div className="mb-2 flex items-baseline justify-between">
                  <div>
                    <div className="text-4xl font-mono font-extrabold text-white tracking-tight min-w-[130px]">
                      {item.id === "m1" ? (4582104 + (metricOffset % 40) * 17).toLocaleString() + "+" :
                       item.id === "m4" ? (84.32 + (metricOffset % 7) * 0.01).toFixed(2) + "%" :
                       item.id === "m6" ? (1.75 + (metricOffset % 5) * 0.002).toFixed(3) + "x" :
                       item.id === "m3" ? (97.31 + (metricOffset % 4) * 0.01).toFixed(2) + "%" :
                       item.metric}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-300 mt-1 line-clamp-1">
                      {item.label}
                    </div>
                  </div>
                  
                  {/* Live telemetry sparkline */}
                  <div className="w-16 h-8 text-text-muted/40 shrink-0 pointer-events-none self-end pb-1 overflow-hidden relative">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path
                        d={
                          item.id === "m1" ? `M0 35 L20 32 L40 ${38 - (metricOffset % 10)} L60 20 L80 18 L100 ${10 + (metricOffset % 8)}` :
                          item.id === "m2" ? "M0 25 L15 25 L30 20 L45 35 L60 10 L75 28 L90 12 L100 15" :
                          item.id === "m3" ? "M0 38 L20 30 L40 25 L60 22 L80 10 L100 8" :
                          item.id === "m4" ? `M0 20 L20 ${10 + (metricOffset % 12)} L40 5 L60 15 L80 8 L100 ${12 + (metricOffset % 6)}` :
                          item.id === "m5" ? "M0 38 L20 32 L40 20 L60 12 L80 15 L100 5" :
                          `M0 28 L20 15 L40 ${22 - (metricOffset % 8)} L60 8 L80 18 L100 ${2 + (metricOffset % 4)}`
                        }
                        stroke={
                          item.id === "m1" || item.id === "m6" ? "#3B82F6" :
                          item.id === "m2" ? "#A855F7" :
                          item.id === "m3" || item.id === "m5" ? "#10B981" :
                          "#06B6D4"
                        }
                        strokeWidth="1.5"
                        fill="none"
                        className="opacity-50"
                      />
                    </svg>
                    <span className="absolute right-0 top-0 w-1.5 h-1.5 rounded-full bg-accent-green animate-ping"></span>
                  </div>
                </div>

                {/* Collapsible Info Block */}
                <div
                  className={`mt-4 pt-4 border-t border-card-border/50 text-[11px] font-mono leading-relaxed space-y-3 transition-all duration-300 origin-top ${
                    isActive ? "opacity-100 max-h-96" : "opacity-0 max-h-0 pointer-events-none overflow-hidden"
                  }`}
                >
                  <div>
                    <span className="text-accent-cyan font-bold block mb-0.5">{"// Problem Solved:"}</span>
                    <span className="text-slate-400">{item.problem}</span>
                  </div>
                  <div>
                    <span className="text-accent-purple font-bold block mb-0.5">{"// Scale Check:"}</span>
                    <span className="text-slate-400">{item.scale}</span>
                  </div>
                  <div>
                    <span className="text-accent-green font-bold block mb-0.5">{"// Business Value:"}</span>
                    <span className="text-slate-400">{item.value}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-text-muted text-[10px]">STACK:</span>
                    {item.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-card-border/80 border border-slate-700 text-white text-[9px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
