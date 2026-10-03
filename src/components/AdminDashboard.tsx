"use client";

import React, { useState } from 'react';
import { Scheme, AuditLog, Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Save, 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  ExternalLink,
  Layers,
  FileCheck
} from 'lucide-react';

interface AdminDashboardProps {
  schemes: Scheme[];
  auditLogs: AuditLog[];
  onUpdateSchemes: (schemes: Scheme[]) => void;
  onAddAuditLog: (log: AuditLog) => void;
  currentLanguage: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  schemes,
  auditLogs,
  onUpdateSchemes,
  onAddAuditLog,
  currentLanguage
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'audit'>('manage');
  const [selectedScheme, setSelectedScheme] = useState<Scheme>(schemes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Scheme>({ ...schemes[0] });
  const [changeNotesInput, setChangeNotesInput] = useState('');
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  const handleSelectScheme = (s: Scheme) => {
    setSelectedScheme(s);
    setEditForm({ ...s });
    setIsEditing(false);
  };

  const handleSaveScheme = (e: React.FormEvent) => {
    e.preventDefault();

    const todayStr = new Date().toISOString().split('T')[0];
    const updatedScheme: Scheme = {
      ...editForm,
      officialSource: {
        ...editForm.officialSource,
        verificationDate: todayStr,
        changeNotes: changeNotesInput || "Updated published guidelines and verified rules."
      }
    };

    // Update in state
    const newSchemes = schemes.map(s => s.id === updatedScheme.id ? updatedScheme : s);
    onUpdateSchemes(newSchemes);
    setSelectedScheme(updatedScheme);
    setIsEditing(false);

    // Create Audit Log
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      adminId: "adm_officer_current",
      adminName: "Authorized Maintenance Officer #01",
      action: "SCHEME_UPDATED",
      recordType: updatedScheme.isScholarship ? "Scholarship" : "Scheme",
      recordId: updatedScheme.id,
      recordName: updatedScheme.name.en,
      timestamp: new Date().toLocaleString(),
      changes: changeNotesInput || "Updated eligibility threshold and verified source records."
    };
    onAddAuditLog(newLog);

    setShowSuccessBadge(true);
    setTimeout(() => setShowSuccessBadge(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {t.adminTitle}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  OFFICIAL ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.adminSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'manage'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Manage Records</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'audit'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Audit Trail ({auditLogs.length})</span>
            </button>
          </div>
        </div>
      </div>

      {showSuccessBadge && (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Changes successfully saved and synchronized across the citizen portal in real-time!</span>
        </div>
      )}

      {/* TAB 1: SCHEME & RULE MANAGEMENT */}
      {activeTab === 'manage' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Scheme List */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2 h-[680px] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider px-2 mb-3">
              Registered Schemes ({schemes.length})
            </h3>
            {schemes.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectScheme(s)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedScheme.id === s.id
                    ? 'bg-purple-600/20 border-purple-500/50 shadow-md'
                    : 'bg-slate-900/50 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-mono">{s.id}</span>
                  <span className="text-emerald-400 font-semibold">{s.status}</span>
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{s.name.en}</div>
                <div className="text-[11px] text-slate-400 mt-1 truncate">{s.department}</div>
              </button>
            ))}
          </div>

          {/* Right Column: Scheme Editor */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                  Editing Record: {selectedScheme.id}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  {selectedScheme.name.en}
                </h2>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{t.editScheme}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* View or Edit Form */}
            <form onSubmit={handleSaveScheme} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">English Title</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={editForm.name.en}
                    onChange={(e) => setEditForm({ ...editForm, name: { ...editForm.name, en: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-70"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Telugu Title</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={editForm.name.te}
                    onChange={(e) => setEditForm({ ...editForm, name: { ...editForm.name, te: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Category</label>
                  <select
                    disabled={!isEditing}
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-70"
                  >
                    <option value="Scholarships">Scholarships</option>
                    <option value="Education">Education</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Housing">Housing</option>
                    <option value="Senior Citizens">Senior Citizens</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Jurisdiction</label>
                  <select
                    disabled={!isEditing}
                    value={editForm.coverage}
                    onChange={(e) => setEditForm({ ...editForm, coverage: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-70"
                  >
                    <option value="Central">Central</option>
                    <option value="State">State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Status</label>
                  <select
                    disabled={!isEditing}
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-70"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Official Verified Source URL</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={editForm.officialSource.url}
                  onChange={(e) => setEditForm({ 
                    ...editForm, 
                    officialSource: { ...editForm.officialSource, url: e.target.value } 
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-emerald-400 font-mono text-xs disabled:opacity-70"
                />
              </div>

              {/* Published Rules Overview */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Deterministic Rules Evaluated for this Scheme ({editForm.rules.length}):</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {editForm.rules.map((rule) => (
                    <div key={rule.id} className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-between">
                      <span className="text-slate-300 font-mono text-[11px]">{rule.field} {rule.operator} {JSON.stringify(rule.value)}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${rule.isMandatory ? 'text-rose-400 bg-rose-500/10' : 'text-blue-400 bg-blue-500/10'}`}>
                        {rule.isMandatory ? 'Mandatory' : 'Conditional'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                  <label className="block text-xs font-bold text-purple-300">
                    Mandatory Audit Change Notes (Reason for modification):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Revised income ceiling to ₹2,50,000 as per latest gazette notification..."
                    value={changeNotesInput}
                    onChange={(e) => setChangeNotesInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/40 text-white text-xs focus:outline-none"
                  />

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t.saveChanges}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>

          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">{t.auditLogs}</h3>
              <p className="text-xs text-slate-400">
                Immutable record of administrative verifications, rule changes, and source validations.
              </p>
            </div>
            <span className="font-mono text-xs text-purple-400 font-semibold">
              {auditLogs.length} Total Events Logged
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {log.action}
                    </span>
                    <span className="font-semibold text-white">{log.recordName}</span>
                    <span className="text-slate-500 font-mono">({log.recordId})</span>
                  </div>
                  <span className="text-slate-400 font-mono">{log.timestamp}</span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  <span className="text-slate-400">Change Details: </span>
                  {log.changes}
                </p>

                <div className="text-[11px] text-slate-500">
                  Reviewed by: <span className="text-slate-400 font-medium">{log.adminName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
