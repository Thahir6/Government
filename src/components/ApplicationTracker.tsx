"use client";

import React, { useState } from 'react';
import { SavedApplication, ApplicationStage, Language, Scheme } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { SchemeVisualBadge } from '@/components/SchemeVisualBadge';
import { 
  BookmarkCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Bell, 
  BellOff, 
  Trash2, 
  FileText, 
  Edit3, 
  Save,
  Building2,
  Check
} from 'lucide-react';

interface ApplicationTrackerProps {
  applications: SavedApplication[];
  onUpdateApplications: (apps: SavedApplication[]) => void;
  currentLanguage: Language;
  schemes: Scheme[];
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onUpdateApplications,
  currentLanguage,
  schemes
}) => {
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState(schemes[0]?.id || '');
  const [newRefNumber, setNewRefNumber] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const t = TRANSLATIONS[currentLanguage];

  const stages: ApplicationStage[] = [
    'Saved',
    'Preparing',
    'Applied',
    'Under Review',
    'Approved',
    'Rejected',
    'Completed'
  ];

  const handleStageChange = (id: string, stage: ApplicationStage) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: stage, updatedAt: new Date().toISOString().split('T')[0] } : app
    );
    onUpdateApplications(updated);
  };

  const handleToggleReminder = (id: string) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, reminderActive: !app.reminderActive } : app
    );
    onUpdateApplications(updated);
  };

  const handleDelete = (id: string) => {
    onUpdateApplications(applications.filter(app => app.id !== id));
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    const scheme = schemes.find(s => s.id === selectedSchemeId);
    if (!scheme) return;

    const newApp: SavedApplication = {
      id: `app_${Date.now()}`,
      schemeId: scheme.id,
      schemeName: scheme.name.en,
      category: scheme.category,
      referenceNumber: newRefNumber || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Preparing',
      appliedDate: new Date().toISOString().split('T')[0],
      deadline: scheme.applicationDeadline || '2026-11-30',
      notes: newNotes,
      reminderActive: true,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onUpdateApplications([...applications, newApp]);
    setIsAddingNew(false);
    setNewRefNumber('');
    setNewNotes('');
  };

  const getStageBadge = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Approved':
      case 'Completed':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Approved / Disbursed</span>;
      case 'Applied':
      case 'Under Review':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">Under Dept Verification</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">Action Required</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">In Preparation</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2.5">
            <BookmarkCheck className="w-7 h-7 text-blue-400" />
            <span>{t.trackerTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.trackerSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addApplication}</span>
        </button>
      </div>

      {/* Add New Application Modal / Drawer */}
      {isAddingNew && (
        <form onSubmit={handleAddNew} className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-4">
          <h3 className="text-sm font-bold text-white">Track an Application</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Scheme</label>
              <select
                value={selectedSchemeId}
                onChange={(e) => setSelectedSchemeId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              >
                {schemes.map(s => (
                  <option key={s.id} value={s.id}>{s.name.en}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Application / Reference Number</label>
              <input
                type="text"
                value={newRefNumber}
                placeholder="e.g. NSP-2026-AP-10293"
                onChange={(e) => setNewRefNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Notes & Follow-up Checklist</label>
            <textarea
              rows={2}
              value={newNotes}
              placeholder="e.g. Income certificate submitted at college nodal desk..."
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md"
            >
              Save Application
            </button>
          </div>
        </form>
      )}

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/10 space-y-3">
          <FileText className="w-10 h-10 mx-auto text-slate-500" />
          <h3 className="text-base font-bold text-white">No Applications Tracked Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Save a scheme from the Discovery page or click "Track New Application" to log official reference numbers and deadlines.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <SchemeVisualBadge schemeId={app.schemeId} category={app.category} size="md" />

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      {getStageBadge(app.status)}
                      <span className="text-[11px] font-semibold text-slate-400">
                        {app.category}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Ref: <span className="text-blue-400 font-semibold">{app.referenceNumber}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {app.schemeName}
                    </h3>
                  </div>
                </div>

                {/* Reminder & Delete Controls */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleToggleReminder(app.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      app.reminderActive
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-500 border-white/5 hover:text-white'
                    }`}
                    title={app.reminderActive ? "Deadline alerts active" : "Reminder paused"}
                  >
                    {app.reminderActive ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/30 text-slate-500 hover:text-rose-400 border border-white/5 transition-colors"
                    title="Remove from tracking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Progression Bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-2 overflow-x-auto">
                  {stages.map((stage) => {
                    const isCurrent = app.status === stage;
                    return (
                      <button
                        key={stage}
                        onClick={() => handleStageChange(app.id, stage)}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          isCurrent 
                            ? 'bg-blue-600 text-white font-bold shadow-sm' 
                            : 'hover:text-slate-200'
                        }`}
                      >
                        {stage}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes & Date details */}
              <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-slate-300">
                  <span className="text-slate-500">Notes: </span>
                  <span>{app.notes || 'No notes added.'}</span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                  <span>Applied: {app.appliedDate || 'Pending'}</span>
                  <span>•</span>
                  <span className="text-amber-400">Deadline: {app.deadline}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
