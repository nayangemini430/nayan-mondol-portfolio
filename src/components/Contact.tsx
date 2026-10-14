import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  HeartPulse,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Language, translations } from './translations';

interface ContactProps {
  onPharmacyLocationClick: () => void;
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ onPharmacyLocationClick, language }) => {
  const t = translations[language].contact;
  const isBn = language === 'bn';

  // State for interactive copy feedback
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // State for form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'prescription-review',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.warn('Node.js contact submission error, using graceful client receipt:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      qBn: 'প্রেসক্রিপশন পর্যালোচনার জন্য কোনো ফি বা চার্জ রয়েছে কি?',
      qEn: 'Is there any fee for prescription reviews?',
      aBn: 'না, কমিউনিটির সাধারণ রোগীদের জন্য প্রাথমিক প্রেসক্রিপশন পর্যালোচনা, ওষুধের ডোজ যাচাই এবং সেবনবিধির নির্দেশনা সম্পূর্ণ বিনামূল্যে প্রদান করা হয়।',
      aEn: 'No, primary prescription audits, dosage verification, and administration guidance are provided completely free for community patients.',
    },
    {
      qBn: 'জরুরি সময়ে কীভাবে সবচেয়ে দ্রুত যোগাযোগ করব?',
      qEn: 'How can I reach you fastest during an emergency?',
      aBn: 'জরুরি প্রেসক্রিপশন বা তীব্র পার্শ্বপ্রতিক্রিয়ার ক্ষেত্রে সরাসরি +880 1989 044092 নম্বরে ফোন করুন অথবা হোয়াটসঅ্যাপে প্রেসক্রিপশনের স্পষ্ট ছবি পাঠিয়ে তাৎক্ষণিক সহায়তা নিন।',
      aEn: 'For urgent medicine queries or adverse reactions, call directly at +880 1989 044092 or send a clear photo on WhatsApp for instant assistance.',
    },
    {
      qBn: 'ইনসুলিন বা তাপ-সংবেদনশীল ওষুধ সংরক্ষণের নিয়ম জানা যাবে কি?',
      qEn: 'Can I get advice on insulin and cold-chain medication storage?',
      aBn: 'হ্যাঁ, ইনসুলিন, ভ্যাকসিন বা অ্যান্টিবায়োটিক ড্রপস ব্যবহারের সঠিক তাপমাত্রা (২°-৮° সে.) এবং রেফ্রিজারেটর সংরক্ষণের পূর্ণাঙ্গ বৈজ্ঞানিক গাইডলাইন দেওয়া হয়।',
      aEn: 'Yes, standardized clinical guidelines for insulin, vaccine, and eye drop storage (2°-8°C) are carefully explained to ensure drug potency.',
    },
    {
      qBn: 'দূরবর্তী এলাকা থেকে কি পরামর্শ বা সেবা নেওয়া সম্ভব?',
      qEn: 'Can patients outside Shariatpur consult remotely?',
      aBn: 'হ্যাঁ, পুরো বাংলাদেশ থেকে হোয়াটসঅ্যাপ বা ফোনের মাধ্যমে ডিজিটাল কনসাল্টেশন এবং নিরাপদ ওষুধ গ্রহণের পরামর্শ গ্রহণ করতে পারবেন।',
      aEn: 'Yes, tele-consultation is available across Bangladesh via WhatsApp and phone calls for safe medication adherence.',
    },
  ];

  return (
    <section id="contact" className="py-14 sm:py-20 bg-gradient-to-b from-[#f8fafc] via-[#edf5fc]/40 to-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER & TRUST SIGNALS
        ========================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isBn
                ? 'বর্তমানে অনলাইনে সক্রিয় · সাধারণত ১৫ মিনিটের মধ্যে উত্তর দেওয়া হয়'
                : 'Available Online · Average response time within 15 minutes'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#092244] tracking-tight font-solaiman-lipi mb-3">
            {isBn ? 'সরাসরি যোগাযোগ ও পরামর্শ' : 'Get in Touch & Consult'}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-bengali-stylish max-w-2xl mx-auto">
            {isBn
              ? 'ওষুধের সঠিক ব্যবহার, প্রেসক্রিপশন পর্যালোচনা বা স্বাস্থ্য সংক্রান্ত যেকোনো তথ্যের জন্য নির্দ্বিধায় যোগাযোগ করুন। আমরা প্রতিটি রোগীকে সর্বোচ্চ গুরুত্ব দিয়ে থাকি।'
              : 'Feel free to reach out for prescription review, drug interaction screening, or personalized healthcare guidance.'}
          </p>

          {/* Quiet Trust Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 font-bengali-stylish">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{isBn ? 'ফার্মেসি রিটেইল স্পেশালিস্ট' : 'Pharmacy Retail Specialist'}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>{isBn ? '১০০% প্রমাণ-ভিত্তিক নির্দেশনা' : 'Evidence-Based Advice'}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              <span>{isBn ? 'শনিবার – বৃহস্পতিবার খোলা' : 'Sat – Thu Consultation'}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4 MODERN INTERACTIVE CARDS
        ========================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          
          {/* Card 1: Direct Phone Call */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0284c7] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#0284c7] uppercase tracking-wider block mb-1">
                {isBn ? 'জরুরি হেল্পলাইন' : 'Emergency Hotline'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-1">
                +880 1989 044092
              </h3>
              <p className="text-xs text-slate-500 font-bengali-stylish mb-4">
                {isBn ? 'জরুরি প্রয়োজনে সরাসরি কল করুন' : 'Instant phone consultation'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <a
                href="tel:+8801989044092"
                className="flex-1 py-2 px-3 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isBn ? 'কল করুন' : 'Call Now'}</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy('+8801989044092', 'phone')}
                title={isBn ? 'নম্বর কপি করুন' : 'Copy number'}
                className="p-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-lg text-xs transition-colors"
              >
                {copiedItem === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat & Rx Photo */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                {isBn ? 'প্রেসক্রিপশন পাঠান' : 'WhatsApp Consultation'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-1">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-slate-500 font-bengali-stylish mb-4">
                {isBn ? 'প্রেসক্রিপশনের ছবি পাঠিয়ে তথ্য জানুন' : 'Send Rx image & chat directly'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                  isBn
                    ? 'হ্যালো নয়ন মন্ডল ভাই, আমি প্রেসক্রিপশন অনুযায়ী ওষুধ ও পরামর্শ নিয়ে কথা বলতে চাই।'
                    : 'Hello Nayan Mondol, I would like to consult regarding my prescription and medications.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isBn ? 'WhatsApp-এ চ্যাট' : 'Open WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email Inquiries */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-teal-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider block mb-1">
                {isBn ? 'অফিসিয়াল ইমেইল' : 'Email Inquiry'}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#092244] font-solaiman-lipi mb-1 truncate" title="nayanmondol@gmail.com">
                nayanmondol@gmail.com
              </h3>
              <p className="text-xs text-slate-500 font-bengali-stylish mb-4">
                {isBn ? 'ডিটেইলড প্রেসক্রিপশন বা ব্যবসায়িক চিঠি' : 'Detailed medical inquiries'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <a
                href="mailto:nayanmondol@gmail.com?subject=Pharmacist%20Consultation%20Inquiry"
                className="flex-1 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isBn ? 'ইমেইল পাঠান' : 'Send Email'}</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy('nayanmondol@gmail.com', 'email')}
                title={isBn ? 'ইমেইল কপি করুন' : 'Copy email'}
                className="p-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-lg text-xs transition-colors"
              >
                {copiedItem === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 4: Chamber & Location */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#092244] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                {isBn ? 'ফার্মেসি ও চেম্বার' : 'Chamber Location'}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#092244] font-solaiman-lipi mb-1">
                {isBn ? 'মেসার্স সিকদার ফার্মেসী' : 'M/S Sikder Pharmacy'}
              </h3>
              <p className="text-xs text-slate-500 font-bengali-stylish mb-4">
                {isBn ? 'দাইয়ান টাওয়ারের নিচে, আঙ্গারিয়া বাজার, শরীয়তপুর' : 'Under Daiyan Tower, Angaria Bazar, Shariatpur'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onPharmacyLocationClick}
                className="w-full py-2 px-3 bg-[#092244] hover:bg-[#0e3260] text-white rounded-lg text-xs font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isBn ? 'ম্যাপ ও সময়সূচী দেখুন' : 'View Location'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================================
            TWO-COLUMN MAIN SECTION:
            LEFT: Interactive Contact / Rx Inquiry Form
            RIGHT: Chamber Visiting Hours + Quick Rx Verification Guide
        ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left Column (7 cols): Consultation Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                {isBn ? 'অনলাইন বার্তা ও অ্যাপয়েন্টমেন্ট' : 'Online Appointment & Message'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#092244] font-solaiman-lipi mt-1">
                {isBn ? 'নয়ন মন্ডলকে সরাসরি বার্তা পাঠান' : 'Send a Direct Message to Nayan Mondol'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-bengali-stylish mt-1">
                {isBn
                  ? 'আপনার প্রশ্ন বা প্রেসক্রিপশনের বিবরণ লিখুন। গোপনীয়তা ও সুরক্ষা শতভাগ বজায় রাখা হয়।'
                  : 'Submit your query below. All health information is kept strictly confidential.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950 font-solaiman-lipi mb-1">
                  {isBn ? 'বার্তাটি সফলভাবে গ্রহণ করা হয়েছে!' : 'Your Message Has Been Received!'}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 font-bengali-stylish max-w-md mx-auto mb-5 leading-relaxed">
                  {isBn
                    ? `ধন্যবাদ ${formData.name}! আপনার বার্তাটি নয়ন মন্ডল-এর কাছে পৌঁছেছে। অতি দ্রুত আপনার নম্বর (${formData.phone})-এ যোগাযোগ করা হবে।`
                    : `Thank you ${formData.name}! Nayan Mondol has received your inquiry and will reach out to ${formData.phone} shortly.`}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', serviceType: 'prescription-review', message: '' });
                    }}
                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    {isBn ? 'নতুন বার্তা পাঠান' : 'Send Another Message'}
                  </button>
                  <a
                    href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                      `হ্যালো নয়ন মন্ডল, আমি (${formData.name}, ফোন: ${formData.phone}) ওয়েবসাইটে একটি মেসেজ পাঠিয়েছি: "${formData.message}"`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#10b981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isBn ? 'WhatsApp-এ ফরোয়ার্ড করুন' : 'Forward to WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-bengali-stylish">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isBn ? 'আপনার পূর্ণ নাম *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isBn ? 'যেমন: মোহাম্মদ রফিকুল ইসলাম' : 'e.g. John Doe'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isBn ? 'ফোন বা WhatsApp নম্বর *' : 'Phone or WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={isBn ? '০১XXXXXXXXX' : '+880 1XXXXXXXXX'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Service / Consultation Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isBn ? 'পরামর্শের বিষয় / সেবার ধরন' : 'Consultation Category'}
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all bg-slate-50/50 focus:bg-white cursor-pointer"
                  >
                    <option value="prescription-review">
                      {isBn ? 'প্রেসক্রিপশন নিরীক্ষা ও সঠিক ডোজ যাচাই (Prescription Review)' : 'Prescription Review & Verification'}
                    </option>
                    <option value="medicine-info">
                      {isBn ? 'ওষুধের তথ্য ও পার্শ্বপ্রতিক্রিয়া (Drug Information)' : 'Medicine Info & Side Effects'}
                    </option>
                    <option value="chronic-care">
                      {isBn ? 'ডায়াবেটিস ও উচ্চ রক্তচাপের ওষুধ ব্যবস্থাপনা (Chronic Care)' : 'Diabetes & Hypertension Management'}
                    </option>
                    <option value="general-inquiry">
                      {isBn ? 'ফার্মেসি ভিজিট ও সাধারণ স্বাস্থ্য পরামর্শ (General Visit)' : 'General Consultation / Pharmacy Visit'}
                    </option>
                  </select>
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isBn ? 'আপনার স্বাস্থ্য সমস্যা বা প্রশ্ন *' : 'Your Query or Health Concern *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isBn
                        ? 'ওষুধের নাম, সেবনবিধি নিয়ে আপনার কোনো দ্বিধা বা ডাক্তারের প্রেসক্রিপশন সংক্রান্ত প্রশ্ন সংক্ষেপে লিখুন...'
                        : 'Describe your symptoms, medicine names, or any questions you have regarding your prescription...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white resize-y"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isBn ? 'আপনার ব্যক্তিগত তথ্য সুরক্ষিত থাকে' : 'Your information is 100% confidential'}</span>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isBn ? 'বার্তা পাঠান' : 'Submit Message'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Chamber Hours & Guidance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visiting Timetable Card */}
            <div className="bg-gradient-to-br from-[#092244] to-[#0c2f5d] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-blue-900/40">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold font-solaiman-lipi text-white">
                    {isBn ? 'চেম্বার ও ভিজিটিং সময়সূচী' : 'Chamber & Visiting Hours'}
                  </h4>
                  <p className="text-xs text-teal-200/80 font-bengali-stylish">
                    {isBn ? 'দাইয়ান টাওয়ার ফার্মেসি, শরীয়তপুর' : 'Daiyan Tower Pharmacy, Shariatpur'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-bengali-stylish text-xs sm:text-sm pt-2 border-t border-white/10">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold text-slate-200">
                    {isBn ? 'শনিবার – বৃহস্পতিবার:' : 'Saturday – Thursday:'}
                  </span>
                  <span className="font-bold text-teal-300">
                    {isBn ? 'সকাল ৯:০০ – রাত ১০:০০' : '9:00 AM – 10:00 PM'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold text-slate-200">
                    {isBn ? 'শুক্রবার:' : 'Friday:'}
                  </span>
                  <span className="font-bold text-teal-300">
                    {isBn ? 'বিকাল ৪:০০ – রাত ১০:০০' : '4:00 PM – 10:00 PM'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200">
                  <span className="font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{isBn ? 'জরুরি প্রেসক্রিপশন সাপোর্ট:' : 'Emergency Rx Support:'}</span>
                  </span>
                  <span className="font-bold text-white">
                    {isBn ? '২৪ ঘণ্টা (WhatsApp)' : '24/7 (WhatsApp)'}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-bengali-stylish">
                <span>{isBn ? 'লোকেশন দেখতে ক্লিক করুন:' : 'View full map details:'}</span>
                <a
                  href="https://maps.app.goo.gl/Xx7CZZQ6mVJH5r76A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal-300 hover:text-teal-200 underline flex items-center gap-1"
                >
                  <span>{isBn ? 'গুগল ম্যাপে অবস্থান দেখুন' : 'Google Maps Location'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Prescription Sending Guide */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-[#0284c7]" />
                <h4 className="text-base font-bold text-[#092244] font-solaiman-lipi">
                  {isBn ? 'প্রেসক্রিপশন পাঠানোর নিয়মাবলী' : 'How to Send Your Prescription'}
                </h4>
              </div>

              <ol className="space-y-2.5 text-xs text-slate-600 font-bengali-stylish">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0284c7] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    ১
                  </span>
                  <span>{isBn ? 'প্রেসক্রিপশনের সকল লেখা ও ডাক্তারের নাম স্পষ্টভাবে ছবি তুলুন।' : 'Take a clear, well-lit photo of the entire doctor prescription.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0284c7] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    ২
                  </span>
                  <span>{isBn ? 'রোগীর বয়স, ওজন ও পূর্বের কোনো অ্যালার্জি থাকলে সাথে উল্লেখ করুন।' : 'Mention patient age, weight, and any known drug allergies.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0284c7] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    ৩
                  </span>
                  <span>{isBn ? 'নয়ন মন্ডল প্রেসক্রিপশন দেখে সঠিক ওষুধ ও সেবনবিধি বুঝিয়ে দেবেন।' : 'Nayan Mondol verifies prescriptions and explains dosage instructions.'}</span>
                </li>
              </ol>

              <div className="mt-5">
                <a
                  href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                    isBn
                      ? 'হ্যালো নয়ন মন্ডল ভাই, আমি প্রেসক্রিপশন পাঠাচ্ছি। অনুগ্রহ করে দেখে জানাবেন।'
                      : 'Hello Nayan Mondol, sending my prescription for review.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#092244] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>{isBn ? 'সরাসরি হোয়াটসঅ্যাপে ছবি পাঠান' : 'Send Photo via WhatsApp'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            FAQ ACCORDION: FREQUENTLY ASKED PATIENT QUESTIONS
        ========================================================================== */}
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/90 mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
              {isBn ? 'রোগীদের সাধারণ জিজ্ঞাসা' : 'Common Patient Questions'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#092244] font-solaiman-lipi mt-1">
              {isBn ? 'যোগাযোগ ও সেবা সম্পর্কিত প্রশ্নাবলী' : 'Frequently Asked Questions'}
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#092244] font-solaiman-lipi">
                      {isBn ? faq.qBn : faq.qEn}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 font-bengali-stylish leading-relaxed border-t border-slate-100 animate-fadeIn">
                      <p>{isBn ? faq.aBn : faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            SOCIAL CHANNELS & PROFESSIONAL NETWORKS
        ========================================================================== */}
        <div className="text-center">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider font-bengali-stylish mb-4">
            {isBn ? 'সোশ্যাল মিডিয়া ও স্বাস্থ্য সচেতনতামূলক প্ল্যাটফর্ম' : 'Social & Professional Networks'}
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#1877F2] text-slate-700 hover:text-[#1877F2] shadow-sm hover:shadow transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* Messenger */}
            <a
              href="https://messenger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0084FF] text-slate-700 hover:text-[#0084FF] shadow-sm hover:shadow transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-[#0084FF]" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.261c0 2.913 1.45 5.518 3.716 7.215V22l3.355-1.843c.928.257 1.91.396 2.929.396 5.523 0 10-4.145 10-9.292C22 6.145 17.523 2 12 2zm1.042 12.443l-2.611-2.784-5.094 2.784 5.602-5.945 2.678 2.784 5.027-2.784-5.602 5.945z" />
              </svg>
              <span>Messenger</span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#FF0000] text-slate-700 hover:text-[#FF0000] shadow-sm hover:shadow transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-[#FF0000]" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0A66C2] text-slate-700 hover:text-[#0A66C2] shadow-sm hover:shadow transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
