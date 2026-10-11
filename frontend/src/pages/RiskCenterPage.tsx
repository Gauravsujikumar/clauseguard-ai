import React, { useEffect, useState } from 'react';
import { ShieldAlert, Filter, Search, CheckCircle2, XCircle, AlertTriangle, ArrowUpRight, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { NavLink } from 'react-router-dom';
import { UploadModal } from '@/components/documents/UploadModal';

export const RiskCenterPage: React.FC = () => {
  const [risks, setRisks] = useState<any[]>([]);
  const [severityFilter, setSeverityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchRisks = () => {
    setLoading(true);
    api.getAllRisks(severityFilter)
      .then((data) => {
        setRisks(data || []);
      })
      .catch(() => {
        setRisks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRisks();
  }, [severityFilter]);

  const handleUpdateStatus = async (riskId: string, status: string) => {
    try {
      await api.updateRiskStatus(riskId, status);
      setRisks(prev => prev.map(r => r.id === riskId ? { ...r, review_status: status } : r));
    } catch {
      setRisks(prev => prev.map(r => r.id === riskId ? { ...r, review_status: status } : r));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Risk Intelligence Center</h1>
          <p className="text-xs text-slate-500">Automated portfolio risk detection, severity scoring, and mitigation workflows</p>
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

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-slate-400" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0066FF] font-semibold outline-none"
          >
            <option value="">All Severities</option>
            <option value="High">High Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="Low">Low Severity</option>
          </select>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          {risks.length} {risks.length === 1 ? 'Risk' : 'Risks'} Identified
        </div>
      </div>

      {risks.length > 0 ? (
        <div className="space-y-4">
          {risks.map((risk) => (
            <div key={risk.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    risk.severity === 'High' 
                      ? 'bg-rose-100 text-rose-700' 
                      : risk.severity === 'Medium' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {risk.severity} Severity
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {risk.category} Category {risk.section_ref ? `• ${risk.section_ref}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(risk.id, 'Approved')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      risk.review_status === 'Approved' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
                    }`}
                  >
                    Accept Risk
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(risk.id, 'Mitigated')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      risk.review_status === 'Mitigated' ? 'bg-[#0066FF] text-white' : 'bg-slate-100 hover:bg-blue-50 text-slate-700'
                    }`}
                  >
                    Mitigate
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{risk.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{risk.explanation}</p>
              </div>

              {risk.supporting_passage && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-serif italic text-slate-700">
                  "{risk.supporting_passage}"
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Suggested Action: {risk.suggested_action}</span>
                {risk.document_id && (
                  <NavLink to={`/app/analysis?doc=${risk.document_id}`} className="font-bold text-[#0066FF] hover:underline flex items-center gap-1">
                    <span>View Evidence in Document</span>
                    <ArrowUpRight size={14} />
                  </NavLink>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 bg-white rounded-3xl border border-dashed border-slate-200 text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center shadow-xs">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No risk findings detected</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-medium">
              Upload a contract PDF or take a picture with your camera to detect uncapped liabilities, short cancellation windows, and compliance hazards.
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
        onUploadSuccess={fetchRisks}
      />
    </div>
  );
};
