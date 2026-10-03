"use client";

import React, { useState } from 'react';
import { Scheme, Language, UserProfile } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { evaluateEligibility } from '@/lib/eligibilityEngine';
import { SchemeVisualBadge } from '@/components/SchemeVisualBadge';
import { 
  GraduationCap, 
  Search, 
  Building2, 
  Calendar, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface ScholarshipFinderProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  currentLanguage: Language;
  onSelectScheme: (scheme: Scheme) => void;
  onOpenProfile: () => void;
}

export const ScholarshipFinder: React.FC<ScholarshipFinderProps> = ({
  schemes,
  userProfile,
  currentLanguage,
  onSelectScheme,
  onOpenProfile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eduFilter, setEduFilter] = useState<string>('ALL');

  const t = TRANSLATIONS[currentLanguage];

  // Only take schemes that are scholarships
  const scholarships = schemes.filter(s => s.isScholarship || s.category === 'Scholarships');

  const filtered = scholarships.filter(s => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleEn = s.name.en.toLowerCase();
      const titleTe = s.name.te.toLowerCase();
      const titleHi = s.name.hi.toLowerCase();
      const dept = s.department.toLowerCase();

      if (!titleEn.includes(q) && !titleTe.includes(q) && !titleHi.includes(q) && !dept.includes(q)) {
        return false;
      }
    }

    if (eduFilter !== 'ALL') {
      const hasEduRule = s.rules.some(r => r.field === 'educationLevel' && Array.isArray(r.value) && r.value.includes(eduFilter));
      if (!hasEduRule) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>National & State Scholarship Portals (NSP, AICTE, State)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t.navScholarships} & Higher Education Grants
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Discover merit-cum-means scholarships, fee reimbursement, and girl student incentives matched directly to your course, year of study, and family income.
            </p>
          </div>

          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all self-start md:self-auto"
          >
            <span>Update Student Info</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships by keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Education Level Selector */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Education:</span>
          {['ALL', 'Undergraduate', 'Vocational / Diploma', 'Postgraduate'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setEduFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                eduFilter === lvl
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {lvl === 'ALL' ? 'All Degrees' : lvl}
            </button>
          ))}
        </div>

      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((scheme) => {
          const evalResult = evaluateEligibility(userProfile, scheme, currentLanguage);
          const title = scheme.name[currentLanguage] || scheme.name.en;
          const desc = scheme.shortDescription[currentLanguage] || scheme.shortDescription.en;

          return (
            <div
              key={scheme.id}
              onClick={() => onSelectScheme(scheme)}
              className="glass-panel glass-panel-hover p-6 rounded-2xl cursor-pointer flex flex-col justify-between border border-white/10"
            >
              <div>
                {/* Visual Badge & Header */}
                <div className="flex items-start gap-3 mb-3">
                  <SchemeVisualBadge schemeId={scheme.id} category={scheme.category} size="md" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      {evalResult.status === 'POTENTIALLY_ELIGIBLE' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-eligible">
                          {t.statusEligible}
                        </span>
                      ) : evalResult.status === 'NEEDS_VERIFICATION' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-verification">
                          {t.statusNeedsVerification}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-unmatched">
                          {t.statusDoesNotMatch}
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{scheme.applicationDeadline || 'Open'}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 leading-snug">
                      {title}
                    </h3>

                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-0.5">
                      <Building2 className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate text-[11px]">{scheme.department}</span>
                    </div>
                  </div>
                </div>

                {/* Award Amount Badge */}
                <div className="mt-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-950/30 to-blue-950/30 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Scholarship Grant</span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-300">
                    {scheme.maxBenefitAmount || 'Full Tuition Coverage'}
                  </span>
                </div>

                {/* Concise Description Badge */}
                <div className="mt-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-200 line-clamp-1 font-medium">
                  {desc}
                </div>

                {/* Explainable Match Reason - Concise Pills */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {t.whyMatched}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {evalResult.matchedCriteria.slice(0, 2).map((c, i) => (
                      <span key={i} className="inline-flex items-center space-x-1 text-[10px] text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 max-w-full truncate">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span className="truncate">{c}</span>
                      </span>
                    ))}
                    {evalResult.pendingVerificationCriteria.slice(0, 1).map((c, i) => (
                      <span key={i} className="inline-flex items-center space-x-1 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 max-w-full truncate">
                        <span className="text-amber-400 font-bold">⚠</span>
                        <span className="truncate">{c}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  {scheme.documents.length} Required Docs
                </span>

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
  );
};
