import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for messages and consultations
interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string;
}

interface ConsultationBooking {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed';
}

const contactMessages: ContactMessage[] = [];
const consultationBookings: ConsultationBooking[] = [];

// Drug guidance knowledge base for clinical pharmacology checks
interface DrugInfo {
  generic: string;
  brandNames: string[];
  category: string;
  categoryBn: string;
  timingBn: string;
  timingEn: string;
  warningBn: string;
  warningEn: string;
  counselingTipsBn: string[];
  counselingTipsEn: string[];
}

const drugDatabase: Record<string, DrugInfo> = {
  paracetamol: {
    generic: 'Paracetamol (Acetaminophen)',
    brandNames: ['Napa', 'Ace', 'Fast', 'Renova', 'Pyrex'],
    category: 'Analgesic & Antipyretic',
    categoryBn: 'ব্যথানাশক ও জ্বর প্রশমক',
    timingBn: 'ভরা পেটে বা খালি পেটে সেবন করা যায়, তবে ভরা পেটে সেবন পেটের জন্য আরামদায়ক।',
    timingEn: 'Can be taken with or without food. Taking after meals reduces mild stomach upset.',
    warningBn: 'দৈনিক সর্বোচ্চ ৪ গ্রামের (৮টি ৫০০ মি.গ্রা. ট্যাবলেট) বেশি সেবন করবেন না। অতিরিক্ত সেবনে লিভারের মারাত্মক ক্ষতি হতে পারে। অ্যালকোহল পরিহার করুন।',
    warningEn: 'Do not exceed 4,000 mg (8 x 500mg tablets) in 24 hours. Risk of severe liver damage. Avoid alcohol.',
    counselingTipsBn: [
      'অন্যান্য কাশির ওষুধ বা কম্বিনেশন সিরাপে প্যারাসিটামল আছে কিনা যাচাই করুন (ডাবল ডোজ এড়াতে)।',
      'জ্বর ৩ দিনের বেশি স্থায়ী হলে রেজিস্টার্ড চিকিৎসকের পরামর্শ নিন।',
      'লিভারের অসুখ থাকলে ডাক্তারের নির্দেশ ছাড়া সেবন করবেন না।'
    ],
    counselingTipsEn: [
      'Check other cold/cough combination medicines to avoid accidental duplicate dosing.',
      'Consult a doctor if fever persists for more than 3 consecutive days.',
      'Exercise caution if you have underlying hepatic/liver disorders.'
    ]
  },
  omeprazole: {
    generic: 'Omeprazole / Esomeprazole',
    brandNames: ['Seclo', 'Losectil', 'Maxpro', 'Sergel', 'Nexum'],
    category: 'Proton Pump Inhibitor (PPI)',
    categoryBn: 'গ্যাস্ট্রিক অ্যাসিড নিয়ন্ত্রণকারী (পিপিআই)',
    timingBn: 'সকালে খাবার খাওয়ার ৩০-৬০ মিনিট পূর্বে ভরা পেটে নয়, খালি পেটে পানির সাথে গিলে খেতে হবে।',
    timingEn: 'Take 30 to 60 minutes before morning breakfast with a full glass of water. Swallow whole.',
    warningBn: 'ক্যাপসুল চিবালে বা গুঁড়ো করলে কার্যকারিতা নষ্ট হয়। দীর্ঘমেয়াদি অনিয়ন্ত্রিত ব্যবহারে ক্যালসিয়াম ও ভিটামিন B12 ঘাটতি হতে পারে।',
    warningEn: 'Do not crush or chew capsules. Chronic prolonged use can reduce Calcium and Vitamin B12 absorption.',
    counselingTipsBn: [
      'খাবার খাওয়ার ঠিক আগে বা পরে খেলে কার্যকারিতা অনেকাংশ কমে যায়।',
      'প্রয়োজন ছাড়া মাসের পর মাস একটানা খাওয়া উচিত নয়; খাদ্যতালিকায় তৈলাক্ত খাবার কমান।',
      'অ্যান্টাসিড নেওয়ার প্রয়োজন হলে অন্তত ২ ঘণ্টার ব্যবধান রাখুন।'
    ],
    counselingTipsEn: [
      'Taking it immediately after a meal significantly diminishes gastric acid suppression efficacy.',
      'Avoid unguided prolonged usage; adopt dietary improvements for acidity control.',
      'Space at least 2 hours apart from antacids if co-administered.'
    ]
  },
  metformin: {
    generic: 'Metformin Hydrochloride',
    brandNames: ['Comet', 'Gluconor', 'Insumin', 'Metfo'],
    category: 'Antidiabetic (Biguanide)',
    categoryBn: 'ডায়াবেটিস নিয়ন্ত্রণকারী ওষুধ',
    timingBn: 'খাবারের ঠিক মাঝামাঝি বা খাবারের সাথে সাথে সেবন করুন, খালি পেটে কখনও নয়।',
    timingEn: 'Take with meals or immediately after meals to minimize gastrointestinal distress.',
    warningBn: 'খালি পেটে খেলে গ্যাস্ট্রিক ও ডায়রিয়া হতে পারে। পানিশূন্যতা থাকলে চিকিৎসকের পরামর্শ ছাড়া খাবেন না। রেনাল/কিডনি সমস্যা থাকলে নিয়মিত সিরাম ক্রিয়েটিনিন পরীক্ষা করান।',
    warningEn: 'May cause nausea or diarrhea on empty stomach. Avoid during severe dehydration. Monitor renal function periodically.',
    counselingTipsBn: [
      'নিয়মিত ব্লাড গ্লুকোজ পর্যবেক্ষণ করুন এবং ওষুধের সময় বজায় রাখুন।',
      'বমিভাব হলে ট্যাবলেট খাবারের শেষ লোকমার সাথে গ্রহণ করুন।',
      'অ্যালকোহল গ্রহণ সম্পূর্ণরূপে পরিহার করুন (ল্যাকটিক অ্যাসিডোসিস ঝুঁকি রোধে)।'
    ],
    counselingTipsEn: [
      'Monitor blood glucose regularly and maintain consistent timing daily.',
      'Taking with the largest meal helps prevent nausea and stomach discomfort.',
      'Strictly avoid alcohol to prevent rare lactic acidosis risks.'
    ]
  },
  amlodipine: {
    generic: 'Amlodipine Besylate',
    brandNames: ['Camlod', 'Amlopin', 'Amlovas', 'Lodipin'],
    category: 'Calcium Channel Blocker (Antihypertensive)',
    categoryBn: 'উচ্চ রক্তচাপ নিয়ন্ত্রণকারী ওষুধ',
    timingBn: 'প্রতিদিন নির্দিষ্ট সময়ে (সকালে অথবা রাতে) সেবন করুন। খাবারের সাথে বা খাবার ছাড়াও খাওয়া যায়।',
    timingEn: 'Take at the same time each day (morning or night), with or without food.',
    warningBn: 'হঠাৎ ওষুধ খাওয়া বন্ধ করবেন না, এতে রক্তচাপ বিপজ্জনকভাবে বৃদ্ধি পেতে পারে। পায়ের গোড়ালিতে ফোলাভাব (P腳dema) দেখা দিলে চিকিৎসককে জানান।',
    warningEn: 'Do not abruptly discontinue; may cause rebound hypertension. Report pedal ankle swelling.',
    counselingTipsBn: [
      'বসা বা শোয়া থেকে হঠাৎ দ্রুত উঠে দাঁড়াবেন না (মাথা ঘোরানো এড়াতে)।',
      'প্রতিদিন রক্তচাপ রেকর্ড রাখুন।',
      'লবণ খাওয়া নিয়ন্ত্রণ করুন।'
    ],
    counselingTipsEn: [
      'Rise slowly from sitting or lying down to avoid orthostatic dizziness.',
      'Keep a weekly home blood pressure log.',
      'Maintain dietary sodium restriction.'
    ]
  },
  azithromycin: {
    generic: 'Azithromycin Dihydrate',
    brandNames: ['Zimax', 'Rozith', 'A-One', 'Azith'],
    category: 'Macrolide Antibiotic',
    categoryBn: 'ম্যাক্রোলাইড অ্যান্টিবায়োটিক',
    timingBn: 'খাবারের ১ ঘণ্টা আগে অথবা খাবারের ২ ঘণ্টা পরে সেবন উত্তম (কিছু সাসপেনশন খাবারের সাথেও খাওয়া যায়)।',
    timingEn: 'Best taken 1 hour before or 2 hours after meals with a glass of water.',
    warningBn: 'চিকিৎসকের নির্দেশিত অ্যান্টিবায়োটিকের পুরো কোর্স (সাধারণত ৩-৫ দিন) শেষ করুন। লক্ষণ ভালো হলেও মাঝপথে বন্ধ করবেন না; এতে অ্যান্টিবায়োটিক রেজিস্ট্যান্স তৈরি হয়।',
    warningEn: 'Complete the entire prescribed antibiotic course (typically 3 to 5 days). Never stop early to prevent microbial resistance.',
    counselingTipsBn: [
      'অ্যান্টাসিডের সাথে একসঙ্গে সেবন করবেন না (২ ঘণ্টার ব্যবধান রাখুন)।',
      'প্রতিদিন একই সময়ে সেবন নিশ্চিত করুন।',
      'বাকি থাকা অ্যান্টিবায়োটিক অন্য কাউকে ব্যবহারের পরামর্শ দেবেন না।'
    ],
    counselingTipsEn: [
      'Do not take with aluminum or magnesium antacids simultaneously.',
      'Ensure strict adherence to once-daily dosing timing.',
      'Never share leftover antibiotic doses with others.'
    ]
  },
  montelukast: {
    generic: 'Montelukast Sodium',
    brandNames: ['Monas', 'Provair', 'Montene', 'Lumas'],
    category: 'Leukotriene Receptor Antagonist (Anti-asthmatic / Anti-allergy)',
    categoryBn: 'অ্যালার্জি ও শ্বাসকষ্ট নিরোধক ওষুধ',
    timingBn: 'সাধারণত প্রতিদিন রাতে ঘুমানোর পূর্বে খাবারের সাথে বা ছাড়া সেবন করতে হয়।',
    timingEn: 'Usually taken once daily in the evening, with or without food.',
    warningBn: 'এটি জরুরি অ্যাজমা অ্যাটাকের তাৎক্ষণিক উপশমকারী নয় (ইনহেলার প্রয়োজন)। এটি দীর্ঘমেয়াদী নিয়ন্ত্রণকারী ওষুধ। মেজাজের আকস্মিক পরিবর্তন লক্ষ্য করলে ডাক্তারকে জানান।',
    warningEn: 'Not a rescue inhaler for acute bronchospasms. Regular controller therapy. Report sudden neuro-psychiatric mood changes.',
    counselingTipsBn: [
      'নিয়মিত খেলে শ্বাসকষ্ট ও অ্যালার্জিক রাইনাইটিস নিয়ন্ত্রণে থাকে।',
      'চিউয়েবল ট্যাবলেট হলে চিবিয়ে খেতে হবে।',
      'ধুলোবালি ও অ্যালার্জি উদ্রেককারী পরিবেশ পরিহার করুন।'
    ],
    counselingTipsEn: [
      'Consistent nightly usage keeps allergic rhinitis and asthma under stable control.',
      'Chewable tablets must be chewed completely before swallowing.',
      'Avoid common allergen triggers like dust and smoke.'
    ]
  }
};

async function createServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ==========================================
  // NODE.JS REST API ROUTES
  // ==========================================

  // 1. Health check & Server info
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Nayan Mondol Healthcare & Pharmacy Portal',
      runtime: 'Node.js',
      nodeVersion: process.version,
      platform: process.platform,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      activeFeatures: [
        'Prescription Guidance API',
        'Appointment Booking Engine',
        'Drug Interaction Checker',
        'Patient Inquiry Handler'
      ]
    });
  });

  // 2. Pharmacist Profile API
  app.get('/api/profile', (_req: Request, res: Response) => {
    res.json({
      success: true,
      pharmacist: {
        name: 'Nayan Mondol',
        nameBn: 'নয়ন মন্ডল',
        role: 'Sales Executive & Pharmacy Retail Specialist',
        roleBn: 'সেলস এক্সিকিউটিভ ও ফার্মেসি রিটেইল স্পেশালিস্ট',
        registrationNumber: 'C-Reg: 54921 (Pharmacy Council of Bangladesh)',
        experienceSince: 2017,
        currentYear: 2026,
        totalExperienceYears: 9,
        primaryPhone: '+880 1989 044092',
        cleanPhone: '01989044092',
        whatsappLink: 'https://wa.me/8801989044092',
        email: 'nayanmondol@example.com',
        location: {
          chamberBn: 'দাইয়ান টাওয়ার ফার্মেসি, শরীয়তপুর',
          chamberEn: 'Daiyan Tower Pharmacy, Shariatpur',
          scheduleBn: 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – রাত ১০:৩০ | শুক্রবার: বিকেল ৪:০০ – রাত ১০:০০',
          scheduleEn: 'Sat – Thu: 9:00 AM – 10:30 PM | Friday: 4:00 PM – 10:00 PM'
        },
        stats: {
          patientsAdvised: '15,000+',
          prescriptionsAudited: '45,000+',
          communityCamps: '60+',
          safetyAccuracy: '99.9%'
        }
      }
    });
  });

  // 3. Contact Inquiries API (GET & POST)
  app.get('/api/contact', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: contactMessages.length,
      recentMessages: contactMessages.slice(-10).reverse()
    });
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, phone, serviceType, message } = req.body;

    if (!name || !phone) {
      res.status(400).json({
        success: false,
        error: 'Name and phone number are required.'
      });
      return;
    }

    const newMessage: ContactMessage = {
      id: `MSG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      serviceType: serviceType || 'prescription-review',
      message: String(message || '').trim(),
      createdAt: new Date().toISOString()
    };

    contactMessages.push(newMessage);

    res.status(201).json({
      success: true,
      id: newMessage.id,
      message: 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে। খুব শীঘ্রই নয়ন মন্ডল আপনার সাথে যোগাযোগ করবেন।',
      messageEn: 'Your query has been recorded. Pharmacist Nayan Mondol will reach out shortly.',
      data: newMessage
    });
  });

  // 4. Consultation Booking API (GET & POST)
  app.get('/api/consultations', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: consultationBookings.length,
      bookings: consultationBookings.slice(-10).reverse()
    });
  });

  app.post('/api/consultations', (req: Request, res: Response) => {
    const { name, phone, serviceType, preferredTime, notes } = req.body;

    if (!name || !phone) {
      res.status(400).json({
        success: false,
        error: 'Name and phone number are mandatory.'
      });
      return;
    }

    const newBooking: ConsultationBooking = {
      id: `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      serviceType: serviceType || 'Prescription Review & Counselling',
      preferredTime: preferredTime || 'Morning (10:00 AM - 1:00 PM)',
      notes: String(notes || '').trim(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    consultationBookings.push(newBooking);

    res.status(201).json({
      success: true,
      bookingId: newBooking.id,
      message: 'কনসালটেশন ও অ্যাপয়েন্টমেন্ট আবেদন সফলভাবে নথিভুক্ত হয়েছে!',
      messageEn: 'Consultation appointment application recorded successfully!',
      data: newBooking
    });
  });

  // 5. Drug Safety & Interaction Guidance API
  app.post('/api/drug-checker', (req: Request, res: Response) => {
    const { query } = req.body;
    const cleanQuery = String(query || '').toLowerCase().trim();

    if (!cleanQuery) {
      res.status(400).json({
        success: false,
        error: 'Please specify a medicine name or symptom to search.'
      });
      return;
    }

    // Search in our pharmacology database
    let matchedKey: string | null = null;
    for (const [key, info] of Object.entries(drugDatabase)) {
      if (
        cleanQuery.includes(key) ||
        key.includes(cleanQuery) ||
        info.brandNames.some(b => b.toLowerCase().includes(cleanQuery))
      ) {
        matchedKey = key;
        break;
      }
    }

    if (matchedKey) {
      res.json({
        success: true,
        found: true,
        medicine: drugDatabase[matchedKey],
        contactCounselor: '+880 1989 044092'
      });
      return;
    }

    // Generic safe response
    res.json({
      success: true,
      found: false,
      query: cleanQuery,
      generalGuidanceBn: 'ওষুধটি আমাদের প্রাথমিক ডাটাবেজে সরাসরি পাওয়া যায়নি। তবে যেকোনো প্রেসক্রিপশন ওষুধের সঠিক ডোজ, পার্শ্বপ্রতিক্রিয়া এবং অন্যান্য ওষুধের সাথে মিথস্ক্রিয়া যাচাই করতে সরাসরি আমাদের সাথে যোগাযোগ করুন।',
      generalGuidanceEn: 'Medicine was not found in the instant quick-database. For personalized dose calculation and drug interaction review, contact Pharmacist Nayan Mondol.',
      counselingPhone: '+880 1989 044092',
      whatsappUrl: `https://wa.me/8801989044092?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি '${cleanQuery}' ওষুধটির ডোজ ও পার্শ্বপ্রতিক্রিয়া সম্পর্কে জানতে চাই।`)}`
    });
  });

  // 6. Available Medicines List for quick search suggestions
  app.get('/api/medicines', (_req: Request, res: Response) => {
    const list = Object.entries(drugDatabase).map(([key, data]) => ({
      key,
      generic: data.generic,
      brands: data.brandNames,
      categoryBn: data.categoryBn
    }));
    res.json({ success: true, count: list.length, medicines: list });
  });

  // ==========================================
  // VITE / STATIC CLIENT INTEGRATION
  // ==========================================

  if (process.env.NODE_ENV === 'production') {
    // Production: serve static build output from /dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Development: mount Vite middlewares for hot modules & instant reload
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Start listening
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Node.js Server active at http://0.0.0.0:${PORT}`);
    console.log(`📦 Node.js Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start Node.js server:', err);
  process.exit(1);
});
