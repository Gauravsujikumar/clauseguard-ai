import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Sparkles, FileText, CheckCircle2, ArrowRight, Lock, BarChart3, Bot, Users } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="ClauseGuard AI" className="h-9 w-auto" />
          <div className="hidden sm:flex flex-col">
            <span className="font-extrabold text-lg text-brand-navy tracking-tight leading-none">ClauseGuard <span className="text-brand-accent">AI</span></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Contracts Made Clear</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-brand-blue transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-brand-blue transition-colors">How it Works</a>
          <a href="#security" className="hover:text-brand-blue transition-colors">Security & Privacy</a>
          <a href="#faq" className="hover:text-brand-blue transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/login" className="text-sm font-bold text-slate-700 hover:text-brand-blue px-4 py-2">
            Sign In
          </NavLink>
          <NavLink to="/login" className="text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center gap-2">
            <span>Analyze a Document</span>
            <ArrowRight size={16} />
          </NavLink>
        </div>
      </nav>

      {/* Feature Cards at Top */}
      <section className="pt-8 pb-4 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Automated Risk Detection</h3>
              <p className="text-[11px] text-slate-500 line-clamp-1">Spot liabilities & ambiguous terms</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Obligation Tracking</h3>
              <p className="text-[11px] text-slate-500 line-clamp-1">Auto-extract deadlines & notices</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">ClauseGuard Copilot</h3>
              <p className="text-[11px] text-slate-500 line-clamp-1">Source-backed legal Q&A</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Side-by-Side Text & Image */}
      <section className="py-12 px-8 max-w-6xl mx-auto relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content on Left */}
          <div className="text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold">
              <Sparkles size={14} />
              <span>Next-Generation Legal Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Understand Every Clause. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-accent to-blue-700">
                Make Better Decisions.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Analyze contracts, uncover potential risks, extract obligations, and track important deadlines with evidence-backed AI document intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <NavLink to="/login" className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
                <span>Analyze a Document</span>
                <ArrowRight size={16} />
              </NavLink>
              <a href="#features" className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center">
                Explore Features
              </a>
            </div>
          </div>

          {/* Image Side-by-Side on Right */}
          <div className="bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80 relative">
            <img src="/assets/login-graphic.png" alt="ClauseGuard AI Interface" className="rounded-xl w-full max-h-[380px] object-cover" />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-white border-t border-slate-200 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-brand-navy mb-4">Enterprise Contract Intelligence Capabilities</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm font-medium">Built for legal ops, procurement leaders, and finance executives requiring grounded accuracy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Risk Detection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Identifies high-risk indemnification, unlimited liability caps, and ambiguous renewal terms with exact page-level citations.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Obligation & Deadline Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Automatically extracts notice periods, auto-renewals, and audit deliverables into structured checklists with calendar integration.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mb-6">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">ClauseGuard Copilot QA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Ask direct questions about uploaded agreements and receive answers strictly grounded in document text with source quotes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section id="security" className="py-16 bg-brand-navy text-white px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Lock size={36} className="mx-auto text-brand-accent" />
          <h2 className="text-3xl font-extrabold">Bank-Grade Security & Strict Confidentiality</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Your contracts are encrypted in transit and at rest. Multi-tenant database isolation ensures your organization's legal documents remain completely private.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs text-center border-t border-slate-800">
        <p>© 2026 ClauseGuard AI. All rights reserved. Contracts Made Clear.</p>
      </footer>
    </div>
  );
};
