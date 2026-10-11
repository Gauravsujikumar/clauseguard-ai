import React, { useState } from 'react';
import { GitPullRequest, MessageSquare, CheckCircle2, XCircle, UserCheck } from 'lucide-react';

export const WorkflowsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 'wf1',
      document: 'Acme Master SaaS Agreement',
      reviewer: 'Legal Counsel (Alex Vance)',
      deadline: '2026-10-15',
      status: 'Under Review',
      comments: 'Checking Section 12.2 uncapped liability clause before final executive approval.'
    },
    {
      id: 'wf2',
      document: 'Enterprise Vendor MSA - Q4',
      reviewer: 'Procurement Director (Sarah Jenkins)',
      deadline: '2026-10-18',
      status: 'Changes Requested',
      comments: 'Please request 90-day non-renewal notice window instead of 60 days.'
    }
  ]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review Workflows & Approvals</h1>
          <p className="text-xs text-slate-500">Collaborative team approval stages, reviewer assignments, and decision records</p>
        </div>
      </div>

      <div className="space-y-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitPullRequest size={20} className="text-brand-blue" />
                <h3 className="font-bold text-slate-900 text-sm">{wf.document}</h3>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-brand-blue text-xs font-bold rounded-full">
                {wf.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 block uppercase">Assigned Reviewer</span>
                <span className="font-bold text-slate-900">{wf.reviewer}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase">Review Deadline</span>
                <span className="font-bold text-slate-900">{wf.deadline}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <MessageSquare size={14} className="text-brand-blue" />
                <span>Reviewer Comments</span>
              </span>
              <p className="text-slate-600 leading-relaxed">{wf.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
