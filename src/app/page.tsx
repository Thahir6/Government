"use client";

import React, { useState, useEffect } from 'react';
import { Language, UserProfile, Scheme, SavedApplication, AuditLog } from '@/types';
import { DEMO_PERSONAS, INITIAL_SCHEMES, INITIAL_SAVED_APPLICATIONS, INITIAL_AUDIT_LOGS } from '@/data/mockDatabase';
import { TRANSLATIONS } from '@/data/translations';
import { Navbar } from '@/components/Navbar';
import { LandingHero } from '@/components/LandingHero';
import { DashboardView } from '@/components/DashboardView';
import { SchemeDiscovery } from '@/components/SchemeDiscovery';
import { ScholarshipFinder } from '@/components/ScholarshipFinder';
import { JanSahayAIChat } from '@/components/JanSahayAIChat';
import { ScamChecker } from '@/components/ScamChecker';
import { ApplicationTracker } from '@/components/ApplicationTracker';
import { AdminDashboard } from '@/components/AdminDashboard';
import { UserProfileModal } from '@/components/UserProfileModal';
import { SchemeDetailModal } from '@/components/SchemeDetailModal';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Home, 
  Compass, 
  GraduationCap, 
  BookmarkCheck, 
  User,
  Heart
} from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(DEMO_PERSONAS.student);
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [savedApplications, setSavedApplications] = useState<SavedApplication[]>(INITIAL_SAVED_APPLICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  // Save to application tracker helper
  const handleSaveToTracker = (scheme: Scheme) => {
    const exists = savedApplications.some(a => a.schemeId === scheme.id);
    if (!exists) {
      const newApp: SavedApplication = {
        id: `app_${Date.now()}`,
        schemeId: scheme.id,
        schemeName: scheme.name.en,
        category: scheme.category,
        referenceNumber: `ACK-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'Saved',
        appliedDate: new Date().toISOString().split('T')[0],
        deadline: scheme.applicationDeadline || '2026-11-30',
        notes: "Saved from JanSahay scheme details for documentation prep.",
        reminderActive: true,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setSavedApplications(prev => [newApp, ...prev]);
    }
  };

  const handleAddAuditLog = (newLog: AuditLog) => {
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060F1E] text-slate-100 selection:bg-blue-600 selection:text-white pb-16 lg:pb-0 relative">
      
      {/* Subtle Government Technology Ambient Background */}
      <div className="gov-ambient-bg" aria-hidden="true">
        <div className="gov-ambient-grid" />
        <div className="gov-ambient-glow-1" />
        <div className="gov-ambient-glow-2" />
        <div className="gov-ambient-glow-3" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Main Navigation Bar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentProfile={currentProfile}
        onProfileChange={setCurrentProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        activeTab={isAdmin ? 'admin' : activeTab}
        onTabChange={(tab) => {
          setIsAdmin(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdmin ? (
          <AdminDashboard
            schemes={schemes}
            auditLogs={auditLogs}
            onUpdateSchemes={setSchemes}
            onAddAuditLog={handleAddAuditLog}
            currentLanguage={currentLanguage}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <>
                <LandingHero
                  currentLanguage={currentLanguage}
                  onNavigate={setActiveTab}
                  userProfile={currentProfile}
                />
                <DashboardView
                  userProfile={currentProfile}
                  schemes={schemes}
                  savedApplications={savedApplications}
                  currentLanguage={currentLanguage}
                  onSelectScheme={setSelectedScheme}
                  onNavigate={setActiveTab}
                  onOpenProfile={() => setIsProfileModalOpen(true)}
                />
              </>
            )}

            {activeTab === 'dashboard' && (
              <DashboardView
                userProfile={currentProfile}
                schemes={schemes}
                savedApplications={savedApplications}
                currentLanguage={currentLanguage}
                onSelectScheme={setSelectedScheme}
                onNavigate={setActiveTab}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            )}

            {activeTab === 'discover' && (
              <SchemeDiscovery
                schemes={schemes}
                userProfile={currentProfile}
                currentLanguage={currentLanguage}
                onSelectScheme={setSelectedScheme}
              />
            )}

            {activeTab === 'scholarships' && (
              <ScholarshipFinder
                schemes={schemes}
                userProfile={currentProfile}
                currentLanguage={currentLanguage}
                onSelectScheme={setSelectedScheme}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            )}

            {activeTab === 'assistant' && (
              <JanSahayAIChat
                userProfile={currentProfile}
                schemes={schemes}
                currentLanguage={currentLanguage}
                onSelectScheme={setSelectedScheme}
              />
            )}

            {activeTab === 'scam' && (
              <ScamChecker
                currentLanguage={currentLanguage}
              />
            )}

            {activeTab === 'applications' && (
              <ApplicationTracker
                applications={savedApplications}
                onUpdateApplications={setSavedApplications}
                currentLanguage={currentLanguage}
                schemes={schemes}
              />
            )}
          </>
        )}
      </main>

      {/* Global Modals */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={currentProfile}
        onSave={setCurrentProfile}
        currentLanguage={currentLanguage}
      />

      <SchemeDetailModal
        isOpen={!!selectedScheme}
        onClose={() => setSelectedScheme(null)}
        scheme={selectedScheme}
        userProfile={currentProfile}
        currentLanguage={currentLanguage}
        onSaveToTracker={handleSaveToTracker}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around text-[10px]">
        <button
          onClick={() => { setIsAdmin(false); setActiveTab('home'); }}
          className={`flex flex-col items-center p-1 ${activeTab === 'home' && !isAdmin ? 'text-blue-400 font-bold' : 'text-slate-400'}`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>{t.navHome}</span>
        </button>

        <button
          onClick={() => { setIsAdmin(false); setActiveTab('discover'); }}
          className={`flex flex-col items-center p-1 ${activeTab === 'discover' && !isAdmin ? 'text-blue-400 font-bold' : 'text-slate-400'}`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span>{t.navDiscover}</span>
        </button>

        <button
          onClick={() => { setIsAdmin(false); setActiveTab('scholarships'); }}
          className={`flex flex-col items-center p-1 ${activeTab === 'scholarships' && !isAdmin ? 'text-blue-400 font-bold' : 'text-slate-400'}`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span>{t.navScholarships}</span>
        </button>

        <button
          onClick={() => { setIsAdmin(false); setActiveTab('assistant'); }}
          className={`flex flex-col items-center p-1 ${activeTab === 'assistant' && !isAdmin ? 'text-blue-400 font-bold' : 'text-slate-400'}`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>AI Chat</span>
        </button>

        <button
          onClick={() => { setIsAdmin(false); setActiveTab('scam'); }}
          className={`flex flex-col items-center p-1 ${activeTab === 'scam' && !isAdmin ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          <AlertTriangle className="w-4 h-4 mb-0.5" />
          <span>Scam Check</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-[#060F1E] text-slate-400 py-8 px-4 text-center text-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center space-x-2 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>JANSAHAY AI — Government Scheme & Scholarship Assistant</span>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {currentLanguage === 'te' 
              ? "ఈ పోర్టల్ లోని సమాచారం మార్గదర్శకం కొరకు మాత్రమే. తుది అర్హత, గడువు తేదీలు మరియు నిధుల విడుదల సంబంధిత ప్రభుత్వ శాఖల అధికారిక నిబంధనలకు లోబడి ఉంటాయి." 
              : currentLanguage === 'hi' 
              ? "यह पोर्टल केवल मार्गदर्शन हेतु है। अंतिम पात्रता, समय-सीमा और आवेदन की स्वीकृति संबंधित सरकारी प्राधिकारियों द्वारा ही निर्धारित की जाती है।" 
              : "Information provided is for guidance and assistance. Final eligibility, deadlines, and application decisions are determined exclusively by the respective official government authorities."}
          </p>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian Citizens & Students • Digital Public Infrastructure Ready</span>
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
}
