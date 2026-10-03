"use client";

import React, { useState } from 'react';
import { Language, ScamAnalysisResult } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { analyzeScamMessage, SCAM_DEMO_SAMPLES } from '@/lib/scamChecker';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  HelpCircle, 
  Lock, 
  PhoneCall, 
  FileWarning,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ScamCheckerProps {
  currentLanguage: Language;
}

export const ScamChecker: React.FC<ScamCheckerProps> = ({ currentLanguage }) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  const handleAnalyze = (textToTest?: string) => {
    const message = textToTest || inputText;
    if (!message.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeScamMessage(message, currentLanguage);
      setResult(res);
      setIsAnalyzing(false);
    }, 600);
  };

  const loadSample = (sampleText: string) => {
    setInputText(sampleText);
    handleAnalyze(sampleText);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Cyber Suraksha Scheme Defense</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t.scamTitle}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {t.scamSubtitle}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs text-amber-300 max-w-xs space-y-1">
            <div className="font-bold flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>National Cyber Helpline: 1930</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Official government departments never solicit OTPs or processing fees via SMS or WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Demo Sample Buttons for Judges */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.trySampleMessage}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SCAM_DEMO_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => loadSample(sample.message)}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-amber-500/40 text-left transition-all group"
            >
              <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                {sample.title[currentLanguage] || sample.title.en}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                {sample.message}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Console */}
      <div className="p-6 rounded-2xl bg-[#0F2444] border border-white/10 space-y-4 shadow-xl">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {currentLanguage === 'te' ? "విశ్లేషించాల్సిన సందేశం లేదా లింక్:" : currentLanguage === 'hi' ? "सत्यापित करने हेतु संदेश या लिंक:" : "Input Suspicious Message or URL:"}
        </label>

        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.scamInputPlaceholder}
          className="w-full p-4 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-sans"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Client-side secure analysis. Never enters public training corpora.</span>
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-orange-500/25 border border-amber-400/30 transition-all"
          >
            {isAnalyzing ? (
              <>
                <Search className="w-4 h-4 animate-spin" />
                <span>Analyzing Signals...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>{t.btnAnalyzeScam}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Display Card */}
      {result && (
        <div className={`p-6 rounded-2xl border transition-all ${
          result.safetyLevel === 'SUSPICIOUS'
            ? 'bg-rose-950/20 border-rose-500/40 shadow-rose-950/50 shadow-2xl'
            : result.safetyLevel === 'OFFICIAL_MATCH'
            ? 'bg-emerald-950/20 border-emerald-500/40 shadow-emerald-950/50 shadow-2xl'
            : 'bg-amber-950/20 border-amber-500/40 shadow-amber-950/50 shadow-2xl'
        }`}>
          
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              {result.safetyLevel === 'SUSPICIOUS' && (
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-rose-400" />
                </div>
              )}
              {result.safetyLevel === 'OFFICIAL_MATCH' && (
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
              )}
              {result.safetyLevel === 'UNVERIFIABLE' && (
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {result.safetyLevel === 'SUSPICIOUS' ? t.suspicious : result.safetyLevel === 'OFFICIAL_MATCH' ? t.officialMatch : t.unverifiable}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {result.headline}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-medium">Risk Score</div>
              <div className={`text-2xl font-black font-mono ${
                result.riskScore > 40 ? 'text-rose-400' : result.riskScore > 10 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {result.riskScore} / 100
              </div>
            </div>
          </div>

          {/* Detailed Summary */}
          <p className="text-xs sm:text-sm text-slate-200 mt-4 leading-relaxed">
            {result.summary}
          </p>

          {/* Identified Red Flags */}
          {result.identifiedRedFlags.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase text-rose-400 flex items-center space-x-1.5">
                <FileWarning className="w-4 h-4" />
                <span>Detected Security Red Flags ({result.identifiedRedFlags.length})</span>
              </h4>
              <div className="space-y-1.5">
                {result.identifiedRedFlags.map((flag, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-200">
                    <span className="text-rose-400 font-bold">⚠️</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Safety Signals */}
          {result.verifiedSafetySignals.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Trust Signals ({result.verifiedSafetySignals.length})</span>
              </h4>
              <div className="space-y-1.5">
                {result.verifiedSafetySignals.map((sig, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{sig}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Action & Official Portal Link */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white">Recommended Action:</div>
              <p className="text-xs text-slate-300 mt-0.5">{result.recommendedAction}</p>
            </div>

            {result.matchedOfficialRecord && (
              <a
                href={result.matchedOfficialRecord.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md whitespace-nowrap"
              >
                <span>Verify on Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
