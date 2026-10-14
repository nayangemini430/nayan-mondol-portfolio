import React, { useState } from 'react';
import { Search, Calendar, Clock, BookOpen, ArrowRight, Tag, ShieldCheck, Share2 } from 'lucide-react';
import { BlogPost } from './types';
import { Language, translations } from './translations';
import { PageBanner } from './PageBanner';

interface BlogPageProps {
  language: Language;
  onGoHome: () => void;
  onRequestConsult: () => void;
}

export const sampleBlogPosts: BlogPost[] = [
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
      'Always consult your healthcare provider or pharmacy specialist if you have existing high blood pressure or diabetes before selecting OTC cough syrups containing pseudoephedrine.',
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
      'If traveling across districts, use an insulated cooling pouch with cold gel packs, ensuring the medicine does not touch the ice directly.',
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
      'Never purchase antibiotics without a verified registered physician prescription, and never share antibiotics with family members.',
      'Always complete the exact number of days prescribed, even if symptoms vanish entirely.',
    ],
  },
  {
    id: 'post-4',
    title: 'Managing Blood Pressure: The Importance of Taking Medication at the Same Time Every Day',
    date: 'December 2024',
    category: 'Cardiovascular Care',
    readTime: '5 min read',
    summary:
      'Why consistency in timing matters for antihypertensive medications and how to build a fail-safe routine.',
    content: [
      'Blood pressure naturally follows a circadian rhythm, peaking in the morning hours before waking.',
      'Missing a dose or shifting timing erratically leads to blood pressure spikes that strain blood vessels and heart muscles.',
      'Pair taking your pill with a fixed daily habit, such as morning brushing or breakfast, to ensure 100% adherence.',
    ],
  },
];

export const BlogPage: React.FC<BlogPageProps> = ({
  language,
  onGoHome,
  onRequestConsult,
}) => {
  const t = translations[language].blog;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Safe Medicine Use', 'Pharmaceutical Storage', 'Public Health', 'Cardiovascular Care'];

  const filteredPosts = sampleBlogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* 1. Page Banner */}
      <PageBanner
        kicker={t.kicker}
        pageTitle={language === 'bn' ? 'স্বাস্থ্য ও ফার্মাসি ব্লগ' : 'Health & Pharmacy Blog'}
        pageSubtitle={t.subtitle}
        language={language}
        onGoHome={onGoHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* If viewing a single full article */}
        {activeArticle ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveArticle(null)}
              className="text-xs sm:text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline mb-6 inline-flex items-center gap-1.5 font-bengali-stylish"
            >
              {t.backToList}
            </button>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="bg-teal-50 text-teal-700 font-semibold px-2.5 py-1 rounded-full border border-teal-200/60">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#092244] mb-6 leading-snug">
              {activeArticle.title}
            </h1>

            <div className="p-4 bg-teal-50/60 border-l-4 border-teal-500 rounded-r-xl mb-8 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {activeArticle.summary}
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {activeArticle.content.map((paragraph, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="flex-1">{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Author footnote and consultation CTA */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/80 p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  NM
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-[#092244]">নয়ন মন্ডল</h4>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'ফার্মেসি রিটেইল স্পেশালিস্ট' : 'Pharmacy Retail Specialist'}
                  </p>
                </div>
              </div>

              <button
                onClick={onRequestConsult}
                className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all font-bengali-stylish"
              >
                <span>{language === 'bn' ? 'পরামর্শ নিন' : 'Consult Nayan'}</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search and Category Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
              {/* Category buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#082140] text-teal-300 shadow-sm border border-teal-500/30'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat === 'All' ? (language === 'bn' ? 'সকল বিষয়' : 'All Topics') : cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all font-bengali-stylish"
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-700">{t.noResults}</h3>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-3 text-xs text-teal-600 font-semibold hover:underline"
                >
                  {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setActiveArticle(post)}
                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-teal-500 hover:shadow-lg transition-all duration-200 flex flex-col p-6 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="bg-teal-50 text-teal-700 font-semibold px-2.5 py-0.5 rounded-full border border-teal-200/50">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#092244] group-hover:text-teal-700 transition-colors leading-snug mb-2.5">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                      {post.summary}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="text-xs font-semibold text-teal-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bengali-stylish">
                        {t.readMore}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
