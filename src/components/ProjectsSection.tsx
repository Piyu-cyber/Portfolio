"use client";

import React, { useState, useEffect } from "react";
import { Database, Cpu, Zap, BarChart, Upload, CheckCircle2, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState("datachat");

  // Project 1: DataChat states
  const [datachatStep, setDatachatStep] = useState(0);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [csvFileName, setCsvFileName] = useState("");

  // Project 2: HFT Order Book states
  const [orderBook, setOrderBook] = useState<{ price: number; size: number; side: "bid" | "ask" }[]>([]);

  // Project 3: HIFUN Router states
  const [selectedRouterQuery, setSelectedRouterQuery] = useState(0);
  const [routingResult, setRoutingResult] = useState<{ backend: string; confidence: number; shap: { feature: string; val: number }[] } | null>(null);

  // Generate order book simulation
  useEffect(() => {
    const generateLOB = () => {
      const mid = 150.0;
      const bids = Array.from({ length: 5 }, (_, i) => ({
        price: Number((mid - (i + 1) * 0.05).toFixed(2)),
        size: Math.floor(Math.random() * 500) + 50,
        side: "bid" as const,
      }));
      const asks = Array.from({ length: 5 }, (_, i) => ({
        price: Number((mid + (i + 1) * 0.05).toFixed(2)),
        size: Math.floor(Math.random() * 500) + 50,
        side: "ask" as const,
      })).reverse();
      setOrderBook([...asks, ...bids]);
    };
    generateLOB();
    const interval = setInterval(generateLOB, 1500);
    return () => clearInterval(interval);
  }, []);

  // Project 1: Run RAG visual steps
  useEffect(() => {
    if (activeProject !== "datachat") return;
    const interval = setInterval(() => {
      setDatachatStep((prev) => (prev + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, [activeProject]);

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFileName(file.name);
      setCsvUploaded(true);
    }
  };

  // HFT data charts
  const latencyData = [
    { name: "Python PyTorch", Latency: 4.86, fill: "#94A3B8" },
    { name: "C++ ONNX Runtime", Latency: 2.78, fill: "#3B82F6" },
  ];

  // Router queries database
  const routerQueries = [
    {
      query: "SELECT first_name, last_name FROM employees WHERE department_id = 4;",
      backend: "PostgreSQL (SQL Relational)",
      confidence: 99.4,
      shap: [
        { feature: "SELECT", val: 0.45 },
        { feature: "WHERE", val: 0.32 },
        { feature: "FROM", val: 0.21 },
        { feature: "MATCH", val: -0.15 },
        { feature: "MATCH_REL", val: -0.12 },
      ],
    },
    {
      query: "MATCH (p:Person)-[:FRIEND]->(f:Person) WHERE p.age > 30 RETURN p.name, f.name",
      backend: "Neo4j (Graph Database)",
      confidence: 98.8,
      shap: [
        { feature: "MATCH", val: 0.48 },
        { feature: "FRIEND", val: 0.38 },
        { feature: "[:]", val: 0.25 },
        { feature: "SELECT", val: -0.18 },
        { feature: "JOIN", val: -0.14 },
      ],
    },
    {
      query: "SELECT p.name, c.company_name FROM persons p JOIN companies c ON p.company_id = c.id",
      backend: "PostgreSQL (SQL Relational)",
      confidence: 97.6,
      shap: [
        { feature: "SELECT", val: 0.42 },
        { feature: "JOIN", val: 0.39 },
        { feature: "ON", val: 0.24 },
        { feature: "MATCH", val: -0.17 },
        { feature: "[:]", val: -0.11 },
      ],
    },
  ];

  const handleTestRouter = (idx: number) => {
    setSelectedRouterQuery(idx);
    setRoutingResult(null);
    setTimeout(() => {
      setRoutingResult({
        backend: routerQueries[idx].backend,
        confidence: routerQueries[idx].confidence,
        shap: routerQueries[idx].shap,
      });
    }, 600);
  };

  return (
    <section id="projects" className="py-20 border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
            <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">
              Case Studies
            </span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
            Production-Grade Case Studies
          </h2>
          <p className="mt-2 text-sm text-text-muted font-mono max-w-3xl">
            Detailed internal engineering reports outlining performance improvements, design bottlenecks, scale metrics, and production architecture.
          </p>
        </div>

        {/* Project Selector tabs */}
        <div className="flex border-b border-card-border mb-8 overflow-x-auto select-none">
          <button
            onClick={() => setActiveProject("datachat")}
            className={`px-5 py-3 font-mono text-xs border-b-2 transition-all shrink-0 ${
              activeProject === "datachat"
                ? "border-accent-green text-accent-green bg-accent-green/5"
                : "border-transparent text-text-muted hover:text-white"
            }`}
          >
            [01] DataChat (NL-to-SQL)
          </button>
          <button
            onClick={() => setActiveProject("deeplob")}
            className={`px-5 py-3 font-mono text-xs border-b-2 transition-all shrink-0 ${
              activeProject === "deeplob"
                ? "border-accent-blue text-accent-blue bg-accent-blue/5"
                : "border-transparent text-text-muted hover:text-white"
            }`}
          >
            [02] DeepLOB-HFT (C++ Inference)
          </button>
          <button
            onClick={() => setActiveProject("hifun")}
            className={`px-5 py-3 font-mono text-xs border-b-2 transition-all shrink-0 ${
              activeProject === "hifun"
                ? "border-accent-purple text-accent-purple bg-accent-purple/5"
                : "border-transparent text-text-muted hover:text-white"
            }`}
          >
            [03] HIFUN Router (Intelligent Route)
          </button>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {activeProject === "datachat" && (
              <>
                <div>
                  <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-accent-green" />
                    DataChat: RAG-based NL-to-SQL Engine
                  </h3>
                  <p className="mt-1 text-xs font-mono text-accent-green">
                    Stack: Next.js 14, Supabase (pgvector), Groq LLM, Ollama (nomic-embed-text), Recharts
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                  <div className="p-4 rounded border border-card-border bg-[#12141C]">
                    <span className="text-accent-green font-bold">{"// Why This Matters:"}</span>
                    <p className="mt-1 text-slate-400">
                      Standard natural language database queries consume significant API token fees and suffer from high execution latencies (typically 4s+ per LLM query). DataChat solves this by introducing pgvector schema matching + an intelligent semantic cache.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">90%+</div>
                      <div className="text-[10px] text-text-muted">Query Accuracy</div>
                    </div>
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">~60%</div>
                      <div className="text-[10px] text-text-muted">API Call Reduction</div>
                    </div>
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">1.5s</div>
                      <div className="text-[10px] text-text-muted">Response Latency</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-2">&gt; Engineering Challenges:</h4>
                    <ul className="list-disc pl-4 space-y-2 text-slate-400 text-[11px]">
                      <li>
                        <strong className="text-white">Semantic Cache Tuning:</strong> Developed Cosine-distance threshold parameters in Supabase pgvector to balance cache-hit accuracy against hallucinated answers.
                      </li>
                      <li>
                        <strong className="text-white">High-Speed Context Generation:</strong> Pre-embedded database schemas, utilizing schema layout structure mapping to minimize context lengths passed to Groq Llama-3, achieving sub-500ms SQL generation times.
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeProject === "deeplob" && (
              <>
                <div>
                  <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-accent-blue" />
                    DeepLOB-HFT-Cpp: Low-Latency Inference
                  </h3>
                  <p className="mt-1 text-xs font-mono text-accent-blue">
                    Stack: PyTorch, ONNX Runtime C++, NumPy, Scikit-learn, CMake
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                  <div className="p-4 rounded border border-card-border bg-[#12141C]">
                    <span className="text-accent-blue font-bold">{"// Why This Matters:"}</span>
                    <p className="mt-1 text-slate-400">
                      Python-based deep learning inference contains critical Global Interpreter Lock (GIL) and runtime overheads, rendering models unusable in sub-millisecond trading architectures. Compiling and running model inference directly in C++ via ONNX Runtime resolves this bottleneck.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">4.5M</div>
                      <div className="text-[10px] text-text-muted">Snapshots (FI-2010)</div>
                    </div>
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">84.3%</div>
                      <div className="text-[10px] text-text-muted">Prediction F1</div>
                    </div>
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">1.75x</div>
                      <div className="text-[10px] text-text-muted">Speedup over Python</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-2">&gt; Engineering Challenges:</h4>
                    <ul className="list-disc pl-4 space-y-2 text-slate-400 text-[11px]">
                      <li>
                        <strong className="text-white">Zero-Leak Data Preprocessing:</strong> Engineered sliding window sequence slicing (100 sequential timestamps across 40 features) without overlap leaks.
                      </li>
                      <li>
                        <strong className="text-white">Low-Latency Memory Mapping:</strong> Integrated optimized CPU/GPU buffer exchanges and dynamic tensor shape allocation using standard C++ templates.
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeProject === "hifun" && (
              <>
                <div>
                  <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent-purple" />
                    HIFUN Router: Hybrid Query Router System
                  </h3>
                  <p className="mt-1 text-xs font-mono text-accent-purple">
                    Stack: XGBoost, Logistic Regression, SHAP, Scikit-learn, Python
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                  <div className="p-4 rounded border border-card-border bg-[#12141C]">
                    <span className="text-accent-purple font-bold">{"// Why This Matters:"}</span>
                    <p className="mt-1 text-slate-400">
                      Hybrid architectures combining relational tables with complex graph databases (e.g. Neo4j) lack automatic query translation interfaces. HIFUN utilizes high-speed ML routers to parse DSL input and execute queries on the optimal backend automatically.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">97.3%</div>
                      <div className="text-[10px] text-text-muted">Routing F1 Score</div>
                    </div>
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">~40%</div>
                      <div className="text-[10px] text-text-muted">Review Time Saved</div>
                    </div>
                    <div className="border border-card-border bg-[#12141C] p-3 rounded">
                      <div className="text-lg font-bold text-white">10k+</div>
                      <div className="text-[10px] text-text-muted">Benchmark workload</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-2">&gt; Engineering Challenges:</h4>
                    <ul className="list-disc pl-4 space-y-2 text-slate-400 text-[11px]">
                      <li>
                        <strong className="text-white">Lexical Feature Extraction:</strong> Implemented light, regex-free NLP feature tokens in query strings to build highly compact tabular dataset training vectors.
                      </li>
                      <li>
                        <strong className="text-white">SHAP-based Transparency:</strong> Embedded SHAP values directly inside query outputs to give systems managers real-time insights into model routing logic.
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right panel: visuals/interactive widgets (5 cols) */}
          <div className="lg:col-span-5 bg-[#12141C] border border-card-border rounded-lg p-5 min-h-[350px] flex flex-col justify-between font-mono text-xs">
            {activeProject === "datachat" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                {/* Visual RAG Flow */}
                <div>
                  <div className="text-[10px] text-text-muted mb-2 uppercase font-bold">{"// Live RAG Flow State:"}</div>
                  <div className="space-y-2">
                    {[
                      "1. User Query Received",
                      "2. Semantic Cache Check",
                      "3. pgvector Retrieval",
                      "4. Prompt Context Construction",
                      "5. Groq SQL Compilation",
                      "6. Data Output & Table Render",
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded border text-[10px] flex items-center justify-between transition-colors ${
                          datachatStep === idx
                            ? "bg-accent-green/10 border-accent-green text-accent-green"
                            : "bg-[#0B0C0E]/50 border-card-border text-text-muted"
                        }`}
                      >
                        <span>{step}</span>
                        {datachatStep === idx && <span className="text-[8px] animate-pulse font-bold">PROCESSING...</span>}
                        {datachatStep > idx && <span className="text-accent-green text-[9px]">✔</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CSV File Upload Simulator */}
                <div className="border-t border-card-border/60 pt-4">
                  <div className="text-[10px] text-text-muted mb-2 uppercase font-bold">{"// Upload CSV Analytics:"}</div>
                  {!csvUploaded ? (
                    <label className="border border-dashed border-card-border hover:border-accent-green bg-[#0B0C0E]/50 rounded p-4 text-center cursor-pointer flex flex-col items-center gap-1 hover:text-accent-green transition-colors">
                      <Upload className="w-5 h-5 text-text-muted" />
                      <span>Click to upload CSV (Max 50k rows)</span>
                      <span className="text-[9px] text-text-muted">Simulates schema embedding and Recharts auto-generation</span>
                      <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
                    </label>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] bg-accent-green/5 border border-accent-green/20 p-2 rounded text-accent-green">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Uploaded: {csvFileName}</span>
                        </div>
                        <button
                          onClick={() => setCsvUploaded(false)}
                          className="text-[9px] underline hover:text-white"
                        >
                          Clear
                        </button>
                      </div>

                      {/* Display Recharts preview */}
                      <div className="bg-[#0B0C0E] p-2 rounded border border-card-border h-24 flex items-center justify-center text-[10px]">
                        <div className="text-center">
                          <BarChart className="w-4 h-4 text-accent-green mx-auto mb-1 animate-pulse" />
                          <span className="text-[9px] text-slate-300">CSV embedded. Recharts model synthesized successfully.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeProject === "deeplob" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                {/* LOB heatmap simulation */}
                <div>
                  <div className="text-[10px] text-text-muted mb-2 uppercase font-bold">{"// Live limit order book tick-feed:"}</div>
                  <div className="bg-[#0B0C0E] border border-card-border rounded p-2 overflow-hidden font-mono text-[9px] space-y-1">
                    <div className="grid grid-cols-3 text-text-muted border-b border-card-border pb-1">
                      <span>SIDE</span>
                      <span className="text-right">PRICE (USD)</span>
                      <span className="text-right">VOLUME</span>
                    </div>
                    {orderBook.map((row, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-3 font-bold transition-all duration-300 ${
                          row.side === "ask" ? "text-red-400 bg-red-950/5" : "text-emerald-400 bg-emerald-950/5"
                        }`}
                      >
                        <span>{row.side.toUpperCase()}</span>
                        <span className="text-right">{row.price.toFixed(2)}</span>
                        <span className="text-right font-mono">{row.size}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* C++ Latency Graph */}
                <div className="border-t border-card-border/60 pt-4 flex-1 flex flex-col justify-end">
                  <div className="text-[10px] text-text-muted mb-3 uppercase font-bold">{"// Latency Comparison (Lower is Better):"}</div>
                  <div className="h-32 w-full text-[10px] font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartBarChart data={latencyData} layout="vertical" margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                        <XAxis type="number" stroke="#94A3B8" />
                        <YAxis dataKey="name" type="category" stroke="#94A3B8" width={80} />
                        <Tooltip contentStyle={{ background: "#0B0C0E", borderColor: "#1E293B" }} />
                        <Bar dataKey="Latency" fill="#3B82F6" barSize={12} radius={2} />
                      </RechartBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-[9px] text-text-muted text-center mt-1">
                    Inference Delay: Python PyTorch (4.86ms) vs C++ ONNX Runtime (2.78ms)
                  </div>
                </div>
              </div>
            )}

            {activeProject === "hifun" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                {/* Router selector */}
                <div>
                  <div className="text-[10px] text-text-muted mb-2 uppercase font-bold">{"// Choose query to test router:"}</div>
                  <div className="space-y-2">
                    {routerQueries.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTestRouter(idx)}
                        className={`w-full text-left p-2.5 rounded border transition-colors flex items-start gap-2 ${
                          selectedRouterQuery === idx
                            ? "border-accent-purple bg-accent-purple/5 text-white"
                            : "border-card-border bg-[#0B0C0E]/50 text-text-muted hover:border-slate-800"
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="font-mono text-[9px] line-clamp-2 leading-relaxed">
                          {item.query}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Classification output */}
                <div className="border-t border-card-border/60 pt-4 flex-1 flex flex-col justify-end">
                  <div className="text-[10px] text-text-muted mb-2 uppercase font-bold">{"// XGBoost Router Output:"}</div>
                  {routingResult ? (
                    <div className="space-y-3 bg-[#0B0C0E] border border-card-border p-3 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Target Backend:</span>
                        <span className="text-accent-purple font-bold">{routingResult.backend}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-card-border/40 pb-2">
                        <span className="text-[10px] text-slate-400">Router Confidence:</span>
                        <span className="text-white font-bold">{routingResult.confidence}%</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-text-muted block uppercase font-bold">Top SHAP Feature Importances:</span>
                        {routingResult.shap.map((shp, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between text-[9px]">
                            <span className="text-slate-400 font-bold">{shp.feature}</span>
                            <span className={shp.val > 0 ? "text-emerald-400" : "text-red-400"}>
                              {shp.val > 0 ? "+" : ""}
                              {shp.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-28 bg-[#0B0C0E] border border-card-border rounded flex items-center justify-center text-text-muted text-[10px]">
                      <span>Select a query above to run routing inference</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
