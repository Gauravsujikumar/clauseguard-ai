import React from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const events = [
    { date: '2026-10-24', title: 'Annual Licensing Payment Due', contract: 'Acme SaaS Agreement', type: 'payment' },
    { date: '2027-03-24', title: 'SOC 2 Type II Audit Deliverable', contract: 'Enterprise MSA', type: 'audit' },
    { date: '2027-07-26', title: '60-Day Auto-Renewal Cancellation Notice', contract: 'Acme SaaS Agreement', type: 'renewal' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contract Calendar & Milestones</h1>
          <p className="text-xs text-slate-500">Visual timeline of confirmed contract expiration dates, auto-renewal windows, and obligations</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <CalendarIcon size={22} className="text-brand-blue" />
            <h2 className="text-lg font-bold text-slate-900">October 2026 - July 2027 Timeline</h2>
          </div>
        </div>

        <div className="space-y-4">
          {events.map((evt, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="px-3 py-2 bg-blue-100 text-brand-blue rounded-xl text-xs font-bold text-center">
                  <span>{evt.date}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{evt.title}</h4>
                  <p className="text-xs text-slate-500">{evt.contract}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold uppercase">
                {evt.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
