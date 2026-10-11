import React, { useState } from 'react';
import { GitCompare, ArrowRight, Plus, Minus, Edit3, ShieldAlert } from 'lucide-react';
import { api } from '@/lib/api';

export const CompareContractsPage: React.FC = () => {
  const [baseDoc, setBaseDoc] = useState('doc-1');
  const [targetDoc, setTargetDoc] = useState('doc-2');
  const [comparison, setComparison] = useState<any>({
    summary_diff: "Comparing 'Acme Master SaaS Agreement (v1)' against 'Enterprise Vendor MSA (v2)'. Key changes include an 8% subscription fee increase, extending non-renewal notice from 30 to 60 days, and adding GDPR Data Privacy Processor addendum obligations.",
    added_clauses: [
      { clause_type: 'Data Privacy Addendum', text: 'Vendor agrees to process personal data strictly in accordance with EU GDPR Article 28 data processor terms.' }
    ],
    removed_clauses: [
      { clause_type: 'Waiver of Consequential Damages', text: 'In no event shall either party be liable for lost profits or indirect damages.' }
    ],
    modified_clauses: [
      {
        clause_type: 'Notice Period for Renewal',
        base_text: 'Written notice of non-renewal must be provided 30 days prior to term expiration.',
        target_text: 'Written notice of non-renewal must be provided 60 days prior to term expiration.',
        change_type: 'Modified Obligation Timeline'
      }
    ]
  });

  const handleCompare = async () => {
    try {
      const data = await api.compareContracts(baseDoc, targetDoc);
      setComparison(data);
    } catch {}
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contract Version Comparison</h1>
          <p className="text-xs text-slate-500">Side-by-side visual diffing of additions, deletions, clause modifications, and risk deltas</p>
        </div>
      </div>

      {/* Contract Selection Header */}
      <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5 space-y-1">
          <label className="block text-xs font-bold text-slate-700">Base Contract (Version 1)</label>
          <select
            value={baseDoc}
            onChange={(e) => setBaseDoc(e.target.value)}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-brand-blue"
          >
            <option value="doc-1">Acme Master SaaS Agreement (v1.0)</option>
            <option value="doc-3">Mutual NDA (2026)</option>
          </select>
        </div>

        <div className="md:col-span-2 text-center flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
            <GitCompare size={20} />
          </div>
        </div>

        <div className="md:col-span-5 space-y-1">
          <label className="block text-xs font-bold text-slate-700">Target Contract (Version 2 / Renewal)</label>
          <select
            value={targetDoc}
            onChange={(e) => setTargetDoc(e.target.value)}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-brand-blue"
          >
            <option value="doc-2">Enterprise Vendor MSA (v2.0)</option>
            <option value="doc-1">Acme Master SaaS Agreement (v1.0)</option>
          </select>
        </div>
      </div>

      {/* Change Summary Overview */}
      <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
        <h3 className="font-bold text-brand-navy text-sm">AI Delta Change Summary</h3>
        <p className="text-xs text-slate-800 leading-relaxed">{comparison.summary_diff}</p>
      </div>

      {/* Visual Diff Sections */}
      <div className="space-y-6">
        {/* Modified Clauses */}
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Edit3 size={18} />
            <span>Modified Clauses ({comparison.modified_clauses?.length || 0})</span>
          </div>

          {comparison.modified_clauses?.map((m: any, i: number) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-bold">
                {m.clause_type}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
                <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-lg">
                  <span className="font-sans text-[10px] font-bold text-rose-700 block mb-1">Base Version Text:</span>
                  <p className="text-slate-800">"{m.base_text}"</p>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
                  <span className="font-sans text-[10px] font-bold text-emerald-700 block mb-1">Target Version Text:</span>
                  <p className="text-slate-800">"{m.target_text}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Added Clauses */}
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <Plus size={18} />
            <span>Added Provisions ({comparison.added_clauses?.length || 0})</span>
          </div>

          {comparison.added_clauses?.map((a: any, i: number) => (
            <div key={i} className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-1 text-xs">
              <span className="font-bold text-emerald-800">{a.clause_type}</span>
              <p className="font-serif italic text-slate-800">"{a.text}"</p>
            </div>
          ))}
        </div>

        {/* Removed Clauses */}
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Minus size={18} />
            <span>Removed Provisions ({comparison.removed_clauses?.length || 0})</span>
          </div>

          {comparison.removed_clauses?.map((r: any, i: number) => (
            <div key={i} className="p-4 bg-rose-50/40 border border-rose-200 rounded-xl space-y-1 text-xs">
              <span className="font-bold text-rose-800">{r.clause_type}</span>
              <p className="font-serif italic text-slate-800 line-through">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
