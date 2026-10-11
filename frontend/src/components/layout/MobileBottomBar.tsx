import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, BarChart2, Settings } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenUpload?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = () => {
  const tabs = [
    { name: 'Home', path: '/app/dashboard', icon: Home },
    { name: 'My Contracts', path: '/app/documents', icon: FileText },
    { name: 'Insights', path: '/app/insights', icon: BarChart2 },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <nav
      aria-label="Primary Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="w-full max-w-xl mx-auto px-3 sm:px-4 pb-2 pt-1 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100/80 px-2 sm:px-6 py-1.5 sm:py-2 flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex-1 min-w-0 flex flex-col items-center justify-center py-1 transition-colors ${
                    isActive ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={2.2} />
                    <span
                      className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight truncate max-w-full text-center ${
                        isActive ? 'text-[#0066FF] font-bold' : 'text-slate-500 font-medium'
                      }`}
                    >
                      {tab.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
