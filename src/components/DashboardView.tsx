"use client";

import React from 'react';
import { Scheme, Language, UserProfile, SavedApplication } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { evaluateEligibility, getEvaluatedSchemes } from '@/lib/eligibilityEngine';
import { SchemeVisualBadge } from '@/components/SchemeVisualBadge';
import { 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Clock, 
  BookmarkCheck, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  UserCheck,
  Building2,
  Calendar,
  Compass
} from 'lucide-react';

interface DashboardViewProps {
  userProfile: UserProfile;
  schemes: Scheme[];
  savedApplications: SavedApplication[];
  currentLanguage: Language;
  onSelectScheme: (scheme: Scheme) => void;
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  schemes,
  savedApplications,
  currentLanguage,
  onSelectScheme,
  onNavigate,
  onOpenProfile
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Evaluate all schemes deterministically
  const evaluated = getEvaluatedSchemes(userProfile, schemes, currentLanguage);

  const eligibleSchemes = evaluated.filter(e => e.evaluation.status === 'POTENTIALLY_ELIGIBLE');
  const needsVerification = evaluated.filter(e => e.evaluation.status === 'NEEDS_VERIFICATION');
  const scholarships = evaluated.filter(e => e.scheme.isScholarship && e.evaluation.status !== 'DOES_NOT_MATCH');

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t.greetingMorning : hour < 17 ? t.greetingAfternoon : t.greetingEvening;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{userProfile.employmentStatus} • {userProfile.state}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {greeting}, {userProfile.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              {currentLanguage === 'te' 
                ? "మీ ప్రొఫైల్ వివరాల ఆధారంగా అర్హత గల పథకాలను మా అల్గారిథమ్ లెక్కించింది." 
                : currentLanguage === 'hi' 
                ? "आपकी प्रोफाइल के आधार पर नियमबद्ध तरीके से उपयुक्त योजनाओं का मिलान किया गया है।" 
                : "Your profile has been deterministically evaluated against verified central and state guidelines."}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenProfile}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-semibold transition-all"
            >
              Edit Profile Attributes
            </button>
            <button
              onClick={() => onNavigate('assistant')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask JanSahay AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('discover')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer border border-emerald-500/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{t.potentialMatches}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">{eligibleSchemes.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">100% Mandatory criteria matched</div>
        </div>

        <div 
          onClick={() => onNavigate('scholarships')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer border border-blue-500/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{t.matchingScholarships}</span>
            <GraduationCap className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">{scholarships.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Education & student benefits</div>
        </div>

        <div 
          onClick={() => onNavigate('discover')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer border border-amber-500/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{t.statusNeedsVerification}</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">{needsVerification.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Require certificate uploads</div>
        </div>

        <div 
          onClick={() => onNavigate('applications')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer border border-indigo-500/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{t.savedApplications}</span>
            <BookmarkCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">{savedApplications.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Actively tracked deadlines</div>
        </div>
      </div>

      {/* Recommended Schemes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{t.recommendedTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.recommendedSubtitle}
            </p>
          </div>

          <button
            onClick={() => onNavigate('discover')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {evaluated.slice(0, 6).map(({ scheme, evaluation }) => {
            const title = scheme.name[currentLanguage] || scheme.name.en;
            const desc = scheme.shortDescription[currentLanguage] || scheme.shortDescription.en;

            return (
              <div
                key={scheme.id}
                onClick={() => onSelectScheme(scheme)}
                className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex flex-col justify-between border border-white/10"
              >
                <div>
                  {/* Visual Badge & Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <SchemeVisualBadge schemeId={scheme.id} category={scheme.category} size="md" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 truncate">
                          {scheme.category}
                        </span>

                        {evaluation.status === 'POTENTIALLY_ELIGIBLE' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-eligible flex-shrink-0">
                            {t.statusEligible}
                          </span>
                        ) : evaluation.status === 'NEEDS_VERIFICATION' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-verification flex-shrink-0">
                            {t.statusNeedsVerification}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-unmatched flex-shrink-0">
                            {t.statusDoesNotMatch}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 leading-snug">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Concise Description Badge */}
                  <div className="mt-1 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-200 line-clamp-1 font-medium">
                    {desc}
                  </div>

                  {/* Explainable Why You Matched box - Concise */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400">{t.whyMatched}</span>
                      <span className="text-blue-400 font-mono text-[10px] bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-500/20">{evaluation.percentageScore}% match</span>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {evaluation.matchedCriteria.slice(0, 2).map((c, i) => (
                        <div key={i} className="inline-flex items-center space-x-1 text-[10px] text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 max-w-full truncate">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span className="truncate">{c}</span>
                        </div>
                      ))}
                      {evaluation.pendingVerificationCriteria.slice(0, 1).map((c, i) => (
                        <div key={i} className="inline-flex items-center space-x-1 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 max-w-full truncate">
                          <span className="text-amber-400 font-bold">⚠</span>
                          <span className="truncate">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="text-slate-400 font-medium">
                    {scheme.maxBenefitAmount || scheme.coverage}
                  </div>

                  <span className="font-semibold text-blue-400 flex items-center space-x-1">
                    <span>{t.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
