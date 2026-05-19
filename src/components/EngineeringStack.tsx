"use client";

import React, { useState } from "react";
import { Cpu, Server, Database, Code, Globe, HelpCircle } from "lucide-react";

interface StackItem {
  name: string;
  level: number; // 1-5 (represented as visual led blocks)
  projects: string[]; // List of project IDs using this tech
}

interface StackLayer {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  items: StackItem[];
}

export default function EngineeringStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    { id: "datachat", name: "DataChat (NL-to-SQL)", color: "border-accent-green text-accent-green bg-accent-green/5" },
    { id: "deeplob", name: "DeepLOB-HFT (C++ ONNX)", color: "border-accent-blue text-accent-blue bg-accent-blue/5" },
    { id: "hifun", name: "HIFUN Router (XGBoost)", color: "border-accent-purple text-accent-purple bg-accent-purple/5" },
    { id: "semeval", name: "SemEval-2026 (ACL Paper)", color: "border-accent-cyan text-accent-cyan bg-accent-cyan/5" },
  ];

  const layers: StackLayer[] = [
    {
      title: "Layer 1: AI Automation & LLMs",
      icon: <Cpu className="w-4 h-4" />,
      colorClass: "text-accent-green border-accent-green/20 bg-accent-green/5",
      items: [
        { name: "RAG Pipelines", level: 5, projects: ["datachat"] },
        { name: "Agentic AI", level: 5, projects: ["datachat", "hifun"] },
        { name: "Multi-Agent Systems", level: 4, projects: ["datachat"] },
        { name: "LangChain", level: 4, projects: ["datachat"] },
        { name: "LlamaIndex", level: 4, projects: ["datachat"] },
        { name: "Groq LLM", level: 5, projects: ["datachat"] },
        { name: "Transformers", level: 4, projects: ["semeval"] },
      ],
    },
    {
      title: "Layer 2: ML Infrastructure & Training",
      icon: <Server className="w-4 h-4" />,
      colorClass: "text-accent-blue border-accent-blue/20 bg-accent-blue/5",
      items: [
        { name: "PyTorch", level: 5, projects: ["deeplob", "semeval"] },
        { name: "TensorFlow", level: 4, projects: ["deeplob"] },
        { name: "ONNX Runtime", level: 5, projects: ["deeplob"] },
        { name: "CUDA", level: 4, projects: ["deeplob"] },
        { name: "QLoRA", level: 5, projects: ["semeval"] },
        { name: "XGBoost Stacking", level: 5, projects: ["semeval", "hifun"] },
        { name: "MLflow / W&B", level: 4, projects: ["deeplob", "semeval"] },
      ],
    },
    {
      title: "Layer 3: Backend & APIs",
      icon: <Code className="w-4 h-4" />,
      colorClass: "text-accent-purple border-accent-purple/20 bg-accent-purple/5",
      items: [
        { name: "Python", level: 5, projects: ["datachat", "deeplob", "hifun", "semeval"] },
        { name: "C++", level: 4, projects: ["deeplob"] },
        { name: "FastAPI", level: 4, projects: ["datachat"] },
        { name: "Docker", level: 4, projects: ["datachat", "deeplob"] },
        { name: "Kubernetes", level: 3, projects: ["deeplob"] },
        { name: "Git / PR Workflows", level: 5, projects: ["datachat", "deeplob", "hifun", "semeval"] },
      ],
    },
    {
      title: "Layer 4: Data & Retrieval",
      icon: <Database className="w-4 h-4" />,
      colorClass: "text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5",
      items: [
        { name: "pgvector (Supabase)", level: 5, projects: ["datachat"] },
        { name: "ChromaDB / FAISS", level: 4, projects: ["datachat"] },
        { name: "MongoDB", level: 4, projects: ["hifun"] },
        { name: "MySQL / SQL", level: 5, projects: ["datachat", "hifun"] },
        { name: "Neo4j / Graphs", level: 4, projects: ["hifun"] },
      ],
    },
    {
      title: "Layer 5: Frontend & Visualization",
      icon: <Globe className="w-4 h-4" />,
      colorClass: "text-accent-green border-accent-green/20 bg-accent-green/5",
      items: [
        { name: "Next.js 14", level: 4, projects: ["datachat"] },
        { name: "React", level: 4, projects: ["datachat"] },
        { name: "TailwindCSS", level: 5, projects: ["datachat"] },
        { name: "Recharts", level: 4, projects: ["datachat"] },
        { name: "shadcn/ui", level: 4, projects: ["datachat"] },
      ],
    },
  ];

  // Helper check to see if tech should highlight
  const isTechHighlighted = (tech: StackItem) => {
    if (hoveredTech === tech.name) return true;
    if (hoveredProject && tech.projects.includes(hoveredProject)) return true;
    return false;
  };

  // Helper check to see if project should highlight
  const isProjectHighlighted = (projId: string) => {
    if (hoveredProject === projId) return true;
    if (hoveredTech) {
      const tech = layers
        .flatMap((l) => l.items)
        .find((t) => t.name === hoveredTech);
      if (tech && tech.projects.includes(projId)) return true;
    }
    return false;
  };

  return (
    <section id="stack" className="py-20 border-b border-card-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-green"></span>
            <span className="font-mono text-xs text-accent-green tracking-widest uppercase">
              Engineering Stack
            </span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
            System Infrastructure Rack
          </h2>
          <p className="mt-2 text-sm text-text-muted font-mono max-w-3xl">
            Proficiencies categorized by architecture layers. Hovering over a skill shows which production system or paper used it. Hovering over a project badge highlights its technology stack in the cabinet.
          </p>
        </div>

        {/* Dynamic Project badges */}
        <div className="mb-8 p-4 bg-[#12141C] border border-card-border rounded-lg flex flex-wrap items-center gap-4 select-none">
          <span className="font-mono text-[10px] text-text-muted uppercase font-bold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Hover Project to Highlight Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {projects.map((proj) => {
              const highlighted = isProjectHighlighted(proj.id);
              return (
                <button
                  key={proj.id}
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`px-3 py-1 text-[10px] font-mono rounded border transition-all duration-200 ${
                    highlighted
                      ? `${proj.color} border-slate-400 scale-[1.03] shadow-md shadow-slate-950`
                      : "bg-[#0B0C0E]/50 border-card-border text-text-muted opacity-60"
                  }`}
                >
                  {proj.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Server Rack visual grid */}
        <div className="bg-[#12141C] border border-card-border rounded-xl p-4 sm:p-6 space-y-5 shadow-2xl relative">
          {/* Rack ear handles (left & right) */}
          <div className="absolute top-8 bottom-8 left-1.5 w-1.5 border-l border-r border-slate-700 bg-slate-800 rounded hidden sm:block"></div>
          <div className="absolute top-8 bottom-8 right-1.5 w-1.5 border-l border-r border-slate-700 bg-slate-800 rounded hidden sm:block"></div>

          {layers.map((layer, index) => (
            <div
              key={index}
              className="bg-[#0B0C0E] border border-card-border/80 rounded-lg p-4 sm:p-5 relative transition-all hover:border-slate-800"
            >
              {/* Layer Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`p-1.5 rounded border ${layer.colorClass}`}>
                  {layer.icon}
                </span>
                <span className="font-mono font-bold text-xs text-white">
                  {layer.title}
                </span>
              </div>

              {/* Skills grid in Layer */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {layer.items.map((tech) => {
                  const active = isTechHighlighted(tech);
                  return (
                    <div
                      key={tech.name}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`p-3 rounded border font-mono transition-all duration-200 select-none flex flex-col justify-between h-16 ${
                        active
                          ? "border-accent-green bg-accent-green/5 text-white glow-green scale-[1.02]"
                          : hoveredTech || hoveredProject
                          ? "border-card-border/30 bg-card-bg/20 text-slate-700 opacity-30"
                          : "border-card-border bg-card-bg text-slate-300 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <div className="text-[10px] font-bold truncate">{tech.name}</div>
                      
                      {/* LED proficiency indicator */}
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, lIdx) => (
                          <span
                            key={lIdx}
                            className={`w-2 h-1.5 rounded-sm transition-all duration-300 ${
                              lIdx < tech.level
                                ? active
                                  ? "bg-accent-green"
                                  : "bg-slate-500"
                                : "bg-slate-900 border border-slate-800"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
