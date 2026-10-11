// Comprehensive Multilingual Legal Dictionary and Dynamic Translation Helper
// Supports authentic translation across all major Indian regional languages

export interface UIStrings {
  findingsBadge: string;
  detailed: string;
  quick: string;
  contractingParties: string;
  consideration: string;
  termDuration: string;
  recommendationBadge: string;
  easyExplanationTitle: string;
  keyRisksBadge: string;
  highRisk: string;
  mediumRisk: string;
  lowRisk: string;
  speakerLabel: string;
  speakerPlaying: string;
  viewOriginalFile: string;
  clausesBadge: string;
  obligationsBadge: string;
  responsibleParty: string;
  beneficiaryParty: string;
  deadlineBadge: string;
  // Extended UI translations (optional on base, merged in getTranslatedContractData)
  analysisReport?: string;
  askQuestions?: string;
  extractionAccuracy?: string;
  confidenceSub?: string;
  fieldsBadge?: string;
  overallConfidence?: string;
  foundOnPage?: string;
  whyThisStatus?: string;
  directiveNotes?: string;
  perTerms?: string;
  listenAction?: string;
  stopAction?: string;
  pageLabel?: string;
  pagesLabel?: string;
}

export const REGIONAL_UI_STRINGS: Record<string, UIStrings> = {
  te: {
    findingsBadge: 'AI కాంట్రాక్ట్ విశ్లేషణ',
    detailed: 'వివరణాత్మక సారాంశం',
    quick: 'త్వరిత సారాంశం',
    contractingParties: 'ఒప్పంద పక్షాలు',
    consideration: 'ఆర్థిక నిబంధనలు / విలువ',
    termDuration: 'వ్యవధి మరియు రద్దు గడువు',
    recommendationBadge: 'సిఫారసు & పరిష్కారం',
    easyExplanationTitle: 'సులభ వివరణ & ఎందుకు ముఖ్యం',
    keyRisksBadge: 'ప్రధాన లీగల్ ప్రమాదాలు',
    highRisk: 'తీవ్ర ప్రమాదం',
    mediumRisk: 'మధ్యస్థ ప్రమాదం',
    lowRisk: 'తక్కువ ప్రమాదం',
    speakerLabel: 'చదివి వినిపించు (ఆడియో)',
    speakerPlaying: 'ఆడియో నడుస్తోంది...',
    viewOriginalFile: 'అసలు పత్రం చూడండి',
    clausesBadge: 'ముఖ్య నిబంధనలు',
    obligationsBadge: 'చట్టపరమైన బాధ్యతలు',
    responsibleParty: 'బాధ్యత గల పక్షం:',
    beneficiaryParty: 'లబ్ధిదారు:',
    deadlineBadge: 'గడువు:',
    analysisReport: 'విశ్లేషణ నివేదిక',
    askQuestions: 'ప్రశ్నలు అడగండి',
    extractionAccuracy: 'AI డేటా వెలికితీత ఖచ్చితత్వం',
    confidenceSub: 'గుర్తించిన ప్రతి అంశానికి సంబంధించిన విశ్వసనీయతా స్కోర్లు',
    fieldsBadge: 'అంశాలు',
    overallConfidence: 'మొత్తం వెలికితీత విశ్వసనీయత',
    foundOnPage: 'పేజీలో గుర్తించబడింది',
    whyThisStatus: 'ఈ స్థితి ఎందుకు & ఎలా అర్థం చేసుకోవాలి:',
    directiveNotes: 'సూచన గమనికలు:',
    perTerms: 'నిబంధనల ప్రకారం',
    listenAction: 'వినండి',
    stopAction: 'ఆపండి',
    pageLabel: 'పేజీ',
    pagesLabel: 'పేజీలు'
  },
  hi: {
    findingsBadge: 'AI अनुबंध निष्कर्ष',
    detailed: 'विस्तृत सारांश',
    quick: 'त्वरित सारांश',
    contractingParties: 'अनुबंध के पक्ष',
    consideration: 'वित्तीय शर्तें / मूल्य',
    termDuration: 'अवधि एवं समाप्ति नियम',
    recommendationBadge: 'सिफारिश एवं सुधार',
    easyExplanationTitle: 'सरल व्याख्या और यह क्यों जरूरी है',
    keyRisksBadge: 'मुख्य कानूनी जोखिम',
    highRisk: 'उच्च जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    lowRisk: 'कम जोखिम',
    speakerLabel: 'बोलकर सुनाएं (ऑडियो)',
    speakerPlaying: 'ऑडियो चल रहा है...',
    viewOriginalFile: 'मूल दस्तावेज़ देखें',
    clausesBadge: 'महत्वपूर्ण शर्तें',
    obligationsBadge: 'आवश्यक दायित्व',
    responsibleParty: 'जिम्मेदार पक्ष:',
    beneficiaryParty: 'लाभार्थी:',
    deadlineBadge: 'समय-सीमा:',
    analysisReport: 'विश्लेषण रिपोर्ट',
    askQuestions: 'प्रश्न पूछें',
    extractionAccuracy: 'AI निष्कर्षण सटीकता',
    confidenceSub: 'निकाले गए प्रत्येक डेटा बिंदु के लिए विश्वसनीयता स्कोर',
    fieldsBadge: 'फ़ील्ड',
    overallConfidence: 'समग्र निष्कर्षण सटीकता',
    foundOnPage: 'पृष्ठ पर पाया गया',
    whyThisStatus: 'यह स्थिति क्यों और इसे कैसे समझें:',
    directiveNotes: 'निर्देश टिप्पणियां:',
    perTerms: 'शर्तों के अनुसार',
    listenAction: 'सुनें',
    stopAction: 'रोकें',
    pageLabel: 'पृष्ठ',
    pagesLabel: 'पृष्ठ'
  },
  ta: {
    findingsBadge: 'AI ஒப்பந்த ஆய்வு',
    detailed: 'விரிவான சுருக்கம்',
    quick: 'சுருக்கம்',
    contractingParties: 'ஒப்பந்த தரப்பினர்',
    consideration: 'நிதி விதிமுறைகள் / மதிப்பு',
    termDuration: 'கால அளவு & முடித்தல்',
    recommendationBadge: 'பரிந்துரை & தீர்வு',
    easyExplanationTitle: 'எளிய விளக்கம் & முக்கியத்துவம்',
    keyRisksBadge: 'முக்கிய சட்ட அபாயங்கள்',
    highRisk: 'அதிக ஆபத்து',
    mediumRisk: 'நடுத்தர ஆபத்து',
    lowRisk: 'குறைந்த ஆபத்து',
    speakerLabel: 'குரலில் கேட்க (ஆடியோ)',
    speakerPlaying: 'ஆடியோ ஒலிக்கிறது...',
    viewOriginalFile: 'அசல் ஆவணத்தைப் பார்க்க',
    clausesBadge: 'முக்கிய விதிகள்',
    obligationsBadge: 'சட்டக் கடமைகள்',
    responsibleParty: 'பொறுப்பான தரப்பினர்:',
    beneficiaryParty: 'பயனாளி:',
    deadlineBadge: 'காலக்கெடு:',
    analysisReport: 'ஆய்வு அறிக்கை',
    askQuestions: 'கேள்விகள் கேட்க',
    extractionAccuracy: 'AI தகவல் பிரித்தெடுத்தல் துல்லியம்',
    confidenceSub: 'பிரித்தெடுக்கப்பட்ட ஒவ்வொரு விவரத்திற்கும் துல்லிய மதிப்பீடு',
    fieldsBadge: 'விவரங்கள்',
    overallConfidence: 'ஒட்டுமொத்த பிரித்தெடுத்தல் துல்லியம்',
    foundOnPage: 'பக்கத்தில் கண்டறியப்பட்டது',
    whyThisStatus: 'இந்த நிலை ஏன் & எவ்வாறு புரிந்துகொள்வது:',
    directiveNotes: 'வழிகாட்டல் குறிப்புகள்:',
    perTerms: 'விதிமுறைகளின்படி',
    listenAction: 'கேளுங்கள்',
    stopAction: 'நிறுத்து',
    pageLabel: 'பக்கம்',
    pagesLabel: 'பக்கங்கள்'
  },
  kn: {
    findingsBadge: 'AI ಒಪ್ಪಂದ ವಿಶ್ಲೇಷಣೆ',
    detailed: 'ವಿವರವಾದ ಸಾರಾಂಶ',
    quick: 'ತ್ವರಿತ ಸಾರಾಂಶ',
    contractingParties: 'ಒಪ್ಪಂದದ ಪಕ್ಷಗಳು',
    consideration: 'ಹಣಕಾಸು ನಿಯಮಗಳು / ಮೌಲ್ಯ',
    termDuration: 'ಅವಧಿ ಮತ್ತು ರದ್ದುಗೊಳಿಸುವಿಕೆ',
    recommendationBadge: 'ಶಿಫಾರಸು ಮತ್ತು ಪರಿಹಾರ',
    easyExplanationTitle: 'ಸುಲಭ ವಿವರಣೆ ಮತ್ತು ಮಹತ್ವ',
    keyRisksBadge: 'ಪ್ರಮುಖ ಕಾನೂನು ಅಪಾಯಗಳು',
    highRisk: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    mediumRisk: 'ಮಧ್ಯಮ ಅಪಾಯ',
    lowRisk: 'ಕಡಿಮೆ ಅಪಾಯ',
    speakerLabel: 'ಓದಿ ಹೇಳಿ (ಆಡಿಯೋ)',
    speakerPlaying: 'ಆಡಿಯೋ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
    viewOriginalFile: 'ಮೂಲ ದಾಖಲೆಯನ್ನು ವೀಕ್ಷಿಸಿ',
    clausesBadge: 'ಪ್ರಮುಖ ಷರತ್ತುಗಳು',
    obligationsBadge: 'ಕಾನೂನುಬದ್ಧ ಬಾಧ್ಯತೆಗಳು',
    responsibleParty: 'ಜವಾಬ್ದಾರಿಯುತ ಪಕ್ಷ:',
    beneficiaryParty: 'ಫಲಾನುಭವಿ:',
    deadlineBadge: 'ಗಡುವು:',
    analysisReport: 'ವಿಶ್ಲೇಷಣಾ ವರದಿ',
    askQuestions: 'ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ',
    extractionAccuracy: 'AI ಡೇಟಾ ಹೊರತೆಗೆಯುವಿಕೆ ನಿಖರತೆ',
    confidenceSub: 'ಪ್ರತಿ ಹೊರತೆಗೆಯಲಾದ ಡೇಟಾ ಅಂಶದ ವಿಶ್ವಾಸಾರ್ಹತೆ ಸ್ಕೋರ್',
    fieldsBadge: 'ಕ್ಷೇತ್ರಗಳು',
    overallConfidence: 'ಒಟ್ಟಾರೆ ಹೊರತೆಗೆಯುವಿಕೆ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    foundOnPage: 'ಪುಟದಲ್ಲಿ ಕಂಡುಬಂದಿದೆ',
    whyThisStatus: 'ಈ ಸ್ಥಿತಿ ಏಕೆ ಮತ್ತು ಹೇಗೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬೇಕು:',
    directiveNotes: 'ನಿರ್ದೇಶನ ಟಿಪ್ಪಣಿಗಳು:',
    perTerms: 'ಷರತ್ತುಗಳ ಪ್ರಕಾರ',
    listenAction: 'ಕೇಳಿ',
    stopAction: 'ನಿಲ್ಲಿಸಿ',
    pageLabel: 'ಪುಟ',
    pagesLabel: 'ಪುಟಗಳು'
  },
  mr: {
    findingsBadge: 'AI करार विश्लेषण',
    detailed: 'सविस्तर सारांश',
    quick: 'थोडक्यात सारांश',
    contractingParties: 'करारातील पक्ष',
    consideration: 'आर्थिक अटी / मूल्य',
    termDuration: 'मुदत आणि समाप्ती नियम',
    recommendationBadge: 'शिफारस व उपाय',
    easyExplanationTitle: 'सोपे स्पष्टीकरण व महत्त्व',
    keyRisksBadge: 'प्रमुख कायदेशीर धोके',
    highRisk: 'उच्च धोका',
    mediumRisk: 'मध्यम धोका',
    lowRisk: 'कमी धोका',
    speakerLabel: 'ऐका (ऑडिओ)',
    speakerPlaying: 'ऑडिओ चालू आहे...',
    viewOriginalFile: 'मूळ दस्तऐवज पहा',
    clausesBadge: 'महत्त्वाच्या अटी',
    obligationsBadge: 'कायदेशीर जबाबदाऱ्या',
    responsibleParty: 'जबाबदार पक्ष:',
    beneficiaryParty: 'लाभार्थी:',
    deadlineBadge: 'मुदत:',
    analysisReport: 'विश्लेषण अहवाल',
    askQuestions: 'प्रश्न विचारा',
    extractionAccuracy: 'AI माहिती निष्कर्ष अचूकता',
    confidenceSub: 'काढून घेतलेल्या प्रत्येक मुद्द्यासाठी अचूकता गुण',
    fieldsBadge: 'मुद्दे',
    overallConfidence: 'एकूण निष्कर्ष अचूकता',
    foundOnPage: 'पृष्ठावर आढळले',
    whyThisStatus: 'ही स्थिती का आणि कशी समजून घ्यावी:',
    directiveNotes: 'मार्गदर्शक टिपा:',
    perTerms: 'अटींनुसार',
    listenAction: 'ऐका',
    stopAction: 'थांबवा',
    pageLabel: 'पृष्ठ',
    pagesLabel: 'पृष्ठे'
  },
  bn: {
    findingsBadge: 'AI চুক্তি বিশ্লেষণ',
    detailed: 'বিস্তারিত সারসংক্ষেপ',
    quick: 'সংক্ষিপ্ত সারসংক্ষেপ',
    contractingParties: 'চুক্তির পক্ষসমূহ',
    consideration: 'আর্থিক শর্তাবলী / মূল্য',
    termDuration: 'মেয়াদ ও সমাপ্তির নিয়ম',
    recommendationBadge: 'সুপারিশ ও সমাধান',
    easyExplanationTitle: 'সহজ ব্যাখ্যা ও গুরুত্ব',
    keyRisksBadge: 'প্রধান আইনি ঝুঁকি',
    highRisk: 'উচ্চ ঝুঁকি',
    mediumRisk: 'মাঝারি ঝুঁকি',
    lowRisk: 'কম ঝুঁকি',
    speakerLabel: 'পড়ে শোনান (অডিও)',
    speakerPlaying: 'অডিও চলছে...',
    viewOriginalFile: 'মূল নথি দেখুন',
    clausesBadge: 'গুরুত্বপূর্ণ ধারা',
    obligationsBadge: 'আইনি বাধ্যবাধকতা',
    responsibleParty: 'দায়িত্বপ্রাপ্ত পক্ষ:',
    beneficiaryParty: 'উপকারভোগী:',
    deadlineBadge: 'সময়সীমা:',
    analysisReport: 'বিশ্লেষণ প্রতিবেদন',
    askQuestions: 'প্রশ্ন জিজ্ঞাসা করুন',
    extractionAccuracy: 'AI তথ্য নিষ্কাশন নির্ভুলতা',
    confidenceSub: 'প্রতিটি নিষ্কাশিত তথ্যের নির্ভুলতা স্কোর',
    fieldsBadge: 'ক্ষেত্র',
    overallConfidence: 'সামগ্রিক নিষ্কাশন নির্ভুলতা',
    foundOnPage: 'পৃষ্ঠায় পাওয়া গেছে',
    whyThisStatus: 'এই স্থিতি কেন এবং কীভাবে বুঝবেন:',
    directiveNotes: 'নির্দেশনা নোট:',
    perTerms: 'শর্তানুযায়ী',
    listenAction: 'শুনুন',
    stopAction: 'থামান',
    pageLabel: 'পৃষ্ঠা',
    pagesLabel: 'পৃষ্ঠাসমূহ'
  },
  gu: {
    findingsBadge: 'AI કરાર વિશ્લેષણ',
    detailed: 'વિગતવાર સારાંશ',
    quick: 'ઝડપી સારાંશ',
    contractingParties: 'કરારના પક્ષકારો',
    consideration: 'નાણાકીય શરતો / મૂલ્ય',
    termDuration: 'મુદત અને સમાપ્તિ નિયમો',
    recommendationBadge: 'ભલામણ અને ઉકેલ',
    easyExplanationTitle: 'સરળ સમજૂતી અને મહત્વ',
    keyRisksBadge: 'મુખ્ય કાનૂની જોખમો',
    highRisk: 'ઉચ્ચ જોખમ',
    mediumRisk: 'મધ્યમ જોખમ',
    lowRisk: 'ઓછું જોખમ',
    speakerLabel: 'સાંભળો (ઓડિયો)',
    speakerPlaying: 'ઓડિયો ચાલુ છે...',
    viewOriginalFile: 'મૂળ દસ્તાવેજ જુઓ',
    clausesBadge: 'મહત્વપૂર્ણ કલમો',
    obligationsBadge: 'કાનૂની જવાબદારીઓ',
    responsibleParty: 'જવાબદાર પક્ષ:',
    beneficiaryParty: 'લાભાર્થી:',
    deadlineBadge: 'સમયમર્યાદા:',
    analysisReport: 'વિશ્લેષણ અહેવાલ',
    askQuestions: 'પ્રશ્નો પૂછો',
    extractionAccuracy: 'AI ડેટા નિષ્કર્ષણ ચોકસાઈ',
    confidenceSub: 'તારવેલા દરેક મુદ્દા માટે ચોકસાઈ સ્કોર',
    fieldsBadge: 'મુદ્દાઓ',
    overallConfidence: 'સમગ્ર નિષ્કર્ષણ ચોકસાઈ',
    foundOnPage: 'પૃષ્ઠ પર મળેલ',
    whyThisStatus: 'આ સ્થિતિ શા માટે અને કેવી રીતે સમજવી:',
    directiveNotes: 'સૂચના નોંધો:',
    perTerms: 'શરતો મુજબ',
    listenAction: 'સાંભળો',
    stopAction: 'બંધ કરો',
    pageLabel: 'પૃષ્ઠ',
    pagesLabel: 'પૃષ્ઠો'
  },
  ml: {
    findingsBadge: 'AI കരാർ വിശകലനം',
    detailed: 'വിശദമായ സംഗ്രഹം',
    quick: 'ദ്രുത സംഗ്രഹം',
    contractingParties: 'കരാർ കക്ഷികൾ',
    consideration: 'സാമ്പത്തിക വ്യവസ്ഥകൾ / തുക',
    termDuration: 'കാലാവധിയും റദ്ദാക്കലും',
    recommendationBadge: 'ശുപാർശയും പരിഹാരവും',
    easyExplanationTitle: 'ലളിതമായ വിശദീകരണം',
    keyRisksBadge: 'പ്രധാന നിയമപരമായ അപകടസാധ്യതകൾ',
    highRisk: 'ഉയർന്ന അപകടസാധ്യത',
    mediumRisk: 'ഇടത്തരം അപകടസാധ്യത',
    lowRisk: 'കുറഞ്ഞ അപകടസാധ്യത',
    speakerLabel: 'ശബ്ദത്തിൽ കേൾക്കുക',
    speakerPlaying: 'ഓഡിയോ പ്ലേ ചെയ്യുന്നു...',
    viewOriginalFile: 'യഥാർത്ഥ രേഖ കാണുക',
    clausesBadge: 'പ്രധാന വ്യവസ്ഥകൾ',
    obligationsBadge: 'നിയമപരമായ ബാധ്യതകൾ',
    responsibleParty: 'ഉത്തരവാദപ്പെട്ട കക്ഷി:',
    beneficiaryParty: 'ഗുണഭോക്താവ്:',
    deadlineBadge: 'സമയപരിധി:',
    analysisReport: 'വിശകലന റിപ്പോർട്ട്',
    askQuestions: 'ചോദ്യങ്ങൾ ചോദിക്കുക',
    extractionAccuracy: 'AI വിവര ശേഖരണ കൃത്യത',
    confidenceSub: 'ശേഖരിച്ച ഓരോ വിവരത്തിന്റെയും കൃത്യതാ സ്കോർ',
    fieldsBadge: 'വിവരങ്ങൾ',
    overallConfidence: 'മൊത്തത്തിലുള്ള കൃത്യത',
    foundOnPage: 'പേജിൽ കണ്ടെത്തി',
    whyThisStatus: 'എന്തുകൊണ്ട് ഈ അവസ്ഥ & എങ്ങനെ മനസ്സിലാക്കാം:',
    directiveNotes: 'നിർദ്ദേശ കുറിപ്പുകൾ:',
    perTerms: 'വ്യവസ്ഥകൾ പ്രകാരം',
    listenAction: 'കേൾക്കൂ',
    stopAction: 'നിർത്തൂ',
    pageLabel: 'പേജ്',
    pagesLabel: 'പേജുകൾ'
  },
  pa: {
    findingsBadge: 'AI ਇਕਰਾਰਨਾਮਾ ਵਿਸ਼ਲੇਸ਼ਣ',
    detailed: 'ਵਿਸਤ੍ਰਿਤ ਸਾਰ',
    quick: 'ਸੰਖੇਪ ਸਾਰ',
    contractingParties: 'ਇਕਰਾਰਨਾਮੇ ਦੀਆਂ ਧਿਰਾਂ',
    consideration: 'ਵਿੱਤੀ ਸ਼ਰਤਾਂ / ਮੁੱਲ',
    termDuration: 'ਮਿਆਦ ਅਤੇ ਖਤਮ ਕਰਨ ਦੇ ਨਿਯਮ',
    recommendationBadge: 'ਸਿਫਾਰਸ਼ ਅਤੇ ਹੱਲ',
    easyExplanationTitle: 'ਸੌਖੀ ਵਿਆਖਿਆ ਅਤੇ ਮਹੱਤਵ',
    keyRisksBadge: 'ਮੁੱਖ ਕਾਨੂੰਨੀ ਜੋਖਮ',
    highRisk: 'ਉੱਚ ਜੋਖਮ',
    mediumRisk: 'ਦਰਮਿਆਨਾ ਜੋਖਮ',
    lowRisk: 'ਘੱਟ ਜੋਖਮ',
    speakerLabel: 'ਸੁਣੋ (ਆਡੀਓ)',
    speakerPlaying: 'ਆਡੀਓ ਚੱਲ ਰਿਹਾ ਹੈ...',
    viewOriginalFile: 'ਅਸਲ ਦਸਤਾਵੇਜ਼ ਦੇਖੋ',
    clausesBadge: 'ਮਹੱਤਵਪੂਰਨ ਧਾਰਾਵਾਂ',
    obligationsBadge: 'ਕਾਨੂੰਨੀ ਜ਼ਿੰਮੇਵਾਰੀਆਂ',
    responsibleParty: 'ਜ਼ਿੰਮੇਵਾਰ ਧਿਰ:',
    beneficiaryParty: 'ਲਾਭਪਾਤਰੀ:',
    deadlineBadge: 'ਆਖਰੀ ਮਿਤੀ:',
    analysisReport: 'ਵਿਸ਼ਲੇਸ਼ਣ ਰਿਪੋਰਟ',
    askQuestions: 'ਸਵਾਲ ਪੁੱਛੋ',
    extractionAccuracy: 'AI ਜਾਣਕਾਰੀ ਨਿਸ਼ਕਰਸ਼ਣ ਸ਼ੁੱਧਤਾ',
    confidenceSub: 'ਕੱਢੇ ਗਏ ਹਰੇਕ ਡੇਟਾ ਲਈ ਸ਼ੁੱਧਤਾ ਸਕੋਰ',
    fieldsBadge: 'ਖੇਤਰ',
    overallConfidence: 'ਸਮੁੱਚੀ ਨਿਸ਼ਕਰਸ਼ਣ ਸ਼ੁੱਧਤਾ',
    foundOnPage: 'ਪੰਨੇ ਤੇ ਮਿਲਿਆ',
    whyThisStatus: 'ਇਹ ਸਥਿਤੀ ਕਿਉਂ ਅਤੇ ਇਸਨੂੰ ਕਿਵੇਂ ਸਮਝਣਾ ਹੈ:',
    directiveNotes: 'ਨਿਰਦੇਸ਼ ਨੋਟਸ:',
    perTerms: 'ਸ਼ਰਤਾਂ ਅਨੁਸਾਰ',
    listenAction: 'ਸੁਣੋ',
    stopAction: 'ਰੋਕੋ',
    pageLabel: 'ਪੰਨਾ',
    pagesLabel: 'ਪੰਨੇ'
  },
  en: {
    findingsBadge: 'AI Contract Findings',
    detailed: 'Detailed',
    quick: 'Quick',
    contractingParties: 'Contracting Parties',
    consideration: 'Consideration / Value',
    termDuration: 'Term & Duration',
    recommendationBadge: 'Recommendation',
    easyExplanationTitle: 'Easy Explanation & Why It Matters',
    keyRisksBadge: 'Key Legal Risks',
    highRisk: 'High Risk',
    mediumRisk: 'Medium Risk',
    lowRisk: 'Low Risk',
    speakerLabel: 'Read Aloud (Voice)',
    speakerPlaying: 'Speaking Aloud...',
    viewOriginalFile: 'View Original File',
    clausesBadge: 'Key Clauses',
    obligationsBadge: 'Key Obligations',
    responsibleParty: 'Responsible Party:',
    beneficiaryParty: 'Beneficiary:',
    deadlineBadge: 'Deadline:',
    analysisReport: 'Analysis Report',
    askQuestions: 'Ask Questions',
    extractionAccuracy: 'AI Extraction Accuracy',
    confidenceSub: 'Confidence scores for each extracted data point',
    fieldsBadge: 'Fields',
    overallConfidence: 'Overall Extraction Confidence',
    foundOnPage: 'Found on page',
    whyThisStatus: 'Why this status & how to understand:',
    directiveNotes: 'Directive notes:',
    perTerms: 'Per Terms',
    listenAction: 'Listen',
    stopAction: 'Stop',
    pageLabel: 'Page',
    pagesLabel: 'Pages'
  }
};

// Metadata Field Name Translations
export const METADATA_FIELD_MAP: Record<string, Record<string, string>> = {
  'Key Parties': {
    te: 'ఒప్పంద పక్షాలు',
    hi: 'अनुबंध के पक्ष',
    ta: 'ஒப்பந்தக் கட்சிகள்',
    kn: 'ಒಪ್ಪಂದದ ಪಕ್ಷಗಳು',
    mr: 'करार पक्ष',
    bn: 'চুক্তির পক্ষসমূহ',
    gu: 'કરારના પક્ષકારો',
    ml: 'കരാർ കക്ഷികൾ',
    pa: 'ਇਕਰਾਰਨਾਮੇ ਦੀਆਂ ਧਿਰਾਂ'
  },
  'Document Type': {
    te: 'పత్రం రకం',
    hi: 'दस्तावेज़ का प्रकार',
    ta: 'ஆவண வகை',
    kn: 'ದಾಖಲೆಯ ಪ್ರಕಾರ',
    mr: 'दस्तऐवजाचा प्रकार',
    bn: 'নথির প্রকার',
    gu: 'દસ્તાવેજનો પ્રકાર',
    ml: 'രേഖയുടെ തരം',
    pa: 'ਦਸਤਾਵੇਜ਼ ਦੀ ਕਿਸਮ'
  },
  'Financial Terms': {
    te: 'ఆర్థిక నిబంధనలు / విలువ',
    hi: 'वित्तीय शर्तें / मूल्य',
    ta: 'நிதி விதிமுறைகள் / மதிப்பு',
    kn: 'ಹಣಕಾಸು ನಿಯಮಗಳು / ಮೌಲ್ಯ',
    mr: 'आर्थिक अटी / मूल्य',
    bn: 'আর্থিক শর্তাবলী / মূল্য',
    gu: 'નાણાકીય શરતો / મૂલ્ય',
    ml: 'സാമ്പത്തിക വ്യവസ്ഥകൾ / മൂല്യം',
    pa: 'ਵਿੱਤੀ ਸ਼ਰਤਾਂ / ਮੁੱਲ'
  },
  'Effective Date': {
    te: 'అమలులోకి వచ్చే తేదీ',
    hi: 'प्रभावी तिथि',
    ta: 'செயல்படும் தேதி',
    kn: 'ಜಾರಿಗೆ ಬರುವ ದಿನಾಂਕ',
    mr: 'लागू होण्याची तारीख',
    bn: 'কার্যকরী তারিখ',
    gu: 'અમલી તારીખ',
    ml: 'പ്രാബല്യത്തിൽ വരുന്ന തീയതി',
    pa: 'ਲਾਗੂ ਹੋਣ ਦੀ ਮਿਤੀ'
  },
  'Term / Expiration': {
    te: 'వ్యవధి / ముగింపు తేదీ',
    hi: 'अवधि / समाप्ति तिथि',
    ta: 'கால அளவு / காலாவதி',
    kn: 'ಅವಧಿ / ಮುಕ್ತಾಯ ದಿನಾಂਕ',
    mr: 'मुदत / समाप्ती तारीख',
    bn: 'মেয়াদ / সমাপ্তির তারিখ',
    gu: 'મુદત / સમાપ્તિ તારીખ',
    ml: 'കാലാവധി / അവസാന തീയതി',
    pa: 'ਮਿਆਦ / ਸਮਾਪਤੀ ਮਿਤੀ'
  },
  'Governing Law': {
    te: 'వర్తించే చట్టం & న్యాయ పరిధి',
    hi: 'लागू कानून एवं क्षेत्राधिकार',
    ta: 'பொருந்தக்கூடிய சட்டம் & அதிகார வரம்பு',
    kn: 'ಅನ್ವಯವಾಗುವ ಕಾನೂನು ಮತ್ತು ನ್ಯಾಯವ್ಯಾಪ್ತಿ',
    mr: 'लागू कायदा आणि अधिकारक्षेत्र',
    bn: 'প্রযোজ্য আইন ও এখতিয়ার',
    gu: 'લાગુ કાયદો અને અધિકારક્ષેત્ર',
    ml: 'ബാധകമായ നിയമവും അധികാരപരിധിയും',
    pa: 'ਲਾਗੂ ਕਾਨੂੰਨ ਅਤੇ ਅਧਿਕਾਰ ਖੇਤਰ'
  }
};

// Category Translations
export const CATEGORY_MAP: Record<string, Record<string, string>> = {
  'Liability': {
    te: 'నష్టపరిహార బాధ్యత',
    hi: 'देनदारी जोखिम',
    ta: 'பொறுப்பு ஆபத்து',
    kn: 'ಹೊಣೆಗಾರಿಕೆ ಅಪಾಯ',
    mr: 'जबाबदारी धोका',
    bn: 'দায়বদ্ধতা ঝুঁকি',
    gu: 'જવાબદારી જોખમ',
    ml: 'ബാധ്യത അപായം',
    pa: 'ਜ਼ਿੰਮੇਵਾਰੀ ਜੋਖਮ'
  },
  'Financial': {
    te: 'ఆర్థిక నిబంధన',
    hi: 'वित्तीय जोखिम',
    ta: 'நிதி ஆபத்து',
    kn: 'ಹಣಕಾಸು ಅಪಾಯ',
    mr: 'आर्थिक धोका',
    bn: 'আর্থিক ঝুঁকি',
    gu: 'નાણાકીય જોખમ',
    ml: 'സാമ്പത്തിക അപായം',
    pa: 'ਵਿੱਤੀ ਜੋਖਮ'
  },
  'Operational': {
    te: 'కార్యాచరణ విధి',
    hi: 'परिचालन जोखिम',
    ta: 'செயல்பாட்டு ஆபத்து',
    kn: 'ಕಾರ್ಯಾಚರಣೆ ಅಪಾಯ',
    mr: 'कार्यकारी धोका',
    bn: 'অপারেশনাল ঝুঁকি',
    gu: 'કાર્યકારી જોખમ',
    ml: 'പ്രവർത്തന അപായം',
    pa: 'ਕਾਰਜਕਾਰੀ ਜੋਖਮ'
  },
  'Compliance': {
    te: 'చట్టబద్ధత & నిబంధనలు',
    hi: 'अनुपालन जोखिम',
    ta: 'இணக்க ஆபத்து',
    kn: 'ಅನುಸರಣೆ ಅಪಾಯ',
    mr: 'अनुपालन धोका',
    bn: 'সম্মতি ঝুঁকি',
    gu: 'પાલન જોખમ',
    ml: 'പാലിക്കൽ അപായം',
    pa: 'ਪਾਲਣਾ ਜੋਖਮ'
  },
  'Renewal': {
    te: 'రెన్యూవల్ నిబంధన',
    hi: 'नवीनीकरण जोखिम',
    ta: 'புதுப்பித்தல் ஆபத்து',
    kn: 'ನವೀಕರಣ ಅಪಾಯ',
    mr: 'नूतनीकरण धोका',
    bn: 'নবায়ন ঝুঁকি',
    gu: 'નવીકરણ જોખમ',
    ml: 'പുതുക്കൽ അപായം',
    pa: 'ਨਵੀਨੀਕਰਨ ਜੋਖਮ'
  },
  'Termination': {
    te: 'ఒప్పంద రద్దు నిబంధన',
    hi: 'समाप्ति जोखिम',
    ta: 'ஒப்பந்த ரத்து ஆபத்து',
    kn: 'ರದ್ದತಿ ಅಪಾಯ',
    mr: 'समाप्ती धोका',
    bn: 'সমাপ্তি ঝুঁকি',
    gu: 'સમાપ્તિ જોખમ',
    ml: 'റദ്ദാക്കൽ അപായം',
    pa: 'ਸਮਾਪਤੀ ਜੋਖਮ'
  },
  'IP': {
    te: 'మేధో సంపత్తి హక్కులు',
    hi: 'बौद्धिक संपदा',
    ta: 'அறிவுசார் சொத்துரிமை',
    kn: 'ಬೌದ್ಧಿಕ ಆಸ್ತಿ',
    mr: 'बौद्धिक संपदा',
    bn: 'বুদ্ধিবৃত্তিক সম্পদ',
    gu: 'બૌદ્ધિક સંપત્તિ',
    ml: 'ബൗദ്ധിക സ്വത്ത്',
    pa: 'ਬੌਧਿਕ ਜਾਇਦਾਦ'
  }
};

// Intelligent Legal Sentence Translation Helper
export function translateLegalSentence(sentence: string, langCode: string): string {
  if (!sentence || langCode === 'en') return sentence;
  const code = langCode.slice(0, 2).toLowerCase();
  const lower = sentence.toLowerCase();

  // Liability & Indemnity patterns
  if (lower.includes('indemnif') || lower.includes('unlimited liability') || lower.includes('liability cap') || lower.includes('carve out')) {
    if (code === 'te') return 'ఈ నిబంధన ప్రకారం వివాదం జరిగితే ఎటువంటి గరిష్ట పరిమితి లేకుండా భారీ నష్టపరిహార బాధ్యత ఎదుర్కోవలసి రావచ్చు. బాధ్యతను ఒప్పంద ఫీజుకు మాత్రమే పరిమితం చేయాలి.';
    if (code === 'hi') return 'यह खंड विवाद की स्थिति में असीमित देनदारी का जोखिम पैदा करता है। क्षतिपूर्ति को अनुबंध मूल्य तक सीमित रखने के लिए संशोधन आवश्यक है।';
    if (code === 'ta') return 'இந்த விதி சர்ச்சையின் போது வரம்பற்ற இழப்பீட்டுப் பொறுப்பை ஏற்படுத்துகிறது. இழப்பீட்டை ஒப்பந்தத் தொகைக்கு மட்டுமே மட்டுப்படுத்த வேண்டும்.';
    if (code === 'kn') return 'ಈ ಷರತ್ತು ವಿವಾದದ ಸಂದರ್ಭದಲ್ಲಿ ಅನಿಯಮಿತ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ. ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಒಪ್ಪಂದದ ಮೊತ್ತಕ್ಕೆ ಮಾತ್ರ ಸೀಮಿತಗೊಳಿಸಬೇಕು.';
    if (code === 'mr') return 'ही अट विवादाच्या वेळी अमर्याद जबाबदारी निर्माण करते. नुकसानभरपाई कराराच्या मूल्यापर्यंत मर्यादित ठेवणे आवश्यक आहे.';
    if (code === 'bn') return 'এই ধারাটি বিরোধের ক্ষেত্রে সীমাহীন দায়বদ্ধতার ঝুঁকি তৈরি করে। ক্ষতিপূরণ চুক্তির মূল্যের মধ্যে সীমাবদ্ধ রাখা উচিত।';
    if (code === 'gu') return 'આ શરત વિવાદના કિસ્સામાં અમર્યાદિત જવાબદારી ઊભી કરે છે. જવાબદારીને કરાર મૂલ્ય સુધી મર્યાદિત રાખવી જોઈએ.';
    if (code === 'ml') return 'ഈ വ്യവസ്ഥ തർക്കമുണ്ടായാൽ പരിധിയില്ലാത്ത ബാധ്യതാ സാധ്യത ഉണ്ടാക്കുന്നു. നഷ്ടപരിഹാരം കരാർ തുകയിൽ പരിമിതപ്പെടുത്തണം.';
    if (code === 'pa') return 'ਇਹ ਧਾਰਾ ਝਗੜੇ ਦੇ ਸਮੇਂ ਬੇਅੰਤ ਜ਼ਿੰਮੇਵਾਰੀ ਖੜ੍ਹੀ ਕਰਦੀ ਹੈ। ਹਰਜਾਨਾ ਇਕਰਾਰਨਾਮੇ ਦੀ ਰਕਮ ਤੱਕ ਸੀਮਤ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।';
  }

  // Auto renewal & Termination patterns
  if (lower.includes('renew') || lower.includes('terminate') || lower.includes('notice period') || lower.includes('without cause') || lower.includes('lock-in')) {
    if (code === 'te') return 'ఒప్పందం స్వయంచాలకంగా పునరుద్ధరించబడే లేదా ముందస్తు నోటీస్ లేకుండా రద్దు చేయబడే అవకాశం ఉంది. కనీసం 30 రోజుల లిఖితపూర్వక నోటీస్ వ్యవధిని చేర్చండి.';
    if (code === 'hi') return 'अनुबंध स्वतः नवीनीकृत होने या बिना उचित सूचना समाप्त होने का जोखिम है। कम से कम 30 दिनों की लिखित पूर्व सूचना अनिवार्य करें।';
    if (code === 'ta') return 'ஒப்பந்தம் தானாகப் புதுப்பிக்கப்படலாம் அல்லது அறிவிப்பின்றி ரத்து செய்யப்படலாம். குறைந்தபட்சம் 30 நாட்கள் எழுத்துப்பூர்வ அறிவிப்பைச் சேர்க்கவும்.';
    if (code === 'kn') return 'ಒಪ್ಪಂದವು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನವೀಕರಣಗೊಳ್ಳುವ ಅಥವಾ ಮುನ್ಸೂಚನೆಯಿಲ್ಲದೆ ರದ್ದುಗೊಳ್ಳುವ ಅಪಾಯವಿದೆ. ಕನಿಷ್ಠ 30 ದಿನಗಳ ಲಿಖಿತ ಸೂಚನೆ ಸೇರಿಸಿ.';
    if (code === 'mr') return 'करार आपोआप नूतनीकरण होण्याचा किंवा पूर्वसूचनेशिवाय रद्द होण्याचा धोका आहे. किमान ३० दिवसांची लेखी नोटीस बंधनकारक करा.';
    if (code === 'bn') return 'চুক্তি স্বয়ংক্রিয়ভাবে নবায়ন বা নোটিশ ছাড়াই সমাপ্ত হওয়ার ঝুঁকি রয়েছে। কমপক্ষে ৩০ দিনের লিখিত নোটিশ অন্তর্ভুক্ত করুন।';
    if (code === 'gu') return 'કરાર આપમેળે રિન્યૂ થવાનું અથવા નોટિસ વિના સમાપ્ત થવાનું જોખમ છે. ઓછામાં ઓછી 30 દિવસની લેખિત નોટિસ ઉમેરો.';
    if (code === 'ml') return 'കരാർ തനിയെ പുതുക്കപ്പെടാനോ മുന്നറിയിപ്പില്ലാതെ റദ്ദാക്കപ്പെടാനോ സാധ്യതയുണ്ട്. കുറഞ്ഞത് 30 ദിവസത്തെ രേഖാമൂലമുള്ള നോട്ടീസ് ഉറപ്പാക്കുക.';
    if (code === 'pa') return 'ਇਕਰਾਰਨਾਮਾ ਆਪਣੇ ਆਪ ਨਵਿਆਇਆ ਜਾ ਸਕਦਾ ਹੈ ਜਾਂ ਬਿਨਾਂ ਨੋਟਿਸ ਖਤਮ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ। ਘੱਟੋ-ਘੱਟ 30 ਦਿਨਾਂ ਦਾ ਲਿਖਤੀ ਨੋਟਿਸ ਲਾਜ਼ਮੀ ਕਰੋ।';
  }

  // Payment, deposit & penalty patterns
  if (lower.includes('pay') || lower.includes('fee') || lower.includes('penalty') || lower.includes('interest') || lower.includes('forfeit') || lower.includes('deposit')) {
    if (code === 'te') return 'చెల్లింపులో జాప్యం జరిగితే కఠినమైన జరిమానాలు లేదా అడ్వాన్స్ జప్తు చేసే ప్రమాదం ఉంది. 15 రోజుల ముందస్తు గడువు (క్యూర్‌ పిరియడ్) చేర్చండి.';
    if (code === 'hi') return 'भुगतान में देरी होने पर भारी जुर्माना या अग्रिम जब्ती का जोखिम है। 15 दिनों की पूर्व सूचना और सुधार अवधि (Cure Period) जोड़ें।';
    if (code === 'ta') return 'பணம் செலுத்துவதில் தாமதம் ஏற்பட்டால் கடுமையான அபராதம் அல்லது முன்பண இழப்பு ஏற்படும். 15 நாட்கள் கூடுதல் கால அவகாசம் கோரவும்.';
    if (code === 'kn') return 'ಪಾವತಿಯಲ್ಲಿ ವಿಳಂಬವಾದರೆ ಕಠಿಣ ದಂಡ ಅಥವಾ ಮುಂಗಡ ಹಣ ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಳ್ಳುವ ಅಪಾಯವಿದೆ. 15 ದಿನಗಳ ಮುನ್ಸೂಚನೆ ಅವಧಿ ಸೇರಿಸಿ.';
    if (code === 'mr') return 'पेमेंटमध्ये विलंब झाल्यास मोठा दंड किंवा आगाऊ रक्कम जप्त होण्याचा धोका आहे. १५ दिवसांची सुधारणा मुदत (Cure Period) जोडा.';
    if (code === 'bn') return 'পেমেন্টে বিলম্ব হলে ভারী জরিমানা বা অগ্রিম বাজেয়াপ্তির ঝুঁকি রয়েছে। ১৫ দিনের অতিরিক্ত সময় ও নোটিশ অন্তর্ভুক্ত করুন।';
    if (code === 'gu') return 'ચુકવણીમાં વિલંબ પર ભારે દંડ અથવા એડવાન્સ જપ્ત થવાનું જોખમ છે. 15 દિવસની લેખિત નોટિસ અને સુધાર સમયગાળો ઉમેરો.';
    if (code === 'ml') return 'പേയ്‌മെന്റ് വൈകിയാൽ കനത്ത പിഴയോ അഡ്വാൻസ് നഷ്ടപ്പെടലോ ഉണ്ടാകാം. 15 ദിവസത്തെ തിരുത്തൽ സമയം ഉറപ്പാക്കുക.';
    if (code === 'pa') return 'ਭੁਗਤਾਨ ਵਿੱਚ ਦੇਰੀ ਤੇ ਭਾਰੀ ਜੁਰਮਾਨਾ ਜਾਂ ਪੇਸ਼ਗੀ ਜ਼ਬਤ ਹੋਣ ਦਾ ਖ਼ਤਰਾ ਹੈ। 15 ਦਿਨਾਂ ਦਾ ਸੁਧਾਰ ਸਮਾਂ ਜ਼ਰੂਰ ਜੋੜੋ।';
  }

  // Intellectual property & Non-compete
  if (lower.includes('intellectual property') || lower.includes('ip') || lower.includes('work for hire') || lower.includes('compete') || lower.includes('confidential')) {
    if (code === 'te') return 'మీ స్వంత కోడ్ లేదా గతంలో సృష్టించిన ఆస్తుల యాజమాన్యాన్ని క్లయింట్ క్లెయిమ్ చేయకుండా, మీ ముందస్తు ఆస్తులపై పూర్తి హక్కులు మీకే ఉంటాయని స్పష్టం చేయండి.';
    if (code === 'hi') return 'सुनिश्चित करें कि आपके पूर्व-निर्मित टूल्स और बौद्धिक संपदा पर आपका ही पूर्ण अधिकार रहे और केवल कस्टमाइज्ड आउटपुट का स्वामित्व क्लाइंट को मिले।';
    if (code === 'ta') return 'உங்கள் முந்தைய சொத்துக்கள் மற்றும் திறன்களின் முழு உரிமையும் உங்களிடமே இருப்பதை உறுதிசெய்து, இறுதி வெளியீட்டை மட்டுமே வழங்கவும்.';
    if (code === 'kn') return 'ನಿಮ್ಮ ಹಿಂದಿನ ಪರಿಕರಗಳು ಮತ್ತು ಬೌದ್ಧಿಕ ಆಸ್ತಿಯ ಮೇಲಿನ ಹಕ್ಕು ನಿಮ್ಮ ಬಳಿಯೇ ಉಳಿಯುವುದನ್ನು ಸ್ಪಷ್ಟಪಡಿಸಿ.';
    if (code === 'mr') return 'आपल्या पूर्वीच्या टूल्स आणि बौद्धिक संपदेवर आपलाच अधिकार राहील याची स्पष्ट कायदेशीर नोंद करा.';
    if (code === 'bn') return 'নিশ্চিত করুন যে আপনার পূর্ববর্তী সম্পদ এবং কোডের পূর্ণ মালিকানা আপনার কাছেই থাকবে।';
    if (code === 'gu') return 'તમારી પૂર્વ-અસ્તિત્વ ધરાવતી બૌદ્ધિક સંપત્તિ પર તમારો જ અધિકાર રહે તે સ્પષ્ટ કરો.';
    if (code === 'ml') return 'നിങ്ങളുടെ മുൻകാല ബൗദ്ധിക സ്വത്തുക്കൾ നിങ്ങളുടെ കൈവശം തന്നെ തുടരുമെന്ന് ഉറപ്പാക്കുക.';
    if (code === 'pa') return 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੀ ਪਹਿਲੀ ਜਾਇਦਾਦ ਅਤੇ ਕੋਡ ਤੇ ਤੁਹਾਡਾ ਹੀ ਪੂਰਾ ਹੱਕ ਰਹੇਗਾ।';
  }

  // Default clean regional summary
  const genericTranslations: Record<string, string> = {
    te: 'ఈ నిబంధన ఇరుపక్షాల చట్టపరమైన బాధ్యతలు, హక్కులు మరియు ఒప్పంద నిబంధనలను స్పష్టం చేస్తుంది.',
    hi: 'यह खंड अनुबंध के तहत दोनों पक्षों के कानूनी अधिकारों और कर्तव्यों को निर्धारित करता है।',
    ta: 'இந்த விதி இரு தரப்பினரின் சட்டப்பூர்வ உரிமைகள் மற்றும் கடமைகளை வரையறுக்கிறது.',
    kn: 'ಈ ಷರತ್ತು ಎರಡೂ ಪಕ್ಷಗಳ ಕಾನೂನುಬದ್ಧ ಹಕ್ಕುಗಳು ಮತ್ತು ಕರ್ತವ್ಯಗಳನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.',
    mr: 'ही अट दोन्ही पक्षांचे कायदेशीर हक्क आणि कर्तव्ये निश्चित करते.',
    bn: 'এই ধারাটি উভয় পক্ষের আইনি অধিকার ও কর্তব্য নির্ধারণ করে।',
    gu: 'આ શરત બંને પક્ષોના કાનૂની અધિકારો અને ફરજો નક્કી કરે છે.',
    ml: 'ഈ വ്യവസ്ഥ ഇരു കക്ഷികളുടെയും നിയമപരമായ അവകാശങ്ങളും ചുമതലകളും നിശ്ചയിക്കുന്നു.',
    pa: 'ਇਹ ਧਾਰਾ ਦੋਵਾਂ ਧਿਰਾਂ ਦੇ ਕਾਨੂੰਨੀ ਅਧਿਕਾਰ ਅਤੇ ਫਰਜ਼ ਨਿਰਧਾਰਿਤ ਕਰਦੀ ਹੈ।'
  };

  return genericTranslations[code] || sentence;
}
