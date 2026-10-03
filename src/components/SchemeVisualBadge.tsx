"use client";

import React from 'react';
import { SchemeCategory } from '@/types';
import { 
  GraduationCap, 
  HeartPulse, 
  Sprout, 
  Home, 
  Briefcase, 
  Users, 
  Coins, 
  ShieldCheck,
  Building2,
  BookOpen
} from 'lucide-react';

interface SchemeVisualBadgeProps {
  schemeId?: string;
  category?: SchemeCategory;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SchemeVisualBadge: React.FC<SchemeVisualBadgeProps> = ({
  schemeId = '',
  category = 'Scholarships',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl p-2 text-xs',
    md: 'w-12 h-12 rounded-2xl p-2.5 text-sm',
    lg: 'w-16 h-16 rounded-2xl p-3.5 text-base'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // 1. Post-Matric Scholarship (NSP Official-style insignia)
  if (schemeId === 'sch_post_matric_01') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0F172A] border border-blue-400/30 shadow-md shadow-blue-900/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="National Scholarship Portal (NSP) - Verified Scheme"
      >
        <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-amber-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-amber-400 font-mono tracking-tighter">NSP</span>
      </div>
    );
  }

  // 2. AICTE Pragati Scholarship for Girls
  if (schemeId === 'sch_pragati_02') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#831843] via-[#4C0519] to-[#0F172A] border border-pink-400/30 shadow-md shadow-pink-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="AICTE Pragati Scholarship for Girls"
      >
        <div className="absolute inset-0 bg-pink-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-pink-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
          <path d="M12 13v4" />
          <path d="M10 15h4" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-pink-300 font-mono tracking-tighter">AICTE</span>
      </div>
    );
  }

  // 3. PM-KISAN Samman Nidhi (Agriculture Ministry insignia)
  if (schemeId === 'sch_pm_kisan_03') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#0F172A] border border-emerald-400/30 shadow-md shadow-emerald-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="PM-KISAN Samman Nidhi - Ministry of Agriculture"
      >
        <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-emerald-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 20h10" />
          <path d="M12 20V10" />
          <path d="M12 10c0-3.5 2.5-6 6-6-0.5 4-2.5 6-6 6z" />
          <path d="M12 14c0-2.5-2-4.5-5-4.5.5 3 2 4.5 5 4.5z" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[7px] font-black text-amber-300 font-mono tracking-tighter">KISAN</span>
      </div>
    );
  }

  // 4. Ayushman Bharat (AB-PMJAY official healthcare visual)
  if (schemeId === 'sch_ayushman_04') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#991B1B] via-[#450A0A] to-[#042F2E] border border-rose-400/30 shadow-md shadow-rose-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="Ayushman Bharat - National Health Authority"
      >
        <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-rose-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-emerald-300 font-mono tracking-tighter">PMJAY</span>
      </div>
    );
  }

  // 5. Indira Gandhi National Old Age Pension Scheme (IGNOAPS)
  if (schemeId === 'sch_pension_05') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#78350F] via-[#451A03] to-[#0F172A] border border-amber-400/30 shadow-md shadow-amber-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="National Social Assistance Programme (NSAP) - Pension"
      >
        <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-amber-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M19 8v6m-3-3h6" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-amber-300 font-mono tracking-tighter">NSAP</span>
      </div>
    );
  }

  // 6. Jagananna Vidya Deevena (AP Fee Reimbursement)
  if (schemeId === 'sch_jvd_06') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0C4A6E] via-[#082F49] to-[#022C22] border border-sky-400/30 shadow-md shadow-sky-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="Jagananna Vidya Deevena - AP JnanaBhumi"
      >
        <div className="absolute inset-0 bg-sky-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-sky-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-teal-300 font-mono tracking-tighter">AP-JVD</span>
      </div>
    );
  }

  // 7. PMEGP (Prime Minister's Employment Generation Programme)
  if (schemeId === 'sch_pmegp_07') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#4C1D95] via-[#2E1065] to-[#0F172A] border border-purple-400/30 shadow-md shadow-purple-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="PMEGP - Ministry of MSME"
      >
        <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-purple-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-purple-300 font-mono tracking-tighter">MSME</span>
      </div>
    );
  }

  // 8. PMAY (Pradhan Mantri Awas Yojana)
  if (schemeId === 'sch_pmay_08') {
    return (
      <div 
        className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0369A1] border border-cyan-400/30 shadow-md shadow-cyan-950/30 overflow-hidden ${sizeClasses[size]} ${className}`}
        title="Pradhan Mantri Awas Yojana (PMAY) - Housing"
      >
        <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-xs" />
        <svg className={`${iconSizes[size]} text-cyan-300 relative z-10`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-cyan-300 font-mono tracking-tighter">PMAY</span>
      </div>
    );
  }

  // Category-based Fallback Visuals
  switch (category) {
    case 'Scholarships':
    case 'Education':
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-900/90 to-slate-900 border border-blue-400/30 shadow-md shadow-blue-950/30 ${sizeClasses[size]} ${className}`}>
          <GraduationCap className={`${iconSizes[size]} text-blue-300`} />
        </div>
      );
    case 'Healthcare':
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-rose-900/90 to-slate-900 border border-rose-400/30 shadow-md shadow-rose-950/30 ${sizeClasses[size]} ${className}`}>
          <HeartPulse className={`${iconSizes[size]} text-rose-300`} />
        </div>
      );
    case 'Agriculture':
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-emerald-900/90 to-slate-900 border border-emerald-400/30 shadow-md shadow-emerald-950/30 ${sizeClasses[size]} ${className}`}>
          <Sprout className={`${iconSizes[size]} text-emerald-300`} />
        </div>
      );
    case 'Housing':
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/90 to-slate-900 border border-cyan-400/30 shadow-md shadow-cyan-950/30 ${sizeClasses[size]} ${className}`}>
          <Home className={`${iconSizes[size]} text-cyan-300`} />
        </div>
      );
    case 'Employment':
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-900/90 to-slate-900 border border-purple-400/30 shadow-md shadow-purple-950/30 ${sizeClasses[size]} ${className}`}>
          <Briefcase className={`${iconSizes[size]} text-purple-300`} />
        </div>
      );
    case 'Senior Citizens':
    case 'Social Welfare':
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-amber-900/90 to-slate-900 border border-amber-400/30 shadow-md shadow-amber-950/30 ${sizeClasses[size]} ${className}`}>
          <Users className={`${iconSizes[size]} text-amber-300`} />
        </div>
      );
    case 'Financial Assistance':
    default:
      return (
        <div className={`relative flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/90 to-slate-900 border border-indigo-400/30 shadow-md shadow-indigo-950/30 ${sizeClasses[size]} ${className}`}>
          <Coins className={`${iconSizes[size]} text-indigo-300`} />
        </div>
      );
  }
};
