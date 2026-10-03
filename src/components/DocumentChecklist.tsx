"use client";

import React, { useState } from 'react';
import { DocumentItem, Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { 
  CheckCircle2, 
  Circle, 
  FileCheck, 
  Scan, 
  Sparkles, 
  AlertCircle, 
  ShieldAlert, 
  ShieldCheck,
  Check,
  FileText
} from 'lucide-react';

interface DocumentChecklistProps {
  documents: DocumentItem[];
  schemeName: string;
  currentLanguage: Language;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  documents,
  schemeName,
  currentLanguage
}) => {
  const [preparedDocs, setPreparedDocs] = useState<Record<string, boolean>>({});
  const [ocrVerifiedDocs, setOcrVerifiedDocs] = useState<Record<string, boolean>>({});
  const [scanningDocId, setScanningDocId] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLanguage];

  const togglePrepared = (id: string) => {
    setPreparedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSimulateOCR = (doc: DocumentItem) => {
    setScanningDocId(doc.id);
    setTimeout(() => {
      setOcrVerifiedDocs(prev => ({ ...prev, [doc.id]: true }));
      setPreparedDocs(prev => ({ ...prev, [doc.id]: true }));
      setScanningDocId(null);
    }, 1200);
  };

  const requiredList = documents.filter(d => d.type === 'Required');
  const conditionalList = documents.filter(d => d.type === 'Conditional');
  const optionalList = documents.filter(d => d.type === 'Optional');

  const totalCount = documents.length;
  const readyCount = documents.filter(d => preparedDocs[d.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  const renderDocCard = (doc: DocumentItem) => {
    const isReady = !!preparedDocs[doc.id];
    const isOcrDone = !!ocrVerifiedDocs[doc.id];
    const isScanning = scanningDocId === doc.id;
    const nameText = doc.name[currentLanguage] || doc.name.en;
    const descText = doc.description[currentLanguage] || doc.description.en;
    const condText = doc.conditionText ? (doc.conditionText[currentLanguage] || doc.conditionText.en) : null;

    return (
      <div 
        key={doc.id}
        className={`p-4 rounded-xl border transition-all ${
          isReady
            ? 'bg-blue-950/20 border-blue-500/40' 
            : 'bg-slate-900/50 border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => togglePrepared(doc.id)}
              className="mt-0.5 text-slate-400 hover:text-white transition-colors"
            >
              {isReady ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500" />
              )}
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${isReady ? 'text-white' : 'text-slate-200'}`}>
                  {nameText}
                </span>
                {doc.type === 'Required' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {t.docRequired}
                  </span>
                )}
                {doc.type === 'Conditional' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {t.docConditional}
                  </span>
                )}
                {isOcrDone && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Format Verified</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {descText}
              </p>

              {condText && (
                <div className="mt-1.5 inline-flex items-center space-x-1 text-[11px] text-amber-300/90 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{condText}</span>
                </div>
              )}

              <div className="mt-2 text-[11px] text-slate-500 flex items-center space-x-1">
                <span>Issuing Authority:</span>
                <span className="font-medium text-slate-400">{doc.issuingAuthority}</span>
              </div>
            </div>
          </div>

          {/* Simulate OCR Verification Button */}
          <div className="flex-shrink-0">
            {isOcrDone ? (
              <span className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">OCR Validated</span>
              </span>
            ) : (
              <button
                disabled={isScanning}
                onClick={() => handleSimulateOCR(doc)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-medium transition-all"
                title="Simulate client-side zero-storage format check"
              >
                {isScanning ? (
                  <>
                    <Scan className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <Scan className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Simulate OCR Check</span>
                    <span className="sm:hidden">Check</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Privacy Notice Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-xs text-slate-300">
            <span className="font-semibold text-white">Privacy Guarantee: </span>
            {currentLanguage === 'te' 
              ? "మీ వ్యక్తిగత ధ్రువీకరణ పత్రాలు ఏవీ మా సర్వర్‌లో నిల్వ చేయబడవు." 
              : currentLanguage === 'hi' 
              ? "आपकी कोई भी निजी संवेदनशील फाइलें हमारे सर्वर पर सहेजी नहीं जाती हैं।" 
              : "Zero sensitive PII or document files are stored on JanSahay servers."}
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <span className="text-slate-400">Readiness:</span>
          <span className="text-emerald-400 font-mono">{readyCount}/{totalCount} ({progressPercent}%)</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mandatory Documents */}
      {requiredList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{t.docRequired} ({requiredList.length})</span>
          </h3>
          <div className="space-y-2.5">
            {requiredList.map(renderDocCard)}
          </div>
        </div>
      )}

      {/* Conditional Documents */}
      {conditionalList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{t.docConditional} ({conditionalList.length})</span>
          </h3>
          <div className="space-y-2.5">
            {conditionalList.map(renderDocCard)}
          </div>
        </div>
      )}

      {/* Optional Documents */}
      {optionalList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>{t.docOptional} ({optionalList.length})</span>
          </h3>
          <div className="space-y-2.5">
            {optionalList.map(renderDocCard)}
          </div>
        </div>
      )}

    </div>
  );
};
