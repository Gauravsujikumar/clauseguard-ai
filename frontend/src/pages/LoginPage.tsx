import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#EDF4FF] text-slate-900 font-sans relative flex flex-col justify-between items-center overflow-hidden selection:bg-blue-100 antialiased pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      
      {/* Ambient Mobile Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ambient bottom-left soft glow */}
        <div className="absolute -bottom-24 -left-24 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-blue-200/20 rounded-full blur-[100px]" />

        {/* Bottom fluid blue wave */}
        <div className="absolute bottom-0 left-0 w-full sm:w-[550px] h-[100px] sm:h-[160px] select-none pointer-events-none opacity-85">
          <img
            src="/assets/clean-bottom-wave.png"
            alt=""
            className="w-full h-full object-contain object-left-bottom"
          />
        </div>
      </div>

      {/* Mobile App Viewport Container */}
      <div className="relative z-10 w-full max-w-[420px] h-full flex flex-col justify-between px-6 sm:px-8 py-5 sm:py-8">
        
        {/* 1. TOP: Logo & Title Hierarchy with Clean Subtitle */}
        <div className="w-full">
          
          {/* Logo with clean subtitle directly below */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <img
              src="/assets/logo-mark.png"
              alt="ClauseGuard Emblem"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-[26px] text-[#0B1A3D] tracking-tight leading-none">
                ClauseGuard <span className="text-[#0066FF]">AI</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold tracking-wider mt-0.5 uppercase">
                Intelligent Legal Assistant
              </span>
            </div>
          </div>

          {/* Clean Mobile Headline & Value Copy (Not crowded) */}
          <div className="mt-4 sm:mt-6">
            <h1 className="text-[30px] sm:text-[38px] font-black text-[#0B1A3D] tracking-tight leading-[1.12]">
              Contracts <br />
              made <span className="text-[#0066FF]">clear.</span>
            </h1>
            <p className="text-[13.5px] sm:text-[15px] text-slate-500 mt-1.5 font-medium leading-snug">
              Understand terms, uncover liabilities, and stay compliant — with AI.
            </p>

            {/* Subtle, uncrowded feature tags */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-2.5 sm:mt-3.5 select-none">
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066FF] text-[10.5px] sm:text-[11px] font-bold">
                ⚡ Instant Analysis
              </span>
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100/90 border border-slate-200/70 text-slate-600 text-[10.5px] sm:text-[11px] font-semibold">
                🛡️ Risk Detection
              </span>
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100/90 border border-slate-200/70 text-slate-600 text-[10.5px] sm:text-[11px] font-semibold">
                🔒 100% Private
              </span>
            </div>
          </div>

        </div>

        {/* 2. CENTER: 3D Contract & Shield Graphic */}
        <div className="relative w-full flex items-center justify-center my-auto py-1 sm:py-2">
          {/* Subtle pedestal aura */}
          <div className="absolute w-48 sm:w-60 h-48 sm:h-60 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
          
          <img
            src="/assets/contract-shield-hd.png"
            alt="ClauseGuard AI Contracts Made Clear"
            className="w-56 sm:w-72 h-auto max-h-[175px] sm:max-h-[250px] object-contain select-none pointer-events-none filter drop-shadow-[0_14px_28px_rgba(0,102,255,0.20)]"
          />
        </div>

        {/* 3. BOTTOM: Single Radiant Action Button */}
        <div className="w-full pb-1">
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="w-full h-13 sm:h-14 bg-gradient-to-r from-[#0084FF] via-[#0066FF] to-[#0051FF] text-white rounded-2xl font-black text-base tracking-wide shadow-[0_10px_24px_rgba(0,102,255,0.32)] flex items-center justify-center gap-2.5 cursor-pointer border-0 select-none active:scale-[0.99] transition-transform"
          >
            <span>Let's Start</span>
            <ArrowRight size={19} className="stroke-[2.5]" />
          </button>
        </div>

      </div>

    </div>
  );
};
