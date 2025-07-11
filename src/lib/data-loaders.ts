import qs from "qs";
import axios from "axios";
import { getStrapiURL } from "@/lib/utils";

// Configuration - Use local Strapi
const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '80523a9463d237ac6b64084bdfc8b0bfebc73886dee7077bbb036a05b02aa316134897d4740b779174972230276f07cd80398ebe6e01584ac4d6bd7a07831a3a2e4e17b856105415e2437bc2a89c66667181b9ef0390fbcdd80935d867e3569b884f76648aebe626057ac8e0c7cd172cd42aad7f662c62797f8fda139a98c77f';

console.log('🔗 Strapi URL:', STRAPI_URL);
console.log('🔑 Using API Token:', STRAPI_TOKEN ? 'Yes' : 'No');

// Create axios instance with authentication
const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { 'Authorization': `Bearer ${STRAPI_TOKEN}` })
  },
  timeout: 10000, // 10 second timeout
});

async function fetchData(url: string) {
  try {
    console.log('🚀 Fetching:', url);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add authentication header if token is available
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }
    
    const response = await fetch(url, { 
      headers,
      cache: 'no-store', // Disable caching to get fresh data
      next: { revalidate: 0 }, // Force revalidation on every request
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️ Content not found - this might be normal for empty single-type content');
      } else {
        console.log(`❌ HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      // Return empty structure for 404s instead of throwing
      return {
        data: null,
        meta: {},
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
    
    const data = await response.json();
    console.log('✅ Data received:', Object.keys(data));
    return data;
  } catch (error) {
    console.error("❌ Error fetching data from:", url);
    console.error("Error details:", error);
    
    // Return empty structure instead of throwing
    return {
      data: null,
      meta: {},
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

interface RichTextBlock {
  type?: string;
  children?: Array<{
    type?: string;
    text?: string;
  }>;
}

// Homepage Hero data
export async function getHomepageHero() {
  const url = new URL("/api/homepage-hero", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  const response = await fetchData(url.href);
  
  // Convert description to string if it's an array
  if (response.data?.description && Array.isArray(response.data.description)) {
    response.data.description = response.data.description[0]?.children?.[0]?.text || '';
  }

  return response;
}

// Homepage Stats data
export async function getHomepageStats() {
  const url = new URL("/api/homepage-stat", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Homepage Who We Are data
export async function getHomepageWhoWeAre() {
  const url = new URL("/api/homepage-who-we-are", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  const response = await fetchData(url.href);
  
  // Convert content to string if it's an array
  if (response.data?.content && Array.isArray(response.data.content)) {
    response.data.content = (response.data.content as RichTextBlock[])
      .map(block => block?.children?.[0]?.text || '')
      .filter(text => text.length > 0)
      .join('\n\n');
  }

  return response;
}

// Homepage Features data
export async function getHomepageFeatures() {
  const url = new URL("/api/homepage-feature", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Homepage Services Overview data
export async function getHomepageServicesOverview() {
  const url = new URL("/api/homepage-services-overview", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Homepage Industries Overview data
export async function getHomepageIndustriesOverview() {
  const url = new URL("/api/homepage-industries-overview", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Homepage Testimonials data
export async function getHomepageTestimonials() {
  const url = new URL("/api/homepage-testimonial", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Homepage Client Logos data
export async function getHomepageClientLogos() {
  const url = new URL("/api/homepage-client-logo", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Homepage Contact CTA data
export async function getHomepageContactCTA() {
  const url = new URL("/api/homepage-contact-cta", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// About Page Award data
export async function getAboutPageAward() {
  const url = new URL("/api/about-page-award", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// About Page Overview data (Updated)
export async function getAboutPageOverview() {
  const url = new URL("/api/about-page-overview", STRAPI_URL);
  
  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Global Settings data
export async function getGlobalSettings() {
  const url = new URL("/api/global-setting", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      logo: {
        fields: ["url", "alternativeText"],
      },
      favicon: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  const response = await fetchData(url.href);
  
  // Convert address to string if it's rich text blocks
  if (response.data?.address && Array.isArray(response.data.address)) {
    response.data.address = (response.data.address as RichTextBlock[])
      .map(block => block?.children?.[0]?.text || '')
      .filter(text => text.length > 0)
      .join('\n\n');
  }

  return response;
}

// Navigation (Collection Type) 
export async function getNavigation() {
  const url = new URL("/api/navigations", STRAPI_URL);

  url.search = qs.stringify({
    populate: "*",
  });

  return await fetchData(url.href);
}

// Blog posts (Collection Type)
export async function getBlogs() {
  const url = new URL("/api/blogs", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      isPublished: {
        $eq: true,
      },
    },
    sort: ["publicationDate:desc"],
  });

  return await fetchData(url.href);
}

// Single blog post
export async function getBlog(slug: string) {
  const url = new URL("/api/blogs", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
      isPublished: {
        $eq: true,
      },
    },
  });

  return await fetchData(url.href);
}

// Articles (Collection Type)
export async function getArticles() {
  const url = new URL("/api/articles", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
      attachments: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    filters: {
      isPublished: {
        $eq: true,
      },
    },
    sort: ["publicationDate:desc"],
  });

  return await fetchData(url.href);
}

// Single article
export async function getArticle(slug: string) {
  const url = new URL("/api/articles", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
      attachments: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
      isPublished: {
        $eq: true,
      },
    },
  });

  return await fetchData(url.href);
}

// Case studies (Collection Type)
export async function getCaseStudies() {
  const url = new URL("/api/case-studies", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
      gallery: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      isPublished: {
        $eq: true,
      },
    },
    sort: ["publicationDate:desc"],
  });

  return await fetchData(url.href);
}

// Single case study
export async function getCaseStudy(slug: string) {
  const url = new URL("/api/case-studies", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
      gallery: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
      isPublished: {
        $eq: true,
      },
    },
  });

  return await fetchData(url.href);
}

// Team members (Collection Type) - Updated for new interface
export async function getTeamMembers() {
  const url = new URL("/api/team-members", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      isActive: {
        $eq: true,
      },
    },
    sort: ["orderIndex:asc"],
  });

  return await fetchData(url.href);
}

// Services (Collection Type)
export async function getServices() {
  const url = new URL("/api/services", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      isActive: {
        $eq: true,
      },
    },
    sort: ["orderIndex:asc"],
  });

  return await fetchData(url.href);
}

export async function getService(slug: string) {
  const url = new URL("/api/services", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const response = await fetchData(url.href);
  return response?.data?.[0] || null;
}

// Industries (Collection Type)
export async function getIndustries() {
  const url = new URL("/api/industries", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      isActive: {
        $eq: true,
      },
    },
    sort: ["orderIndex:asc"],
  });

  const response = await fetchData(url.href);
  
  // Convert description to string if it's rich text blocks for each industry
  if (response.data && Array.isArray(response.data)) {
    response.data = response.data.map((industry: any) => {
      if (industry.description && Array.isArray(industry.description)) {
        industry.description = (industry.description as RichTextBlock[])
          .map(block => block?.children?.[0]?.text || '')
          .filter(text => text.length > 0)
          .join('\n\n');
      }
      return industry;
    });
  }

  return response;
}

// Single industry
export async function getIndustry(slug: string) {
  const url = new URL("/api/industries", STRAPI_URL);

  url.search = qs.stringify({
    populate: {
      featuredImage: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      slug: {
        $eq: slug,
      },
      isActive: {
        $eq: true,
      },
    },
  });

  const response = await fetchData(url.href);
  
  // Convert description to string if it's rich text blocks
  if (response.data?.[0]?.description && Array.isArray(response.data[0].description)) {
    response.data[0].description = (response.data[0].description as RichTextBlock[])
      .map(block => block?.children?.[0]?.text || '')
      .filter(text => text.length > 0)
      .join('\n\n');
  }

  return response;
}

// Jobs (Collection Type)
export async function getJobs() {
  const url = new URL("/api/jobs", STRAPI_URL);

  url.search = qs.stringify({
    filters: {
      isActive: {
        $eq: true,
      },
    },
    sort: ["createdAt:desc"],
  });

  return await fetchData(url.href);
}

export async function getJob(id: number | string) {
  const url = new URL(`/api/jobs/${id}`, STRAPI_URL);
  return await fetchData(url.href);
}

// Form submission functions
export async function submitContactForm(formData: any) {
  try {
    const response = await strapiApi.post('/form-submissions', {
      data: {
        formType: 'Contact',
        formData: formData,
        submittedAt: new Date().toISOString(),
        clientEmail: formData.email,
        ipAddress: typeof window !== 'undefined' ? '127.0.0.1' : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function submitCareerApplication(formData: any) {
  try {
    const response = await strapiApi.post('/form-submissions', {
      data: {
        formType: 'Career',
        formData: formData,
        submittedAt: new Date().toISOString(),
        clientEmail: formData.email,
        ipAddress: typeof window !== 'undefined' ? '127.0.0.1' : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error submitting career application:', error);
    throw error;
  }
}

export async function submitNewsletterSignup(email: string) {
  try {
    const response = await strapiApi.post('/form-submissions', {
      data: {
        formType: 'Newsletter',
        formData: { email },
        submittedAt: new Date().toISOString(),
        clientEmail: email,
        ipAddress: typeof window !== 'undefined' ? '127.0.0.1' : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error submitting newsletter signup:', error);
    throw error;
  }
}

export async function submitConsultationRequest(formData: any) {
  try {
    const response = await strapiApi.post('/form-submissions', {
      data: {
        formType: 'Consultation',
        formData: formData,
        submittedAt: new Date().toISOString(),
        clientEmail: formData.email,
        ipAddress: typeof window !== 'undefined' ? '127.0.0.1' : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error submitting consultation request:', error);
    throw error;
  }
} 