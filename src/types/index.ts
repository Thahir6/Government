export type Language = 'en' | 'te' | 'hi';

export type EligibilityStatus = 
  | 'POTENTIALLY_ELIGIBLE' 
  | 'NEEDS_VERIFICATION' 
  | 'DOES_NOT_MATCH';

export type SchemeCategory = 
  | 'Scholarships'
  | 'Education'
  | 'Agriculture'
  | 'Healthcare'
  | 'Housing'
  | 'Financial Assistance'
  | 'Women'
  | 'Senior Citizens'
  | 'Employment'
  | 'Social Welfare';

export type CoverageType = 'Central' | 'State';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  state: string;
  district: string;
  educationLevel: 'Below 10th' | '10th Pass' | '12th Pass' | 'Undergraduate' | 'Postgraduate' | 'Doctoral / Ph.D' | 'Vocational / Diploma';
  isStudent: boolean;
  course?: string;
  yearOfStudy?: string;
  institutionType?: 'Government' | 'Private' | 'Aided' | 'Autonomous';
  annualFamilyIncome: number; // in INR e.g. 150000
  employmentStatus: 'Student' | 'Unemployed' | 'Self-Employed' | 'Farmer' | 'Salaried' | 'Daily Wage Worker' | 'Retired';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority';
  isFarmer: boolean;
  landHoldingAcres?: number;
  hasKisanCreditCard?: boolean;
  isSeniorCitizen: boolean;
  isDifferentlyAbled: boolean;
  language: Language;
  hasIncomeCertificate?: boolean;
  hasCasteCertificate?: boolean;
  hasDomicileCertificate?: boolean;
  hasRationCard?: boolean;
}

export type Operator = '>=' | '<=' | '==' | '!=' | 'in' | 'contains' | 'boolean';

export interface EligibilityRule {
  id: string;
  schemeId: string;
  field: keyof UserProfile | string;
  operator: Operator;
  value: any;
  explanation: {
    en: string;
    te: string;
    hi: string;
  };
  isMandatory: boolean; // if false, missing value leads to NEEDS_VERIFICATION rather than DOES_NOT_MATCH
}

export interface DocumentItem {
  id: string;
  schemeId: string;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  type: 'Required' | 'Conditional' | 'Optional';
  conditionText?: {
    en: string;
    te: string;
    hi: string;
  };
  description: {
    en: string;
    te: string;
    hi: string;
  };
  issuingAuthority: string;
}

export interface ApplicationGuideStep {
  stepNumber: number;
  title: {
    en: string;
    te: string;
    hi: string;
  };
  instruction: {
    en: string;
    te: string;
    hi: string;
  };
  officialPortalUrl?: string;
  tip?: {
    en: string;
    te: string;
    hi: string;
  };
}

export interface SourceRecord {
  url: string;
  publisher: string;
  department: string;
  verificationDate: string;
  reviewer: string;
  version: string;
  changeNotes: string;
}

export interface Scheme {
  id: string;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  shortDescription: {
    en: string;
    te: string;
    hi: string;
  };
  detailedDescription: {
    en: string;
    te: string;
    hi: string;
  };
  purpose: string;
  category: SchemeCategory;
  coverage: CoverageType;
  department: string;
  state?: string; // empty if Central
  status: 'Active' | 'Upcoming' | 'Expired';
  benefitsSummary: {
    en: string;
    te: string;
    hi: string;
  };
  maxBenefitAmount?: string; // e.g. "₹50,000 / year" or "₹6,000 / year"
  applicationDeadline?: string;
  applicationWindow?: string;
  officialSource: SourceRecord;
  rules: EligibilityRule[];
  documents: DocumentItem[];
  applicationGuide: ApplicationGuideStep[];
  faqs: {
    question: { en: string; te: string; hi: string };
    answer: { en: string; te: string; hi: string };
  }[];
  isScholarship?: boolean;
}

export interface Scholarship extends Scheme {
  isScholarship: true;
  educationCriteriaText: string;
  incomeLimitText: string;
  awardAmount: string;
}

export interface RuleEvaluationDetail {
  ruleId: string;
  ruleExplanation: string;
  passed: boolean;
  isPendingVerification: boolean;
  actualValue: any;
  expectedValue: any;
}

export interface EligibilityResult {
  schemeId: string;
  status: EligibilityStatus;
  percentageScore: number;
  matchedCriteria: string[];
  pendingVerificationCriteria: string[];
  unmatchedCriteria: string[];
  details: RuleEvaluationDetail[];
  summaryNote: string;
}

export type ApplicationStage = 
  | 'Saved'
  | 'Preparing'
  | 'Applied'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Completed';

export interface SavedApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  category: SchemeCategory;
  referenceNumber?: string;
  status: ApplicationStage;
  appliedDate?: string;
  deadline?: string;
  notes?: string;
  reminderActive: boolean;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: 'SCHEME_CREATED' | 'SCHEME_UPDATED' | 'RULE_MODIFIED' | 'VERIFICATION_RENEWED' | 'DOCUMENT_UPDATED';
  recordType: 'Scheme' | 'Scholarship' | 'Rule' | 'Document';
  recordId: string;
  recordName: string;
  timestamp: string;
  changes: string;
}

export type ScamSafetyLevel = 'OFFICIAL_MATCH' | 'UNVERIFIABLE' | 'SUSPICIOUS';

export interface ScamAnalysisResult {
  safetyLevel: ScamSafetyLevel;
  riskScore: number; // 0 (safe) to 100 (high risk)
  headline: string;
  summary: string;
  identifiedRedFlags: string[];
  verifiedSafetySignals: string[];
  matchedOfficialRecord?: {
    schemeName: string;
    officialUrl: string;
    verifiedDepartment: string;
  };
  recommendedAction: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  citedSources?: {
    title: string;
    url: string;
    department: string;
    lastVerified: string;
  }[];
  isAudioPlaying?: boolean;
}
