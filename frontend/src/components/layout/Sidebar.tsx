import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  ShieldAlert,
  BookOpen,
  GitCompare,
  CheckSquare,
  Calendar as CalendarIcon,
  GitPullRequest,
  BarChart3,
  Bot,
  Database,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, onLogout }) => {
  const navGroups = [
    {
      label: 'Core Intelligence',
      items: [
        { name: 'Overview', path: '/app/dashboard', icon: LayoutDashboard },
        { name: 'My Contracts', path: '/app/documents', icon: FileText },
        { name: 'Insights', path: '/app/insights', icon: BarChart3 },
        { name: 'AI Analysis', path: '/app/analysis', icon: Sparkles },
        { name: 'Risk Center', path: '/app/risks', icon: ShieldAlert },
        { name: 'Clause Library', path: '/app/clauses', icon: BookOpen },
        { name: 'Compare Contracts', path: '/app/compare', icon: GitCompare },
      ]
    },
    {
      label: 'Operations & Execution',
      items: [
        { name: 'Obligations', path: '/app/obligations', icon: CheckSquare },
        { name: 'Calendar', path: '/app/calendar', icon: CalendarIcon },
        { name: 'Review Workflows', path: '/app/workflows', icon: GitPullRequest },
        { name: 'Reports & Analytics', path: '/app/reports', icon: BarChart3 },
        { name: 'AI Assistant', path: '/app/copilot', icon: Bot },
        { name: 'Knowledge Base', path: '/app/knowledge', icon: Database },
      ]
    },
    {
      label: 'Organization',
      items: [
        { name: 'Team Members', path: '/app/team', icon: Users },
        { name: 'Settings', path: '/app/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-brand-navy text-white transition-all duration-300 flex flex-col border-r border-slate-800 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        <NavLink to="/app/dashboard" className="flex items-center gap-3 overflow-hidden">
          <img src="/assets/logo.png" alt="ClauseGuard AI" className="h-8 w-auto object-contain min-w-[32px]" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white leading-tight">ClauseGuard <span className="text-brand-accent">AI</span></span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Contracts Made Clear</span>
            </div>
          )}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            {!collapsed && (
              <h3 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.label}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-blue text-white shadow-md shadow-blue-900/40'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`
                    }
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon size={20} className="shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
