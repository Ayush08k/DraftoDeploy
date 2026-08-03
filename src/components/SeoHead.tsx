import { useEffect } from "react";

/**
 * SeoHead — Dynamic per-page SEO meta updater
 *
 * Updates document.title, meta description, canonical URL,
 * Open Graph, and Twitter Card tags dynamically when the user
 * navigates between pages in this React SPA.
 *
 * Usage: <SeoHead page="home" | "projects" | "blog" | "blog-article" articleSlug="..." articleTitle="..." />
 */

interface SeoHeadProps {
  page: "home" | "projects" | "blog" | "blog-article";
  /** Only used when page === "blog-article" */
  articleSlug?: string;
  articleTitle?: string;
  articleDescription?: string;
  articlePublishDate?: string;
  articleAuthor?: string;
}

const SEO_CONFIG = {
  home: {
    title:
      "DraftoDeploy — #1 Freelance Developer & Budget-Friendly Web Development Agency for Startups",
    description:
      "DraftoDeploy is a top-rated freelance web development agency. We build high-quality, budget-friendly web apps, mobile apps, SaaS MVPs, 3D landing pages & AI integrations for startups worldwide. 150+ projects delivered.",
    canonical: "https://www.draftodeploy.com/",
    ogTitle:
      "DraftoDeploy — Best Freelance Developer & Low-Cost Web Agency for Startups",
    ogDescription:
      "Hire top freelance developers for budget-friendly web apps, mobile apps, SaaS MVPs, and 3D websites. Premium quality at affordable rates. 150+ startup projects delivered worldwide.",
    ogImage: "https://www.draftodeploy.com/logo.png",
    ogType: "website",
  },
  projects: {
    title:
      "Projects Portfolio — 150+ Delivered Web Apps, Mobile Apps & AI Platforms | DraftoDeploy",
    description:
      "Explore DraftoDeploy's portfolio of 150+ successfully delivered projects including React SaaS platforms, 3D WebGL landing pages, AI-powered dashboards, mobile apps, and e-commerce stores built for startups worldwide.",
    canonical: "https://www.draftodeploy.com/projects",
    ogTitle: "DraftoDeploy Projects Portfolio — 150+ Successful Deliveries",
    ogDescription:
      "Browse our portfolio of 150+ delivered projects: SaaS MVPs, 3D interactive websites, AI integrations, mobile apps and e-commerce stores built for global startups.",
    ogImage: "https://www.draftodeploy.com/logo.png",
    ogType: "website",
  },
  blog: {
    title:
      "Tech Blog — Web Development, React, AI & Startup Engineering Guides | DraftoDeploy",
    description:
      "DraftoDeploy's tech blog features 35+ in-depth articles on React architecture, Next.js, Three.js 3D development, AI integrations, SaaS engineering, mobile app development, and startup tech strategy.",
    canonical: "https://www.draftodeploy.com/blog",
    ogTitle:
      "DraftoDeploy Tech Blog — React, AI, SaaS & Web Dev Engineering Guides",
    ogDescription:
      "35+ in-depth technical articles covering React 19, Next.js 15, Three.js WebGL, LangChain AI, SaaS architecture, mobile development and startup engineering best practices.",
    ogImage: "https://www.draftodeploy.com/logo.png",
    ogType: "blog",
  },
};

function setMeta(name: string, content: string, isProperty = false) {
  const selector = isProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    if (isProperty) {
      el.setAttribute("property", name);
    } else {
      el.setAttribute("name", name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setArticleSchema(props: SeoHeadProps) {
  const existingScript = document.querySelector("#dynamic-article-schema");
  if (existingScript) existingScript.remove();

  if (props.page !== "blog-article" || !props.articleSlug) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.articleTitle || "DraftoDeploy Technical Blog Post",
    description:
      props.articleDescription ||
      "An in-depth technical article from DraftoDeploy covering web development best practices.",
    url: `https://www.draftodeploy.com/blog/${props.articleSlug}`,
    image: "https://www.draftodeploy.com/logo.png",
    datePublished: props.articlePublishDate || "2026-08-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      name: props.articleAuthor || "Ayush Kumar",
      url: "https://www.draftodeploy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "DraftoDeploy",
      logo: {
        "@type": "ImageObject",
        url: "https://www.draftodeploy.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.draftodeploy.com/blog/${props.articleSlug}`,
    },
  };

  const script = document.createElement("script");
  script.id = "dynamic-article-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

function setBreadcrumbSchema(page: SeoHeadProps["page"], articleTitle?: string) {
  const existingScript = document.querySelector("#dynamic-breadcrumb-schema");
  if (existingScript) existingScript.remove();

  const items: { name: string; item: string }[] = [
    { name: "Home", item: "https://www.draftodeploy.com/" },
  ];

  if (page === "projects") {
    items.push({
      name: "Projects Portfolio",
      item: "https://www.draftodeploy.com/projects",
    });
  } else if (page === "blog") {
    items.push({ name: "Blog", item: "https://www.draftodeploy.com/blog" });
  } else if (page === "blog-article" && articleTitle) {
    items.push({ name: "Blog", item: "https://www.draftodeploy.com/blog" });
    items.push({
      name: articleTitle,
      item: `https://www.draftodeploy.com/blog`,
    });
  }

  if (items.length <= 1) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  const script = document.createElement("script");
  script.id = "dynamic-breadcrumb-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

export function SeoHead(props: SeoHeadProps) {
  const { page, articleSlug, articleTitle, articleDescription, articlePublishDate, articleAuthor } = props;

  useEffect(() => {
    let config: (typeof SEO_CONFIG)["home"] | null = null;

    if (page === "blog-article" && articleTitle) {
      // Dynamic config for individual blog articles
      const slug = articleSlug || "blog-post";
      config = {
        title: `${articleTitle} | DraftoDeploy Tech Blog`,
        description:
          articleDescription ||
          `An in-depth technical article: ${articleTitle}. Read expert insights from DraftoDeploy's engineering team.`,
        canonical: `https://www.draftodeploy.com/blog/${slug}`,
        ogTitle: `${articleTitle} | DraftoDeploy`,
        ogDescription:
          articleDescription ||
          `Technical deep dive: ${articleTitle}. Expert web development insights from DraftoDeploy.`,
        ogImage: "https://www.draftodeploy.com/logo.png",
        ogType: "article",
      };
    } else {
      config = SEO_CONFIG[page as keyof typeof SEO_CONFIG] || SEO_CONFIG.home;
    }

    // Update document title
    document.title = config.title;

    // Update meta tags
    setMeta("description", config.description);
    setMeta("og:title", config.ogTitle, true);
    setMeta("og:description", config.ogDescription, true);
    setMeta("og:image", config.ogImage, true);
    setMeta("og:url", config.canonical, true);
    setMeta("og:type", config.ogType, true);
    setMeta("twitter:title", config.ogTitle);
    setMeta("twitter:description", config.ogDescription);
    setMeta("twitter:image", config.ogImage);

    // Update canonical
    setCanonical(config.canonical);

    // Inject dynamic schemas
    setArticleSchema(props);
    setBreadcrumbSchema(page, articleTitle);

  }, [page, articleSlug, articleTitle, articleDescription, articlePublishDate, articleAuthor, props]);

  return null; // This component only manages head; renders nothing
}

export default SeoHead;
