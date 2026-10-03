"use client";

import React, { useState } from 'react';
import { Scheme, Language, UserProfile, EligibilityResult } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { evaluateEligibility } from '@/lib/eligibilityEngine';
import { DocumentChecklist } from './DocumentChecklist';
import { ApplicationGuide } from './ApplicationGuide';
import { 
  X, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  Building2,
  Clock,
  Sparkles,
  Bookmark,
  Share2
} from 'lucide-react';

interface SchemeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: Scheme | null;
  userProfile: UserProfile;
  currentLanguage: Language;
  onSaveToTracker?: (scheme: Scheme) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  isOpen,
  onClose,
  scheme,
  userProfile,
  currentLanguage,
  onSaveToTracker
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'guide' | 'faqs'>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  if (!isOpen || !scheme) return null;

  const evaluation: EligibilityResult = evaluateEligibility(userProfile, scheme, currentLanguage);

  const schemeTitle = scheme.name[currentLanguage] || scheme.name.en;
  const shortDesc = scheme.shortDescription[currentLanguage] || scheme.shortDescription.en;
  const detailedDesc = scheme.detailedDescription[currentLanguage] || scheme.detailedDescription.en;
  const benefitsText = scheme.benefitsSummary[currentLanguage] || scheme.benefitsSummary.en;

  const getStatusBadge = () => {
    if (evaluation.status === 'POTENTIALLY_ELIGIBLE') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold badge-eligible">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.statusEligible}</span>
        </span>
      );
    }
    if (evaluation.status === 'NEEDS_VERIFICATION') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold badge-verification">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.statusNeedsVerification}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold badge-unmatched">
        <XCircle className="w-3.5 h-3.5 text-rose-400" />
        <span>{t.statusDoesNotMatch}</span>
      </span>
    );
  };

  const handleSave = () => {
    if (onSaveToTracker) {
      onSaveToTracker(scheme);
      setIsSaved(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-6 bg-[#0B1B36] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Section */}
        <div className="px-6 pt-5 pb-4 border-b border-white/10 bg-[#0F2444]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {getStatusBadge()}
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {scheme.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                  {scheme.coverage} Government
                </span>
                {scheme.maxBenefitAmount && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {scheme.maxBenefitAmount}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {schemeTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center space-x-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{scheme.department}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-2 mt-5 overflow-x-auto pb-1 border-t border-white/5 pt-3">
            {[
              { id: 'overview', label: 'Overview & Benefits', icon: FileText },
              { id: 'eligibility', label: `${t.whyMatched} (${evaluation.percentageScore}%)`, icon: Sparkles },
              { id: 'documents', label: `${t.docsTitle} (${scheme.documents.length})`, icon: BookOpen },
              { id: 'guide', label: 'Application Guide', icon: ShieldCheck },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              
              {/* Detailed Summary */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Description</h3>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {detailedDesc}
                </p>
              </div>

              {/* Benefits Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border border-blue-500/30 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Official Benefits & Financial Assistance</h3>
                <p className="text-white font-medium text-xs sm:text-sm leading-relaxed">
                  {benefitsText}
                </p>
              </div>

              {/* Important Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/10 flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Application Deadline</div>
                    <div className="text-sm font-bold text-white">
                      {scheme.applicationDeadline || 'Open Enrollment / Continuous'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/10 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Application Window</div>
                    <div className="text-sm font-bold text-white">
                      {scheme.applicationWindow || '2026-2027 Academic Cycle'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Provenance & Verified Source Card */}
              <div className="p-4 rounded-xl bg-[#09172E] border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {t.verifiedSource}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {t.lastVerified}: {scheme.officialSource.verificationDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Publisher: </span>
                    <span className="text-slate-200 font-medium">{scheme.officialSource.publisher}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Official Reviewer: </span>
                    <span className="text-slate-200 font-medium">{scheme.officialSource.reviewer}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Version: </span>
                    <span className="text-slate-200 font-mono">{scheme.officialSource.version}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Change Notes: </span>
                    <span className="text-slate-300 italic">{scheme.officialSource.changeNotes}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono truncate max-w-sm">
                    {scheme.officialSource.url}
                  </span>
                  <a
                    href={scheme.officialSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EXPLAINABLE ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    Deterministic Match Score: {evaluation.percentageScore}%
                  </span>
                  {getStatusBadge()}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {evaluation.summaryNote}
                </p>
              </div>

              {/* Matched Rules */}
              {evaluation.matchedCriteria.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Satisfied Mandatory Criteria ({evaluation.matchedCriteria.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {evaluation.matchedCriteria.map((c, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Verification Rules */}
              {evaluation.pendingVerificationCriteria.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-amber-400 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Verification Required / Documents Needed ({evaluation.pendingVerificationCriteria.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {evaluation.pendingVerificationCriteria.map((c, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-200">
                        <span className="text-amber-400 font-bold">⚠</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Unmatched Rules */}
              {evaluation.unmatchedCriteria.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-rose-400 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Unmatched Criteria ({evaluation.unmatchedCriteria.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {evaluation.unmatchedCriteria.map((c, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-200">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-slate-900 border border-white/5 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Important Disclaimer: </span>
                {t.aiDisclaimer}
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'documents' && (
            <DocumentChecklist
              documents={scheme.documents}
              schemeName={schemeTitle}
              currentLanguage={currentLanguage}
            />
          )}

          {/* TAB 4: APPLICATION GUIDE */}
          {activeTab === 'guide' && (
            <ApplicationGuide
              steps={scheme.applicationGuide}
              schemeName={schemeTitle}
              officialUrl={scheme.officialSource.url}
              currentLanguage={currentLanguage}
            />
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {scheme.faqs.map((faq, i) => {
                const isOpenFaq = openFaqIndex === i;
                const qText = faq.question[currentLanguage] || faq.question.en;
                const aText = faq.answer[currentLanguage] || faq.answer.en;

                return (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpenFaq ? null : i)}
                      className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                    >
                      <span>{qText}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpenFaq ? 'rotate-180 text-blue-400' : ''}`} />
                    </button>

                    {isOpenFaq && (
                      <div className="p-3.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/30">
                        {aText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0F2444] flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-white/10 hover:bg-slate-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? "Tracked in My Applications" : "Save / Track Scheme"}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors text-xs"
            >
              Close
            </button>

            <button
              onClick={() => setShowApplyModal(true)}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all"
            >
              <span>{t.applyOfficial}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Safety Confirmation Modal before leaving to official portal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1B36] border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-2.5 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Official Portal Redirection</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You are navigating to the verified government portal:
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-emerald-400 break-all">
              {scheme.officialSource.url}
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
              <span className="font-bold">Security Rule: </span>
              Government portals never ask for OTPs or advance processing fees via unofficial links. Ensure address bar shows <span className="font-mono text-white">.gov.in</span> or <span className="font-mono text-white">.nic.in</span>.
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Back to JanSahay
              </button>
              <a
                href={scheme.officialSource.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowApplyModal(false)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md"
              >
                <span>Proceed to Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
