import React, { useEffect, useState } from 'react';
import { CheckSquare, Calendar, Download, Filter, CheckCircle2, Clock, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { UploadModal } from '@/components/documents/UploadModal';

export const ObligationsPage: React.FC = () => {
  const [obligations, setObligations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchObligations = () => {
    setLoading(true);
    api.getAllObligations()
      .then((data) => {
        setObligations(data || []);
      })
      .catch(() => {
        setObligations([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchObligations();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateObligation(id, { status });
      setObligations(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch {
      setObligations(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contract Obligations & Milestones</h1>
          <p className="text-xs text-slate-500">Track calculated deadlines, renewal notification windows, and deliverables</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <Clock size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {obligations.filter(o => o.status === 'Pending').length}
            </div>
            <div className="text-xs font-semibold text-slate-500">Pending Obligations</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Calendar size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {obligations.filter(o => o.status === 'In Progress').length}
            </div>
            <div className="text-xs font-semibold text-slate-500">In Progress Deliverables</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {obligations.filter(o => o.status === 'Completed').length}
            </div>
            <div className="text-xs font-semibold text-slate-500">Completed & Verified</div>
          </div>
        </div>
      </div>

      {obligations.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {obligations.map((o) => (
              <div key={o.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      o.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      o.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {o.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Party: <strong className="text-slate-800">{o.responsible_party}</strong> → Beneficiary: <strong className="text-slate-800">{o.beneficiary}</strong>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{o.description}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{o.deadline_expression}</span>
                    </span>
                    {o.calculated_deadline && (
                      <span className="font-semibold text-brand-navy bg-slate-100 px-2 py-0.5 rounded">
                        Due: {o.calculated_deadline}
                      </span>
                    )}
                  </div>
                  {o.notes && (
                    <p className="text-xs text-slate-400 italic mt-1">{o.notes}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={o.status}
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                    className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-[#0066FF] outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-10 bg-white rounded-3xl border border-dashed border-slate-200 text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shadow-xs">
            <CheckSquare size={28} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No obligations or milestones yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-medium">
              Upload or scan a contract to automatically track renewal cancellation windows, milestone deliverables, and audit obligations.
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
      )}

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={fetchObligations}
      />
    </div>
  );
};
