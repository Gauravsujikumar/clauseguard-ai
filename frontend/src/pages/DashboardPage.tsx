import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FileText,
  Shield,
  Sparkles,
  Scale,
  ArrowRight,
  ChevronRight,
  Layers
} from 'lucide-react';
import { UploadModal } from '@/components/documents/UploadModal';
import { api } from '@/lib/api';

export const DashboardPage: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [targetMode, setTargetMode] = useState<'summary' | 'risks' | 'clauses' | 'obligations' | 'all'>('all');
  const [recentContracts, setRecentContracts] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const handleCardClick = (mode: 'summary' | 'risks' | 'clauses' | 'obligations' | 'all') => {
    setTargetMode(mode);
    setIsUploadOpen(true);
  };

  const fetchUserDocuments = () => {
    setLoadingDocs(true);
    api.listDocuments()
      .then((docs) => {
        if (docs && docs.length > 0) {
          // Silently pre-warm top contracts in background so clicking any contract opens in 0ms
          docs.slice(0, 8).forEach((d: any) => {
            api.getFullAnalysis(d.id).catch(() => {});
          });

          const formatted = docs.map((d: any) => ({
            id: d.id,
            title: d.original_filename || d.title,
            category: d.document_type || 'Commercial Agreement',
            badgeText: (d.mime_type || '').includes('sheet')
              ? 'XLS'
              : (d.mime_type || '').includes('image')
              ? 'IMG'
              : (d.mime_type || '').includes('word')
              ? 'DOC'
              : 'PDF',
            badgeBg: (d.mime_type || '').includes('sheet')
              ? 'bg-[#10B981]'
              : (d.mime_type || '').includes('image')
              ? 'bg-[#8B5CF6]'
              : 'bg-[#0066FF]',
            date: new Date(d.created_at || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            pages: `${d.page_count || 1} pages`
          }));
          setRecentContracts(formatted);
        } else {
          setRecentContracts([]);
        }
      })
      .catch(() => {
        setRecentContracts([]);
      })
      .finally(() => {
        setLoadingDocs(false);
      });
  };

  useEffect(() => {
    fetchUserDocuments();
  }, [isUploadOpen]);

  return (
    <div className="w-full space-y-6 pb-6 max-w-4xl mx-auto">
      {/* 1. HERO BANNER: Clean & Focused */}
      <div className="relative py-5 px-6 sm:px-8 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white rounded-3xl border border-blue-100/70 shadow-xs overflow-hidden">
        <div className="flex flex-row items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-[65%] sm:max-w-md md:max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#0066FF] text-[11px] font-bold">
              <Sparkles size={13} />
              <span>AI Legal Intelligence</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1A3D] tracking-tight leading-tight">
              Turn Contracts into <span className="text-[#0066FF]">Clarity</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              Summarize entire files, inspect key clauses, audit risks, or analyze deeply.
            </p>
          </div>

          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src="/assets/contract-3d-clean.png"
              alt="ClauseGuard AI"
              className="w-20 sm:w-28 md:w-32 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(11,99,255,0.18)] select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* 2. SIMPLE, UNCLUTTERED ACTIONS (Removed large crowded box and top text) */}
      <div className="space-y-3">
        {/* Sleek, Premium "Full Contract Analysis" Bar */}
        <div
          onClick={() => handleCardClick('all')}
          className="group relative overflow-hidden p-4 sm:p-4.5 bg-gradient-to-r from-[#071B45] via-[#0B2A6B] to-[#155EEF] rounded-2xl text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-between border border-blue-900/40"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white/25 transition-all">
              <Layers size={19} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                  Full Contract Analysis
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-blue-400/25 border border-blue-300/30 text-[10px] font-semibold text-blue-100 uppercase tracking-wider">
                  360° Inspection
                </span>
              </div>
              <p className="text-xs text-blue-100/90 font-normal truncate mt-0.5">
                Complete AI audit: summary, risk scoring, critical clauses & deadline timeline
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-[#071B45] group-hover:translate-x-0.5 transition-all ml-3 shadow-xs">
            <ArrowRight size={15} />
          </div>
        </div>

        {/* 4 Clean Targeted Cards with Modern Borders & Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Card 1: Summary */}
          <div
            onClick={() => handleCardClick('summary')}
            className="group p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-[#0066FF] shadow-xs hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:bg-gradient-to-b hover:from-white hover:to-blue-50/25 transition-all duration-200 ease-out active:scale-98 cursor-pointer flex flex-col justify-between h-[126px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-100 flex items-center justify-center transition-all duration-200 group-hover:bg-[#0066FF] group-hover:text-white group-hover:border-[#0066FF] group-hover:scale-105 shadow-xs">
                <FileText size={17} />
              </div>
              <ChevronRight size={15} className="text-slate-300 group-hover:text-[#0066FF] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug tracking-tight">
                Summary
              </h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate group-hover:text-slate-600 transition-colors">
                Key terms & parties
              </p>
            </div>
          </div>

          {/* Card 2: Risk Audit */}
          <div
            onClick={() => handleCardClick('risks')}
            className="group p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-rose-500 shadow-xs hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1 hover:bg-gradient-to-b hover:from-white hover:to-rose-50/25 transition-all duration-200 ease-out active:scale-98 cursor-pointer flex flex-col justify-between h-[126px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center transition-all duration-200 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 group-hover:scale-105 shadow-xs">
                <Shield size={17} />
              </div>
              <ChevronRight size={15} className="text-slate-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition-colors leading-snug tracking-tight">
                Risk Audit
              </h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate group-hover:text-slate-600 transition-colors">
                Liabilities & red flags
              </p>
            </div>
          </div>

          {/* Card 3: Key Clauses */}
          <div
            onClick={() => handleCardClick('clauses')}
            className="group p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-purple-500 shadow-xs hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 hover:bg-gradient-to-b hover:from-white hover:to-purple-50/25 transition-all duration-200 ease-out active:scale-98 cursor-pointer flex flex-col justify-between h-[126px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center transition-all duration-200 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 group-hover:scale-105 shadow-xs">
                <Sparkles size={17} />
              </div>
              <ChevronRight size={15} className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors leading-snug tracking-tight">
                Key Clauses
              </h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate group-hover:text-slate-600 transition-colors">
                Critical legal terms
              </p>
            </div>
          </div>

          {/* Card 4: Obligations */}
          <div
            onClick={() => handleCardClick('obligations')}
            className="group p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500 shadow-xs hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 hover:bg-gradient-to-b hover:from-white hover:to-amber-50/25 transition-all duration-200 ease-out active:scale-98 cursor-pointer flex flex-col justify-between h-[126px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center transition-all duration-200 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 group-hover:scale-105 shadow-xs">
                <Scale size={17} />
              </div>
              <ChevronRight size={15} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors leading-snug tracking-tight">
                Obligations
              </h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate group-hover:text-slate-600 transition-colors">
                Deadlines & duties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT CONTRACTS (Clean vertical list, NO text colliding) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            Recent Contracts
          </h2>
          <NavLink
            to="/app/documents"
            className="text-xs font-bold text-[#0066FF] hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </NavLink>
        </div>

        {recentContracts.length > 0 ? (
          <div className="space-y-2.5">
            {recentContracts.slice(0, 5).map((contract) => (
              <NavLink
                key={contract.id}
                to={`/app/analysis?doc=${contract.id}&mode=summary`}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 relative group-hover:bg-blue-50 transition-colors">
                    <FileText size={18} className="text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                    <span className={`absolute -bottom-1 -right-1 text-[8px] font-black text-white px-1 py-0.2 rounded shadow-2xs ${contract.badgeBg}`}>
                      {contract.badgeText}
                    </span>
                  </div>

                  {/* Clean text separation - title & subtitle NEVER overlap */}
                  <div className="min-w-0 flex-1">
                    <h3 
                      className="text-sm font-bold text-slate-900 group-hover:text-[#0066FF] truncate leading-snug transition-colors"
                      title={contract.title}
                    >
                      {contract.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1 leading-normal flex items-center gap-2">
                      <span>{contract.pages}</span>
                      <span>•</span>
                      <span>Uploaded {contract.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#0066FF] group-hover:bg-blue-50 transition-all">
                    <ChevronRight size={15} />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-dashed border-slate-200 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">No contracts uploaded yet</h4>
              <p className="text-[11px] text-slate-400 font-medium">Click any of the cards above to analyze a document.</p>
            </div>
          </div>
        )}
      </div>

      {/* Target-Specific Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={fetchUserDocuments}
        targetMode={targetMode}
      />
    </div>
  );
};
