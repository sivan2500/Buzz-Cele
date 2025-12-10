import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  url?: string;
  publishedAt?: string;
  author?: string;
  schema?: object;
}

const SeoHead: React.FC<SeoProps> = ({ 
  title, 
  description, 
  image = 'https://buzzcelebdaily.com/logo.png', 
  type = 'website', 
  url = window.location.href,
  publishedAt,
  author,
  schema
}) => {

  useEffect(() => {
    document.title = `${title} | BuzzCelebDaily`;

    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('twitter:card', 'summary_large_image');
    
    if (type === 'article' && publishedAt) updateMeta('article:published_time', publishedAt, 'property');
    
    const scriptId = 'seo-structured-data';
    let script = document.getElementById(scriptId);
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [title, description, image, type, url, publishedAt, author, schema]);

  return null;
};

export default SeoHead;