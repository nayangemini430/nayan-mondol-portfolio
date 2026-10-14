import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { PortfolioItem } from './types';
import { Language, translations } from './translations';
import {
  PatientCounsellingVisual,
  MedicineGuideVisual,
  PrescriptionReviewVisual,
  HealthAwarenessVisual,
} from './Artwork';

interface PortfolioProps {
  onSelectProject: (item: PortfolioItem) => void;
  onViewMoreProjects: () => void;
  customImages?: Record<string, string>;
  onCustomizeImage?: (projectId: string) => void;
  language: Language;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 'work-counselling',
    title: 'Patient Counselling',
    subtitle: 'Guiding patients for safe medicine use.',
    category: 'Clinical Advisory',
    imageType: 'counselling',
    overview:
      'Conducted over 1,500 personalized patient counselling sessions addressing chronic disease medicine adherence, inhaler usage technique, and antibiotic stewardship.',
    highlights: [
      'Personalized asthma & COPD inhaler spacer technique demonstrations',
      'Diabetes insulin pen usage & hypoglycemia prevention counselling',
      'Hypertension medication timing & lifestyle advisory',
      'Elderly pill organizer management and polypharmacy reduction',
    ],
  },
  {
    id: 'work-medicine-guide',
    title: 'Medicine Information',
    subtitle: 'Quick reference for common medicines.',
    category: 'Pharmacotherapy',
    imageType: 'medicineGuide',
    overview:
      'Authored comprehensive community pharmacy guides on drug-food interactions, proper pediatric suspension reconstitution, and OTC safety parameters.',
    highlights: [
      'Easy-to-read OTC vs. Prescription safety guide for families',
      'Reconstitution & shelf-life handbook for pediatric antibiotics',
      'Food & drug interaction warning charts for cardiovascular patients',
      'Safe analgesics and NSAID precaution guides for renal protection',
    ],
  },
  {
    id: 'work-prescription-review',
    title: 'Prescription Review',
    subtitle: 'Ensuring safe & correct usage.',
    category: 'Quality Assurance',
    imageType: 'prescriptionReview',
    overview:
      'Implemented a rigorous double-check clinical audit system verifying prescription dosage, contraindications, and potential adverse interactions before dispensing.',
    highlights: [
      'Identified and intercepted 120+ clinical drug interactions annually',
      'Direct liaison with prescribing physicians to optimize dosing',
      'Renal dose adjustment verification for elderly patients',
      'Standardized look-alike sound-alike (LASA) safety protocols',
    ],
  },
  {
    id: 'work-health-awareness',
    title: 'Health Awareness',
    subtitle: 'Educating for a healthier community.',
    category: 'Public Health',
    imageType: 'healthAwareness',
    overview:
      'Led local community awareness drives on antimicrobial resistance (AMR), blood pressure screening camps, and rational medication usage in Shariatpur.',
    highlights: [
      'Community campaigns on "Complete Your Antibiotic Course"',
      'Free monthly blood pressure & blood glucose screening days',
      'Dengue awareness and correct fluid management guidance',
      'Storage of heat-sensitive medications during peak summer months',
    ],
  },
];

export const Portfolio: React.FC<PortfolioProps> = ({
  onSelectProject,
  onViewMoreProjects,
  customImages = {},
  onCustomizeImage,
  language,
}) => {
  const t = translations[language].portfolio;

  const renderVisual = (item: PortfolioItem) => {
    const custom = customImages[item.id];
    switch (item.imageType) {
      case 'counselling':
        return <PatientCounsellingVisual customImage={custom} />;
      case 'medicineGuide':
        return <MedicineGuideVisual customImage={custom} />;
      case 'prescriptionReview':
        return <PrescriptionReviewVisual customImage={custom} />;
      case 'healthAwareness':
        return <HealthAwarenessVisual customImage={custom} />;
    }
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[#edf5fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#0284c7] font-bold text-xs sm:text-[13px] tracking-widest uppercase">
            {t.kicker}
          </span>
          <h2 className="text-3xl sm:text-[34px] font-black text-[#092244] tracking-tight mt-1.5 mb-2.5">
            {t.title}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {t.items.map((item, idx) => {
            const rawProject = portfolioData[idx] || portfolioData[0];
            return (
              <div
                key={item.id}
                onClick={() => onSelectProject(rawProject)}
                className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer border border-slate-100"
              >
                {/* Image Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {renderVisual(rawProject)}

                  {/* Quick Change / Customize Photo Button */}
                  {onCustomizeImage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomizeImage(rawProject.id);
                      }}
                      type="button"
                      title={language === 'bn' ? 'ছবি পরিবর্তন বা আপলোড করুন' : 'Change project photo'}
                      className="absolute top-2.5 right-2.5 z-10 bg-white/90 hover:bg-white text-slate-800 hover:text-sky-700 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-slate-200/90 transition-all flex items-center gap-1.5 backdrop-blur-sm opacity-90 hover:opacity-100 hover:scale-105 active:scale-95"
                    >
                      <Camera className="w-3.5 h-3.5 text-sky-600" />
                      <span>{language === 'bn' ? 'ছবি পরিবর্তন' : 'Change'}</span>
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#092244] leading-snug truncate">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-0.5 leading-tight">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-6 h-6 rounded-full bg-[#092244] group-hover:bg-[#0284c7] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered CTA: View More Projects */}
        <div className="text-center">
          <button
            onClick={onViewMoreProjects}
            type="button"
            className="inline-flex items-center gap-2 bg-[#092244] hover:bg-[#0c2f5d] text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-md shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.viewMoreBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
