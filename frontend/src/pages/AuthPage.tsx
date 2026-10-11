import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react';
import { api } from '@/lib/api';

interface AuthPageProps {
  onLoginSuccess: (token: string, user: any) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, initialMode = 'signup' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = mode === 'signup'
        ? await api.register(email, password, fullName.trim() || 'New User')
        : await api.login(email, password);

      const resolvedUser = {
        ...(data.user || {}),
        email: data.user?.email || email.trim(),
        full_name: data.user?.full_name || (mode === 'signup' ? fullName.trim() : email.trim().split('@')[0]),
        role: data.user?.role || 'Org Admin'
      };

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(resolvedUser));
      onLoginSuccess(data.access_token, resolvedUser);
      navigate('/app/dashboard');
    } catch (err: any) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.detail;

      if (!err.response) {
        setError('Network error: Unable to reach backend server. Please check your internet connection.');
      } else if (status >= 500) {
        setError(typeof msg === 'string' ? msg : 'Backend server error. Please retry in a moment.');
      } else if (typeof msg === 'string') {
        setError(msg);
      } else if (Array.isArray(msg) && msg.length > 0) {
        setError(msg[0]?.msg || 'Please enter a valid email and password.');
      } else if (mode === 'signup') {
        setError('Registration failed. Please check your details and try again.');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen max-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans relative flex flex-col justify-between overflow-hidden selection:bg-blue-100 antialiased">
      
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#EEF2FF]" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[130px]" />
        <div className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-sky-200/20 rounded-full blur-[120px]" />
      </div>

      {/* Top Bar: Back Arrow on left, Clean Transparent Logo on right */}
      <header className="relative z-10 w-full max-w-lg mx-auto px-6 py-4 flex items-center justify-between shrink-0">
        {/* Just back arrow button */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#0066FF] border border-slate-200/80 shadow-xs flex items-center justify-center transition-all cursor-pointer"
          title="Back"
        >
          <ChevronLeft size={22} className="stroke-[2.5]" />
        </button>

        {/* Clean Transparent Logo - No White Border Box */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => navigate('/login')}
        >
          <img
            src="/assets/logo-mark.png"
            alt="ClauseGuard Emblem"
            className="h-9 w-auto object-contain drop-shadow-2xs"
          />
          <span className="font-black text-xl text-[#0B1A3D] tracking-tight leading-none">
            ClauseGuard <span className="text-[#0066FF]">AI</span>
          </span>
        </div>
      </header>

      {/* Centered Form Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-6 py-2 flex-1 min-h-0 flex items-center justify-center my-auto">
        <div className="w-full bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,102,255,0.12)] p-6 sm:p-8 transition-all">
          
          {/* Segmented Mode Switcher (Sign In / Create Account) */}
          <div className="flex p-1 bg-slate-100/80 rounded-2xl mb-4 border border-slate-200/60">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 text-[13.5px] font-bold rounded-xl transition-all cursor-pointer border-0 ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-[#0091FF] to-[#0D62FF] text-white shadow-md'
                  : 'bg-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 text-[13.5px] font-bold rounded-xl transition-all cursor-pointer border-0 ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-[#0091FF] to-[#0D62FF] text-white shadow-md'
                  : 'bg-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl sm:text-[26px] font-black text-[#0B1A3D] leading-[1.15] tracking-tight">
              {mode === 'signup' ? (
                <>
                  Create your <span className="text-[#0066FF]">account.</span>
                </>
              ) : (
                <>
                  Welcome <span className="text-[#0066FF]">back.</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-medium leading-relaxed">
              {mode === 'signup'
                ? 'Sign up to analyze contracts and detect liabilities with AI.'
                : 'Sign in to access your contracts and legal reports.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex flex-col gap-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-slate-200/90 rounded-2xl text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white shadow-xs transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[12px] font-bold text-[#1E293B] mb-1">
                Work Email
              </label>
              <div className="relative flex items-center">
                <Mail size={17} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/90 border border-slate-200/90 rounded-2xl text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white shadow-xs transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[12px] font-bold text-[#1E293B]">
                  Password
                </label>
                {mode === 'signin' && (
                  <a href="#forgot" className="text-[11.5px] font-bold text-[#0066FF] hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock size={17} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white/90 border border-slate-200/90 rounded-2xl text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white shadow-xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 border-0 bg-transparent cursor-pointer"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#0091FF] via-[#0066FF] to-[#0051FF] hover:brightness-105 active:scale-[0.99] text-white rounded-2xl font-bold text-[15px] tracking-wide shadow-[0_10px_24px_rgba(0,102,255,0.32)] transition-all flex items-center justify-center gap-2 mt-4 border-0 cursor-pointer"
            >
              <span>{loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={18} className="stroke-[2.5]" />
            </button>
          </form>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full max-w-lg mx-auto px-6 py-3 text-center text-[11px] font-medium text-slate-400 shrink-0">
        <span>© 2026 ClauseGuard AI</span>
      </footer>

    </div>
  );
};
