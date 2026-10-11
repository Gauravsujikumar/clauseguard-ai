import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Upload,
  Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { api } from '@/lib/api';
import { UploadModal } from '@/components/documents/UploadModal';

export const InsightsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('All Time');
  const [docs, setDocs] = useState<any[]>([]);
  const [risks, setRisks] = useState<any[]>([]);
  const [clauses, setClauses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchInsightsData = () => {
    setLoading(true);
    Promise.all([
      api.listDocuments().catch(() => []),
      api.getAllRisks().catch(() => []),
      api.getAllClauses().catch(() => [])
    ])
      .then(([docList, riskList, clauseList]) => {
        setDocs(docList || []);
        setRisks(riskList || []);
        setClauses(clauseList || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInsightsData();
  }, []);

  // Calculate real metrics
  const totalCount = docs.length;

  const highRisks = risks.filter((r) => r.severity === 'High');
  const medRisks = risks.filter((r) => r.severity === 'Medium');
  const lowRisks = risks.filter((r) => r.severity === 'Low');

  const highRiskCount = highRisks.length;
  const medRiskCount = medRisks.length;
  const lowRiskCount = lowRisks.length;
  const totalRisks = risks.length || 1;

  const riskDistribution = [
    {
      name: 'High Risk',
      value: highRiskCount,
      percent: `${Math.round((highRiskCount / totalRisks) * 100)}%`,
      color: '#EF4444'
    },
    {
      name: 'Medium Risk',
      value: medRiskCount,
      percent: `${Math.round((medRiskCount / totalRisks) * 100)}%`,
      color: '#F59E0B'
    },
    {
      name: 'Low Risk',
      value: lowRiskCount,
      percent: `${Math.round((lowRiskCount / totalRisks) * 100)}%`,
      color: '#10B981'
    }
  ].filter(item => item.value > 0);

  // Calculate top risk categories from real risks
  const categoryCounts: Record<string, number> = {};
  risks.forEach((r) => {
    const cat = r.category || 'General';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const topRiskCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({
      name,
      count: `${count} ${count === 1 ? 'risk' : 'risks'}`,
      percentage: Math.min(100, Math.round((count / totalRisks) * 100)),
      color: name.toLowerCase().includes('liability')
        ? 'bg-rose-500'
        : name.toLowerCase().includes('renewal')
        ? 'bg-amber-500'
        : name.toLowerCase().includes('financial')
        ? 'bg-blue-500'
        : 'bg-indigo-500'
    }));

  // Calculate top clauses from real clauses
  const clauseCounts: Record<string, number> = {};
  clauses.forEach((c) => {
    const type = c.clause_type || 'General';
    clauseCounts[type] = (clauseCounts[type] || 0) + 1;
  });

  const topKeyClauses = Object.entries(clauseCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({
      name,
      count,
      note: `Detected across ${Math.min(count, totalCount || 1)} contracts`
    }));

  return (
    <div className="w-full space-y-6 pb-6">
      {/* Header Title with Date Dropdown */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            Aggregated intelligence & cross-contract risk exposure
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer border-0"
        >
          <Plus size={15} />
          <span>Upload Contract</span>
        </button>
      </div>

      {/* 4 Metric Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
        {/* Total Contracts */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Total Contracts</span>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalCount}</span>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">Active in database</p>
          </div>
        </div>

        {/* High Risk */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">High Severity</span>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">{highRiskCount}</span>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">Critical attention needed</p>
          </div>
        </div>

        {/* Medium Risk */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Medium Severity</span>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-500">{medRiskCount}</span>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">Monitor during renewal</p>
          </div>
        </div>

        {/* Low Risk */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Low Severity</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{lowRiskCount}</span>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">Standard terms</p>
          </div>
        </div>
      </div>

      {totalCount > 0 ? (
        <>
          {/* Grid for Charts & Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Donut Chart: Risk Distribution */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  Risk Distribution
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">Total Risks: {risks.length}</span>
              </div>

              {riskDistribution.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={52}
                          outerRadius={72}
                          paddingAngle={4}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-lg font-extrabold text-slate-900 leading-none">{risks.length}</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">Risk Findings</span>
                    </div>
                  </div>

                  <div className="space-y-3 w-full sm:w-auto">
                    {riskDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900">{item.percent}</span>
                          <span className="text-[10px] sm:text-xs text-slate-400 ml-1.5">({item.value})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No risks logged across uploaded contracts.
                </div>
              )}
            </div>

            {/* Common Risk Categories */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  Risk Categories
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">Identified in Text</span>
              </div>

              {topRiskCategories.length > 0 ? (
                <div className="space-y-4 pt-1">
                  {topRiskCategories.map((risk) => (
                    <div key={risk.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-slate-800">{risk.name}</span>
                        <span className="font-semibold text-slate-500 text-[11px] sm:text-xs">{risk.count}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${risk.color} rounded-full transition-all duration-500`}
                          style={{ width: `${risk.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No category trends identified yet.
                </div>
              )}
            </div>
          </div>

          {/* Key Clauses Extracted Section */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] border border-slate-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                Key Clauses Detected
              </h3>
              <NavLink
                to="/app/clauses"
                className="text-xs sm:text-sm font-bold text-[#0066FF] hover:text-blue-700 flex items-center gap-1 group"
              >
                <span>View All Clauses</span>
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </NavLink>
            </div>

            {topKeyClauses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {topKeyClauses.map((clause) => (
                  <NavLink
                    key={clause.name}
                    to="/app/clauses"
                    className="p-3.5 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-100 transition-colors flex flex-col justify-between group"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors">
                        {clause.name}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">{clause.note}</p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <span className="px-2.5 py-0.5 rounded-full bg-white shadow-xs text-xs font-bold text-slate-700 border border-slate-100">
                        {clause.count} {clause.count === 1 ? 'clause' : 'clauses'}
                      </span>
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No clauses extracted yet.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-dashed border-slate-200 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shadow-xs">
            <TrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No portfolio analytics yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 font-medium">
              Upload your contracts to see real risk distributions, clause frequency, and compliance analytics.
            </p>
          </div>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#0091FF] to-[#0D62FF] hover:brightness-105 text-white rounded-xl font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer border-0"
          >
            <Plus size={15} />
            <span>Upload Your First Contract</span>
          </button>
        </div>
      )}

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onUploadSuccess={fetchInsightsData} />
    </div>
  );
};
