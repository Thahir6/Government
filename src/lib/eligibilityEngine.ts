import { UserProfile, Scheme, EligibilityResult, RuleEvaluationDetail, Language } from '@/types';

/**
 * Deterministic Rule Engine for JanSahay AI
 * Evaluates published government scheme rules against user profile attributes.
 * Zero hallucination - purely deterministic rule evaluation.
 */
export function evaluateEligibility(
  profile: UserProfile, 
  scheme: Scheme, 
  lang: Language = 'en'
): EligibilityResult {
  const rules = scheme.rules || [];
  
  if (rules.length === 0) {
    return {
      schemeId: scheme.id,
      status: 'POTENTIALLY_ELIGIBLE',
      percentageScore: 100,
      matchedCriteria: ["No restrictive eligibility rules specified."],
      pendingVerificationCriteria: [],
      unmatchedCriteria: [],
      details: [],
      summaryNote: "Universal access scheme based on published guidelines."
    };
  }

  const matchedCriteria: string[] = [];
  const pendingVerificationCriteria: string[] = [];
  const unmatchedCriteria: string[] = [];
  const details: RuleEvaluationDetail[] = [];

  let mandatoryCount = 0;
  let mandatoryPassed = 0;
  let nonMandatoryPending = 0;

  for (const rule of rules) {
    const userValue = (profile as any)[rule.field];
    const targetValue = rule.value;
    const ruleExplanation = rule.explanation[lang] || rule.explanation.en;

    let passed = false;
    let isPending = false;

    // Evaluate based on operator
    switch (rule.operator) {
      case '>=':
        passed = typeof userValue === 'number' && userValue >= targetValue;
        break;
      case '<=':
        passed = typeof userValue === 'number' && userValue <= targetValue;
        break;
      case '==':
        passed = userValue === targetValue;
        break;
      case '!=':
        passed = userValue !== targetValue;
        break;
      case 'in':
        if (Array.isArray(targetValue)) {
          passed = targetValue.includes(userValue);
        }
        break;
      case 'contains':
        if (typeof userValue === 'string' && typeof targetValue === 'string') {
          passed = userValue.toLowerCase().includes(targetValue.toLowerCase());
        } else if (Array.isArray(userValue)) {
          passed = userValue.includes(targetValue);
        }
        break;
      default:
        passed = userValue == targetValue;
    }

    // Handle conditional/documentation rules where user might not have uploaded certificate yet
    if (!passed && !rule.isMandatory) {
      isPending = true;
      nonMandatoryPending++;
      pendingVerificationCriteria.push(ruleExplanation);
    } else if (passed) {
      matchedCriteria.push(ruleExplanation);
      if (rule.isMandatory) {
        mandatoryPassed++;
      }
    } else {
      unmatchedCriteria.push(ruleExplanation);
    }

    if (rule.isMandatory) {
      mandatoryCount++;
    }

    details.push({
      ruleId: rule.id,
      ruleExplanation,
      passed,
      isPendingVerification: isPending,
      actualValue: userValue,
      expectedValue: targetValue
    });
  }

  // Determine overall status
  let status: 'POTENTIALLY_ELIGIBLE' | 'NEEDS_VERIFICATION' | 'DOES_NOT_MATCH';
  
  if (unmatchedCriteria.length > 0) {
    status = 'DOES_NOT_MATCH';
  } else if (nonMandatoryPending > 0 || pendingVerificationCriteria.length > 0) {
    status = 'NEEDS_VERIFICATION';
  } else {
    status = 'POTENTIALLY_ELIGIBLE';
  }

  const totalRules = rules.length;
  const passedRules = matchedCriteria.length;
  const percentageScore = Math.round((passedRules / totalRules) * 100);

  let summaryNote = "";
  if (status === 'POTENTIALLY_ELIGIBLE') {
    summaryNote = lang === 'te' 
      ? "మీ ప్రొఫైల్ వివరాలు ఈ పథకం యొక్క అన్ని ప్రాథమిక నిబంధనలకు సరిపోలుతున్నాయి." 
      : lang === 'hi' 
      ? "आपकी प्रोफाइल इस योजना की सभी अनिवार्य प्रकाशित शर्तों से पूरी तरह मेल खाती है।" 
      : "Your profile matches all published mandatory criteria for this scheme.";
  } else if (status === 'NEEDS_VERIFICATION') {
    summaryNote = lang === 'te' 
      ? "ప్రాథమిక అర్హత ఉంది, అయితే అవసరమైన సర్టిఫికెట్ల సమర్పణ మరియు ధృవీకరణ అవసరం." 
      : lang === 'hi' 
      ? "प्राथमिक पात्रता शर्तें पूरी हैं, किंतु आवश्यक प्रमाण पत्रों का सत्यापन अपेक्षित है।" 
      : "Key criteria met, but required certification / documentation status needs physical verification.";
  } else {
    summaryNote = lang === 'te' 
      ? "మీ ప్రస్తుత ప్రొఫైల్ వివరాలు ప్రచురించబడిన నిబంధనలతో సరిపోలడం లేదు." 
      : lang === 'hi' 
      ? "आपकी प्रोफाइल प्रकाशित पात्रता मानदंडों को पूरा नहीं करती है।" 
      : "Your current profile does not satisfy one or more mandatory published criteria.";
  }

  return {
    schemeId: scheme.id,
    status,
    percentageScore,
    matchedCriteria,
    pendingVerificationCriteria,
    unmatchedCriteria,
    details,
    summaryNote
  };
}

/**
 * Filter and rank schemes based on deterministic eligibility results
 */
export function getEvaluatedSchemes(
  profile: UserProfile, 
  schemes: Scheme[], 
  lang: Language = 'en'
) {
  return schemes.map(scheme => {
    const evaluation = evaluateEligibility(profile, scheme, lang);
    return {
      scheme,
      evaluation
    };
  }).sort((a, b) => {
    // Sort order: POTENTIALLY_ELIGIBLE > NEEDS_VERIFICATION > DOES_NOT_MATCH
    const scoreMap = {
      POTENTIALLY_ELIGIBLE: 3,
      NEEDS_VERIFICATION: 2,
      DOES_NOT_MATCH: 1
    };
    const diff = scoreMap[b.evaluation.status] - scoreMap[a.evaluation.status];
    if (diff !== 0) return diff;
    return b.evaluation.percentageScore - a.evaluation.percentageScore;
  });
}
