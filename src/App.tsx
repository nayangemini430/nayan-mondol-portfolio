/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio, portfolioData } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PageBanner } from './components/PageBanner';
import { BlogPage } from './components/BlogPage';
import { PageQuickNav } from './components/PageQuickNav';
import { PharmacyHomeFeatures } from './components/PharmacyHomeFeatures';
import {
  HireMeModal,
  CVModal,
  ProjectDetailModal,
  ServiceDetailModal,
  LocationModal,
} from './components/Modals';
import { ServiceItem, PortfolioItem } from './components/types';
import { Language } from './components/translations';

type PageId = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'about', 'services', 'portfolio', 'blog', 'contact'];
      if (validPages.includes(hash as PageId)) {
        return hash as PageId;
      }
    }
    return 'home';
  });

  const [language, setLanguage] = useState<Language>('bn'); // Bengali by default
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const [customHeroImage, setCustomHeroImage] = useState<string | null>(() => {
    return localStorage.getItem('nm_hero_image') || null;
  });
  const [customAboutImage, setCustomAboutImage] = useState<string | null>(() => {
    return localStorage.getItem('nm_about_image') || null;
  });
  const [portfolioImages, setPortfolioImages] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('nm_portfolio_images');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Listen to browser hash changes so back/forward and direct links open the right page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'about', 'services', 'portfolio', 'blog', 'contact'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: string) => {
    const validPages: PageId[] = ['home', 'about', 'services', 'portfolio', 'blog', 'contact'];
    if (validPages.includes(page as PageId)) {
      setCurrentPage(page as PageId);
      window.location.hash = '#' + page;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* 1. Top Header with page switcher */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateToPage}
        language={language}
        onToggleLanguage={() => setLanguage((prev: Language) => (prev === 'bn' ? 'en' : 'bn'))}
        onHireMeClick={() => setIsHireMeOpen(true)}
      />

      {/* 2. Main Body: Each page opens separately as requested */}
      <main className="flex-1">
        {/* === HOME PAGE === */}
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Section */}
            <Hero
              language={language}
              customHeroImage={customHeroImage}
              onViewWorkClick={() => navigateToPage('portfolio')}
              onAboutClick={() => navigateToPage('about')}
            />

            {/* Pharmacy Sales & Retail Specialist Rich Features Section */}
            <section className="py-10 sm:py-16 bg-[#f8fbfe] border-t border-slate-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PharmacyHomeFeatures
                  language={language}
                  onConsultClick={() => setIsHireMeOpen(true)}
                  onNavigate={navigateToPage}
                />
              </div>
            </section>
          </div>
        )}

        {/* === ABOUT PAGE (ALADA OPEN) === */}
        {currentPage === 'about' && (
          <div className="animate-fadeIn">
            <PageBanner
              pageTitle={language === 'bn' ? 'আমার পরিচিতি ও ক্যারিয়ার' : 'About Me & Experience'}
              kicker={language === 'bn' ? 'প্রফেশনাল পরিচিতি' : 'PROFESSIONAL PROFILE'}
              pageSubtitle={
                language === 'bn'
                  ? 'ফার্মেসি রিটেইল স্পেশালিস্ট ও মেডিসিন সেলসম্যান হিসেবে ১০+ বছরের বাস্তব অভিজ্ঞতা ও নিষ্ঠাবান সেবা।'
                  : 'Pharmacy Retail Specialist & Medicine Salesman with 10+ years of hands-on experience in Shariatpur.'
              }
              language={language}
              onGoHome={() => navigateToPage('home')}
            />
            <About
              language={language}
              customAboutImage={customAboutImage}
              onDownloadCV={() => setIsCVModalOpen(true)}
            />
            <PageQuickNav
              currentPage={currentPage}
              onNavigate={navigateToPage}
              language={language}
            />
          </div>
        )}

        {/* === SERVICES PAGE (ALADA OPEN) === */}
        {currentPage === 'services' && (
          <div className="animate-fadeIn">
            <PageBanner
              pageTitle={language === 'bn' ? 'ফার্মেসি ও স্বাস্থ্যসেবাসমূহ' : 'Pharmacy & Health Services'}
              kicker={language === 'bn' ? 'আমার সেবাসমূহ' : 'MY SERVICES'}
              pageSubtitle={
                language === 'bn'
                  ? 'নিরাপদ, কার্যকর এবং সঠিক ওষুধ ব্যবহারের জন্য পেশাদার ফার্মাসিউটিক্যাল সহায়তা।'
                  : 'Professional clinical support for safe, effective, and evidence-based medication usage.'
              }
              language={language}
              onGoHome={() => navigateToPage('home')}
            />
            <Services
              language={language}
              onSelectService={(service) => setSelectedService(service)}
            />
            <PageQuickNav
              currentPage={currentPage}
              onNavigate={navigateToPage}
              language={language}
            />
          </div>
        )}

        {/* === PORTFOLIO PAGE (ALADA OPEN) === */}
        {currentPage === 'portfolio' && (
          <div className="animate-fadeIn">
            <PageBanner
              pageTitle={language === 'bn' ? 'পোর্টফোলিও ও সাম্প্রতিক উদ্যোগ' : 'Portfolio & Case Studies'}
              kicker={language === 'bn' ? 'আমার কাজ' : 'RECENT PROJECTS'}
              pageSubtitle={
                language === 'bn'
                  ? 'ফার্মেসি সেবা এবং জনস্বাস্থ্য সচেতনতায় আমার কিছু উল্লেখযোগ্য উদ্যোগ ও বাস্তব কাজ।'
                  : 'Notable projects in patient adherence, medicine reference guides, and community initiatives.'
              }
              language={language}
              onGoHome={() => navigateToPage('home')}
            />
            <Portfolio
              language={language}
              customImages={portfolioImages}
              onSelectProject={(item) => setSelectedProject(item)}
              onViewMoreProjects={() => {
                setSelectedProject({
                  id: 'work-community-drive',
                  title:
                    language === 'bn'
                      ? 'কমিউনিটি স্বাস্থ্য ও ওষুধ সচেতনতা কর্মসূচি'
                      : 'Community Medication Adherence Initiative',
                  subtitle:
                    language === 'bn'
                      ? 'শরীয়তপুর জেলাব্যাপী গ্রামীণ স্বাস্থ্য ও ওষুধ সচেতনতামূলক প্রচারণা।'
                      : 'Comprehensive rural health & medicine outreach in Shariatpur.',
                  category: 'Public Health Outreach',
                  imageType: 'counselling',
                  overview:
                    language === 'bn'
                      ? 'একটি বিশেষ জেলাভিত্তিক স্বাস্থ্য উদ্যোগ যার মাধ্যমে স্থানীয় মানুষদের বিনামূল্যে ওষুধ রিভিউ, ডায়াবেটিস গ্লুকোজ পরীক্ষা এবং সঠিক ডোজ অনুসরণের ওপর প্রশিক্ষণ প্রদান করা হয়।'
                      : 'A dedicated district-level campaign organizing free bi-weekly medication reviews, diabetes glucose monitoring, and patient education on prescription adherence.',
                  highlights: [
                    language === 'bn'
                      ? '৩,০০০+ গ্রামীণ মানুষের সরাসরি ওষুধ বিষয়ক কাউন্সেলিং'
                      : 'Over 3,000 community members counselled on chronic illness management',
                    language === 'bn'
                      ? 'ভুল ডোজিং ও একই ওষুধের দ্বৈত সেবন প্রতিরোধ'
                      : 'Reduced preventable drug duplication and adverse interactions',
                    language === 'bn'
                      ? 'বয়স্ক রোগীদের জন্য পিল অর্গানাইজার এবং সেবন সহায়িকা প্রদান'
                      : 'Supplied low-income households with personalized pill organizers and instructions',
                    language === 'bn'
                      ? 'অ্যান্টিবায়োটিকের সঠিক ব্যবহার ও কোর্স পূর্ণ করার জনসচেতনতা'
                      : 'Conducted rural awareness seminars on safe water reconstitution for antibiotics',
                  ],
                });
              }}
            />
            <PageQuickNav
              currentPage={currentPage}
              onNavigate={navigateToPage}
              language={language}
            />
          </div>
        )}

        {/* === BLOG PAGE (ALADA OPEN) === */}
        {currentPage === 'blog' && (
          <div className="animate-fadeIn">
            <BlogPage
              language={language}
              onGoHome={() => navigateToPage('home')}
              onRequestConsult={() => setIsHireMeOpen(true)}
            />
            <PageQuickNav
              currentPage={currentPage}
              onNavigate={navigateToPage}
              language={language}
            />
          </div>
        )}

        {/* === CONTACT PAGE (ALADA OPEN) === */}
        {currentPage === 'contact' && (
          <div className="animate-fadeIn">
            <PageBanner
              pageTitle={language === 'bn' ? 'যোগাযোগ ও চেম্বার ঠিকানা' : 'Contact & Chamber Details'}
              kicker={language === 'bn' ? 'যোগাযোগ করুন' : 'GET IN TOUCH'}
              pageSubtitle={
                language === 'bn'
                  ? 'কোনো প্রশ্ন, প্রেসক্রিপশন পরামর্শ বা স্বাস্থ্যসেবামূলক সহযোগিতার প্রয়োজনে নির্দ্বিধায় যোগাযোগ করুন।'
                  : 'Reach out for medicine reviews, clinical consultation, or appointments.'
              }
              language={language}
              onGoHome={() => navigateToPage('home')}
            />
            <Contact
              language={language}
              onPharmacyLocationClick={() => setIsLocationModalOpen(true)}
            />
            <PageQuickNav
              currentPage={currentPage}
              onNavigate={navigateToPage}
              language={language}
            />
          </div>
        )}
      </main>

      {/* 3. Footer with page navigation links */}
      <Footer
        currentPage={currentPage}
        onNavigate={navigateToPage}
        language={language}
      />

      {/* Modals & Interactive Overlays */}
      <HireMeModal
        isOpen={isHireMeOpen}
        onClose={() => setIsHireMeOpen(false)}
      />

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ServiceDetailModal
        service={selectedService}
        language={language}
        onClose={() => setSelectedService(null)}
        onRequestConsult={() => setIsHireMeOpen(true)}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />


    </div>
  );
}
