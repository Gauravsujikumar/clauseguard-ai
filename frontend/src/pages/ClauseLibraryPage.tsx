import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Plus, CheckCircle2, Copy, Sparkles, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { UploadModal } from '@/components/documents/UploadModal';

export const ClauseLibraryPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'extracted' | 'templates'>('extracted');
  const [extractedClauses, setExtractedClauses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchClauses = () => {
    setLoading(true);
    api.getAllClauses()
      .then((data) => {
        setExtractedClauses(data || []);
      })
      .catch(() => {
        setExtractedClauses([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClauses();
  }, []);

  const approvedTemplates = [
    {
      id: 'tpl1',
      clause_type: 'Limitation of Liability (Standard)',
      title: 'Standard Mutual 1x TCV Cap',
      reference_text: 'EXCEPT FOR BREACHES OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS, NEITHER PARTY\'S AGGREGATE LIABILITY ARISING OUT OF THIS AGREEMENT SHALL EXCEED THE TOTAL FEES PAID OR PAYABLE BY CLIENT IN THE TWELVE (12) MONTH PERIOD PRECEDING THE CLAIM.'
    },
    {
      id: 'tpl2',
      clause_type: 'Indemnification (Standard Mutual)',
      title: 'Mutual Third-Party IP Indemnity',
      reference_text: 'Provider shall defend Client against any third-party claim alleging that the SaaS Platform infringes any US patent or copyright, and shall indemnify Client against all damages finally awarded.'
    },
    {
      id: 'tpl3',
      clause_type: 'Governing Law & Jurisdiction',
      title: 'Delaware Choice of Law & Exclusive Forum',
      reference_text: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any principles of conflicts of law.'
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Clause Intelligence & Library</h1>
          <p className="text-xs text-slate-500">Repository of extracted contract provisions and approved organizational reference templates</p>
        </div>
        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#0091FF] to-[#0D62FF] hover:brightness-105 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer border-0"
        >
          <Upload size={14} />
          <span>Scan / Upload Contract</span>
        </button>
      </div>

      <div className="flex items-center gap-2 bg-slate-200/60 p-1 rounded-xl w-fit text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('extracted')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer border-0 ${activeSubTab === 'extracted' ? 'bg-white shadow-xs text-[#0066FF]' : 'bg-transparent text-slate-600'}`}
        >
          Extracted Provisions ({extractedClauses.length})
        </button>
        <button
          onClick={() => setActiveSubTab('templates')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer border-0 ${activeSubTab === 'templates' ? 'bg-white shadow-xs text-[#0066FF]' : 'bg-transparent text-slate-600'}`}
        >
          Approved Reference Library ({approvedTemplates.length})
        </button>
      </div>

      {activeSubTab === 'extracted' ? (
        extractedClauses.length > 0 ? (
          <div className="space-y-4">
            {extractedClauses.map((c) => (
              <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-blue-100 text-[#0066FF] font-bold text-xs rounded-lg">
                    {c.clause_type}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {c.section_ref ? c.section_ref : `Page ${c.page_number || 1}`}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{c.plain_summary}</h4>
                <p className="text-xs font-serif italic text-slate-700 bg-slate-50 p-3 border rounded-xl leading-relaxed">
                  "{c.original_text}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-white rounded-3xl border border-dashed border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center shadow-xs">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No extracted clauses yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-medium">
                Upload a contract PDF or scan with camera to automatically extract key indemnification, liability, termination, and governing law clauses.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#0091FF] to-[#0D62FF] hover:brightness-105 text-white rounded-xl font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer border-0"
            >
              <Upload size={14} />
              <span>Upload or Scan Contract</span>
            </button>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {approvedTemplates.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg">
                  {t.clause_type}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(t.id, t.reference_text)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer border-0"
                >
                  {copiedId === t.id ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copiedId === t.id ? 'Copied' : 'Copy Clause Text'}</span>
                </button>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
              <p className="text-xs font-mono text-slate-800 bg-slate-50 p-3 border rounded-xl leading-relaxed">
                {t.reference_text}
              </p>
            </div>
          ))}
        </div>
      )}

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={fetchClauses}
      />
    </div>
  );
};
