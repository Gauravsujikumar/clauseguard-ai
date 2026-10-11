import React from 'react';
import { BarChart3, Download, FileText, CheckSquare, ShieldAlert, GitCompare } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports & Export Center</h1>
          <p className="text-xs text-slate-500">Generate executive PDF summaries, obligation spreadsheets, and audit packages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
            <FileText size={24} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Executive Contract Summary Report (PDF)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consolidated PDF report featuring document metadata, executive analysis, risk findings, supporting passages, and disclaimers.
          </p>
          <a
            href="/api/v1/reports/doc-1/pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-brand-blue text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <Download size={16} />
            <span>Download PDF Report</span>
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckSquare size={24} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Obligation & Deadline Checklist (CSV)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Structured spreadsheet containing all extracted contractual responsibilities, assigned parties, and calculated deadlines.
          </p>
          <a
            href="/api/v1/reports/doc-1/csv"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
          >
            <Download size={16} />
            <span>Export CSV Checklist</span>
          </a>
        </div>
      </div>
    </div>
  );
};
