import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell } from 'lucide-react';

interface HeaderProps {
  user: any;
  onOpenUploadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const displayName = user?.full_name || user?.name || (user?.email ? user.email.split('@')[0] : 'User');
  const displayEmail = user?.email || '';

  const initials = (() => {
    if (user?.full_name && user.full_name.trim()) {
      const parts = user.full_name.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return user.full_name.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  })();

  return (
    <header className="h-16 flex items-center justify-between w-full">
      {/* Brand Icon Mark & Single Name */}
      <NavLink to="/app/dashboard" className="flex items-center gap-2.5 cursor-pointer no-underline">
        <img
          src="/assets/logo-mark.png"
          alt="ClauseGuard Emblem"
          className="h-8 w-auto object-contain rounded-lg shadow-2xs"
        />
        <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
          ClauseGuard <span className="text-[#0066FF]">AI</span>
        </span>
      </NavLink>

      {/* Header Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <button
          className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors border-0 bg-transparent cursor-pointer"
          title="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile Avatar Pill - Reflects actual entered user and email */}
        <NavLink
          to="/app/settings"
          className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer hover:opacity-90 transition-opacity no-underline"
          title={`${displayName}${displayEmail ? ` (${displayEmail})` : ''}`}
        >
          {initials}
        </NavLink>
      </div>
    </header>
  );
};
