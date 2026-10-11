import React, { useState } from 'react';
import {
  User,
  ChevronRight,
  Shield,
  Key,
  CreditCard,
  Moon,
  Globe,
  Bell,
  Sparkles,
  Lock,
  HardDrive,
  Download,
  Trash2,
  HelpCircle,
  Mail,
  Star,
  LogOut,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [theme, setTheme] = useState('System');
  const [language, setLanguage] = useState('English');
  const [savedToast, setSavedToast] = useState('');

  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(''), 2500);
  };

  const user = React.useMemo(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const displayName = user?.full_name || user?.name || (user?.email ? user.email.split('@')[0] : 'User');
  const displayEmail = user?.email || 'user@example.com';
  const initials = (() => {
    if (user?.full_name && user.full_name.trim()) {
      const parts = user.full_name.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return user.full_name.slice(0, 2).toUpperCase();
    }
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return 'U';
  })();

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-16">
      {/* Settings Title */}
      <div className="px-1">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal account, AI preferences, and security
        </p>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs border border-emerald-100">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* User Profile Card dynamically reflecting entered user and email */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-extrabold text-base shadow-sm">
            {initials}
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
              {displayName}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {displayEmail}
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-blue-50 text-[#0066FF] rounded-full text-[10px] font-bold">
              {user?.role || 'Pro Member'}
            </span>
          </div>
        </div>

        <button
          onClick={() => showToast('Profile editor opened')}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Section 1: Account */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
          Account
        </h3>
        <div className="bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] divide-y divide-slate-50 overflow-hidden">
          <button
            onClick={() => showToast('Edit Profile clicked')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Edit Profile</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Change Password dialog ready')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Key size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Change Password</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Subscription details loaded')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard size={16} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Manage Subscription</span>
                <span className="block text-[10px] text-slate-400">Renews on Nov 15, 2026</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                Pro Plan
              </span>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Section 2: Preferences */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
          Preferences
        </h3>
        <div className="bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] divide-y divide-slate-50 overflow-hidden">
          {/* Theme */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Moon size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Theme</span>
            </div>
            <select
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value);
                showToast(`Theme updated to ${e.target.value}`);
              }}
              className="text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border-0 focus:ring-1 focus:ring-[#0066FF]"
            >
              <option value="System">System Default</option>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          {/* Language */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Globe size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                showToast(`Language set to ${e.target.value}`);
              }}
              className="text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border-0 focus:ring-1 focus:ring-[#0066FF]"
            >
              <option value="English">English (US)</option>
              <option value="Spanish">Español</option>
              <option value="German">Deutsch</option>
              <option value="French">Français</option>
            </select>
          </div>

          {/* Notifications Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Notifications</span>
                <span className="block text-[10px] text-slate-400">Alerts on critical liabilities</span>
              </div>
            </div>
            <button
              onClick={() => {
                setNotifications(!notifications);
                showToast(`Notifications ${!notifications ? 'Enabled' : 'Disabled'}`);
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifications ? 'bg-[#0066FF]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Auto Analyze Uploaded Documents */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Auto-analyze uploads</span>
                <span className="block text-[10px] text-slate-400">Trigger AI scan immediately</span>
              </div>
            </div>
            <button
              onClick={() => {
                setAutoAnalyze(!autoAnalyze);
                showToast(`Auto-analyze ${!autoAnalyze ? 'Enabled' : 'Disabled'}`);
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                autoAnalyze ? 'bg-[#0066FF]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoAnalyze ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Data & Privacy */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
          Data & Privacy
        </h3>
        <div className="bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] divide-y divide-slate-50 overflow-hidden">
          <button
            onClick={() => showToast('Data & Privacy terms view')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lock size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Data & Privacy Policy</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Storage breakdown loaded')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <HardDrive size={16} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Manage Stored Files</span>
                <span className="block text-[10px] text-slate-400">14.8 MB of 10 GB used</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Data archive download initiated')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Download size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Export My Data (JSON/CSV)</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Please contact support for account deletion safety checks')}
            className="w-full p-4 flex items-center justify-between hover:bg-rose-50/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Trash2 size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-rose-600">Delete Account</span>
            </div>
            <ChevronRight size={16} className="text-rose-300" />
          </button>
        </div>
      </div>

      {/* Section 4: Support */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
          Support
        </h3>
        <div className="bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] divide-y divide-slate-50 overflow-hidden">
          <button
            onClick={() => showToast('Navigating to Help Center documentation')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <HelpCircle size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Help Center & FAQ</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Support contact email copied to clipboard')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Mail size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Contact Us</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={() => showToast('Thank you for rating ClauseGuard AI 5 stars!')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Rate the App</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>
        </div>
      </div>

      {/* Section 5: Log Out */}
      <div className="space-y-2 pt-1">
        <div className="bg-white rounded-2xl shadow-[0_2px_18px_rgba(0,0,0,0.02)] border border-rose-100/60 overflow-hidden">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="w-full p-4 flex items-center justify-between hover:bg-rose-50/70 transition-colors text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                <LogOut size={18} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-rose-600">Log Out</span>
                <span className="block text-[10px] text-slate-400">Sign out of your active ClauseGuard AI session</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-rose-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
