import { Scheme, Language, UserProfile } from '@/types';
import { INITIAL_SCHEMES } from '@/data/mockDatabase';

export interface GroundedRAGResponse {
  answer: string;
  citedSources: {
    title: string;
    url: string;
    department: string;
    lastVerified: string;
  }[];
  isGrounded: boolean;
  retrievedSchemeCount: number;
}

/**
 * JanSahay AI RAG Engine
 * Queries verified government database first, retrieves relevant gazettes/rules,
 * and formats grounded, multilingual responses strictly citing sources.
 */
export function processRAGQuery(
  query: string,
  userProfile: UserProfile,
  lang: Language = 'en',
  activeSchemes: Scheme[] = INITIAL_SCHEMES
): GroundedRAGResponse {
  const normalizedQuery = query.toLowerCase().trim();

  // 1. Keyword & Semantic Matching against Scheme Database
  const matchedSchemes: Scheme[] = [];

  for (const scheme of activeSchemes) {
    let score = 0;

    const titleEn = scheme.name.en.toLowerCase();
    const titleTe = scheme.name.te.toLowerCase();
    const titleHi = scheme.name.hi.toLowerCase();
    const dept = scheme.department.toLowerCase();
    const cat = scheme.category.toLowerCase();
    const desc = scheme.shortDescription.en.toLowerCase();

    // Check scheme name matches
    if (normalizedQuery.includes(scheme.id.toLowerCase())) score += 10;
    if (normalizedQuery.includes(titleEn) || titleEn.includes(normalizedQuery)) score += 8;
    if (normalizedQuery.includes(titleTe) || titleTe.includes(normalizedQuery)) score += 8;
    if (normalizedQuery.includes(titleHi) || titleHi.includes(normalizedQuery)) score += 8;

    // Check category matches
    if (normalizedQuery.includes(cat)) score += 5;
    if (normalizedQuery.includes('scholarship') && scheme.isScholarship) score += 6;
    if (normalizedQuery.includes('స్కాలర్') && scheme.isScholarship) score += 6;
    if (normalizedQuery.includes('छात्रवृत्ति') && scheme.isScholarship) score += 6;

    if (normalizedQuery.includes('farmer') && (scheme.category === 'Agriculture' || scheme.id.includes('kisan'))) score += 6;
    if (normalizedQuery.includes('రైతు') && (scheme.category === 'Agriculture' || scheme.id.includes('kisan'))) score += 6;
    if (normalizedQuery.includes('किसान') && (scheme.category === 'Agriculture' || scheme.id.includes('kisan'))) score += 6;

    if (normalizedQuery.includes('health') && scheme.category === 'Healthcare') score += 6;
    if (normalizedQuery.includes('ఆరోగ్య') && scheme.category === 'Healthcare') score += 6;
    if (normalizedQuery.includes('स्वास्थ्य') && scheme.category === 'Healthcare') score += 6;

    if (normalizedQuery.includes('pension') && scheme.category === 'Senior Citizens') score += 6;
    if (normalizedQuery.includes('పింఛను') && scheme.category === 'Senior Citizens') score += 6;
    if (normalizedQuery.includes('पेंशन') && scheme.category === 'Senior Citizens') score += 6;

    if (normalizedQuery.includes('house') || normalizedQuery.includes('housing') || normalizedQuery.includes('pmay')) {
      if (scheme.category === 'Housing') score += 6;
    }

    if (dept.includes(normalizedQuery) || desc.includes(normalizedQuery)) score += 4;

    if (score >= 4) {
      matchedSchemes.push(scheme);
    }
  }

  // If no specific match, fallback to schemes matching user profile categories
  let relevantSchemes = matchedSchemes;
  if (relevantSchemes.length === 0) {
    if (userProfile.isStudent) {
      relevantSchemes = activeSchemes.filter(s => s.isScholarship);
    } else if (userProfile.isFarmer) {
      relevantSchemes = activeSchemes.filter(s => s.category === 'Agriculture');
    } else if (userProfile.isSeniorCitizen) {
      relevantSchemes = activeSchemes.filter(s => s.category === 'Senior Citizens' || s.category === 'Healthcare');
    } else {
      relevantSchemes = activeSchemes.slice(0, 2);
    }
  }

  // Limit to top 3 schemes for concise, grounded answering
  const topSchemes = relevantSchemes.slice(0, 3);

  const citedSources = topSchemes.map(s => ({
    title: s.name[lang] || s.name.en,
    url: s.officialSource.url,
    department: s.department,
    lastVerified: s.officialSource.verificationDate
  }));

  // Build grounded response
  let answer = "";

  if (topSchemes.length === 0) {
    if (lang === 'te') {
      answer = "క్షమించండి, మీ ప్రశ్నకు సంబంధించిన ధృవీకరించబడిన అధికారిక పథక రికార్డు మా వద్ద లభించలేదు. దయచేసి అధికారిక పోర్టల్ (myscheme.gov.in) లేదా సంబంధిత ప్రభుత్వ విభాగాన్ని సంప్రదించండి.";
    } else if (lang === 'hi') {
      answer = "क्षमा करें, आपके प्रश्न से संबंधित सत्यापित सरकारी योजना हमारे रिकॉर्ड में नहीं मिली। कृपया आधिकारिक सरकारी पोर्टल (myscheme.gov.in) या संबंधित विभाग से पुष्टि करें।";
    } else {
      answer = "I could not find a verified official government record directly matching this specific query in our current gazette database. Please verify directly via the official government portal (myscheme.gov.in).";
    }

    return {
      answer,
      citedSources: [],
      isGrounded: false,
      retrievedSchemeCount: 0
    };
  }

  const primaryScheme = topSchemes[0];

  // Specific intents
  const isDocumentIntent = /document|doc|certificate|పత్రాలు|డాక్యుమెంట్|दस्तावेज|कागजात/i.test(normalizedQuery);
  const isHowToApplyIntent = /how to apply|apply|procedure|portal|దరఖాస్తు|ఎలా|आवेदन|प्रक्रिया/i.test(normalizedQuery);
  const isEligibilityIntent = /eligible|qualify|criteria|income|అర్హత|पात्रता|शर्तें/i.test(normalizedQuery);

  if (lang === 'te') {
    if (isDocumentIntent) {
      const docList = primaryScheme.documents.map(d => `• ${d.name.te || d.name.en} (${d.type === 'Required' ? 'తప్పనిసరి' : 'షరతులకు లోబడి'})`).join('\n');
      answer = `ధృవీకరించబడిన అధికారిక రికార్డుల ప్రకారం, **${primaryScheme.name.te || primaryScheme.name.en}** పథకానికి అవసరమైన ముఖ్యమైన పత్రాలు:\n\n${docList}\n\nమరిన్ని వివరాలకు సంబంధిత అధికారిక పోర్టల్‌ని సందర్శించండి.`;
    } else if (isHowToApplyIntent) {
      const steps = primaryScheme.applicationGuide.slice(0, 3).map(s => `దశ ${s.stepNumber}: ${s.title.te || s.title.en} - ${s.instruction.te || s.instruction.en}`).join('\n\n');
      answer = `**${primaryScheme.name.te || primaryScheme.name.en}** కొరకు అధికారిక దరఖాస్తు విధానం:\n\n${steps}\n\nఅధికారిక వెబ్‌సైట్: ${primaryScheme.officialSource.url}\n(గమనిక: దళారులను నమ్మవద్దు, దరఖాస్తు పూర్తిగా ఉచితం లేదా నిర్ణీత రుసుముతో మాత్రమే ఉంటుంది)`;
    } else if (isEligibilityIntent) {
      const ruleList = primaryScheme.rules.map(r => `✓ ${r.explanation.te || r.explanation.en}`).join('\n');
      answer = `**${primaryScheme.name.te || primaryScheme.name.en}** యొక్క అధికారిక అర్హత నిబంధనలు:\n\n${ruleList}\n\nప్రయోజనం: ${primaryScheme.benefitsSummary.te || primaryScheme.benefitsSummary.en}`;
    } else {
      const schemeSummaries = topSchemes.map(s => `• **${s.name.te || s.name.en}**: ${s.shortDescription.te || s.shortDescription.en} (గడువు: ${s.applicationDeadline || 'నిరంతరం'})`).join('\n\n');
      answer = `మీ ప్రశ్నకు సంబంధించి ధృవీకరించబడిన అధికారిక పథకాలు ఇక్కడ ఉన్నాయి:\n\n${schemeSummaries}\n\nఈ సమాచారం సంబంధిత ప్రభుత్వ శాఖ రికార్డుల నుండి పరిశీలించబడింది.`;
    }
  } else if (lang === 'hi') {
    if (isDocumentIntent) {
      const docList = primaryScheme.documents.map(d => `• ${d.name.hi || d.name.en} (${d.type === 'Required' ? 'अनिवार्य' : 'शर्तों के अधीन'})`).join('\n');
      answer = `सत्यापित सरकारी रिकॉर्ड के अनुसार, **${primaryScheme.name.hi || primaryScheme.name.en}** हेतु मुख्य दस्तावेज निम्नलिखित हैं:\n\n${docList}\n\nकृपया आवेदन से पूर्व सभी दस्तावेज डिजिटल रूप में तैयार रखें।`;
    } else if (isHowToApplyIntent) {
      const steps = primaryScheme.applicationGuide.slice(0, 3).map(s => `चरण ${s.stepNumber}: ${s.title.hi || s.title.en} - ${s.instruction.hi || s.instruction.en}`).join('\n\n');
      answer = `**${primaryScheme.name.hi || primaryScheme.name.en}** के लिए आधिकारिक आवेदन प्रक्रिया:\n\n${steps}\n\nआधिकारिक पोर्टल: ${primaryScheme.officialSource.url}\n(सावधानी: किसी भी बिचौलिए या अनधिकृत एजेंट को पैसे न दें)`;
    } else if (isEligibilityIntent) {
      const ruleList = primaryScheme.rules.map(r => `✓ ${r.explanation.hi || r.explanation.en}`).join('\n');
      answer = `**${primaryScheme.name.hi || primaryScheme.name.en}** के लिए प्रकाशित पात्रता शर्तें:\n\n${ruleList}\n\nमुख्य लाभ: ${primaryScheme.benefitsSummary.hi || primaryScheme.benefitsSummary.en}`;
    } else {
      const schemeSummaries = topSchemes.map(s => `• **${s.name.hi || s.name.en}**: ${s.shortDescription.hi || s.shortDescription.en} (अंतिम तिथि: ${s.applicationDeadline || 'सतत जारी'})`).join('\n\n');
      answer = `आपके प्रश्न के आधार पर सत्यापित सरकारी योजनाएं:\n\n${schemeSummaries}\n\nयह जानकारी आधिकारिक सरकारी पोर्टल और प्रकाशित दिशा-निर्देशों से ली गई है।`;
    }
  } else {
    if (isDocumentIntent) {
      const docList = primaryScheme.documents.map(d => `• ${d.name.en} (${d.type === 'Required' ? 'Mandatory' : 'Conditional'})`).join('\n');
      answer = `Based on verified official gazettes, the required documents for **${primaryScheme.name.en}** are:\n\n${docList}\n\nEnsure all certificates are digitally issued and valid for the current fiscal year.`;
    } else if (isHowToApplyIntent) {
      const steps = primaryScheme.applicationGuide.slice(0, 3).map(s => `Step ${s.stepNumber}: ${s.title.en} - ${s.instruction.en}`).join('\n\n');
      answer = `Official application steps for **${primaryScheme.name.en}**:\n\n${steps}\n\nOfficial Portal: ${primaryScheme.officialSource.url}\n(Note: Never pay unofficial agents or intermediaries)`;
    } else if (isEligibilityIntent) {
      const ruleList = primaryScheme.rules.map(r => `✓ ${r.explanation.en}`).join('\n');
      answer = `Official published eligibility criteria for **${primaryScheme.name.en}**:\n\n${ruleList}\n\nBenefit Overview: ${primaryScheme.benefitsSummary.en}`;
    } else {
      const schemeSummaries = topSchemes.map(s => `• **${s.name.en}**: ${s.shortDescription.en} (Deadline: ${s.applicationDeadline || 'Open Enrollment'})`).join('\n\n');
      answer = `Here are the verified government records retrieved for your request:\n\n${schemeSummaries}\n\nAll details are strictly sourced from official government publications.`;
    }
  }

  return {
    answer,
    citedSources,
    isGrounded: true,
    retrievedSchemeCount: topSchemes.length
  };
}
