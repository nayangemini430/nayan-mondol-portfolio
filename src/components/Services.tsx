import React, { useState } from 'react';
import {
  Pill,
  FileText,
  MessagesSquare,
  BriefcaseMedical,
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  ChevronDown,
  PhoneCall,
  Activity,
  Layers,
  Thermometer,
  ExternalLink,
  BookOpen,
  Info,
  Eye,
  ArrowDownCircle
} from 'lucide-react';
import { ServiceItem } from './types';
import { Language, translations } from './translations';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  language: Language;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'medicine-info',
    title: 'Medicine Information & Safe Dispensing',
    titleBn: 'ওষুধের সঠিক তথ্য ও নিরাপদ ডিসপেন্সিং',
    badge: 'Pharmacology & Dispensing',
    badgeBn: 'ফার্মাকোলজি ও ডিসপেন্সিং',
    description: 'Accurate dosage regimens, timing, drug interactions, and storage guidelines.',
    descriptionBn: 'ওষুধের সঠিক ডোজ, সেবনবিধি, খাবারের সাথে ইন্টারঅ্যাকশন ও সংরক্ষণ নির্দেশিকা।',
    iconName: 'medicine',
    fullDescription:
      'Evidence-based clinical guidance regarding prescription and OTC pharmaceuticals. Ensuring precise dosage regimens, proper administration timing (before/after meals), pediatric/geriatric adjustments, and home storage safety.',
    fullDescriptionBn:
      'নয়ন মন্ডল কর্তৃক প্রেসক্রিপশন ও ওটিসি ওষুধের নির্ভুল ও ব্যবহারিক বিশ্লেষণ। রোগীর বয়স ও ওজন অনুপাতে সঠিক মাত্রা, খাবারের সাথে ইন্টারঅ্যাকশন পরিহার, ড্রাগ টক্সিসিটি প্রতিরোধ এবং সঠিক তাপমাত্রায় ওষুধ সংরক্ষণের সার্বিক গাইডলাইন।',
    pharmacistRole:
      'Analyzing prescription medicines, calculating age/weight appropriate doses, advising on before/after meal timing, and preventing toxic overdosing or missed-dose blunders.',
    pharmacistRoleBn:
      'প্রেসক্রিপশনে উল্লেখিত ওষুধের জেনেরিক নাম ও ব্র্যান্ড বিশ্লেষণ করা, বয়স ও ওজন অনুযায়ী সঠিক ডোজ হিসাব করা, খালি পেটে নাকি ভরা পেটে সেব্য তা সুস্পষ্টভাবে রোগীকে বুঝিয়ে দেওয়া এবং অপ্রয়োজনীয় পার্শ্বপ্রতিক্রিয়া এড়ানোর পরামর্শ প্রদান।',
    keyBenefits: [
      'Accurate dosage and administration guidelines',
      'Food and beverage drug interaction warnings',
      'Proper medicine storage conditions (temperature & humidity)',
      'Pediatric & geriatric specialized dosing calculation',
      'Identification of active ingredients (Generic vs Brand)',
      'Guidance on managing minor side effects at home',
    ],
    keyBenefitsBn: [
      'জেনেরিক ও ব্র্যান্ড নামের নির্ভুল কার্যকারিতা ও ডোজ ব্যাখ্যা',
      'খাবারের আগে বা পরে সেবনের বৈজ্ঞানিক নিয়ম ও সময়ের বিরতি',
      'শিশুদের পেডিয়াট্রিক ও বয়স্কদের জেরিয়াট্রিক ডোজ ক্যালকুলেশন',
      'ওষুধ সংরক্ষণের সঠিক তাপমাত্রা ও আর্দ্রতা (আলো-বাতাস থেকে সুরক্ষা)',
      'ভুল ডোজিং ও ক্ষতিকর পার্শ্বপ্রতিক্রিয়া চিহ্নিতকরণ',
      'ওষুধ সেবন ভুলে গেলে পরবর্তী নিরাপদ পদক্ষেপ নির্দেশনা',
    ],
    steps: [
      {
        title: 'Prescription & Drug Verification',
        desc: 'Validating doctor prescription, drug strength, active generic compounds, and intake frequencies.',
      },
      {
        title: 'Dosage Precision Calculation',
        desc: 'Confirming precision dosing according to patient age, body weight, and kidney/liver functions.',
      },
      {
        title: 'Administration Guidance',
        desc: 'Explaining meal timings, fluid intake intervals, and clear instructions in plain Bengali/English.',
      },
      {
        title: 'Storage & Follow-up',
        desc: 'Advising on moisture/temperature protection, child-resistant storage, and course completion.',
      },
    ],
    stepsBn: [
      {
        title: '১. প্রেসক্রিপশন ও ড্রাগ যাচাইকরণ',
        desc: 'প্রেসক্রিপশনের ওষুধের কার্যকারিতা, স্ট্রেন্থ ও সেবন মাত্রা নিখুঁতভাবে পরীক্ষা ও রেকর্ড করা।',
      },
      {
        title: '২. সঠিক ডোজ ক্যালকুলেশন',
        desc: 'রোগীর বয়স, ওজন ও শারীরিক অবস্থা অনুযায়ী মাত্রার নির্ভুলতা নির্ধারণ ও অতিরিক্ত ডোজ প্রতিরোধ।',
      },
      {
        title: '৩. সেবনবিধি ও খাদ্যের সমন্বয়',
        desc: 'খাবারের আগে বা পরে এবং প্রতিদিন নির্দিষ্ট সময়ে ওষুধ খাওয়ার সুনির্দিষ্ট নিয়ম বুঝিয়ে দেওয়া।',
      },
      {
        title: '৪. সংরক্ষণ ও ফলো-আপ গাইড',
        desc: 'আলো ও আর্দ্রতামুক্ত স্থানে সংরক্ষণ, শিশুদের নাগালের বাইরে রাখা এবং কোর্সের ধারাবাহিকতা নিশ্চিত করা।',
      },
    ],
    clinicalPrecautions: [
      'Never alter antibiotic or steroid doses without consulting a licensed physician.',
      'Take proton-pump inhibitor (PPI) gastric medications 30-45 minutes before breakfast.',
      'Never consume expired medicines or tablets exposed to damp air and direct sunlight.',
    ],
    clinicalPrecautionsBn: [
      'ডাক্তারের নির্দেশ ছাড়া অ্যান্টিবায়োটিক বা স্টেরয়েডের মাত্রা কখনো নিজের সিদ্ধান্তে পরিবর্তন করবেন না।',
      'গ্যাস্ট্রিকের ওষুধ (PPI) খাওয়ার অন্তত ৩০-৪৫ মিনিট পর সকালের প্রধান নাশতা গ্রহণ করুন।',
      'মেয়াদোত্তীর্ণ বা স্যাঁতসেঁতে হয়ে রঙ পরিবর্তিত ট্যাবলেট/ক্যাপসুল কখনো সেবন করবেন না।',
    ],
  },
  {
    id: 'prescription-review',
    title: 'Prescription Clinical Review & Cross-Checking',
    titleBn: 'প্রেসক্রিপশন পর্যালোচনা ও ক্লিনিক্যাল স্ক্রিনিং',
    badge: 'Clinical Audit & Safety',
    badgeBn: 'ক্লিনিক্যাল স্ক্রিনিং ও নিরাপত্তা',
    description: 'Double-checking prescriptions for dangerous drug-drug interactions, polypharmacy risks, and dosage precision.',
    descriptionBn: 'প্রেসক্রিপশনে ড্রাগ ইন্টারঅ্যাকশন, একই গোত্রের ওষুধের ওভারল্যাপ ও ওষুধের নিরাপত্তা যাচাই।',
    iconName: 'prescription',
    fullDescription:
      'In-depth clinical verification of doctor prescriptions across multi-specialty consultations. Screening for polypharmacy hazards, therapeutic duplication, adverse drug reactions, and allergy contraindications.',
    fullDescriptionBn:
      'বিভিন্ন ডাক্তারের দেওয়া একাধিক প্রেসক্রিপশনের মধ্যে ক্ষতিকর ড্রাগ-ড্রাগ ইন্টারঅ্যাকশন এবং একই গোত্রের ওষুধের অপ্রয়োজনীয় ডুপ্লিকেশন প্রতিরোধে সুনির্দিষ্ট পর্যালোচনা। রোগীর অ্যালার্জি ইতিহাস এবং অঙ্গের নিরাপত্তা যাচাই।',
    pharmacistRole:
      'Cross-examining all active medications to prevent conflicting pharmacological mechanisms, eliminating redundant duplicates, and ensuring organ-safe dosing.',
    pharmacistRoleBn:
      'রোগীর একাধিক চিকিৎসকের প্রেসক্রিপশন ক্রস-চেক করে সাংঘর্ষিক ওষুধ শনাক্ত করা, অপ্রয়োজনীয় ওষুধ বাদ দেওয়ার পরামর্শ এবং কিডনি-লিভারের জন্য নিরাপদ কি না তা যাচাই করা।',
    keyBenefits: [
      'Eliminating polypharmacy conflicts from multiple doctor visits',
      'Screening for drug-drug and drug-disease contraindications',
      'Renal and hepatic safety checks for long-term prescriptions',
      'Verification of prescribed strength, frequency, and total course',
      'Cost-effective high-quality generic alternative counselling',
      'Patient allergy and adverse drug reaction (ADR) documentation',
    ],
    keyBenefitsBn: [
      'একাধিক ডাক্তারের প্রেসক্রিপশনের ওষুধে পলिफার্মেসি জটিলতা নিরসন',
      'এক ওষুধের সাথে অন্য ওষুধের ক্ষতিকর বিক্রিয়া (Interaction) শনাক্তকরণ',
      'কিডনি ও লিভারের দীর্ঘমেয়াদী সুরক্ষায় প্রেসক্রিপশন নিরীক্ষণ',
      'ওষুধের মাত্রা (Strength) ও কোর্স মেয়াদের নির্ভুলতা পরীক্ষা',
      'সাশ্রয়ী মূল্যে সমমানের অনুমোদিত জেনেরিক বিকল্প বিষয়ে অবহিতকরণ',
      'পূর্বে ঘটে যাওয়া ড্রাগ অ্যালার্জি ও পার্শ্বপ্রতিক্রিয়ার রেকর্ড যাচাই',
    ],
    steps: [
      {
        title: 'Comprehensive Drug Audit',
        desc: 'Compiling all active prescriptions, chronic drugs, and OTC supplements into one profile.',
      },
      {
        title: 'Interaction Matrix Cross-Check',
        desc: 'Screening with clinical pharmacology databases for severe interactions and contraindications.',
      },
      {
        title: 'Allergy & History Review',
        desc: 'Verifying past allergic episodes (e.g. penicillin, NSAIDs) and underlying systemic illnesses.',
      },
      {
        title: 'Clinical Safety Clearance',
        desc: 'Providing documented review notes and communicating discrepancies with prescribing doctors.',
      },
    ],
    stepsBn: [
      {
        title: '১. পূর্ণাঙ্গ ওষুধ তালিকা তৈরি',
        desc: 'রোগীর বর্তমানে চলমান সকল প্রেসক্রিপশন ও ওটিসি ওষুধের তালিকা একত্রিত করে নিরীক্ষণ।',
      },
      {
        title: '২. ইন্টারঅ্যাকশন ক্রস-চেকিং',
        desc: 'ফার্মাকোলজিক্যাল রেফারেন্স ও ক্লিনিক্যাল ডেটাবেজ দিয়ে ক্ষতিকর ড্রাগ বিক্রিয়া যাচাই।',
      },
      {
        title: '৩. অ্যালার্জি ও রোগ ইতিহাস পরীক্ষা',
        desc: 'পেনিসিলিন, সালফা বা ব্যথানাশকে পূর্ববর্তী অ্যালার্জি এবং দীর্ঘস্থায়ী রোগের ইতিহাস জানা।',
      },
      {
        title: '৪. নিরাপদ ডিসপেন্সিং অনুমোদন',
        desc: 'শতভাগ ঝুঁকিমুক্ত নিশ্চিত করে রোগীকে ওষুধ বুঝিয়ে দেওয়া এবং প্রয়োজনে ডাক্তারের সাথে সমন্বয়।',
      },
    ],
    clinicalPrecautions: [
      'Always carry old prescriptions when visiting a new doctor or purchasing refills.',
      'Never take multiple NSAID painkillers together without pharmacist review.',
      'Inform your pharmacist immediately if you notice hives, rash, or breathing difficulty.',
    ],
    clinicalPrecautionsBn: [
      'নতুন চিকিৎসকের কাছে যাওয়ার সময় সর্বদা পূর্ববর্তী প্রেসক্রিপশন সাথে রাখুন।',
      'একসাথে একাধিক ব্যথানাশক (NSAID) সেবন পরিহার করুন, এতে পেটে আলসার ও কিডনির ক্ষতি হতে পারে।',
      'ওষুধ খেয়ে চুলকানি, লাল চাকা বা শ্বাসকষ্ট দেখা দিলে দ্রুত ওষুধ বন্ধ করে হাসপাতালে যোগাযোগ করুন।',
    ],
  },
  {
    id: 'patient-counselling',
    title: 'Patient Counselling & Medication Therapy Management',
    titleBn: 'রোগী কাউন্সেলিং ও মেডিকেশন ম্যানেজমেন্ট',
    badge: 'One-on-One Counselling',
    badgeBn: 'ব্যক্তিগত কাউন্সেলিং ও কেয়ার',
    description: 'Personalized guidance on chronic disease routine, inhaler/insulin pen technique, and overcoming medication anxiety.',
    descriptionBn: 'ইনহেলার ও ইনসুলিন পেন ব্যবহারের নিয়ম, ক্রনিক রোগের নিয়মিত ওষুধ সেবনের কাউন্সেলিং।',
    iconName: 'counselling',
    fullDescription:
      'Compassionate, one-on-one personalized consultations designed to empower patients. Mastering medical devices like inhalers and insulin pens, adhering to chronic therapy regimens (hypertension, diabetes), and boosting overall treatment outcomes.',
    fullDescriptionBn:
      'রোগীর সাথে সরাসরি আন্তরিক আলোচনা। দীর্ঘমেয়াদী রোগ যেমন উচ্চ রক্তচাপ, ডায়াবেটিস ও হাঁপানির ওষুধ নিয়মিত খাওয়ার মানসিকতা তৈরি, ইনহেলার ও ইনসুলিন পেনের নিখুঁত প্রয়োগ পদ্ধতি প্রদর্শন এবং ওষুধের ভয় দূরীকরণ।',
    pharmacistRole:
      'Demonstrating proper inhalation and injection techniques, creating personalized daily medication schedules, and addressing patient doubts empathetically.',
    pharmacistRoleBn:
      'ইনহেলার ও ইনসুলিন ব্যবহারের সঠিক পদ্ধতি হাতে-কলমে প্রদর্শন করা, ওষুধের দৈনিক রুটিন চার্ট তৈরি করে দেওয়া এবং রোগীর মনের সংশয় ও ভুল ধারণা দূর করা।',
    keyBenefits: [
      'Step-by-step physical demonstration for inhalers and rotahalers',
      'Correct insulin pen injection angles, needle reuse risks, and rotation',
      'Customized daily medicine schedule planner for chronic patients',
      'Handling missed doses safely without dangerous double dosing',
      'Empathetic Bengali and English communication tailored for families',
      'Lifestyle and dietary synergy with prescribed therapeutics',
    ],
    keyBenefitsBn: [
      'ইনহেলার ও রোটাপিলার ব্যবহারের নিখুঁত টেকনিক ও সাধারণ ভুল সংশোধন',
      'ইনসুলিন পেনের সঠিক ৯০° অ্যাঙ্গেল, পুশ পদ্ধতি এবং সাইট পরিবর্তনের নিয়ম',
      'উচ্চ রক্তচাপ ও ডায়াবেটিসের দৈনিক ওষুধ রুটিন চার্ট তৈরি',
      'ওষুধের ডোজ মিস হলে পরবর্তীতে কী করতে হবে তার স্পষ্ট নিয়ম',
      'ওষুধ সংক্রান্ত যেকোনো ভয় ও দ্বিধা দূরীকরণে সহানুভূতিশীল আলোচনা',
      'পথ্য ও জীবনযাত্রার সাথে ওষুধের সময়সূচির চমৎকার সমন্বয়',
    ],
    steps: [
      {
        title: 'Listen to Patient Anxieties',
        desc: 'Identifying barriers to taking medicines on time (forgetfulness, side-effect fear, cost).',
      },
      {
        title: 'Hands-on Device Demo',
        desc: 'Physical demonstration of correct inhalation posture, breath-holding, and insulin injection priming.',
      },
      {
        title: 'Visual Routine Blueprint',
        desc: 'Designing an easy color-coded visual schedule for morning, afternoon, and night dosages.',
      },
      {
        title: 'Caregiver Alignment',
        desc: 'Guiding family members on monitoring adherence and recognizing early hypoglycemia or hypertensive spikes.',
      },
    ],
    stepsBn: [
      {
        title: '১. রোগীর সমস্যা ও দ্বিধা শোনা',
        desc: 'রোগী কেন সময়মতো ওষুধ খেতে পারছেন না বা ওষুধের পার্শ্বপ্রতিক্রিয়ার ভয় পাচ্ছেন তা অনুধাবন।',
      },
      {
        title: '২. বাস্তব ডিভাইস ডেমোনস্ট্রেশন',
        desc: 'ইনহেলার ও ইনসুলিন পেন হাতে দিয়ে শ্বাস নেওয়া ও ধরে রাখার সঠিক কৌশল অনুশীলন করানো।',
      },
      {
        title: '৩. সহজ রুটিন চার্ট প্রদান',
        desc: 'সকাল, দুপুর ও রাতের ওষুধ খাওয়ার রঙিন স্পষ্ট সময়সূচি তৈরি করে দেওয়া।',
      },
      {
        title: '৪. পরিবারের সদস্যদের দিকনির্দেশনা',
        desc: 'পরিবারের সদস্যদের সঠিক মনিটরিং ও রক্তের সুগার কমে যাওয়ার লক্ষণ চেনার উপায় জানানো।',
      },
    ],
    clinicalPrecautions: [
      'Always rinse your mouth thoroughly with clean water after using steroid inhalers to avoid thrush.',
      'Never stop blood pressure or diabetes medication abruptly, even if you feel completely healthy.',
      'Never freeze insulin vials or pens; keep in-use pens at room temperature below 25°C away from sunlight.',
    ],
    clinicalPrecautionsBn: [
      'স্টেরয়েড ইনহেলার ব্যবহারের পরপরই অবশ্যই ভালো করে মুখ কুলি করে পানি ফেলে দিন যাতে মুখের ক্ষত না হয়।',
      'শরীর ভালো লাগলেও চিকিৎসকের পরামর্শ ছাড়া রক্তচাপ বা ডায়াবেটিসের ওষুধ বন্ধ করবেন না।',
      'চলমান ইনসুলিন পেন তীব্র গরমে রাখবেন না এবং কখনোই ডিপ ফ্রিজে বরফ করবেন না।',
    ],
  },
  {
    id: 'health-consultation',
    title: 'Primary Health & Safe OTC Care',
    titleBn: 'প্রাথমিক স্বাস্থ্য ও নিরাপদ ওটিসি কেয়ার',
    badge: 'Primary Pharmacy Care',
    badgeBn: 'প্রাথমিক চিকিৎসা ও পরামর্শ',
    description: 'Safe OTC remedies for seasonal flu, acidity, allergies, first aid guidance, and vitals monitoring.',
    descriptionBn: 'সিজনাল ফ্লু, সাধারণ অ্যালার্জি, গ্যাস্ট্রিক ও ফার্স্ট এইডের নিরাপদ ওটিসি দিকনির্দেশনা।',
    iconName: 'consultation',
    fullDescription:
      'Community-first healthcare triage. Providing safe, evidence-based OTC relief for non-emergency conditions while strictly preventing antimicrobial misuse. Monitoring vital signs and ensuring prompt referral to specialized doctors when required.',
    fullDescriptionBn:
      'কমিউনিটি পর্যায়ে নিরাপদ প্রাথমিক স্বাস্থ্যসেবা। সাধারণ অসুস্থতায় অপ্রয়োজনীয় অ্যান্টিবায়োটিক ব্যবহার বন্ধ করা, নিরাপদ ওটিসি ওষুধ বাছাই, রক্তচাপ ও রক্তের শর্করা পরীক্ষা এবং জটিল ক্ষেত্রে অভিজ্ঞ চিকিৎসকের কাছে রেফার করা।',
    pharmacistRole:
      'Triage assessing mild symptoms, advising safe OTC solutions without antibiotics, monitoring BP and glucose, and referring severe cases promptly.',
    pharmacistRoleBn:
      'রোগীর প্রাথমিক লক্ষণ যাচাই করে কোনো অ্যান্টিবায়োটিক ছাড়াই নিরাপদ ওটিসি ওষুধ দেওয়া, রক্তচাপ ও ব্লাড সুগার মেপে পরামর্শ এবং জটিল লক্ষণে দ্রুত চিকিৎসকের কাছে রেফার করা।',
    keyBenefits: [
      'Evidence-based relief for seasonal flu, sore throat, and allergies',
      'Safe acidity, constipation, and digestive comfort management',
      'Strict antibiotic stewardship (Preventing antimicrobial resistance)',
      'On-site blood pressure and blood glucose screening advice',
      'Burn management, minor wound disinfection, and dressing guidance',
      'Vitamins, minerals, and oral rehydration salt (ORS) guidelines',
    ],
    keyBenefitsBn: [
      'সিজনাল সর্দি-কাশি, গলাব্যথা ও সাধারণ অ্যালার্জির দ্রুত ও নিরাপদ উপশম',
      'গ্যাস্ট্রিক, বুকজ্বালা ও কোষ্ঠকাঠিন্যের বিজ্ঞানসম্মত ওটিসি সমাধান',
      'অ্যান্টিবায়োটিকের অপব্যবহার রোধ ও রেজিস্ট্যান্স সম্পর্কে সচেতনতা',
      'রক্তচাপ (BP) ও ব্লাড গ্লুকোজ নিয়মিত পরিমাপ ও রেকর্ড রাখার পরামর্শ',
      'প্রাথমিক ফার্স্ট-এইড, কাটাছেঁড়া ড্রেসিং ও পোড়া ক্ষতের সঠিক যত্ন',
      'খাবারের স্যালাইন (ORS) ও প্রয়োজনীয় ভিটামিন সাপ্লিমেন্টের সঠিক ব্যবহার',
    ],
    steps: [
      {
        title: 'Symptom Triage Assessment',
        desc: 'Evaluating duration, severity, and identifying red-flag clinical warning signs.',
      },
      {
        title: 'Safe OTC Selection',
        desc: 'Recommending safe non-prescription medications with zero antibiotic misuse.',
      },
      {
        title: 'Vital Signs Check',
        desc: 'Monitoring blood pressure, pulse, or random blood glucose levels with calibrated tools.',
      },
      {
        title: 'Timely Medical Referral',
        desc: 'Directing patients to specialized doctors when symptoms require advanced diagnostic care.',
      },
    ],
    stepsBn: [
      {
        title: '১. প্রাথমিক লক্ষণ ও তীব্রতা মূল্যায়ন',
        desc: 'রোগীর লক্ষণ কতদিনের এবং জটিল কোনো সতর্কবার্তা (Red Flags) আছে কি না তা দেখা।',
      },
      {
        title: '২. নিরাপদ ওটিসি ড্রাগ নির্বাচন',
        desc: 'অ্যান্টিবায়োটিক এড়িয়ে সাধারণ নিরাপদ ওটিসি ওষুধ ও ঘরোয়া সমাধান প্রদান।',
      },
      {
        title: '৩. ভাইটালস স্ক্রিনিং',
        desc: 'ডিজিটাল প্রেসার মেশিন ও গ্লুকোমিটারে সঠিক রিডিং পরীক্ষা ও নোট করে রাখা।',
      },
      {
        title: '৪. চিকিৎসকের কাছে রেফারেল',
        desc: 'জরুরি বা জটিল লক্ষণ দেখা দিলে কালক্ষেপণ না করে বিশেষজ্ঞ ডাক্তারের কাছে পাঠানো।',
      },
    ],
    clinicalPrecautions: [
      'Do not demand or take antibiotics for viral colds, sore throats, and common flu.',
      'Always seek immediate emergency hospital care for severe chest pressure or acute shortness of breath.',
      'Prepare oral rehydration salts with clean, safe boiled drinking water only.',
    ],
    clinicalPrecautionsBn: [
      'সাধারণ ভাইরাল ফ্লু বা সর্দি-কাশিতে ভুলেও নিজে থেকে অ্যান্টিবায়োটিক চেয়ে খাবেন না।',
      'বুকে তীব্র চাপ, অতিরিক্ত শ্বাসকষ্ট বা হঠাৎ মাথা ঘুরে পড়লে দেরি না করে জরুরি হাসপাতালে যান।',
      'খাবারের স্যালাইন (ORS) সবসময় নির্দিষ্ট পরিমাণ বিশুদ্ধ ফুটানো পানিতে তৈরি করুন।',
    ],
  },
  {
    id: 'online-pharmacy-info',
    title: 'Genuine Medicine & Cold-Chain Logistics',
    titleBn: 'জেনুইন ওষুধ যাচাই ও কোল্ড-চেইন নিশ্চিতকরণ',
    badge: 'Cold-Chain & Authenticity',
    badgeBn: 'আসল ওষুধ ও কোল্ড-চেইন ২°-৮°C',
    description: 'Guaranteeing 100% genuine pharmaceuticals, cold-chain temperature preservation, and scarce drug locator.',
    descriptionBn: '১০০% আসল ও অনুমোদিত ওষুধ নিশ্চিতকরণ, ইনসুলিন-ভ্যাকসিনের কোল্ড-চেইন সংরক্ষণ।',
    iconName: 'online',
    fullDescription:
      'Ensuring pharmaceutical integrity from manufacturer to patient. Verifying DGDA regulatory seals, maintaining uninterrupted 2°C-8°C cold chain for insulins, vaccines, and biologics, and sourcing hard-to-find life-saving medications.',
    fullDescriptionBn:
      'কোম্পানি থেকে সরাসরি ১০০% আসল ও ডিজিডিএ অনুমোদিত ওষুধ সরবরাহ নিশ্চিতকরণ। ইনসুলিন, ভ্যাকসিন ও বায়োলজিক্যাল ওষুধের জন্য অবিচ্ছিন্ন ২° থেকে ৮° সে. কোল্ড-চেইন সংরক্ষণ এবং শরীয়তপুরে দুর্লভ জরুরি ওষুধের দ্রুত সন্ধান।',
    pharmacistRole:
      'Inspecting manufacturer packaging, monitoring refrigerator temperature logs twice daily, and guiding patients on sourcing authenticated medicines.',
    pharmacistRoleBn:
      'ওষুধের উৎপাদনকারী কোম্পানির হলোগ্রাম ও ব্যাচ নম্বর যাচাই করা, রেফ্রিজারেটরের তাপমাত্রা (২°-৮° সে.) প্রতিদিন তদারকি করা এবং দুর্লভ ওষুধ সংগ্রহের নিরাপদ পথ দেখানো।',
    keyBenefits: [
      'Verification of DGDA approval, manufacturer hologram, and batch expiry',
      'Strict 2°C to 8°C cold-chain preservation with backup power logs',
      'Identification of counterfeit, substandard, or smuggled pharmaceuticals',
      'Sourcing rare and critical emergency medications across Shariatpur & Dhaka',
      'Guidance on safe travel storage for temperature-sensitive drugs',
      'Safe medication disposal advice for expired or damaged pharmaceuticals',
    ],
    keyBenefitsBn: [
      'ডিজিডিএ অনুমোদন, কোম্পানির হলোগ্রাম ও ব্যাচ মেয়াদোত্তীর্ণ তারিখ যাচাই',
      'ইনসুলিন ও ভ্যাকসিনের জন্য অবিচ্ছিন্ন ২° থেকে ৮° সে. কোল্ড-চেইন সংরক্ষণ',
      'নকল, ভেজাল বা চোরাই ওষুধ চেনার উপায় ও তা পরিহারের পরামর্শ',
      'শরীয়তপুর ও ঢাকায় জরুরি ও দুষ্প্রাপ্য জীবনরক্ষাকারী ওষুধের সন্ধান দেওয়া',
      'তাপমাত্রা-সংবেদনশীল ওষুধ ভ্রমণের সময় আইস-প্যাকে বহন করার নিয়ম',
      'নষ্ট বা মেয়াদোত্তীর্ণ ওষুধ ড্রেন বা উন্মুক্ত স্থানে না ফেলে নিরাপদ ডিসপোজাল',
    ],
    steps: [
      {
        title: 'Regulatory Batch Verification',
        desc: 'Validating official company invoices, manufacturer batch stamps, and registration numbers.',
      },
      {
        title: 'Cold-Chain Log Audit',
        desc: 'Double-checking internal thermometer calibrated readings (2°C - 8°C) twice daily.',
      },
      {
        title: 'Packaging & Seal Integrity',
        desc: 'Inspecting tamper-evident caps, blister foil seals, and intact genuine holograms.',
      },
      {
        title: 'Insulated Safe Delivery',
        desc: 'Dispensing temperature-sensitive biologics with cool packs and usage guides.',
      },
    ],
    stepsBn: [
      {
        title: '১. অনুমোদিত চালান ও ব্যাচ যাচাই',
        desc: 'অফিসিয়াল কোম্পানির ইনভয়েস, ব্যাচ নম্বর ও রেজিস্ট্রেশন সিল পুঙ্খানুপুঙ্খ মেলানো।',
      },
      {
        title: '২. কোল্ড-চেইন থার্মোমিটার অডিট',
        desc: 'ফ্রিজের ডিজিটাল থার্মোমিটারে ২° থেকে ৮° সেন্টিগ্রেড রিডিং দিনে দুবার পরীক্ষা করা।',
      },
      {
        title: '৩. প্যাকেজিং ও সিল পরীক্ষা',
        desc: 'ওষুধের স্ট্রিপ বা ভায়ালের সিল, লেবেল ও হলোগ্রাম অটুট ও অবিকৃত আছে কি না দেখা।',
      },
      {
        title: '৪. কুল-প্যাকে নিরাপদ ডেলিভারি',
        desc: 'ইনসুলিন ও ভ্যাকসিন রোগীকে বুঝিয়ে দেওয়ার সময় ইনসুলেটেড ব্যাগে হস্তান্তর করা।',
      },
    ],
    clinicalPrecautions: [
      'Never purchase loose medicines without intact batch details and manufacturer seals.',
      'Keep insulins away from freezer compartments; freezing irreversibly denatures the protein.',
      'Examine liquid medicines for cloudiness or unusual sedimentation before use.',
    ],
    clinicalPrecautionsBn: [
      'সিলছেঁড়া বা ব্যাচ নম্বর ছাড়া খোলা ওষুধ কখনোই ক্রয় করবেন না।',
      'ইনসুলিন বা ভ্যাকসিন কখনোই ডিপ ফ্রিজে রাখবেন না, বরফ জমে প্রোটিন নষ্ট হয়ে যায়।',
      'তরল সিরাপ বা ইনজেকশনের ওষুধ ঘোলাটে বা তলায় তলানি জমলে তা ব্যবহার করবেন না।',
    ],
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService, language }) => {
  const t = translations[language].services;
  const isBn = language === 'bn';

  // Active selected service: default to first card ('medicine-info')
  const [activeServiceId, setActiveServiceId] = useState<string>('medicine-info');

  const activeService =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  const handleCardClick = (service: ServiceItem, openModal = false) => {
    setActiveServiceId(service.id);

    if (openModal) {
      onSelectService(service);
    }

    // Smoothly scroll down to the full detailed information panel so the user sees it immediately
    setTimeout(() => {
      const panel = document.getElementById('service-details-panel');
      if (panel) {
        const navHeight = 85;
        const panelTop = panel.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: panelTop, behavior: 'smooth' });
      }
    }, 50);
  };

  const renderIcon = (name: ServiceItem['iconName'], isActive: boolean) => {
    const baseClass = isActive
      ? 'w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] text-white shadow-md shadow-blue-500/25 flex items-center justify-center mb-3 transition-transform duration-200 scale-105'
      : 'w-14 h-14 rounded-2xl bg-blue-50 text-[#0284c7] flex items-center justify-center mb-3 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-200 shadow-sm';

    switch (name) {
      case 'medicine':
        return (
          <div className={baseClass}>
            <Pill className="w-7 h-7 transform -rotate-45" />
          </div>
        );
      case 'prescription':
        return (
          <div className={baseClass}>
            <div className="relative">
              <FileText className="w-7 h-7" />
              <span
                className={`absolute -bottom-1 -right-1 text-[9px] font-black px-1 rounded border ${
                  isActive
                    ? 'bg-white text-[#0284c7] border-white'
                    : 'bg-white text-[#092244] border-blue-200'
                }`}
              >
                Rx
              </span>
            </div>
          </div>
        );
      case 'counselling':
        return (
          <div className={baseClass}>
            <MessagesSquare className="w-7 h-7" />
          </div>
        );
      case 'consultation':
        return (
          <div className={baseClass}>
            <BriefcaseMedical className="w-7 h-7" />
          </div>
        );
      case 'online':
        return (
          <div className={baseClass}>
            <ShoppingCart className="w-7 h-7" />
          </div>
        );
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0284c7] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#092244] tracking-tight mt-1 mb-3 font-solaiman-lipi">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-bengali-stylish">
            {t.subtitle}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-200/80 font-bengali-stylish">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {isBn
                ? 'নিচের যেকোনো সেবার কার্ডে ক্লিক করুন — নিচে বিস্তারিত ক্লিনিক্যাল তথ্য প্রদর্শিত হবে।'
                : 'Click any service card below to view comprehensive clinical details.'}
            </span>
          </div>
        </div>

        {/* 5 Cards Horizontal Grid (CSS selector 1 to 5 target these 5 child divs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {servicesData.map((service) => {
            const isActive = service.id === activeServiceId;
            const itemTitle = isBn ? service.titleBn || service.title : service.title;
            const itemDesc = isBn ? service.descriptionBn || service.description : service.description;
            const itemBadge = isBn ? service.badgeBn || 'ফার্মেসি সেবা' : service.badge || 'Service';

              return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service, false)}
                className={`group relative rounded-2xl p-5 border transition-all duration-200 flex flex-col items-center text-center cursor-pointer min-h-[310px] justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-blue-50/90 via-white to-blue-50/40 border-[#0284c7] shadow-xl ring-2 ring-[#0284c7]/40 -translate-y-1'
                    : 'bg-white border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Active Indicator Top Tag */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0284c7] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 uppercase tracking-wide">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>{isBn ? 'নির্বাচিত' : 'Active'}</span>
                  </div>
                )}

                <div className="w-full flex flex-col items-center">
                  {/* Category Pill */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 ${
                      isActive
                        ? 'bg-blue-100 text-[#0284c7]'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}
                  >
                    {itemBadge}
                  </span>

                  {/* Icon */}
                  {renderIcon(service.iconName, isActive)}

                  {/* Title */}
                  <h3
                    className={`text-sm sm:text-[15px] font-bold mb-2 leading-snug font-solaiman-lipi ${
                      isActive ? 'text-[#0284c7]' : 'text-[#092244] group-hover:text-[#0284c7]'
                    }`}
                  >
                    {itemTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-bengali-stylish line-clamp-3 mb-3">
                    {itemDesc}
                  </p>
                </div>

                {/* Bottom Action Area (Click to see full details) */}
                <div className="w-full pt-3 border-t border-slate-100 flex flex-col items-center gap-1.5">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(service, true);
                    }}
                    className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 font-bengali-stylish transition-all cursor-pointer shadow-sm hover:shadow hover:scale-[1.02] active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white ring-2 ring-teal-300'
                        : 'bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white hover:from-[#0369a1] hover:to-[#0284c7]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ক্লিক করে সম্পূর্ণ তথ্য দেখুন' : 'Click to View Full Details'}</span>
                  </span>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(service, false);
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-[#0284c7] flex items-center gap-1 font-bengali-stylish cursor-pointer transition-colors"
                  >
                    <span>
                      {isActive
                        ? (isBn ? '✓ নিচে তথ্য সক্রিয় রয়েছে' : '✓ Details active below')
                        : (isBn ? 'নিচে পেজে দেখুন' : 'View on page below')}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            DYNAMIC SEPARATE FULL DETAILS CONTAINER (ALADA ALADA FULL DETALISH TOTTHO)
            Updates instantly when any div component above is clicked!
        ========================================================================== */}
        <div
          id="service-details-panel"
          className="bg-white rounded-3xl border-2 border-blue-300 shadow-2xl overflow-hidden transition-all duration-300 animate-fadeIn scroll-mt-24 ring-4 ring-blue-500/10"
        >
          {/* Active Notice Top Strip */}
          <div className="bg-[#0369a1] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-bold font-bengali-stylish border-b border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>
                {isBn
                  ? `বর্তমানে প্রদর্শিত সেবা: "${activeService.titleBn || activeService.title}" — নিচে সম্পূর্ণ বিস্তারিত তথ্য যুক্ত করা হয়েছে:`
                  : `Currently Showing: "${activeService.title}" — Full clinical details below:`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md transition-colors text-white"
            >
              <span>{isBn ? '↑ অন্য সেবা নির্বাচন করুন' : '↑ Select Another'}</span>
            </button>
          </div>
          {/* Header Bar with Gradient */}
          <div className="bg-gradient-to-r from-[#092244] via-[#0c2f5d] to-[#0369a1] text-white p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 flex items-center justify-center shrink-0 shadow-lg">
                  {activeService.iconName === 'medicine' && <Pill className="w-8 h-8 -rotate-45" />}
                  {activeService.iconName === 'prescription' && <FileText className="w-8 h-8" />}
                  {activeService.iconName === 'counselling' && <MessagesSquare className="w-8 h-8" />}
                  {activeService.iconName === 'consultation' && <BriefcaseMedical className="w-8 h-8" />}
                  {activeService.iconName === 'online' && <ShoppingCart className="w-8 h-8" />}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-teal-400/20 text-teal-200 text-xs font-bold px-3 py-1 rounded-full border border-teal-300/30 uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                    <span>{isBn ? activeService.badgeBn : activeService.badge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-solaiman-lipi text-white tracking-tight">
                    {isBn ? activeService.titleBn : activeService.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100/90 font-bengali-stylish mt-1">
                    {isBn
                      ? 'নয়ন মন্ডল — ফার্মেসি রিটেল স্পেশালিস্ট ও মেডিসিন সেলসম্যান কর্তৃক প্রদত্ত সেবা'
                      : 'Professional guidance by Nayan Mondol, Pharmacy Retail Specialist'}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <button
                  onClick={() => onSelectService(activeService)}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <ExternalLink className="w-4 h-4 text-teal-300" />
                  <span>{isBn ? 'পপআপে সম্পূর্ণ দেখুন' : 'Open in Modal'}</span>
                </button>
                <a
                  href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                    `হ্যালো নয়ন মন্ডল ভাই, আমি আপনার "${isBn ? activeService.titleBn : activeService.title}" সেবা সম্পর্কে জানতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isBn ? 'সরাসরি পরামর্শ নিন' : 'Direct Consult'}</span>
                </a>
              </div>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs text-blue-200 font-bold shrink-0 mr-2 font-bengali-stylish">
                {isBn ? 'অন্যান্য সেবা নির্বাচন করুন:' : 'Switch Service:'}
              </span>
              {servicesData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all font-bengali-stylish ${
                    s.id === activeServiceId
                      ? 'bg-white text-[#092244] shadow-md font-bold'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {isBn ? s.titleBn?.split(' ')[0] + ' ' + (s.titleBn?.split(' ')[1] || '') : s.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Overview & Pharmacist Role Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Full Description */}
              <div className="lg:col-span-7 bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/70">
                <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  <span>{isBn ? 'সেবার পূর্ণাঙ্গ বিবরণ' : 'Comprehensive Overview'}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 font-bengali-stylish leading-relaxed">
                  {isBn ? activeService.fullDescriptionBn : activeService.fullDescription}
                </p>
              </div>

              {/* Pharmacist Professional Role */}
              <div className="lg:col-span-5 bg-gradient-to-br from-teal-50/90 to-emerald-50/70 p-5 sm:p-6 rounded-2xl border border-teal-200/80">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>{isBn ? 'ফার্মেসি স্পেশালিস্ট হিসেবে আমার দায়িত্ব' : "Specialist's Role & Duty"}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-bengali-stylish leading-relaxed">
                  {isBn ? activeService.pharmacistRoleBn : activeService.pharmacistRole}
                </p>
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0284c7] flex items-center justify-center font-bold text-xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#092244] font-solaiman-lipi">
                    {isBn
                      ? 'ধাপে ধাপে সেবা প্রদানের প্রক্রিয়া (Workflow Steps)'
                      : 'Step-by-Step Clinical Workflow'}
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline-block font-bengali-stylish">
                  {isBn ? '৪টি সুনির্দিষ্ট ক্লিনিক্যাল ধাপ' : '4 Standardized Steps'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(isBn ? activeService.stepsBn : activeService.steps)?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0284c7] font-bold text-xs flex items-center justify-center mb-2.5 border border-blue-200">
                        {idx + 1}
                      </div>
                      <h5 className="text-sm font-bold text-[#092244] font-solaiman-lipi mb-1.5">
                        {step.title}
                      </h5>
                      <p className="text-xs text-slate-600 font-bengali-stylish leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Precautions 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Key Benefits Checklist */}
              <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-sm sm:text-base font-bold text-[#092244] mb-3.5 flex items-center gap-2 font-solaiman-lipi">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>{isBn ? 'সেবার আওতাভুক্ত প্রধান সুবিধাসমূহ' : 'Key Inclusions & Clinical Benefits'}</span>
                </h4>
                <div className="space-y-2.5">
                  {(isBn ? activeService.keyBenefitsBn : activeService.keyBenefits)?.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50/70 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-bengali-stylish leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crucial Precautions Alert Box */}
              <div className="lg:col-span-5 bg-amber-50/80 p-5 sm:p-6 rounded-2xl border border-amber-200/90 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-amber-900 mb-3 flex items-center gap-2 font-solaiman-lipi">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>{isBn ? 'জরুরি সতর্কতা ও রোগীর করণীয়' : 'Crucial Patient Safety Rules'}</span>
                  </h4>
                  <p className="text-xs text-amber-800 font-bengali-stylish mb-3">
                    {isBn
                      ? 'নিরাপদ ওষুধ ব্যবহারের জন্য নিচের নির্দেশনাসমূহ মেনে চলা অত্যন্ত জরুরি:'
                      : 'Adhere to these clinical safety guidelines for optimal results:'}
                  </p>
                  <ul className="space-y-2.5">
                    {(isBn ? activeService.clinicalPrecautionsBn : activeService.clinicalPrecautions)?.map(
                      (prec, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-amber-950 font-bengali-stylish bg-white/70 p-2.5 rounded-lg border border-amber-200/60"
                        >
                          <span className="text-amber-600 font-bold text-sm shrink-0">⚠️</span>
                          <span>{prec}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Direct Action in Warning Box */}
                <div className="mt-5 pt-4 border-t border-amber-200/80 flex items-center justify-between text-xs text-amber-900 font-bengali-stylish">
                  <span className="font-semibold">
                    {isBn ? 'সংশয় থাকলে সাথে সাথে যোগাযোগ করুন' : 'In doubt? Consult immediately.'}
                  </span>
                  <a
                    href="tel:+8801989044092"
                    className="font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
                  >
                    <span>+880 1989 044092</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Quick Consultation CTA */}
            <div className="bg-gradient-to-r from-teal-50 via-blue-50 to-emerald-50 p-5 sm:p-6 rounded-2xl border border-teal-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-base font-bold text-[#092244] font-solaiman-lipi">
                  {isBn
                    ? `"${activeService.titleBn}" বিষয়ে সরাসরি প্রেসক্রিপশন পর্যালোচনা চান?`
                    : `Need personal assistance with ${activeService.title}?`}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 font-bengali-stylish mt-0.5">
                  {isBn
                    ? 'প্রেসক্রিপশনের ছবি পাঠিয়ে বা ফোনে সরাসরি কথা বলে ১০০% নিরাপদ পরামর্শ গ্রহণ করুন।'
                    : 'Send your prescription photo via WhatsApp or call directly for immediate assistance.'}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onSelectService(activeService)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-white hover:bg-slate-50 text-[#092244] border border-slate-300 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  {isBn ? 'পপআপে সম্পূর্ণ দেখুন' : 'View Full Modal'}
                </button>
                <a
                  href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                    `হ্যালো নয়ন মন্ডল ভাই, আমি "${isBn ? activeService.titleBn : activeService.title}" সেবা নিয়ে আলোচনা করতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all text-center flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isBn ? 'WhatsApp-এ প্রেসক্রিপশন পাঠান' : 'Send Rx on WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
