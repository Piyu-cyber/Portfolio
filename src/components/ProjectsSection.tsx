"use client";

import React, { useState, useEffect } from "react";
import { Database, Cpu, Zap, BarChart, Upload, CheckCircle2, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const DATACHAT_CODE = `// pgvector semantic cache query execution in Python
import psycopg2
from sentence_transformers import SentenceTransformer

def query_semantic_cache(user_query, threshold=0.88):
    # 1. Generate query embedding vector
    model = SentenceTransformer('nomic-ai/nomic-embed-text-v1')
    query_vector = model.encode(user_query).tolist()
    
    # 2. Query pgvector database for similarity matching
    conn = psycopg2.connect("postgresql://piyush:***@db.supabase.co:5432/postgres")
    with conn.cursor() as cur:
        cur.execute("""
            SELECT cached_sql, cached_response, 
                   1 - (embedding <=> %s::vector) AS similarity
            FROM query_cache
            WHERE 1 - (embedding <=> %s::vector) > %s
            ORDER BY similarity DESC LIMIT 1;
        """, (query_vector, query_vector, threshold))
        
        result = cur.fetchone()
        if result:
            return {"sql": result[0], "response": result[1], "hit": True}
    return {"hit": False}`;

const DEEPLOB_CODE = `// DeepLOB C++ Inference Execution Engine
#include <onnxruntime_cxx_api.h>
#include <iostream>
#include <vector>

void RunDeepLOBInference(const std::vector<float>& order_book_tensor) {
    // 1. Initialize environment & session options
    Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "DeepLOBSession");
    Ort::SessionOptions session_options;
    
    // Enable NVIDIA CUDA execution provider for low-latency GPU speedup
    Ort::ThrowOnError(OrtSessionOptionsAppendExecutionProvider_CUDA(session_options, 0));
    
    // 2. Load the compiled ONNX model
    Ort::Session session(env, L"models/transformerlob.onnx", session_options);
    
    // 3. Define inputs (Batch Size: 1, Sequence Length: 100, Features: 40)
    std::vector<int64_t> input_shape = {1, 100, 40};
    auto memory_info = Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU);
    Ort::Value input_tensor = Ort::Value::CreateTensor<float>(
        memory_info, const_cast<float*>(order_book_tensor.data()), 
        order_book_tensor.size(), input_shape.data(), input_shape.size()
    );
    
    // 4. Run model inference synchronously
    const char* input_names[] = {"input_lob"};
    const char* output_names[] = {"predict_midprice"};
    auto output_tensors = session.Run(Ort::RunOptions{nullptr}, 
        input_names, &input_tensor, 1, output_names, 1
    );
    
    float* float_arr = output_tensors.front().GetTensorMutableData<float>();
    std::cout << "Mid-price movement prediction class: " << float_arr[0] << std::endl;
}`;

const HIFUN_CODE = `// XGBoost query routing classifier with SHAP explainability
import xgboost as xgb
import shap
import re

def extract_features(query_string):
    # Extract light, regex-free lexical tokens for fast inference vectorization
    tokens = {
        "select": 1 if re.search(r'\\\\bselect\\\\b', query_string, re.I) else 0,
        "match": 1 if re.search(r'\\\\bmatch\\\\b', query_string, re.I) else 0,
        "join": 1 if re.search(r'\\\\bjoin\\\\b', query_string, re.I) else 0,
        "friend": 1 if re.search(r'\\\\bfriend\\\\b', query_string, re.I) else 0,
        "where": 1 if re.search(r'\\\\bwhere\\\\b', query_string, re.I) else 0
    }
    return list(tokens.values())

def route_query_xgb(query_string, model_path="models/xgb_router.model"):
    features = [extract_features(query_string)]
    bst = xgb.Booster()
    bst.load_model(model_path)
    
    dtest = xgb.DMatrix(features)
    preds = bst.predict(dtest) # Predict routing probabilities
    
    # Compute SHAP weights on feature vectors for system transparency
    explainer = shap.TreeExplainer(bst)
    shap_values = explainer.shap_values(dtest)
    
    backend = "Neo4j Graph" if preds[0] > 0.5 else "PostgreSQL SQL"
    return {"backend": backend, "confidence": max(preds[0], 1 - preds[0]), "shap": shap_values}`;

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState("datachat");
  const [peekCode, setPeekCode] = useState<string | null>(null);
  const [peekTitle, setPeekTitle] = useState("");

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

  // Listen for Escape key to close code peek modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPeekCode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-20 border-b border-card-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
            <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">
              Production Systems
            </span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
            Technical Architecture & Case Studies
          </h2>
          <p className="mt-2 text-sm text-text-muted font-mono max-w-3xl">
            Auditable, live-simulated code bases showing low-latency design, database tuning, and classification logic.
          </p>
        </div>

        {/* Tab selection grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <button
            onClick={() => setActiveProject("datachat")}
            className={`py-3 px-4 rounded border font-mono text-xs sm:text-sm font-bold transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeProject === "datachat"
                ? "border-accent-green bg-accent-green/5 text-white"
                : "border-card-border bg-[#12141C]/50 text-text-muted hover:border-slate-800"
            }`}
          >
            <Database className="w-4 h-4 shrink-0" />
            <span>DataChat (RAG)</span>
          </button>
          <button
            onClick={() => setActiveProject("deeplob")}
            className={`py-3 px-4 rounded border font-mono text-xs sm:text-sm font-bold transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeProject === "deeplob"
                ? "border-accent-blue bg-accent-blue/5 text-white"
                : "border-card-border bg-[#12141C]/50 text-text-muted hover:border-slate-800"
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>DeepLOB (C++)</span>
          </button>
          <button
            onClick={() => setActiveProject("hifun")}
            className={`py-3 px-4 rounded border font-mono text-xs sm:text-sm font-bold transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeProject === "hifun"
                ? "border-accent-purple bg-accent-purple/5 text-white"
                : "border-card-border bg-[#12141C]/50 text-text-muted hover:border-slate-800"
            }`}
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span>HIFUN Router</span>
          </button>
        </div>

        {/* Main interactive panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: project details (7 cols) */}
          <div className="lg:col-span-7 bg-[#12141C]/80 border border-card-border rounded-lg p-6 sm:p-8 flex flex-col justify-between min-h-[400px]">
            {activeProject === "datachat" && (
              <>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                      <Database className="w-5 h-5 text-accent-green" />
                      DataChat: RAG-based NL-to-SQL Engine
                    </h3>
                    <p className="mt-1 text-xs font-mono text-accent-green">
                      Stack: Next.js 14, Supabase (pgvector), Groq LLM, Ollama (nomic-embed-text), Recharts
                    </p>
                    <a
                      href="https://github.com/DataScience-ArtificialIntelligence/DataChat_NL--SQL-using-RAG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 text-[10px] font-mono text-accent-green border border-accent-green/30 bg-accent-green/5 hover:bg-accent-green/10 rounded transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      <span>VIEW CODE ON GITHUB</span>
                    </a>
                    <button
                      onClick={() => {
                        setPeekCode(DATACHAT_CODE);
                        setPeekTitle("DataChat: pgvector Semantic Cache (Python)");
                      }}
                      className="inline-flex items-center gap-1.5 mt-2.5 ml-2 px-2.5 py-1 text-[10px] font-mono text-accent-green border border-accent-green/30 bg-accent-green/5 hover:bg-accent-green/10 rounded transition-colors"
                    >
                      <span>CODE PEEK</span>
                    </button>
                  </div>

                  <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                    <div className="p-3 rounded border border-card-border bg-[#12141C]">
                      <p className="text-[11px] text-slate-400">
                        <strong className="text-accent-green">Problem:</strong> Standard RAG queries suffer from high LLM token costs and execution latencies (4s+). <strong className="text-white">Solution:</strong> Implemented pgvector schema matching and similarity-based query semantic caching to solve this bottleneck.
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
                      <h4 className="text-white font-bold mb-1">&gt; Engineering Challenges:</h4>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-400 text-[11px]">
                        <li>
                          <strong className="text-white">Cache Tuning:</strong> Built Cosine-similarity threshold controls in Supabase pgvector to eliminate hallucinated hits.
                        </li>
                        <li>
                          <strong className="text-white">Sub-500ms SQL Compile:</strong> Pre-embedded database schema layouts to minimize Llama-3 context sizes.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeProject === "deeplob" && (
              <>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-accent-blue" />
                      DeepLOB-HFT-Cpp: Low-Latency Inference
                    </h3>
                    <p className="mt-1 text-xs font-mono text-accent-blue">
                      Stack: PyTorch, ONNX Runtime C++, NumPy, Scikit-learn, CMake
                    </p>
                    <a
                      href="https://github.com/Piyu-cyber/DeepLOB-HFT-Cpp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 text-[10px] font-mono text-accent-blue border border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/10 rounded transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      <span>VIEW CODE ON GITHUB</span>
                    </a>
                    <button
                      onClick={() => {
                        setPeekCode(DEEPLOB_CODE);
                        setPeekTitle("DeepLOB: C++ Limit Order Book Inference Engine");
                      }}
                      className="inline-flex items-center gap-1.5 mt-2.5 ml-2 px-2.5 py-1 text-[10px] font-mono text-accent-blue border border-accent-blue/30 bg-accent-blue/5 hover:bg-accent-blue/10 rounded transition-colors"
                    >
                      <span>CODE PEEK</span>
                    </button>
                  </div>

                  <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                    <div className="p-3 rounded border border-card-border bg-[#12141C]">
                      <p className="text-[11px] text-slate-400">
                        <strong className="text-accent-blue">Problem:</strong> Python DL model inference carries high GIL & runtime latency overheads, making it unsuitable for HFT. <strong className="text-white">Solution:</strong> Compiled model graphs to C++ via ONNX Runtime to execute on GPU.
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
                      <h4 className="text-white font-bold mb-1">&gt; Engineering Challenges:</h4>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-400 text-[11px]">
                        <li>
                          <strong className="text-white">Zero-Leak Preprocessing:</strong> Engineered sliding window sequence slicing across 40 features with zero lookahead leak.
                        </li>
                        <li>
                          <strong className="text-white">GPU Memory Mapping:</strong> Integrated optimized CPU/GPU buffer exchanges using C++ templates.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeProject === "hifun" && (
              <>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-accent-purple" />
                      HIFUN Router: Hybrid Query Router System
                    </h3>
                    <p className="mt-1 text-xs font-mono text-accent-purple">
                      Stack: XGBoost, Logistic Regression, SHAP, Scikit-learn, Python
                    </p>
                    <a
                      href="https://github.com/DataScience-ArtificialIntelligence/Hybrid-SQL-Graph-Query-Routing-System"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 text-[10px] font-mono text-accent-purple border border-accent-purple/30 bg-accent-purple/5 hover:bg-accent-purple/10 rounded transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      <span>VIEW CODE ON GITHUB</span>
                    </a>
                    <button
                      onClick={() => {
                        setPeekCode(HIFUN_CODE);
                        setPeekTitle("HIFUN: Query Router Classifier (Python)");
                      }}
                      className="inline-flex items-center gap-1.5 mt-2.5 ml-2 px-2.5 py-1 text-[10px] font-mono text-accent-purple border border-accent-purple/30 bg-accent-purple/5 hover:bg-accent-purple/10 rounded transition-colors"
                    >
                      <span>CODE PEEK</span>
                    </button>
                  </div>

                  <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                    <div className="p-3 rounded border border-card-border bg-[#12141C]">
                      <p className="text-[11px] text-slate-400">
                        <strong className="text-accent-purple">Problem:</strong> Hybrid database setups combining relational SQL & Graph backends lack unified routing, requiring manual queries. <strong className="text-white">Solution:</strong> Designed a fast XGBoost query router to automatically classify & route requests.
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
                      <h4 className="text-white font-bold mb-1">&gt; Engineering Challenges:</h4>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-400 text-[11px]">
                        <li>
                          <strong className="text-white">Lexical Tokenizer:</strong> Implemented lightweight query string NLP feature mappings to keep training vectors compact and fast.
                        </li>
                        <li>
                          <strong className="text-white">Explainability:</strong> Integrated SHAP calculations in system dashboards for real-time model auditing.
                        </li>
                      </ul>
                    </div>
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

      {/* Code Peek Modal Overlay */}
      {peekCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all">
          <div className="bg-[#12141C] border border-slate-700 rounded-lg shadow-2xl max-w-3xl w-full flex flex-col max-h-[85vh] overflow-hidden font-mono">
            {/* Header */}
            <div className="bg-[#0B0C0E] border-b border-card-border px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green"></span>
                {peekTitle}
              </span>
              <button
                onClick={() => setPeekCode(null)}
                className="text-xs text-text-muted hover:text-white px-2 py-1 rounded bg-[#12141C] border border-card-border"
              >
                CLOSE
              </button>
            </div>
            
            {/* Code Content */}
            <div className="p-4 overflow-y-auto bg-[#0B0C0E]/50 text-slate-300 text-[11px] leading-relaxed scrollbar-thin select-text">
              <pre className="whitespace-pre-wrap">{peekCode}</pre>
            </div>

            {/* Footer */}
            <div className="bg-[#0B0C0E] border-t border-card-border px-4 py-2 flex items-center justify-between text-[9px] text-text-muted select-none">
              <span>Interactive Telemetry Terminal Auditing Mode</span>
              <span>ESC to exit</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
