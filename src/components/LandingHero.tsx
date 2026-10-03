"use client";

import React from 'react';
import { Language, UserProfile } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  GraduationCap, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  BadgeCheck,
  TrendingUp,
  Landmark,
  Languages
} from 'lucide-react';

interface LandingHeroProps {
  currentLanguage: Language;
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  currentLanguage,
  onNavigate,
  userProfile
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const highlights = [
    {
      icon: BadgeCheck,
      title: currentLanguage === 'te' ? "నిర్ణయాత్మక అర్హత ఇంజిన్" : currentLanguage === 'hi' ? "सटीक नियमबद्ध पात्रता" : "Deterministic Eligibility Engine",
      desc: currentLanguage === 'te' ? "AI ఊహించదు. అధికారిక నిబంధనల ఆధారంగానే స్పష్టమైన అర్హత లెక్కింపు." : currentLanguage === 'hi' ? "बिना किसी भ्रम के, वास्तविक सरकारी गजट नियमों के अनुसार पात्रता मिलान।" : "Zero hallucinations. Evaluated strictly against official gazetted criteria.",
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Languages,
      title: currentLanguage === 'te' ? "నిజమైన బహుభాషా మద్దతు" : currentLanguage === 'hi' ? "सच्ची बहुभाषी तकनीक" : "Multilingual Grounded RAG",
      desc: currentLanguage === 'te' ? "తెలుగు, హిందీ మరియు ఇంగ్లీష్ భాషలలో అధికారిక సమాధానాలు & ఆడియో." : currentLanguage === 'hi' ? "हिंदी, तेलुगु और अंग्रेजी में सत्यापित सरकारी स्रोत व वाइस सपोर्ट।" : "Full support in Telugu, Hindi, and English with source citations & voice.",
      color: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10"
    },
    {
      icon: AlertTriangle,
      title: currentLanguage === 'te' ? "సైబర్ సురక్ష స్కామ్ చెకర్" : currentLanguage === 'hi' ? "साइबर सुरक्षा स्कैम चेकर" : "Cyber Suraksha Scam Checker",
      desc: currentLanguage === 'te' ? "నకిలీ లోన్ మెసేజ్‌లు, ఫేక్ స్కాలర్‌షిప్ లింకులు మరియు OTP మోసాలను గుర్తించండి." : currentLanguage === 'hi' ? "फर्जी योजनाओं, संदेहास्पद लिंक और ओटीपी मांगने वाले धोखाधड़ी संदेशों की पहचान।" : "Heuristic and domain analysis to spot fraud, fake links, and fee scams.",
      color: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10"
    },
    {
      icon: FileText,
      title: currentLanguage === 'te' ? "పత్రాల చెక్‌లిస్ట్ & దరఖాస్తు గైడ్" : currentLanguage === 'hi' ? "दस्तावेज चेकलिस्ट व आवेदन गाइड" : "Checklists & Step-by-Step Guides",
      desc: currentLanguage === 'te' ? "ఏ పత్రాలు అవసరమో తెలుసుకోండి, దళారులు లేకుండా అధికారికంగా దరఖాస్తు చేయండి." : currentLanguage === 'hi' ? "आवश्यक दस्तावेजों की पूर्व तैयारी एवं सीधे आधिकारिक पोर्टल पर आवेदन के चरण।" : "Prepare required proofs and follow official portal steps without middlemen.",
      color: "text-indigo-400",
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10"
    }
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-16">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md text-blue-400 text-xs font-semibold tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.heroBadge}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" />
              <span>{t.btnFindBenefits}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('scholarships')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base border border-white/10 hover:border-blue-400/30 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>{t.btnExploreScholarships}</span>
            </button>

            <button
              onClick={() => onNavigate('scam')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-sm border border-amber-500/30 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{t.btnCheckScam}</span>
            </button>
          </div>

          {/* Active Citizen Greeting Card */}
          <div className="mt-8 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
            <span className="text-slate-400">
              {currentLanguage === 'te' ? "ప్రస్తుత ప్రొఫైల్:" : currentLanguage === 'hi' ? "सक्रिय नागरिक:" : "Active Profile:"}
            </span>
            <span className="font-semibold text-white">{userProfile.name}</span>
            <span className="text-slate-500">•</span>
            <span className="text-blue-400 font-medium">{userProfile.state}</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium">{userProfile.employmentStatus}</span>
          </div>
        </div>

        {/* Live Trust Metrics */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-white">100+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{t.statSchemes}</div>
          </div>
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">₹60K+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{t.statScholarships}</div>
          </div>
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{t.statAccuracy}</div>
          </div>
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">24/7</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{t.statScamsChecked}</div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div 
                key={i} 
                className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${h.bg} ${h.border} border mb-4`}>
                    <Icon className={`w-5 h-5 ${h.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{h.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
