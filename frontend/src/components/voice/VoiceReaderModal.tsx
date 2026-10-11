import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Globe,
  Check,
  Copy,
  ShieldAlert,
  Lightbulb,
  Radio,
  Headphones,
  Sliders
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  RegionalLanguage,
  RegionalSpeechController,
  generateRegionalSpokenScript
} from '@/lib/regionalVoice';
import { api } from '@/lib/api';

interface VoiceReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentData?: any;
  singleRisk?: any;
  singleRecommendation?: string;
  singleExplanation?: string;
}

export const VoiceReaderModal: React.FC<VoiceReaderModalProps> = ({
  isOpen,
  onClose,
  documentData,
  singleRisk,
  singleRecommendation,
  singleExplanation
}) => {
  // Default to Telugu (తెలుగు) or Hindi (हिन्दी)
  const [selectedLang, setSelectedLang] = useState<RegionalLanguage>(SUPPORTED_LANGUAGES[0]);
  const [activeTab, setActiveTab] = useState<'full' | 'risks' | 'recommendations'>(
    singleRisk ? 'risks' : 'full'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [copied, setCopied] = useState(false);

  // Speech-to-Text / Speak-to-Ask state
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [spokenQuery, setSpokenQuery] = useState('');
  const [aiVoiceAnswer, setAiVoiceAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen) {
      RegionalSpeechController.stop();
      setIsPlaying(false);
      setIsPaused(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListeningMic(false);
    }
  }, [isOpen]);

  // Compute Spoken Script based on current selection
  const scriptData = React.useMemo(() => {
    if (singleRisk) {
      return generateRegionalSpokenScript(selectedLang.code, 'single', {
        title: documentData?.document?.title || 'Contract',
        singleRisk,
        singleRecommendation,
        singleExplanation
      });
    }

    const doc = documentData?.document;
    const summary = documentData?.summary;
    const risks = documentData?.risks || [];

    return generateRegionalSpokenScript(selectedLang.code, activeTab, {
      title: doc?.title,
      parties: summary?.parties,
      summaryText: summary?.detailed_summary || summary?.quick_summary || summary?.purpose,
      risks
    });
  }, [selectedLang, activeTab, documentData, singleRisk, singleRecommendation, singleExplanation]);

  // Play script in selected language
  const handlePlay = (textToSpeak?: string) => {
    const text = textToSpeak || aiVoiceAnswer || scriptData.script;
    if (!text) return;

    if (isPaused) {
      RegionalSpeechController.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    RegionalSpeechController.speak(
      text,
      selectedLang.code,
      playbackSpeed,
      () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      () => {
        setIsPlaying(false);
        setIsPaused(false);
      }
    );
  };

  const handlePause = () => {
    RegionalSpeechController.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    RegionalSpeechController.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    RegionalSpeechController.setPlaybackRate(speed);
  };

  // Switch language and immediately play in that language
  const handleSelectLanguage = (lang: RegionalLanguage) => {
    setSelectedLang(lang);
    RegionalSpeechController.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setAiVoiceAnswer(null);

    // Auto-play the new language script
    setTimeout(() => {
      const newScript = generateRegionalSpokenScript(
        lang.code,
        singleRisk ? 'single' : activeTab,
        {
          title: documentData?.document?.title,
          parties: documentData?.summary?.parties,
          summaryText: documentData?.summary?.detailed_summary || documentData?.summary?.quick_summary,
          risks: documentData?.risks,
          singleRisk,
          singleRecommendation,
          singleExplanation
        }
      );
      RegionalSpeechController.speak(
        newScript.script,
        lang.code,
        playbackSpeed,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }, 150);
  };

  // Switch section tabs and play
  const handleTabChange = (tab: 'full' | 'risks' | 'recommendations') => {
    setActiveTab(tab);
    RegionalSpeechController.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setAiVoiceAnswer(null);

    setTimeout(() => {
      const newScript = generateRegionalSpokenScript(
        selectedLang.code,
        tab,
        {
          title: documentData?.document?.title,
          parties: documentData?.summary?.parties,
          summaryText: documentData?.summary?.detailed_summary || documentData?.summary?.quick_summary,
          risks: documentData?.risks
        }
      );
      RegionalSpeechController.speak(
        newScript.script,
        selectedLang.code,
        playbackSpeed,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }, 150);
  };

  // Copy text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(aiVoiceAnswer || scriptData.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Speech-to-Text: Speak question into microphone
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition microphone is supported in Google Chrome and Microsoft Edge.');
      return;
    }

    if (isListeningMic) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListeningMic(false);
      return;
    }

    RegionalSpeechController.stop();
    setIsPlaying(false);

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang.code === 'te' ? 'te-IN' : selectedLang.code === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListeningMic(true);
      setSpokenQuery('');
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSpokenQuery(transcript);
      setIsListeningMic(false);

      if (documentData?.document?.id && transcript) {
        setIsAiLoading(true);
        try {
          const res = await api.askCopilot(documentData.document.id, transcript);
          const answer = res.answer || 'No answer found';
          setAiVoiceAnswer(answer);
          handlePlay(answer);
        } catch {
          setAiVoiceAnswer('Could not process voice request at this moment.');
        } finally {
          setIsAiLoading(false);
        }
      }
    };

    recognition.onerror = () => setIsListeningMic(false);
    recognition.onend = () => setIsListeningMic(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* TOP GLOSSY STUDIO HEADER */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#07132B] via-[#0E265C] to-[#0A1A40] text-white flex items-center justify-between border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Headphones size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full text-blue-200 border border-white/10">
                  Voice Accessibility
                </span>
                <span className="text-xs font-semibold text-blue-200/90 flex items-center gap-1">
                  <Globe size={13} />
                  <span>Regional Languages</span>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5 text-white">
                ClauseGuard Voice Studio
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border-0 active:scale-95"
            title="Close Voice Studio"
          >
            <X size={18} />
          </button>
        </div>

        {/* SCROLLABLE BODY CONTENT */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* 1. REGIONAL LANGUAGE SELECTION TILES */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span>Select Language</span>
                <span className="text-slate-400 font-medium">(భాషను ఎంచుకోండి / भाषा चुनें)</span>
              </label>
              <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Active: {selectedLang.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between relative group ${
                      isSelected
                        ? 'bg-gradient-to-br from-blue-500 to-[#0052CC] text-white border-transparent shadow-md shadow-blue-500/25 scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {lang.badge}
                      </span>
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-white text-[#0052CC] flex items-center justify-center">
                          <Check size={10} strokeWidth={3.5} />
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-400" />
                      )}
                    </div>
                    <span className={`text-base font-black tracking-tight mt-1.5 block ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {lang.nativeName}
                    </span>
                    <span className={`text-[10px] font-medium block mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {lang.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. PREMIUM AUDIO PLAYER DECK */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#09152E] via-[#0E2047] to-[#122A5C] text-white shadow-xl space-y-4 border border-blue-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Now Playing Header & Live Audio Waveform */}
            <div className="flex items-center justify-between relative z-10 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-400 shadow-[0_0_12px_#34D399] animate-ping' : 'bg-slate-500'}`} />
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300 block">
                    {isPlaying ? 'Authentic Neural Voice Active' : 'Ready to Listen'}
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {scriptData.shortHeadline} ({selectedLang.nativeName})
                  </span>
                </div>
              </div>

              {/* Dynamic Sound Equalizer Bar Animation */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-6 px-3 py-1 bg-white/10 rounded-xl">
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" />
                  <span className="w-1 bg-sky-400 rounded-full animate-bounce h-6" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1 bg-blue-400 rounded-full animate-bounce h-4" style={{ animationDelay: '0.3s' }} />
                  <span className="w-1 bg-indigo-300 rounded-full animate-bounce h-5" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s' }} />
                </div>
              )}
            </div>

            {/* Main Interactive Playback Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 relative z-10">
              
              {/* Play / Pause Primary Button */}
              <div className="flex items-center gap-2.5">
                {!isPlaying ? (
                  <button
                    onClick={() => handlePlay()}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white font-black text-sm flex items-center gap-2.5 shadow-lg shadow-blue-500/40 cursor-pointer active:scale-95 transition-all border-0"
                  >
                    <Play size={18} fill="currentColor" />
                    <span>Play Audio ({selectedLang.nativeName})</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/40 cursor-pointer active:scale-95 transition-all border-0"
                  >
                    <Pause size={18} fill="currentColor" />
                    <span>Pause Audio</span>
                  </button>
                )}

                <button
                  onClick={handleStop}
                  className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer border-0 active:scale-95"
                  title="Stop Audio"
                >
                  <RotateCcw size={17} />
                </button>
              </div>

              {/* Speed Controls: 0.8x, 1x, 1.2x */}
              <div className="flex items-center gap-1 bg-white/10 p-1.5 rounded-2xl border border-white/10">
                {[0.8, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
                      playbackSpeed === spd
                        ? 'bg-[#0066FF] text-white shadow-sm'
                        : 'text-slate-300 hover:text-white bg-transparent'
                    }`}
                  >
                    {spd}x {spd === 0.8 ? '(Slow)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Mic Speech-to-Text: Speak a Question */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleVoiceInput}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-0 ${
                    isListeningMic
                      ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40'
                      : 'bg-white/10 hover:bg-white/20 text-slate-100'
                  }`}
                  title="Speak into microphone"
                >
                  <Mic size={16} />
                  <span>{isListeningMic ? 'Listening to your voice...' : 'Speak Question with Mic'}</span>
                </button>
                <span className="text-[11px] text-slate-300 font-medium">
                  (Cannot read or type? Just speak)
                </span>
              </div>

              {isAiLoading && (
                <span className="text-xs text-blue-200 font-semibold animate-pulse flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>ClauseGuard is answering...</span>
                </span>
              )}
            </div>

            {spokenQuery && (
              <div className="p-3 bg-white/10 border border-white/15 rounded-xl text-xs text-slate-200">
                <span className="font-extrabold text-white">Heard: </span>
                <span>"{spokenQuery}"</span>
              </div>
            )}
          </div>

          {/* 3. SECTION CONTENT TABS (Only shown if document analysis has sections) */}
          {!singleRisk && (
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
              <button
                onClick={() => handleTabChange('full')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-0 shrink-0 ${
                  activeTab === 'full'
                    ? 'bg-[#0066FF] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🌟 Full Overview ({selectedLang.code === 'te' ? 'పూర్తి సారాంశం' : selectedLang.code === 'hi' ? 'पूरा सारांश' : 'Overview'})
              </button>
              <button
                onClick={() => handleTabChange('risks')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-0 shrink-0 ${
                  activeTab === 'risks'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ⚠️ Key Risks ({selectedLang.code === 'te' ? 'ముఖ్య ప్రమాదాలు' : selectedLang.code === 'hi' ? 'मुख्य जोखिम' : 'Risks'})
              </button>
              <button
                onClick={() => handleTabChange('recommendations')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-0 shrink-0 ${
                  activeTab === 'recommendations'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                💡 Advice & Actions ({selectedLang.code === 'te' ? 'సిఫారసులు' : selectedLang.code === 'hi' ? 'सलाह' : 'Advice'})
              </button>
            </div>
          )}

          {/* 4. READ-ALONG REGIONAL TRANSCRIPT BOX */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {scriptData.title}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer border-0 bg-transparent"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-base sm:text-lg text-slate-900 leading-relaxed font-semibold">
                "{aiVoiceAnswer || scriptData.script}"
              </p>
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            💡 Tap any language tile above to immediately hear the contract spoken in that language.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black cursor-pointer border-0 shadow-xs active:scale-95 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
