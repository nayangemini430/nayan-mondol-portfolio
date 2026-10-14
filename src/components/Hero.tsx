import React from 'react';
import { ArrowRight, Pill, ShieldCheck, Heart } from 'lucide-react';
import { HeroPharmacistVisual } from './Artwork';
import { Language, translations } from './translations';

interface HeroProps {
  onViewWorkClick: () => void;
  onAboutClick: () => void;
  onReplaceHeroPhoto?: () => void;
  customHeroImage?: string | null;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onViewWorkClick,
  onAboutClick,
  customHeroImage,
  language,
}) => {
  const t = translations[language].hero;

  const typingPhrases = React.useMemo(() => {
    return language === 'bn'
      ? [
          'নয়ন মন্ডল',
          'ফার্মেসি রিটেইল স্পেশালিস্ট',
          'মেডিসিন সেলসম্যান',
          'ওষুধ বিক্রয় ও কাস্টমার সার্ভিস',
          'বিশ্বস্ত ফার্মেসি প্রতিনিধি',
        ]
      : [
          'Nayan Mondol',
          'Pharmacy Retail Specialist',
          'Medicine Salesman',
          'Prescription Dispensing & Retail Care',
          'Trusted Pharmacy Sales Executive',
        ];
  }, [language]);

  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Reset when language changes
  React.useEffect(() => {
    setPhraseIndex(0);
    setCurrentText('');
    setIsDeleting(false);
  }, [language]);

  // Typewriter animation loop
  React.useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex % typingPhrases.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, 95);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingPhrases]);

  const phraseColors = React.useMemo(
    () => [
      { text: 'text-[#082140]', cursor: 'bg-[#082140]' }, // 1. Deep Royal Navy
      { text: 'text-[#059669]', cursor: 'bg-[#059669]' }, // 2. Vibrant Emerald Green
      { text: 'text-[#0284c7]', cursor: 'bg-[#0284c7]' }, // 3. Radiant Cyan Blue
      { text: 'text-[#6366f1]', cursor: 'bg-[#6366f1]' }, // 4. Royal Indigo Violet
      { text: 'text-[#d97706]', cursor: 'bg-[#d97706]' }, // 5. Warm Amber Gold
    ],
    []
  );

  const activeColor = phraseColors[phraseIndex % phraseColors.length];

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#edf5fc] via-[#f0f7fe] to-[#e8f4fc] overflow-hidden pt-10 pb-12 lg:pt-14 lg:pb-16">
      {/* Colorful ambient background glows */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Kicker */}
            <span className="text-[#0284c7] font-bold text-xs sm:text-[13px] tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              {t.kicker}
            </span>

            {/* Name with Typing / Writing Animation */}
            <h1 className="text-2xl sm:text-4xl lg:text-[48px] font-black text-[#092244] tracking-tight leading-[1.25] min-h-[52px] sm:min-h-[72px] flex items-center flex-wrap overflow-visible py-1">
              <span
                className={`font-hero-typing font-extrabold tracking-tight transition-colors duration-300 ${activeColor.text} py-1 inline-block leading-[1.25] overflow-visible drop-shadow-sm`}
              >
                {currentText || '\u00A0'}
              </span>
              <span
                aria-hidden="true"
                className={`inline-block w-1 sm:w-1.5 h-6 sm:h-10 ${activeColor.cursor} ml-1.5 animate-pulse rounded-full align-middle transition-colors duration-300`}
              />
            </h1>

            {/* Badge */}
            <div className="mt-2.5 mb-4 inline-flex items-center gap-2">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.roleBadge}
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold px-3 py-1 rounded-full">
                {language === 'bn' ? 'ফার্মেসি সেলস অ্যান্ড রিটেল স্পেশালিস্ট' : 'Pharmacy Sales & Retail Specialist'}
              </span>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed max-w-[480px] mb-7 font-bengali-stylish">
              {t.subtitle}
            </p>

            {/* Action Buttons - Fully Responsive */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3.5 mb-7 w-full sm:w-auto">
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  onViewWorkClick();
                }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#092244] to-[#0d3460] hover:from-[#0c2f5d] hover:to-[#12427a] text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>{t.viewWorkBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onAboutClick();
                }}
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#092244] border-2 border-slate-300 hover:border-teal-500 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                {t.aboutMeBtn}
              </a>
            </div>

            {/* Three Trust Indicators - Colorful Badges */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-4 w-full max-w-lg pt-4 border-t border-slate-200/80">
              {/* Trust Item 1 */}
              <div className="flex items-center gap-2.5 p-2 bg-emerald-50/80 border border-emerald-200/70 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Pill className="w-4 h-4 transform -rotate-45" />
                </div>
                <div className="leading-tight min-w-0">
                  <span className="block text-xs font-bold text-emerald-950 font-solaiman-lipi">{t.trustItem1[0]}</span>
                  <span className="block text-xs font-semibold text-emerald-800 font-bengali-stylish">{t.trustItem1[1]}</span>
                </div>
              </div>

              {/* Trust Item 2 */}
              <div className="flex items-center gap-2.5 p-2 bg-blue-50/80 border border-blue-200/70 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <span className="block text-xs font-bold text-blue-950 font-solaiman-lipi">{t.trustItem2[0]}</span>
                  <span className="block text-xs font-semibold text-blue-800 font-bengali-stylish">{t.trustItem2[1]}</span>
                </div>
              </div>

              {/* Trust Item 3 */}
              <div className="flex items-center gap-2.5 p-2 bg-rose-50/80 border border-rose-200/70 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <span className="block text-xs font-bold text-rose-950 font-solaiman-lipi">{t.trustItem3[0]}</span>
                  <span className="block text-xs font-semibold text-rose-800 font-bengali-stylish">{t.trustItem3[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Portrait Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <HeroPharmacistVisual
              customImage={customHeroImage}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
