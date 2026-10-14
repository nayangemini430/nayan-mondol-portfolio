import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Heart,
  Download,
  Award,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Calendar,
  Building2,
  FileCheck,
  Stethoscope,
  Pill,
  Clock,
  Sparkles,
  PhoneCall,
  MapPin,
  TrendingUp,
  UserCheck,
  Compass,
  FileText,
  BadgeAlert,
  ChevronRight,
} from 'lucide-react';
import { AboutPharmacistVisual } from './Artwork';
import { Language, translations } from './translations';

interface AboutProps {
  onDownloadCV: () => void;
  onReplaceAboutPhoto?: () => void;
  customAboutImage?: string | null;
  language: Language;
}

export const About: React.FC<AboutProps> = ({
  onDownloadCV,
  customAboutImage,
  language,
}) => {
  const t = translations[language].about;
  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'dispensing' | 'education'>('all');

  // Interactive career timeline data (Active in profession since 2017)
  const careerTimeline = [
    {
      year: isBn ? '২০১৯ - ২০২৬' : '2019 - 2026',
      role: isBn ? 'সিনিয়র ফার্মেসি সেলস এক্সিকিউটিভ ও ইন-চার্জ' : 'Senior Pharmacy Sales Executive & In-Charge',
      organization: isBn ? 'মেসার্স সিকদার ফার্মেসী (দাইয়ান টাওয়ারের নিচে), আঙ্গারিয়া বাজার, শরীয়তপুর' : 'M/S Sikder Pharmacy (Under Daiyan Tower), Angaria Bazar, Shariatpur',
      category: 'clinical',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      highlights: isBn
        ? [
            'প্রতিদিন রোগীদের চিকিৎসকের প্রেসক্রিপশন দেখে নির্ভুলভাবে সঠিক ওষুধ সরবরাহ করা।',
            'ডায়াবেটিস, প্রেশার ও সাধারণ রোগীদের ওষুধের খাবার সঠিক নিয়ম ও সেবনবিধি আন্তরিকভাবে বুঝিয়ে দেওয়া।',
            'ইনসুলিন ও তাপমাত্রা-সংবেদনশীল ওষুধের কোল্ড-চেইন (২°C-৮°C) কঠোরভাবে বজায় রাখা।',
            '১০০% আসল ও মানসম্পন্ন ওষুধ যাচাই করে পর্যাপ্ত স্টক নিশ্চিতকরণ।',
          ]
        : [
            'Dispensing accurate prescription medicines and guiding patients on dosage regimens.',
            'Counselling chronic diabetes and hypertension patients on proper administration schedules.',
            'Maintaining strict 2°C-8°C cold-chain refrigeration for insulin and biologicals.',
            'Ensuring zero counterfeit products and 100% genuine pharmaceutical inventory.',
          ],
    },
    {
      year: isBn ? '২০১৭ - ২০১৯' : '2017 - 2019',
      role: isBn ? 'ফার্মেসি সেলসম্যান ও কাউন্টার রিটেল এক্সিকিউটিভ' : 'Pharmacy Salesman & Counter Retail Executive',
      organization: isBn ? 'মেডিকেল কর্নার ফার্মেসি, আঙ্গারিয়া বাজার' : 'Medical Corner Pharmacy, Angaria Bazar',
      category: 'dispensing',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      highlights: isBn
        ? [
            '২০১৭ সাল থেকে ফার্মেসি পেশায় যোগদান ও রিটেল সেলসে প্রেসক্রিপশন অনুযায়ী সঠিক ওষুধ সরবরাহ।',
            'ওষুধের মেয়াদ (Expiry Date) নিয়মিত পরীক্ষা ও FEFO নিয়মে স্টক পরিচালনা।',
            'গ্রাহক ও রোগীদের সাথে আন্তরিক আচরণ এবং বিশ্বস্ত কাস্টমার সার্ভিস।',
          ]
        : [
            'Started pharmacy retail career in 2017, dispensing doctor prescriptions accurately.',
            'Systematic expiry checking and FEFO inventory organization.',
            'Building enduring customer relationships through transparent and honest pricing.',
          ],
    },
    {
      year: isBn ? '২০১৭' : '2017',
      role: isBn ? 'ফার্মেসি সেলস ট্রেইনি ও অ্যাসিস্ট্যান্ট' : 'Pharmacy Sales Trainee & Assistant',
      organization: isBn ? 'কমিউনিটি ড্রাগ হাউস, শরীয়তপুর' : 'Community Drug House, Shariatpur',
      category: 'education',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      highlights: isBn
        ? [
            '২০১৭ সালে ফার্মেসির ওষুধ বিন্যাস, ড্রপ ও সিরাপ সেলফে সাজানোর মাধ্যমে কর্মজীবন শুরু।',
            'ওষুধের কোম্পানি, জেনেরিক নাম ও ব্রান্ড চেনার নিবিড় ব্যবহারিক অভিজ্ঞতা অর্জন।',
            'প্রেসক্রিপশন পড়ার প্রাথমিক দক্ষতা ও গ্রাহকসেবা প্র্যাকটিস।',
          ]
        : [
            'Embarked on professional pharmacy retail journey in 2017 with hands-on shelf and brand organization.',
            'Extensive practical learning of medicine brand names and generic classifications.',
            'Customer assistance and prescription reading practice.',
          ],
    },
  ];

  // Professional Core Skills Matrix
  const skillsMatrix = [
    {
      title: isBn ? 'প্রেসক্রিপশন অনুযায়ী ওষুধ নির্বাচন ও সরবরাহ' : 'Prescription Dispensing & Accuracy',
      percent: 98,
      color: 'bg-teal-500',
      desc: isBn ? 'চিকিৎসকের প্রেসক্রিপশন দেখে নির্ভুল ওষুধ চিহ্নিতকরণ ও রোগীকে বুঝিয়ে দেওয়া।' : 'Accurate medicine identification and brand retrieval per prescription.',
    },
    {
      title: isBn ? 'ওষুধের সেবনবিধি ও নিয়ম গাইডেন্স' : 'Patient Medication Guidance',
      percent: 96,
      color: 'bg-blue-500',
      desc: isBn ? 'খাবারের আগে না পরে, কতবার খেতে হবে তা রোগীকে স্পষ্ট ও আন্তরিকভাবে বুঝিয়ে দেওয়া।' : 'Explaining dose timing, before/after meals rules, and inhaler/insulin basics.',
    },
    {
      title: isBn ? 'কোল্ড চেইন ও সঠিক ওষুধ সংরক্ষণ' : 'Cold Chain & Medicine Storage',
      percent: 99,
      color: 'bg-emerald-500',
      desc: isBn ? 'ইনসুলিন ও ভ্যাকসিনের জন্য ২°C - ৮°C তাপমাত্রার রেফ্রিজারেটর নিশ্চিতকরণ।' : 'Strict 2°C - 8°C temperature monitoring for insulin and sensitive medicines.',
    },
    {
      title: isBn ? 'ফার্মেসি সেলস, কাস্টমার সার্ভিস ও ইনভেন্টরি' : 'Pharmacy Sales & Stock Management',
      percent: 97,
      color: 'bg-amber-500',
      desc: isBn ? 'দ্রুত সেবা প্রদান, ন্যায্য মূল্যে ওষুধ বিক্রয় এবং মেয়াদোত্তীর্ণ ওষুধ বর্জন।' : 'Rapid service, transparent pricing, and zero-expiry stock management.',
    },
    {
      title: isBn ? 'প্রাথমিক স্বাস্থ্য সহায়তা ও ব্লাড প্রেশার চেক' : 'First Aid & Health Checks',
      percent: 92,
      color: 'bg-purple-500',
      desc: isBn ? 'রক্তচাপ পরিমাপ, ডায়াবেটিস গ্লুকোজ টেস্ট ও জরুরি প্রাথমিক সহায়তা।' : 'Blood pressure check, glucose monitoring, and safe basic guidance.',
    },
  ];

  // Verified Practical Experience & Capabilities
  const credentials = [
    {
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      title: isBn ? '২০১৭ থেকে ফার্মেসি সেলস অভিজ্ঞতা' : 'Pharmacy Sales Experience Since 2017',
      institute: isBn ? 'মেসার্স সিকদার ফার্মেসী, আঙ্গারিয়া বাজার' : 'M/S Sikder Pharmacy, Angaria Bazar',
      meta: isBn ? 'সরাসরি ওষুধ বিক্রয় ও পেশাদার রিটেল কাস্টমার সার্ভিস' : 'Continuous community retail pharmacy sales practice',
      verified: true,
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      title: isBn ? '১০০% আসল ও খাঁটি ওষুধ নিশ্চয়তা' : '100% Genuine Medicine Guarantee',
      institute: isBn ? 'শীর্ষস্থানীয় ফার্মাসিউটিক্যাল কোম্পানিজ' : 'Square, Beximco, Incepta, Renata & More',
      meta: isBn ? 'কোম্পানি চালান ও ব্যাচ নম্বর যাচাইকৃত আসল ড্রাগ' : 'DGDA-approved authentic manufacturer sourcing',
      verified: true,
    },
    {
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      title: isBn ? 'কোল্ড চেইন ও ওষুধ সংরক্ষণ পারদর্শিতা' : 'Cold-Chain & Storage Excellence',
      institute: isBn ? 'ইনসুলিন, ভ্যাকসিন ও ড্রপ সংরক্ষণ' : 'Insulin & Temperature Sensitive Stock',
      meta: isBn ? '২°C - ৮°C তাপমাত্রায় ড্রাগের কার্যকারিতা অক্ষুণ্ণ রাখা' : 'Continuous 2°C - 8°C refrigeration compliance',
      verified: true,
    },
    {
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      title: isBn ? 'আন্তরিক কাস্টমার সার্ভিস ও রোগী যত্ন' : 'Dedicated Customer Service',
      institute: isBn ? 'কমিউনিটি ও স্থানীয় পরিবারগুলোর গভীর আস্থা' : 'Trusted by Shariatpur Community Families',
      meta: isBn ? 'রোগীদের সঠিক সময়ে ওষুধ খাওয়াতে সার্বক্ষণিক সহযোগিতা' : 'Patient-first compassionate assistance every day',
      verified: true,
    },
  ];

  // Daily Workflow breakdown of Pharmacy Sales Specialist
  const dailyWorkflow = [
    {
      time: isBn ? 'সকাল ৯:০০ - ১০:০০' : '09:00 AM - 10:00 AM',
      task: isBn ? 'ফার্মেসি ওপেনিং ও কোল্ড চেইন চেক' : 'Pharmacy Opening & Cold Chain Check',
      detail: isBn ? 'রেফ্রিজারেটরের তাপমাত্রা (২°-৮° সে.) চেক, ওষুধ সেলফ পরিষ্কার ও সাজানো।' : 'Verifying refrigerator thermometer for insulin and organizing retail racks.',
    },
    {
      time: isBn ? 'সকাল ১০:০০ - দুপুর ২:০০' : '10:00 AM - 02:00 PM',
      task: isBn ? 'প্রেসক্রিপশন অনুযায়ী ওষুধ বিক্রয় ও পরামর্শ' : 'Prescription Dispensing & Guidance',
      detail: isBn ? 'প্রেসক্রিপশন দেখে সঠিক ওষুধ দেওয়া এবং খাওয়ার নিয়ম রোগীকে স্পষ্টভাবে বুঝিয়ে দেওয়া।' : 'Fulfilling doctor prescriptions, calculating dosages, and explaining timing.',
    },
    {
      time: isBn ? 'দুপুর ৩:০০ - বিকাল ৫:০০' : '03:00 PM - 05:00 PM',
      task: isBn ? 'নতুন স্টক গ্রহণ ও মেয়াদ (Expiry) যাচাই' : 'Stock Receipt & Expiry Audit',
      detail: isBn ? 'কোম্পানি চালান মেলানো, ওষুধের মেয়াদ পরীক্ষা এবং সেলফে FEFO নিয়মে সাজানো।' : 'Checking new invoices, verifying expiry dates, and shelf stocking.',
    },
    {
      time: isBn ? 'সন্ধ্যা ৬:০০ - রাত ১০:০০' : '06:00 PM - 10:00 PM',
      task: isBn ? 'গ্রাহক সেবা ও ক্রনিক রোগী সহায়তা' : 'Customer Service & Chronic Patient Care',
      detail: isBn ? 'ডায়াবেটিস ও প্রেশারের রোগীদের নিয়মিত ওষুধের সাপোর্ট ও কাস্টমার সার্ভিস।' : 'Assisting evening patients, chronic medicine refills, and daily reconciliation.',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-blue-50 text-teal-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-200/80 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{isBn ? 'সম্পূর্ণ অভিজ্ঞতা ও ক্যারিয়ার বিবরণ' : 'CAREER & PROFESSIONAL PROFILE'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#092244] tracking-tight font-solaiman-lipi">
            {isBn ? 'নয়ন মন্ডল — ফার্মেসি সেলস অ্যান্ড রিটেল স্পেশালিস্ট' : 'Nayan Mondol — Pharmacy Retail & Sales Specialist'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-bengali-stylish">
            {isBn
              ? 'প্রেসক্রিপশন অনুযায়ী সঠিক ওষুধ সরবরাহ, ১০০% আসল ওষুধ নিশ্চিতকরণ, কোল্ড-চেইন সংরক্ষণ এবং ২০১৭ সাল থেকে আস্থার সাথে ফার্মেসি সেবার বাস্তব অভিজ্ঞতা।'
              : 'Dedicated hands-on pharmacy sales experience since 2017 in genuine medicine dispensing, cold-chain maintenance, and patient care in Shariatpur.'}
          </p>
        </div>

        {/* ================= TOP BIO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Image with badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md">
              <AboutPharmacistVisual
                customImage={customAboutImage}
                className="w-full"
              />
              {/* Quick Info Box underneath image */}
              <div className="mt-4 p-4 bg-gradient-to-br from-slate-50 to-teal-50/40 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-bengali-stylish">
                      {isBn ? 'কর্মস্থল' : 'Workplace'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#092244] font-solaiman-lipi">
                      {isBn ? 'মেসার্স সিকদার ফার্মেসী (দাইয়ান টাওয়ারের নিচে)' : 'M/S Sikder Pharmacy (Under Daiyan Tower)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-bengali-stylish">
                      {isBn ? 'অবস্থান' : 'Location'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#092244] font-solaiman-lipi">
                      {isBn ? 'শরীয়তপুর সদর, বাংলাদেশ' : 'Shariatpur, Bangladesh'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-bengali-stylish">
                      {isBn ? 'অভিজ্ঞতা' : 'Experience'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-teal-700 font-solaiman-lipi">
                      {isBn ? '২০১৭ থেকে বর্তমান (৮+ বছর)' : 'Since 2017 (8+ Years)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-bengali-stylish">
                      {isBn ? 'পরামর্শ সময়' : 'Hours'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 font-solaiman-lipi">
                      {isBn ? 'সকাল ৯:০০ - রাত ১০:০০' : '09:00 AM - 10:00 PM'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-[#0284c7] font-bold text-xs sm:text-sm tracking-widest uppercase mb-1 font-bengali-stylish">
              {t.kicker}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#092244] tracking-tight mb-3 font-solaiman-lipi">
              {t.name} <span className="text-base sm:text-lg font-bold text-teal-600 font-normal">({isBn ? 'ফার্মেসি রিটেইল স্পেশালিস্ট ও মেডিসিন সেলসম্যান' : 'Pharmacy Retail Specialist'})</span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-bengali-stylish">
              {isBn
                ? 'আমি নয়ন মন্ডল। আমি ২০১৭ সাল থেকে নিয়মিত ও নিষ্ঠার সাথে ফার্মেসি পেশায় সেলসম্যান ও রিটেল স্পেশালিস্ট হিসেবে কাজ করে আসছি। আমার মূল দক্ষতা ও অভিজ্ঞতা হলো চিকিৎসকের দেওয়া প্রেসক্রিপশন অনুযায়ী রোগীদের সঠিক ওষুধ সরবরাহ করা এবং ওষুধের সঠিক খাবার নিয়ম স্পষ্ট ভাষায় বুঝিয়ে দেওয়া।'
                : 'I am Nayan Mondol, a seasoned community Pharmacy Salesman and Retail Specialist actively serving in this profession since 2017. My core commitment is accurate prescription dispensing, genuine medicine supply, and clear, compassionate guidance on how and when to take prescribed medications.'}
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-bengali-stylish">
              {isBn
                ? 'শরীয়তপুরের আংগারিয়া বাজারের দাইয়ান টাওয়ার এর নিচে মেসার্স সিকদার ফার্মেসীতে প্রতিদিন শত শত স্থানীয় মানুষ ও রোগীদের পাশে থেকে আমি ইনসুলিন ও সংবেদনশীল ওষুধের কোল্ড-চেইন সংরক্ষণ, জেনুইন ব্র্যান্ডের ওষুধ নিশ্চিতকরণ এবং প্রেসক্রিপশন দেখে বিশ্বস্ততার সাথে সেবা দিয়ে আসছি।'
                : 'At M/S Sikder Pharmacy, located beneath Daiyan Tower in Angaria Bazar, Shariatpur, I serve hundreds of local patients and community members daily—ensuring strict cold-chain preservation for insulin and sensitive medicines, guaranteeing genuine brands, and dispensing doctor prescriptions with trusted integrity.'}
            </p>

            {/* Quick Stat Pill Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-6">
              <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl text-center">
                <span className="text-xl sm:text-2xl font-black text-teal-800 block font-solaiman-lipi">
                  {isBn ? '২০১৭ থেকে' : 'Since 2017'}
                </span>
                <span className="text-[11px] font-semibold text-teal-600 font-bengali-stylish">{isBn ? 'ফার্মেসি পেশায়' : 'In Profession'}</span>
              </div>
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-center">
                <span className="text-xl sm:text-2xl font-black text-blue-800 block font-solaiman-lipi">১০,০০০+</span>
                <span className="text-[11px] font-semibold text-blue-600 font-bengali-stylish">{isBn ? 'সফল ওষুধ সরবরাহ' : 'Prescriptions'}</span>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-800 block font-solaiman-lipi">১০০%</span>
                <span className="text-[11px] font-semibold text-emerald-600 font-bengali-stylish">{isBn ? 'আসল ওষুধের নিশ্চয়তা' : 'Authentic Meds'}</span>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center">
                <span className="text-xl sm:text-2xl font-black text-amber-800 block font-solaiman-lipi">৫,০০০+</span>
                <span className="text-[11px] font-semibold text-amber-600 font-bengali-stylish">{isBn ? 'সেবাপ্রাপ্ত রোগী ও পরিবার' : 'Happy Families'}</span>
              </div>
            </div>

            {/* Download CV & Consultation Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onDownloadCV}
                type="button"
                className="inline-flex items-center gap-2 bg-[#092244] hover:bg-[#0c2f5d] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 font-solaiman-lipi"
              >
                <span>{t.downloadCvBtn}</span>
                <Download className="w-4 h-4" />
              </button>

              <a
                href="tel:+8801989044092"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all duration-150 transform hover:-translate-y-0.5 font-solaiman-lipi"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isBn ? 'জরুরি কল করুন: +৮৮০ ১৯৮৯ ০৪৪০৯২' : 'Call Nayan Mondol'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= VERIFIED ACADEMIC & LICENSING CREDENTIALS ================= */}
        <div className="mb-16">
          <div className="text-left mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block font-bengali-stylish">
                {isBn ? 'পেশাগত অভিজ্ঞতা ও সক্ষমতা' : 'EXPERIENCE & CAPABILITIES'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#092244] font-solaiman-lipi">
                {isBn ? 'বাস্তব কাজের অভিজ্ঞতা ও সেবার নিশ্চয়তা' : 'Hands-on Experience & Service Commitments'}
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isBn ? '১০০% বিশ্বস্ত সেবা' : 'Trusted Experience'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between border-slate-200 group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${cred.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#092244] font-solaiman-lipi mb-1">
                      {cred.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-700 font-bengali-stylish mb-2">
                      {cred.institute}
                    </p>
                    <p className="text-[11px] text-slate-500 font-bengali-stylish">
                      {cred.meta}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-600 font-bengali-stylish">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {isBn ? 'যাচাইকৃত রেকর্ড' : 'Verified'}
                    </span>
                    <span className="text-slate-400">#{(idx + 1).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= DETAILED CAREER & EXPERIENCE TIMELINE ================= */}
        <div className="mb-16 bg-gradient-to-b from-slate-50 to-white p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="max-w-3xl text-left mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block font-bengali-stylish">
              {isBn ? 'কর্মজীবন ও অভিজ্ঞতা' : 'CAREER CHRONOLOGY'}
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#092244] font-solaiman-lipi">
              {isBn ? 'পেশাগত অভিজ্ঞতার ধারাবাহিক টাইমলাইন' : 'Professional Experience & Career History'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              {isBn
                ? '২০১৭ সাল থেকে ফার্মেসি সেলস ট্রেইনি হিসেবে শুরু করে বর্তমান পর্যন্ত মেসার্স সিকদার ফার্মেসীতে নিষ্ঠার সাথে কাজ করে যাওয়ার ধারাবাহিক অভিজ্ঞতা।'
                : 'A dedicated track record since 2017 spanning retail pharmacy counter sales, stock management, and patient-first medicine guidance.'}
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {careerTimeline.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-6 sm:pl-8 border-l-2 border-teal-400/80 bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-teal-600 border-2 border-white shadow-xs" />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item.badgeColor} font-solaiman-lipi`}>
                    {item.year}
                  </span>
                  <span className="text-xs text-slate-500 font-medium font-bengali-stylish flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {item.organization}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#092244] font-solaiman-lipi mb-3">
                  {item.role}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-bengali-stylish">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CLINICAL SKILLS & CORE COMPETENCIES MATRIX ================= */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block font-bengali-stylish">
              {isBn ? 'দক্ষতা ও পারদর্শিতা' : 'EXPERTISE MATRIX'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#092244] font-solaiman-lipi mb-3">
              {isBn ? 'ফার্মেসি সেলস ও রিটেল সার্ভিস দক্ষতা' : 'Pharmacy Sales & Retail Skills'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bengali-stylish mb-6">
              {isBn
                ? 'প্রেসক্রিপশন অনুযায়ী সঠিক ওষুধ নির্বাচন, ইনসুলিনের কোল্ড-চেইন সংরক্ষণ এবং রোগীদের সেবনবিধি বুঝিয়ে দিতে আমার দীর্ঘদিনের ব্যবহারিক পারদর্শিতা।'
                : 'Decade-long practical expertise in prescription decoding, cold-chain refrigeration, and clear customer guidance.'}
            </p>

            <div className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200">
              <h5 className="text-sm font-bold text-teal-900 font-solaiman-lipi mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                {isBn ? 'আমার পেশাগত অঙ্গীকার (My Commitment)' : 'My Commitment'}
              </h5>
              <p className="text-xs text-teal-800 leading-relaxed font-bengali-stylish">
                {isBn
                  ? '“আমি সততা ও আন্তরিকতার সাথে প্রেসক্রিপশন অনুযায়ী আসল ও সঠিক ওষুধ সরবরাহ করতে প্রতিশ্রুতিবদ্ধ। বাণিজ্যিক লাভের চেয়ে রোগীর সুস্বাস্থ্য ও সঠিক সেবাই আমার প্রধান দায়িত্ব।”'
                  : '"I promise to dispense only genuine, properly stored medicines as prescribed, always putting the patient\'s health and safety first with utmost honesty."'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {skillsMatrix.map((skill, sIdx) => (
              <div key={sIdx} className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-[#092244] font-solaiman-lipi">
                    {skill.title}
                  </span>
                  <span className="text-xs font-black text-slate-600 font-solaiman-lipi">
                    {skill.percent}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
                  <div
                    className={`${skill.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 font-bengali-stylish">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= A DAY IN THE LIFE: PROFESSIONAL ROUTINE ================= */}
        <div className="mb-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="text-left mb-8">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block font-bengali-stylish">
              {isBn ? 'কর্মক্ষেত্রের রুটিন' : 'DAILY ROUTINE'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#092244] font-solaiman-lipi">
              {isBn ? 'একজন ফার্মেসি সেলস স্পেশালিস্টের প্রাত্যহিক দায়িত্ব ও কর্মপ্রণালী' : 'Daily Pharmacy Sales & Care Routine'}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-bengali-stylish">
              {isBn
                ? 'ফার্মেসিতে রোগীর সেবায় প্রতিদিন যে নিষ্ঠা ও নিয়মানুবর্তিতা রক্ষা করা হয়।'
                : 'The standardized routines followed daily to ensure patient safety and genuine dispensing.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dailyWorkflow.map((flow, fIdx) => (
              <div key={fIdx} className="p-5 bg-gradient-to-b from-slate-50/80 to-white rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-[11px] font-bold mb-3 border border-indigo-200/80 font-solaiman-lipi">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{flow.time}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#092244] font-solaiman-lipi mb-2">
                    {flow.task}
                  </h4>
                  <p className="text-xs text-slate-600 font-bengali-stylish leading-relaxed">
                    {flow.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-teal-700 font-semibold font-bengali-stylish flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>{isBn ? 'নিয়মিত বাস্তবায়ন' : 'Daily Practice'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM CONTACT / CONSULTATION BANNER ================= */}
        <div className="bg-gradient-to-r from-[#092244] via-[#0d3468] to-[#092244] rounded-3xl p-6 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-widest block font-bengali-stylish mb-1">
              {isBn ? 'সরাসরি যোগাযোগ চান?' : 'NEED MEDICINE ASSISTANCE?'}
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-solaiman-lipi">
              {isBn ? 'প্রেসক্রিপশন অনুযায়ী সঠিক ওষুধ পেতে আমি আছি আপনার পাশে' : 'Consult Nayan Mondol for Accurate Medicine Supply'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-bengali-stylish leading-relaxed">
              {isBn
                ? 'প্রেসক্রিপশন বুঝতে সমস্যা হলে বা ওষুধ প্রাপ্তি সংক্রান্ত তথ্যে নির্দ্বিধায় সরাসরি যোগাযোগ করুন।'
                : 'Contact directly for prescription fulfillment, dosage timing instructions, or chamber inquiries.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+8801989044092"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition font-solaiman-lipi"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isBn ? 'কল করুন: ০১৯৮৯-০৪৪০৯২' : 'Call: +880 1989 044092'}</span>
            </a>
            <button
              onClick={onDownloadCV}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition font-solaiman-lipi"
            >
              <Download className="w-4 h-4" />
              <span>{isBn ? 'সিভি দেখুন ও ডাউনলোড' : 'View CV'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
