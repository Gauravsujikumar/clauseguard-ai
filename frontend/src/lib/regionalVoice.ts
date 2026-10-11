// Regional Language & Voice Accessibility Engine for ClauseGuard AI
// Features authentic neural audio streaming for 10+ regional languages

export interface RegionalLanguage {
  code: string; // ISO language code, e.g., 'te', 'hi', 'ta'
  ttsLang: string; // Google TTS code
  name: string; // English label
  nativeName: string; // Regional script label
  badge: string; // Flag / Script marker
  sampleGreeting: string;
}

export const SUPPORTED_LANGUAGES: RegionalLanguage[] = [
  {
    code: 'te',
    ttsLang: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    badge: '🇮🇳 TEL',
    sampleGreeting: 'నమస్కారం, క్లాజ్‌గార్డ్ వాయిస్ అసిస్టెంట్‌కు స్వాగతం.'
  },
  {
    code: 'hi',
    ttsLang: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    badge: '🇮🇳 HIN',
    sampleGreeting: 'नमस्ते, क्लॉजगार्ड ऑडियो में आपका स्वागत है।'
  },
  {
    code: 'ta',
    ttsLang: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    badge: '🇮🇳 TAM',
    sampleGreeting: 'வணக்கம், கிளாஸ்கார்ட் குரல் வழிகாட்டிக்கு வரவேற்கிறோம்.'
  },
  {
    code: 'kn',
    ttsLang: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    badge: '🇮🇳 KAN',
    sampleGreeting: 'ನಮಸ್ಕಾರ, ಕ್ಲಾಜ್‌ಗಾರ್ಡ್ ಧ್ವನಿ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ.'
  },
  {
    code: 'mr',
    ttsLang: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    badge: '🇮🇳 MAR',
    sampleGreeting: 'नमस्कार, क्लॉजगार्ड ऑडिओ सहाय्यकामध्ये आपले स्वागत आहे.'
  },
  {
    code: 'bn',
    ttsLang: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    badge: '🇮🇳 BEN',
    sampleGreeting: 'নমস্কার, ক্লজগার্ড অডিও সহায়কে আপনাকে স্বাগতম।'
  },
  {
    code: 'gu',
    ttsLang: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    badge: '🇮🇳 GUJ',
    sampleGreeting: 'નમસ્તે, ક્લોઝગાર્ડ ઓડિયો સહાયકમાં આપનું સ્વાગત છે.'
  },
  {
    code: 'ml',
    ttsLang: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    badge: '🇮🇳 MAL',
    sampleGreeting: 'നമസ്കാരം, ക്ലോസ്ഗാർഡ് വോയ്സ് അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം.'
  },
  {
    code: 'pa',
    ttsLang: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    badge: '🇮🇳 PAN',
    sampleGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਕਲਾਜ਼ਗਾਰਡ ਆਵਾਜ਼ ਸਹਾਇਕ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ।'
  },
  {
    code: 'en',
    ttsLang: 'en',
    name: 'English (India)',
    nativeName: 'English',
    badge: '🇮🇳 ENG',
    sampleGreeting: 'Hello, welcome to ClauseGuard Audio.'
  }
];

// Helper: Translate and generate authentic, crystal-clear regional spoken scripts
export function generateRegionalSpokenScript(
  langCode: string,
  mode: 'full' | 'summary' | 'risks' | 'recommendations' | 'single',
  data: {
    title?: string;
    parties?: string[];
    summaryText?: string;
    financialTerms?: string;
    duration?: string;
    risks?: any[];
    singleRisk?: any;
    singleRecommendation?: string;
    singleExplanation?: string;
  }
): { title: string; script: string; shortHeadline: string } {
  const code = langCode.slice(0, 2).toLowerCase();

  // Extract and sanitize exact contract facts
  const title = (data.title || 'Contract Agreement').trim();
  const parties = data.parties && data.parties.length > 0 ? data.parties.join(' and ') : '';
  const financial = (data.financialTerms && data.financialTerms !== 'Not specified in document') ? data.financialTerms : '';
  const duration = (data.duration && data.duration !== 'Not specified in document') ? data.duration : '';
  const summary = (data.summaryText || 'Standard terms governing performance, milestones, and liabilities.').trim();

  // Format exact identified risks
  const risksList = (data.risks || []).slice(0, 3).map((r: any, idx: number) => {
    const rTitle = r.title || `Risk ${idx + 1}`;
    const rExp = r.explanation || '';
    const rAction = r.suggested_action ? ` Action: ${r.suggested_action}` : '';
    return `${idx + 1}. ${rTitle}. ${rExp}${rAction}`;
  }).join(' ');

  const topRecommendation = data.risks && data.risks.length > 0 && data.risks[0].suggested_action
    ? data.risks[0].suggested_action
    : 'Review liability limits, penalty clauses, and termination terms before signing.';

  // 1. Single Risk Narration (Reads exact risk title, explanation, and recommendation)
  if (mode === 'single' && data.singleRisk) {
    const sTitle = data.singleRisk.title || 'Legal Risk';
    const sExp = data.singleRisk.explanation || '';
    const sAction = data.singleRecommendation || data.singleRisk.suggested_action || '';
    const sEasy = data.singleExplanation || data.singleRisk.easy_explanation || '';

    switch (code) {
      case 'te':
        return {
          shortHeadline: sTitle,
          title: `ప్రమాద విశ్లేషణ: ${sTitle}`,
          script: `ప్రమాదం: ${sTitle}. వివరాలు: ${sExp}. సిఫారసు: ${sAction}.${sEasy ? ` సులభ వివరణ: ${sEasy}` : ''}`
        };
      case 'hi':
        return {
          shortHeadline: sTitle,
          title: `जोखिम समीक्षा: ${sTitle}`,
          script: `जोखिम: ${sTitle}। विवरण: ${sExp}। सिफारिश: ${sAction}।${sEasy ? ` सरल व्याख्या: ${sEasy}` : ''}`
        };
      case 'ta':
        return {
          shortHeadline: sTitle,
          title: `ஆபத்து பகுப்பாய்வு: ${sTitle}`,
          script: `ஆபத்து: ${sTitle}. விளக்கம்: ${sExp}. பரிந்துரை: ${sAction}.${sEasy ? ` எளிய விளக்கம்: ${sEasy}` : ''}`
        };
      case 'kn':
        return {
          shortHeadline: sTitle,
          title: `ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ: ${sTitle}`,
          script: `ಅಪಾಯ: ${sTitle}. ವಿವರಣೆ: ${sExp}. ಶಿಫಾರಸು: ${sAction}.${sEasy ? ` ಸುಲಭ ವಿವರಣೆ: ${sEasy}` : ''}`
        };
      case 'mr':
        return {
          shortHeadline: sTitle,
          title: `धोका विश्लेषण: ${sTitle}`,
          script: `धोका: ${sTitle}. तपशील: ${sExp}. शिफारस: ${sAction}.${sEasy ? ` सोपे स्पष्टीकरण: ${sEasy}` : ''}`
        };
      case 'bn':
        return {
          shortHeadline: sTitle,
          title: `ঝুঁকি বিশ্লেষণ: ${sTitle}`,
          script: `ঝুঁকি: ${sTitle}। বিবরণ: ${sExp}। পরামর্শ: ${sAction}।${sEasy ? ` সহজ ব্যাখ্যা: ${sEasy}` : ''}`
        };
      case 'gu':
        return {
          shortHeadline: sTitle,
          title: `જોખમ વિશ્લેષણ: ${sTitle}`,
          script: `જોખમ: ${sTitle}. વિગત: ${sExp}. ભલામણ: ${sAction}.${sEasy ? ` સરળ સમજૂતી: ${sEasy}` : ''}`
        };
      case 'ml':
        return {
          shortHeadline: sTitle,
          title: `റിസ്ക് വിശകലനം: ${sTitle}`,
          script: `റിസ്ക്: ${sTitle}. വിശദാംശങ്ങൾ: ${sExp}. നിർദ്ദേശം: ${sAction}.${sEasy ? ` ലളിതമായ വിശദീകരണം: ${sEasy}` : ''}`
        };
      case 'pa':
        return {
          shortHeadline: sTitle,
          title: `ਜੋਖਮ ਵਿਸ਼ਲੇਸ਼ਣ: ${sTitle}`,
          script: `ਜੋਖਮ: ${sTitle}। ਵੇਰਵਾ: ${sExp}। ਸਲਾਹ: ${sAction}।${sEasy ? ` ਆਸਾਨ ਵਿਆਖਿਆ: ${sEasy}` : ''}`
        };
      default: // English
        return {
          shortHeadline: sTitle,
          title: `Risk Analysis: ${sTitle}`,
          script: `Risk: ${sTitle}. Details: ${sExp}. Recommended Action: ${sAction}.${sEasy ? ` Plain English explanation: ${sEasy}` : ''}`
        };
    }
  }

  // 2. Full Overview, Summary, Risks or Recommendations
  switch (code) {
    case 'te':
      if (mode === 'risks') {
        return {
          shortHeadline: `${title} - ప్రధాన ప్రమాదాలు`,
          title: `${title} ప్రమాదాల వివరాలు`,
          script: `శ్రద్ధ వహించండి. ${title} లో గుర్తించిన ప్రధాన రిస్కులు: ${risksList || 'తీవ్రమైన రిస్కులు ఏవీ లేవు.'} ముఖ్య సిఫారసు: ${topRecommendation}`
        };
      }
      if (mode === 'recommendations') {
        return {
          shortHeadline: `${title} - చట్టపరమైన సిఫారసులు`,
          title: `${title} చట్టపరమైన సలహాలు`,
          script: `${title} కోసం మా సిఫారసు: ${topRecommendation}. సంతకం చేయడానికి ముందు ఈ నిబంధనలను సవరించుకోండి.`
        };
      }
      return {
        shortHeadline: `${title} ఆడియో సారాంశం`,
        title: `${title} పూర్తి విశ్లేషణ`,
        script: `నమస్కారం, క్లాజ్‌గార్డ్ వాయిస్ విశ్లేషణ. ఒప్పందం: ${title}.${parties ? ` ఒప్పంద పక్షాలు: ${parties}.` : ''}${financial ? ` మొత్తం విలువ: ${financial}.` : ''}${duration ? ` కాలపరిమితి: ${duration}.` : ''} ప్రధాన సారాంశం: ${summary}. ${risksList ? `గుర్తించిన తీవ్రమైన ప్రమాదాలు: ${risksList}.` : ''} చట్టపరమైన సిఫారసు: ${topRecommendation}`
      };

    case 'hi':
      if (mode === 'risks') {
        return {
          shortHeadline: `${title} - मुख्य जोखिम`,
          title: `${title} में पाए गए प्रमुख खतरे`,
          script: `सावधानी बरतें। ${title} में पाए गए मुख्य कानूनी जोखिम: ${risksList || 'कोई गंभीर जोखिम नहीं पाया गया।'} प्रमुख सलाह: ${topRecommendation}`
        };
      }
      if (mode === 'recommendations') {
        return {
          shortHeadline: `${title} - कानूनी सलाह`,
          title: `${title} के लिए जरूरी बदलाव`,
          script: `${title} के लिए हमारी सिफारिश: ${topRecommendation}। हस्ताक्षर करने से पहले इन शर्तों पर सहमति सुनिश्चित करें।`
        };
      }
      return {
        shortHeadline: `${title} ऑडियो सारांश`,
        title: `${title} संपूर्ण अनुबंध सारांश`,
        script: `नमस्ते, क्लॉजगार्ड ऑडियो ब्रीफिंग। अनुबंध का नाम: ${title}।${parties ? ` अनुबंध के पक्ष: ${parties}।` : ''}${financial ? ` कुल अनुबंध मूल्य: ${financial}।` : ''}${duration ? ` समय सीमा: ${duration}।` : ''} मुख्य सारांश: ${summary}। ${risksList ? `प्रमुख कानूनी जोखिम: ${risksList}।` : ''} कानूनी सलाह: ${topRecommendation}`
      };

    case 'ta':
      return {
        shortHeadline: `${title} குரல் சுருக்கம்`,
        title: `${title} ஒப்பந்த சுருக்கம்`,
        script: `வணக்கம், கிளாஸ்கார்ட் குரல் வழிகாட்டி. ஒப்பந்தம்: ${title}.${parties ? ` ஒப்பந்த தரப்பினர்: ${parties}.` : ''}${financial ? ` மொத்த மதிப்பு: ${financial}.` : ''}${duration ? ` கால அளவு: ${duration}.` : ''} சுருக்கம்: ${summary}. ${risksList ? `முக்கிய ஆபத்துகள்: ${risksList}.` : ''} பரிந்துரை: ${topRecommendation}`
      };

    case 'kn':
      return {
        shortHeadline: `${title} ಧ್ವನಿ ಸಾರಾಂಶ`,
        title: `${title} ಒಪ್ಪಂದ ಸಾರಾಂಶ`,
        script: `ನಮಸ್ಕಾರ, ಕ್ಲಾಜ್‌ಗಾರ್ಡ್ ಧ್ವನಿ ಸಹಾಯಕ. ಒಪ್ಪಂದ: ${title}.${parties ? ` ಪಕ್ಷಗಳು: ${parties}.` : ''}${financial ? ` ಒಟ್ಟು ಮೌಲ್ಯ: ${financial}.` : ''}${duration ? ` ಅವಧಿ: ${duration}.` : ''} ಸಾರಾಂಶ: ${summary}. ${risksList ? `ಮುಖ್ಯ ಅಪಾಯಗಳು: ${risksList}.` : ''} ಸಲಹೆ: ${topRecommendation}`
      };

    case 'mr':
      return {
        shortHeadline: `${title} ऑडिओ सारांश`,
        title: `${title} करार सारांश`,
        script: `नमस्कार, क्लॉजगार्ड ऑडिओ सहाय्यक. करार: ${title}.${parties ? ` करारातील पक्ष: ${parties}.` : ''}${financial ? ` एकूण मूल्य: ${financial}.` : ''}${duration ? ` कालावधी: ${duration}.` : ''} सारांश: ${summary}. ${risksList ? `मुख्य धोके: ${risksList}.` : ''} सल्ला: ${topRecommendation}`
      };

    case 'bn':
      return {
        shortHeadline: `${title} অডিও সারসংক্ষেপ`,
        title: `${title} চুক্তির সারসংক্ষেপ`,
        script: `নমস্কার, ক্লজগার্ড অডিও সহায়ক। চুক্তি: ${title}।${parties ? ` চুক্তির পক্ষসমূহ: ${parties}।` : ''}${financial ? ` মোট মূল্য: ${financial}।` : ''}${duration ? ` মেয়াদ: ${duration}।` : ''} সারসংক্ষেপ: ${summary}। ${risksList ? `প্রধান ঝুঁকি: ${risksList}।` : ''} পরামর্শ: ${topRecommendation}`
      };

    case 'gu':
      return {
        shortHeadline: `${title} ઓડિયો સારાંશ`,
        title: `${title} કરાર સારાંશ`,
        script: `નમસ્તે, ક્લોઝગાર્ડ ઓડિયો સહાયક. કરાર: ${title}.${parties ? ` કરારના પક્ષકારો: ${parties}.` : ''}${financial ? ` કુલ મૂલ્ય: ${financial}.` : ''}${duration ? ` સમયગાળો: ${duration}.` : ''} સારાંશ: ${summary}. ${risksList ? `મુખ્ય જોખમો: ${risksList}.` : ''} સલાહ: ${topRecommendation}`
      };

    case 'ml':
      return {
        shortHeadline: `${title} വോയ്സ് സംഗ്രഹം`,
        title: `${title} കരാർ സംഗ്രഹം`,
        script: `നമസ്കാരം, ക്ലോസ്ഗാർഡ് വോയ്സ് അസിസ്റ്റന്റ്. കരാർ: ${title}.${parties ? ` കക്ഷികൾ: ${parties}.` : ''}${financial ? ` ആകെ മൂല്യം: ${financial}.` : ''}${duration ? ` കാലാവധി: ${duration}.` : ''} സംഗ്രഹം: ${summary}. ${risksList ? `പ്രധാന അപകടസാധ്യതകൾ: ${risksList}.` : ''} ഉപദേശം: ${topRecommendation}`
      };

    case 'pa':
      return {
        shortHeadline: `${title} ਆਵਾਜ਼ ਸੰਖੇਪ`,
        title: `${title} ਸਮਝੌਤੇ ਦਾ ਸੰਖੇਪ`,
        script: `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਕਲਾਜ਼ਗਾਰਡ ਆਵਾਜ਼ ਸਹਾਇਕ। ਸਮਝੌਤਾ: ${title}।${parties ? ` ਧਿਰਾਂ: ${parties}।` : ''}${financial ? ` ਕੁੱਲ ਮੁੱਲ: ${financial}।` : ''}${duration ? ` ਮਿਆਦ: ${duration}।` : ''} ਸੰਖੇਪ: ${summary}। ${risksList ? `ਮੁੱਖ ਖ਼ਤਰੇ: ${risksList}।` : ''} ਸਲਾਹ: ${topRecommendation}`
      };

    default: // English
      if (mode === 'risks') {
        return {
          shortHeadline: `${title} - Key Legal Risks`,
          title: `${title} Identified Risks`,
          script: `Attention: Here are the key risks identified in ${title}. ${risksList || 'No critical risks identified.'} Recommended Action: ${topRecommendation}`
        };
      }
      if (mode === 'recommendations') {
        return {
          shortHeadline: `${title} - Recommendations`,
          title: `${title} Actionable Advice`,
          script: `Recommendations for ${title}: ${topRecommendation}. Review and negotiate these items before signing.`
        };
      }
      return {
        shortHeadline: `${title} Audio Briefing`,
        title: `${title} Executive Overview`,
        script: `ClauseGuard Contract Briefing for ${title}.${parties ? ` Contracting Parties: ${parties}.` : ''}${financial ? ` Total Contract Value: ${financial}.` : ''}${duration ? ` Term and Duration: ${duration}.` : ''} Executive Summary: ${summary}. ${risksList ? `Key identified risks: ${risksList}.` : ''} Recommendation: ${topRecommendation}`
      };
  }
}

// Authentic Neural Audio Controller Class
export class RegionalSpeechController {
  private static currentAudio: HTMLAudioElement | null = null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static onAudioEndCallback: (() => void) | null = null;

  public static initVoices(): void {
    // Pre-warm audio support
  }

  public static speak(
    text: string,
    langCode: string,
    rate: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    this.stop();

    const shortLang = langCode.slice(0, 2).toLowerCase();
    this.onAudioEndCallback = onEnd || null;

    try {
      // 1. Play authentic neural stream via backend /api/v1/analysis/tts
      const ttsUrl = `/api/v1/analysis/tts?text=${encodeURIComponent(text)}&lang=${shortLang}`;
      const audio = new Audio(ttsUrl);
      audio.playbackRate = rate;

      audio.onplay = () => {
        if (onStart) onStart();
      };

      audio.onended = () => {
        this.currentAudio = null;
        if (this.onAudioEndCallback) this.onAudioEndCallback();
      };

      audio.onerror = () => {
        // Fallback to browser SpeechSynthesis if audio fetch fails
        this.fallbackSpeechSynthesis(text, langCode, rate, onStart, onEnd, onError);
      };

      this.currentAudio = audio;
      audio.play().catch(() => {
        // If autoplay blocked or error, fallback
        this.fallbackSpeechSynthesis(text, langCode, rate, onStart, onEnd, onError);
      });

      return true;
    } catch {
      return this.fallbackSpeechSynthesis(text, langCode, rate, onStart, onEnd, onError);
    }
  }

  private static fallbackSpeechSynthesis(
    text: string,
    langCode: string,
    rate: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onError) onError(new Error('Audio not supported'));
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = rate;

      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      if (onError) onError(e);
      return false;
    }
  }

  public static pause(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    } else if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public static resume(): void {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play().catch(() => {});
    } else if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public static stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public static setPlaybackRate(rate: number): void {
    if (this.currentAudio) {
      this.currentAudio.playbackRate = rate;
    }
  }

  public static isSpeaking(): boolean {
    if (this.currentAudio) {
      return !this.currentAudio.paused && !this.currentAudio.ended;
    }
    return !!(typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking);
  }

  public static isPaused(): boolean {
    if (this.currentAudio) {
      return this.currentAudio.paused && this.currentAudio.currentTime > 0;
    }
    return !!(typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.paused);
  }
}
