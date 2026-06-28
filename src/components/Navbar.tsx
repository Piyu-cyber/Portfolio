"use client";

import React, { useState } from "react";
import { Shield, Menu, X, FileText, Search } from "lucide-react";

interface NavbarProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  onSearchClick: () => void;
}

export default function Navbar({ recruiterMode, setRecruiterMode, onSearchClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Snapshot", href: "#snapshot" },
    { name: "Projects", href: "#projects" },
    { name: "Research", href: "#research" },
    { name: "Stack", href: "#stack" },
    { name: "Timeline", href: "#timeline" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92vw] max-w-7xl z-50 transition-all duration-300 rounded-full border border-card-border/80 glass-hud px-6 py-1.5 shadow-lg shadow-slate-900/5`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-accent-blue to-accent-green flex items-center justify-center font-mono font-bold text-sm text-[#0B0C0E] shadow-lg shadow-accent-green/10">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold tracking-tight text-white group-hover:text-accent-green transition-colors">
                  PIYUSH PRASHANT
                </span>
                <span className="text-[10px] font-mono text-accent-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
                  SYSTEM_ACTIVE // B.TECH DSAI
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs font-mono text-text-muted hover:text-white transition-colors"
              >
                {`[ ${link.name} ]`}
              </a>
            ))}
          </div>

          {/* Recruiter Toggle & Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {/* Spotlight Search Toggle */}
            <button
              onClick={onSearchClick}
              className="p-1.5 rounded border border-card-border bg-[#12141C] text-text-muted hover:text-slate-300 hover:border-slate-700 flex items-center justify-center transition-colors"
              title="Search command palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Recruiter Switch */}
            <button
              onClick={() => setRecruiterMode(!recruiterMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border font-mono text-[11px] transition-all duration-200 ${
                recruiterMode
                  ? "bg-accent-green/10 border-accent-green text-accent-green glow-green"
                  : "bg-[#12141C] border-card-border text-text-muted hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              <Shield className={`w-3.5 h-3.5 ${recruiterMode ? "animate-pulse" : ""}`} />
              <span>RECRUITER MODE: {recruiterMode ? "ON" : "OFF"}</span>
            </button>

            {/* Direct resume download */}
            <a
              href="/Piyush_Prashant_Resume_Final.docx"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-[#0B0C0E] font-mono font-bold text-[11px] hover:bg-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME.DOCX</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onSearchClick}
              className="p-1.5 rounded border border-card-border bg-card-bg text-text-muted hover:text-white flex items-center justify-center"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRecruiterMode(!recruiterMode)}
              className={`p-1.5 rounded border ${
                recruiterMode
                  ? "bg-accent-green/10 border-accent-green text-accent-green"
                  : "bg-card-bg border-card-border text-text-muted"
              }`}
              title="Toggle Recruiter Mode"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded border border-card-border bg-card-bg text-text-muted hover:text-white hover:border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0C0E] border-b border-card-border px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-mono text-text-muted py-2 border-b border-card-border/30 hover:text-white"
              >
                {`> ${link.name}`}
              </a>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setRecruiterMode(!recruiterMode);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded border font-mono text-xs ${
                recruiterMode
                  ? "bg-accent-green/10 border-accent-green text-accent-green"
                  : "bg-[#12141C] border-card-border text-text-muted"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>RECRUITER MODE: {recruiterMode ? "ENABLED" : "DISABLED"}</span>
            </button>

            <a
              href="/Piyush_Prashant_Resume_Final.docx"
              download
              className="flex items-center justify-center gap-2 py-2.5 rounded bg-white text-[#0B0C0E] font-mono font-bold text-xs hover:bg-slate-200"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME (DOCX)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
