import React, { useState } from 'react';
import { X, CheckCircle2, Download, Printer, MapPin, Clock, Phone, ExternalLink, Calendar, BookOpen } from 'lucide-react';
import { ServiceItem, PortfolioItem, BlogPost } from './types';
import { Language } from './translations';
import { compressImageFile } from '../utils/storage';

// ================= HIRE ME / CONSULTATION MODAL =================
export const HireMeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Prescription Review & Counselling',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Node.js consultation booking saved locally:', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl">
        <div className="bg-[#092244] px-4 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              aria-label="Back"
              className="text-slate-200 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">ফিরে যান</span>
            </button>
            <div>
              <h2 className="text-base sm:text-2xl font-bold font-solaiman-lipi">কনসালটেশন ও অ্যাপয়েন্টমেন্ট আবেদন</h2>
              <p className="text-xs text-teal-300 mt-0.5">নয়ন মন্ডল — ফার্মেসি রিটেইল স্পেশালিস্ট ও মেডিসিন সেলস সেবা</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition"
          >
            বন্ধ করুন
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8fbfe] p-4 sm:p-10">
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-slate-900 font-solaiman-lipi">আবেদন সফলভাবে গৃহীত হয়েছে!</h4>
                <p className="text-sm text-slate-600 mt-3 font-bengali-stylish">
                  নয়ন মন্ডল শীঘ্রই আপনার দেওয়া নম্বরে ({formData.phone}) যোগাযোগ করবেন।
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#092244] text-white rounded-xl text-xs font-semibold"
                >
                  ফিরে যান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-bengali-stylish">আপনার পূর্ণ নাম</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="যেমন: তারিক আহমেদ"
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none font-bengali-stylish"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-bengali-stylish">ফোন / হোয়াটসঅ্যাপ নম্বর</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1..."
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none font-bengali-stylish"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-bengali-stylish">পছন্দের সময়সূচি</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white font-bengali-stylish"
                    >
                      <option>সকাল (১০:০০ AM - ১:০০ PM)</option>
                      <option>দুপুর (২:০০ PM - ৫:০০ PM)</option>
                      <option>সন্ধ্যা (৬:০০ PM - ৯:৩০ PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-bengali-stylish">প্রয়োজনীয় সেবা</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white font-bengali-stylish"
                  >
                    <option>প্রেসক্রিপশন পর্যালোচনা ও সঠিক ডোজ যাচাই</option>
                    <option>দীর্ঘস্থায়ী রোগের ওষুধ কাউন্সেলিং</option>
                    <option>ড্রাগ ইন্টারঅ্যাকশন ও পার্শ্বপ্রতিক্রিয়া পরীক্ষা</option>
                    <option>ইনসুলিন ও কোল্ড-চেইন সংরক্ষণ পরামর্শ</option>
                    <option>সাধারণ স্বাস্থ্য ও ফার্মেসি গাইডলাইন</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-bengali-stylish">সংক্ষিপ্ত বিবরণ বা প্রশ্ন</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="প্রেসক্রিপশনের ওষুধের নাম বা আপনার কোনো শারীরিক জিজ্ঞাসা থাকলে লিখুন..."
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none font-bengali-stylish"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-6 rounded-xl shadow text-sm transition font-bengali-stylish"
                  >
                    আবেদন নিশ্চিত করুন
                  </button>
                  <a
                    href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                      `হ্যালো নয়ন মন্ডল ভাই, আমি প্রেসক্রিপশন অনুযায়ী ওষুধ ও সেবা বিষয়ে পরামর্শ নিতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-5 rounded-xl shadow text-sm transition font-bengali-stylish"
                  >
                    <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= CV DOWNLOAD / PREVIEW MODAL =================
export const CVModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTextCV = () => {
    const cvText = `
NAYAN MONDOL
Pharmacy Retail Specialist | Medicine Sales Executive
-----------------------------------------------------------
Contact: +880 1989 044092 | nayanmondol@gmail.com
Address: Angariya Bagchi Bazar, Daiyan Tower, Sadar, Shariatpur, Bangladesh

PROFESSIONAL SUMMARY
Experienced and customer-focused Pharmacy Retail Specialist and Medicine Sales Executive actively working in the pharmacy profession since 2017. Experienced in retail pharmacy operations, accurate prescription dispensing, cold-chain maintenance, and patient medication guidance. Committed to genuine pharmaceutical sourcing and ethical customer service.

CORE EXPERTISE & CAPABILITIES
• Accurate Prescription Dispensing & Verification
• Patient Medication Schedule & Dosage Timing Guidance
• Cold Chain Management (2°C-8°C for Insulin, Vaccines, Biologics)
• Inventory Management, Batch Verification, and Expiry Audit (FEFO)
• Sourcing Genuine DGDA-approved Pharmaceuticals
• Compassionate Patient Customer Service & Inquiries

PROFESSIONAL EXPERIENCE
• Senior Pharmacy Sales Executive & In-Charge (2019 - 2026)
  M/S Sikder Pharmacy (Under Daiyan Tower), Angaria Bazar, Shariatpur
  - Fulfilling daily prescriptions accurately and guiding patients on dosage regimens.
  - Ensuring strict cold-chain refrigeration for insulins and biologicals.
  - Overseeing genuine inventory intake from Square, Beximco, Incepta, and Renata.
  - Advising chronic diabetes and hypertension patients on regular medication adherence.

• Pharmacy Salesman & Counter Retail Executive (2017 - 2019)
  Medical Corner Pharmacy, Angaria Bazar, Shariatpur
  - Managed OTC and prescription counter sales with accurate billing and dispensing.
  - Monitored product expiry logs to ensure zero near-expiry distribution.

• Pharmacy Sales Trainee & Assistant (2017)
  Community Drug House, Shariatpur
  - Started career in 2017, gaining extensive practical grounding in brand names, generic formulations, and shelf categorization.

LANGUAGES: Bengali (Native), English (Working)
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nayan_Mondol_CV_Pharmacy_Sales_Specialist.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl">
        {/* Fullscreen Header */}
        <div className="bg-[#092244] px-4 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              aria-label="Back"
              className="text-slate-200 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">ফিরে যান</span>
            </button>
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white text-sm">
              CV
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold font-solaiman-lipi">Curriculum Vitae</h2>
              <p className="text-xs text-teal-300">Nayan Mondol — Pharmacy Retail Specialist & Salesman</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print CV"
              className="p-2 text-slate-200 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={handleDownloadTextCV}
              className="p-2 text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download (.txt)</span>
            </button>
          </div>
        </div>

        {/* Scrollable CV Document in Full Page Style */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-[#f8fbfe]">
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-12 rounded-2xl shadow-sm border border-slate-200/80 space-y-8 text-slate-800 text-left">
            {/* Header info */}
            <div className="border-b border-slate-200 pb-6">
              <h1 className="text-3xl font-extrabold text-[#092244] font-solaiman-lipi">Nayan Mondol</h1>
              <p className="text-base font-semibold text-teal-700 mt-1">
                Pharmacy Retail Specialist & Medicine Sales Executive (In Profession Since 2017)
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-2.5">
                <span>Phone: +880 1989 044092</span>
                <span>•</span>
                <span>Email: nayanmondol@gmail.com</span>
                <span>•</span>
                <span>Location: Shariatpur, Bangladesh</span>
              </div>
            </div>

            {/* Profile */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2 font-solaiman-lipi">
                Professional Summary
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-bengali-stylish">
                Experienced and dedicated Pharmacy Retail Specialist and Medicine Sales Executive actively working in the pharmacy field since 2017 at Daiyan Tower Pharmacy in Shariatpur. Committed to accurate prescription fulfillment, maintaining unbroken cold chain for temperature-sensitive medications, and ensuring genuine medicine supply with honest customer support.
              </p>
            </div>

            {/* Experience & Practical Foundation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-3 font-solaiman-lipi">
                Experience & Practical Background
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/70">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>Pharmacy Retail Experience Since 2017</span>
                    <span className="text-teal-700 text-xs font-semibold">Active Experience</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Continuous practical dispensing, prescription reading, inventory ordering, batch verification, and patient counter service at Angaria Bazar, Shariatpur.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/70 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#092244] text-sm block">100% Genuine Medicine Sourcing</span>
                    <span className="text-xs text-slate-600">Leading DGDA-Compliant Pharmaceutical Companies</span>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-3 py-1 rounded-full">Guaranteed Quality</span>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-3 font-solaiman-lipi">
                Core Competencies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Prescription Dispensing & Accuracy
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Patient Medication Guidance & Care
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Cold Chain Maintenance (2°C-8°C)
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Expiry Checking & FEFO Stock Management
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Genuine Brand Sourcing (Zero Counterfeits)
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Chronic Patient Support (Diabetes/BP)
                </div>
              </div>
            </div>

            {/* Practice */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-3 font-solaiman-lipi">
                Pharmacy Practice & Experience
              </h4>
              <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-2">
                <div className="flex justify-between font-bold text-[#092244] text-sm">
                  <span>Senior Pharmacy Retail Specialist & Sales In-Charge</span>
                  <span className="text-slate-500 text-xs">Shariatpur, BD</span>
                </div>
                <p className="text-xs font-semibold text-teal-700">M/S Sikder Pharmacy (Under Daiyan Tower), Angaria Bazar</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pt-2 font-bengali-stylish">
                  <li>Provides accurate prescription-based medicine dispensing to local patients every day.</li>
                  <li>Ensures unbroken cold-chain storage for insulins, vaccines, and eye drops.</li>
                  <li>Guides patients on meal timings and dosage frequencies in plain Bengali.</li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl transition"
              >
                ফিরে যান
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= PROJECT DETAILS MODAL =================
export const ProjectDetailModal: React.FC<{
  project: PortfolioItem | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-[#092244] via-[#0b2d5a] to-[#0d3b75] px-4 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onClose}
              aria-label="Back"
              className="text-slate-200 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">ফিরে যান</span>
            </button>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">
                {project.category}
              </span>
              <h2 className="text-base sm:text-2xl font-bold font-solaiman-lipi truncate text-white">{project.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition"
          >
            বন্ধ করুন
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8fbfe]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 text-slate-700">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-3 font-solaiman-lipi">
                কেস স্টাডি ও সারসংক্ষেপ
              </h4>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-bengali-stylish">
                {project.overview}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0284c7] mb-4 font-solaiman-lipi">
                ক্লিনিক্যাল ফলাফল ও প্রধান অর্জনসমূহ
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-bengali-stylish leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#092244] hover:bg-[#0e3260] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition"
              >
                ফিরে যান
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= SERVICE DETAILS MODAL =================
export const ServiceDetailModal: React.FC<{
  service: ServiceItem | null;
  language?: Language;
  onClose: () => void;
  onRequestConsult: () => void;
}> = ({ service, language = 'bn', onClose, onRequestConsult }) => {
  if (!service) return null;
  const isBn = language === 'bn';

  const title = isBn ? service.titleBn || service.title : service.title;
  const badge = isBn ? service.badgeBn || 'ফার্মেসি সার্ভিস' : service.badge || 'Service Guide';
  const description = isBn ? service.fullDescriptionBn || service.fullDescription : service.fullDescription;
  const pharmacistRole = isBn ? service.pharmacistRoleBn || service.pharmacistRole : service.pharmacistRole;
  const benefits = isBn ? service.keyBenefitsBn || service.keyBenefits : service.keyBenefits;
  const steps = isBn ? service.stepsBn || service.steps : service.steps;
  const precautions = isBn ? service.clinicalPrecautionsBn || service.clinicalPrecautions : service.clinicalPrecautions;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl">
        {/* Fullscreen Sticky Header */}
        <div className="bg-gradient-to-r from-[#092244] via-[#0b2d5a] to-[#0d3b75] px-4 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onClose}
              aria-label="Back"
              className="text-slate-200 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">{isBn ? 'ফিরে যান' : 'Back'}</span>
            </button>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">
                {badge}
              </span>
              <h2 className="text-base sm:text-2xl font-bold font-solaiman-lipi truncate text-white">{title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onRequestConsult();
              }}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow transition"
            >
              {isBn ? 'পরামর্শ নিন' : 'Consult Now'}
            </button>
          </div>
        </div>

        {/* Content Body - Clean full screen scrollable page layout */}
        <div className="flex-1 overflow-y-auto bg-[#f8fbfe]">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 text-slate-700">
            {/* Main Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2 font-solaiman-lipi">
                {isBn ? 'সারসংক্ষেপ ও মূল উদ্দেশ্য' : 'Overview & Purpose'}
              </h4>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-bengali-stylish">
                {description}
              </p>
            </div>

            {/* Pharmacist Role */}
            {pharmacistRole && (
              <div className="p-6 sm:p-7 rounded-2xl bg-teal-50/70 border-2 border-teal-200/80 shadow-xs">
                <h4 className="text-sm sm:text-base font-bold text-teal-900 uppercase tracking-wider mb-2 flex items-center gap-2 font-solaiman-lipi">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>{isBn ? 'নয়ন মন্ডলের পেশাগত দায়িত্ব ও ভূমিকা' : "Nayan Mondol's Professional Role & Duty"}</span>
                </h4>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-bengali-stylish mt-1">
                  {pharmacistRole}
                </p>
              </div>
            )}

            {/* Steps */}
            {steps && steps.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0284c7] mb-4 font-solaiman-lipi">
                  {isBn ? 'ধাপে ধাপে ক্লিনিক্যাল প্রক্রিয়া' : 'Step-by-Step Clinical Process'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {steps.map((st, i) => (
                    <div key={i} className="p-4 sm:p-5 bg-slate-50/80 border border-slate-200/70 rounded-xl hover:border-teal-400 transition-colors">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900 font-solaiman-lipi">{st.title}</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-bengali-stylish leading-relaxed pl-8">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0284c7] mb-4 font-solaiman-lipi">
                {isBn ? 'সেবার আওতাভুক্ত সুবিধাসমূহ' : 'Service Inclusions & Benefits'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-bengali-stylish leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precautions */}
            {precautions && precautions.length > 0 && (
              <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/80 border-2 border-amber-200 shadow-xs">
                <h4 className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2 font-solaiman-lipi">
                  <span className="text-base">⚠️</span>
                  <span>{isBn ? 'গুরুত্বপূর্ণ সতর্কতা ও নির্দেশিকা' : 'Crucial Patient Safety Precautions'}</span>
                </h4>
                <ul className="space-y-2">
                  {precautions.map((p, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-amber-950 font-bengali-stylish flex items-start gap-2.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-6 pb-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs sm:text-sm text-slate-500 font-bengali-stylish text-center sm:text-left">
                {isBn ? 'সার্বক্ষণিক নির্ভরযোগ্য স্বাস্থ্য ও ফার্মেসি সেবা • আঙ্গারিয়া বাজার, শরীয়তপুর' : '24/7 Professional pharmacy assistance • Angaria Bazar, Shariatpur'}
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition"
                >
                  {isBn ? 'ফিরে যান' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onRequestConsult();
                  }}
                  className="flex-1 sm:flex-initial bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition"
                >
                  {isBn ? 'পরামর্শের আবেদন করুন' : 'Consult On This'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= BLOG DRAWER / ARTICLES =================
export const BlogDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 'post-1',
      title: '5 Common Over-The-Counter Medicine Mistakes to Avoid',
      date: 'March 2025',
      category: 'Safe Medicine Use',
      readTime: '4 min read',
      summary:
        'Frequent pitfalls when treating headaches, coughs, and fever at home—including accidental paracetamol overdoses and NSAID risks.',
      content: [
        'Combining multiple cold medications often leads to double-dosing of acetaminophen (paracetamol). Always inspect active ingredients on the label.',
        'Taking pain relievers (NSAIDs) like ibuprofen or naproxen on an empty stomach can trigger acute gastric ulceration or irritation.',
        'Never use antibiotics left over from a previous infection for a common cold, which is viral in origin.',
      ],
    },
    {
      id: 'post-2',
      title: 'Proper Storage of Insulin and Heat-Sensitive Medicines in Bangladesh',
      date: 'February 2025',
      category: 'Pharmaceutical Storage',
      readTime: '5 min read',
      summary:
        'Practical cold-chain preservation tips during hot summer weather, power interruptions, and travel.',
      content: [
        'Unopened insulin vials and cartridges must remain refrigerated between 2°C and 8°C. Never freeze insulin, as crystallization destroys peptide proteins.',
        'Once in use, an insulin pen can be stored at room temperature (below 30°C) away from direct sunlight for up to 28 days.',
        'During load shedding, avoid opening the refrigerator door unnecessarily to preserve internal temperature for up to 6 hours.',
      ],
    },
    {
      id: 'post-3',
      title: 'Antimicrobial Resistance (AMR): Why Finishing Your Course Protects the Community',
      date: 'January 2025',
      category: 'Public Health',
      readTime: '6 min read',
      summary:
        'Stopping antibiotics prematurely when you feel better breeds resistant bacterial strains. Here is the science.',
      content: [
        'When you begin feeling improved after 2-3 days, the most susceptible bacteria have died, but the hardiest survivors remain.',
        'Discontinuing therapy gives surviving bacteria the opportunity to mutate and multiply, rendering standard antibiotics obsolete.',
        'Never purchase antibiotics without a verified registered physician prescription.',
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white h-full max-w-xl w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#092244] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-lg font-bold">Health & Pharmacy Blog</h3>
              <p className="text-xs text-teal-300">Articles & health advice by Nayan Mondol</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
          {selectedPost ? (
            <div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-semibold text-teal-600 hover:underline mb-4 inline-flex items-center gap-1"
              >
                ← Back to All Articles
              </button>
              <span className="text-xs font-bold text-teal-600 block mb-1">
                {selectedPost.category} • {selectedPost.date}
              </span>
              <h2 className="text-xl font-bold text-[#092244] mb-4">
                {selectedPost.title}
              </h2>
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="p-5 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition cursor-pointer group bg-white"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-teal-600">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#092244] group-hover:text-teal-700 transition">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {post.summary}
                  </p>
                  <span className="inline-block mt-3 text-xs font-semibold text-teal-600 group-hover:underline">
                    Read Article →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ================= PHARMACY LOCATION MODAL =================
export const LocationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl">
        <div className="bg-[#092244] px-4 sm:px-8 py-4 sm:py-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              aria-label="Back"
              className="text-slate-200 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">ফিরে যান</span>
            </button>
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white text-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-2xl font-bold font-solaiman-lipi">ফার্মেসি ও চেম্বার লোকেশন</h2>
              <p className="text-xs text-teal-300">মেসার্স সিকদার ফার্মেসী (দাইয়ান টাওয়ারের নিচে), আঙ্গারিয়া বাজার, শরীয়তপুর</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition"
          >
            বন্ধ করুন
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8fbfe] p-4 sm:p-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-bold text-[#092244] font-solaiman-lipi">মেসার্স সিকদার ফার্মেসী</h3>
                  <p className="text-sm text-slate-600 mt-1 font-bengali-stylish">দাইয়ান টাওয়ারের নিচে, আঙ্গারিয়া বাগচী বাজার, শরীয়তপুর সদর, শরীয়তপুর, বাংলাদেশ</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                  সরাসরি সেবা চালু
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">সরাসরি ফোন হেল্পলাইন</span>
                  <a href="tel:+8801989044092" className="text-sm font-bold text-teal-700 hover:underline flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span>+880 1989 044092</span>
                  </a>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">পরামর্শ ও সেবার সময়</span>
                  <div className="text-xs text-slate-700 space-y-1 font-bengali-stylish">
                    <p className="font-semibold text-slate-900">শনিবার – বৃহস্পতিবার: সকাল ৯টা – রাত ১০টা</p>
                    <p>শুক্রবার: বিকাল ৪টা – রাত ১০টা</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-[#092244] font-solaiman-lipi">গুগল ম্যাপে লোকেশন দেখুন:</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-bengali-stylish">
                সরাসরি গুগল ম্যাপের মাধ্যমে ন্যাভিগেশন ও সঠিক অবস্থান দেখে ফার্মেসিতে সরাসরি উপস্থিত হতে পারেন:
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/Xx7CZZQ6mVJH5r76A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#092244] hover:bg-[#0e3260] text-white font-bold text-sm py-3 px-6 rounded-xl shadow transition"
                >
                  <span>Google Maps-এ বিস্তারিত রুট দেখুন</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition"
                >
                  ফিরে যান
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= PHOTO REPLACEMENT MODAL =================
export const PhotoModal: React.FC<{
  isOpen: boolean;
  target: 'hero' | 'about' | string;
  targetTitle?: string;
  onClose: () => void;
  onSetImage: (target: string, dataUrl: string | null) => void;
}> = ({ isOpen, target, targetTitle, onClose, onSetImage }) => {
  const [urlInput, setUrlInput] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 900, 900, 0.75);
        onSetImage(target, compressed);
        onClose();
      } catch (err) {
        console.error('Failed to compress image file:', err);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onSetImage(target, event.target.result as string);
            onClose();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onSetImage(target, urlInput.trim());
      onClose();
    }
  };

  const handleResetToIllustration = () => {
    onSetImage(target, null);
    onClose();
  };

  const handleSelectPreset = (url: string) => {
    onSetImage(target, url);
    onClose();
  };

  const modalTitle = targetTitle || (target === 'hero' ? 'Customize Hero Portrait' : target === 'about' ? 'Customize About Photo' : 'Customize Project Photo');

  const presetPhotos = [
    {
      title: 'Clinical Consultation',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Pharmacist Advisory',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Medicines & Guide',
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Health Awareness Camp',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100">
        <div className="bg-[#092244] p-5 text-white flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {modalTitle}
          </h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-left">
          <p className="text-xs text-slate-600">
            Upload your preferred photo, enter an image URL, or choose a curated clinical photo:
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload from Device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer w-full border border-slate-200 rounded-lg p-2"
            />
          </div>

          <form onSubmit={handleUrlSubmit} className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Or Use Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="bg-[#092244] text-white text-xs px-3 py-2 rounded-lg font-semibold"
              >
                Apply
              </button>
            </div>
          </form>

          {/* Quick Preset Selector */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Or Select Clinical Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetPhotos.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset.url)}
                  className="group relative rounded-lg overflow-hidden border border-slate-200 hover:border-sky-500 text-left transition aspect-[16/10]"
                >
                  <img
                    src={preset.url}
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] text-white font-medium truncate">
                      {preset.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <button
              type="button"
              onClick={handleResetToIllustration}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Reset to Default Artwork
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
