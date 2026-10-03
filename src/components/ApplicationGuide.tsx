"use client";

import React, { useState } from 'react';
import { ApplicationGuideStep, Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  ShieldCheck, 
  Lightbulb, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface ApplicationGuideProps {
  steps: ApplicationGuideStep[];
  schemeName: string;
  officialUrl: string;
  currentLanguage: Language;
}

export const ApplicationGuide: React.FC<ApplicationGuideProps> = ({
  steps,
  schemeName,
  officialUrl,
  currentLanguage
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const t = TRANSLATIONS[currentLanguage];

  const toggleStep = (stepNum: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const totalSteps = steps.length;
  const doneCount = steps.filter(s => completedSteps[s.stepNumber]).length;
  const progressPercent = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Anti-Middleman Advisory */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200 leading-relaxed">
          <span className="font-bold text-amber-300">Official Portal Warning: </span>
          {currentLanguage === 'te' 
            ? "ప్రభుత్వ పథకాలకు ఎటువంటి దళారులు లేదా ఏజెంట్లను నమ్మవద్దు. అధికారిక ప్రభుత్వ పోర్టల్ ద్వారా మాత్రమే ఉచితంగా లేదా నిర్ణీత రుసుముతో నేరుగా దరఖాస్తు చేసుకోండి." 
            : currentLanguage === 'hi' 
            ? "सरकारी योजनाओं के लिए किसी भी बिचौलिए या अनधिकृत दलाल को पैसे न दें। केवल नीचे दिए गए आधिकारिक पोर्टल से ही आवेदन करें।" 
            : "Never pay unauthorized agents or intermediaries for government schemes. Always apply directly via the verified official portal."}
        </div>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-300">
          {t.guideTitle}
        </span>
        <span className="text-blue-400 font-mono">
          {doneCount} / {totalSteps} {t.stepCompleted} ({progressPercent}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Cards */}
      <div className="space-y-4">
        {steps.map((step) => {
          const isDone = !!completedSteps[step.stepNumber];
          const title = step.title[currentLanguage] || step.title.en;
          const instruction = step.instruction[currentLanguage] || step.instruction.en;
          const tip = step.tip ? (step.tip[currentLanguage] || step.tip.en) : null;

          return (
            <div
              key={step.stepNumber}
              className={`p-4 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3.5">
                  <button
                    onClick={() => toggleStep(step.stepNumber)}
                    className="mt-0.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-600/20 text-blue-400 border border-blue-500/30">
                        {t.step} {step.stepNumber}
                      </span>
                      <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        {title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {instruction}
                    </p>

                    {tip && (
                      <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Tip: {tip}</span>
                      </div>
                    )}

                    {step.officialPortalUrl && (
                      <div className="mt-3">
                        <a
                          href={step.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
                        >
                          <span>Open {step.officialPortalUrl.replace('https://', '')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleStep(step.stepNumber)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isDone ? t.stepCompleted : t.markStepComplete}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Official Link Footer */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-white flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{t.verifiedSource}: {officialUrl}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Always verify that the browser URL bar displays <span className="text-emerald-400 font-mono">.gov.in</span> or <span className="text-emerald-400 font-mono">.nic.in</span>.
          </p>
        </div>

        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all flex-shrink-0"
        >
          <span>{t.applyOfficial}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
