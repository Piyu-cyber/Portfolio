"use client";

import React from "react";
import { GitCommit, Calendar, Award, Star, BookOpen, Layers } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: "academic" | "engineering" | "research";
  icon: React.ReactNode;
  tags: string[];
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      date: "Expected May 2028",
      title: "B.Tech in Data Science & AI",
      subtitle: "IIIT Dharwad (Till 4th Semester)",
      description: "Maintaining a high academic standing with a cumulative CGPA of 9.1 / 10.0. Engaging in deep systems coursework including Database Management Systems, Data Structures, Statistics, and Probability.",
      type: "academic",
      icon: <Layers className="w-4 h-4 text-accent-blue" />,
      tags: ["GPA: 9.1", "Data Science", "Systems"],
    },
    {
      date: "January 2026",
      title: "ACL SemEval-2026 Author",
      subtitle: "Association for Computational Linguistics Proceedings",
      description: "Co-authored a paper on robust multilingual polarization detection across 22 languages. Engineered the stacked classifier using QLoRA and Shannon entropy expert-routing layers.",
      type: "research",
      icon: <BookOpen className="w-4 h-4 text-accent-purple" />,
      tags: ["QLoRA", "XGBoost Stacking", "ACL Anthology"],
    },
    {
      date: "Late 2025",
      title: "DeepLOB C++ Inference Engineering",
      subtitle: "Quant/HFT Model Acceleration Project",
      description: "Architected a C++ deployment pipeline for limit order book tick analysis. Compiled CNN/Transformer models to ONNX, achieving 1.75x inference execution speeds over Python baselines.",
      type: "engineering",
      icon: <Award className="w-4 h-4 text-accent-green" />,
      tags: ["C++", "ONNX Runtime", "High Frequency Trading"],
    },
    {
      date: "Mid 2025",
      title: "HIFUN Router Development",
      subtitle: "Hybrid Query Optimization System",
      description: "Co-developed an intelligent ML routing node to automatically classify query DSL target backends. Evaluated across 10k+ benchmark datasets, reaching an F1 score of 97.3%.",
      type: "engineering",
      icon: <GitCommit className="w-4 h-4 text-accent-cyan" />,
      tags: ["XGBoost", "SHAP Explainability", "Neo4j / SQL"],
    },
    {
      date: "Early 2025",
      title: "DataChat Architecture Launch",
      subtitle: "RAG NL-to-SQL Database Interface",
      description: "Engineered an agentic database querying workflow utilizing pgvector and semantic caching layers. Achieved 60% API cost reductions and compressed average response times to 1.5s.",
      type: "engineering",
      icon: <Star className="w-4 h-4 text-accent-green" />,
      tags: ["pgvector", "Groq API", "Semantic Cache"],
    },
    {
      date: "Ongoing",
      title: "Generative AI Minor Specialization",
      subtitle: "Academic Honors Track",
      description: "Completing dedicated honors coursework focused on LLM optimization, deep representations, prompt architecture, and multi-agent loops. Minor GPA: 9.0 / 10.0.",
      type: "academic",
      icon: <Calendar className="w-4 h-4 text-accent-blue" />,
      tags: ["Minor GPA: 9.0", "Agentic Systems", "Prompt Engineering"],
    },
  ];

  return (
    <section id="timeline" className="py-20 border-b border-card-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
            <span className="font-mono text-xs text-accent-blue tracking-widest uppercase">
              Growth Path
            </span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
            Engineering Milestones
          </h2>
          <p className="mt-2 text-sm text-text-muted font-mono max-w-3xl">
            A chronological timeline detailing formal education, published scientific literature, and functional code repositories.
          </p>
        </div>

        {/* Console timeline tree */}
        <div className="relative border-l border-card-border ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10 py-2">
          {events.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Chronological git node dot */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#12141C] border border-card-border group-hover:border-slate-400 flex items-center justify-center transition-colors shadow-lg shadow-black">
                {event.icon}
              </div>

              {/* Event details box */}
              <div className="bg-[#12141C] border border-card-border hover:border-slate-800 rounded-lg p-5 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-text-muted flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <div className="flex gap-1.5">
                    {event.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#0B0C0E] border border-card-border/80 text-white font-mono text-[9px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-mono font-bold text-white mb-0.5">
                  {event.title}
                </h3>
                <h4 className="text-xs font-mono text-slate-400 mb-3">
                  {event.subtitle}
                </h4>
                <p className="text-xs font-mono text-text-muted leading-relaxed max-w-3xl">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
