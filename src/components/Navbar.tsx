"use client";

import React, { useState } from 'react';
import { Language, UserProfile } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { DEMO_PERSONAS } from '@/data/mockDatabase';
import { 
  ShieldCheck, 
  Globe, 
  User, 
  Sparkles, 
  AlertTriangle, 
  Compass, 
  GraduationCap, 
  BookmarkCheck, 
  Lock,
  Menu,
  X,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  onOpenProfileModal: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  currentProfile,
  onProfileChange,
  onOpenProfileModal,
  activeTab,
  onTabChange,
  isAdmin,
  onToggleAdmin
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  const handleSelectPersona = (key: string) => {
    const selected = DEMO_PERSONAS[key];
    if (selected) {
      onProfileChange({
        ...selected,
        language: currentLanguage
      });
      setIsPersonaMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'discover', label: t.navDiscover, icon: Compass },
    { id: 'scholarships', label: t.navScholarships, icon: GraduationCap },
    { id: 'dashboard', label: t.navDashboard, icon: User },
    { id: 'assistant', label: t.navAssistant, icon: Sparkles },
    { id: 'scam', label: t.navScamCheck, icon: AlertTriangle },
    { id: 'applications', label: t.navApplications, icon: BookmarkCheck },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060F1E]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => onTabChange('home')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/25 border border-blue-400/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#060F1E]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  GOV.AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language, Persona & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-900/90 border border-white/10 rounded-lg p-1">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 hidden sm:block" />
              {(['en', 'te', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                    currentLanguage === lang
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'te' ? 'తెలుగు' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Demo Persona Switcher for Hackathon Judges */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-all"
                title="Switch demo profile for judge evaluation"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="truncate max-w-[110px]">{currentProfile.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {isPersonaMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0F2444] border border-slate-700 shadow-2xl p-2 z-50">
                  <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {t.demoPersona}
                  </div>
                  <div className="mt-1 space-y-1">
                    <button
                      onClick={() => handleSelectPersona('student')}
                      className="w-full flex items-start space-x-2.5 p-2 rounded-lg text-left text-xs hover:bg-blue-600/20 text-slate-200 transition-colors"
                    >
                      <span className="text-base">🎓</span>
                      <div>
                        <div className="font-semibold text-white">Ananya Sharma (Student)</div>
                        <div className="text-[11px] text-slate-400">B.Tech, AP, OBC, Income &lt; 2.5L</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSelectPersona('farmer')}
                      className="w-full flex items-start space-x-2.5 p-2 rounded-lg text-left text-xs hover:bg-blue-600/20 text-slate-200 transition-colors"
                    >
                      <span className="text-base">🌾</span>
                      <div>
                        <div className="font-semibold text-white">Ramesh Patel (Farmer)</div>
                        <div className="text-[11px] text-slate-400">Small Farmer, MP, 3.5 acres</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSelectPersona('senior')}
                      className="w-full flex items-start space-x-2.5 p-2 rounded-lg text-left text-xs hover:bg-blue-600/20 text-slate-200 transition-colors"
                    >
                      <span className="text-base">👵</span>
                      <div>
                        <div className="font-semibold text-white">Sundaramma (Senior)</div>
                        <div className="text-[11px] text-slate-400">Age 67, AP, BPL Pension</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSelectPersona('citizen')}
                      className="w-full flex items-start space-x-2.5 p-2 rounded-lg text-left text-xs hover:bg-blue-600/20 text-slate-200 transition-colors"
                    >
                      <span className="text-base">💼</span>
                      <div>
                        <div className="font-semibold text-white">Vikram Verma (Self-Employed)</div>
                        <div className="text-[11px] text-slate-400">Age 29, Telangana, MSME / PMEGP</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-600/30 transition-all"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">{t.profile}</span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onToggleAdmin}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                isAdmin 
                  ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
              title="Toggle Government Admin Verification Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-white/10 px-4 pt-2 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-white/10">
            <div className="text-xs text-slate-400 font-semibold mb-2">{t.demoPersona}:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { handleSelectPersona('student'); setIsMobileMenuOpen(false); }}
                className="p-2 rounded bg-slate-800 text-xs text-left text-slate-200"
              >
                🎓 Student
              </button>
              <button
                onClick={() => { handleSelectPersona('farmer'); setIsMobileMenuOpen(false); }}
                className="p-2 rounded bg-slate-800 text-xs text-left text-slate-200"
              >
                🌾 Farmer
              </button>
              <button
                onClick={() => { handleSelectPersona('senior'); setIsMobileMenuOpen(false); }}
                className="p-2 rounded bg-slate-800 text-xs text-left text-slate-200"
              >
                👵 Senior
              </button>
              <button
                onClick={() => { handleSelectPersona('citizen'); setIsMobileMenuOpen(false); }}
                className="p-2 rounded bg-slate-800 text-xs text-left text-slate-200"
              >
                💼 Citizen
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
