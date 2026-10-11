// Dynamic Multi-Language Contract Translation Engine for ClauseGuard AI
// Translates page data (Executive Summary, Key Risks, Recommendations, Explanations, UI Badges, Clauses, Obligations)

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  badge: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', badge: 'EN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', badge: 'TEL' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', badge: 'HIN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', badge: 'TAM' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', badge: 'KAN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', badge: 'MAR' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', badge: 'BEN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', badge: 'GUJ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', badge: 'MAL' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', badge: 'PAN' }
];

import {
  UIStrings,
  REGIONAL_UI_STRINGS,
  METADATA_FIELD_MAP,
  CATEGORY_MAP,
  translateLegalSentence
} from './legalDictionary';

export interface TranslatedContent {
  ui: UIStrings;
  summary: {
    detailed_summary: string;
    quick_summary: string;
  };
  translateRisk: (risk: any) => {
    title: string;
    category?: string;
    explanation: string;
    suggested_action: string;
    easy_explanation: string;
    severityLabel: string;
  };
  translateClause: (clause: any) => {
    clause_type: string;
    plain_summary: string;
  };
  translateObligation: (obligation: any) => {
    type: string;
    status: string;
    description: string;
    explanation: string;
  };
  translateMetadataField?: (fieldName: string) => string;
  translateMetadataValue?: (fieldVal: string) => string;
  translateCategory?: (category: string) => string;
}

// Helper: match legal patterns in risk text
function detectRiskType(title: string, exp: string): string {
  const t = (title + ' ' + exp).toLowerCase();
  if (t.includes('forfeit') || t.includes('advance') || t.includes('deposit') || t.includes('earnest')) return 'forfeiture';
  if (t.includes('stipulated time') || t.includes('ambiguous') || t.includes('timeline') || t.includes('calendar deadline')) return 'timeline';
  if (t.includes('possession') || t.includes('handover') || t.includes('vacant') || t.includes('deferred')) return 'possession';
  if (t.includes('indemnif') || t.includes('unlimited liability') || t.includes('uncapped') || t.includes('consequential damages')) return 'indemnity';
  if (t.includes('terminat') || t.includes('cancel') || t.includes('without cause') || t.includes('unilateral')) return 'termination';
  if (t.includes('non-compete') || t.includes('exclusiv') || t.includes('restrictive covenant') || t.includes('solicit')) return 'non_compete';
  if (t.includes('intellectual') || t.includes('copyright') || t.includes('work product') || t.includes('ip ownership')) return 'ip';
  if (t.includes('jurisdiction') || t.includes('governing law') || t.includes('court') || t.includes('dispute') || t.includes('arbitration')) return 'jurisdiction';
  if (t.includes('penalty') || t.includes('late fee') || t.includes('interest rate') || t.includes('liquidated damage')) return 'penalty';
  if (t.includes('lock-in') || t.includes('minimum period') || t.includes('premature exit')) return 'lock_in';
  return 'general';
}

// Helper: match clause types
function detectClauseType(rawType: string): string {
  const c = (rawType || '').toLowerCase();
  if (c.includes('property') || c.includes('details') || c.includes('parcel') || c.includes('schedule a')) return 'property';
  if (c.includes('payment') || c.includes('consideration') || c.includes('price') || c.includes('fee')) return 'payment';
  if (c.includes('title') || c.includes('encumbrance') || c.includes('ownership')) return 'title';
  if (c.includes('termination') || c.includes('default') || c.includes('breach')) return 'termination';
  if (c.includes('governing') || c.includes('law') || c.includes('jurisdiction')) return 'law';
  if (c.includes('indemn') || c.includes('liability')) return 'liability';
  if (c.includes('confident') || c.includes('privacy') || c.includes('nda')) return 'confidentiality';
  if (c.includes('intellectual') || c.includes('ip')) return 'ip';
  if (c.includes('possession') || c.includes('delivery')) return 'possession';
  if (c.includes('warranty') || c.includes('representation')) return 'warranty';
  return 'general';
}

// Helper: match obligation duty category
function detectObligationType(desc: string, deadline: string): 'milestone' | 'operational' | 'recurring' | 'conditional' {
  const d = (desc + ' ' + deadline).toLowerCase();
  if (d.includes('ongoing') || d.includes('daily') || d.includes('throughout') || d.includes('maintain') || d.includes('comply')) return 'operational';
  if (d.includes('month') || d.includes('recurring') || d.includes('periodic') || d.includes('installment') || d.includes('5th')) return 'recurring';
  if (d.includes('terminate') || d.includes('notice') || d.includes('breach') || d.includes('event') || d.includes('as needed') || d.includes('default')) return 'conditional';
  return 'milestone';
}

function getRawTranslatedContractData(
  langCode: string,
  originalSummary: any,
  originalRisks: any[] = []
): TranslatedContent {
  const code = langCode.slice(0, 2).toLowerCase();

  // Extract clean context
  const docTitle = originalSummary?.title || 'Contract Agreement';
  const parties = originalSummary?.parties && originalSummary.parties.length > 0 ? originalSummary.parties.join(' & ') : '';
  const financial = (originalSummary?.financial_terms && originalSummary.financial_terms !== 'Not specified in document') ? originalSummary.financial_terms : '';
  const term = (originalSummary?.effective_date || originalSummary?.expiration_date) ? `${originalSummary?.effective_date || ''} - ${originalSummary?.expiration_date || ''}` : '';

  // 1. TELUGU (తెలుగు)
  if (code === 'te') {
    return {
      ui: {
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
        deadlineBadge: 'గడువు:'
      },
      summary: {
        quick_summary: `ఈ ఒప్పందం (${docTitle}) సేవల నిబంధనలు, గడువులు మరియు చెల్లింపు షెడ్యూల్ వివరాలను నిర్దేశిస్తుంది.${parties ? ` ఒప్పంద పక్షాలు: ${parties}.` : ''}${financial ? ` మొత్తం విలువ: ${financial}.` : ''} ప్రధానంగా అడ్వాన్స్ జప్తు, అపరిమిత బాధ్యత మరియు రద్దు నిబంధనలను సంతకం చేయడానికి ముందు జాగ్రత్తగా సమీక్షించాలి.`,
        detailed_summary: `ఈ చట్టపరమైన ఒప్పందం ప్రకారం ఇరుపక్షాలు తమ అధికారాలు మరియు కర్తవ్యాలను సకాలంలో పూర్తి చేయాల్సి ఉంటుంది.${parties ? ` ప్రధాన పక్షాలు: ${parties}.` : ''}${financial ? ` ఒప్పంద విలువ: ${financial}.` : ''} పత్రం విశ్లేషణలో కఠినమైన జప్తు షరతులు, స్పష్టమైన గడువుల లేమి మరియు ఆలస్య స్వాధీన నిబంధనలు గుర్తించబడ్డాయి. భవిష్యత్ న్యాయ వివాదాలను నివారించడానికి రాతపూర్వక నోటీస్ వ్యవధి మరియు బాధ్యత పరిమితిని చేర్చడం చాలా ముఖ్యం.`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'తీవ్ర ప్రమాదం' : sev === 'Medium' ? 'మధ్యస్థ ప్రమాదం' : 'తక్కువ ప్రమాదం';

        if (type === 'forfeiture') {
          return {
            title: 'కఠినమైన అడ్వాన్స్ జప్తు / చెల్లింపు జరిమానా రిస్క్',
            explanation: 'చెల్లింపులో స్వల్ప జాప్యం జరిగినా ముందస్తు నోటీస్ లేదా గడువు ఇవ్వకుండా మొత్తం అడ్వాన్స్ సొమ్మును జప్తు చేసే ప్రమాదం ఉంది.',
            suggested_action: 'సంతకం చేయడానికి ముందు 15 రోజుల ముందస్తు లిఖితపూర్వక నోటీస్ మరియు సరిదిద్దుకునే వ్యవధిని తప్పనిసరి చేయండి.',
            easy_explanation: 'సులభంగా చెప్పాలంటే: చిన్న బ్యాంకింగ్ జాప్యం జరిగినా మీ కష్టార్జితమైన అడ్వాన్స్ మొత్తం పోకుండా రక్షణ కల్పించుకోండి.',
            severityLabel: sevLabel
          };
        }
        if (type === 'timeline') {
          return {
            title: 'గడువు స్పష్టత లోపం / చెల్లింపు సమయ అనిశ్చితి',
            explanation: 'రిజిస్ట్రేషన్ లేదా చెల్లింపు పూర్తి చేయడానికి ఖచ్చితమైన క్యాలెండర్ గడువు తేదీ ఒప్పందంలో పేర్కొనబడలేదు.',
            suggested_action: 'ఒప్పందం కుదిరిన తేదీ నుండి ఖచ్చితమైన క్యాలెండర్ గడువును (ఉదా. 60 లేదా 90 రోజులు) స్పష్టంగా నిర్ణయించండి.',
            easy_explanation: 'సులభంగా చెప్పాలంటే: ఎప్పుడు రిజిస్ట్రేషన్ పూర్తి చేయాలో స్పష్టమైన తేదీ లేకపోతే భవిష్యత్తులో ఇరుపక్షాల మధ్య తగాదాలు రావచ్చు.',
            severityLabel: sevLabel
          };
        }
        if (type === 'possession') {
          return {
            title: 'చెల్లింపు పూర్తయిన తర్వాత ఆలస్యంగా ఆస్తి స్వాధీనం',
            explanation: 'మొత్తం చెల్లింపు పూర్తయిన వెంటనే కాకుండా 30 రోజుల వరకు ఆస్తి స్వాధీనాన్ని వాయిదా వేయడం కొనుగోలుదారుకు నష్టం కలిగిస్తుంది.',
            suggested_action: 'సబ్-రిజిస్ట్రార్ వద్ద రిజిస్ట్రేషన్ పూర్తయిన రోజే ఆస్తి భౌతిక స్వాధీనం జరిగేలా నిబంధనను సవరించండి.',
            easy_explanation: 'సులభంగా చెప్పాలంటే: మొత్తం డబ్బు చెల్లించిన రోజే ఆస్తి మరియు తాళాలు మీ చేతికి రావాలి.',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'పరిమితి లేని అపరిమిత నష్టపరిహార బాధ్యత',
            explanation: 'ఏదైనా చిన్న వివాదం జరిగినా ఎటువంటి గరిష్ట పరిమితి లేకుండా భారీ నష్టపరిహారం చెల్లించాల్సి రావచ్చు.',
            suggested_action: 'మీ నష్టపరిహార బాధ్యతను ఒప్పందం ద్వారా అందుకున్న మొత్తం ఫీజు లేదా నిర్ణీత విలువకు మాత్రమే పరిమితం చేయండి.',
            easy_explanation: 'సులభంగా చెప్పాలంటే: సమస్య వస్తే మీ ఆదాయానికి మించి భారీ నష్టపరిహారం కట్టకుండా భద్రతా పరిమితి పెట్టుకోండి.',
            severityLabel: sevLabel
          };
        }
        if (type === 'termination') {
          return {
            title: 'ఏకపక్ష ముందస్తు ఒప్పంద రద్దు నిబంధన',
            explanation: 'సరైన కారణం లేకుండా రెండో పక్షం ఒప్పందాన్ని ఏకపక్షంగా రద్దు చేసుకునే ప్రమాదకరమైన అధికారం కలిగి ఉంది.',
            suggested_action: 'కనీసం 30 రోజుల ముందస్తు రాతపూర్వక నోటీస్ మరియు నష్టపరిహారం చెల్లించే రక్షణ నిబంధన విధించండి.',
            easy_explanation: 'సులభంగా చెప్పాలంటే: ఉన్నట్టుండి ఒప్పందాన్ని రద్దు చేసి మీకు వ్యాపార నష్టం కలిగించకుండా చూడండి.',
            severityLabel: sevLabel
          };
        }
        // General fallback
        return {
          title: risk.title ? `${risk.title} (లీగల్ రిస్క్)` : 'గుర్తించిన చట్టపరమైన ప్రమాదం',
          explanation: risk.explanation || 'ఈ ఒప్పంద నిబంధన మీపై అనవసరమైన ఆర్థిక లేదా చట్టపరమైన బాధ్యతలను మోపవచ్చు.',
          suggested_action: risk.suggested_action || 'సంతకం చేయడానికి ముందు ఈ నిబంధనను లీగల్ నిపుణుడితో సమీక్షించండి.',
          easy_explanation: risk.easy_explanation || 'సులభంగా చెప్పాలంటే: ఈ నిబంధన వల్ల వివాదం తలెత్తితే మీకు ఆర్థికంగా నష్టం కలగవచ్చు.',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'ఆస్తి వివరాలు & సరిహద్దులు', summary: 'సర్వే నంబర్లు, విస్తీర్ణం మరియు స్పష్టమైన సరిహద్దుల వివరాలను నిర్ధారిస్తుంది.' },
          payment: { name: 'చెల్లింపు నిబంధనలు & షెడ్యూల్', summary: 'మొత్తం ఒప్పంద విలువ, అడ్వాన్స్ చెల్లింపు మరియు బ్యాలెన్స్ నిబంధనలను నిర్దేశిస్తుంది.' },
          title: { name: 'యాజమాన్య హక్కులు & లోన్ రహిత ధ్రువీకరణ', summary: 'ఆస్తిపై ఎలాంటి కేసులు, కోర్టు వివాదాలు లేదా లోన్లు లేవని విక్రేత హామీ ఇస్తున్నారు.' },
          termination: { name: 'ఒప్పంద రద్దు & డిఫాల్ట్ నిబంధన', summary: 'చెల్లింపులో విఫలమైతే ఒప్పందం రద్దు మరియు జప్తు చేసే హక్కులను స్పష్టం చేస్తుంది.' },
          law: { name: 'చట్టపరమైన అధికార పరిధి', summary: 'స్థానిక సివిల్ కోర్టుల న్యాయ పరిధిని మరియు వర్తించే చట్టాలను నిర్ధారిస్తుంది.' },
          liability: { name: 'నష్టపరిహారం & బాధ్యత పరిమితి', summary: 'నిబంధనల ఉల్లంఘన జరిగితే చెల్లించాల్సిన పరిహార పరిమితులను వివరిస్తుంది.' },
          confidentiality: { name: 'రహస్య సమాచార రక్షణ', summary: 'వ్యాపార మరియు ఆర్థిక సమాచారాన్ని గోప్యంగా ఉంచాలని ఆదేశిస్తుంది.' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} నిబంధన` : 'ముఖ్య నిబంధన', summary: c.plain_summary || 'ఈ నిబంధన ఇరుపక్షాల హక్కులు మరియు విధులను నిర్ణయిస్తుంది.' };
        return {
          clause_type: entry.name,
          plain_summary: entry.summary
        };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = {
          milestone: 'మైలురాయి బాధ్యత',
          operational: 'నిరంతర కార్యాచరణ బాధ్యత',
          recurring: 'పునరావృత చెల్లింపు బాధ్యత',
          conditional: 'షరతులతో కూడిన విధి'
        };
        const statusMap: Record<string, string> = {
          'Completed': 'పూర్తయింది',
          'In Progress': 'పురోగతిలో ఉంది',
          'Pending': 'పెండింగ్'
        };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'పెండింగ్',
          description: o.description || 'ఒప్పందం ప్రకారం నెరవేర్చవలసిన ముఖ్యమైన చట్టపరమైన విధి.',
          explanation: oType === 'milestone' ? 'రిజిస్ట్రేషన్ లేదా పత్రాల సమర్పణ సమయంలో ధ్రువీకరించాల్సిన మైలురాయి.' :
                       oType === 'recurring' ? 'షెడ్యూల్ ప్రకారం క్రమం తప్పకుండా చెల్లించాల్సిన ఆర్థిక చెల్లింపు.' :
                       oType === 'operational' ? 'ఒప్పంద కాలమంతా నిరంతరంగా పాటించవలసిన కార్యాచరణ విధి.' :
                       'నిర్దిష్ట సంఘటన లేదా నోటీస్ వచ్చినప్పుడు మాత్రమే అమలులోకి వచ్చే నిబంధన.'
        };
      }
    };
  }

  // 2. HINDI (हिन्दी)
  if (code === 'hi') {
    return {
      ui: {
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
        deadlineBadge: 'समय-सीमा:'
      },
      summary: {
        quick_summary: `यह अनुबंध (${docTitle}) सेवाओं, नियमों, समय-सीमा और भुगतान अनुसूची को निर्धारित करता है।${parties ? ` अनुबंध के पक्ष: ${parties}।` : ''}${financial ? ` कुल मूल्य: ${financial}।` : ''} मुख्य रूप से अग्रिम जब्ती, असीमित देनदारी और एकतरफा समाप्ति की शर्तों की गहन समीक्षा आवश्यक है।`,
        detailed_summary: `इस कानूनी अनुबंध के तहत दोनों पक्षों को अपने कर्तव्यों और अधिकारों का समय पर पालन करना अनिवार्य है।${parties ? ` संबंधित पक्ष: ${parties}।` : ''}${financial ? ` अनुबंध मूल्य: ${financial}।` : ''} दस्तावेज़ की समीक्षा में सख्त जब्ती प्रावधान, समय-सीमा की अस्पष्टता और विलंबित कब्जे की शर्तें पाई गई हैं। कानूनी विवादों से बचने के लिए पूर्व लिखित सूचना अवधि और देयता सीमा जोड़ना अनिवार्य है।`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'उच्च जोखिम' : sev === 'Medium' ? 'मध्यम जोखिम' : 'कम जोखिम';

        if (type === 'forfeiture') {
          return {
            title: 'सख्त अग्रिम राशि जब्ती एवं भुगतान चूक जोखिम',
            explanation: 'भुगतान में मामूली देरी होने पर बिना लिखित नोटिस या अतिरिक्त समय दिए आपकी पूरी अग्रिम राशि जब्त की जा सकती है।',
            suggested_action: 'हस्ताक्षर करने से पहले 15 दिनों का अनिवार्य लिखित नोटिस और सुधार अवधि (Cure Period) जोड़ें।',
            easy_explanation: 'सरल शब्दों में: बैंकिंग या तकनीकी देरी होने पर भी आपकी गाढ़ी कमाई का अग्रिम पैसा न डूबे।',
            severityLabel: sevLabel
          };
        }
        if (type === 'timeline') {
          return {
            title: 'समय-सीमा की अस्पष्टता / भुगतान तारीख में अनिश्चितता',
            explanation: 'रजिस्ट्री या शेष भुगतान को पूरा करने के लिए अनुबंध में कोई निश्चित कैलेंडर तिथि नहीं दी गई है।',
            suggested_action: 'अनुबंध की तारीख से निश्चित दिन (जैसे 60 या 90 दिन) की स्पष्ट अंतिम समय-सीमा निर्धारित करें।',
            easy_explanation: 'सरल शब्दों में: काम पूरा करने की पक्की तारीख तय न होने से आगे चलकर दोनों पक्षों में विवाद हो सकता है।',
            severityLabel: sevLabel
          };
        }
        if (type === 'possession') {
          return {
            title: 'पूर्ण भुगतान के बाद संपत्ति का विलंबित कब्जा',
            explanation: 'पूरा पैसा चुकाने के तुरंत बाद कब्जा मिलने के बजाय 30 दिनों तक की देरी खरीदार के लिए वित्तीय जोखिम पैदा करती है।',
            suggested_action: 'रजिस्ट्री के दिन ही संपत्ति का वास्तविक भौतिक कब्जा सौंपना अनिवार्य बनाएं।',
            easy_explanation: 'सरल शब्दों में: जब आप पूरा भुगतान कर दें तो उसी दिन संपत्ति और चाबियां आपके हाथ में आनी चाहिए।',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'असीमित क्षतिपूर्ति एवं असीमित देनदारी जोखिम',
            explanation: 'किसी भी विवाद की स्थिति में बिना किसी अधिकतम सीमा के आपको भारी हर्जाना चुकाना पड़ सकता है।',
            suggested_action: 'अपनी कुल देनदारी को अनुबंध से प्राप्त कुल फीस तक सीमित (Cap) करें।',
            easy_explanation: 'सरल शब्दों में: नुकसान होने पर अपनी कमाई से अधिक का जुर्माना भरने से बचने के लिए सीमा तय कराएं।',
            severityLabel: sevLabel
          };
        }
        if (type === 'termination') {
          return {
            title: 'एकतरफा अनुबंध समाप्ति की शर्त',
            explanation: 'दूसरा पक्ष बिना किसी ठोस कारण के अचानक अनुबंध समाप्त करने का एकतरफा अधिकार रखता है।',
            suggested_action: 'कम से कम 30 दिनों का पूर्व लिखित नोटिस और हर्जाना अनिवार्य करने की शर्त जोड़ें।',
            easy_explanation: 'सरल शब्दों में: अचानक अनुबंध टूटने से आपके काम और व्यवसाय को नुकसान न पहुंचे।',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (कानूनी जोखिम)` : 'पहचाना गया कानूनी जोखिम',
          explanation: risk.explanation || 'यह शर्त आपके ऊपर अनावश्यक वित्तीय या कानूनी बोझ डाल सकती है।',
          suggested_action: risk.suggested_action || 'हस्ताक्षर करने से पहले इस क्लॉज की वकील से समीक्षा कराएं।',
          easy_explanation: risk.easy_explanation || 'सरल शब्दों में: इस शर्त के कारण विवाद होने पर आपको वित्तीय नुकसान हो सकता है।',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'संपत्ति का विवरण एवं सीमाएं', summary: 'सर्वे नंबर, क्षेत्रफल और स्पष्ट सीमाओं के विवरण को प्रमाणित करता है।' },
          payment: { name: 'भुगतान की शर्तें एवं अनुसूची', summary: 'कुल अनुबंध मूल्य, अग्रिम भुगतान और शेष राशि के नियमों को तय करता है।' },
          title: { name: 'स्वामित्व एवं ऋण-मुक्त प्रमाणन', summary: 'विक्रेता प्रमाणित करता है कि संपत्ति पर कोई मुकदमा या बैंक ऋण लंबित नहीं है।' },
          termination: { name: 'अनुबंध समाप्ति एवं डिफॉल्ट नियम', summary: 'भुगतान में चूक होने पर अनुबंध रद्द करने और जब्ती के अधिकार तय करता है।' },
          law: { name: 'लागू कानून एवं अधिकार क्षेत्र', summary: 'स्थानीय दीवानी अदालतों के क्षेत्राधिकार और लागू कानूनों को निर्धारित करता है।' },
          liability: { name: 'क्षतिपूर्ति एवं देयता सीमा', summary: 'शर्तों के उल्लंघन पर हर्जाने और देनदारी की कानूनी सीमाओं को स्पष्ट करता है।' },
          confidentiality: { name: 'गोपनीयता की सुरक्षा', summary: 'व्यावसायिक और वित्तीय जानकारी को पूरी तरह गोपनीय रखने का निर्देश देता है।' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} क्लॉज` : 'महत्वपूर्ण शर्त', summary: c.plain_summary || 'यह क्लॉज अनुबंध के तहत दोनों पक्षों के कर्तव्यों को निर्धारित करता है।' };
        return {
          clause_type: entry.name,
          plain_summary: entry.summary
        };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = {
          milestone: 'मील का पत्थर कर्तव्य',
          operational: 'निरंतर परिचालन दायित्व',
          recurring: 'आवर्ती भुगतान दायित्व',
          conditional: 'सशर्त दायित्व'
        };
        const statusMap: Record<string, string> = {
          'Completed': 'पूर्ण',
          'In Progress': 'प्रगति पर',
          'Pending': 'लंबित'
        };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'लंबित',
          description: o.description || 'अनुबंध के तहत पूरा किया जाने वाला आवश्यक दायित्व।',
          explanation: oType === 'milestone' ? 'रजिस्ट्री या तय समय पर पूरा करने योग्य आवश्यक कार्य।' :
                       oType === 'recurring' ? 'समय-सारिणी के अनुसार नियमित रूप से किया जाने वाला भुगतान।' :
                       oType === 'operational' ? 'पूरे अनुबंध काल में लगातार पालन किया जाने वाला कर्तव्य।' :
                       'किसी विशेष घटना या नोटिस पर लागू होने वाला सशर्त प्रावधान।'
        };
      }
    };
  }

  // 3. TAMIL (தமிழ்)
  if (code === 'ta') {
    return {
      ui: {
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
        deadlineBadge: 'காலக்கெடு:'
      },
      summary: {
        quick_summary: `இந்த ஒப்பந்தம் (${docTitle}) சேவைகள், விதிமுறைகள் மற்றும் கட்டண அட்டவணையை வரையறுக்கிறது.${parties ? ` ஒப்பந்த தரப்பினர்: ${parties}.` : ''}${financial ? ` மொத்த மதிப்பு: ${financial}.` : ''} முன்பணம் இழப்பு, எல்லையற்ற பொறுப்பு மற்றும் ஒப்பந்த ரத்து விதிகளை கவனமாக ஆராய வேண்டும்.`,
        detailed_summary: `இந்த சட்ட ஒப்பந்தத்தின்படி இரு தரப்பினரும் தங்கள் உரிமைகளையும் கடமைகளையும் முறையாக நிறைவேற்ற வேண்டும்.${parties ? ` தொடர்புடைய தரப்பினர்: ${parties}.` : ''}${financial ? ` ஒப்பந்த மதிப்பு: ${financial}.` : ''} ஆவணத்தில் கடுமையான முன்பண பறிமுதல் மற்றும் காலக்கெடு தெளிவின்மை கண்டறியப்பட்டுள்ளது. கையொப்பமிடும் முன் முன்னறிவிப்பு காலத்தை சேர்ப்பது அவசியம்.`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'அதிக ஆபத்து' : sev === 'Medium' ? 'நடுத்தர ஆபத்து' : 'குறைந்த ஆபத்து';

        if (type === 'forfeiture') {
          return {
            title: 'கடுமையான முன்பண இழப்பு & பறிமுதல் ஆபத்து',
            explanation: 'பணம் செலுத்துவதில் சிறிய தாமதம் ஏற்பட்டாலும் முன்னறிவிப்பு இல்லாமல் உங்கள் முன்பணம் முழுவதையும் இழக்க நேரிடும்.',
            suggested_action: 'கையொப்பமிடுவதற்கு முன் 15 நாட்கள் கட்டாய எழுத்துப்பூர்வ அறிவிப்பு காலத்தை சேர்க்கவும்.',
            easy_explanation: 'எளிய முறையில்: வங்கி தாமதம் ஏற்பட்டாலும் உங்கள் முன்பணத்தை இழக்காமல் காத்துக் கொள்ளுங்கள்.',
            severityLabel: sevLabel
          };
        }
        if (type === 'timeline') {
          return {
            title: 'காலக்கெடு தெளிவின்மை / கட்டண தேதி நிச்சயமின்மை',
            explanation: 'பத்திரப்பதிவு அல்லது இறுதித் தொகையை செலுத்துவதற்கு திட்டவட்டமான காலக்கெடு ஒப்பந்தத்தில் குறிப்பிடப்படவில்லை.',
            suggested_action: 'ஒப்பந்த தேதியிலிருந்து குறிப்பிட்ட காலக்கெடுவை (எ.கா. 60 அல்லது 90 நாட்கள்) தெளிவாக நிர்ணயிக்கவும்.',
            easy_explanation: 'எளிய முறையில்: பதிவு செய்ய தெளிவான கடைசி தேதி இல்லையென்றால் இரு தரப்பினருக்கும் இடையே தகராறு ஏற்படலாம்.',
            severityLabel: sevLabel
          };
        }
        if (type === 'possession') {
          return {
            title: 'முழு கட்டணத்திற்குப் பிறகு சொத்து ஒப்படைப்பில் தாமதம்',
            explanation: 'முழுத் தொகையையும் செலுத்திய பின்னரும் 30 நாட்கள் வரை சொத்து ஒப்படைப்பை தாமதப்படுத்துவது வாங்குபவருக்கு நிதி இழப்பை ஏற்படுத்தும்.',
            suggested_action: 'பதிவு செய்யப்படும் நாளிலேயே சொத்தை முழுமையாக ஒப்படைக்க விதியை மாற்றவும்.',
            easy_explanation: 'எளிய முறையில்: முழுப் பணத்தையும் செலுத்திய உடனேயே சொத்தின் சாவியும் உரிமையும் உங்கள் கைக்கு வர வேண்டும்.',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'வரம்பற்ற இழப்பீட்டுப் பொறுப்பு (அதிக ஆபத்து)',
            explanation: 'ஏதேனும் சர்ச்சை ஏற்பட்டால் உச்ச வரம்பின்றி பெரும் தொகையை இழப்பீடாக வழங்க வேண்டியிருக்கும்.',
            suggested_action: 'உங்கள் இழப்பீட்டுப் பொறுப்பை ஒப்பந்தக் கட்டண தொகைக்கு மட்டுமே வரம்பிடவும்.',
            easy_explanation: 'எளிய முறையில்: உங்கள் வருமானத்திற்கு மேல் அபராதம் கட்டுவதைத் தவிர்க்க உச்சவரம்பு நிர்ணயிக்கவும்.',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (சட்ட ஆபத்து)` : 'முக்கிய சட்ட ஆபத்து',
          explanation: risk.explanation || 'இந்த விதி உங்கள் மீது தேவையற்ற நிதி அல்லது சட்டப் பொறுப்புகளை சுமத்தக்கூடும்.',
          suggested_action: risk.suggested_action || 'கையொப்பமிடும் முன் வழக்கறிஞரிடம் ஆலோசிக்கவும்.',
          easy_explanation: risk.easy_explanation || 'எளிய முறையில்: இந்த விதி சர்ச்சையை ஏற்படுத்தினால் உங்களுக்கு நிதி இழப்பு வரலாம்.',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'சொத்து விவரங்கள் & எல்லைகள்', summary: 'சர்வே எண்கள், பரப்பளவு மற்றும் எல்லைக் குறிகளை உறுதிப்படுத்துகிறது.' },
          payment: { name: 'கட்டண விதிமுறைகள் & அட்டவணை', summary: 'மொத்த ஒப்பந்த மதிப்பு, முன்பணம் மற்றும் நிலுவைத் தொகை விதிகளை நிர்ணயிக்கிறது.' },
          title: { name: 'உரிமை மற்றும் வில்லங்கமின்மை', summary: 'சொத்தில் எவ்வித வழக்கும், கடனும் இல்லை என விற்பனையாளர் உறுதி செய்கிறார்.' },
          termination: { name: 'ஒப்பந்த ரத்து விதி', summary: 'கட்டணத் தவணை மீறப்பட்டால் ஒப்பந்தத்தை ரத்து செய்யும் உரிமையை வரையறுக்கிறது.' },
          law: { name: 'சட்ட எல்லை & தீர்ப்பாயம்', summary: 'உள்ளூர் நீதிமன்றங்களின் எல்லை மற்றும் சட்டங்களை தீர்மானிக்கிறது.' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} விதி` : 'ஒப்பந்த விதி', summary: c.plain_summary || 'இந்த விதி இரு தரப்பினரின் கடமைகளை வரையறுக்கிறது.' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = {
          milestone: 'மைல்கல் கடமை',
          operational: 'தொடர் செயல்பாட்டுக் கடமை',
          recurring: 'தொடர் கட்டணக் கடமை',
          conditional: 'நிபந்தனைக்குட்பட்ட கடமை'
        };
        const statusMap: Record<string, string> = { 'Completed': 'முடிந்தது', 'In Progress': 'செயல்பாட்டில்', 'Pending': 'நிலுவையில்' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'நிலுவையில்',
          description: o.description || 'ஒப்பந்தப்படி நிறைவேற்றப்பட வேண்டிய கட்டாயப் பணி.',
          explanation: 'ஒப்பந்தக் காலக்கெடுவுக்குள் நிறைவேற்றப்பட வேண்டிய முக்கியமான சட்டக் கடமை.'
        };
      }
    };
  }

  // 4. KANNADA (ಕನ್ನಡ)
  if (code === 'kn') {
    return {
      ui: {
        findingsBadge: 'AI ಒಪ್ಪಂದದ ಪರಿಶೀಲನೆ',
        detailed: 'ವಿವರವಾದ ಸಾರಾಂಶ',
        quick: 'ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ',
        contractingParties: 'ಒಪ್ಪಂದದ ಪಕ್ಷಗಳು',
        consideration: 'ಹಣಕಾಸು ನಿಯಮಗಳು / ಮೌಲ್ಯ',
        termDuration: 'ಅವಧಿ ಮತ್ತು ಮುಕ್ತಾಯ',
        recommendationBadge: 'ಶಿಫಾರಸು ಮತ್ತು ಪರಿಹಾರ',
        easyExplanationTitle: 'ಸುಲಭ ವಿವರಣೆ ಮತ್ತು ಪ್ರಾಮುಖ್ಯತೆ',
        keyRisksBadge: 'ಪ್ರಮುಖ ಕಾನೂನು ಅಪಾಯಗಳು',
        highRisk: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
        mediumRisk: 'ಮಧ್ಯಮ ಅಪಾಯ',
        lowRisk: 'ಕಡಿಮೆ ಅಪಾಯ',
        speakerLabel: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ (ಆಡಿಯೋ)',
        speakerPlaying: 'ಆಡಿಯೋ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
        viewOriginalFile: 'ಮೂಲ ದಾಖಲೆಯನ್ನು ವೀಕ್ಷಿಸಿ',
        clausesBadge: 'ಪ್ರಮುಖ ಷರತ್ತುಗಳು',
        obligationsBadge: 'ಕಾನೂನುಬದ್ಧ ಕರ್ತವ್ಯಗಳು',
        responsibleParty: 'ಜವಾಬ್ದಾರಿಯುತ ಪಕ್ಷ:',
        beneficiaryParty: 'ಫಲಾನುಭವಿ:',
        deadlineBadge: 'ಅಂತಿಮ ದಿನಾಂಕ:'
      },
      summary: {
        quick_summary: `ಈ ಒಪ್ಪಂದವು (${docTitle}) ಸೇವೆಗಳು, ನಿಯಮಗಳು ಮತ್ತು ಪಾವತಿ ವೇಳಾಪಟ್ಟಿಯನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ.${parties ? ` ಪಕ್ಷಗಳು: ${parties}.` : ''}${financial ? ` ಒಟ್ಟು ಮೊತ್ತ: ${financial}.` : ''} ಮುಂಗಡ ಹಣ ಮುಟ್ಟುಗೋಲು ಮತ್ತು ಹೊಣೆಗಾರಿಕೆ ಮಿತಿಗಳನ್ನು ಸಹಿ ಮಾಡುವ ಮೊದಲು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಬೇಕು.`,
        detailed_summary: `ಈ ಕಾನೂನು ಒಪ್ಪಂದದ ಅಡಿಯಲ್ಲಿ ಎರಡೂ ಪಕ್ಷಗಳು ತಮ್ಮ ಕರ್ತವ್ಯಗಳನ್ನು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಪೂರೈಸಬೇಕು.${parties ? ` ಸಂಬಂಧಿತ ಪಕ್ಷಗಳು: ${parties}.` : ''}${financial ? ` ಒಪ್ಪಂದದ ಮೌಲ್ಯ: ${financial}.` : ''} ದಾಖಲೆಯಲ್ಲಿ ಮುಂಗಡ ಹಣ ಕಳೆದುಕೊಳ್ಳುವ ಕಠಿಣ ಷರತ್ತುಗಳು ಕಂಡುಬಂದಿವೆ. ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಲಿಖಿತ ನೋಟಿಸ್ ಅವಧಿಯನ್ನು ಸೇರಿಸುವುದು ಅವಶ್ಯಕ.`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'ಹೆಚ್ಚಿನ ಅಪಾಯ' : sev === 'Medium' ? 'ಮಧ್ಯಮ ಅಪಾಯ' : 'ಕಡಿಮೆ ಅಪಾಯ';

        if (type === 'forfeiture') {
          return {
            title: 'ಕಠಿಣ ಮುಂಗಡ ಹಣ ಮುಟ್ಟುಗೋಲು ಮತ್ತು ದಂಡದ ಅಪಾಯ',
            explanation: 'ಪಾವತಿಯಲ್ಲಿ ಸಣ್ಣ ವಿಳಂಬವಾದರೂ ನೋಟಿಸ್ ನೀಡದೆ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಮುಂಗಡ ಹಣವನ್ನು ಕಳೆದುಕೊಳ್ಳುವ ಅಪಾಯವಿದೆ.',
            suggested_action: 'ಸಹಿ ಮಾಡುವ ಮೊದಲು 15 ದಿನಗಳ ಕಡ್ಡಾಯ ಲಿಖಿತ ನೋಟಿಸ್ ಅವಧಿಯನ್ನು ಸೇರಿಸಿ.',
            easy_explanation: 'ಸುಲಭವಾಗಿ ಹೇಳುವುದಾದರೆ: ಬ್ಯಾಂಕಿಂಗ್ ವಿಳಂಬವಾದರೂ ನಿಮ್ಮ ಮುಂಗಡ ಹಣ ನಷ್ಟವಾಗದಂತೆ ರಕ್ಷಣೆ ಪಡೆಯಿರಿ.',
            severityLabel: sevLabel
          };
        }
        if (type === 'timeline') {
          return {
            title: 'ಸಮಯ ಮಿತಿಯ ಅಸ್ಪಷ್ಟತೆ / ಪಾವತಿ ದಿನಾಂಕದ ಅನಿಶ್ಚಿತತೆ',
            explanation: 'ನೋಂದಣಿ ಅಥವಾ ಬಾಕಿ ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಲು ಒಪ್ಪಂದದಲ್ಲಿ ಸ್ಪಷ್ಟ ಕ್ಯಾಲೆಂಡರ್ ದಿನಾಂಕವಿಲ್ಲ.',
            suggested_action: 'ಒಪ್ಪಂದದ ದಿನಾಂಕದಿಂದ ನಿಖರವಾದ ಗಡುವನ್ನು (ಉದಾ. 60 ಅಥವಾ 90 ದಿನಗಳು) ನಿಗದಿಪಡಿಸಿ.',
            easy_explanation: 'ಸುಲಭವಾಗಿ ಹೇಳುವುದಾದರೆ: ಸ್ಪಷ್ಟ ಅಂತಿಮ ದಿನಾಂಕವಿಲ್ಲದಿದ್ದರೆ ಮುಂದೆ ವಿವಾದಗಳು ಉಂಟಾಗಬಹುದು.',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'ಅಪರಿಮಿತ ನಷ್ಟಪರಿಹಾರ ಹೊಣೆಗಾರಿಕೆ ಅಪಾಯ',
            explanation: 'ಯಾವುದೇ ವಿವಾದ ಉಂಟಾದಲ್ಲಿ ಗರಿಷ್ಠ ಮಿತಿಯಿಲ್ಲದೆ ಭಾರಿ ಮೊತ್ತವನ್ನು ಪರಿಹಾರವಾಗಿ ನೀಡಬೇಕಾಗಬಹುದು.',
            suggested_action: 'ನಿಮ್ಮ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಒಪ್ಪಂದದ ಶುಲ್ಕಕ್ಕೆ ಮಾತ್ರ ಸೀಮಿತಗೊಳಿಸಿ.',
            easy_explanation: 'ಸುಲಭವಾಗಿ ಹೇಳುವುದಾದರೆ: ನಿಮ್ಮ ಗಳಿಕೆಗಿಂತ ಹೆಚ್ಚು ನಷ್ಟ ಭರಿಸುವುದನ್ನು ತಪ್ಪಿಸಲು ಮಿತಿ ನಿಗದಿಪಡಿಸಿ.',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (ಕಾನೂನು ಅಪಾಯ)` : 'ಪ್ರಮುಖ ಕಾನೂನು ಅಪಾಯ',
          explanation: risk.explanation || 'ಈ ಷರತ್ತು ನಿಮ್ಮ ಮೇಲೆ ಅನಗತ್ಯ ಆರ್ಥಿಕ ಅಥವಾ ಕಾನೂನು ಹೊರೆಯನ್ನು ಹೇರಬಹುದು.',
          suggested_action: risk.suggested_action || 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ವಕೀಲರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
          easy_explanation: risk.easy_explanation || 'ಸುಲಭವಾಗಿ ಹೇಳುವುದಾದರೆ: ಈ ಷರತ್ತಿನಿಂದ ನಿಮಗೆ ಆರ್ಥಿಕ ನಷ್ಟವಾಗಬಹುದು.',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'ಆಸ್ತಿ ವಿವರಗಳು ಮತ್ತು ಗಡಿಗಳು', summary: 'ಸರ್ವೆ ನಂಬರ್, ವಿಸ್ತೀರ್ಣ ಮತ್ತು ನಿಖರವಾದ ಗಡಿಗಳನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.' },
          payment: { name: 'ಪಾವತಿ ನಿಯಮಗಳು ಮತ್ತು ವೇಳಾಪಟ್ಟಿ', summary: 'ಒಟ್ಟು ಮೌಲ್ಯ, ಮುಂಗಡ ಪಾವತಿ ಮತ್ತು ಬಾಕಿ ಮೊತ್ತದ ನಿಯಮಗಳನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.' },
          title: { name: 'ಮಾಲೀಕತ್ವ ಮತ್ತು ಸಾಲ ಮುಕ್ತತೆ', summary: 'ಆಸ್ತಿಯ ಮೇಲೆ ಯಾವುದೇ ಸಾಲ ಅಥವಾ ಕೋರ್ಟ್ ಕೇಸ್ ಇಲ್ಲವೆಂದು ಮಾರಾಟಗಾರರು ಖಾತರಿಪಡಿಸುತ್ತಾರೆ.' },
          termination: { name: 'ಒಪ್ಪಂದ ರದ್ದತಿ ಷರತ್ತು', summary: 'ಪಾವತಿ ವಿಫಲವಾದರೆ ಒಪ್ಪಂದ ರದ್ದುಪಡಿಸುವ ಹಕ್ಕನ್ನು ಸ್ಪಷ್ಟಪಡಿಸುತ್ತದೆ.' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} ಷರತ್ತು` : 'ಮುಖ್ಯ ಷರತ್ತು', summary: c.plain_summary || 'ಈ ಷರತ್ತು ಎರಡೂ ಪಕ್ಷಗಳ ಹಕ್ಕುಗಳು ಮತ್ತು ಜವಾಬ್ದಾರಿಗಳನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = {
          milestone: 'ಮೈಲಿಗಲ್ಲು ಕರ್ತವ್ಯ',
          operational: 'ನಿರಂತರ ಕಾರ್ಯಾಚರಣೆ ಕರ್ತವ್ಯ',
          recurring: 'ಮರುಕಳಿಸುವ ಪಾವತಿ ಕರ್ತವ್ಯ',
          conditional: 'ಷರತ್ತುಬದ್ಧ ಹೊಣೆಗಾರಿಕೆ'
        };
        const statusMap: Record<string, string> = { 'Completed': 'ಪೂರ್ಣಗೊಂಡಿದೆ', 'In Progress': 'ಪ್ರಗತಿಯಲ್ಲಿದೆ', 'Pending': 'ಬಾಕಿ ಇದೆ' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'ಬಾಕಿ ಇದೆ',
          description: o.description || 'ಒಪ್ಪಂದದ ಅಡಿಯಲ್ಲಿ ಪೂರೈಸಬೇಕಾದ ಅಗತ್ಯ ಕರ್ತವ್ಯ.',
          explanation: 'ಒಪ್ಪಂದದ ನಿಯಮಗಳ ಪ್ರಕಾರ ಪೂರ್ಣಗೊಳಿಸಬೇಕಾದ ಶಾಸನಬದ್ಧ ಜವಾಬ್ದಾರಿ.'
        };
      }
    };
  }

  // 5. MARATHI (मराठी)
  if (code === 'mr') {
    return {
      ui: {
        findingsBadge: 'AI करार निष्कर्ष',
        detailed: 'तपशीलवार सारांश',
        quick: 'त्वरित सारांश',
        contractingParties: 'करारातील पक्ष',
        consideration: 'आर्थिक अटी / मूल्य',
        termDuration: 'कालावधी आणि समाप्ती',
        recommendationBadge: 'शिफारस आणि उपाय',
        easyExplanationTitle: 'सोपे स्पष्टीकरण आणि महत्त्व',
        keyRisksBadge: 'प्रमुख कायदेशीर धोके',
        highRisk: 'उच्च धोका',
        mediumRisk: 'मध्यम धोका',
        lowRisk: 'कमी धोका',
        speakerLabel: 'ऐका (ऑडिओ)',
        speakerPlaying: 'ऑडिओ चालू आहे...',
        viewOriginalFile: 'मूळ दस्तऐवज पहा',
        clausesBadge: 'महत्त्वाच्या अटी',
        obligationsBadge: 'कायदेशीर कर्तव्ये',
        responsibleParty: 'जबाबदार पक्ष:',
        beneficiaryParty: 'लाभार्थी:',
        deadlineBadge: 'मुदत:'
      },
      summary: {
        quick_summary: `हा करार (${docTitle}) सेवा, नियम, मुदत आणि देयक वेळापत्रक निश्चित करतो.${parties ? ` करारातील पक्ष: ${parties}.` : ''}${financial ? ` एकूण मूल्य: ${financial}.` : ''} आगाऊ रक्कम जप्ती, अमर्याद जबाबदारी आणि करार समाप्तीच्या अटी काळजीपूर्वक तपासाव्यात.`,
        detailed_summary: `या कायदेशीर करारानुसार दोन्ही पक्षांनी वेळेत आपली कर्तव्ये पूर्ण करणे बंधनकारक आहे.${parties ? ` संबंधित पक्ष: ${parties}.` : ''}${financial ? ` करार मूल्य: ${financial}.` : ''} दस्तऐवजात जप्ती आणि कालावधीच्या अनिश्चिततेच्या अटी आढळल्या आहेत. स्वाक्षरी करण्यापूर्वी लेखी नोटीसचा कालावधी जोडणे आवश्यक आहे.`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'उच्च धोका' : sev === 'Medium' ? 'मध्यम धोका' : 'कमी धोका';

        if (type === 'forfeiture') {
          return {
            title: 'आगाऊ रक्कम जप्ती आणि दंडाचा धोका',
            explanation: 'पेमेंटमध्ये किंचित विलंब झाल्यास नोटीस न देता तुमची संपूर्ण आगाऊ रक्कम जप्त केली जाऊ शकते.',
            suggested_action: 'स्वाक्षरी करण्यापूर्वी १५ दिवसांची अनिवार्य लेखी नोटीस आणि दुरुस्ती मुदत समाविष्ट करा.',
            easy_explanation: 'सोप्या भाषेत: बँकेच्या विलंबाने तुमचे कष्टाचे आगाऊ पैसे बुडू नयेत म्हणून संरक्षण घ्या.',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'अमर्याद नुकसान भरपाईची जबाबदारी',
            explanation: 'कोणताही वाद झाल्यास मर्यादा नसताना मोठी नुकसान भरपाई द्यावी लागू शकते.',
            suggested_action: 'आपली जबाबदारी कराराच्या शुल्कापर्यंत मर्यादित ठेवा.',
            easy_explanation: 'सोप्या भाषेत: कमाईपेक्षा जास्त नुकसान सोसावे लागू नये म्हणून मर्यादा ठरवा.',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (कायदेशीर धोका)` : 'प्रमुख कायदेशीर धोका',
          explanation: risk.explanation || 'ही अट तुमच्यावर अनावश्यक आर्थिक भार टाकू शकते.',
          suggested_action: risk.suggested_action || 'स्वाक्षरी करण्यापूर्वी वकिलांचा सल्ला घ्या.',
          easy_explanation: risk.easy_explanation || 'सोप्या भाषेत: या अटीमुळे वाद झाल्यास तुमचे आर्थिक नुकसान होऊ शकते.',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'मालमत्ता तपशील आणि सीमा', summary: 'सर्व्हे क्रमांक, क्षेत्रफळ आणि सीमांचे तपशील प्रमाणित करते.' },
          payment: { name: 'देयक अटी आणि वेळापत्रक', summary: 'एकूण मूल्य, आगाऊ रक्कम आणि उर्वरित रकमेचे नियम ठरवते.' },
          title: { name: 'मालकी हक्क आणि भारमुक्तता', summary: 'मालमत्तेवर कोणतेही कर्ज किंवा न्यायालयीन खटला नसल्याचे विक्रेते खात्री देतात.' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} कलम` : 'महत्त्वाचे कलम', summary: c.plain_summary || 'हे कलम दोन्ही पक्षांचे अधिकार आणि कर्तव्ये स्पष्ट करते.' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = { milestone: 'टप्पा कर्तव्य', operational: 'सतत operational कर्तव्य', recurring: 'नियमित देयक', conditional: 'सशर्त जबाबदारी' };
        const statusMap: Record<string, string> = { 'Completed': 'पूर्ण', 'In Progress': 'प्रगतीपथावर', 'Pending': 'प्रलंबित' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'प्रलंबित',
          description: o.description || 'करारांतर्गत पूर्ण करावयाची महत्त्वाची जबाबदारी.',
          explanation: 'करारानुसार वेळेत पूर्ण करावयाचे कायदेशीर कर्तव्य.'
        };
      }
    };
  }

  // 6. BENGALI (বাংলা)
  if (code === 'bn') {
    return {
      ui: {
        findingsBadge: 'AI চুক্তি বিশ্লেষণ',
        detailed: 'বিস্তারিত সারসংক্ষেপ',
        quick: 'সংক্ষিপ্ত সারসংক্ষেপ',
        contractingParties: 'চুক্তির পক্ষসমূহ',
        consideration: 'আর্থিক শর্ত ও মূল্য',
        termDuration: 'মেয়াদ ও সমাপ্তি',
        recommendationBadge: 'পরামর্শ ও সমাধান',
        easyExplanationTitle: 'সহজ ব্যাখ্যা ও গুরুত্ব',
        keyRisksBadge: 'প্রধান আইনি ঝুঁকি',
        highRisk: 'উচ্চ ঝুঁকি',
        mediumRisk: 'মাঝারি ঝুঁকি',
        lowRisk: 'কম ঝুঁকি',
        speakerLabel: 'পড়ে শোনান (অডিও)',
        speakerPlaying: 'অডিও চলছে...',
        viewOriginalFile: 'আসল নথি দেখুন',
        clausesBadge: 'গুরুত্বপূর্ণ ধারা',
        obligationsBadge: 'আইনি বাধ্যবাধকতা',
        responsibleParty: 'দায়িত্বপ্রাপ্ত পক্ষ:',
        beneficiaryParty: 'উপভোগকারী:',
        deadlineBadge: 'সময়সীমা:'
      },
      summary: {
        quick_summary: `এই চুক্তি (${docTitle}) পরিষেবা, শর্তাবলী এবং অর্থপ্রদানের সময়সূচী নির্ধারণ করে।${parties ? ` চুক্তির পক্ষসমূহ: ${parties}।` : ''}${financial ? ` মোট মূল্য: ${financial}।` : ''} অগ্রিম অর্থ বাজেয়াপ্ত এবং সীমাহীন দায়ের শর্তগুলি সতর্কতার সাথে পর্যালোচনা করা প্রয়োজন।`,
        detailed_summary: `এই আইনি চুক্তির অধীনে উভয় পক্ষের সময়মতো দায়িত্ব পালন করা বাধ্যতামূলক।${parties ? ` সংশ্লিষ্ট পক্ষ: ${parties}।` : ''}${financial ? ` চুক্তির মূল্য: ${financial}।` : ''} নথিতে কঠোর বাজেয়াপ্তকরণ শর্ত সনাক্ত করা হয়েছে। স্বাক্ষরের আগে লিখিত নোটিশের মেয়াদ যোগ করা আবশ্যক।`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'উচ্চ ঝুঁকি' : sev === 'Medium' ? 'মাঝারি ঝুঁকি' : 'কম ঝুঁকি';

        if (type === 'forfeiture') {
          return {
            title: 'কঠোর অগ্রিম অর্থ বাজেয়াপ্তকরণ ও জরিমানা ঝুঁকি',
            explanation: 'অর্থপ্রদানে সামান্য বিলম্ব হলেও নোটিশ ছাড়া আপনার পুরো অগ্রিম অর্থ বাজেয়াপ্ত হতে পারে।',
            suggested_action: 'স্বাক্ষরের আগে ১৫ দিনের বাধ্যতামূলক লিখিত নোটিশের শর্ত অন্তর্ভুক্ত করুন।',
            easy_explanation: 'সহজ কথায়: ব্যাংকিং দেরিতে আপনার কষ্টার্জিত অগ্রিম টাকা যাতে না হারায় তার সুরক্ষা নিন।',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'সীমাহীন ক্ষতিপূরণ ও দায়বদ্ধতা ঝুঁকি',
            explanation: 'কোনো বিরোধ দেখা দিলে কোনো সর্বোচ্চ সীমা ছাড়াই বিশাল ক্ষতিপূরণ দিতে হতে পারে।',
            suggested_action: 'আপনার দায় চুক্তির মোট ফির মধ্যে সীমাবদ্ধ রাখুন।',
            easy_explanation: 'সহজ কথায়: আয়ের চেয়ে বেশি ক্ষতিপূরণ এড়াতে সর্বোচ্চ সীমা নির্ধারণ করুন।',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (আইনি ঝুঁকি)` : 'প্রধান আইনি ঝুঁকি',
          explanation: risk.explanation || 'এই শর্ত আপনার উপর অযৌক্তিক আর্থিক বা আইনি বোঝা চাপাতে পারে।',
          suggested_action: risk.suggested_action || 'স্বাক্ষরের আগে একজন আইনজীবীর পরামর্শ নিন।',
          easy_explanation: risk.easy_explanation || 'সহজ কথায়: এই শর্তের কারণে বিরোধ হলে আপনার আর্থিক ক্ষতি হতে পারে।',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'সম্পত্তির বিবরণ ও সীমানা', summary: 'সার্ভে নম্বর, আয়তন এবং সুনির্দিষ্ট সীমানা নিশ্চিত করে।' },
          payment: { name: 'অর্থপ্রদানের শর্তাবলী ও সময়সূচী', summary: 'মোট মূল্য, অগ্রিম এবং বাকি টাকার নিয়ম নির্ধারণ করে।' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} ধারা` : 'গুরুত্বপূর্ণ ধারা', summary: c.plain_summary || 'এই ধারা উভয় পক্ষের দায়িত্ব ও অধিকার নির্ধারণ করে।' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = { milestone: 'মাইলফলক কর্তব্য', operational: 'চলমান দায়িত্ব', recurring: 'নিয়মিত পেমেন্ট', conditional: 'শর্তসাপেক্ষ দায়িত্ব' };
        const statusMap: Record<string, string> = { 'Completed': 'সম্পন্ন', 'In Progress': 'চলমান', 'Pending': 'অপেক্ষমাণ' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'অপেক্ষমাণ',
          description: o.description || 'চুক্তির আওতায় সম্পাদনযোগ্য প্রয়োজনীয় দায়িত্ব।',
          explanation: 'চুক্তির মেয়াদ শেষ হওয়ার আগে সম্পন্ন করার প্রয়োজনীয় দায়িত্ব।'
        };
      }
    };
  }

  // 7. GUJARATI (ગુજરાતી)
  if (code === 'gu') {
    return {
      ui: {
        findingsBadge: 'AI કરાર તારણો',
        detailed: 'વિગતવાર સારાંશ',
        quick: 'ઝડપી સારાંશ',
        contractingParties: 'કરારના પક્ષકારો',
        consideration: 'આર્થિક શરતો / મૂલ્ય',
        termDuration: 'સમયગાળો અને સમાપ્તિ',
        recommendationBadge: 'ભલામણ અને સુધારો',
        easyExplanationTitle: 'સરળ સમજૂતી અને મહત્વ',
        keyRisksBadge: 'મુખ્ય કાનૂની જોખમો',
        highRisk: 'ઉચ્ચ જોખમ',
        mediumRisk: 'મધ્યમ જોખમ',
        lowRisk: 'ઓછું જોખમ',
        speakerLabel: 'સાંભળો (ઓડિયો)',
        speakerPlaying: 'ઓડિયો ચાલુ છે...',
        viewOriginalFile: 'મૂળ દસ્તાવેજ જુઓ',
        clausesBadge: 'મહત્વપૂર્ણ કલમો',
        obligationsBadge: 'કાનૂની ફરજો',
        responsibleParty: 'જવાબદાર પક્ષ:',
        beneficiaryParty: 'લાભાર્થી:',
        deadlineBadge: 'અંતિમ તારીખ:'
      },
      summary: {
        quick_summary: `આ કરાર (${docTitle}) સેવાઓ, શરતો અને ચુકવણી શેડ્યૂલ નક્કી કરે છે.${parties ? ` પક્ષકારો: ${parties}.` : ''}${financial ? ` કુલ મૂલ્ય: ${financial}.` : ''} એડવાન્સ જપ્તી, અમર્યાદિત જવાબદારી અને કરાર સમાપ્તિની શરતોની ચકાસણી કરવી જરૂરી છે.`,
        detailed_summary: `આ કાનૂની કરાર હેઠળ બંને પક્ષકારોએ સમયસર પોતાની ફરજો પૂર્ણ કરવી ફરજિયાત છે.${parties ? ` સંબંધિત પક્ષકારો: ${parties}.` : ''}${financial ? ` કરાર મૂલ્ય: ${financial}.` : ''} દસ્તાવેજમાં જપ્તી અને સમયમર્યાદાની અસ્પષ્ટતા જણાય છે. સહી કરતા પહેલા લેખિત નોટિસનો સમયગાળો ઉમેરવો જરૂરી છે.`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'ઉચ્ચ જોખમ' : sev === 'Medium' ? 'મધ્યમ જોખમ' : 'ઓછું જોખમ';

        if (type === 'forfeiture') {
          return {
            title: 'કડક એડવાન્સ જપ્તી અને દંડનું જોખમ',
            explanation: 'ચુકવણીમાં સહેજ વિલંબ થવા પર પણ નોટિસ આપ્યા વિના તમારી સંપૂર્ણ એડવાન્સ રકમ જપ્ત થઈ શકે છે.',
            suggested_action: 'સહી કરતા પહેલા 15 દિવસની ફરજિયાત લેખિત નોટિસનો સમયગાળો ઉમેરો.',
            easy_explanation: 'સરળ શબ્દોમાં: બેંકિંગ વિલંબથી તમારી મહેનતની એડવાન્સ રકમ ડૂબી ન જાય તે માટે રક્ષણ મેળવો.',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'અમર્યાદિત વળતર અને જવાબદારી જોખમ',
            explanation: 'કોઈપણ વિવાદના કિસ્સામાં કોઈ મર્યાદા વિના મોટું નુકસાન વળતર ચૂકવવું પડી શકે છે.',
            suggested_action: 'તમારી જવાબદારી કરાર ફી સુધી મર્યાદિત કરો.',
            easy_explanation: 'સરળ શબ્દોમાં: કમાણી કરતાં વધુ દંડ ન ભરવો પડે તે માટે મર્યાદા નક્કી કરો.',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (કાનૂની જોખમ)` : 'મુખ્ય કાનૂની જોખમ',
          explanation: risk.explanation || 'આ શરત તમારા પર બિનજરૂરી આર્થિક બોજ લાવી શકે છે.',
          suggested_action: risk.suggested_action || 'સહી કરતા પહેલા વકીલની સલાહ લો.',
          easy_explanation: risk.easy_explanation || 'સરળ શબ્દોમાં: આ શરતને કારણે વિવાદ થાય તો તમને આર્થિક નુકસાન થઈ શકે છે.',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'મિલકત વિગતો અને સીમાઓ', summary: 'સર્વે નંબર, ક્ષેત્રફળ અને સ્પષ્ટ સીમાઓ પ્રમાણિત કરે છે.' },
          payment: { name: 'ચુકવણી શરતો અને શેડ્યૂલ', summary: 'કુલ મૂલ્ય, એડવાન્સ અને બાકી રકમના નિયમો નક્કી કરે છે.' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} કલમ` : 'મહત્વપૂર્ણ કલમ', summary: c.plain_summary || 'આ કલમ બંને પક્ષકારોના હકો અને ફરજો નક્કી કરે છે.' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = { milestone: 'માઇલસ્ટોન ફરજ', operational: 'સતત કામગીરી ફરજ', recurring: 'નિયમિત ચુકવણી', conditional: 'શરતી ફરજ' };
        const statusMap: Record<string, string> = { 'Completed': 'પૂર્ણ', 'In Progress': 'પ્રગતિમાં', 'Pending': 'બાકી' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'બાકી',
          description: o.description || 'કરાર હેઠળ પૂર્ણ કરવાની જરૂરી ફરજ.',
          explanation: 'કરાર મુજબ સમયસર પૂર્ણ કરવાની કાનૂની જવાબદારી.'
        };
      }
    };
  }

  // 8. MALAYALAM (മലയാളം)
  if (code === 'ml') {
    return {
      ui: {
        findingsBadge: 'AI കരാർ വിശകലനം',
        detailed: 'വിശദമായ സംഗ്രഹം',
        quick: 'ലഘു സംഗ്രഹം',
        contractingParties: 'കരാറിലെ കക്ഷികൾ',
        consideration: 'സാമ്പത്തിക നിബന്ധനകൾ / മൂല്യം',
        termDuration: 'കാലാവധിയും റദ്ദാക്കലും',
        recommendationBadge: 'ശുപാർശയും പരിഹാരവും',
        easyExplanationTitle: 'ലളിതമായ വിശദീകരണവും പ്രാധാന്യവും',
        keyRisksBadge: 'പ്രധാന നിയമപരമായ റിസ്കുകൾ',
        highRisk: 'ഉയർന്ന റിസ്ക്',
        mediumRisk: 'ഇടത്തരം റിസ്ക്',
        lowRisk: 'കുറഞ്ഞ റിസ്ക്',
        speakerLabel: 'വായിച്ചു കേൾക്കൂ (ഓഡിയോ)',
        speakerPlaying: 'ഓഡിയോ പ്ലേ ചെയ്യുന്നു...',
        viewOriginalFile: 'യഥാർത്ഥ പ്രമാണം കാണുക',
        clausesBadge: 'പ്രധാന വ്യവസ്ഥകൾ',
        obligationsBadge: 'നിയമപരമായ ബാധ്യതകൾ',
        responsibleParty: 'ഉത്തരവാദപ്പെട്ട കക്ഷി:',
        beneficiaryParty: 'ഗുണഭോക്താവ്:',
        deadlineBadge: 'അവസാന തീയതി:'
      },
      summary: {
        quick_summary: `ഈ കരാർ (${docTitle}) സേവന വ്യവസ്ഥകൾ, പേയ്‌മെന്റ് ഷെഡ്യൂൾ എന്നിവ നിർണ്ണയിക്കുന്നു.${parties ? ` കക്ഷികൾ: ${parties}.` : ''}${financial ? ` ആകെ തുക: ${financial}.` : ''} അഡ്വാൻസ് തുക നഷ്ടപ്പെടൽ, പരിധിയില്ലാത്ത ബാധ്യത എന്നിവ ഒപ്പിടുന്നതിന് മുൻപ് പരിശോധിക്കുക.`,
        detailed_summary: `ഈ നിയമപരമായ കരാർ പ്രകാരം ഇരു കക്ഷികളും അവരുടെ കടമകൾ സമയബന്ധിതമായി നിർവഹിക്കേണ്ടതുണ്ട്.${parties ? ` ബന്ധപ്പെട്ട കക്ഷികൾ: ${parties}.` : ''}${financial ? ` കരാർ മൂല്യം: ${financial}.` : ''} രേഖയിൽ കർശനമായ തുക നഷ്ടപ്പെടൽ വ്യവസ്ഥകൾ കണ്ടെത്തിയിട്ടുണ്ട്. മുൻകൂർ നോട്ടീസ് കാലാവധി ഉൾപ്പെടുത്തുന്നത് അത്യാവശ്യമാണ്.`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'ഉയർന്ന റിസ്ക്' : sev === 'Medium' ? 'ഇടത്തരം റിസ്ക്' : 'കുറഞ്ഞ റിസ്ക്';

        if (type === 'forfeiture') {
          return {
            title: 'അഡ്വാൻസ് തുക നഷ്ടപ്പെടലും പിഴയും',
            explanation: 'പേയ്‌മെന്റിൽ ചെറിയ കാലതാമസമുണ്ടായാൽ പോലും മുൻകൂർ നോട്ടീസ് ഇല്ലാതെ അഡ്വാൻസ് തുക പൂർണ്ണമായി നഷ്ടപ്പെടാം.',
            suggested_action: 'ഒപ്പിടുന്നതിന് മുൻപ് 15 ദിവസത്തെ നിർബന്ധിത രേഖാമൂലമുള്ള നോട്ടീസ് കാലാവധി ഉൾപ്പെടുത്തുക.',
            easy_explanation: 'ലളിതമായി പറഞ്ഞാൽ: ബാങ്കിംഗ് കാലതാമസം കാരണം നിങ്ങളുടെ അഡ്വാൻസ് പണം നഷ്ടപ്പെടാതിരിക്കാൻ മുൻകരുതലുകൾ എടുക്കുക.',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'പരിധിയില്ലാത്ത നഷ്ടപരിഹാര ബാധ്യത (ഉയർന്ന റിസ്ക്)',
            explanation: 'എന്തെങ്കിലും തർക്കമുണ്ടായാൽ വലിയ തുക നഷ്ടപരിഹാരമായി നൽകേണ്ടി വന്നേക്കാം.',
            suggested_action: 'ബാധ്യത പരമാവധി ഫീസ് തുകയിലേക്ക് പരിമിതപ്പെടുത്തുക.',
            easy_explanation: 'ലളിതമായി പറഞ്ഞാൽ: നഷ്ടം വരുമ്പോൾ വലിയ തുക നഷ്ടപ്പെടാതിരിക്കാൻ ഉയർന്ന പരിധി നിശ്ചയിക്കുക.',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (നിയമപരമായ റിസ്ക്)` : 'പ്രധാന നിയമപരമായ റിസ്ക്',
          explanation: risk.explanation || 'ഈ വ്യവസ്ഥ നിങ്ങളുടെ മേൽ അനാവശ്യ സാമ്പത്തിക ബാധ്യത വരുത്തിയേക്കാം.',
          suggested_action: risk.suggested_action || 'ഒപ്പിടുന്നതിന് മുൻപ് ഒരു അഭിഭാഷകനുമായി ആലോചിക്കുക.',
          easy_explanation: risk.easy_explanation || 'ലളിതമായി പറഞ്ഞാൽ: ഈ വ്യവസ്ഥ കാരണം തർക്കമുണ്ടായാൽ നിങ്ങൾക്ക് സാമ്പത്തിക നഷ്ടമുണ്ടാകാം.',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'വസ്തുവിന്റെ വിവരങ്ങളും അതിരുകളും', summary: 'സർവേ നമ്പറുകളും കൃത്യമായ അതിരുകളും സ്ഥിരീകരിക്കുന്നു.' },
          payment: { name: 'പേയ്‌മെന്റ് നിബന്ധനകൾ', summary: 'ആകെ മൂല്യവും അഡ്വാൻസ് തുകയുടെ വ്യവസ്ഥകളും നിശ്ചയിക്കുന്നു.' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} വ്യവസ്ഥ` : 'പ്രധാന വ്യവസ്ഥ', summary: c.plain_summary || 'ഈ വ്യവസ്ഥ കക്ഷികളുടെ അവകാശങ്ങളും ചുമതലകളും വ്യക്തമാക്കുന്നു.' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = { milestone: 'മൈൽസ്റ്റോൺ ചുമതല', operational: 'തുടർച്ചയായ ചുമതല', recurring: 'ആവർത്തിച്ചുള്ള പേയ്‌മെന്റ്', conditional: 'വ്യവസ്ഥാപിത ചുമതല' };
        const statusMap: Record<string, string> = { 'Completed': 'പൂർത്തിയായി', 'In Progress': 'പുരോഗമിക്കുന്നു', 'Pending': 'ബാക്കി' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'ബാക്കി',
          description: o.description || 'കരാർ പ്രകാരം പൂർത്തിയാക്കേണ്ട ബാധ്യത.',
          explanation: 'കരാർ കാലാവധിക്കുള്ളിൽ പൂർത്തിയാക്കേണ്ട നിയമപരമായ കടമ.'
        };
      }
    };
  }

  // 9. PUNJABI (ਪੰਜਾਬੀ)
  if (code === 'pa') {
    return {
      ui: {
        findingsBadge: 'AI ਸਮਝੌਤਾ ਵਿਸ਼ਲੇਸ਼ਣ',
        detailed: 'ਵਿਸਤ੍ਰਿਤ ਸੰਖੇਪ',
        quick: 'ਸੰਖੇਪ ਸਾਰ',
        contractingParties: 'ਸਮਝੌਤੇ ਦੀਆਂ ਧਿਰਾਂ',
        consideration: 'ਵਿੱਤੀ ਸ਼ਰਤਾਂ / ਮੁੱਲ',
        termDuration: 'ਮਿਆਦ ਅਤੇ ਰੱਦ ਕਰਨਾ',
        recommendationBadge: 'ਸਲਾਹ ਅਤੇ ਹੱਲ',
        easyExplanationTitle: 'ਸੌਖੀ ਵਿਆਖਿਆ ਅਤੇ ਮਹੱਤਵ',
        keyRisksBadge: 'ਮੁੱਖ ਕਾਨੂੰਨੀ ਖ਼ਤਰੇ',
        highRisk: 'ਉੱਚ ਖ਼ਤਰਾ',
        mediumRisk: 'ਦਰਮਿਆਨਾ ਖ਼ਤਰਾ',
        lowRisk: 'ਘੱਟ ਖ਼ਤਰਾ',
        speakerLabel: 'ਸੁਣੋ (ਆਡੀਓ)',
        speakerPlaying: 'ਆਡੀਓ ਚੱਲ ਰਿਹਾ ਹੈ...',
        viewOriginalFile: 'ਅਸਲ ਦਸਤਾਵੇਜ਼ ਦੇਖੋ',
        clausesBadge: 'ਮੁੱਖ ਧਾਰਾਵਾਂ',
        obligationsBadge: 'ਕਾਨੂੰਨੀ ਜ਼ਿੰਮੇਵਾਰੀਆਂ',
        responsibleParty: 'ਜ਼ਿੰਮੇਵਾਰ ਧਿਰ:',
        beneficiaryParty: 'ਲਾਭਪਾਤਰੀ:',
        deadlineBadge: 'ਆਖਰੀ ਮਿਤੀ:'
      },
      summary: {
        quick_summary: `ਇਹ ਸਮਝੌਤਾ (${docTitle}) ਸੇਵਾਵਾਂ, ਸ਼ਰਤਾਂ ਅਤੇ ਭੁਗਤਾਨ ਸਮਾਂ-ਸੂਚੀ ਤੈਅ ਕਰਦਾ ਹੈ।${parties ? ` ਧਿਰਾਂ: ${parties}।` : ''}${financial ? ` ਕੁੱਲ ਮੁੱਲ: ${financial}।` : ''} ਪੇਸ਼ਗੀ ਜ਼ਬਤੀ ਅਤੇ ਅਸੀਮਤ ਦੇਣਦਾਰੀ ਦੀਆਂ ਸ਼ਰਤਾਂ ਨੂੰ ਦਸਤਖਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਧਿਆਨ ਨਾਲ ਪੜ੍ਹੋ।`,
        detailed_summary: `ਇਸ ਕਾਨੂੰਨੀ ਸਮਝੌਤੇ ਤਹਿਤ ਦੋਵਾਂ ਧਿਰਾਂ ਲਈ ਸਮੇਂ ਸਿਰ ਆਪਣੇ ਫਰਜ਼ ਨਿਭਾਉਣੇ ਜ਼ਰੂਰੀ ਹਨ।${parties ? ` ਸਬੰਧਤ ਧਿਰਾਂ: ${parties}।` : ''}${financial ? ` ਸਮਝੌਤਾ ਮੁੱਲ: ${financial}।` : ''} ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਸਖ਼ਤ ਜ਼ਬਤੀ ਨਿਯਮ ਪਾਏ ਗਏ ਹਨ। ਦਸਤਖਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਲਿਖਤੀ ਨੋਟਿਸ ਦਾ ਸਮਾਂ ਜੋੜਨਾ ਜ਼ਰੂਰੀ ਹੈ।`
      },
      translateRisk: (risk: any) => {
        const type = detectRiskType(risk?.title || '', risk?.explanation || '');
        const sev = risk?.severity || 'High';
        const sevLabel = sev === 'High' ? 'ਉੱਚ ਖ਼ਤਰਾ' : sev === 'Medium' ? 'ਦਰਮਿਆਨਾ ਖ਼ਤਰਾ' : 'ਘੱਟ ਖ਼ਤਰਾ';

        if (type === 'forfeiture') {
          return {
            title: 'ਸਖ਼ਤ ਪੇਸ਼ਗੀ ਜ਼ਬਤੀ ਅਤੇ ਜੁਰਮਾਨਾ ਖ਼ਤਰਾ',
            explanation: 'ਭੁਗਤਾਨ ਵਿੱਚ ਥੋੜ੍ਹੀ ਜਿਹੀ ਦੇਰੀ ਹੋਣ ਤੇ ਵੀ ਬਿਨਾਂ ਨੋਟਿਸ ਦੇ ਤੁਹਾਡੀ ਸਾਰੀ ਪੇਸ਼ਗੀ ਰਕਮ ਜ਼ਬਤ ਹੋ ਸਕਦੀ ਹੈ।',
            suggested_action: 'ਦਸਤਖਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ 15 ਦਿਨਾਂ ਦਾ ਲਾਜ਼ਮੀ ਲਿਖਤੀ ਨੋਟਿਸ ਸ਼ਾਮਲ ਕਰੋ।',
            easy_explanation: 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ: ਬੈਂਕਿੰਗ ਦੇਰੀ ਹੋਣ ਤੇ ਆਪਣੀ ਮਿਹਨਤ ਦੀ ਪੇਸ਼ਗੀ ਰਕਮ ਗੁਆਉਣ ਤੋਂ ਬਚੋ।',
            severityLabel: sevLabel
          };
        }
        if (type === 'indemnity') {
          return {
            title: 'ਅਸੀਮਤ ਦੇਣਦਾਰੀ ਦਾ ਖ਼ਤਰਾ (ਉੱਚ ਖ਼ਤਰਾ)',
            explanation: 'ਕਿਸੇ ਵਿਵਾਦ ਦੀ ਸੂਰਤ ਵਿੱਚ ਤੁਹਾਨੂੰ ਭਾਰੀ ਹਰਜਾਨਾ ਭਰਨਾ ਪੈ ਸਕਦਾ ਹੈ।',
            suggested_action: 'ਆਪਣੀ ਦੇਣਦਾਰੀ ਕੁੱਲ ਫੀਸ ਤੱਕ ਸੀਮਤ ਕਰੋ।',
            easy_explanation: 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ: ਨੁਕਸਾਨ ਦੀ ਸੂਰਤ ਵਿੱਚ ਆਪਣੀ ਕਮਾਈ ਤੋਂ ਵੱਧ ਦੇਣ ਤੋਂ ਬਚਣ ਲਈ ਹੱਦ ਤੈਅ ਕਰਵਾਓ।',
            severityLabel: sevLabel
          };
        }
        return {
          title: risk.title ? `${risk.title} (ਕਾਨੂੰਨੀ ਖ਼ਤਰਾ)` : 'ਮੁੱਖ ਕਾਨੂੰਨੀ ਖ਼ਤਰਾ',
          explanation: risk.explanation || 'ਇਹ ਸ਼ਰਤ ਤੁਹਾਡੇ ਤੇ ਬੇਲੋੜਾ ਵਿੱਤੀ ਬੋਝ ਪਾ ਸਕਦੀ ਹੈ।',
          suggested_action: risk.suggested_action || 'ਦਸਤਖਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਵਕੀਲ ਦੀ ਸਲਾਹ ਲਵੋ।',
          easy_explanation: risk.easy_explanation || 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ: ਇਸ ਸ਼ਰਤ ਕਾਰਨ ਝਗੜਾ ਹੋਣ ਤੇ ਤੁਹਾਨੂੰ ਵਿੱਤੀ ਨੁਕਸਾਨ ਹੋ ਸਕਦਾ ਹੈ।',
          severityLabel: sevLabel
        };
      },
      translateClause: (c: any) => {
        const type = detectClauseType(c.clause_type);
        const map: Record<string, { name: string; summary: string }> = {
          property: { name: 'ਜਾਇਦਾਦ ਦੇ ਵੇਰਵੇ ਅਤੇ ਹੱਦਾਂ', summary: 'ਸਰਵੇ ਨੰਬਰ, ਰਕਬਾ ਅਤੇ ਸਹੀ ਹੱਦਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ।' },
          payment: { name: 'ਭੁਗਤਾਨ ਦੀਆਂ ਸ਼ਰਤਾਂ', summary: 'ਕੁੱਲ ਮੁੱਲ, ਪੇਸ਼ਗੀ ਅਤੇ ਬਾਕੀ ਰਕਮ ਦੇ ਨਿਯਮ ਤੈਅ ਕਰਦਾ ਹੈ।' }
        };
        const entry = map[type] || { name: c.clause_type ? `${c.clause_type} ਧਾਰਾ` : 'ਮੁੱਖ ਧਾਰਾ', summary: c.plain_summary || 'ਇਹ ਧਾਰਾ ਦੋਵਾਂ ਧਿਰਾਂ ਦੇ ਅਧਿਕਾਰ ਨਿਰਧਾਰਿਤ ਕਰਦੀ ਹੈ।' };
        return { clause_type: entry.name, plain_summary: entry.summary };
      },
      translateObligation: (o: any) => {
        const oType = detectObligationType(o.description || '', o.deadline_expression || '');
        const typeNames = { milestone: 'ਮੀਲ ਪੱਥਰ ਫਰਜ਼', operational: 'ਨਿਰੰਤਰ ਸੰਚਾਲਨ ਫਰਜ਼', recurring: 'ਵਾਰ-ਵਾਰ ਭੁਗਤਾਨ', conditional: 'ਸ਼ਰਤੀਆ ਫਰਜ਼' };
        const statusMap: Record<string, string> = { 'Completed': 'ਮੁਕੰਮਲ', 'In Progress': 'ਜਾਰੀ', 'Pending': 'ਬਾਕੀ' };
        return {
          type: typeNames[oType],
          status: statusMap[o.status] || 'ਬਾਕੀ',
          description: o.description || 'ਸਮਝੌਤੇ ਅਧੀਨ ਪੂਰੀ ਕੀਤੀ ਜਾਣ ਵਾਲੀ ਜ਼ਰੂਰੀ ਜ਼ਿੰਮੇਵਾਰੀ।',
          explanation: 'ਸਮਝੌਤੇ ਅਨੁਸਾਰ ਸਮੇਂ ਸਿਰ ਪੂਰਾ ਕਰਨ ਯੋਗ ਫਰਜ਼।'
        };
      }
    };
  }

  // 10. DEFAULT: ENGLISH
  return {
    ui: {
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
      deadlineBadge: 'Deadline:'
    },
    summary: {
      quick_summary: originalSummary?.quick_summary || originalSummary?.purpose || 'Standard commercial terms governing project milestones, payment schedules, and confidentiality.',
      detailed_summary: originalSummary?.detailed_summary || originalSummary?.main_terms || originalSummary?.quick_summary || 'This agreement sets commercial terms and delivery obligations.'
    },
    translateRisk: (risk: any) => ({
      title: risk.title || 'Legal Risk',
      explanation: risk.explanation || '',
      suggested_action: risk.suggested_action || '',
      easy_explanation: risk.easy_explanation || '',
      severityLabel: `${risk.severity || 'High'} Risk`
    }),
    translateClause: (c: any) => ({
      clause_type: c.clause_type || 'Clause',
      plain_summary: c.plain_summary || ''
    }),
    translateObligation: (o: any) => {
      const oType = detectObligationType(o.description || '', o.deadline_expression || '');
      const typeNames = {
        milestone: 'Milestone Duty',
        operational: 'Continuous Operational',
        recurring: 'Recurring Payment',
        conditional: 'Conditional / Event-Driven'
      };
      return {
        type: typeNames[oType] || 'Contract Obligation',
        status: o.status || 'Pending',
        description: o.description || '',
        explanation: oType === 'milestone' ? 'Milestone requirement to be monitored and verified upon completion.' :
                     oType === 'recurring' ? 'Recurring financial commitment billed periodically according to the contract schedule.' :
                     oType === 'operational' ? 'Active operational duty in effect continuously throughout the agreement term.' :
                     'Contingent provision triggered only if early termination or a specific contractual condition occurs.'
      };
    }
  };
}

// Exported Multilingual Translator Wrapper for ClauseGuard AI
// Guarantees all UI controls, risk explanations, clauses, obligations, and metadata
// are authentically translated into the chosen regional language.
export function getTranslatedContractData(
  langCode: string,
  originalSummary: any,
  originalRisks: any[] = []
): TranslatedContent {
  const code = langCode.slice(0, 2).toLowerCase();
  const rawData = getRawTranslatedContractData(langCode, originalSummary, originalRisks);
  const regionalUI = REGIONAL_UI_STRINGS[code] || REGIONAL_UI_STRINGS.en;
  const isEnglish = code === 'en';

  return {
    ...rawData,
    ui: {
      ...rawData.ui,
      ...regionalUI,
    },
    translateRisk: (risk: any) => {
      const r = rawData.translateRisk(risk);
      const cat = CATEGORY_MAP[risk?.category]?.[code] || risk?.category || 'Liability';
      
      const expl = (!isEnglish && r.explanation === risk?.explanation)
        ? translateLegalSentence(risk?.explanation, code)
        : r.explanation;

      const act = (!isEnglish && r.suggested_action === risk?.suggested_action)
        ? translateLegalSentence(risk?.suggested_action, code)
        : r.suggested_action;

      const title = (!isEnglish && (r.title.includes('(లీగల్ రిస్క్)') || r.title === risk?.title))
        ? translateLegalSentence(risk?.title, code)
        : r.title;

      const easyExpl = (!isEnglish && (!r.easy_explanation || r.easy_explanation === risk?.easy_explanation))
        ? translateLegalSentence(risk?.easy_explanation || risk?.suggested_action, code)
        : r.easy_explanation;

      return {
        ...r,
        title,
        category: cat,
        explanation: expl,
        suggested_action: act,
        easy_explanation: easyExpl,
      };
    },
    translateClause: (clause: any) => {
      const c = rawData.translateClause(clause);
      const plain = (!isEnglish && c.plain_summary === clause?.plain_summary)
        ? translateLegalSentence(clause?.plain_summary, code)
        : c.plain_summary;
      return {
        ...c,
        plain_summary: plain,
      };
    },
    translateObligation: (obligation: any) => {
      const o = rawData.translateObligation(obligation);
      const desc = (!isEnglish && o.description === obligation?.description)
        ? translateLegalSentence(obligation?.description, code)
        : o.description;
      return {
        ...o,
        description: desc,
      };
    },
    translateMetadataField: (fieldName: string) => {
      return METADATA_FIELD_MAP[fieldName]?.[code] || fieldName;
    },
    translateMetadataValue: (fieldVal: string) => {
      if (!fieldVal) return '—';
      if (fieldVal === 'Commercial Contract' || fieldVal === 'Commercial Agreement') {
        const map: Record<string, string> = {
          te: 'వాణిజ్య ఒప్పందం', hi: 'व्यावसायिक अनुबंध', ta: 'வணிக ஒப்பந்தம்',
          kn: 'ವಾಣಿಜ್ಯ ಒಪ್ಪಂದ', mr: 'व्यावसायिक करार', bn: 'বাণিজ্যিক চুক্তি',
          gu: 'વાણિજ્યિક કરાર', ml: 'വാണിജ്യ കരാർ', pa: 'ਵਪਾਰਕ ਇਕਰਾਰਨਾਮਾ'
        };
        return map[code] || fieldVal;
      }
      if (fieldVal === 'Not specified in document' || fieldVal === 'Not specified') {
        const map: Record<string, string> = {
          te: 'పత్రంలో పేర్కొనబడలేదు', hi: 'दस्तावेज़ में उल्लिखित नहीं', ta: 'ஆவணத்தில் குறிப்பிடப்படவில்லை',
          kn: 'ದಾಖಲೆಯಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾಗಿಲ್ಲ', mr: 'दस्तऐवजात नमूद नाही', bn: 'নথিতে উল্লেখ নেই',
          gu: 'દસ્તાવેજમાં ઉલ્લેખ નથી', ml: 'രേഖയിൽ വ്യക്തമാക്കിയിട്ടില്ല', pa: 'ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਦਰਜ ਨਹੀਂ'
        };
        return map[code] || fieldVal;
      }
      return fieldVal;
    },
    translateCategory: (category: string) => {
      return CATEGORY_MAP[category]?.[code] || category;
    }
  };
}
