"use client";

import React, { useState, useMemo } from 'react';
import { Scheme, SchemeCategory, Language, UserProfile, CoverageType } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { evaluateEligibility } from '@/lib/eligibilityEngine';
import { SchemeVisualBadge } from '@/components/SchemeVisualBadge';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Building2, 
  Calendar, 
  ArrowUpDown, 
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';

interface SchemeDiscoveryProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  currentLanguage: Language;
  onSelectScheme: (scheme: Scheme) => void;
}

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({
  schemes,
  userProfile,
  currentLanguage,
  onSelectScheme
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCoverage, setSelectedCoverage] = useState<'ALL' | CoverageType>('ALL');
  const [eligibilityFilter, setEligibilityFilter] = useState<'ALL' | 'ELIGIBLE' | 'NEEDS_VERIFICATION' | 'ALL_MATCH'>('ALL');
  const [sortBy, setSortBy] = useState<'MATCH' | 'NAME' | 'DEADLINE'>('MATCH');

  const t = TRANSLATIONS[currentLanguage];

  const categories: SchemeCategory[] = [
    'Scholarships',
    'Education',
    'Agriculture',
    'Healthcare',
    'Housing',
    'Senior Citizens',
    'Employment',
    'Financial Assistance'
  ];

  const sampleQueries = [
    "Student from Andhra Pradesh looking for engineering scholarship",
    "Small farmer looking for agricultural income support",
    "Senior citizen health insurance coverage",
    "Self-employed loan subsidy for new micro business"
  ];

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameEn = scheme.name.en.toLowerCase();
        const nameTe = scheme.name.te.toLowerCase();
        const nameHi = scheme.name.hi.toLowerCase();
        const dept = scheme.department.toLowerCase();
        const cat = scheme.category.toLowerCase();
        const desc = scheme.shortDescription.en.toLowerCase();

        const matches = nameEn.includes(q) || 
                        nameTe.includes(q) || 
                        nameHi.includes(q) || 
                        dept.includes(q) || 
                        cat.includes(q) || 
                        desc.includes(q);

        if (!matches) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'ALL' && scheme.category !== selectedCategory) {
        return false;
      }

      // 3. Coverage Filter
      if (selectedCoverage !== 'ALL' && scheme.coverage !== selectedCoverage) {
        return false;
      }

      // 4. Eligibility Filter
      if (eligibilityFilter !== 'ALL') {
        const evalResult = evaluateEligibility(userProfile, scheme, currentLanguage);
        if (eligibilityFilter === 'ELIGIBLE' && evalResult.status !== 'POTENTIALLY_ELIGIBLE') {
          return false;
        }
        if (eligibilityFilter === 'NEEDS_VERIFICATION' && evalResult.status !== 'NEEDS_VERIFICATION') {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const evalA = evaluateEligibility(userProfile, a, currentLanguage);
      const evalB = evaluateEligibility(userProfile, b, currentLanguage);

      if (sortBy === 'MATCH') {
        const scoreA = evalA.status === 'POTENTIALLY_ELIGIBLE' ? 3 : evalA.status === 'NEEDS_VERIFICATION' ? 2 : 1;
        const scoreB = evalB.status === 'POTENTIALLY_ELIGIBLE' ? 3 : evalB.status === 'NEEDS_VERIFICATION' ? 2 : 1;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return evalB.percentageScore - evalA.percentageScore;
      } else if (sortBy === 'NAME') {
        return a.name.en.localeCompare(b.name.en);
      } else {
        // Sort by deadline
        return (a.applicationDeadline || 'Z').localeCompare(b.applicationDeadline || 'Z');
      }
    });
  }, [schemes, searchQuery, selectedCategory, selectedCoverage, eligibilityFilter, sortBy, userProfile, currentLanguage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Search Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {t.navDiscover}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search and filter verified government schemes evaluated deterministically against your profile.
        </p>
      </div>

      {/* Intelligent Search Input */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0F2444] border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Natural Language Prompt Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-medium">Try:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-300 hover:text-blue-300 hover:border-blue-500/30 transition-all text-left"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.filterAll}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Coverage & Eligibility Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium">Jurisdiction:</span>
            {(['ALL', 'Central', 'State'] as const).map((cov) => (
              <button
                key={cov}
                onClick={() => setSelectedCoverage(cov)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedCoverage === cov
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {cov === 'ALL' ? t.coverageAll : cov === 'Central' ? t.filterCentral : t.filterState}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="MATCH">Eligibility Match (Highest)</option>
              <option value="NAME">Scheme Name (A-Z)</option>
              <option value="DEADLINE">Deadline</option>
            </select>
          </div>

        </div>

      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/10 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Matching Schemes Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try broadening your search query or selecting "All Categories" to view available schemes.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setSelectedCoverage('ALL'); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchemes.map((scheme) => {
            const evalResult = evaluateEligibility(userProfile, scheme, currentLanguage);
            const title = scheme.name[currentLanguage] || scheme.name.en;
            const desc = scheme.shortDescription[currentLanguage] || scheme.shortDescription.en;

            return (
              <div
                key={scheme.id}
                onClick={() => onSelectScheme(scheme)}
                className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex flex-col justify-between border border-white/10"
              >
                <div>
                  {/* Visual Logo & Card Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <SchemeVisualBadge schemeId={scheme.id} category={scheme.category} size="md" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 truncate">
                          {scheme.category}
                        </span>

                        {evalResult.status === 'POTENTIALLY_ELIGIBLE' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold badge-eligible flex-shrink-0">
                            {t.statusEligible}
                          </span>
                        ) : evalResult.status === 'NEEDS_VERIFICATION' ? (
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

                      <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mt-0.5">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{scheme.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* Concise Description Badge/Pill */}
                  <div className="mt-1 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-200 line-clamp-1">
                      {desc}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 font-mono whitespace-nowrap bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {scheme.coverage}
                    </span>
                  </div>

                  {/* Verification Badge */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    <span className="flex items-center space-x-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t.verifiedSource}</span>
                    </span>
                    <span className="font-mono text-[10px]">
                      {scheme.officialSource.verificationDate}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="text-emerald-300 font-bold">
                    {scheme.maxBenefitAmount || `${scheme.coverage} Scheme`}
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
      )}

    </div>
  );
};
