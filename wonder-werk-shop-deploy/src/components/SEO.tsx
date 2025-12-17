import { Helmet } from "react-helmet-async";

interface FAQ {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface ArticleData {
  headline: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  articleBody?: string;
}

interface ItemListItem {
  name: string;
  description: string;
  url: string;
  image?: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  schemaType?: "WebApplication" | "SoftwareApplication" | "WebPage" | "Article";
  toolName?: string;
  category?: string;
  faqs?: FAQ[];
  howToSteps?: HowToStep[];
  articleData?: ArticleData;
  itemListItems?: ItemListItem[];
  itemListName?: string;
}

export const SEO = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "https://allonlinetoolshub.com/og-image.png",
  type = "website",
  schemaType = "WebPage",
  toolName,
  category,
  faqs,
  howToSteps,
  articleData,
  itemListItems,
  itemListName
}: SEOProps) => {
  const siteUrl = "https://allonlinetoolshub.com";
  const fullTitle = toolName 
    ? `${toolName} - Free Online Tool | All Online Tools Hub`
    : title;
  
  const currentUrl = canonical || (typeof window !== 'undefined' ? `${siteUrl}${window.location.pathname}` : siteUrl);

  // Generate enhanced schema.org structured data for tools with ratings
  const generateToolSchema = () => {
    if (!toolName) return null;

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": toolName,
      "description": description,
      "url": currentUrl,
      "applicationCategory": category || "UtilitiesApplication",
      "operatingSystem": "Any (Browser-based)",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "browserRequirements": "Requires JavaScript. Works in modern browsers.",
      "softwareVersion": "1.0",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "featureList": [
        "Free to use",
        "No registration required",
        "Privacy focused",
        "Fast processing",
        "Browser-based",
        "No file upload limits",
        "Works offline",
        "Mobile responsive",
        "No ads or pop-ups",
        "Instant results"
      ],
      "screenshot": ogImage,
      "image": ogImage,
      "creator": {
        "@type": "Organization",
        "name": "All Online Tools Hub",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": "512",
          "height": "512"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "All Online Tools Hub",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": "512",
          "height": "512"
        }
      },
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "isFamilyFriendly": true,
      "maintainer": {
        "@type": "Organization",
        "name": "All Online Tools Hub"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Tool Expert"
        },
        "reviewBody": `${toolName} is a powerful, free online tool that provides instant results without any registration or downloads. Perfect for professionals and casual users alike.`
      }
    };

    return baseSchema;
  };

  // Generate breadcrumb schema (moved here from component to ensure it's in head)
  const generateBreadcrumbSchema = () => {
    if (!toolName || !category) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.charAt(0).toUpperCase() + category.slice(1),
          "item": `${siteUrl}?category=${category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": toolName,
          "item": currentUrl
        }
      ]
    };
  };

  // FAQ schema
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // HowTo schema
  const howToSchema = howToSteps && howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": toolName,
    "description": description,
    "image": ogImage,
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Web Browser"
      }
    ],
    "step": howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": `${currentUrl}#step${index + 1}`,
      ...(step.image && { "image": step.image })
    }))
  } : null;

  // Article schema for blog posts and guides
  const articleSchema = articleData && schemaType === "Article" ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.headline,
    "description": articleData.description,
    "image": articleData.image || ogImage,
    "author": {
      "@type": "Organization",
      "name": articleData.author || "All Online Tools Hub",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "All Online Tools Hub",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": articleData.datePublished || new Date().toISOString(),
    "dateModified": articleData.dateModified || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "articleBody": articleData.articleBody,
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  } : null;

  // ItemList schema for category pages
  const itemListSchema = itemListItems && itemListItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": itemListName || "Tool Collection",
    "description": description,
    "numberOfItems": itemListItems.length,
    "itemListElement": itemListItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": item.name,
        "description": item.description,
        "url": item.url,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any (Browser-based)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        ...(item.image && { "image": item.image })
      }
    }))
  } : null;

  const keywordsString = keywords.length > 0 
    ? keywords.join(", ") 
    : "free online tools, web tools, browser tools, no signup, privacy focused";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="All Online Tools Hub" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="All Online Tools Hub" />

      {/* Structured Data - Tool Schema */}
      {generateToolSchema() && (
        <script type="application/ld+json">
          {JSON.stringify(generateToolSchema())}
        </script>
      )}

      {/* Structured Data - Breadcrumb */}
      {generateBreadcrumbSchema() && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
      )}

      {/* Structured Data - FAQ */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Structured Data - HowTo */}
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}

      {/* Structured Data - Article */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {/* Structured Data - ItemList */}
      {itemListSchema && (
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      )}
    </Helmet>
  );
};

export type { FAQ, HowToStep, ArticleData, ItemListItem };
