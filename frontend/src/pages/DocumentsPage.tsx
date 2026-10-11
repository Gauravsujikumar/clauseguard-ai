import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FileText,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';

export const DocumentsPage: React.FC = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContracts = () => {
    setLoading(true);
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
            category: d.document_type || 'Contract',
            badgeText: (d.mime_type || '').includes('sheet')
              ? 'XLS'
              : (d.mime_type || '').includes('word')
              ? 'DOC'
              : (d.mime_type || '').includes('image')
              ? 'IMG'
              : 'PDF',
            badgeBg: (d.mime_type || '').includes('sheet')
              ? 'bg-[#10B981]'
              : (d.mime_type || '').includes('image')
              ? 'bg-[#8B5CF6]'
              : (d.mime_type || '').includes('word')
              ? 'bg-[#0066FF]'
              : 'bg-[#EF4444]',
            date: new Date(d.created_at || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            pages: `${d.page_count || 1} pages`
          }));
          setContracts(formatted);
        } else {
          setContracts([]);
        }
      })
      .catch(() => {
        setContracts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchContracts();
  }, []);

  const handleDeleteContract = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.deleteDocument(id);
      setContracts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setContracts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="w-full space-y-5 pb-8 max-w-4xl mx-auto">
      {/* 1. Header Bar: Clean & Minimal */}
      <div className="px-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          My Contracts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Click any contract to view extraction and legal analysis.
        </p>
      </div>

      {/* 2. Focused Contracts List - Just File Name is Enough, Zero Horizontal Scroll */}
      {loading ? (
        <div className="py-16 text-center space-y-2">
          <div className="w-8 h-8 border-3 border-blue-200 border-t-[#0066FF] rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Loading contracts...</p>
        </div>
      ) : contracts.length > 0 ? (
        <div className="space-y-2.5">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <NavLink
                to={`/app/analysis?doc=${contract.id}&mode=summary`}
                className="flex items-center gap-3.5 min-w-0 flex-1 pr-3"
              >
                {/* File Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 relative group-hover:bg-blue-50 transition-colors">
                  <FileText size={18} className="text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                  <span className={`absolute -bottom-1 -right-1 text-[8px] font-black text-white px-1 py-0.2 rounded shadow-2xs ${contract.badgeBg}`}>
                    {contract.badgeText}
                  </span>
                </div>

                {/* Just File Name + Subtitle (No collision, No horizontal scroll) */}
                <div className="min-w-0 flex-1">
                  <h3 
                    className="text-sm font-bold text-slate-900 group-hover:text-[#0066FF] truncate leading-snug transition-colors"
                    title={contract.title}
                  >
                    {contract.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-2">
                    <span>{contract.pages}</span>
                    <span>•</span>
                    <span>Uploaded {contract.date}</span>
                  </p>
                </div>
              </NavLink>

              {/* Actions: View & Delete */}
              <div className="flex items-center gap-2 shrink-0">
                <NavLink
                  to={`/app/analysis?doc=${contract.id}&mode=all`}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-xs font-bold rounded-xl transition-colors hidden sm:flex items-center gap-1"
                >
                  <span>View</span>
                  <ChevronRight size={14} />
                </NavLink>
                <button
                  onClick={(e) => handleDeleteContract(contract.id, e)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border-0"
                  title="Delete contract"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
          <FileText size={32} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">No contracts uploaded yet</h3>
          <p className="text-xs text-slate-400">Contracts you upload from the home screen will appear here.</p>
        </div>
      )}
    </div>
  );
};
