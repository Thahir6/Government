import { ScamAnalysisResult, Language } from '@/types';
import { INITIAL_SCHEMES } from '@/data/mockDatabase';

const OFFICIAL_GOV_DOMAINS = [
  'gov.in',
  'nic.in',
  'scholarships.gov.in',
  'pmkisan.gov.in',
  'beneficiary.nha.gov.in',
  'nsap.nic.in',
  'jnanabhumi.ap.gov.in',
  'kviconline.gov.in',
  'pmaymis.gov.in',
  'aicte-india.org',
  'uidai.gov.in',
  'india.gov.in',
  'myscheme.gov.in',
  'digitallocker.gov.in'
];

const SUSPICIOUS_KEYWORDS = [
  { pattern: /\b(otp|one time password|pin|atm pin|cvv|netbanking password|upi pin)\b/i, label: "Requests for OTP / PIN or sensitive banking security credentials." },
  { pattern: /\b(processing fee|registration fee|pay ₹|pay rs|security deposit|transfer ₹|advance fee|charge of ₹)\b/i, label: "Demands upfront payment or registration fee to release a government benefit." },
  { pattern: /\b(urgent|immediate action|account blocked|within 24 hours|expire today|last chance)\b/i, label: "Uses artificial panic, pressure, or urgency tactics typical of social engineering." },
  { pattern: /\b(bit\.ly|tinyurl\.com|t\.co|wa\.me|cutt\.ly|rb\.gy)\b/i, label: "Contains obfuscated short-links hiding the destination server." },
  { pattern: /\b(\.xyz|\.top|\.online|\.site|\.club|\.buzz|\.live|\.vip|\.loan)\b/i, label: "Hosts claim on a non-governmental generic top-level domain (gTLD)." },
  { pattern: /\b(pm-loan|free smartphone|free laptop 2026|pm solar free gift|lottery winner|modi yojna cash)\b/i, label: "References viral fake schemes often used in phishing campaigns." }
];

export function analyzeScamMessage(text: string, lang: Language = 'en'): ScamAnalysisResult {
  const cleanText = text.trim();
  
  if (!cleanText) {
    return {
      safetyLevel: 'UNVERIFIABLE',
      riskScore: 30,
      headline: lang === 'te' ? "సందేశం ఖాళీగా ఉంది" : lang === 'hi' ? "संदेश खाली है" : "No Content Provided",
      summary: lang === 'te' 
        ? "దయచేసి విశ్లేషణ కోసం సందేశం లేదా లింక్‌ను నమోదు చేయండి." 
        : lang === 'hi' 
        ? "कृपया विश्लेषण हेतु संदेश या लिंक दर्ज करें।" 
        : "Please paste a message, SMS, or link to evaluate.",
      identifiedRedFlags: [],
      verifiedSafetySignals: [],
      recommendedAction: "Paste the content you wish to inspect."
    };
  }

  const detectedRedFlags: string[] = [];
  const detectedSafetySignals: string[] = [];
  let riskPoints = 0;

  // 1. Check for suspicious keywords & fraud triggers
  for (const item of SUSPICIOUS_KEYWORDS) {
    if (item.pattern.test(cleanText)) {
      detectedRedFlags.push(item.label);
      riskPoints += 25;
    }
  }

  // 2. Extract potential URLs
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const urls = cleanText.match(urlRegex) || [];

  let matchedGovDomain: string | null = null;
  let hasNonGovUrl = false;

  for (const urlStr of urls) {
    try {
      const parsedUrl = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
      const hostname = parsedUrl.hostname.toLowerCase();

      const isGov = OFFICIAL_GOV_DOMAINS.some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
      if (isGov) {
        matchedGovDomain = hostname;
        detectedSafetySignals.push(`URL points to an authentic government domain (${hostname}).`);
      } else {
        hasNonGovUrl = true;
        detectedRedFlags.push(`URL (${hostname}) does not match the official .gov.in or .nic.in registry.`);
        riskPoints += 35;
      }
    } catch {
      // Invalid URL format
    }
  }

  // 3. Match against verified schemes in our database
  let matchedOfficialScheme = INITIAL_SCHEMES.find(s => {
    const sNameEn = s.name.en.toLowerCase();
    const sNameTe = s.name.te.toLowerCase();
    const sNameHi = s.name.hi.toLowerCase();
    const lower = cleanText.toLowerCase();
    return lower.includes(s.id.toLowerCase()) || 
           lower.includes(sNameEn) || 
           lower.includes(sNameTe) || 
           lower.includes(sNameHi) ||
           (s.officialSource.url && cleanText.includes(s.officialSource.url));
  });

  if (matchedOfficialScheme && !hasNonGovUrl && detectedRedFlags.length === 0) {
    detectedSafetySignals.push(`Corresponds directly with official published record: ${matchedOfficialScheme.name.en}`);
    detectedSafetySignals.push(`Authentic Department: ${matchedOfficialScheme.department}`);
  }

  // Determine safety level
  let safetyLevel: 'OFFICIAL_MATCH' | 'UNVERIFIABLE' | 'SUSPICIOUS';
  let headline = "";
  let summary = "";
  let recommendedAction = "";

  if (riskPoints >= 35 || detectedRedFlags.length >= 2) {
    safetyLevel = 'SUSPICIOUS';
    headline = lang === 'te' 
      ? "హెచ్చరిక: అనుమానాస్పద / మోసపూరిత సందేశం" 
      : lang === 'hi' 
      ? "चेतावनी: संभावित रूप से संदिग्ध / फर्जी संदेश" 
      : "Caution: Potentially Suspicious / High Risk";
    summary = lang === 'te' 
      ? "ఈ సందేశంలో సైబర్ నేరగాళ్లు ఉపయోగించే అనుమానాస్పద లింకులు, రుసుము అభ్యర్థనలు లేదా OTP కోరే సంకేతాలు గుర్తించబడ్డాయి." 
      : lang === 'hi' 
      ? "इस संदेश में साइबर ठगों द्वारा प्रयुक्त फर्जी लिंक, शुल्क मांग या ओटीपी मांगने जैसे स्पष्ट खतरे पाए गए हैं।" 
      : "This message exhibits strong indicators of scheme impersonation, phishing, or financial solicitation.";
    recommendedAction = lang === 'te'
      ? "ఎట్టి పరిస్థితుల్లోనూ డబ్బులు చెల్లించవద్దు లేదా OTP పంచుకోవద్దు. అధికారిక పోర్టల్ ద్వారా మాత్రమే ధృవీకరించుకోండి."
      : lang === 'hi'
      ? "किसी भी स्थिति में पैसे न भेजें और न ही ओटीपी साझा करें। केवल आधिकारिक पोर्टल पर ही जांच करें।"
      : "Never pay any registration fee or share OTPs. Always confirm with the official .gov.in portal directly.";
  } else if (matchedGovDomain && detectedRedFlags.length === 0) {
    safetyLevel = 'OFFICIAL_MATCH';
    headline = lang === 'te' 
      ? "అధికారిక రికార్డుతో సరిపోలింది" 
      : lang === 'hi' 
      ? "आधिकारिक रिकॉर्ड से सत्यापित" 
      : "Matches Verified Official Record";
    summary = lang === 'te' 
      ? "ఈ సందేశం అధికారిక భారత ప్రభుత్వ పోర్టల్ మరియు ధృవీకరించబడిన నిబంధనలకు అనుగుణంగా ఉంది." 
      : lang === 'hi' 
      ? "यह जानकारी भारत सरकार के आधिकारिक डोमेन और स्वीकृत योजनाओं से मेल खाती है।" 
      : "The domain and details align with authentic registered government portals.";
    recommendedAction = lang === 'te'
      ? "మీరు సురక్షితంగా అధికారిక పోర్టల్‌లో కొనసాగవచ్చు."
      : lang === 'hi'
      ? "आप आधिकारिक पोर्टल पर सुरक्षित रूप से आगे बढ़ सकते हैं।"
      : "Proceed directly via the verified official portal. Ensure browser address bar displays .gov.in.";
  } else {
    safetyLevel = 'UNVERIFIABLE';
    headline = lang === 'te' 
      ? "ధృవీకరించడం సాధ్యం కాలేదు / జాగ్రత్త వహించండి" 
      : lang === 'hi' 
      ? "सत्यापन संभव नहीं / सतर्कता अपेक्षित" 
      : "Unable to Verify / Caution Advised";
    summary = lang === 'te' 
      ? "ఈ సందేశంలో ప్రస్తావించిన సమాచారం అధికారిక డేటాబేస్‌లో లభించలేదు లేదా తగిన వివరాలు లేవు." 
      : lang === 'hi' 
      ? "इस संदेश की सामग्री हमारे सत्यापित सरकारी डेटाबेस में उपलब्ध नहीं है।" 
      : "The claim cannot be confirmed against current verified government gazettes or official records.";
    recommendedAction = lang === 'te'
      ? "సమీప ప్రభుత్వ సచివాలయం లేదా అధికారిక హెల్ప్‌లైన్ ద్వారా నిర్ధారించుకోండి."
      : lang === 'hi'
      ? "निकटतम सरकारी केंद्र या आधिकारिक राष्ट्रीय हेल्पलाइन से पुष्टि करें।"
      : "Verify via official government helplines (e.g. 1930 for Cyber Crime or 14447 for PM schemes) before taking action.";
  }

  return {
    safetyLevel,
    riskScore: Math.min(100, riskPoints),
    headline,
    summary,
    identifiedRedFlags: detectedRedFlags,
    verifiedSafetySignals: detectedSafetySignals,
    matchedOfficialRecord: matchedOfficialScheme ? {
      schemeName: matchedOfficialScheme.name.en,
      officialUrl: matchedOfficialScheme.officialSource.url,
      verifiedDepartment: matchedOfficialScheme.department
    } : undefined,
    recommendedAction
  };
}

/**
 * Pre-configured real-world sample scam and verified messages for hackathon demos
 */
export const SCAM_DEMO_SAMPLES = [
  {
    id: "sample_loan_fee",
    title: {
      en: "Fake PM Mudra Loan SMS (Fee Demand)",
      te: "నకిలీ పీఎం లోన్ ఎస్ఎంఎస్ (ఫీజు అభ్యర్థన)",
      hi: "फर्जी पीएम मुद्रा ऋण एसएमएस (शुल्क मांग)"
    },
    message: "Congratulation! Your PM-Yojna loan of Rs 2,50,000 has been approved under Reg ID #9921. To release fund into your account immediately, pay mandatory registration charges Rs 499 via UPI to verify bank. Click: http://pm-loan-approval.xyz/pay"
  },
  {
    id: "sample_nsp_otp",
    title: {
      en: "Fake NSP Scholarship OTP Phishing",
      te: "నకిలీ స్కాలర్‌షిప్ OTP మోసం",
      hi: "फर्जी छात्रवृत्ति ओटीपी धोखाधड़ी"
    },
    message: "Urgent NSP Notice: Your Post-Matric scholarship amount Rs 50,000 is ready for transfer. Your account is on hold. Share the 6-digit Aadhaar OTP immediately on WhatsApp at wa.me/919876543210 to activate payment."
  },
  {
    id: "sample_solar_phish",
    title: {
      en: "Fake Free Solar Scheme Link",
      te: "నకిలీ ఉచిత సోలార్ పథకం లింక్",
      hi: "फर्जी मुफ्त सोलर योजना लिंक"
    },
    message: "Pradhan Mantri Free Rooftop Solar Yojana 2026! Free solar panel installation for all houses. Offer valid only for next 24 hours. Fill your bank details & ATM PIN at http://bit.ly/pm-solar-free"
  },
  {
    id: "sample_genuine_kisan",
    title: {
      en: "Genuine PM-KISAN Government Portal",
      te: "నిజమైన పీఎం-కిసాన్ అధికారిక పోర్టల్",
      hi: "असली पीएम-किसान आधिकारिक पोर्टल"
    },
    message: "Dear Beneficiary, check your PM-KISAN 17th installment status and complete biometric eKYC at the official portal: https://pmkisan.gov.in under Farmers Corner. Never share confidential details."
  }
];
