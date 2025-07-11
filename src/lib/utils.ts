import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from 'marked';

// Configure marked for secure rendering
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Strapi URL helpers
export function getStrapiURL() {
  // Get the base Strapi URL from environment variables
  return process.env.NEXT_PUBLIC_STRAPI_URL || 
         process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 
         'https://calm-flowers-c5253b83e1.strapiapp.com';
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  
  // If the URL is already absolute, return it as is
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  
  // If it's a relative path starting with /, prepend the base Strapi URL
  if (url.startsWith('/')) {
    return `${getStrapiURL()}${url}`;
  }
  
  // Otherwise, assume it's a relative path and add /uploads/
  return `${getStrapiURL()}/uploads/${url}`;
}

// Convert Markdown to HTML
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return markdown;
  }
}

// Convert Strapi Rich Text or Markdown to HTML
export function renderContent(content: any): string {
  if (!content) return '';

  // If content is a string, treat it as Markdown
  if (typeof content === 'string') {
    return renderMarkdown(content);
  }

  // If content is an array of blocks, treat it as Strapi Blocks format
  if (Array.isArray(content)) {
    return content.map(block => {
      if (typeof block === 'string') {
        return renderMarkdown(block);
      }
      if (block.type === 'paragraph') {
        return `<p>${block.children?.map((child: any) => renderNode(child)).join('') || ''}</p>`;
      }
      return renderNode(block);
    }).join('\\n');
  }

    return '';
  }

// Helper function for rendering individual nodes
function renderNode(node: any): string {
    if (!node) return '';
    
    if (typeof node === 'string') {
      return node;
    }
    
    if (node.text) {
    let text = node.text;
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.code) text = `<code>${text}</code>`;
    return text;
  }
  
  if (node.type === 'heading') {
    const level = node.level || 1;
    return `<h${level}>${node.children?.map((child: any) => renderNode(child)).join('') || ''}</h${level}>`;
  }
  
  if (node.type === 'list') {
    const tag = node.format === 'ordered' ? 'ol' : 'ul';
    return `<${tag}>${node.children?.map((child: any) => renderNode(child)).join('') || ''}</${tag}>`;
  }
  
  if (node.type === 'list-item') {
    return `<li>${node.children?.map((child: any) => renderNode(child)).join('') || ''}</li>`;
  }
  
  if (node.type === 'link') {
    return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${node.children?.map((child: any) => renderNode(child)).join('') || ''}</a>`;
  }
  
  if (node.type === 'quote') {
    return `<blockquote>${node.children?.map((child: any) => renderNode(child)).join('') || ''}</blockquote>`;
    }
    
    if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => renderNode(child)).join('');
    }
    
    return '';
  }
  
// Convert content to plain text (for excerpts etc)
export function extractTextFromContent(content: any): string {
  if (!content) return '';

  // If content is a string (Markdown), strip HTML tags after rendering
  if (typeof content === 'string') {
    const html = renderMarkdown(content);
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // If content is an array of blocks
  if (Array.isArray(content)) {
    return content.map(block => {
      if (typeof block === 'string') {
        return block;
      }
      if (block.text) {
        return block.text;
      }
      if (block.children && Array.isArray(block.children)) {
        return block.children.map((child: any) => {
          if (typeof child === 'string') return child;
          return child.text || '';
        }).join(' ');
}
      return '';
    }).join(' ').replace(/\s+/g, ' ').trim();
  }

  return '';
}

// Format date to human readable format
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

// Truncate text to a specific length
export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function formatDateShort(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
} 