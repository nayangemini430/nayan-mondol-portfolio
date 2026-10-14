export interface ServiceItem {
  id: string;
  title: string;
  titleBn?: string;
  badge?: string;
  badgeBn?: string;
  description: string;
  descriptionBn?: string;
  iconName: 'medicine' | 'prescription' | 'counselling' | 'consultation' | 'online';
  fullDescription: string;
  fullDescriptionBn?: string;
  keyBenefits: string[];
  keyBenefitsBn?: string[];
  pharmacistRole?: string;
  pharmacistRoleBn?: string;
  steps?: { title: string; desc: string }[];
  stepsBn?: { title: string; desc: string }[];
  clinicalPrecautions?: string[];
  clinicalPrecautionsBn?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageType: 'counselling' | 'medicineGuide' | 'prescriptionReview' | 'healthAwareness';
  overview: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
}
