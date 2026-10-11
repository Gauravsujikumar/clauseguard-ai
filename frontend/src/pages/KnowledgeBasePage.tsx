import React, { useState } from 'react';
import { Database, Search, FileText, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const KnowledgeBasePage: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contract Knowledge Base</h1>
        <p className="text-xs text-slate-500">Cross-document semantic search across authorized organization agreements</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search across all contracts for terms, indemnities, SLA credits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-blue"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Acme Master SaaS Agreement</span>
            <span className="text-[10px] bg-blue-100 text-brand-blue font-bold px-2 py-0.5 rounded">Relevance 98%</span>
          </div>
          <p className="text-xs text-slate-600">"...neither party's aggregate liability under Section 14 (Indemnification) shall be subject to the limitation of liability..."</p>
          <NavLink to="/app/analysis?doc=doc-1" className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1 pt-1">
            <span>Open Document Result</span>
            <ArrowUpRight size={14} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
