"use client";

import React, { useState } from 'react';
import { UserProfile, Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { 
  X, 
  User, 
  CheckCircle, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake, 
  Sparkles,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  currentLanguage: Language;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  currentLanguage
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const t = TRANSLATIONS[currentLanguage];

  if (!isOpen) return null;

  // Calculate profile completion percentage
  let score = 0;
  let total = 7;

  if (formData.name) score++;
  if (formData.age > 0) score++;
  if (formData.state) score++;
  if (formData.educationLevel) score++;
  if (formData.annualFamilyIncome > 0) score++;
  if (formData.category) score++;
  if (formData.employmentStatus) score++;

  if (formData.isStudent) {
    total += 2;
    if (formData.course) score++;
    if (formData.yearOfStudy) score++;
  }

  if (formData.isFarmer) {
    total += 1;
    if (formData.landHoldingAcres !== undefined) score++;
  }

  const completionPercentage = Math.round((score / total) * 100);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      isSeniorCitizen: formData.age >= 60
    });
    onClose();
  };

  const indianStates = [
    "Andhra Pradesh",
    "Telangana",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Bihar",
    "Rajasthan",
    "West Bengal",
    "Kerala",
    "Delhi",
    "Punjab",
    "Gujarat",
    "Odisha",
    "Assam"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#0B1B36] border border-blue-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0F2444]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
              <User className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {currentLanguage === 'te' ? "పౌరుడి ప్రొఫైల్ సవరణ" : currentLanguage === 'hi' ? "नागरिक प्रोफाइल संपादन" : "Citizen Profile & Eligibility Attributes"}
              </h2>
              <p className="text-xs text-slate-400">
                {currentLanguage === 'te' ? "కచ్చితమైన పథకాల ఎంపిక కోసం అవసరమైన సమాచారాన్ని నమోదు చేయండి" : currentLanguage === 'hi' ? "सटीक पात्रता जांच हेतु केवल आवश्यक जानकारी दर्ज करें" : "Enter essential parameters for deterministic scheme evaluation"}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Completion Bar */}
        <div className="px-6 py-2.5 bg-blue-950/40 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.profileCompletion}: {completionPercentage}%</span>
          </div>
          <div className="w-40 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "పూర్తి పేరు" : currentLanguage === 'hi' ? "पूरा नाम" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {currentLanguage === 'te' ? "వయస్సు" : currentLanguage === 'hi' ? "आयु" : "Age (Years)"}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {currentLanguage === 'te' ? "లింగం" : currentLanguage === 'hi' ? "लिंग" : "Gender"}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "రాష్ట్రం" : currentLanguage === 'hi' ? "राज्य" : "State"}
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                {indianStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "జిల్లా" : currentLanguage === 'hi' ? "जिला" : "District"}
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "సామాజిక వర్గం (Category)" : currentLanguage === 'hi' ? "सामाजिक वर्ग (Category)" : "Category / Caste"}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="Minority">Minority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "వార్షిక కుటుంబ ఆదాయం (రూపాయల్లో)" : currentLanguage === 'hi' ? "वार्षिक पारिवारिक आय (रु.)" : "Annual Family Income (INR)"}
              </label>
              <input
                type="number"
                step="10000"
                min={0}
                required
                value={formData.annualFamilyIncome}
                onChange={(e) => setFormData({ ...formData, annualFamilyIncome: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              <span className="text-[10px] text-slate-400">
                ₹{(formData.annualFamilyIncome || 0).toLocaleString('en-IN')} / year
              </span>
            </div>
          </div>

          {/* Education & Employment */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "విద్యార్హత" : currentLanguage === 'hi' ? "शिक्षा स्तर" : "Highest Education Level"}
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Below 10th">Below 10th</option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Vocational / Diploma">Vocational / Diploma / Polytechnic</option>
                <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.Com, BA, MBBS)</option>
                <option value="Postgraduate">Postgraduate (M.Tech, M.Sc, MBA, MCA)</option>
                <option value="Doctoral / Ph.D">Doctoral / Ph.D</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {currentLanguage === 'te' ? "ఉపాధి స్థితి" : currentLanguage === 'hi' ? "रोजगार स्थिति" : "Employment Status"}
              </label>
              <select
                value={formData.employmentStatus}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setFormData({ 
                    ...formData, 
                    employmentStatus: val,
                    isStudent: val === 'Student',
                    isFarmer: val === 'Farmer'
                  });
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Self-Employed">Self-Employed / Entrepreneur</option>
                <option value="Daily Wage Worker">Daily Wage Worker</option>
                <option value="Salaried">Salaried (Private / Public)</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired / Senior Citizen</option>
              </select>
            </div>
          </div>

          {/* Conditional Questions: Student Section */}
          {formData.isStudent && (
            <div className="p-3.5 rounded-xl bg-blue-900/20 border border-blue-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-400">
                <GraduationCap className="w-4 h-4" />
                <span>{currentLanguage === 'te' ? "విద్యార్థి వివరాలు" : currentLanguage === 'hi' ? "छात्र विवरण" : "Student Details (Conditional)"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    {currentLanguage === 'te' ? "కోర్సు పేరు" : currentLanguage === 'hi' ? "कोर्स" : "Course / Degree Name"}
                  </label>
                  <input
                    type="text"
                    value={formData.course || ''}
                    placeholder="e.g. B.Tech Computer Science, Diploma Mech"
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    {currentLanguage === 'te' ? "ప్రస్తుత విద్యా సంవత్సరం" : currentLanguage === 'hi' ? "अध्ययन वर्ष" : "Year of Study"}
                  </label>
                  <select
                    value={formData.yearOfStudy || '1st Year'}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Questions: Farmer Section */}
          {formData.isFarmer && (
            <div className="p-3.5 rounded-xl bg-emerald-900/20 border border-emerald-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                <Briefcase className="w-4 h-4" />
                <span>{currentLanguage === 'te' ? "వ్యవసాయ వివరాలు" : currentLanguage === 'hi' ? "कृषि विवरण" : "Agricultural Land Details (Conditional)"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    {currentLanguage === 'te' ? "సాగు భూమి (ఎకరాలలో)" : currentLanguage === 'hi' ? "कृषि भूमि (एकड़ में)" : "Cultivable Land (Acres)"}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    value={formData.landHoldingAcres || 0}
                    onChange={(e) => setFormData({ ...formData, landHoldingAcres: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <input
                    type="checkbox"
                    id="kcc"
                    checked={formData.hasKisanCreditCard || false}
                    onChange={(e) => setFormData({ ...formData, hasKisanCreditCard: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="kcc" className="text-xs text-slate-300">
                    {currentLanguage === 'te' ? "కిసాన్ క్రెడిట్ కార్డ్ ఉంది" : currentLanguage === 'hi' ? "किसान क्रेडिट कार्ड उपलब्ध है" : "Holds Kisan Credit Card (KCC)"}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Certificate Readiness Checkboxes */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>{currentLanguage === 'te' ? "మీ వద్ద సిద్ధంగా ఉన్న ధృవీకరణ పత్రాలు:" : currentLanguage === 'hi' ? "उपलब्ध प्रमाण पत्र:" : "Available Digital Certificates:"}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasIncomeCertificate || false}
                  onChange={(e) => setFormData({ ...formData, hasIncomeCertificate: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-300">Income Certificate</span>
              </label>
              <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasCasteCertificate || false}
                  onChange={(e) => setFormData({ ...formData, hasCasteCertificate: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-300">Caste Certificate</span>
              </label>
              <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasDomicileCertificate || false}
                  onChange={(e) => setFormData({ ...formData, hasDomicileCertificate: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-300">Domicile / Residence</span>
              </label>
              <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasRationCard || false}
                  onChange={(e) => setFormData({ ...formData, hasRationCard: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-300">Ration / Rice Card</span>
              </label>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                {currentLanguage === 'te' ? "ప్రొఫైల్ సేవ్ చేసి అర్హత పరిశీలించండి" : currentLanguage === 'hi' ? "सहेजें और पात्रता अपडेट करें" : "Save Profile & Re-evaluate Schemes"}
              </span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
