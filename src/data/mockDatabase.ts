import { Scheme, Scholarship, UserProfile, SavedApplication, AuditLog } from '@/types';

export const DEMO_PERSONAS: Record<string, UserProfile> = {
  student: {
    id: "usr_student_01",
    name: "Ananya Sharma",
    age: 19,
    gender: "Female",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    educationLevel: "Undergraduate",
    isStudent: true,
    course: "B.Tech (Computer Science & Engineering)",
    yearOfStudy: "2nd Year",
    institutionType: "Government",
    annualFamilyIncome: 180000, // ₹1.8 Lakh
    employmentStatus: "Student",
    category: "OBC",
    isFarmer: false,
    isSeniorCitizen: false,
    isDifferentlyAbled: false,
    language: "en",
    hasIncomeCertificate: true,
    hasCasteCertificate: true,
    hasDomicileCertificate: true,
    hasRationCard: true,
  },
  farmer: {
    id: "usr_farmer_02",
    name: "Ramesh Patel",
    age: 46,
    gender: "Male",
    state: "Madhya Pradesh",
    district: "Sehore",
    educationLevel: "10th Pass",
    isStudent: false,
    annualFamilyIncome: 95000, // ₹95,000
    employmentStatus: "Farmer",
    category: "OBC",
    isFarmer: true,
    landHoldingAcres: 3.5,
    hasKisanCreditCard: true,
    isSeniorCitizen: false,
    isDifferentlyAbled: false,
    language: "hi",
    hasIncomeCertificate: true,
    hasCasteCertificate: true,
    hasDomicileCertificate: true,
    hasRationCard: true,
  },
  senior: {
    id: "usr_senior_03",
    name: "Sundaramma K.",
    age: 67,
    gender: "Female",
    state: "Andhra Pradesh",
    district: "Guntur",
    educationLevel: "Below 10th",
    isStudent: false,
    annualFamilyIncome: 45000, // ₹45,000
    employmentStatus: "Retired",
    category: "SC",
    isFarmer: false,
    isSeniorCitizen: true,
    isDifferentlyAbled: false,
    language: "te",
    hasIncomeCertificate: true,
    hasCasteCertificate: true,
    hasDomicileCertificate: true,
    hasRationCard: true,
  },
  citizen: {
    id: "usr_citizen_04",
    name: "Vikram Verma",
    age: 29,
    gender: "Male",
    state: "Telangana",
    district: "Hyderabad",
    educationLevel: "Undergraduate",
    isStudent: false,
    annualFamilyIncome: 240000, // ₹2.4 Lakh
    employmentStatus: "Self-Employed",
    category: "General",
    isFarmer: false,
    isSeniorCitizen: false,
    isDifferentlyAbled: false,
    language: "en",
    hasIncomeCertificate: false,
    hasCasteCertificate: false,
    hasDomicileCertificate: true,
    hasRationCard: false,
  }
};

export const INITIAL_SCHEMES: (Scheme | Scholarship)[] = [
  // 1. National Post-Matric Scholarship
  {
    id: "sch_post_matric_01",
    name: {
      en: "Post-Matric Scholarship for SC/ST/OBC Students",
      te: "ఎస్సీ/ఎస్టీ/ఓబీసీ విద్యార్థుల పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్",
      hi: "एससी/एसटी/ओबीसी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति"
    },
    shortDescription: {
      en: "100% Tuition Support + Monthly Allowance",
      te: "100% ఫీజు మినహాయింపు + నెలవారీ అలవెన్స్",
      hi: "100% शिक्षण शुल्क + मासिक निर्वाह भत्ता"
    },
    detailedDescription: {
      en: "Centrally sponsored flagship scheme providing complete financial support to enable eligible students from marginalized communities to pursue post-matriculation or post-secondary courses up to degree, master's and doctoral levels.",
      te: "డిగ్రీ, పీజీ, డాక్టరేట్ స్థాయి వరకు చదివే నిరుపేద వెనుకబడిన వర్గాల విద్యార్థులకు ట్యూషన్ ఫీజు, హాస్టల్ చార్జీలను కేంద్ర ప్రభుత్వం భరిస్తుంది.",
      hi: "कक्षा 11वीं, 12वीं, स्नातक, स्नातकोत्तर और तकनीकी पाठ्यक्रमों की पूरी फीस प्रतिपूर्ति और छात्रवृत्ति सीधे बैंक खाते में प्रदान की जाती है।"
    },
    purpose: "Support higher education and eliminate dropouts due to financial adversity.",
    category: "Scholarships",
    coverage: "Central",
    department: "Ministry of Social Justice and Empowerment",
    status: "Active",
    isScholarship: true,
    benefitsSummary: {
      en: "100% Tuition fee waiver + ₹12,000 to ₹15,000 annual maintenance allowance directly into Aadhaar-seeded bank account.",
      te: "100% ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + రూ. 12,000 నుండి 15,000 వరకు వార్షిక నిర్వహణ భత్యం.",
      hi: "100% शिक्षण शुल्क माफी + ₹12,000 से ₹15,000 वार्षिक निर्वाह भत्ता सीधे आधार से जुड़े बैंक खाते में।"
    },
    maxBenefitAmount: "Up to ₹60,000 / year",
    applicationDeadline: "2026-10-31",
    applicationWindow: "July 2026 - October 2026",
    officialSource: {
      url: "https://scholarships.gov.in",
      publisher: "National Scholarship Portal (NSP), Government of India",
      department: "Ministry of Social Justice & Empowerment",
      verificationDate: "2026-08-28",
      reviewer: "Govt Verification Officer #104",
      version: "v4.2",
      changeNotes: "Income threshold confirmed at ₹2,50,000 per annum for 2026-27 academic cycle."
    },
    rules: [
      {
        id: "rule_pm_01",
        schemeId: "sch_post_matric_01",
        field: "isStudent",
        operator: "==",
        value: true,
        isMandatory: true,
        explanation: {
          en: "Applicant must be an actively enrolled student.",
          te: "దరఖాస్తుదారు తప్పనిసరిగా విద్యార్థి అయి ఉండాలి.",
          hi: "आवेदक का सक्रिय रूप से नामांकित छात्र होना अनिवार्य है।"
        }
      },
      {
        id: "rule_pm_02",
        schemeId: "sch_post_matric_01",
        field: "annualFamilyIncome",
        operator: "<=",
        value: 250000,
        isMandatory: true,
        explanation: {
          en: "Annual family income must not exceed ₹2,50,000.",
          te: "వార్షిక కుటుంబ ఆదాయం రూ. 2,50,000 మించకూడదు.",
          hi: "वार्षिक पारिवारिक आय ₹2,50,000 से अधिक नहीं होनी चाहिए।"
        }
      },
      {
        id: "rule_pm_03",
        schemeId: "sch_post_matric_01",
        field: "category",
        operator: "in",
        value: ["SC", "ST", "OBC"],
        isMandatory: true,
        explanation: {
          en: "Applicant must belong to SC, ST, or OBC category with valid certificate.",
          te: "దరఖాస్తుదారు ఎస్సీ, ఎస్టీ లేదా ఓబీసీ కేటగిరీకి చెందినవారై ఉండాలి.",
          hi: "आवेदक का एससी, एसटी या ओबीसी श्रेणी से संबंधित होना आवश्यक है।"
        }
      },
      {
        id: "rule_pm_04",
        schemeId: "sch_post_matric_01",
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Postgraduate", "Doctoral / Ph.D", "Vocational / Diploma", "12th Pass"],
        isMandatory: true,
        explanation: {
          en: "Must be pursuing post-matriculation studies (11th, 12th, Degree, Diploma, or PG).",
          te: "10వ తరగతి తర్వాత ఉన్నత చదువులు (డిగ్రీ, డిప్లొమా, పీజీ మొదలైనవి) చదువుతుండాలి.",
          hi: "कक्षा 10वीं उत्तीर्ण होने के बाद उच्च अध्ययनरत होना चाहिए।"
        }
      },
      {
        id: "rule_pm_05",
        schemeId: "sch_post_matric_01",
        field: "hasIncomeCertificate",
        operator: "==",
        value: true,
        isMandatory: false,
        explanation: {
          en: "Valid government-issued Income Certificate required for disbursement.",
          te: "ఆదాయ ధృవీకరణ పత్రం సమర్పించాల్సి ఉంటుంది.",
          hi: "सक्षम प्राधिकारी द्वारा जारी आय प्रमाण पत्र आवश्यक है।"
        }
      }
    ],
    documents: [
      {
        id: "doc_pm_01",
        schemeId: "sch_post_matric_01",
        name: { en: "Aadhaar Card", te: "ఆధార్ కార్డు", hi: "आधार कार्ड" },
        type: "Required",
        description: { en: "Used for identity authentication and DBT bank account seeding.", te: "గుర్తింపు మరియు ప్రత్యక్ష నగదు బదిలీ కోసం.", hi: "पहचान और सीधे बैंक खाते में भुगतान सत्यापन के लिए।" },
        issuingAuthority: "UIDAI"
      },
      {
        id: "doc_pm_02",
        schemeId: "sch_post_matric_01",
        name: { en: "Caste / Community Certificate", te: "కుల ధృవీకరణ పత్రం", hi: "जाति प्रमाण पत्र" },
        type: "Required",
        description: { en: "Official Tahsildar / Revenue Department verified digital certificate.", te: "మీసేవ లేదా రెవెన్యూ శాఖ జారీ చేసిన డిజిటల్ కుల ధ్రువీకరణ పత్రం.", hi: "सक्षम राजस्व अधिकारी द्वारा जारी डिजिटल जाति प्रमाण पत्र।" },
        issuingAuthority: "Revenue Dept / Meeseva"
      },
      {
        id: "doc_pm_03",
        schemeId: "sch_post_matric_01",
        name: { en: "Family Income Certificate", te: "ఆదాయ ధృవీకరణ పత్రం", hi: "आय प्रमाण पत्र" },
        type: "Required",
        description: { en: "Income certificate valid for current financial year reflecting < ₹2.5 Lakh.", te: "ప్రస్తుత ఆర్థిక సంవత్సరానికి చెల్లుబాటయ్యే ఆదాయ పత్రం.", hi: "चालू वित्तीय वर्ष हेतु वैध आय प्रमाण पत्र।" },
        issuingAuthority: "Revenue Dept / Tahsildar"
      },
      {
        id: "doc_pm_04",
        schemeId: "sch_post_matric_01",
        name: { en: "College Bonafide Certificate / Admission Receipt", te: "కాలేజ్ బోనఫైడ్ లేదా ఫీజు రసీదు", hi: "कॉलेज बोनाफाइड / प्रवेश रसीद" },
        type: "Required",
        description: { en: "Stamped certificate from currently enrolled institution head.", te: "కళాశాల ప్రిన్సిపాల్ సంతకం చేసిన బోనఫైడ్ సర్టిఫికేట్.", hi: "संस्थान प्रमुख द्वारा हस्ताक्षरित अध्ययन प्रमाण पत्र।" },
        issuingAuthority: "College / University Authority"
      },
      {
        id: "doc_pm_05",
        schemeId: "sch_post_matric_01",
        name: { en: "Hostel Certificate", te: "హాస్టల్ ధృవీకరణ పత్రం", hi: "छात्रावास प्रमाण पत्र" },
        type: "Conditional",
        conditionText: { en: "Only for hosteller students claiming higher maintenance allowance.", te: "హాస్టల్‌లో ఉండే విద్యార్థులకు మాత్రమే వర్తిస్తుంది.", hi: "केवल छात्रावास में रहने वाले छात्रों के लिए।" },
        description: { en: "Official warden declaration of residential hosteller status.", te: "హాస్టల్ వార్డెన్ ధృవీకరణ పత్రం.", hi: "छात्रावास वार्डन द्वारा जारी प्रमाण पत्र।" },
        issuingAuthority: "Hostel Warden / Principal"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Check Eligibility & Documents", te: "అర్హత & పత్రాల పరిశీలన", hi: "पात्रता एवं दस्तावेजों की जांच" },
        instruction: {
          en: "Verify that your annual family income is under ₹2.5L and your Aadhaar is linked to your active bank account.",
          te: "మీ కుటుంబ ఆదాయం రూ. 2.5 లక్షల లోపు ఉందని మరియు ఆధార్ బ్యాంక్ ఖాతాతో లింక్ అయిందని నిర్ధారించుకోండి.",
          hi: "जांचें कि पारिवारिक आय ₹2.5 लाख से कम है और आधार सक्रिय बैंक खाते से जुड़ा है।"
        }
      },
      {
        stepNumber: 2,
        title: { en: "Register on National Scholarship Portal (NSP)", te: "NSP పోర్టల్‌లో రిజిస్ట్రేషన్", hi: "NSP पोर्टल पर पंजीकरण" },
        instruction: {
          en: "Visit https://scholarships.gov.in and click on 'New Registration' or log in with One-Time Registration (OTR).",
          te: "scholarships.gov.in సైట్ సందర్శించి OTR రిజిస్ట్రేషన్ పూర్తి చేయండి.",
          hi: "scholarships.gov.in पर जाकर वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें।"
        },
        officialPortalUrl: "https://scholarships.gov.in"
      },
      {
        stepNumber: 3,
        title: { en: "Fill Academic & Personal Details", te: "విద్యా మరియు వ్యక్తిగత వివరాల నమోదు", hi: "शैक्षणिक एवं व्यक्तिगत विवरण भरें" },
        instruction: {
          en: "Enter college roll number, AISHE code of the institute, course details, and previous year marks.",
          te: "కళాశాల వివరాలు, AISHE కోడ్, కోర్సు మరియు మునుపటి మార్కుల వివరాలను నమోదు చేయండి.",
          hi: "संस्थान का AISHE कोड, कोर्स एवं पिछले वर्ष के प्राप्तांक दर्ज करें।"
        }
      },
      {
        stepNumber: 4,
        title: { en: "Upload Certificates & Verify Preview", te: "పత్రాలను అప్‌లోడ్ చేసి సమీక్షించండి", hi: "दस्तावेज अपलोड करें और पूर्वावलोकन देखें" },
        instruction: {
          en: "Upload scanned copies of Income, Caste, and Bonafide in clear PDF format (< 200KB). Verify every field carefully.",
          te: "ఆదాయం, కులం మరియు బోనఫైడ్ సర్టిఫికెట్ల పిడిఎఫ్ కాపీలను అప్‌లోడ్ చేసి జాగ్రత్తగా సమీక్షించండి.",
          hi: "आय, जाति और बोनाफाइड की स्पष्ट प्रतियां अपलोड करें और फॉर्म जांचें।"
        }
      },
      {
        stepNumber: 5,
        title: { en: "Submit and Print Application", te: "సమర్పించి రసీదు ప్రింట్ తీసుకోండి", hi: "फॉर्म जमा करें और रसीद प्रिंट करें" },
        instruction: {
          en: "Submit the final application, note down the Application ID, and submit a physical copy to your college nodal officer.",
          te: "దరఖాస్తు సమర్పించి, అప్లికేషన్ నంబర్‌ను సేవ్ చేసుకుని కళాశాలలో అందజేయండి.",
          hi: "अंतिम सबमिशन करें, आवेदन संख्या नोट करें और कॉलेज नोडल अधिकारी को प्रति जमा करें।"
        }
      }
    ],
    faqs: [
      {
        question: {
          en: "Can I receive this scholarship if I also get state fee reimbursement?",
          te: "రాష్ట్ర ప్రభుత్వ ఫీజు రీయింబర్స్‌మెంట్ తీసుకుంటే ఇది కూడా వర్తిస్తుందా?",
          hi: "क्या राज्य छात्रवृत्ति के साथ यह केंद्र छात्रवृत्ति भी मिल सकती है?"
        },
        answer: {
          en: "No, as per Ministry guidelines, a student cannot draw duplicate maintenance allowance or tuition reimbursement simultaneously from two government sources.",
          te: "లేదు, నిబంధనల ప్రకారం విద్యార్థి ఒకేసారి రెండు ప్రభుత్వ పథకాల నుండి ఒకే విధమైన భత్యం పొందలేరు.",
          hi: "नहीं, नियमों के अनुसार एक छात्र दो सरकारी स्रोतों से एक साथ दोहरी फीस प्रतिपूर्ति नहीं ले सकता।"
        }
      },
      {
        question: {
          en: "Is Aadhaar seeding with bank account mandatory?",
          te: "బ్యాంకు ఖాతాకు ఆధార్ సీడింగ్ తప్పనిసరిగా ఉండాలా?",
          hi: "क्या बैंक खाते से आधार सीडिंग अनिवार्य है?"
        },
        answer: {
          en: "Yes, scholarship funds are disbursed exclusively via Direct Benefit Transfer (DBT) through NPCI Aadhaar payment bridge.",
          te: "అవును, నిధులు కేవలం ఆధార్ లింక్డ్ బ్యాంక్ ఖాతాకు డీబీటీ ద్వారా మాత్రమే జమ అవుతాయి.",
          hi: "हाँ, छात्रवृत्ति की राशि केवल एनपीसीआई आधार पेमेंट ब्रिज के माध्यम से डीबीटी द्वारा भेजी जाती है।"
        }
      }
    ]
  },

  // 2. AICTE Pragati Scholarship for Girls
  {
    id: "sch_pragati_02",
    name: {
      en: "AICTE Pragati Scholarship Scheme for Girl Students",
      te: "బాలికల కోసం AICTE ప్రగతి స్కాలర్‌షిప్ పథకం",
      hi: "छात्राओं के लिए एआईसीटीई प्रगति छात्रवृत्ति योजना"
    },
    shortDescription: {
      en: "₹50,000/Year for Technical Degree & Diploma Girls",
      te: "సాంకేతిక విద్య చదివే బాలికలకు ₹50,000/ఏడాది",
      hi: "तकनीकी छात्राओं को ₹50,000/वर्ष छात्रवृत्ति"
    },
    detailedDescription: {
      en: "Empowers meritorious young women pursuing professional engineering degrees or technical diplomas at AICTE-approved institutions with ₹50,000 per annum towards tuition fees, laptop, books, and stationeries.",
      te: "ఏఐసీటీఈ ఆమోదం పొందిన కళాశాలల్లో ఇంజనీరింగ్ లేదా డిప్లొమాలో ప్రవేశం పొందిన బాలికలకు ల్యాప్‌టాప్, పుస్తకాలు మరియు ఫీజు ఖర్చుల కోసం ఏటా రూ. 50,000 అందజేస్తారు.",
      hi: "एआईसीटीई से मान्यता प्राप्त संस्थानों में बी.टेक या पॉलिटेक्निक में प्रवेश लेने वाली छात्राओं को ₹50,000 प्रति वर्ष प्रदान किए जाते हैं।"
    },
    purpose: "Promote technical education and gender parity in engineering fields.",
    category: "Scholarships",
    coverage: "Central",
    department: "All India Council for Technical Education (AICTE)",
    status: "Active",
    isScholarship: true,
    benefitsSummary: {
      en: "₹50,000 every year directly for tuition fees, computer purchase, books, and academic equipment.",
      te: "ఫీజులు, కంప్యూటర్ మరియు పుస్తకాల కోసం ఏటా రూ. 50,000 నగదు బదిలీ.",
      hi: "कंप्यूटर, किताबें एवं कॉलेज फीस हेतु प्रतिवर्ष ₹50,000 की वित्तीय सहायता।"
    },
    maxBenefitAmount: "₹50,000 / year",
    applicationDeadline: "2026-11-15",
    applicationWindow: "August 2026 - November 2026",
    officialSource: {
      url: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
      publisher: "AICTE, Ministry of Education, Govt. of India",
      department: "Student Development Cell, AICTE",
      verificationDate: "2026-08-30",
      reviewer: "Govt Verification Officer #201",
      version: "v3.1",
      changeNotes: "Eligible for 1st year degree students and 2nd year lateral entry students."
    },
    rules: [
      {
        id: "rule_prag_01",
        schemeId: "sch_pragati_02",
        field: "gender",
        operator: "==",
        value: "Female",
        isMandatory: true,
        explanation: {
          en: "Only female students are eligible for Pragati scheme.",
          te: "ఈ పథకానికి కేవలం బాలికలు మాత్రమే అర్హులు.",
          hi: "प्रगति योजना के लिए केवल छात्राएं ही पात्र हैं।"
        }
      },
      {
        id: "rule_prag_02",
        schemeId: "sch_pragati_02",
        field: "isStudent",
        operator: "==",
        value: true,
        isMandatory: true,
        explanation: {
          en: "Must be a regular student in AICTE approved technical college.",
          te: "ఏఐసీటీఈ ఆమోదిత సాంకేతిక కళాశాలలో రెగ్యులర్ విద్యార్థిని అయి ఉండాలి.",
          hi: "एआईसीटीई स्वीकृत संस्थान में नियमित छात्रा होना आवश्यक है।"
        }
      },
      {
        id: "rule_prag_03",
        schemeId: "sch_pragati_02",
        field: "annualFamilyIncome",
        operator: "<=",
        value: 800000, // ₹8 Lakh ceiling
        isMandatory: true,
        explanation: {
          en: "Annual family income must be less than or equal to ₹8,00,000.",
          te: "కుటుంబ వార్షిక ఆదాయం రూ. 8 లక్షల లోపు ఉండాలి.",
          hi: "वार्षिक पारिवारिक आय ₹8,00,000 से कम होनी चाहिए।"
        }
      },
      {
        id: "rule_prag_04",
        schemeId: "sch_pragati_02",
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Vocational / Diploma"],
        isMandatory: true,
        explanation: {
          en: "Must be admitted to 1st year Degree/Diploma or 2nd year Lateral Entry.",
          te: "డిగ్రీ (ఇంజనీరింగ్) లేదా పాలిటెక్నిక్ డిప్లొమా ప్రథమ సంవత్సరం విద్యార్థిని అయి ఉండాలి.",
          hi: "तकनीकी डिग्री या डिप्लोमा के प्रथम वर्ष अथवा लेटरल एंट्री में अध्ययनरत हों।"
        }
      }
    ],
    documents: [
      {
        id: "doc_prag_01",
        schemeId: "sch_pragati_02",
        name: { en: "10th & 12th / Diploma Marksheet", te: "10వ మరియు 12వ మార్కుల మెమో", hi: "10वीं व 12वीं / डिप्लोमा अंकतालिका" },
        type: "Required",
        description: { en: "Attested copy of previous qualifying examination.", te: "మునుపటి పరీక్షల మార్కుల ధృవీకరణ పత్రం.", hi: "पिछली योग्यता परीक्षा की सत्यापित प्रति।" },
        issuingAuthority: "State / Central Board"
      },
      {
        id: "doc_prag_02",
        schemeId: "sch_pragati_02",
        name: { en: "Centralized Admission Allotment Letter", te: "సీట్ అలాట్‌మెంట్ లెటర్", hi: "केंद्रीकृत प्रवेश आवंटन पत्र" },
        type: "Required",
        description: { en: "Admission allotment letter issued by state/central counseling authority.", te: "ప్రభుత్వ కౌన్సెలింగ్ ద్వారా కేటాయించిన సీటు అలాట్‌మెంట్ పత్రం.", hi: "काउंसलिंग प्राधिकरण द्वारा जारी आवंटन पत्र।" },
        issuingAuthority: "State / Central CET Board"
      },
      {
        id: "doc_prag_03",
        schemeId: "sch_pragati_02",
        name: { en: "Annual Family Income Certificate", te: "కుటుంబ ఆదాయ ధృవీకరణ పత్రం", hi: "परिवार का आय प्रमाण पत्र" },
        type: "Required",
        description: { en: "Income certificate issued by competent revenue authority (<= ₹8 Lakh).", te: "రూ. 8 లక్షల లోపు ఉన్నట్లు రెవెన్యూ అధికారి జారీ చేసిన ఆదాయ పత్రం.", hi: "सक्षम अधिकारी द्वारा जारी ₹8 लाख से कम का आय प्रमाण पत्र।" },
        issuingAuthority: "Tahsildar / Sub-Divisional Magistrate"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Confirm AICTE Approval", te: "AICTE అనుమతిని సరిచూసుకోండి", hi: "संस्थान की एआईसीटीई मान्यता जांचें" },
        instruction: {
          en: "Ensure your enrolled institution and technical branch are AICTE-approved for the current academic session.",
          te: "మీ ఇంజనీరింగ్ కళాశాల AICTE ఆమోదం పొందిందో లేదో నిర్ధారించుకోండి.",
          hi: "जांचें कि आपका कॉलेज और कोर्स एआईसीटीई से मान्यता प्राप्त है।"
        }
      },
      {
        stepNumber: 2,
        title: { en: "Apply via National Scholarship Portal", te: "NSP లో దరఖాస్తు చేసుకోండి", hi: "NSP पर आवेदन करें" },
        instruction: {
          en: "Log in to scholarships.gov.in under AICTE section and choose 'Pragati Scholarship Scheme'.",
          te: "scholarships.gov.in వెబ్‌సైట్‌లో AICTE విభాగం కింద ప్రగతి పథకాన్ని ఎంచుకోండి.",
          hi: "scholarships.gov.in पर एआईसीटीई सेक्शन में जाकर प्रगति योजना चुनें।"
        },
        officialPortalUrl: "https://scholarships.gov.in"
      }
    ],
    faqs: [
      {
        question: {
          en: "Can two girls from the same family apply for Pragati?",
          te: "ఒకే కుటుంబానికి చెందిన ఇద్దరు ఆడపిల్లలు దరఖాస్తు చేసుకోవచ్చా?",
          hi: "क्या एक ही परिवार की दो बेटियां आवेदन कर सकती हैं?"
        },
        answer: {
          en: "Yes, the scheme allows a maximum of two girl children per family to avail of the scholarship.",
          te: "అవును, ఒకే కుటుంబానికి చెందిన గరిష్టంగా ఇద్దరు ఆడపిల్లలు ఈ స్కాలర్‌షిప్‌కు అర్హులు.",
          hi: "हाँ, एक परिवार से अधिकतम दो बेटियां इस छात्रवृत्ति के लिए पात्र हैं।"
        }
      }
    ]
  },

  // 3. PM-KISAN Samman Nidhi
  {
    id: "sch_pm_kisan_03",
    name: {
      en: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      te: "పీఎం-కిసాన్ సమ్మాన్ నిధి",
      hi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)"
    },
    shortDescription: {
      en: "₹6,000/Year Income Support • 3 Direct Installments",
      te: "రైతులకు ₹6,000/ఏడాది • 3 విడతలలో ప్రత్యక్ష బదిలీ",
      hi: "₹6,000/वर्ष किसान सहायता • 3 प्रत्यक्ष किस्तें"
    },
    detailedDescription: {
      en: "Central Sector scheme with 100% funding from Government of India to provide income support to all landholding farmers' families to meet domestic financial needs and procure agricultural inputs.",
      te: "రైతులకు పెట్టుబడి సహాయం అందించేందుకు ప్రతి నాలుగు నెలలకొకసారి రూ. 2,000 చొప్పున ఏడాదికి మొత్తం రూ. 6,000 నేరుగా రైతుల ఖాతాల్లో జమ చేస్తారు.",
      hi: "किसानों की कृषि और घरेलू जरूरतों को पूरा करने के लिए प्रति 4 माह में ₹2,000 (कुल ₹6,000 वार्षिक) डीबीटी से स्थानांतरित किए जाते हैं।"
    },
    purpose: "Supplement financial needs of farmers for procurement of seeds, fertilizers, and equipment.",
    category: "Agriculture",
    coverage: "Central",
    department: "Ministry of Agriculture & Farmers Welfare",
    status: "Active",
    benefitsSummary: {
      en: "₹6,000 per annum paid in three installments of ₹2,000 each every four months.",
      te: "ఏడాదికి రూ. 6,000 (ప్రతి 4 నెలలకు రూ. 2,000 చొప్పున 3 విడతలు).",
      hi: "वार्षिक ₹6,000 तीन किस्तों में (₹2,000 प्रत्येक चार माह में)।"
    },
    maxBenefitAmount: "₹6,000 / year",
    applicationDeadline: "Open Throughout Year",
    applicationWindow: "Continuous Open Enrollment",
    officialSource: {
      url: "https://pmkisan.gov.in",
      publisher: "Dept of Agriculture & Farmers Welfare, Govt of India",
      department: "Ministry of Agriculture",
      verificationDate: "2026-09-01",
      reviewer: "Agricultural Verification Cell #88",
      version: "v6.0",
      changeNotes: "Mandatory eKYC via biometric or facial authentication on PM-KISAN mobile app implemented."
    },
    rules: [
      {
        id: "rule_pmk_01",
        schemeId: "sch_pm_kisan_03",
        field: "isFarmer",
        operator: "==",
        value: true,
        isMandatory: true,
        explanation: {
          en: "Applicant must be an operational farmer owning cultivable land.",
          te: "దరఖాస్తుదారు సొంత సాగుభూమి కలిగిన రైతు అయి ఉండాలి.",
          hi: "आवेदक कृषि योग्य भूमि का स्वामी किसान होना चाहिए।"
        }
      },
      {
        id: "rule_pmk_02",
        schemeId: "sch_pm_kisan_03",
        field: "hasRationCard",
        operator: "==",
        value: true,
        isMandatory: false,
        explanation: {
          en: "Family identification proof like Ration Card or household ledger recommended.",
          te: "కుటుంబ గుర్తింపు కార్డు లేదా రేషన్ కార్డు వివరాలు అవసరం.",
          hi: "पारिवारिक पहचान हेतु राशन कार्ड विवरण सहायक है।"
        }
      }
    ],
    documents: [
      {
        id: "doc_pmk_01",
        schemeId: "sch_pm_kisan_03",
        name: { en: "Aadhaar Card (Linked to Mobile & Bank)", te: "ఆధార్ కార్డు (మొబైల్ & బ్యాంక్‌తో లింక్)", hi: "आधार कार्ड (मोबाइल और बैंक से लिंक)" },
        type: "Required",
        description: { en: "Essential for eKYC and Aadhaar payment bridge.", te: "eKYC పూర్తి చేయడానికి ఆధార్ తప్పనిసరి.", hi: "eKYC पूरा करने के लिए आधार आवश्यक है।" },
        issuingAuthority: "UIDAI"
      },
      {
        id: "doc_pmk_02",
        schemeId: "sch_pm_kisan_03",
        name: { en: "Land Ownership Record (RoR / 1B / Khatoni / Patta)", te: "భూమి యాజమాన్య పత్రాలు (పట్టాదారు పాస్‌బుక్ / 1B)", hi: "भूमि स्वामित्व रिकॉर्ड (खतौनी / खसरा / पट्टा)" },
        type: "Required",
        description: { en: "Digital land record in applicant's name reflecting cultivable acreage.", te: "రైతు పేరిట ఉన్న పట్టాదారు పాస్ పుస్తకం లేదా 1B పత్రాలు.", hi: "किसान के नाम का डिजिटल भूमि रिकॉर्ड।" },
        issuingAuthority: "Revenue Dept / Land Records Portal"
      },
      {
        id: "doc_pmk_03",
        schemeId: "sch_pm_kisan_03",
        name: { en: "Active Bank Account Passbook", te: "బ్యాంక్ ఖాతా వివరాలు", hi: "सक्रिय बैंक खाता विवरण" },
        type: "Required",
        description: { en: "Nationalized or cooperative bank account with NPCI mapping.", te: "NPCI సీడింగ్ ఉన్న బ్యాంక్ ఖాతా పాస్‌బుక్.", hi: "आधार और एनपीसीआई से जुड़ा बैंक खाता।" },
        issuingAuthority: "Bank Branch"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Visit Official Portal", te: "అధికారిక వెబ్‌సైట్‌ను సందర్శించండి", hi: "आधिकारिक पोर्टल पर जाएं" },
        instruction: {
          en: "Go to https://pmkisan.gov.in and click on 'New Farmer Registration' under Farmers Corner.",
          te: "pmkisan.gov.in లో 'న్యూ ఫార్మర్ రిజిస్ట్రేషన్' పై క్లిక్ చేయండి.",
          hi: "pmkisan.gov.in पर जाकर 'New Farmer Registration' चुनें।"
        },
        officialPortalUrl: "https://pmkisan.gov.in"
      },
      {
        stepNumber: 2,
        title: { en: "Enter Aadhaar & State Details", te: "ఆధార్ మరియు రాష్ట్ర వివరాలు నమోదు చేయండి", hi: "आधार और राज्य दर्ज करें" },
        instruction: {
          en: "Select Rural or Urban Farmer, enter your Aadhaar number, mobile number, and select your state.",
          te: "గ్రామీణ లేదా పట్టణ రైతును ఎంచుకుని ఆధార్, మొబైల్ నంబర్ నమోదు చేయండి.",
          hi: "ग्रामीण या शहरी किसान चुनकर आधार और मोबाइल नंबर दर्ज करें।"
        }
      },
      {
        stepNumber: 3,
        title: { en: "Land Record Mapping & eKYC", te: "భూమి వివరాలు & eKYC పూర్తి చేయండి", hi: "भूमि रिकॉर्ड और ई-केवाईसी पूर्ण करें" },
        instruction: {
          en: "Input Land Khata / Khasra number, area in Hectares, and complete OTP/Biometric eKYC.",
          te: "ఖాతా నంబర్, సర్వే నంబర్ నమోదు చేసి మొబైల్ OTP ద్వారా eKYC చేయండి.",
          hi: "खाता / खसरा संख्या दर्ज करें और ओटीपी द्वारा ई-केवाईसी सत्यापित करें।"
        }
      }
    ],
    faqs: [
      {
        question: {
          en: "Are institutional landholders or income tax payers eligible?",
          te: "ఆదాయపు పన్ను చెల్లించేవారు లేదా ప్రభుత్వ ఉద్యోగులు అర్హులా?",
          hi: "क्या आयकर दाता या संस्थागत भूमिधारक पात्र हैं?"
        },
        answer: {
          en: "No, institutional landholders, current or former constitutional post holders, govt employees, and income tax payers in the previous assessment year are strictly excluded.",
          te: "లేదు, ఆదాయపు పన్ను చెల్లింపుదారులు, ప్రభుత్వ ఉద్యోగులు మరియు సంస్థాగత భూ యజమానులకు మినహాయింపు ఉంది.",
          hi: "नहीं, आयकरदाता, सरकारी कर्मचारी एवं संवैधानिक पदधारक इस योजना के दायरे से बाहर हैं।"
        }
      }
    ]
  },

  // 4. Ayushman Bharat - PM Jan Arogya Yojana
  {
    id: "sch_ayushman_04",
    name: {
      en: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
      te: "ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన",
      hi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना"
    },
    shortDescription: {
      en: "Cashless Health Cover • Up to ₹5L/year per family",
      te: "నగదు రహిత ఆరోగ్య బీమా • కుటుంబానికి ₹5 లక్షలు/ఏడాది",
      hi: "कैशलेस स्वास्थ्य बीमा • ₹5 लाख/वर्ष प्रति परिवार"
    },
    detailedDescription: {
      en: "World's largest government-funded health assurance initiative covering over 12 crore poor and vulnerable families with paperless and cashless treatment across empaneled public and private hospitals across India.",
      te: "దేశవ్యాప్తంగా నెట్‌వర్క్ ఆసుపత్రులలో శస్త్రచికిత్సలు, మందులు మరియు వైద్య పరీక్షలకు రూ. 5 లక్షల వరకు ఉచిత చికిత్సను అందించే హెల్త్ కవరేజ్ పథకం.",
      hi: "1949 से अधिक चिकित्सकीय प्रक्रियाओं के लिए देश के सूचीबद्ध सरकारी व निजी अस्पतालों में ₹5 लाख तक का कैशलेस इलाज।"
    },
    purpose: "Prevent catastrophic health expenditures from impoverishing vulnerable families.",
    category: "Healthcare",
    coverage: "Central",
    department: "National Health Authority (NHA)",
    status: "Active",
    benefitsSummary: {
      en: "₹5,00,000 annual cashless coverage per family with zero premium.",
      te: "కుటుంబానికి ఏడాదికి రూ. 5,00,000 ఉచిత ఆరోగ్య బీమా.",
      hi: "प्रति परिवार ₹5,00,000 वार्षिक कैशलेस स्वास्थ्य सुरक्षा।"
    },
    maxBenefitAmount: "₹5,00,000 / year",
    applicationDeadline: "Open Throughout Year",
    applicationWindow: "Continuous Card Generation",
    officialSource: {
      url: "https://beneficiary.nha.gov.in",
      publisher: "National Health Authority, Ministry of Health & Family Welfare",
      department: "National Health Authority",
      verificationDate: "2026-09-02",
      reviewer: "NHA Health Verification Node #12",
      version: "v4.5",
      changeNotes: "Universal coverage for all senior citizens aged 70+ irrespective of income announced."
    },
    rules: [
      {
        id: "rule_ayush_01",
        schemeId: "sch_ayushman_04",
        field: "annualFamilyIncome",
        operator: "<=",
        value: 300000,
        isMandatory: false,
        explanation: {
          en: "Targeted to low-income / BPL families or seniors aged 70+ under expanded criteria.",
          te: "తక్కువ ఆదాయం గల కుటుంబాలు లేదా 70 ఏళ్లు పైబడిన సీనియర్ సిటిజన్లు అర్హులు.",
          hi: "कम आय वाले परिवार या 70 वर्ष से अधिक आयु के वरिष्ठ नागरिक पात्र हैं।"
        }
      },
      {
        id: "rule_ayush_02",
        schemeId: "sch_ayushman_04",
        field: "hasRationCard",
        operator: "==",
        value: true,
        isMandatory: false,
        explanation: {
          en: "Eligible priority ration card or SECC list mapping required.",
          te: "రేషన్ కార్డు లేదా SECC జాబితాలో పేరు ఉండాలి.",
          hi: "पात्रता सूची या राशन कार्ड में नाम दर्ज होना आवश्यक है।"
        }
      }
    ],
    documents: [
      {
        id: "doc_ayush_01",
        schemeId: "sch_ayushman_04",
        name: { en: "Aadhaar Card of all family members", te: "కుటుంబ సభ్యులందరి ఆధార్ కార్డులు", hi: "सभी पारिवारिक सदस्यों के आधार कार्ड" },
        type: "Required",
        description: { en: "Mandatory for digital Ayushman Card generation via eKYC.", te: "ఆయుష్మాన్ డిజిటల్ కార్డు తయారీకి ఆధార్ అవసరం.", hi: "डिजिटल आयुष्मान कार्ड जनरेट करने के लिए आधार अनिवार्य है।" },
        issuingAuthority: "UIDAI"
      },
      {
        id: "doc_ayush_02",
        schemeId: "sch_ayushman_04",
        name: { en: "Ration Card / NFSA Food Security Card", te: "రేషన్ కార్డు / ఆహార భద్రతా కార్డు", hi: "राशन कार्ड / खाद्य सुरक्षा कार्ड" },
        type: "Required",
        description: { en: "Used to verify household family tree membership.", te: "కుటుంబ సభ్యుల వివరాలను ధృవీకరించడానికి.", hi: "पारिवारिक सदस्यता सत्यापन हेतु।" },
        issuingAuthority: "Civil Supplies Department"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Check Eligibility Status", te: "అర్హత తనిఖీ చేయండి", hi: "पात्रता की जांच करें" },
        instruction: {
          en: "Visit beneficiary.nha.gov.in and enter your registered mobile number and state to search eligibility by Ration Card or Aadhaar.",
          te: "beneficiary.nha.gov.in లో మీ మొబైల్ లేదా ఆధార్ నంబర్ ద్వారా అర్హత చెక్ చేయండి.",
          hi: "beneficiary.nha.gov.in पर जाकर राशन कार्ड अथवा आधार से नाम खोजें।"
        },
        officialPortalUrl: "https://beneficiary.nha.gov.in"
      },
      {
        stepNumber: 2,
        title: { en: "Complete Facial or OTP eKYC", te: "eKYC పూర్తి చేయండి", hi: "ई-केवाईसी पूर्ण करें" },
        instruction: {
          en: "Complete Aadhaar OTP or face recognition through Ayushman App on your smartphone.",
          te: "ఆయుష్మాన్ యాప్‌లో ముఖ గుర్తింపు లేదా OTP ద్వారా eKYC చేయండి.",
          hi: "आयुष्मान ऐप में फेस ऑथेंटिकेशन या ओटीपी से ई-केवाईसी करें।"
        }
      },
      {
        stepNumber: 3,
        title: { en: "Download Ayushman Card (Golden Card)", te: "ఆయుష్మాన్ కార్డు డౌన్‌లోడ్ చేసుకోండి", hi: "आयुष्मान गोल्डन कार्ड डाउनलोड करें" },
        instruction: {
          en: "Once approved, download the digital card containing the 14-digit ABHA / PMJAY ID.",
          te: "ధృవీకరణ పూర్తయిన వెంటనే 14 అంకెల కార్డును డౌన్‌లోడ్ చేసుకోండి.",
          hi: "स्वीकृति के पश्चात 14 अंकों वाला आयुष्मान कार्ड तुरंत डाउनलोड करें।"
        }
      }
    ],
    faqs: [
      {
        question: {
          en: "Are pre-existing diseases covered from day one?",
          te: "గతంలో ఉన్న వ్యాధులకు మొదటి రోజు నుంచే చికిత్స అందుతుందా?",
          hi: "क्या पहले से मौजूद बीमारियों का इलाज पहले दिन से मिलता है?"
        },
        answer: {
          en: "Yes, there is no waiting period. All pre-existing illnesses are covered from the very first day.",
          te: "అవును, ఎటువంటి వెయిటింగ్ పీరియడ్ లేకుండా మొదటి రోజు నుండే చికిత్స లభిస్తుంది.",
          hi: "हाँ, बिना किसी वेटिंग पीरियड के सभी पुरानी बीमारियों का इलाज पहले दिन से कवर होता है।"
        }
      }
    ]
  },

  // 5. Indira Gandhi National Old Age Pension Scheme (IGNOAPS)
  {
    id: "sch_pension_05",
    name: {
      en: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
      te: "ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పింఛను పథకం",
      hi: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना"
    },
    shortDescription: {
      en: "Monthly Pension for BPL Seniors (60+ Years)",
      te: "60+ ఏళ్ల నిరుపేద వృద్ధులకు నెలవారీ పింఛను",
      hi: "60+ वर्ष के बीपीएल बुजुर्गों को मासिक पेंशन"
    },
    detailedDescription: {
      en: "National Social Assistance Programme (NSAP) component providing dignified monthly financial support to senior citizens from BPL households across India.",
      te: "నిరుపేద వృద్ధుల జీవన భరోసా కొరకు కేంద్ర, రాష్ట్ర ప్రభుత్వాలు సంయుక్తంగా అందించే నెలవారీ పింఛను.",
      hi: "बीपीएल परिवारों के बुजुर्गों के लिए सरकार द्वारा प्रदत्त सम्मानजनक मासिक पेंशन।"
    },
    purpose: "Social security and sustenance for elderly citizens.",
    category: "Senior Citizens",
    coverage: "Central",
    department: "Ministry of Rural Development",
    status: "Active",
    benefitsSummary: {
      en: "Monthly pension deposited directly to bank / post office account (enhanced by State top-up to ₹2,500 - ₹3,000 in many states).",
      te: "ప్రతినెలా బ్యాంక్ ఖాతాలో లేదా గ్రామ వాలంటీర్ ద్వారా నేరుగా పింఛను చెల్లింపు.",
      hi: "प्रतिमाह बैंक/डाकघर खाते में सीधी पेंशन (राज्यों द्वारा अतिरिक्त अनुदान सहित ₹2,500-₹3,000)।"
    },
    maxBenefitAmount: "₹1,000 to ₹3,000 / month",
    applicationDeadline: "Open Throughout Year",
    applicationWindow: "Continuous Ongoing Enrollment",
    officialSource: {
      url: "https://nsap.nic.in",
      publisher: "National Social Assistance Programme (NSAP), Govt of India",
      department: "Ministry of Rural Development",
      verificationDate: "2026-08-15",
      reviewer: "Social Welfare Auditor #33",
      version: "v2.8",
      changeNotes: "Age limit strictly evaluated at 60+ as per Aadhaar authenticated birth record."
    },
    rules: [
      {
        id: "rule_pension_01",
        schemeId: "sch_pension_05",
        field: "age",
        operator: ">=",
        value: 60,
        isMandatory: true,
        explanation: {
          en: "Applicant must be 60 years of age or older.",
          te: "దరఖాస్తుదారునికి తప్పనిసరిగా 60 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయస్సు ఉండాలి.",
          hi: "आवेदक की आयु 60 वर्ष या उससे अधिक होनी चाहिए।"
        }
      },
      {
        id: "rule_pension_02",
        schemeId: "sch_pension_05",
        field: "annualFamilyIncome",
        operator: "<=",
        value: 100000,
        isMandatory: true,
        explanation: {
          en: "Must belong to Below Poverty Line (BPL) household or income <= ₹1,00,000.",
          te: "కుటుంబ ఆదాయం రూ. 1,00,000 లోపు లేదా దారిద్య్రరేఖకు దిగువన ఉండాలి.",
          hi: "बीपीएल श्रेणी अथवा ₹1,00,000 से कम वार्षिक आय होनी चाहिए।"
        }
      }
    ],
    documents: [
      {
        id: "doc_pens_01",
        schemeId: "sch_pension_05",
        name: { en: "Aadhaar Card (Age Verification)", te: "ఆధార్ కార్డు (వయోపరిమితి ధృవీకరణ)", hi: "आधार कार्ड (आयु सत्यापन)" },
        type: "Required",
        description: { en: "Official proof of age reflecting date of birth.", te: "వయస్సు నిర్ధారణ కోసం ఆధార్ పత్రం.", hi: "आयु एवं जन्मतिथि सत्यापन हेतु।" },
        issuingAuthority: "UIDAI"
      },
      {
        id: "doc_pens_02",
        schemeId: "sch_pension_05",
        name: { en: "BPL Ration Card / White Card", te: "బిపిఎల్ రేషన్ కార్డు / వైట్ కార్డ్", hi: "बीपीएल राशन कार्ड" },
        type: "Required",
        description: { en: "Proof of economic status under poverty line criteria.", te: "దారిద్య్రరేఖకు దిగువన ఉన్నట్లు ధృవీకరణ.", hi: "गरीबी रेखा सत्यापन दस्तावेज।" },
        issuingAuthority: "Civil Supplies Dept"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Submit Form at Local Panchayat or Ward Office", te: "గ్రామ పంచాయతీ లేదా వార్డు సచివాలయంలో దరఖాస్తు", hi: "ग्राम पंचायत या वार्ड कार्यालय में आवेदन" },
        instruction: {
          en: "Collect and submit NSAP Form 1 at the local Municipal/Gram Panchayat office or apply online via nsap.nic.in.",
          te: "గ్రామ సచివాలయం లేదా మున్సిపల్ కార్యాలయంలో లేదా nsap.nic.in లో దరఖాస్తు చేసుకోండి.",
          hi: "स्थानीय पंचायत/वार्ड सचिवालय या nsap.nic.in पर आवेदन जमा करें।"
        },
        officialPortalUrl: "https://nsap.nic.in"
      }
    ],
    faqs: [
      {
        question: {
          en: "Does the pension amount increase after reaching 80 years of age?",
          te: "80 ఏళ్లు దాటిన తర్వాత పింఛను మొత్తం పెరుగుతుందా?",
          hi: "क्या 80 वर्ष की आयु के बाद पेंशन राशि बढ़ जाती है?"
        },
        answer: {
          en: "Yes, the Central contribution increases from ₹200 to ₹500 per month, alongside applicable state enhancements.",
          te: "అవును, కేంద్ర ప్రభుత్వ వాటా నెలకు రూ. 200 నుండి రూ. 500 వరకు పెరుగుతుంది.",
          hi: "हाँ, 80 वर्ष या उससे अधिक आयु होने पर केंद्रीय अंशदान बढ़कर ₹500 प्रतिमाह हो जाता है।"
        }
      }
    ]
  },

  // 6. Jagananna Vidya Deevena (Andhra Pradesh State Scheme)
  {
    id: "sch_jvd_06",
    name: {
      en: "Jagananna Vidya Deevena (AP Complete Fee Reimbursement)",
      te: "జగనన్న విద్యా దీవెన (పూర్తి ఫీజు రీయింబర్స్‌మెంట్)",
      hi: "जगनन्ना विद्या दीवेना (पूर्ण शिक्षण शुल्क प्रतिपूर्ति)"
    },
    shortDescription: {
      en: "100% Full College Fee Reimbursement via Mother's Account",
      te: "పూర్తి కాలేజ్ ఫీజు రీయింబర్స్‌మెంట్ • తల్లుల ఖాతాల్లో జమ",
      hi: "100% कॉलेज फीस प्रतिपूर्ति • माताओं के खाते में"
    },
    detailedDescription: {
      en: "Andhra Pradesh state initiative ensuring higher education is accessible to all by directly reimbursing total tuition fees for ITI, Polytechnic, Degree, B.Tech, MBA, MCA, and Pharmacy courses.",
      te: "ఐటీఐ, పాలిటెక్నిక్, ఇంజనీరింగ్, ఫార్మసీ, డిగ్రీ తదితర కోర్సులు చదివే విద్యార్థుల ఫీజును ఏపీ ప్రభుత్వం నేరుగా తల్లుల ఖాతాల్లో జమ చేస్తుంది.",
      hi: "आंध्र प्रदेश सरकार द्वारा तकनीकी एवं उच्च पाठ्यक्रमों के छात्रों के लिए पूर्ण शुल्क प्रतिपूर्ति योजना।"
    },
    purpose: "Facilitate poverty eradication through unhindered access to professional degrees.",
    category: "Scholarships",
    coverage: "State",
    state: "Andhra Pradesh",
    department: "Social Welfare Department, Govt of Andhra Pradesh",
    status: "Active",
    isScholarship: true,
    benefitsSummary: {
      en: "100% Tuition Fee directly deposited into the beneficiary mother's bank account every quarter.",
      te: "ప్రతి త్రైమాసికంలో 100% ట్యూషన్ ఫీజు నేరుగా తల్లి బ్యాంక్ ఖాతాలో జమ.",
      hi: "हर तिमाही में 100% ट्यूशन फीस सीधे माता के बैंक खाते में स्थानांतरित।"
    },
    maxBenefitAmount: "100% Tuition Fee",
    applicationDeadline: "2026-11-30",
    applicationWindow: "September 2026 - November 2026",
    officialSource: {
      url: "https://jnanabhumi.ap.gov.in",
      publisher: "JnanaBhumi Portal, Government of Andhra Pradesh",
      department: "Higher Education & Social Welfare Dept, AP",
      verificationDate: "2026-08-20",
      reviewer: "AP State Verification Officer #45",
      version: "v3.9",
      changeNotes: "Requires 75% biometric attendance in college for quarterly release."
    },
    rules: [
      {
        id: "rule_jvd_01",
        schemeId: "sch_jvd_06",
        field: "state",
        operator: "==",
        value: "Andhra Pradesh",
        isMandatory: true,
        explanation: {
          en: "Beneficiary must be a resident of Andhra Pradesh.",
          te: "దరఖాస్తుదారు తప్పనిసరిగా ఆంధ్రప్రదేశ్ నివాసి అయి ఉండాలి.",
          hi: "लाभार्थी का आंध्र प्रदेश का निवासी होना अनिवार्य है।"
        }
      },
      {
        id: "rule_jvd_02",
        schemeId: "sch_jvd_06",
        field: "isStudent",
        operator: "==",
        value: true,
        isMandatory: true,
        explanation: {
          en: "Must be actively pursuing post-12th graduation, diploma, or professional course.",
          te: "డిగ్రీ, ఇంజనీరింగ్, పాలిటెక్నిక్ లేదా పోస్ట్ గ్రాడ్యుయేషన్ విద్యార్థి అయి ఉండాలి.",
          hi: "स्नातक या व्यावसायिक कोर्स में नियमित अध्ययनरत होना चाहिए।"
        }
      },
      {
        id: "rule_jvd_03",
        schemeId: "sch_jvd_06",
        field: "annualFamilyIncome",
        operator: "<=",
        value: 250000,
        isMandatory: true,
        explanation: {
          en: "Annual family income must be under ₹2,50,000.",
          te: "వార్షిక కుటుంబ ఆదాయం రూ. 2.5 లక్షల లోపు ఉండాలి.",
          hi: "पारिवारिक आय ₹2,50,000 से अधिक नहीं होनी चाहिए।"
        }
      }
    ],
    documents: [
      {
        id: "doc_jvd_01",
        schemeId: "sch_jvd_06",
        name: { en: "Aadhaar Card (Student & Mother)", te: "విద్యార్థి మరియు తల్లి ఆధార్ కార్డులు", hi: "छात्र एवं माता का आधार कार्ड" },
        type: "Required",
        description: { en: "Required for biometric attendance and DBT transfer.", te: "బయోమెట్రిక్ మరియు డీబీటీ బదిలీ కోసం.", hi: "बायोमेट्रिक एवं डीबीटी हेतु आवश्यक।" },
        issuingAuthority: "UIDAI"
      },
      {
        id: "doc_jvd_02",
        schemeId: "sch_jvd_06",
        name: { en: "AP White Ration Card / Rice Card", te: "ఏపీ రైస్ కార్డ్ / వైట్ రేషన్ కార్డ్", hi: "एपी राइस कार्ड / राशन कार्ड" },
        type: "Required",
        description: { en: "Proof of domicile and economic qualification in Andhra Pradesh.", te: "ఆంధ్రప్రదేశ్ నివాసి మరియు ఆదాయ ధ్రువీకరణ కోసం.", hi: "आंध्र प्रदेश निवास व आर्थिक पात्रता प्रमाण पत्र।" },
        issuingAuthority: "AP Civil Supplies"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Apply via College / Sachivalayam", te: "కళాశాల లేదా గ్రామ సచివాలయంలో దరఖాస్తు", hi: "कॉलेज अथवा ग्राम सचिवालय में पंजीकरण" },
        instruction: {
          en: "Submit documents to your college scholarship cell or local Gram/Ward Sachivalayam for biometric eKYC verification on JnanaBhumi portal.",
          te: "మీ కళాశాలలో లేదా గ్రామ/వార్డు సచివాలయంలో మీ పత్రాలు సమర్పించి జ్ఞానభూమి పోర్టల్‌లో బయోమెట్రిక్ eKYC పూర్తి చేయండి.",
          hi: "अपने कॉलेज या स्थानीय ग्राम सचिवालय में दस्तावेज जमा कर ज्ञानभूमि पोर्टल पर बायोमेट्रिक ई-केवाईसी पूर्ण करें।"
        },
        officialPortalUrl: "https://jnanabhumi.ap.gov.in"
      }
    ],
    faqs: [
      {
        question: {
          en: "Is minimum attendance required to receive fee reimbursement?",
          te: "ఫీజు రీయింబర్స్‌మెంట్ పొందడానికి కనీస హాజరు ఉండాలా?",
          hi: "क्या शुल्क प्रतिपूर्ति के लिए न्यूनतम उपस्थिति आवश्यक है?"
        },
        answer: {
          en: "Yes, 75% biometric attendance across all enrolled subjects is mandatory for release of funds.",
          te: "అవును, ప్రతి క్వార్టర్‌లో కనీసం 75% బయోమెట్రిక్ హాజరు తప్పనిసరి.",
          hi: "हाँ, प्रत्येक तिमाही में न्यूनतम 75% बायोमेट्रिक उपस्थिति अनिवार्य है।"
        }
      }
    ]
  },

  // 7. PMEGP - Prime Minister's Employment Generation Programme
  {
    id: "sch_pmegp_07",
    name: {
      en: "Prime Minister's Employment Generation Programme (PMEGP)",
      te: "ప్రధాన మంత్రి ఉపాధి కల్పన కార్యక్రమం (PMEGP)",
      hi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)"
    },
    shortDescription: {
      en: "Up to 35% Govt Subsidy on Business Loans up to ₹50L",
      te: "కొత్త వ్యాపారాలకు 35% వరకు ప్రభుత్వ రాయితీ రుణం",
      hi: "सूक्ष्म उद्योगों पर 35% तक सरकारी सब्सिडी युक्त ऋण"
    },
    detailedDescription: {
      en: "Flagship self-employment credit initiative implemented by Khadi and Village Industries Commission (KVIC) helping traditional artisans, rural youth, and entrepreneurs establish ventures up to ₹50 Lakh in manufacturing and ₹20 Lakh in service.",
      te: "గ్రామీణ మరియు పట్టణ యువత సొంతంగా వ్యాపారాలు ప్రారంభించడానికి గరిష్టంగా రూ. 50 లక్షల వరకు ప్రాజెక్ట్ ఖర్చుపై కేంద్ర ప్రభుత్వం రాయితీని అందిస్తుంది.",
      hi: "नया उद्योग शुरू करने के लिए विनिर्माण में ₹50 लाख तक और सेवा क्षेत्र में ₹20 लाख तक के प्रोजेक्ट पर 15% से 35% तक की मार्जिन मनी सब्सिडी।"
    },
    purpose: "Generate employment opportunities in rural and urban areas through micro-enterprises.",
    category: "Employment",
    coverage: "Central",
    department: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    status: "Active",
    benefitsSummary: {
      en: "15% to 35% capital subsidy on bank loan project cost up to ₹50 Lakhs.",
      te: "ప్రాజెక్ట్ ఖర్చుపై 15% నుండి 35% వరకు మార్జిన్ మనీ రాయితీ.",
      hi: "प्रोजेक्ट लागत पर 15% से 35% तक का सरकारी अनुदान (सब्सिडी)।"
    },
    maxBenefitAmount: "Up to ₹17.5 Lakh subsidy",
    applicationDeadline: "Open Throughout Year",
    applicationWindow: "Continuous Portal Registration",
    officialSource: {
      url: "https://www.kviconline.gov.in/pmegpeportal",
      publisher: "Khadi and Village Industries Commission (KVIC)",
      department: "Ministry of MSME, Govt of India",
      verificationDate: "2026-08-25",
      reviewer: "MSME Verification Wing #07",
      version: "v5.1",
      changeNotes: "Increased project ceiling to ₹50 Lakh for manufacturing."
    },
    rules: [
      {
        id: "rule_pmegp_01",
        schemeId: "sch_pmegp_07",
        field: "age",
        operator: ">=",
        value: 18,
        isMandatory: true,
        explanation: {
          en: "Applicant must be at least 18 years of age.",
          te: "దరఖాస్తుదారునికి కనీసం 18 సంవత్సరాలు నిండి ఉండాలి.",
          hi: "आवेदक की न्यूनतम आयु 18 वर्ष होनी चाहिए।"
        }
      },
      {
        id: "rule_pmegp_02",
        schemeId: "sch_pmegp_07",
        field: "educationLevel",
        operator: "in",
        value: ["10th Pass", "12th Pass", "Undergraduate", "Postgraduate", "Vocational / Diploma"],
        isMandatory: false,
        explanation: {
          en: "At least 8th or 10th pass required for projects exceeding ₹10 Lakh in manufacturing.",
          te: "రూ. 10 లక్షల కంటే ఎక్కువ ప్రాజెక్టులకు కనీసం 10వ తరగతి ఉత్తీర్ణులై ఉండాలి.",
          hi: "विनिर्माण में ₹10 लाख से अधिक की परियोजना हेतु 8वीं या 10वीं उत्तीर्ण होना आवश्यक है।"
        }
      }
    ],
    documents: [
      {
        id: "doc_pmegp_01",
        schemeId: "sch_pmegp_07",
        name: { en: "Detailed Project Report (DPR)", te: "ప్రాజెక్ట్ నివేదిక (DPR)", hi: "विस्तृत परियोजना रिपोर्ट (DPR)" },
        type: "Required",
        description: { en: "Itemized business cost, revenue estimate, and machinery breakdown.", te: "వ్యాపార వ్యయం మరియు అంచనా రాబడి వివరాలతో కూడిన ప్రాజెక్ట్ రిపోర్ట్.", hi: "व्यापार की लागत और लाभ की विस्तृत रिपोर्ट।" },
        issuingAuthority: "Chartered Accountant / Certified Consultant"
      },
      {
        id: "doc_pmegp_02",
        schemeId: "sch_pmegp_07",
        name: { en: "Aadhaar and PAN Card", te: "ఆధార్ మరియు పాన్ కార్డు", hi: "आधार एवं पैन कार्ड" },
        type: "Required",
        description: { en: "Identity and tax compliance documentation.", te: "గుర్తింపు మరియు పన్ను పత్రాలు.", hi: "पहचान एवं वित्तीय सत्यापन प्रमाण।" },
        issuingAuthority: "UIDAI / Income Tax Dept"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Prepare Detailed Project Report", te: "ప్రాజెక్ట్ రిపోర్ట్ సిద్ధం చేసుకోండి", hi: "प्रोजेक्ट रिपोर्ट तैयार करें" },
        instruction: {
          en: "Draft your business proposal specifying proposed capital machinery and working expenses.",
          te: "మీ వ్యాపారానికి అవసరమైన యంత్రాలు, స్థలం మరియు ఖర్చుల నివేదికను రూపొందించుకోండి.",
          hi: "अपने प्रस्तावित व्यवसाय के खर्चों और मशीनों का पूरा ब्योरा तैयार करें।"
        }
      },
      {
        stepNumber: 2,
        title: { en: "Register on KVIC PMEGP Portal", te: "PMEGP పోర్టల్‌లో ఆన్‌లైన్ దరఖాస్తు", hi: "PMEGP पोर्टल पर ऑनलाइन आवेदन" },
        instruction: {
          en: "Apply directly at kviconline.gov.in/pmegpeportal without any intermediary fees.",
          te: "ఎటువంటి దళారులను నమ్మకుండా నేరుగా kviconline.gov.in లో దరఖాస్తు చేయండి.",
          hi: "kviconline.gov.in पर बिना किसी बिचौलिए के सीधे निःशुल्क आवेदन करें।"
        },
        officialPortalUrl: "https://www.kviconline.gov.in/pmegpeportal"
      }
    ],
    faqs: [
      {
        question: {
          en: "Do I need collateral security for PMEGP loans?",
          te: "PMEGP లోన్ల కోసం తనఖా పెట్టడానికి స్థిరాస్తి చూపించాలా?",
          hi: "क्या PMEGP ऋण के लिए किसी गारंटी या गिरवी संपत्ति की आवश्यकता होती है?"
        },
        answer: {
          en: "No, loans up to ₹10 Lakhs are covered under CGTMSE guarantee without third-party collateral.",
          te: "లేదు, రూ. 10 లక్షల వరకు ప్రాజెక్టులకు ఎటువంటి తనఖా లేకుండా CGTMSE కింద రుణం లభిస్తుంది.",
          hi: "नहीं, ₹10 लाख तक के ऋण बिना किसी गारंटी के सीजीटीएमएसई योजना के अंतर्गत कवर होते हैं।"
        }
      }
    ]
  },

  // 8. Pradhan Mantri Awas Yojana (PMAY-Urban & Gramin)
  {
    id: "sch_pmay_08",
    name: {
      en: "Pradhan Mantri Awas Yojana (PMAY)",
      te: "ప్రధాన మంత్రి ఆవాస్ యోజన (PMAY)",
      hi: "प्रधानमंत्री आवास योजना (PMAY)"
    },
    shortDescription: {
      en: "Pucca House Subsidy & Grant • Up to ₹2.67 Lakh",
      te: "సొంతింటి నిర్మాణంపై ₹2.67 లక్షల వరకు ప్రభుత్వ సబ్సిడీ",
      hi: "पक्के मकान पर ₹2.67 लाख तक की सरकारी सब्सिडी"
    },
    detailedDescription: {
      en: "Mission providing 'Housing for All' to eligible urban and rural families through direct financial grants for construction and credit-linked interest subsidy for affordable home loans.",
      te: "సొంతిల్లు లేని నిరుపేద కుటుంబాలకు పక్కా గృహాల నిర్మాణం కోసం నేరుగా నగదు బదిలీ మరియు గృహ రుణాలపై వడ్డీ రాయితీ కల్పించే ప్రతిష్టాత్మక పథకం.",
      hi: "शहरी एवं ग्रामीण गरीबों को पक्के मकान की सुविधा हेतु सरकार द्वारा सीधी वित्तीय सहायता एवं ब्याज अनुदान।"
    },
    purpose: "Ensure every eligible family has a pucca house with basic civic amenities.",
    category: "Housing",
    coverage: "Central",
    department: "Ministry of Housing and Urban Affairs / Rural Development",
    status: "Active",
    benefitsSummary: {
      en: "Direct construction grant of ₹1.20 - ₹1.50 Lakh (Gramin) or upfront interest subsidy up to ₹2.67 Lakh (Urban).",
      te: "గ్రామీణ ప్రాంతాల్లో రూ. 1.20 నుండి 1.50 లక్షల నేరుగా ఆర్థిక సహాయం లేదా పట్టణాల్లో వడ్డీ రాయితీ.",
      hi: "ग्रामीण में ₹1.20-1.50 लाख की सीधी सहायता या शहरी में ₹2.67 लाख तक की ब्याज सब्सिडी।"
    },
    maxBenefitAmount: "Up to ₹2.67 Lakh",
    applicationDeadline: "Open Throughout Year",
    applicationWindow: "Continuous Ongoing Scheme",
    officialSource: {
      url: "https://pmaymis.gov.in",
      publisher: "Ministry of Housing & Urban Affairs, Govt of India",
      department: "PMAY Mission Directorate",
      verificationDate: "2026-08-10",
      reviewer: "Housing Audit Board #19",
      version: "v4.0",
      changeNotes: "Special focus on women ownership in registered property deeds."
    },
    rules: [
      {
        id: "rule_pmay_01",
        schemeId: "sch_pmay_08",
        field: "annualFamilyIncome",
        operator: "<=",
        value: 300000, // EWS ceiling
        isMandatory: false,
        explanation: {
          en: "Prioritized for Economically Weaker Section (EWS) with income up to ₹3,00,000.",
          te: "వార్షిక ఆదాయం రూ. 3 లక్షల లోపు ఉన్న బలహీన వర్గాలకు ప్రాధాన్యత.",
          hi: "आर्थिक रूप से कमजोर वर्ग (EWS) हेतु ₹3,00,000 तक की आय सीमा।"
        }
      }
    ],
    documents: [
      {
        id: "doc_pmay_01",
        schemeId: "sch_pmay_08",
        name: { en: "Aadhaar Card (Husband and Wife)", te: "ఆధార్ కార్డు (భార్యాభర్తలు)", hi: "आधार कार्ड (पति एवं पत्नी)" },
        type: "Required",
        description: { en: "Mandatory joint identification.", te: "భార్యాభర్తల ఉమ్మడి గుర్తింపు కార్డు.", hi: "दंपति का अनिवार्य पहचान पत्र।" },
        issuingAuthority: "UIDAI"
      },
      {
        id: "doc_pmay_02",
        schemeId: "sch_pmay_08",
        name: { en: "Affidavit of not owning a pucca house in India", te: "సొంత ఇల్లు లేదని అఫిడవిట్", hi: "भारत में कहीं भी पक्का मकान न होने का शपथ पत्र" },
        type: "Required",
        description: { en: "Declaration that family does not own any permanent dwelling.", te: "కుటుంబానికి దేశంలో ఎక్కడా పక్కా ఇల్లు లేదని డిక్లరేషన్.", hi: "देश में पक्का मकान न होने का स्व-घोषणा पत्र।" },
        issuingAuthority: "Notary / Self Declaration"
      }
    ],
    applicationGuide: [
      {
        stepNumber: 1,
        title: { en: "Register Online or at Citizen Service Center (CSC)", te: "CSC లేదా ఆన్‌లైన్‌లో దరఖాస్తు", hi: "सीएससी या आधिकारिक पोर्टल पर आवेदन" },
        instruction: {
          en: "Visit pmaymis.gov.in -> Citizen Assessment or visit your nearest Gram Sachivalayam / Ward Secretariat.",
          te: "pmaymis.gov.in లో సిటిజన్ అసెస్‌మెంట్ ద్వారా లేదా సమీప సచివాలయంలో దరఖాస్తు చేసుకోండి.",
          hi: "pmaymis.gov.in पर जाकर Citizen Assessment विकल्प से ऑनलाइन फॉर्म भरें।"
        },
        officialPortalUrl: "https://pmaymis.gov.in"
      }
    ],
    faqs: [
      {
        question: {
          en: "Is the house registered in the female head's name?",
          te: "ఇంటి పట్టా మహిళ పేరిట ఉండటం తప్పనిసరా?",
          hi: "क्या घर का मालिकाना हक महिला के नाम होना अनिवार्य है?"
        },
        answer: {
          en: "Yes, under PMAY rules, the ownership of the house must be in the name of the female head or joint with her spouse.",
          te: "అవును, మహిళా సాధికారత కొరకు ఇంటి యాజమాన్యం తప్పనిసరిగా మహిళ పేరుపై లేదా ఉమ్మడిగా ఉండాలి.",
          hi: "हाँ, घर का स्वामित्व परिवार की महिला मुखिया के नाम या संयुक्त नाम से होना अनिवार्य है।"
        }
      }
    ]
  }
];

export const INITIAL_SAVED_APPLICATIONS: SavedApplication[] = [
  {
    id: "app_saved_01",
    schemeId: "sch_post_matric_01",
    schemeName: "Post-Matric Scholarship for SC/ST/OBC Students",
    category: "Scholarships",
    referenceNumber: "NSP-2026-AP-992143",
    status: "Preparing",
    appliedDate: "2026-09-02",
    deadline: "2026-10-31",
    notes: "Aadhaar eKYC completed. Need to collect latest income certificate from Meeseva center.",
    reminderActive: true,
    updatedAt: "2026-09-10"
  },
  {
    id: "app_saved_02",
    schemeId: "sch_pragati_02",
    schemeName: "AICTE Pragati Scholarship Scheme for Girl Students",
    category: "Scholarships",
    referenceNumber: "AICTE-PRG-2026-00412",
    status: "Applied",
    appliedDate: "2026-09-08",
    deadline: "2026-11-15",
    notes: "Application submitted through NSP. Forwarded to institute nodal officer for verification.",
    reminderActive: true,
    updatedAt: "2026-09-12"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log_01",
    adminId: "adm_officer_44",
    adminName: "Rajeshwar Rao (Directorate of Higher Education)",
    action: "VERIFICATION_RENEWED",
    recordType: "Scholarship",
    recordId: "sch_post_matric_01",
    recordName: "Post-Matric Scholarship for SC/ST/OBC Students",
    timestamp: "2026-08-28 11:32:00",
    changes: "Validated official notification for 2026-27 cycle. Confirmed annual income ceiling at ₹2,50,000."
  },
  {
    id: "log_02",
    adminId: "adm_officer_89",
    adminName: "Sunita Deshmukh (Ministry of Agriculture)",
    action: "RULE_MODIFIED",
    recordType: "Scheme",
    recordId: "sch_pm_kisan_03",
    recordName: "PM-KISAN Samman Nidhi",
    timestamp: "2026-09-01 14:15:20",
    changes: "Mandatory biometric/facial eKYC flag set to true across all operational farmers."
  },
  {
    id: "log_03",
    adminId: "adm_officer_12",
    adminName: "Dr. Arvind Gupta (National Health Authority)",
    action: "SCHEME_UPDATED",
    recordType: "Scheme",
    recordId: "sch_ayushman_04",
    recordName: "Ayushman Bharat PM-JAY",
    timestamp: "2026-09-02 09:40:11",
    changes: "Appended universal healthcare extension provision for senior citizens aged 70+."
  }
];
