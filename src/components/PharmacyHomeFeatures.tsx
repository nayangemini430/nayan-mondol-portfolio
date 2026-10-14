import React, { useState } from 'react';
import {
  ShieldCheck,
  Pill,
  Clock,
  Thermometer,
  Activity,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ArrowRight,
  FileText,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Milk,
  Coffee,
  Apple,
  Info,
  Calendar,
  Zap,
  Award,
  MessageSquare,
  Search
} from 'lucide-react';
import { Language } from './translations';

interface PharmacyHomeFeaturesProps {
  language: Language;
  onConsultClick: () => void;
  onNavigate: (page: string) => void;
}

export const PharmacyHomeFeatures: React.FC<PharmacyHomeFeaturesProps> = ({
  language,
  onConsultClick,
  onNavigate,
}) => {
  // BMI Interactive Calculator State
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(6);
  const [weightKg, setWeightKg] = useState<number>(65);
  const [bmiResult, setBmiResult] = useState<{ bmi: number; status: string; color: string; advice: string } | null>(null);

  // Dosage Helper Interactive State (Paracetamol / General pediatric/adult dose)
  const [patientWeight, setPatientWeight] = useState<number>(20);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active Pill Timing Tab
  const [activeTimingTab, setActiveTimingTab] = useState<'morning' | 'noon' | 'evening' | 'night'>('morning');

  // Node.js Powered Drug Checker State
  const [drugSearchQuery, setDrugSearchQuery] = useState('');
  const [isCheckingDrug, setIsCheckingDrug] = useState(false);
  const [drugCheckResult, setDrugCheckResult] = useState<any>(null);

  const handleDrugCheck = async (queryText?: string) => {
    const text = (queryText !== undefined ? queryText : drugSearchQuery).trim();
    if (!text) return;
    setIsCheckingDrug(true);
    try {
      const res = await fetch('/api/drug-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      setDrugCheckResult(data);
    } catch (e) {
      console.warn('Node.js drug check error:', e);
    } finally {
      setIsCheckingDrug(false);
    }
  };

  // Calculate BMI
  const calculateBmi = () => {
    const totalInches = heightFeet * 12 + heightInches;
    const heightInMeters = totalInches * 0.0254;
    if (heightInMeters > 0 && weightKg > 0) {
      const calculatedBmi = parseFloat((weightKg / (heightInMeters * heightInMeters)).toFixed(1));
      let status = '';
      let color = '';
      let advice = '';

      if (calculatedBmi < 18.5) {
        status = language === 'bn' ? 'স্বাভাবিকের চেয়ে কম ওজন (Underweight)' : 'Underweight';
        color = 'text-amber-700 bg-amber-50 border-amber-300';
        advice = language === 'bn'
          ? 'পুষ্টিকর খাদ্য গ্রহণ ও চিকিৎসকের পরামর্শে প্রোটিন/মাল্টিভিটামিন সাপ্লিমেন্ট নিতে পারেন।'
          : 'Consider dietary counseling and protein/multivitamin support.';
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        status = language === 'bn' ? 'আদর্শ বা স্বাভাবিক ওজন (Normal weight)' : 'Normal healthy weight';
        color = 'text-emerald-700 bg-emerald-50 border-emerald-300';
        advice = language === 'bn'
          ? 'চমৎকার! আপনার শরীরের মেটাবলিজম ও ড্রাগ শোষণ ক্ষমতা স্বাভাবিক রয়েছে।'
          : 'Optimal! Your body metabolism and drug absorption pathways are normal.';
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        status = language === 'bn' ? 'অতিরিক্ত ওজন (Overweight)' : 'Overweight';
        color = 'text-orange-700 bg-orange-50 border-orange-300';
        advice = language === 'bn'
          ? 'নিয়মিত ৩০ মিনিট হাঁটা ও তেল-চর্বিযুক্ত খাবার কমিয়ে ওজন নিয়ন্ত্রণে রাখুন।'
          : 'Maintain daily 30m brisk walking and manage dietary fats for cardiovascular wellness.';
      } else {
        status = language === 'bn' ? 'স্থূলতা বা ওবেসিটি (Obese)' : 'Obese';
        color = 'text-rose-700 bg-rose-50 border-rose-300';
        advice = language === 'bn'
          ? 'ওজন কমানোর পরিকল্পনা নিন এবং ডায়াবেটিস ও রক্তচাপ নিয়মিত পরীক্ষা করান।'
          : 'Consult your physician for metabolic monitoring and tailored dosage calculations.';
      }

      setBmiResult({ bmi: calculatedBmi, status, color, advice });
    }
  };

  // Paracetamol dosage calculation (15mg per kg per dose, max 4 doses/day, syrup 120mg/5ml)
  const dosePerIntakeMg = Math.round(patientWeight * 12.5);
  const syrupMl = (dosePerIntakeMg / 24).toFixed(1); // 120mg per 5ml -> 24mg/ml
  const maxDailyDoseMg = Math.min(Math.round(patientWeight * 50), 4000);

  const faqs = [
    {
      q: language === 'bn' ? '১. খাবার আগে নাকি পরে ওষুধ খেতে হবে, কীভাবে বুঝব?' : '1. How do I know whether to take medicine before or after meals?',
      a: language === 'bn'
        ? 'গ্যাস্ট্রিকের ওষুধ (পিপিআই) খাবারের ২০-৩০ মিনিট আগে খাওয়া আবশ্যক যেন এটি কার্যকরভাবে এসিড নিঃসরণ কমায়। কিন্তু ব্যথানাশক (NSAIDs), অ্যান্টিবায়োটিক এবং আয়রন ট্যাবলেট পাকস্থলীর সুরক্ষায় সবসময় ভরপেটে বা খাবারের পর খাওয়া উচিত।'
        : 'Gastric acid suppressants (PPIs) must be taken 20-30 minutes before meals. However, painkillers (NSAIDs), antibiotics, and iron supplements should be taken after meals to protect the stomach lining.'
    },
    {
      q: language === 'bn' ? '২. অ্যান্টিবায়োটিকের পুরো কোর্স শেষ করা কেন জরুরি?' : '2. Why is it crucial to finish the entire antibiotic course?',
      a: language === 'bn'
        ? '২-৩ দিন ওষুধ খাওয়ার পর সুস্থ বোধ করলেও শরীরে সুপ্ত ব্যাকটেরিয়া বেঁচে থাকে। কোর্স অসম্পূর্ণ রাখলে ওই ব্যাকটেরিয়া ড্রাগ-রেজিস্ট্যান্ট হয়ে যায় এবং পরবর্তীতে ওই ওষুধ আর কাজ করে না (AMR সমস্যা)।'
        : 'Even if symptoms disappear after 2-3 days, dormant bacteria may survive. Incomplete antibiotic courses breed Antimicrobial Resistance (AMR), making standard antibiotics ineffective in the future.'
    },
    {
      q: language === 'bn' ? '৩. ইনসুলিন এবং বায়োলজিক্যাল ওষুধ সাধারণ ফ্রিজে কোথায় রাখবেন?' : '3. Where should insulin and biological medicines be stored in a refrigerator?',
      a: language === 'bn'
        ? 'ইনসুলিন কখনোই ডিপ-ফ্রিজে (ফ্রিজারে) বরফ করবেন না। ফ্রিজের সাধারণ তাকে বা দরজার মাঝের খোপে ২°C থেকে ৮°C তাপমাত্রায় সংরক্ষণ করুন। জমে গেলে ইনসুলিনের কার্যকারিতা নষ্ট হয়ে যায়।'
        : 'Never freeze insulin. Store unpunctured insulin at 2°C to 8°C on the middle shelf of a standard refrigerator. Freezing denatures the protein molecule completely.'
    },
    {
      q: language === 'bn' ? '৪. জেনেরিক ওষুধ কি মূল ব্র্যান্ডের সমান কার্যকর?' : '4. Are generic medicines as effective as original brand-name drugs?',
      a: language === 'bn'
        ? 'হ্যাঁ, যদি তা মানসম্মত ও জিএমপি (GMP) অনুমোদিত ফার্মাসিউটিক্যালস কোম্পানির হয়। মূল রাসায়নিক উপাদান (Active Ingredient), কার্যকারিতা ও ডোজ সমান থাকে, কিন্তু দাম অনেক সময় সাধারণ রোগীর সাধ্যের মধ্যে থাকে।'
        : 'Yes, provided they are produced by GMP-certified pharmaceutical companies. The active pharmaceutical ingredient (API), efficacy, and dosage are identical, often at a much more affordable cost.'
    },
    {
      q: language === 'bn' ? '৫. শুষ্ক পাউডার অ্যান্টিবায়োটিক সিরাপ পানিতে গুলিয়ে কতদিন রাখা যায়?' : '5. How long can reconstituted dry syrup antibiotics be kept?',
      a: language === 'bn'
        ? 'ফোটানো ঠাণ্ডা পানি দিয়ে গোলানো শুষ্ক সিরাপ (Dry Syrup) সাধারণ তাপমাত্রায় সর্বোচ্চ ৭ দিন এবং ফ্রিজে রাখলে সর্বোচ্চ ১৪ দিন ভালো থাকে। এরপরে অবশিষ্ট সিরাপ ফেলে দিতে হবে।'
        : 'Reconstituted antibiotic dry syrups should be used within 7 days at room temperature or 14 days in a refrigerator. Any remainder after that period must be safely discarded.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Live Pharmacy & Emergency Availability Banner - High Contrast Vibrant Theme */}
      <section className="bg-gradient-to-r from-[#061d36] via-[#0b3866] to-[#04203e] text-white rounded-3xl shadow-xl overflow-hidden border-2 border-emerald-500/30 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="px-5 py-6 sm:px-8 sm:py-7 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative flex items-center justify-center shrink-0 mt-1 sm:mt-0">
              <span className="w-4 h-4 bg-emerald-400 rounded-full animate-ping absolute" />
              <span className="w-4 h-4 bg-emerald-400 rounded-full relative" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  {language === 'bn' ? '● নয়ন মন্ডল — ফার্মেসি সেলস স্পেশালিস্ট' : '● NAYAN MONDOL — PHARMACY SALES SPECIALIST'}
                </span>
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-400/40">
                  {language === 'bn' ? 'প্রতিদিন সকাল ৯টা - রাত ১০টা' : '9:00 AM - 10:00 PM Daily'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1.5 font-solaiman-lipi">
                {language === 'bn'
                  ? 'জরুরি প্রেসক্রিপশন বুঝতে সমস্যা বা ওষুধের সঠিক তথ্য দরকার?'
                  : 'Emergency Prescription Review & Safe Medication Consultation'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-bengali-stylish">
                {language === 'bn'
                  ? 'মেসার্স সিকদার ফার্মেসী (দাইয়ান টাওয়ারের নিচে), আঙ্গারিয়া বাজার, শরীয়তপুর সদর • সরাসরি যোগাযোগ বা WhatsApp'
                  : 'M/S Sikder Pharmacy (Under Daiyan Tower), Angaria Bazar, Shariatpur • Direct Helpline or WhatsApp'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:+8801989044092"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+880 1989 044092</span>
            </a>
            <a
              href="https://wa.me/8801989044092"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-400/40 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>
            <button
              onClick={onConsultClick}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 bg-white text-[#092244] hover:bg-slate-100 text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'পরামর্শ বুক করুন' : 'Book Consult'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Colourful Live Statistics Ribbon */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 group-hover:scale-110 transition-transform">
            <Pill className="w-16 h-16" />
          </div>
          <span className="text-3xl sm:text-4xl font-black font-solaiman-lipi block">১০,০০০+</span>
          <h4 className="text-sm font-bold text-emerald-100 mt-1 font-solaiman-lipi">
            {language === 'bn' ? 'নিরাপদ প্রেসক্রিপশন নিরীক্ষা' : 'Safe Prescriptions Audited'}
          </h4>
          <p className="text-[11px] text-emerald-200 mt-1 font-bengali-stylish">
            {language === 'bn' ? 'ডোজ ও পার্শ্বপ্রতিক্রিয়া যাচাইকৃত' : 'Validated for safety and dosage'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 group-hover:scale-110 transition-transform">
            <Thermometer className="w-16 h-16" />
          </div>
          <span className="text-3xl sm:text-4xl font-black font-solaiman-lipi block">১০০%</span>
          <h4 className="text-sm font-bold text-blue-100 mt-1 font-solaiman-lipi">
            {language === 'bn' ? 'কোল্ড-চেইন স্টোরেজ নিশ্চয়তা' : 'Cold-Chain Guaranteed'}
          </h4>
          <p className="text-[11px] text-blue-200 mt-1 font-bengali-stylish">
            {language === 'bn' ? '২°-৮° সেলসিয়াস সংরক্ষিত ইনসুলিন' : '2°-8°C integrity for insulin & bio'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800 text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 group-hover:scale-110 transition-transform">
            <HeartPulse className="w-16 h-16" />
          </div>
          <span className="text-3xl sm:text-4xl font-black font-solaiman-lipi block">২৪/৭</span>
          <h4 className="text-sm font-bold text-purple-100 mt-1 font-solaiman-lipi">
            {language === 'bn' ? 'ড্রাগ ইনফরমেশন ও পরামর্শ' : 'Emergency Drug Advice'}
          </h4>
          <p className="text-[11px] text-purple-200 mt-1 font-bengali-stylish">
            {language === 'bn' ? 'রোগী ও স্বজনদের বিনামূল্যে গাইড' : 'Trusted medication counseling'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 group-hover:scale-110 transition-transform">
            <Award className="w-16 h-16" />
          </div>
          <span className="text-3xl sm:text-4xl font-black font-solaiman-lipi block">১০+ বছর</span>
          <h4 className="text-sm font-bold text-amber-100 mt-1 font-solaiman-lipi">
            {language === 'bn' ? 'ফার্মেসি ও সেলস অভিজ্ঞতা' : 'Years Pharmacy Experience'}
          </h4>
          <p className="text-[11px] text-amber-200 mt-1 font-bengali-stylish">
            {language === 'bn' ? 'সততা ও গভীর ক্লিনিক্যাল জ্ঞান' : 'DGDA compliant ethical dispensing'}
          </p>
        </div>
      </section>

      {/* 3. Core Pillars as Pharmacy Salesman & Retail Specialist */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/90">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'পেশাগত শ্রেষ্ঠত্ব ও দায়িত্ব' : 'PHARMACEUTICAL EXCELLENCE'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092244] font-solaiman-lipi tracking-tight">
            {language === 'bn'
              ? 'নয়ন মন্ডল — ফার্মেসি সেলস ও রিটেল স্পেশালিস্ট হিসেবে মূল অঙ্গীকার'
              : 'Nayan Mondol — Core Responsibilities as Pharmacy Sales & Retail Specialist'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-bengali-stylish">
            {language === 'bn'
              ? 'শুধুমাত্র ওষুধ বিক্রয় নয়; সঠিক প্রেসক্রিপশন নিরীক্ষা, সঠিক কোম্পানির মানসম্পন্ন ড্রাগ সরবরাহ এবং রোগীর দ্রুত সুস্থতা নিশ্চিত করাই মূল ব্রত।'
              : 'Beyond dispensing medication: accurate prescription audit, ethical brand counseling, and safeguarding patient well-being.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-gradient-to-b from-emerald-50/80 to-white hover:to-emerald-50/40 rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 shadow-sm transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092244] mb-2 font-solaiman-lipi">
                {language === 'bn' ? 'প্রেসক্রিপশন অডিট ও স্ক্রিনিং' : 'Prescription Audit & Screening'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bengali-stylish">
                {language === 'bn'
                  ? 'ডোজের অতিরিক্ত মাত্রা, ড্রাগ-টু-ড্রাগ প্রতিক্রিয়া ও বয়সভিত্তিক সঠিক মাত্রা কঠোরভাবে যাচাই করা।'
                  : 'Verifying therapeutic dosing, identifying drug interactions, and pediatric/geriatric safety.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'bn' ? '১০০% নিরাপদ ডিসপেনসিং' : '100% Safe Dispensing'}</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-gradient-to-b from-blue-50/80 to-white hover:to-blue-50/40 rounded-2xl border-2 border-blue-200 hover:border-blue-500 shadow-sm transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092244] mb-2 font-solaiman-lipi">
                {language === 'bn' ? 'জেনেরিক ও সাশ্রয়ী ব্র্যান্ড গাইড' : 'Generic & Cost-Effective Brands'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bengali-stylish">
                {language === 'bn'
                  ? 'উচ্চমূল্যের ওষুধের সমমানের নির্ভরযোগ্য কোম্পানির সাশ্রয়ী জেনেরিক বিকল্প দিয়ে খরচ কমানো।'
                  : 'Guiding patients toward high-quality, GMP-certified generic alternatives that lower healthcare costs.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-blue-100 flex items-center gap-1.5 text-xs font-bold text-blue-800">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{language === 'bn' ? 'সততা ও রোগী-বান্ধব পরামর্শ' : 'Ethical Product Guidance'}</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-gradient-to-b from-amber-50/80 to-white hover:to-amber-50/40 rounded-2xl border-2 border-amber-200 hover:border-amber-500 shadow-sm transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092244] mb-2 font-solaiman-lipi">
                {language === 'bn' ? 'কোল্ড চেইন ও ড্রাগ স্টোরেজ' : 'Cold Chain & Storage Integrity'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bengali-stylish">
                {language === 'bn'
                  ? 'ইনসুলিন, ভ্যাকসিন, চোখ/কানের ড্রপ ২°-৮° সেলসিয়াস তাপমাত্রায় নিখুঁতভাবে সংরক্ষণ করা।'
                  : 'Unbroken cold chain management for insulin, biologicals, and vaccines with temperature logs.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{language === 'bn' ? 'কার্যকারিতা অক্ষুণ্ণ রাখা' : 'Efficacy Protected'}</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-gradient-to-b from-purple-50/80 to-white hover:to-purple-50/40 rounded-2xl border-2 border-purple-200 hover:border-purple-500 shadow-sm transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092244] mb-2 font-solaiman-lipi">
                {language === 'bn' ? 'রোগী কাউন্সেলিং ও সচেতনতা' : 'Patient Counselling & Adherence'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bengali-stylish">
                {language === 'bn'
                  ? 'ডায়াবেটিস, উচ্চ রক্তচাপের দীর্ঘমেয়াদি ওষুধের নিয়ম ও অ্যান্টিবায়োটিকের সঠিক ব্যবহার শেখানো।'
                  : 'Educating chronic illness patients on daily adherence, lifestyle, and preventing drug misuse.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center gap-1.5 text-xs font-bold text-purple-800">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>{language === 'bn' ? 'রোগীর সন্তুষ্টি ও আস্থা' : 'Trusted Care'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Essential Medicine Categories & Safe OTC Guidelines (Colourful Cards) */}
      <section className="bg-gradient-to-b from-[#f5f9fd] to-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <Pill className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'bn' ? 'তথ্যবহুল ড্রাগ গাইড' : 'ESSENTIAL DRUG GUIDANCE'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#092244] font-solaiman-lipi">
            {language === 'bn'
              ? 'বহুল ব্যবহৃত ওষুধের সঠিক সেবনবিধি ও ফার্মাসিউটিক্যাল সতর্কতা'
              : 'Safe Usage & Warning Guide for Common Medications'}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-bengali-stylish max-w-2xl mx-auto">
            {language === 'bn'
              ? 'কোন ওষুধ কখন খাবেন, কোন ভুলে বিপদ হতে পারে এবং কীভাবে সর্বোচ্চ উপকার পাবেন — এক নজরে জেনে নিন।'
              : 'Essential guidelines to prevent drug-induced toxicity and ensure optimal therapeutic response.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category 1: Gastric & Acid Reflux */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/90 via-white to-white border-2 border-emerald-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {language === 'bn' ? 'গ্যাস্ট্রিক ও বুকজ্বালা' : 'Gastric & Acid Reflux'}
              </span>
              <span className="text-emerald-600 font-bold text-xs">PPI / Antacid</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-2">
              {language === 'bn' ? 'ওমিপ্রাজল, ইসোমিপ্রাজল ও অ্যান্টাসিড' : 'Omeprazole & Antacids'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'সঠিক সময়:' : 'Timing:'}</strong> {language === 'bn' ? 'খাবারের ২০-৩০ মিনিট পূর্বে সেবন আবশ্যক।' : 'Take 20-30m before breakfast.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'অ্যান্টাসিড সিরাপ:' : 'Syrup:'}</strong> {language === 'bn' ? 'ভারী খাবারের ১ ঘণ্টা পরে বা বুকজ্বালা অনুভব করলে খাবেন।' : 'Take 1h post-meal.'}</span>
              </li>
              <li className="flex items-start gap-2 text-rose-700 bg-rose-50 p-2 rounded-lg mt-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'সতর্কতা: বছরের পর বছর ডাক্তারের পরামর্শ ছাড়া খেলে ক্যালসিয়াম ও ভিটামিন B12 ঘাটতি হয়।' : 'Prolonged PPI use without doctor note depletes calcium and B12.'}</span>
              </li>
            </ul>
          </div>

          {/* Category 2: Pain & Fever */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-50/90 via-white to-white border-2 border-rose-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                {language === 'bn' ? 'জ্বর, ব্যথা ও সর্দি' : 'Fever & Pain Relief'}
              </span>
              <span className="text-rose-600 font-bold text-xs">Paracetamol / NSAID</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-2">
              {language === 'bn' ? 'প্যারাসিটামল ও কড়া ব্যথানাশক' : 'Paracetamol & NSAIDs'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'সর্বোচ্চ মাত্রা:' : 'Max Limit:'}</strong> {language === 'bn' ? 'প্রাপ্তবয়স্কদের দিনে সর্বোচ্চ ৪০০০ মিলিগ্রাম (৮টি ৫০০ মিগ্রা)।' : 'Max 4000mg/day for adults.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'ব্যথানাশক নিয়ম:' : 'NSAID Rule:'}</strong> {language === 'bn' ? 'ডাইক্লোফেনাক বা ন্যাপ্রোক্সেন কখনোই খালি পেটে খাবেন না।' : 'Never take NSAIDs on an empty stomach.'}</span>
              </li>
              <li className="flex items-start gap-2 text-rose-700 bg-rose-50 p-2 rounded-lg mt-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'সতর্কতা: অতিরিক্ত প্যারাসিটামলে লিভার ড্যামেজ ও ব্যথানাশকে গ্যাস্ট্রিক আলসার হতে পারে।' : 'Overdose causes hepatotoxicity; NSAIDs carry gastric bleeding risks.'}</span>
              </li>
            </ul>
          </div>

          {/* Category 3: Antibiotics */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/90 via-white to-white border-2 border-amber-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                {language === 'bn' ? 'অ্যান্টিবায়োটিক নিয়ম' : 'Antibiotic Safety'}
              </span>
              <span className="text-amber-600 font-bold text-xs">AMR Prevention</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-2">
              {language === 'bn' ? 'অ্যান্টিবায়োটিক ব্যবহারের ৪টি নিয়ম' : '4 Golden Antibiotic Rules'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'পূর্ণাঙ্গ কোর্স:' : 'Full Course:'}</strong> {language === 'bn' ? 'সুস্থ বোধ করলেও নির্ধারিত ৫ বা ৭ দিনের পুরো কোর্স শেষ করুন।' : 'Always complete 5-7 day course.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'নির্দিষ্ট ব্যবধান:' : 'Exact Interval:'}</strong> {language === 'bn' ? 'দিনে ২ বার মানে ১২ ঘণ্টা অন্তর, ৩ বার মানে ৮ ঘণ্টা অন্তর।' : 'Respect 8h or 12h intervals.'}</span>
              </li>
              <li className="flex items-start gap-2 text-amber-900 bg-amber-50 p-2 rounded-lg mt-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'সতর্কতা: সামান্য সাধারণ সর্দি-কাশিতে কখনোই অ্যান্টিবায়োটিক চেয়ে খাবেন না।' : 'Never self-prescribe antibiotics for viral flu or cold.'}</span>
              </li>
            </ul>
          </div>

          {/* Category 4: Diabetes & Insulin */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/90 via-white to-white border-2 border-blue-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                {language === 'bn' ? 'ডায়াবেটিস ও ইনসুলিন' : 'Diabetes & Insulin'}
              </span>
              <span className="text-blue-600 font-bold text-xs">Cold-Chain Care</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-2">
              {language === 'bn' ? 'ইনসুলিন পেন ও গ্লুকোজ নিয়ন্ত্রণ' : 'Insulin Pen Care & Adherence'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'সংরক্ষণ:' : 'Storage:'}</strong> {language === 'bn' ? 'ফ্রিজের সাধারণ তাকে ২°-৮°C রাখুন; বরফ হওয়া ইনসুলিন অকার্যকর।' : 'Keep at 2°-8°C; never freeze.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'ইনজেকশন কোণ:' : 'Angle:'}</strong> {language === 'bn' ? 'পেটে চামড়ার নিচে ৯০ ডিগ্রি সোজা কোণে পুশ করুন।' : 'Inject at 90° subcutaneously.'}</span>
              </li>
              <li className="flex items-start gap-2 text-blue-900 bg-blue-50 p-2 rounded-lg mt-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'পরামর্শ: ইনজেকশন দেওয়ার জায়গা প্রতিবার অন্তত ১ ইঞ্চি পরিবর্তন করুন।' : 'Rotate injection sites to avoid lipohypertrophy.'}</span>
              </li>
            </ul>
          </div>

          {/* Category 5: Hypertension & Cardiac */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/90 via-white to-white border-2 border-purple-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                {language === 'bn' ? 'উচ্চ রক্তচাপ ও হৃদরোগ' : 'Hypertension & Heart'}
              </span>
              <span className="text-purple-600 font-bold text-xs">Daily Routine</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-2">
              {language === 'bn' ? 'ব্লাড প্রেসার ও কোলেস্টেরল' : 'BP Medicines & Statins'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'নিয়মিত সেবন:' : 'Fixed Time:'}</strong> {language === 'bn' ? 'প্রেসার মাপলে স্বাভাবিক দেখালেও কখনো ওষুধ বন্ধ করবেন না।' : 'Never stop BP medicine even if BP is normal.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'কোলেস্টেরল স্ট্যাটিন:' : 'Statins:'}</strong> {language === 'bn' ? 'যকৃতে রাতে লিপিড তৈরি বেশি হয় বলে রাতে খাওয়া উত্তম।' : 'Statins work best at bedtime.'}</span>
              </li>
              <li className="flex items-start gap-2 text-purple-900 bg-purple-50 p-2 rounded-lg mt-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'সতর্কতা: হঠাৎ প্রেসারের ওষুধ বন্ধ করলে মারাত্মক ব্রেইন স্ট্রোকের ঝুঁকি থাকে।' : 'Abrupt cessation causes rebound hypertensive emergency.'}</span>
              </li>
            </ul>
          </div>

          {/* Category 6: Pediatric & Maternal Safety */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-teal-50/90 via-white to-white border-2 border-teal-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                {language === 'bn' ? 'শিশু ও মাতৃত্বকালীন স্বাস্থ্য' : 'Pediatric & Maternal'}
              </span>
              <span className="text-teal-600 font-bold text-xs">Weight & Dropper</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi mb-2">
              {language === 'bn' ? 'শিশুর ড্রপ, সিরাপ ও গর্ভকালীন সতর্কতা' : 'Infant Drops & Pregnancy Safety'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'ড্রপ বনাম সিরাপ:' : 'Drop vs Syrup:'}</strong> {language === 'bn' ? 'শিশুর ড্রপ সিরাপের চেয়ে চারগুণ বেশি ঘন, কখনোই আন্দাজে দেবেন না।' : 'Paediatric drops are 4x concentrated than syrup.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>{language === 'bn' ? 'গর্ভকালীন ওষুধ:' : 'Pregnancy:'}</strong> {language === 'bn' ? 'প্রথম ৩ মাসে কোনো ওষুধ চিকিৎসকের লিখিত পরামর্শ ছাড়া গ্রহণ নিষেধ।' : 'Strict physician clearance required during 1st trimester.'}</span>
              </li>
              <li className="flex items-start gap-2 text-teal-900 bg-teal-50 p-2 rounded-lg mt-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{language === 'bn' ? 'পরামর্শ: শিশুর ওষুধ সবসময় সঠিক পরিমাপক চামচ বা সিরিঞ্জ দিয়ে খাওয়ান।' : 'Always use marked oral syringes for infants.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Dangerous Drug-Food Interactions (Crucial & High-Value Knowledge) */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0a2540] to-[#041a30] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-rose-400/30">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'bn' ? 'জরুরি সচেতনতা' : 'DRUG-FOOD INTERACTIONS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-solaiman-lipi">
              {language === 'bn'
                ? 'খাবার ও ওষুধের মারাত্মক বিক্রিয়া: যা আপনার জানা জরুরি'
                : 'Dangerous Drug & Food Interactions: What You Must Know'}
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-bengali-stylish max-w-2xl mx-auto">
              {language === 'bn'
                ? 'কিছু খাবার ওষুধের গুণাগুণ নষ্ট করে বা রক্তে বিষাক্ততা তৈরি করে। সুস্থতার জন্য এই ৪টি সংমিশ্রণ এড়িয়ে চলুন।'
                : 'Certain dietary ingredients block drug bioavailability or induce toxic blood concentration.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Interaction 1: Milk & Antibiotics */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Milk className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-solaiman-lipi mb-1">
                  {language === 'bn' ? 'দুধ/দই + অ্যান্টিবায়োটিক' : 'Milk/Dairy + Antibiotics'}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-2">
                  {language === 'bn' ? '(Ciprofloxacin / Tetracycline)' : 'Ciprofloxacin / Doxycycline'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'দুধের ক্যালসিয়াম ওষুধের সাথে মিশে রক্তে শোষণ ৬০-৮০% আটকে দেয়, ফলে ওষুধ কাজ করে না।'
                    : 'Calcium chelates with the antibiotic molecules, drastically diminishing gastrointestinal absorption.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-emerald-300">
                {language === 'bn' ? '✓ দুধ খাওয়ার ২ ঘণ্টা পর ওষুধ খান' : '✓ Wait 2 hours between dairy and pill'}
              </div>
            </div>

            {/* Interaction 2: Tea/Coffee & Iron */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-rose-400/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Coffee className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-solaiman-lipi mb-1">
                  {language === 'bn' ? 'চা/কফি + আয়রন ট্যাবলেট' : 'Tea/Coffee + Iron Pills'}
                </h4>
                <p className="text-xs text-rose-300 font-semibold mb-2">
                  {language === 'bn' ? '(Ferrous Fumarate / Sulfate)' : 'Iron / Anemia Supplements'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'চায়ের ট্যানিন ও ক্যাফেইন রক্ত তৈরির আয়রন শোষণে বাধা দেয়। লেবুর জলের ভিটামিন সি দিয়ে খাওয়া ভালো।'
                    : 'Tannins bind to dietary and supplemental iron; vitamin C (lemon juice) enhances absorption.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-emerald-300">
                {language === 'bn' ? '✓ চা পানের ১ ঘণ্টা আগে বা পরে নিন' : '✓ Separate by at least 1 hour'}
              </div>
            </div>

            {/* Interaction 3: Grapefruit & Statins */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-400/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                  <Apple className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-solaiman-lipi mb-1">
                  {language === 'bn' ? 'জাম্বুরা + কোলেস্টেরলের ওষুধ' : 'Grapefruit + Statins'}
                </h4>
                <p className="text-xs text-orange-300 font-semibold mb-2">
                  {language === 'bn' ? '(Atorvastatin / Simvastatin)' : 'Cholesterol Reducers'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'জাম্বুরা লিভার এনজাইম CYP3A4 নিষ্ক্রিয় করে ওষুধের রক্তে মাত্রা বিষাক্তভাবে বাড়িয়ে দেয়।'
                    : 'Furanocoumarins inhibit intestinal CYP3A4, triggering toxic statin accumulation and muscle breakdown.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-emerald-300">
                {language === 'bn' ? '✓ স্ট্যাটিন চলাকালীন জাম্বুরা বর্জন করুন' : '✓ Avoid grapefruit on statin therapy'}
              </div>
            </div>

            {/* Interaction 4: Banana & ACE Inhibitors */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-solaiman-lipi mb-1">
                  {language === 'bn' ? 'অতিরিক্ত কলা + প্রেশারের ওষুধ' : 'High Potassium + BP Drugs'}
                </h4>
                <p className="text-xs text-purple-300 font-semibold mb-2">
                  {language === 'bn' ? '(Ramipril / Enalapril / Losartan)' : 'ACE Inhibitors & ARBs'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'এই গ্রুপের ওষুধ শরীরে পটাশিয়াম ধরে রাখে, ফলে অতিরিক্ত কলা বা পটাশিয়ামে হার্টবিট অনিয়মিত হতে পারে।'
                    : 'ACE inhibitors cause potassium retention; excess bananas can induce hyperkalemia and arrhythmias.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-emerald-300">
                {language === 'bn' ? '✓ পটাশিয়াম রক্ত পরীক্ষার পরামর্শ' : '✓ Monitor periodic serum potassium'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Pharmacist Tools: BMI Screener & Paracetamol Dosage Calculator */}
      <section className="bg-gradient-to-br from-teal-900 via-[#0a3556] to-[#092244] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-400/20 text-teal-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-400/30">
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ইন্টারেক্টিভ হেলথ টুলস' : 'INTERACTIVE PHARMACIST TOOLS'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-solaiman-lipi mt-2">
            {language === 'bn'
              ? 'আপনার বিএমআই এবং সঠিক ওষুধের ডোজ ক্যালকুলেটর'
              : 'Body Mass Index & Safe Drug Dosage Calculator'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-bengali-stylish">
            {language === 'bn'
              ? 'রোগীর শারীরিক ওজন ও উচ্চতার ওপর ভিত্তি করে রক্তে ওষুধের বণ্টন ও নিরাপত্তা নির্ধারিত হয়।'
              : 'Precise dosing protects organ clearance and maximizes therapeutic benefit.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Tool 1: Quick BMI Calculator */}
          <div className="bg-white text-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl border border-teal-400/30 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#092244] mb-4 flex items-center justify-between font-solaiman-lipi">
                <span>{language === 'bn' ? '১. বিএমআই ও মেটাবলিজম স্ক্রিনার' : '1. BMI & Metabolism Screener'}</span>
                <Activity className="w-5 h-5 text-teal-600" />
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      {language === 'bn' ? 'উচ্চতা (ফুট)' : 'Height (Feet)'}
                    </label>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-teal-500"
                    >
                      {[4, 5, 6, 7].map((ft) => (
                        <option key={ft} value={ft}>
                          {ft} {language === 'bn' ? 'ফুট' : 'ft'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      {language === 'bn' ? 'উচ্চতা (ইঞ্চি)' : 'Height (Inches)'}
                    </label>
                    <select
                      value={heightInches}
                      onChange={(e) => setHeightInches(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-teal-500"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inch) => (
                        <option key={inch} value={inch}>
                          {inch} {language === 'bn' ? 'ইঞ্চি' : 'in'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{language === 'bn' ? 'ওজন (কেজি)' : 'Weight (kg)'}</span>
                    <span className="text-teal-700 text-sm font-extrabold">{weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="130"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseInt(e.target.value))}
                    className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={calculateBmi}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm py-2.5 rounded-xl shadow-md transition-all active:scale-98"
                >
                  {language === 'bn' ? 'বিএমআই হিসেব করুন' : 'Calculate BMI Now'}
                </button>

                {bmiResult && (
                  <div className={`p-4 rounded-xl border ${bmiResult.color} transition-all`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-extrabold tracking-wider">
                        {language === 'bn' ? 'আপনার স্কোর:' : 'Your BMI Score:'}
                      </span>
                      <span className="text-2xl font-black">{bmiResult.bmi}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold mt-1">{bmiResult.status}</p>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-2 border-t border-slate-200/60 pt-2 leading-relaxed">
                      💡 {bmiResult.advice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tool 2: Weight-based Paracetamol & General Dosage Helper */}
          <div className="bg-white text-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl border border-teal-400/30 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#092244] mb-4 flex items-center justify-between font-solaiman-lipi">
                <span>{language === 'bn' ? '২. ওজন ভিত্তিক নিরাপদ প্যারাসিটামল ডোজ' : '2. Weight-Based Paracetamol Dosage'}</span>
                <Pill className="w-5 h-5 text-emerald-600" />
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{language === 'bn' ? 'রোগী বা শিশুর ওজন (কেজি):' : 'Patient/Child Weight (kg):'}</span>
                    <span className="text-emerald-700 text-base font-black px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                      {patientWeight} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={patientWeight}
                    onChange={(e) => setPatientWeight(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                    <span>৫ কেজি (শিশু)</span>
                    <span>২০ কেজি</span>
                    <span>৫০ কেজি</span>
                    <span>৮০ কেজি (প্রাপ্তবয়স্ক)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[11px] font-bold text-emerald-800 block">
                      {language === 'bn' ? 'প্রতি বারের ডোজ' : 'Single Dose'}
                    </span>
                    <span className="text-xl font-black text-emerald-900 block mt-0.5">
                      ~{dosePerIntakeMg} mg
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      {patientWeight < 35
                        ? language === 'bn' ? `(সিরাপ: ~${syrupMl} মিলি / চামচ)` : `(Syrup: ~${syrupMl} ml)`
                        : language === 'bn' ? '(১টি ৫০০ মিগ্রা ট্যাবলেট)' : '(1x 500mg tab)'}
                    </span>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
                    <span className="text-[11px] font-bold text-rose-800 block">
                      {language === 'bn' ? '২৪ ঘণ্টায় সর্বোচ্চ' : '24h Max Limit'}
                    </span>
                    <span className="text-xl font-black text-rose-900 block mt-0.5">
                      {maxDailyDoseMg} mg
                    </span>
                    <span className="text-[10px] text-rose-700">
                      {language === 'bn' ? '৪ বারের বেশি নয়' : 'Max 4 intakes / day'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                  <p className="font-semibold text-slate-800 flex items-center gap-1 mb-0.5">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    {language === 'bn' ? 'ওষুধ সেফটি নোট:' : 'Medication Safety Note:'}
                  </p>
                  {language === 'bn'
                    ? 'জ্বরের জন্য প্রতিবার ১০-১৫ মিলিগ্রাম প্রতি কেজিতে হিসেবে ৪-৬ ঘণ্টা পর পর সেবনযোগ্য। ৩ দিনের বেশি জ্বর থাকলে রক্ত পরীক্ষার জন্য চিকিৎসকের পরামর্শ নিন।'
                    : '10-15 mg/kg per dose every 4-6 hours. If high fever persists beyond 72 hours, consult a registered physician for dengue/CBC testing.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Node.js Powered Medicine Guidance & Drug Safety Checker */}
      <section className="bg-gradient-to-br from-[#0c2340] to-[#0f3460] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 bg-teal-400/20 text-teal-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>{language === 'bn' ? 'Node.js চালিত ফার্মাকোলজি হেল্পার' : 'Node.js Pharmacology Engine'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-solaiman-lipi">
              {language === 'bn'
                ? 'তাৎক্ষণিক ওষুধ নিরাপত্তা ও সেবনবিধি অনুসন্ধান'
                : 'Instant Medicine Safety & Dosage Guidelines'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-bengali-stylish">
              {language === 'bn'
                ? 'আপনার প্রেসক্রিপশনের যেকোনো ওষুধের নাম (যেমন: Napa, Seclo, Comet, Camlod, Zimax ইত্যাদি) লিখে তাৎক্ষণিক খাবার সাথে সম্পর্ক, সঠিক সময় ও পার্শ্বপ্রতিক্রিয়া জানুন।'
                : 'Search any common medicine name to inspect timing rules, meal interactions, and pharmacist warnings.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-2xl mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-1/2" />
              <input
                type="text"
                value={drugSearchQuery}
                onChange={(e) => setDrugSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleDrugCheck();
                  }
                }}
                placeholder={
                  language === 'bn'
                    ? 'ওষুধের নাম লিখুন (যেমন: Napa, Seclo, Comet, Zimax)...'
                    : 'Search medicine (e.g. Napa, Seclo, Comet, Zimax)...'
                }
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-400 pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:border-teal-400 focus:outline-none text-sm transition-all shadow-inner"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDrugCheck()}
              disabled={isCheckingDrug || !drugSearchQuery.trim()}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isCheckingDrug ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'bn' ? 'যাচাই হচ্ছে...' : 'Checking...'}</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{language === 'bn' ? 'যাচাই করুন' : 'Check Safety'}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Query Pill Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-slate-400 font-semibold">{language === 'bn' ? 'জনপ্রিয় অনুসন্ধান:' : 'Quick Select:'}</span>
            {[
              { label: 'Napa (Paracetamol)', query: 'Napa' },
              { label: 'Seclo (Omeprazole)', query: 'Seclo' },
              { label: 'Comet (Metformin)', query: 'Comet' },
              { label: 'Camlod (Amlodipine)', query: 'Camlod' },
              { label: 'Zimax (Azithromycin)', query: 'Zimax' },
              { label: 'Monas (Montelukast)', query: 'Monas' },
            ].map((item) => (
              <button
                key={item.query}
                type="button"
                onClick={() => {
                  setDrugSearchQuery(item.query);
                  handleDrugCheck(item.query);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-teal-500/30 text-teal-200 hover:text-white border border-white/10 transition-all font-medium text-xs cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Drug Checker Results Card */}
          {drugCheckResult && (
            <div className="bg-white text-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl border-2 border-teal-400/40 animate-fadeIn">
              {drugCheckResult.found ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold uppercase mb-1">
                        <Pill className="w-3.5 h-3.5 text-teal-700" />
                        <span>{language === 'bn' ? drugCheckResult.medicine.categoryBn : drugCheckResult.medicine.category}</span>
                      </div>
                      <h3 className="text-xl font-black text-[#092244] font-solaiman-lipi">
                        {drugCheckResult.medicine.generic}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {language === 'bn' ? 'জনপ্রিয় ব্র্যান্ড নাম:' : 'Common Brands:'}{' '}
                        <span className="text-teal-700 font-bold">{drugCheckResult.medicine.brandNames.join(', ')}</span>
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/8801989044092?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি ${drugCheckResult.medicine.generic} ওষুধটি সম্পর্কে বিস্তারিত পরামর্শ চাই।`)}`}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'সরাসরি পরামর্শ নিন' : 'Consult Pharmacist'}</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {/* Timing */}
                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-900 font-bold mb-1">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{language === 'bn' ? 'সেবনের সঠিক নিয়ম ও সময়' : 'Recommended Timing'}</span>
                      </div>
                      <p className="text-slate-700 font-bengali-stylish text-xs leading-relaxed">
                        {language === 'bn' ? drugCheckResult.medicine.timingBn : drugCheckResult.medicine.timingEn}
                      </p>
                    </div>

                    {/* Warning */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                      <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{language === 'bn' ? 'সতর্কতা ও পার্শ্বপ্রতিক্রিয়া' : 'Safety Warning'}</span>
                      </div>
                      <p className="text-slate-700 font-bengali-stylish text-xs leading-relaxed">
                        {language === 'bn' ? drugCheckResult.medicine.warningBn : drugCheckResult.medicine.warningEn}
                      </p>
                    </div>
                  </div>

                  {/* Counseling Tips */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'bn' ? 'ফার্মাসিস্টের বিশেষ ক্লিনিকাল পরামর্শ:' : 'Pharmacist Clinical Guidance Tips:'}</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 font-bengali-stylish">
                      {(language === 'bn'
                        ? drugCheckResult.medicine.counselingTipsBn
                        : drugCheckResult.medicine.counselingTipsEn
                      ).map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2 border border-teal-200">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800 font-solaiman-lipi mb-1">
                    {language === 'bn' ? 'ব্যক্তিগত ফার্মাসিস্ট পরামর্শ প্রয়োজন' : 'Direct Consultation Recommended'}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-4 font-bengali-stylish leading-relaxed">
                    {language === 'bn'
                      ? drugCheckResult.generalGuidanceBn
                      : drugCheckResult.generalGuidanceEn}
                  </p>
                  <a
                    href={drugCheckResult.whatsappUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{language === 'bn' ? 'নয়ন মন্ডলের সাথে হোয়াটসঅ্যাপে কথা বলুন' : 'Chat with Nayan Mondol on WhatsApp'}</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/90">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'bn' ? 'দৈনন্দিন গাইড' : '24-HOUR MEDICATION TIMING'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092244] font-solaiman-lipi">
              {language === 'bn' ? '২৪ ঘণ্টায় ওষুধ খাওয়ার সঠিক সময় ও রঙিন শিডিউল' : 'Safe 24-Hour Medication Timing Routine'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              {language === 'bn'
                ? 'সঠিক সময়ে ওষুধ না খেলে ড্রাগের কার্যকারিতা ৫০% পর্যন্ত কমে যেতে পারে।'
                : 'Taking medicines at the right physiological time is as important as the medicine itself.'}
            </p>
          </div>

          {/* Timing Tabs - Colorful Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTimingTab('morning')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTimingTab === 'morning'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? '🌅 সকালের ওষুধ' : 'Morning'}
            </button>
            <button
              onClick={() => setActiveTimingTab('noon')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTimingTab === 'noon'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? '☀️ দুপুরের ওষুধ' : 'Noon'}
            </button>
            <button
              onClick={() => setActiveTimingTab('evening')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTimingTab === 'evening'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? '🌆 সন্ধ্যার ওষুধ' : 'Evening'}
            </button>
            <button
              onClick={() => setActiveTimingTab('night')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTimingTab === 'night'
                  ? 'bg-indigo-700 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? '🌙 রাতের ওষুধ' : 'Night'}
            </button>
          </div>
        </div>

        {/* Timing Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeTimingTab === 'morning' && (
            <>
              <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-amber-800 block mb-1">
                  {language === 'bn' ? 'খাবার ২০-৩০ মিনিট পূর্বে' : 'Before Breakfast (20-30m)'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'গ্যাস্ট্রিক ও থাইরয়েড ওষুধ' : 'PPI & Thyroid (Levothyroxine)'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'ওমিপ্রাজল, ইসোমিপ্রাজল ও লেভোথাইরক্সিন খালি পেটে খেলে প্রোটন পাম্প ব্লক করে এসিড নিরাময় ও দ্রুত রক্তে শোষণ ঘটায়।'
                    : 'Levothyroxine and PPIs absorb best on a completely empty stomach with plain water.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/80 border-2 border-teal-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-teal-800 block mb-1">
                  {language === 'bn' ? 'সকালের নাস্তার সাথে' : 'With Breakfast'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'ডায়াবেটিসের ওষুধ ও ভিটামিন ডি' : 'Diabetes (Metformin) & Vit D'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'মেটফরমিন পেটের অস্বস্তি কমাতে নাস্তার সাথে খাওয়া ভালো। ফ্যাট দ্রবণীয় ভিটামিন খাবারের সাথে চমৎকার শোষণ হয়।'
                    : 'Metformin is taken with meals to minimize gastrointestinal discomfort. Fat-soluble vitamins require dietary fats.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/80 border-2 border-blue-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-blue-800 block mb-1">
                  {language === 'bn' ? 'সতর্কতা' : 'Important Note'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'চা বা কফির সাথে নয়' : 'Avoid Tea & Coffee with Pills'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'চা-কফির ক্যাফেইন ও ট্যানিন ওষুধের উপাদানের সাথে মিশে কার্যকারিতা নষ্ট করে। প্রচুর সাধারণ পানি পান করুন।'
                    : 'Never take pills with tea, coffee, or milk. Always drink plenty of regular lukewarm water.'}
                </p>
              </div>
            </>
          )}

          {activeTimingTab === 'noon' && (
            <>
              <div className="p-5 rounded-2xl bg-blue-50/80 border-2 border-blue-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-blue-800 block mb-1">
                  {language === 'bn' ? 'দুপুরের ভারী খাবারের পর' : 'After Lunch'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'ক্যালসিয়াম ও মাল্টিভিটামিন' : 'Calcium Supplements'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'ক্যালসিয়াম কার্বনেট খাবারের পাকস্থলীর অম্লীয় পরিবেশে খুব ভালো শোষিত হয়। পর্যাপ্ত পানি খান।'
                    : 'Calcium carbonate requires stomach acid produced by a full lunch for optimal absorption.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-800 block mb-1">
                  {language === 'bn' ? 'নির্দিষ্ট ব্যবধানে' : 'Exact Interval (e.g. 8-12h)'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'অ্যান্টিবায়োটিকের দ্বিতীয় ডোজ' : 'Midday Antibiotics Dose'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'দিনে ৩ বার থাকলে প্রতি ৮ ঘণ্টা অন্তর অন্তর ঘড়ি ধরে সেবন নিশ্চিত করতে হবে ব্যাকটেরিয়া ধ্বংসের জন্য।'
                    : 'Maintaining therapeutic blood concentration requires precise interval adherence.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/80 border-2 border-rose-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-rose-800 block mb-1">
                  {language === 'bn' ? 'জরুরি নিষেধ' : 'Caution'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'খালি পেটে ব্যথানাশক নয়' : 'Never Take NSAIDs on Empty Stomach'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'প্যারাসিটামল ছাড়া কড়া ব্যথানাশক (যেমন ন্যাপ্রোক্সেন, ডাইক্লোফেনাক) অবশ্যই ভরপেটে খাবেন।'
                    : 'NSAIDs block stomach prostaglandins; never ingest without food to avoid gastric ulcers.'}
                </p>
              </div>
            </>
          )}

          {activeTimingTab === 'evening' && (
            <>
              <div className="p-5 rounded-2xl bg-orange-50/80 border-2 border-orange-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-orange-800 block mb-1">
                  {language === 'bn' ? 'সন্ধ্যার নাস্তার পর' : 'Evening Snack'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'উচ্চ রক্তচাপের ওষুধ (যদি রাতে প্রেসার বাড়ে)' : 'Blood Pressure Check & Dose'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'যাদের রাতে বা ভোরে প্রেশার বাড়ে, চিকিৎসকের পরামর্শে তারা সন্ধ্যার নির্ধারিত সময়ে ওষুধ নেবেন।'
                    : 'Patients experiencing nocturnal hypertension often benefit from monitored evening dosing.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-amber-800 block mb-1">
                  {language === 'bn' ? 'সন্ধ্যার রুটিন' : 'Evening Routine'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'আয়রন ও ফলিক এসিড' : 'Iron Supplements'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'ক্যালসিয়াম খাওয়ার অন্তত ৪ ঘণ্টা পর সন্ধ্যায় বা রাতে আয়রন খাওয়া উত্তম যাতে ক্যালসিয়ামের সাথে সংঘাত না হয়।'
                    : 'Separate iron intake from calcium by at least 4 hours to avoid competitive transport blocking.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/80 border-2 border-purple-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-purple-800 block mb-1">
                  {language === 'bn' ? 'পরামর্শ' : 'Hydration Guide'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'পর্যাপ্ত পানি পান' : 'Drink Sufficient Water'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'কিডনির সুরক্ষা ও ওষুধ শরীর থেকে সুশৃঙ্খলভাবে নির্গমনের জন্য দিনে ২.৫ - ৩ লিটার পানি পান নিশ্চিত করুন।'
                    : 'Adequate hydration safeguards renal clearance and prevents drug precipitation.'}
                </p>
              </div>
            </>
          )}

          {activeTimingTab === 'night' && (
            <>
              <div className="p-5 rounded-2xl bg-indigo-50/80 border-2 border-indigo-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-indigo-800 block mb-1">
                  {language === 'bn' ? 'রাতের খাবারের পর / শোবার আগে' : 'Bedtime'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'লিপিড ও কোলেস্টেরল ওষুধ' : 'Cholesterol Statins'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'যকৃতে (Liver) রাতে কোলেস্টেরল তৈরি বেশি হয়, তাই স্ট্যাটিন গ্রুপের ওষুধ রাতে বেশি কার্যকর।'
                    : 'The hepatic enzyme HMG-CoA reductase peaks at night, making bedtime ideal for statins.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/80 border-2 border-purple-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-purple-800 block mb-1">
                  {language === 'bn' ? 'রাতের সময়' : 'Evening Routine'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'অ্যালার্জি ও হাঁপানির ওষুধ' : 'Antihistamines & Montelukast'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'ঘুমের ভাব আনতে পারে এমন অ্যান্টিহিস্টামিন ও শ্বাসনালীর ওষুধ রাতে সুবিধাজনক।'
                    : 'Sedating antihistamines and nighttime asthma controllers prevent early morning wheezing.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/80 border-2 border-rose-300 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-rose-800 block mb-1">
                  {language === 'bn' ? 'নিরাপত্তা নিয়ম' : 'Sleep Safety'}
                </span>
                <h4 className="text-base font-bold text-[#092244] mb-2 font-solaiman-lipi">
                  {language === 'bn' ? 'ওষুধ খেয়ে সাথে সাথে শোবেন না' : 'Do Not Lie Down Instantly'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bengali-stylish">
                  {language === 'bn'
                    ? 'ওষুধ গিলে অন্তত ১৫ মিনিট সোজা বসে বা দাঁড়িয়ে থাকুন যাতে খাদ্যনালীতে আটকে ক্ষত বা আলসার তৈরি না হয়।'
                    : 'Remain upright for at least 15 minutes after swallowing pills to prevent esophageal ulceration.'}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 8. Medicine Storage & Expiry Guidance (Colourful Info Section) */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-[#06243f] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-400/30">
            <Thermometer className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ড্রাগ স্টোরেজ গাইড' : 'STORAGE & EXPIRY RULES'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-solaiman-lipi">
            {language === 'bn' ? 'ওষুধ সংরক্ষণের বৈজ্ঞানিক নিয়ম ও এক্সপায়রি ডেট' : 'Drug Storage Integrity & Expiry Date Guide'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
              <Thermometer className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-solaiman-lipi mb-2">
              {language === 'bn' ? 'কোল্ড চেইন (২°-৮° সে.)' : 'Cold-Chain (2°-8°C)'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-bengali-stylish">
              {language === 'bn'
                ? 'ইনসুলিন, ভ্যাকসিন ও বায়োলজিক্যাল ওষুধ সাধারণ ফ্রিজে রাখুন। কখনো বরফ করবেন না এবং সরাসরি আলো থেকে দূরে রাখুন।'
                : 'Insulin and biological vials belong on the refrigerator middle shelf. Never place them in deep freeze.'}
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-solaiman-lipi mb-2">
              {language === 'bn' ? 'ড্রাই সিরাপ (৭-১৪ দিন)' : 'Dry Syrup (7-14 Days)'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-bengali-stylish">
              {language === 'bn'
                ? 'ফোটানো ঠাণ্ডা পানি মেশানোর পর ড্রাই সিরাপ সাধারণ তাপমাত্রায় ৭ দিন ও ফ্রিজে ১৪ দিনের বেশি রাখা সম্পূর্ণ নিষেধ।'
                : 'Reconstituted pediatric dry syrups expire within 7 to 14 days. Discard any residual suspension.'}
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-solaiman-lipi mb-2">
              {language === 'bn' ? 'আই/ইয়ার ড্রপ (২৮ দিন)' : 'Eye/Ear Drops (28 Days)'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-bengali-stylish">
              {language === 'bn'
                ? 'ড্রপের সিল খোলার পর বাতাস ঢুকে ব্যাকটেরিয়া জন্মাতে পারে, তাই বোতল খোলার ২৮ দিন পর অবশিষ্ট ড্রপ ফেলে দিন।'
                : 'Ophthalmic and otic drops should be discarded 28 days post opening to prevent bacterial contamination.'}
            </p>
          </div>
        </div>
      </section>

      {/* 9. Patient Trust & Local Testimonials */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'আস্থা ও প্রশংসা' : 'COMMUNITY TRUST'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092244] font-solaiman-lipi">
            {language === 'bn' ? 'রোগী ও নিয়মিত ক্রেতাদের বাস্তব অভিজ্ঞতা' : 'Feedback from Patients & Customers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 bg-white rounded-2xl border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-bengali-stylish">
              {language === 'bn'
                ? '“নয়ন ভাইয়ের কাছে গেলে সবসময় প্রেসক্রিপশনের ওষুধগুলো সুন্দর করে বুঝিয়ে দেন এবং অপ্রয়োজনীয় ওষুধ বাদ দিয়ে সাশ্রয়ী জেনেরিক ব্র্যান্ডের পরামর্শ দেন।”'
                : '“Nayan always explains prescription instructions clearly and points out cost-effective generic alternatives.”'}
            </p>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[#092244] font-solaiman-lipi">
                  {language === 'bn' ? 'মো. রফিকুল ইসলাম' : 'Md. Rafiqul Islam'}
                </h5>
                <span className="text-[11px] text-slate-500 font-bengali-stylish">{language === 'bn' ? 'ব্যবসায়ী, শরীয়তপুর' : 'Local Merchant'}</span>
              </div>
              <span className="text-amber-500 text-xs font-bold">★★★★★</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-bengali-stylish">
              {language === 'bn'
                ? '“ইনসুলিন কীভাবে সংরক্ষণ করতে হবে এবং চামড়ার নিচে পুশ করার সঠিক কোণ কত ডিগ্রি হবে, উনি হাতে-কলমে শিখিয়ে দিয়েছিলেন।”'
                : '“He personally demonstrated the exact subcutaneous angle and temperature storage guidelines for my mother\'s insulin.”'}
            </p>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[#092244] font-solaiman-lipi">
                  {language === 'bn' ? 'সালেহা বেগম' : 'Saleha Begum'}
                </h5>
                <span className="text-[11px] text-slate-500 font-bengali-stylish">{language === 'bn' ? 'গৃহিণী, আঙ্গারিয়া' : 'Homemaker'}</span>
              </div>
              <span className="text-amber-500 text-xs font-bold">★★★★★</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-purple-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-bengali-stylish">
              {language === 'bn'
                ? '“ফার্মেসি সেলসম্যান হিসেবে সততা এবং ফার্মাসিউটিক্যাল জ্ঞানের গভীরতা ওনার কাছে অনন্য। মেয়াদ ও ব্যাচ নম্বর সবসময় নিখুঁত থাকে।”'
                : '“His integrity in retail pharmacy and rigorous attention to batch expiry logs makes him exceptionally reliable.”'}
            </p>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[#092244] font-solaiman-lipi">
                  {language === 'bn' ? 'ডা. তানভীর আহমেদ' : 'Dr. Tanveer Ahmed'}
                </h5>
                <span className="text-[11px] text-slate-500 font-bengali-stylish">{language === 'bn' ? 'মেডিকেল অফিসার' : 'Medical Officer'}</span>
              </div>
              <span className="text-amber-500 text-xs font-bold">★★★★★</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Pharmacy Questions (FAQ) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/90">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'জরুরি জিজ্ঞাসা' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092244] font-solaiman-lipi">
            {language === 'bn' ? 'ওষুধ ও স্বাস্থ্য বিষয়ক সাধারণ প্রশ্নাবলী' : 'Frequently Asked Pharmacy Questions'}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border-2 border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-[#092244] font-solaiman-lipi">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 py-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed font-bengali-stylish border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Action CTA - Connect directly or visit chamber */}
      <section className="bg-gradient-to-r from-teal-800 via-[#072d54] to-[#082140] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-teal-500/30">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
            {language === 'bn' ? 'বিশ্বস্ত স্বাস্থ্যসেবা' : 'TRUSTED HEALTHCARE'}
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-1 font-solaiman-lipi">
            {language === 'bn'
              ? 'প্রেসক্রিপশন বুঝতে কোনো সন্দেহ বা প্রশ্ন আছে?'
              : 'Have Questions About Your Medication or Prescription?'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-xl font-bengali-stylish">
            {language === 'bn'
              ? 'নিরাপদ জীবন ও দ্রুত আরোগ্যের জন্য সরাসরি কল করুন অথবা নিচের আলাদা পেজসমূহ ঘুরে দেখুন।'
              : 'Contact me directly or explore detailed credential pages for comprehensive assistance.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onConsultClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span>{language === 'bn' ? 'সরাসরি পরামর্শ নিন' : 'Request Consultation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 transition-all"
          >
            <span>{language === 'bn' ? 'চেম্বার ঠিকানা দেখুন' : 'Visit Contact Page'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
