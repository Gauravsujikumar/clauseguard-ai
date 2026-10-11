import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail } from 'lucide-react';
import { api } from '@/lib/api';

export const TeamPage: React.FC = () => {
  const [members, setMembers] = useState([
    { id: 'u1', full_name: 'Demo Executive', email: 'demo@clauseguard.ai', role: 'Platform Administrator' },
    { id: 'u2', full_name: 'Alex Vance', email: 'alex.vance@company.com', role: 'Organization Administrator' },
    { id: 'u3', full_name: 'Sarah Jenkins', email: 'sarah.j@company.com', role: 'Reviewer' }
  ]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('Reviewer');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.inviteMember(inviteEmail, inviteName, inviteRole);
      setMembers(prev => [...prev, { id: Date.now().toString(), full_name: inviteName, email: inviteEmail, role: inviteRole }]);
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteName('');
    } catch {
      setMembers(prev => [...prev, { id: Date.now().toString(), full_name: inviteName, email: inviteEmail, role: inviteRole }]);
      setShowInviteModal(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Members & Role-Based Permissions</h1>
          <p className="text-xs text-slate-500">Manage organization members, assign roles, and configure tenant access boundaries</p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <UserPlus size={16} />
          <span>Invite Team Member</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
              <th className="py-3 px-4">Member Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Assigned Role</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{m.full_name}</td>
                <td className="py-3.5 px-4 text-slate-600">{m.email}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 bg-blue-100 text-brand-blue text-[10px] font-bold rounded-full">
                    {m.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Invite Team Member</h3>
            <form onSubmit={handleInvite} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Org Admin">Org Admin</option>
                  <option value="Reviewer">Reviewer</option>
                  <option value="Manager">Manager</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
