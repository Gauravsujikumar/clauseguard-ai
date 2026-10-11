import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Send,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Copy,
  Check,
  ShieldAlert,
  BookOpen,
  CheckSquare,
  Bot,
  Layers,
  Eye,
  X,
  Info,
  ExternalLink,
  Lightbulb,
  Mic,
  Volume2,
  Square,
  Globe,
  ChevronDown
} from 'lucide-react';
import { api } from '@/lib/api';
import { UploadModal } from '@/components/documents/UploadModal';
import { LANGUAGE_OPTIONS, getTranslatedContractData } from '@/lib/contractTranslations';
import { RegionalSpeechController, generateRegionalSpokenScript } from '@/lib/regionalVoice';

// Global memory cache for instant reopening without loading screens
const analysisMemoryCache: Record<string, any> = {};

// Helper: Provide plain-English easy explanation for contract recommendations
const getEasyExplanation = (risk: any): string => {
  const text = `${risk.title || ''} ${risk.explanation || ''} ${risk.suggested_action || ''} ${risk.category || ''}`.toLowerCase();
  
  if (text.includes('indemn') || text.includes('liabilit') || text.includes('uncapped') || text.includes('loss')) {
    return 'In plain English: If something goes wrong, you could be forced to pay unlimited damages out of pocket. To protect yourself, ask the other party to cap your maximum payout to the total fees paid under this agreement so you never risk more than you earn.';
  }
  if (text.includes('terminat') || text.includes('cancel') || text.includes('notice') || text.includes('lock')) {
    return 'In plain English: The other party could cancel unexpectedly or lock you in with heavy penalties. Request a mutual 30 to 60-day written notice period so both sides have sufficient time to transition smoothly.';
  }
  if (text.includes('intellectual property') || text.includes('ip') || text.includes('ownership') || text.includes('copyright') || text.includes('work for hire')) {
    return 'In plain English: The client could claim ownership over tools, code, or materials you already owned before this deal. Clarify in writing that you retain all pre-existing assets and they only own the customized final deliverables.';
  }
  if (text.includes('pay') || text.includes('fee') || text.includes('price') || text.includes('penalty') || text.includes('interest')) {
    return 'In plain English: Strict payment terms and immediate penalties could hurt your cash flow. Negotiate standard Net-30 payment timelines and add a 10-day grace period before any late fees or default interest can apply.';
  }
  if (text.includes('compete') || text.includes('solicit') || text.includes('restrict')) {
    return 'In plain English: This clause could stop you from taking other clients or hiring staff in the future. Ask to narrow this restriction only to direct competitors and limit the duration to a maximum of 1 year.';
  }
  if (text.includes('warrant') || text.includes('guarantee') || text.includes('defect')) {
    return 'In plain English: Promising absolute perfection is dangerous and difficult to guarantee. Change the wording to standard "commercially reasonable efforts" with a 30-day window to correct any issues.';
  }
  if (text.includes('confidential') || text.includes('nda') || text.includes('disclosure')) {
    return 'In plain English: Extremely broad secrecy rules could unintentionally restrict your regular business operations. Explicitly exclude information that is already public or developed independently.';
  }
  
  return 'In plain English: This clause shifts unnecessary legal and financial exposure onto your side. Propose the suggested compromise during contract negotiations before signing to ensure a balanced, safe partnership.';
};

export const AnalysisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [docId, setDocId] = useState<string | null>(searchParams.get('doc') || searchParams.get('id'));
  const currentMode = searchParams.get('mode') || 'all';

  // Check cache immediately for initial state
  const initialTargetId = searchParams.get('doc') || searchParams.get('id');
  const initialCached = initialTargetId ? (analysisMemoryCache[initialTargetId] || (() => {
    try {
      const stored = sessionStorage.getItem(`cg_analysis_${initialTargetId}`) || localStorage.getItem(`cg_analysis_${initialTargetId}`);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  })()) : null;

  const [analysisData, setAnalysisData] = useState<any>(initialCached);
  const [loading, setLoading] = useState<boolean>(!initialCached);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [viewerZoom, setViewerZoom] = useState(100);

  // Active Language Filter (English, Telugu, Hindi, etc.)
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Stop speech synthesis on component unmount
  useEffect(() => {
    return () => {
      RegionalSpeechController.stop();
    };
  }, []);

  const handleToggleSpeaker = (textOverride?: string) => {
    if (isSpeaking) {
      RegionalSpeechController.stop();
      setIsSpeaking(false);
      return;
    }

    const doc = analysisData?.document;
    const summary = analysisData?.summary;
    const risks = analysisData?.risks || [];

    const script = textOverride || generateRegionalSpokenScript(selectedLang, 'full', {
      title: doc?.title,
      parties: summary?.parties,
      summaryText: summaryMode === 'detailed' ? summary?.detailed_summary : summary?.quick_summary,
      financialTerms: summary?.financial_terms,
      duration: summary?.term_duration,
      risks
    }).script;

    RegionalSpeechController.speak(
      script,
      selectedLang,
      1.0,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleLanguageChange = (newLang: string) => {
    setSelectedLang(newLang);
    if (isSpeaking) {
      RegionalSpeechController.stop();
      setIsSpeaking(false);
      setTimeout(() => {
        const doc = analysisData?.document;
        const summary = analysisData?.summary;
        const risks = analysisData?.risks || [];
        const script = generateRegionalSpokenScript(newLang, 'full', {
          title: doc?.title,
          parties: summary?.parties,
          summaryText: summaryMode === 'detailed' ? summary?.detailed_summary : summary?.quick_summary,
          financialTerms: summary?.financial_terms,
          duration: summary?.term_duration,
          risks
        }).script;
        RegionalSpeechController.speak(
          script,
          newLang,
          1.0,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }, 150);
    }
  };

  // Main view switcher: 'report' vs 'copilot'
  const [activeView, setActiveView] = useState<'report' | 'copilot'>('report');
  const [summaryMode, setSummaryMode] = useState<'detailed' | 'quick'>('detailed');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedText, setCopiedText] = useState(false);
  const [copilotQuestion, setCopilotQuestion] = useState('');
  const [copilotMessages, setCopilotMessages] = useState<any[]>([
    {
      sender: 'ai',
      text: 'Hello! I have analyzed this contract. You can ask me any question about liability, payment terms, termination notice, or governing law.'
    }
  ]);
  const [copilotLoading, setCopilotLoading] = useState(false);

  const loadAnalysis = (targetId: string) => {
    setDocId(targetId);

    // 1. Instant Cache Retrieval: If already analyzed/opened, show immediately with 0 delay!
    let cached = analysisMemoryCache[targetId];
    if (!cached) {
      try {
        const stored = sessionStorage.getItem(`cg_analysis_${targetId}`) || localStorage.getItem(`cg_analysis_${targetId}`);
        if (stored) cached = JSON.parse(stored);
      } catch {
        cached = null;
      }
    }

    if (cached) {
      setAnalysisData(cached);
      setLoading(false);
      setCurrentPage(1);

      // Silent background refresh (does NOT trigger loading screen)
      api.getFullAnalysis(targetId)
        .then((fresh) => {
          analysisMemoryCache[targetId] = fresh;
          try {
            sessionStorage.setItem(`cg_analysis_${targetId}`, JSON.stringify(fresh));
            localStorage.setItem(`cg_analysis_${targetId}`, JSON.stringify(fresh));
          } catch {}
          setAnalysisData(fresh);
        })
        .catch(() => {});
      return;
    }

    // 2. First-time fetch
    setLoading(true);
    api.getFullAnalysis(targetId)
      .then((data) => {
        analysisMemoryCache[targetId] = data;
        try {
          sessionStorage.setItem(`cg_analysis_${targetId}`, JSON.stringify(data));
          localStorage.setItem(`cg_analysis_${targetId}`, JSON.stringify(data));
        } catch {}
        setAnalysisData(data);
        setCurrentPage(1);
      })
      .catch(() => {
        setAnalysisData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const paramId = searchParams.get('doc') || searchParams.get('id');
    if (paramId) {
      loadAnalysis(paramId);
    } else {
      api.listDocuments()
        .then((docs) => {
          if (docs && docs.length > 0) {
            loadAnalysis(docs[0].id);
          } else {
            setAnalysisData(null);
            setLoading(false);
          }
        })
        .catch(() => {
          setAnalysisData(null);
          setLoading(false);
        });
    }
  }, [searchParams]);

  const handleCopilotSend = async (e: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const query = customQuestion || copilotQuestion;
    if (!query.trim() || !docId) return;

    setCopilotMessages(prev => [...prev, { sender: 'user', text: query }]);
    setCopilotQuestion('');
    setCopilotLoading(true);

    try {
      const res = await api.askCopilot(docId, query);
      setCopilotMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          citations: res.citations
        }
      ]);
    } catch {
      setCopilotMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Unable to analyze question at this moment. Please verify backend connection.'
        }
      ]);
    } finally {
      setCopilotLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (docId) {
      window.open(`/api/v1/reports/${docId}/pdf`, '_blank');
    }
  };

  const handleCopyCurrentPage = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (loading && !analysisData) {
    return (
      <div className="py-24 text-center space-y-3 max-w-xl mx-auto">
        <div className="w-8 h-8 border-3 border-blue-200 border-t-[#0066FF] rounded-full animate-spin mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Loading Contract Findings...</h3>
        <p className="text-xs text-slate-400">Opening saved legal analysis and summary</p>
      </div>
    );
  }

  if (!analysisData || !analysisData.document) {
    return (
      <div className="p-8 bg-white rounded-3xl border border-dashed border-slate-200 text-center space-y-3 my-10 max-w-md mx-auto shadow-xs">
        <FileText size={32} className="mx-auto text-slate-300" />
        <h3 className="text-sm font-bold text-slate-900">No Document Selected</h3>
        <p className="text-xs text-slate-400">Please choose a contract from the home screen to view its analysis.</p>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2 bg-[#0066FF] text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0 mt-2"
        >
          Select Contract
        </button>
        <UploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUploadSuccess={() => window.location.reload()}
          targetMode={currentMode as any}
        />
      </div>
    );
  }

  const { document: doc, summary, risks = [], clauses = [], obligations = [], pages = [], metadata = [] } = analysisData;
  const totalPages = pages.length > 0 ? pages.length : (doc.page_count || 1);
  const activePageData = pages.find((p: any) => p.page_number === currentPage) || pages[0];
  const currentPageText = activePageData?.content || '';

  // Dynamically translate all page content based on the selected language
  const translated = getTranslatedContractData(selectedLang, summary, risks);
  const currentLangObj = LANGUAGE_OPTIONS.find((l) => l.code === selectedLang) || LANGUAGE_OPTIONS[0];

  // Filter strictly based on the clicked option
  const showSummary = currentMode === 'summary' || currentMode === 'all';
  const showRisks = currentMode === 'risks' || currentMode === 'all';
  const showClauses = currentMode === 'clauses' || currentMode === 'all';
  const showObligations = currentMode === 'obligations' || currentMode === 'all';

  return (
    <div className="w-full space-y-5 pb-12 max-w-4xl mx-auto">
      {/* 1. Header Bar: Clean & focused */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {doc.document_type ? (translated.translateMetadataValue ? translated.translateMetadataValue(doc.document_type) : doc.document_type) : (translated.ui.findingsBadge || 'Contract Analysis')}
            </span>
          </div>
          <h1 
            className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight truncate mt-1"
            title={doc.title}
          >
            {doc.title}
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {totalPages} {totalPages === 1 ? (translated.ui.pageLabel || 'Page') : (translated.ui.pagesLabel || 'Pages')} • {doc.original_filename || 'Original Document'}
          </p>
        </div>

        {/* View Switcher: Language Button, Original File & View Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-start sm:justify-end gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
          
          {/* Language Selector Popover */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/90 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
              title="Select Language / భాషను ఎంచుకోండి / भाषा चुनें"
            >
              <Globe size={14} className="text-[#0066FF]" />
              <span className="font-extrabold">{currentLangObj.nativeName}</span>
              {currentLangObj.code !== 'en' && (
                <span className="text-[10px] text-slate-400 font-semibold">({currentLangObj.name})</span>
              )}
              <ChevronDown size={13} className={`text-slate-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsLangMenuOpen(false)} 
                />
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xl w-72 sm:w-80 max-w-[calc(100vw-32px)] space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Select Language (భాష / भाषा)
                    </span>
                    <button
                      onClick={() => setIsLangMenuOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer border-0 bg-transparent"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-0.5">
                    {LANGUAGE_OPTIONS.map((lang) => {
                      const isSelected = selectedLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleLanguageChange(lang.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center sm:items-start text-center sm:text-left border active:scale-95 ${
                            isSelected
                              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                          }`}
                        >
                          <span className="font-extrabold text-xs">{lang.nativeName}</span>
                          <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            {lang.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsDocViewerOpen(true)}
            className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200/90 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="View Original Uploaded File / Scanned Stamp Paper"
          >
            <Eye size={15} />
            <span>{translated.ui.viewOriginalFile || 'View Original File'}</span>
          </button>

          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveView('report')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === 'report' ? 'bg-white shadow-xs text-[#0066FF]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {translated.ui.analysisReport || 'Analysis Report'}
            </button>
            <button
              onClick={() => setActiveView('copilot')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === 'copilot' ? 'bg-white shadow-xs text-[#0066FF]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {translated.ui.askQuestions || 'Ask Questions'}
            </button>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer border-0"
            title="Download PDF Report"
          >
            <Download size={16} />
          </button>
        </div>
      </div>



      {/* 3. VIEW: COPILOT QA */}
      {activeView === 'copilot' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Bot size={18} className="text-[#0066FF]" />
              <span>Contract Copilot QA</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ask specific legal or commercial questions about this contract.
            </p>
          </div>

          {/* Preset Question Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              'What is the liability cap?',
              'When does this contract renew?',
              'What are termination notice requirements?',
              'What is the governing jurisdiction?'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleCopilotSend(null as any, q)}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-xs font-semibold transition-colors cursor-pointer border border-blue-100"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="space-y-3 min-h-[350px] max-h-[500px] overflow-y-auto p-2">
            {copilotMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'bg-[#0066FF] text-white shadow-xs' : 'bg-slate-50 border border-slate-200/80 text-slate-800'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {copilotLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                  <span>Reviewing contract provisions...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleCopilotSend} className="flex gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Type your question..."
              value={copilotQuestion}
              onChange={(e) => setCopilotQuestion(e.target.value)}
              className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0066FF]"
            />
            <button
              type="submit"
              disabled={copilotLoading || !copilotQuestion.trim()}
              className="px-5 py-3 bg-[#0066FF] disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border-0"
            >
              <Send size={14} />
              <span>Ask</span>
            </button>
          </form>
        </div>
      )}

      {/* 4. VIEW: MAIN ANALYSIS REPORT */}
      {activeView === 'report' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* SECTION A: HIGHLIGHTED SUMMARY ANSWER BOX */}
          {showSummary && summary && (
            <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
              {/* Top Controls: Mode Switcher & Speaker (Centered in Middle) */}
              <div className="flex items-center justify-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setSummaryMode('detailed')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer border-0 ${
                        summaryMode === 'detailed' ? 'bg-white shadow-xs text-[#0066FF] font-bold' : 'text-slate-500 hover:text-slate-800 bg-transparent'
                      }`}
                    >
                      {translated.ui.detailed}
                    </button>
                    <button
                      onClick={() => setSummaryMode('quick')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer border-0 ${
                        summaryMode === 'quick' ? 'bg-white shadow-xs text-[#0066FF] font-bold' : 'text-slate-500 hover:text-slate-800 bg-transparent'
                      }`}
                    >
                      {translated.ui.quick}
                    </button>
                  </div>

                  {/* Simple small speaker icon (NO text, aligned right beside Quick tab) */}
                  <button
                    onClick={() => handleToggleSpeaker()}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer border-0 shadow-2xs ${
                      isSpeaking
                        ? 'bg-rose-600 text-white animate-pulse shadow-xs'
                        : 'bg-blue-50 hover:bg-blue-100 text-[#0066FF] hover:scale-105'
                    }`}
                    title={isSpeaking ? 'Stop Audio' : 'Read Aloud'}
                    aria-label="Speaker Read Aloud"
                  >
                    {isSpeaking ? (
                      <Square size={13} fill="currentColor" />
                    ) : (
                      <Volume2 size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Highlighted Key Entity Pills */}
              {(summary.parties?.length || summary.financial_terms) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {summary.parties?.length > 0 && (
                    <div className="p-3.5 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 border border-blue-200/80 rounded-2xl shadow-2xs">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                        {translated.ui.contractingParties}
                      </span>
                      <span className="text-xs font-bold text-slate-900 line-clamp-1 mt-1 block">
                        {summary.parties.join(' & ')}
                      </span>
                    </div>
                  )}
                  {summary.financial_terms && summary.financial_terms !== 'Not specified in document' && (
                    <div className="p-3.5 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-200/80 rounded-2xl shadow-2xs">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                        {translated.ui.consideration}
                      </span>
                      <span className="text-xs font-bold text-slate-900 line-clamp-1 mt-1 block">
                        {summary.financial_terms}
                      </span>
                    </div>
                  )}
                  {(summary.effective_date || summary.expiration_date) && (
                    <div className="p-3.5 bg-gradient-to-br from-purple-50/80 to-indigo-50/40 border border-purple-200/80 rounded-2xl shadow-2xs">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">
                        {translated.ui.termDuration}
                      </span>
                      <span className="text-xs font-bold text-slate-900 line-clamp-1 mt-1 block">
                        {summary.effective_date || 'Standard'} {summary.expiration_date ? `to ${summary.expiration_date}` : ''}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Highlighted Main Narrative Box (Translated Live) */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-white border border-blue-100 rounded-2xl shadow-inner">
                <div className="text-sm leading-relaxed text-slate-800 font-medium space-y-3 translated-content" data-lang={selectedLang}>
                  {summaryMode === 'quick' ? (
                    <p className="whitespace-pre-wrap">{translated.summary.quick_summary}</p>
                  ) : (
                    <p className="whitespace-pre-wrap">{translated.summary.detailed_summary}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECTION B: HIGHLIGHTED KEY RISKS */}
          {showRisks && risks && risks.length > 0 && (
            <div className="space-y-3">
              {risks.map((risk: any) => {
                const tRisk = translated.translateRisk(risk);
                const riskSpeech = `${tRisk.title}. ${tRisk.explanation}. ${tRisk.suggested_action}. ${tRisk.easy_explanation}`;

                return (
                  <div
                    key={risk.id}
                    className="p-5 sm:p-6 rounded-3xl border-2 border-rose-300/70 bg-gradient-to-r from-rose-50/50 via-white to-white shadow-[0_4px_20px_rgba(244,63,94,0.08)] ring-1 ring-rose-500/10 space-y-3 hover:border-rose-400 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                          {tRisk.severityLabel || `${risk.severity || 'High'} ${translated.ui.highRisk}`}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-700 font-bold text-[10px] uppercase">
                          {tRisk.category || (translated.translateCategory ? translated.translateCategory(risk.category) : risk.category) || 'Liability'}
                        </span>
                        <button
                          onClick={() => handleToggleSpeaker(riskSpeech)}
                          className="px-2.5 py-0.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] font-extrabold flex items-center gap-1 cursor-pointer transition-colors border border-rose-200/80 shadow-2xs"
                          title="Listen to this risk in selected language"
                        >
                          <Volume2 size={11} className="text-rose-600" />
                          <span>{isSpeaking ? (translated.ui.stopAction || 'Stop') : (translated.ui.listenAction || 'Listen')}</span>
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        {risk.section_ref || `${translated.ui.pageLabel || 'Page'} ${risk.page_number || 1}`}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug translated-content" data-lang={selectedLang}>
                      {tRisk.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium translated-content" data-lang={selectedLang}>
                      {tRisk.explanation}
                    </p>

                    {risk.supporting_passage && (
                      <div className="p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-2xl text-xs font-serif italic text-rose-950 leading-relaxed">
                        "{risk.supporting_passage}"
                      </div>
                    )}

                    {risk.suggested_action && (
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50/95 via-sky-50/60 to-indigo-50/50 border-2 border-blue-200/90 rounded-2xl shadow-sm space-y-3">
                        {/* Centered Recommendation Badge & Listen Button */}
                        <div className="flex items-center justify-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0066FF] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-xs">
                            <Sparkles size={13} className="stroke-[2.5]" />
                            <span>{translated.ui.recommendationBadge}</span>
                          </span>
                          <button
                            onClick={() => handleToggleSpeaker(`${tRisk.suggested_action}. ${tRisk.easy_explanation}`)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-[11px] border border-blue-200 shadow-2xs cursor-pointer transition-all"
                            title="Listen to recommendation in selected language"
                          >
                            <Volume2 size={12} className="text-[#0066FF]" />
                            <span>{isSpeaking ? (translated.ui.stopAction || 'Stop') : (translated.ui.listenAction || 'Listen')}</span>
                          </button>
                        </div>

                        {/* Centered Main Suggested Action */}
                        <div className="text-center px-2 sm:px-4">
                          <p className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug">
                            {tRisk.suggested_action}
                          </p>
                        </div>

                        {/* Plain-English Easy Explanation Callout Below It */}
                        <div className="pt-3 border-t border-blue-200/70 bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-blue-100 shadow-2xs text-left">
                          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-blue-700 mb-1">
                            <Lightbulb size={13} className="text-amber-500 shrink-0" />
                            <span>{translated.ui.easyExplanationTitle}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {tRisk.easy_explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION C: HIGHLIGHTED KEY CLAUSES */}
          {showClauses && clauses && clauses.length > 0 && (
            <div className="space-y-3">
              {clauses.map((c: any) => {
                const tClause = translated.translateClause(c);
                return (
                  <div 
                    key={c.id} 
                    className="p-5 sm:p-6 rounded-3xl border-2 border-emerald-300/70 bg-gradient-to-r from-emerald-50/40 via-white to-white shadow-[0_4px_20px_rgba(16,185,129,0.08)] ring-1 ring-emerald-500/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-emerald-600 text-white font-black text-[10px] rounded-lg uppercase tracking-wider shadow-xs">
                        {tClause.clause_type}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{c.section_ref}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{tClause.plain_summary}</p>

                    <div className="text-xs font-serif text-slate-800 bg-emerald-50/60 p-4 rounded-2xl leading-relaxed border border-emerald-200/70">
                      "{c.original_text}"
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION D: HIGHLIGHTED OBLIGATIONS WITH DETAILED LEGAL INTELLIGENCE */}
          {showObligations && obligations && obligations.length > 0 && (
            <div className="space-y-4">
              {obligations.map((o: any) => {
                const tObligation = translated.translateObligation(o);
                const deadlineLower = (o.deadline_expression || '').toLowerCase();
                
                let obligationTypeBg = 'bg-blue-50 text-[#0066FF] border-blue-200/80';
                if (deadlineLower.includes('ongoing') || deadlineLower.includes('daily') || deadlineLower.includes('throughout')) {
                  obligationTypeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
                } else if (deadlineLower.includes('month') || deadlineLower.includes('recurring') || deadlineLower.includes('5th')) {
                  obligationTypeBg = 'bg-purple-50 text-purple-700 border-purple-200/80';
                } else if (deadlineLower.includes('terminate') || deadlineLower.includes('notice') || deadlineLower.includes('as needed') || deadlineLower.includes('breach')) {
                  obligationTypeBg = 'bg-amber-50 text-amber-700 border-amber-200/80';
                }

                return (
                  <div 
                    key={o.id} 
                    className="p-5 sm:p-6 rounded-3xl border-2 border-amber-300/70 bg-gradient-to-r from-amber-50/30 via-white to-white shadow-[0_4px_20px_rgba(245,158,11,0.08)] ring-1 ring-amber-500/10 space-y-3.5"
                  >
                    {/* Top Row: Type & Status Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 border rounded-lg font-bold text-[10px] uppercase tracking-wider ${obligationTypeBg}`}>
                          {tObligation.type}
                        </span>
                        <span className={`px-2.5 py-0.5 font-black text-[10px] rounded-lg uppercase tracking-wider shadow-xs ${
                          o.status === 'Completed' ? 'bg-emerald-600 text-white' :
                          o.status === 'In Progress' ? 'bg-amber-500 text-white' :
                          'bg-slate-700 text-white'
                        }`}>
                          {tObligation.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                          <Clock size={12} />
                          <span>{o.deadline_expression ? (translated.translateMetadataValue ? translated.translateMetadataValue(o.deadline_expression) : o.deadline_expression) : (translated.ui.perTerms || 'Per Terms')}</span>
                        </span>
                        {o.calculated_deadline && (
                          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                            <Calendar size={12} className="text-slate-400" />
                            <span>{translated.ui.deadlineBadge || 'Due:'} {o.calculated_deadline}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Main Description */}
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        {tObligation.description}
                      </h4>
                    </div>

                    {/* Parties Breakdown */}
                    <div className="flex flex-wrap items-center gap-4 py-2 px-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">{translated.ui.responsibleParty || 'Responsible Party:'}</span>
                        <span className="font-extrabold text-slate-900">{o.responsible_party}</span>
                      </div>
                      {o.beneficiary && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 font-bold uppercase text-[10px]">{translated.ui.beneficiaryParty || 'Beneficiary:'}</span>
                          <span className="font-bold text-slate-800">{o.beneficiary}</span>
                        </div>
                      )}
                    </div>

                    {/* Detailed Understanding / Context Box */}
                    <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-2xl text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Info size={14} className="text-amber-600 shrink-0" />
                        <span>{translated.ui.whyThisStatus || 'Why this status & how to understand:'}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-5 font-medium">
                        {tObligation.explanation}
                        {o.notes ? ` ${translated.ui.directiveNotes || 'Directive notes:'} ${translated.translateMetadataValue ? translated.translateMetadataValue(o.notes) : o.notes}` : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ORIGINAL DOCUMENT VIEWER MODAL */}
      {isDocViewerOpen && (
        <div className="fixed inset-0 z-[100] w-screen h-screen bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-4xl h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                    {doc.original_filename || doc.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {doc.document_type || 'Original Upload'} • Scanned Document Viewer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-1">
                  <button 
                    onClick={() => setViewerZoom(prev => Math.max(50, prev - 25))} 
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer border-0 bg-transparent"
                    title="Zoom Out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="text-[11px] font-bold text-slate-600 px-1">{viewerZoom}%</span>
                  <button 
                    onClick={() => setViewerZoom(prev => Math.min(250, prev + 25))} 
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer border-0 bg-transparent"
                    title="Zoom In"
                  >
                    <ZoomIn size={15} />
                  </button>
                </div>

                <a
                  href={`/api/v1/documents/${doc.id}/download`}
                  download
                  className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-colors inline-flex items-center justify-center"
                  title="Download File"
                >
                  <Download size={15} />
                </a>

                <button
                  onClick={() => setIsDocViewerOpen(false)}
                  className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors cursor-pointer border-0"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body / Viewer Area */}
            <div className="flex-1 bg-slate-100/70 overflow-auto p-4 flex items-center justify-center relative">
              {doc.mime_type && doc.mime_type.includes('pdf') ? (
                <iframe
                  src={`/api/v1/documents/${doc.id}/view`}
                  className="w-full h-full rounded-2xl border border-slate-200 bg-white"
                  title="PDF Preview"
                />
              ) : (
                <div 
                  className="transition-transform duration-200 ease-out origin-center max-w-full max-h-full flex items-center justify-center"
                  style={{ transform: `scale(${viewerZoom / 100})` }}
                >
                  <img
                    src={`/api/v1/documents/${doc.id}/view`}
                    alt={doc.title}
                    className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-lg border border-slate-300/80 bg-white"
                    onError={(e) => {
                      // Fallback text preview if image cannot be loaded directly
                      (e.target as any).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

