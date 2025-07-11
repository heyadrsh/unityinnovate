// Strapi Content Types TypeScript Definitions

export interface StrapiImage {
  url: string;
  alternativeText?: string;
  name?: string;
}

export interface StrapiBlog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string; // Markdown content
  excerpt: string;
  publicationDate: string;
  isPublished: boolean;
  featuredImage?: StrapiImage;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string; // Markdown content
  excerpt: string;
  publicationDate: string;
  isPublished: boolean;
  featuredImage?: StrapiImage;
  attachments?: StrapiImage[];
  researchType?: string;
  citations?: string;
}

export interface StrapiCaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  clientName: string;
  industry: string;
  challenge: string; // Markdown content
  solution: string; // Markdown content
  results: string; // Markdown content
  publicationDate: string;
  isPublished: boolean;
  featuredImage?: StrapiImage;
  gallery?: StrapiImage[];
}

export interface StrapiResponse<T> {
  data: T[];
  meta: any;
}

export interface StrapiSingleResponse<T> {
  data: T;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

// Collection Types
export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: any; // Rich text blocks
  excerpt: string;
  publicationDate: string;
  isPublished: boolean;
  featuredImage: StrapiMedia;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  content: any; // Rich text blocks
  excerpt: string;
  clientName: string;
  industry: string;
  challenge: any; // Rich text blocks
  solution: any; // Rich text blocks
  results: any; // Rich text blocks
  publicationDate: string;
  isPublished: boolean;
  featuredImage: StrapiMedia;
  gallery?: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: any; // Rich text blocks
  excerpt: string;
  publicationDate: string;
  isPublished: boolean;
  featuredImage: StrapiMedia;
  attachments?: StrapiMedia[];
  researchType?: 'Research Paper' | 'Whitepaper' | 'Industry Report' | 'Analysis';
  citations?: string;
  createdAt: string;
  updatedAt: string;
}

// Jobs
export interface StrapiJob {
  id: number;
  title: string;
  department: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
  salaryRange?: string;
  applicationDeadline?: string;
  experienceLevel?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
  isActive: boolean;
  benefits?: string; // Rich text (Markdown)
  applicationInstructions?: string; // Rich text (Markdown)
  responsibilities: string; // Rich text (Markdown)
  requirements: string; // Rich text (Markdown)
  description: string; // Rich text (Markdown)
  createdAt: string;
  updatedAt: string;
}

// Team Members (Updated for markdown support)
export interface StrapiTeamMember {
  id: number;
  fullName: string;
  position: string;
  bio: string; // Rich text (Markdown)
  email?: string;
  orderIndex?: string;
  isActive: boolean;
  photo: StrapiMedia;
  linkedinUrl?: string;
  twitterUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Services
export interface StrapiService {
  id: number;
  name: string;
  slug: string;
  description: string; // Rich text (Markdown)
  shortDescription: string;
  features?: any; // JSON
  orderIndex?: number;
  isActive: boolean;
  icon?: string;
  featuredImage?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  description: any; // Rich text blocks
  shortDescription: string;
  solutions?: any; // JSON
  orderIndex?: number;
  isActive: boolean;
  icon?: string;
  featuredImage?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmission {
  id: number;
  formType: 'Contact' | 'Career' | 'Newsletter' | 'Consultation';
  formData: any; // JSON
  submittedAt: string;
  clientEmail: string;
  submissionStatus: 'New' | 'Read' | 'Responded' | 'Archived';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  notes?: any; // Rich text blocks
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalSetting {
  id: number;
  siteName: string;
  siteDescription: string;
  siteURL: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: 'Inter' | 'Playfair Display' | 'Arial' | 'Helvetica';
  logo: StrapiMedia;
  favicon: StrapiMedia;
  email: string;
  phone: string;
  address: any; // Rich text blocks
  facebookURL?: string;
  twitterURL?: string;
  linkedinURL?: string;
  instagramURL?: string;
  createdAt: string;
  updatedAt: string;
}

// Navigation
export interface StrapiNavigation {
  id: number;
  headerNavigation: any; // JSON
  footerNavigation: any; // JSON
  mobileNavigation: string;
  createdAt: string;
  updatedAt: string;
}

// Single Types (Homepage)
export interface HomepageHero {
  id: number;
  mainTagline: string;
  description: any; // Rich text markdown
  backgroundImage?: StrapiMedia[];
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageStats {
  id: number;
  expertConsultantsNumber: number;
  expertConsultantsText: string;
  yearsExperienceNumber: number;
  yearsExperienceText: string;
  projectsDeliveredNumber: number;
  projectsDeliveredText: string;
  countriesNumber: number;
  countriesText: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageWhoWeAre {
  id: number;
  sectionTitle: string;
  content: any; // Rich text markdown
  sectionImage?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageFeatures {
  id: number;
  strategicIntelligenceTitle: string;
  strategicIntelligenceDescription: string;
  strategicIntelligenceIcon?: string;
  expertConsultantsTitle: string;
  expertConsultantsDescription: string;
  globalReachIcon?: string;
  provenExcellenceTitle: string;
  provenExcellenceDescription: string;
  provenExcellenceIcon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageServicesOverview {
  id: number;
  sectionTitle: string;
  sectionSubtitle: string;
  innovationTitle: string;
  innovationDescription: any; // Rich text markdown
  innovationServices?: any; // JSON
  businessTitle: string;
  businessDescription: any; // Rich text markdown
  businessServices?: any; // JSON
  valueAccessTitle: string;
  valueAccessDescription: any; // Rich text markdown
  valueAccessServices?: any; // JSON
  createdAt: string;
  updatedAt: string;
}

export interface HomepageIndustriesOverview {
  id: number;
  sectionTitle: string;
  sectionSubtitle: string;
  pharmaceuticalsTitle: string;
  pharmaceuticalsDescription: string;
  cosmeticsTitle: string;
  cosmeticsDescription: string;
  consumerHealthTitle: string;
  consumerHealthDescription: string;
  energyStorageTitle: string;
  energyStorageDescription: string;
  mobilityTitle: string;
  mobilityDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageTestimonials {
  id: number;
  sectionTitle: string;
  sectionSubtitle: string;
  testimonial1Author: string;
  testimonial1Position: string;
  testimonial1Quote: any; // Rich text markdown
  testimonial1Photo?: StrapiMedia[];
  testimonial2Author: string;
  testimonial2Position: string;
  testimonial2Quote: any; // Rich text markdown
  testimonial2Photo?: StrapiMedia;
  testimonial3Author: string;
  testimonial3Position: string;
  testimonial3Quote: any; // Rich text markdown
  testimonial3Photo?: StrapiMedia;
  Media?: StrapiMedia[]; // Additional media field
  createdAt: string;
  updatedAt: string;
}

export interface HomepageClientLogos {
  id: number;
  sectionTitle: string;
  clientLogos: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface HomepageContactCTA {
  id: number;
  mainTitle: string;
  description: any; // Rich text markdown
  emailLabel: string;
  emailAddress: string;
  phoneLabel: string;
  Text: string; // Phone number field
  addressLabel: string;
  address: string;
  ctaButtonText: string;
  createdAt: string;
  updatedAt: string;
}

// Single Types (About Page)
// About Page Award (Single Type)
export interface AboutPageAward {
  id: number;
  sectionTitle: string;
  sectionSubtitle: string;
  awardsList: any; // JSON
  certificationsList: any; // JSON
  clientSatisfactionPercentage: number;
  projectsCompletedNumber: number;
  industryAwardsNumber: number;
  dataSecurityPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// About Page Overview (Single Type) - Fixed schema
export interface AboutPageOverview {
  id: number;
  mainTitle: string;
  description: boolean; // This appears to be incorrectly typed in schema
  foundedDescription: string;
  officesNumber: number;
  officesDescription: string;
  expertsNumber: number;
  expertsDescription: string;
  createdAt: string;
  updatedAt: string;
}

// Form Data Types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone?: string;
  position: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  coverLetter?: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  budget?: string;
  timeline?: string;
  projectDescription: string;
} 

export interface StrapiGlobalSettings {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  primaryColor: string;
  secondaryColor: string;
  siteURL: string;
  fontFamily?: string;
  logo?: StrapiImage;
  favicon?: StrapiImage;
  email: string;
  phone: string;
  facebookURL?: string;
  twitterURL?: string;
  instagramURL?: string;
  address: string; // Markdown content
}

export interface StrapiIndustry {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string; // Markdown content
  solutions?: any[];
  orderIndex?: number;
  isActive: boolean;
  featuredImage?: StrapiImage;
  icon?: string;
}

export interface StrapiFormSubmission {
  id: number;
  documentId: string;
  formType: 'Contact' | 'Career' | 'Newsletter' | 'Consultation';
  formData: any; // JSON data
  submittedAt: string;
  clientEmail: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  submissionStatus: 'New' | 'In Progress' | 'Resolved' | 'Archived';
  notes: string; // Markdown content
} 