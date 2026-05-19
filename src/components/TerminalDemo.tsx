"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Cpu, Terminal as TermIcon, CheckCircle, Database } from "lucide-react";

interface LogEntry {
  type: "info" | "success" | "warning" | "error" | "command";
  text: string;
  timestamp: string;
}

export default function TerminalDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [gpuLoad, setGpuLoad] = useState(42);
  const [vramUsage, setVramUsage] = useState(8.4);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const addLog = React.useCallback((text: string, type: "info" | "success" | "warning" | "error" | "command" = "info") => {
    const now = new Date();
    const ts = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
    setLogs((prev) => [...prev, { text, type, timestamp: ts }]);
  }, []);

  const clearLogs = () => {
    setLogs([]);
    addLog("systemctl restart piyush-inference-engine.service", "command");
    addLog("Initializing local system buffers...", "info");
  };

  // Initial startup logs
  useEffect(() => {
    const startupSequence = [
      { text: "ssh dev@piyush-infra.iiitd.net -p 22", type: "command" as const },
      { text: "Connecting to remote GPU cluster: SUCCESS (Authorized)", type: "success" as const },
      { text: "Initializing CUDA execution environment...", type: "info" as const },
      { text: "Found GPU Device 0: NVIDIA A100-SXM4-40GB (Compute Capability 8.0)", type: "success" as const },
      { text: "CUDA driver version: 12.4 | Runtime version: 12.4 | VRAM: 40960 MB", type: "info" as const },
      { text: "Loading deep learning weight matrices to GPU RAM...", type: "info" as const },
      { text: "Weights Loaded: DeepLOB (ONNX) + mDeBERTa-v3 (HuggingFace) [Total: 14.8 GB]", type: "success" as const },
      { text: "Connecting local vector storage: ChromaDB [Port 8000]... connected", type: "success" as const },
      { text: "Systems verified. Inference pool is active and listening on port 8080.", type: "success" as const },
    ];

    let timer = 0;
    startupSequence.forEach((item, index) => {
      timer += index === 0 ? 0 : 400 + Math.random() * 500;
      setTimeout(() => {
        addLog(item.text, item.type);
      }, timer);
    });

    // Slow metric fluctuation
    const metricInterval = setInterval(() => {
      setGpuLoad((prev) => {
        const change = Math.floor(Math.random() * 15) - 7;
        return Math.max(10, Math.min(98, prev + change));
      });
      setVramUsage((prev) => {
        const change = Number((Math.random() * 0.4 - 0.2).toFixed(2));
        return Math.max(6.2, Math.min(18.5, Number((prev + change).toFixed(2))));
      });
    }, 4000);

    return () => clearInterval(metricInterval);
  }, [addLog]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // RAG Pipeline Simulation
  const simulateRAG = () => {
    if (activeSimulation) return;
    setActiveSimulation("RAG");
    addLog("python src/pipelines/datachat_rag.py --query 'select revenue by quarter'", "command");
    
    setTimeout(() => addLog("Hashing query string for semantic cache lookup...", "info"), 300);
    setTimeout(() => addLog("CACHE MISS: No matching embeddings found within threshold (0.90)", "warning"), 700);
    setTimeout(() => addLog("Generating vector embeddings via nomic-embed-text-v1...", "info"), 1100);
    setTimeout(() => addLog("Embeddings generated in 34ms [Dim: 768]", "success"), 1500);
    setTimeout(() => addLog("Querying pgvector storage in Supabase for table schemas...", "info"), 1900);
    setTimeout(() => addLog("Retrieved 3 schemas matching context (Cosine distance: 0.21, 0.28, 0.35)", "success"), 2300);
    setTimeout(() => addLog("Assembling prompt context and routing to Groq (llama3-70b-8192)...", "info"), 2700);
    setTimeout(() => addLog("Inference completed in 312ms [Tokens: 840 out]", "success"), 3100);
    setTimeout(() => addLog("Generated SQL: SELECT quarter, SUM(revenue) FROM sales GROUP BY quarter ORDER BY quarter;", "success"), 3300);
    setTimeout(() => addLog("Executing SQL against analytics engine... Returned 4 rows.", "info"), 3700);
    setTimeout(() => {
      addLog("RAG response generated successfully. Total duration: 3.82s (Semantic cached runs will take ~1.2s)", "success");
      setActiveSimulation(null);
    }, 4000);
  };

  // HFT Inference Simulation
  const simulateHFT = () => {
    if (activeSimulation) return;
    setActiveSimulation("HFT");
    addLog("bin/deeplob_inference --source market_feed_stream --model models/transformerlob.onnx", "command");
    
    setTimeout(() => addLog("Loading ONNX Runtime Session options...", "info"), 200);
    setTimeout(() => addLog("Enabling CUDA Execution Provider (EP)... OK", "success"), 500);
    setTimeout(() => addLog("Compiled CUDA kernel graphs for TransformerLOB model.", "success"), 900);
    setTimeout(() => addLog("Market feed socket bind to port 9001: OK", "info"), 1300);
    setTimeout(() => addLog("Processing sliding-window. Snapshot buffer: 100 levels (LOB)", "info"), 1700);
    setTimeout(() => addLog("HFT INFERENCE STATS (Average over 10,000 steps):", "info"), 2100);
    setTimeout(() => addLog("  -> CPU inference latency: 4.86 ms", "warning"), 2300);
    setTimeout(() => addLog("  -> C++ ONNX Runtime (CUDA): 2.78 ms (1.75x speedup)", "success"), 2600);
    setTimeout(() => addLog("  -> Mid-price prediction Accuracy: 84.32% (FI-2010 benchmark)", "success"), 2900);
    setTimeout(() => {
      addLog("ONNX pipeline operating inside ultra-low latency criteria.", "success");
      setActiveSimulation(null);
    }, 3200);
  };

  // HIFUN Router Simulation
  const simulateRouter = () => {
    if (activeSimulation) return;
    setActiveSimulation("Router");
    addLog("python src/router/classify.py --query 'MATCH (p:Person)-[:FRIEND]->(f) RETURN p.name, f.name'", "command");
    
    setTimeout(() => addLog("Parsing Domain-Specific Language (DSL) query...", "info"), 200);
    setTimeout(() => addLog("Extracting lexical features: Graph tokens (MATCH, RETURN, FRIEND) detected.", "info"), 500);
    setTimeout(() => addLog("Forwarding queries to XGBoost Routing Stack...", "info"), 800);
    setTimeout(() => addLog("XGBoost prediction: Graph executed backend (Probability: 99.41%)", "success"), 1100);
    setTimeout(() => addLog("SHAP Explainability vector triggered:", "info"), 1400);
    setTimeout(() => addLog("  -> Token 'MATCH' weight: +0.42", "success"), 1600);
    setTimeout(() => addLog("  -> Token 'FRIEND' weight: +0.31", "success"), 1800);
    setTimeout(() => addLog("  -> Token 'Person' weight: +0.18", "success"), 2000);
    setTimeout(() => addLog("Auto-routed query directly to Neo4j database endpoint.", "success"), 2300);
    setTimeout(() => {
      addLog("Routing completed. F1 score benchmark: 97.3%", "success");
      setActiveSimulation(null);
    }, 2600);
  };

  const currentTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    addLog(cmd, "command");
    setCommandInput("");

    const args = cmd.toLowerCase().split(" ");
    const primaryCmd = args[0];

    switch (primaryCmd) {
      case "help":
        addLog("Available commands:", "info");
        addLog("  help       Show this help dialog", "info");
        addLog("  ls         List directory files", "info");
        addLog("  cat <file> Read a file (e.g. 'cat resume')", "info");
        addLog("  run <job>  Run simulation ('datachat', 'deeplob', 'hifun')", "info");
        addLog("  neofetch   Display system & engineering profile info", "info");
        addLog("  clear      Clear terminal screen", "info");
        break;
      case "clear":
        setLogs([]);
        break;
      case "ls":
        addLog("total 5", "info");
        addLog("-rw-r--r--  1 piyush  staff   511K May 20 01:50 269_Paper.pdf", "info");
        addLog("-rw-r--r--  1 piyush  staff   1.1M May 20 01:30 Piyush_Prashant_Resume_Final.docx", "info");
        addLog("drwxr-xr-x  4 piyush  staff   128B May 20 01:35 hft_engine/", "info");
        addLog("drwxr-xr-x  8 piyush  staff   256B May 20 01:35 rag_cache/", "info");
        addLog("drwxr-xr-x  6 piyush  staff   192B May 20 01:35 src/", "info");
        break;
      case "cat":
        if (args[1] === "resume") {
          addLog("==================================================", "info");
          addLog("PIYUSH PRASHANT // SYSTEMS & AI INFRASTRUCTURE ENG", "info");
          addLog("--------------------------------------------------", "info");
          addLog("Education: B.Tech Data Science & AI @ IIIT Dharwad", "info");
          addLog("Publications: ACL SemEval-2026 Author (Polarization)", "info");
          addLog("Core focus: Low-latency C++, CUDA, RAG, pgvector", "info");
          addLog("Email: prashantpiyush35@gmail.com", "info");
          addLog("Phone: +91 8210326084", "info");
          addLog("==================================================", "info");
        } else if (args[1] === "paper" || args[1] === "269_paper.pdf") {
          addLog("File is a PDF binary format. Use \"DOWNLOAD PAPER (PDF)\" in the Research Lab section below.", "warning");
        } else if (args[1] === "resume.docx" || args[1] === "piyush_prashant_resume_final.docx") {
          addLog("File is a Word binary format. Use the download buttons above.", "warning");
        } else {
          addLog("usage: cat <file> (e.g. 'cat resume')", "warning");
        }
        break;
      case "run":
        if (args[1] === "datachat") {
          simulateRAG();
        } else if (args[1] === "deeplob" || args[1] === "onnx_hft") {
          simulateHFT();
        } else if (args[1] === "hifun" || args[1] === "hifun_router") {
          simulateRouter();
        } else {
          addLog("usage: run <job> (options: 'datachat', 'deeplob', 'hifun')", "warning");
        }
        break;
      case "neofetch":
        addLog("              .,-:;//;:=,", "success");
        addLog("          . :H##M#H#M#H##M#H: .", "success");
        addLog("        .  H##M#H#M#H##M#H##M#H  .", "success");
        addLog("       :H##M#H#M#H##M#H##M#H##M#H:", "success");
        addLog("       --------------------------------------", "info");
        addLog("       OS: Arch Linux x86_64", "info");
        addLog("       Host: Piyush-Inference-Node-01", "info");
        addLog("       Kernel: 6.8.9-arch1-1", "info");
        addLog("       Uptime: 24 days, 6 hours", "info");
        addLog("       Shell: bash 5.2.26", "info");
        addLog("       CPU: AMD Ryzen Threadripper 3970X (64) @ 3.7GHz", "info");
        addLog("       GPU: NVIDIA RTX A6000 48GB (Compute 8.6)", "info");
        addLog("       Memory: 65120MiB / 131072MiB (49%)", "info");
        addLog("       CUDA version: 12.4", "success");
        addLog("       LLM Pool: Local (nomic-embed-text) + API (Groq)", "success");
        addLog("       Target Roles: AI & Systems Infrastructure Engineer", "success");
        break;
      default:
        addLog(`sh: command not found: ${primaryCmd}. Type 'help' for options.`, "error");
        break;
    }
  };

  return (
    <div className="w-full bg-[#12141C] border border-card-border rounded-lg shadow-2xl overflow-hidden flex flex-col font-mono text-xs text-slate-300">
      {/* Header bar */}
      <div className="bg-[#0B0C0E] border-b border-card-border px-4 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
          </div>
          <div className="h-4 w-[1px] bg-card-border mx-2"></div>
          <span className="text-[11px] text-text-muted flex items-center gap-1">
            <TermIcon className="w-3.5 h-3.5" />
            piyush@deep-infra-node-01: ~
          </span>
        </div>

        {/* Real-time Hardware Metrics */}
        <div className="flex items-center gap-4 text-[10px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-accent-blue" />
            <span>GPU_LOAD:</span>
            <span className={`font-bold transition-all ${gpuLoad > 80 ? "text-red-500" : "text-white"}`}>
              {gpuLoad}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3 text-accent-green" />
            <span>VRAM:</span>
            <span className="font-bold text-white">{vramUsage} / 40.0 GB</span>
          </div>
        </div>
      </div>

      {/* Log panel */}
      <div className="p-4 h-72 overflow-y-auto space-y-1 bg-[#0B0C0E]/40 font-mono text-[11px] leading-relaxed scrollbar-thin">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-text-muted select-none text-[10px] pt-[2px]">{log.timestamp}</span>
            {log.type === "command" && (
              <span className="text-accent-cyan flex-1">
                <span className="text-accent-green select-none">$ </span>
                {log.text}
              </span>
            )}
            {log.type === "info" && <span className="text-slate-300 flex-1">{log.text}</span>}
            {log.type === "success" && (
              <span className="text-accent-green flex-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 shrink-0" />
                {log.text}
              </span>
            )}
            {log.type === "warning" && (
              <span className="text-yellow-400 flex-1">
                <span className="font-bold select-none">[WARN] </span>
                {log.text}
              </span>
            )}
            {log.type === "error" && (
              <span className="text-red-400 flex-1">
                <span className="font-bold select-none">[ERR] </span>
                {log.text}
              </span>
            )}
          </div>
        ))}
        
        {/* Interactive CLI Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-1 mt-1">
          <span className="text-text-muted select-none text-[10px]">{currentTimestamp()}</span>
          <span className="text-accent-green select-none font-bold">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            disabled={activeSimulation !== null}
            className="flex-1 bg-transparent text-accent-cyan outline-none border-none font-mono text-[11px] placeholder-slate-700 focus:ring-0 p-0 m-0 w-full"
            placeholder={activeSimulation ? "Running job..." : "Type 'help' for options..."}
          />
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal controls */}
      <div className="bg-[#0B0C0E] border-t border-card-border px-4 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted font-bold tracking-wider">RUN SIMULATION:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={simulateRAG}
              disabled={activeSimulation !== null}
              className={`px-2 py-1 rounded border text-[10px] transition-colors flex items-center gap-1 font-bold ${
                activeSimulation === "RAG"
                  ? "bg-accent-green/20 border-accent-green text-accent-green"
                  : "bg-card-bg border-card-border text-slate-300 hover:border-slate-700 hover:text-white disabled:opacity-50"
              }`}
            >
              <Play className="w-2.5 h-2.5" />
              <span>DATACHAT_RAG</span>
            </button>
            <button
              onClick={simulateHFT}
              disabled={activeSimulation !== null}
              className={`px-2 py-1 rounded border text-[10px] transition-colors flex items-center gap-1 font-bold ${
                activeSimulation === "HFT"
                  ? "bg-accent-blue/20 border-accent-blue text-accent-blue"
                  : "bg-card-bg border-card-border text-slate-300 hover:border-slate-700 hover:text-white disabled:opacity-50"
              }`}
            >
              <Play className="w-2.5 h-2.5" />
              <span>ONNX_HFT</span>
            </button>
            <button
              onClick={simulateRouter}
              disabled={activeSimulation !== null}
              className={`px-2 py-1 rounded border text-[10px] transition-colors flex items-center gap-1 font-bold ${
                activeSimulation === "Router"
                  ? "bg-accent-purple/20 border-accent-purple text-accent-purple"
                  : "bg-card-bg border-card-border text-slate-300 hover:border-slate-700 hover:text-white disabled:opacity-50"
              }`}
            >
              <Play className="w-2.5 h-2.5" />
              <span>HIFUN_ROUTER</span>
            </button>
          </div>
        </div>

        <button
          onClick={clearLogs}
          className="px-2 py-1 bg-card-bg border border-card-border text-[10px] text-text-muted rounded hover:border-slate-700 hover:text-white flex items-center gap-1"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
}
