import { NextRequest } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://unityinnovate-e012460e42.strapiapp.com';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '80523a9463d237ac6b64084bdfc8b0bfebc73886dee7077bbb036a05b02aa316134897d4740b779174972230276f07cd80398ebe6e01584ac4d6bd7a07831a3a2e4e17b856105415e2437bc2a89c66667181b9ef0390fbcdd80935d867e3569b884f76648aebe626057ac8e0c7cd172cd42aad7f662c62797f8fda139a98c77f';

async function fetchFromStrapi(endpoint: string) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.status}`);
  }
  return response.json();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function GET(request: NextRequest) {
  try {
    // Fetch latest content from each category
    const [blogsResponse, articlesResponse, caseStudiesResponse] = await Promise.allSettled([
      fetchFromStrapi('blogs?populate=featuredImage&filters[isPublished][$eq]=true&sort=publicationDate:desc&pagination[limit]=2'),
      fetchFromStrapi('articles?populate=featuredImage&filters[isPublished][$eq]=true&sort=publicationDate:desc&pagination[limit]=2'),
      fetchFromStrapi('case-studies?populate=featuredImage&filters[isPublished][$eq]=true&sort=publicationDate:desc&pagination[limit]=2')
    ]);

    const insights: any[] = [];

    // Process blogs
    if (blogsResponse.status === 'fulfilled' && blogsResponse.value?.data) {
      blogsResponse.value.data.forEach((blog: any) => {
        insights.push({
          id: blog.documentId || blog.id,
          title: blog.title || 'Untitled Blog',
          excerpt: blog.excerpt || blog.description || 'No description available',
          category: 'blogs',
          image: blog.featuredImage?.url 
            ? `${STRAPI_URL}${blog.featuredImage.url}`
            : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center',
          author: blog.author || 'Unity Innovate',
          publishDate: formatDate(blog.publicationDate || blog.publishedAt || blog.createdAt),
          slug: blog.slug || blog.documentId || blog.id
        });
      });
    }

    // Process articles
    if (articlesResponse.status === 'fulfilled' && articlesResponse.value?.data) {
      articlesResponse.value.data.forEach((article: any) => {
        insights.push({
          id: article.documentId || article.id,
          title: article.title || 'Untitled Article',
          excerpt: article.excerpt || article.description || 'No description available',
          category: 'articles',
          image: article.featuredImage?.url 
            ? `${STRAPI_URL}${article.featuredImage.url}`
            : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
          author: article.author || 'Unity Innovate Research Team',
          publishDate: formatDate(article.publicationDate || article.publishedAt || article.createdAt),
          slug: article.slug || article.documentId || article.id
        });
      });
    }

    // Process case studies
    if (caseStudiesResponse.status === 'fulfilled' && caseStudiesResponse.value?.data) {
      caseStudiesResponse.value.data.forEach((caseStudy: any) => {
        insights.push({
          id: caseStudy.documentId || caseStudy.id,
          title: caseStudy.title || 'Untitled Case Study',
          excerpt: caseStudy.excerpt || caseStudy.description || 'No description available',
          category: 'case-studies',
          image: caseStudy.featuredImage?.url 
            ? `${STRAPI_URL}${caseStudy.featuredImage.url}`
            : 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
          author: caseStudy.author || 'Unity Innovate Team',
          publishDate: formatDate(caseStudy.publicationDate || caseStudy.publishedAt || caseStudy.createdAt),
          slug: caseStudy.slug || caseStudy.documentId || caseStudy.id
        });
      });
    }

    // Sort by date and take the 3 most recent
    insights.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    const latestInsights = insights.slice(0, 3);

    // If we don't have enough real data, fill with fallback data
    if (latestInsights.length < 3) {
      const fallbackData = [
        {
          id: 'fallback-1',
          title: 'Digital Transformation: A Complete Guide for Business Leaders',
          excerpt: 'A comprehensive guide for business leaders navigating digital transformation in the modern business landscape.',
          category: 'blogs',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center',
          author: 'Unity Innovate',
          publishDate: formatDate(new Date().toISOString()),
          slug: 'digital-transformation-guide'
        },
        {
          id: 'fallback-2',
          title: 'Market Research Trends 2024: Emerging Methodologies',
          excerpt: 'Key insights into emerging market research methodologies and consumer behavior patterns that are shaping the industry.',
          category: 'articles',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
          author: 'Unity Innovate Research Team',
          publishDate: formatDate(new Date().toISOString()),
          slug: 'market-research-trends-2024'
        },
        {
          id: 'fallback-3',
          title: 'Pharma Innovation Success: Drug Discovery Acceleration',
          excerpt: 'How we helped a leading pharmaceutical company accelerate their drug discovery process by 40% using innovative AI solutions.',
          category: 'case-studies',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
          author: 'Unity Innovate Team',
          publishDate: formatDate(new Date().toISOString()),
          slug: 'pharma-innovation-case-study'
        }
      ];

      // Add fallback data to fill up to 3 items
      while (latestInsights.length < 3 && fallbackData.length > 0) {
        latestInsights.push(fallbackData.shift()!);
      }
    }

    return new Response(JSON.stringify(latestInsights), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/insights/latest:', error);
    
    // Return fallback data in case of error
    const fallbackData = [
      {
        id: 'fallback-1',
        title: 'Digital Transformation: A Complete Guide for Business Leaders',
        excerpt: 'A comprehensive guide for business leaders navigating digital transformation in the modern business landscape.',
        category: 'blogs',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center',
        author: 'Unity Innovate',
        publishDate: formatDate(new Date().toISOString()),
        slug: 'digital-transformation-guide'
      },
      {
        id: 'fallback-2',
        title: 'Market Research Trends 2024: Emerging Methodologies',
        excerpt: 'Key insights into emerging market research methodologies and consumer behavior patterns that are shaping the industry.',
        category: 'articles',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
        author: 'Unity Innovate Research Team',
        publishDate: formatDate(new Date().toISOString()),
        slug: 'market-research-trends-2024'
      },
      {
        id: 'fallback-3',
        title: 'Pharma Innovation Success: Drug Discovery Acceleration',
        excerpt: 'How we helped a leading pharmaceutical company accelerate their drug discovery process by 40% using innovative AI solutions.',
        category: 'case-studies',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
        author: 'Unity Innovate Team',
        publishDate: formatDate(new Date().toISOString()),
        slug: 'pharma-innovation-case-study'
      }
    ];

    return new Response(JSON.stringify(fallbackData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 