import { useEffect } from "react";

/**
 * SeoHead — Dynamic per-page SEO meta updater
 *
 * Updates document.title, meta description, canonical URL,
 * Open Graph, Twitter Card, robots, keywords, article schema,
 * breadcrumb schema, and other structured data dynamically
 * when the user navigates between pages in this React SPA.
 *
 * The canonical is set via: (priority order)
 * 1. Vercel HTTP Link header (server-level, read by Google before JS)
 * 2. This component (JS-level, for client-side navigation)
 * 3. The static <link id="canonical-tag"> in index.html (fallback)
 *
 * Usage: <SeoHead page="home" | "projects" | "blog" | "blog-article" articleSlug="..." />
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

const BASE_URL = "https://draftodeploy.vercel.app";

const SEO_CONFIG = {
  home: {
    title:
      "DraftoDeploy — #1 Freelance AI & Web Developer | Budget-Friendly Agency for Startups",
    description:
      "DraftoDeploy is a top-rated freelance web development agency. We build high-quality, budget-friendly web apps, mobile apps, SaaS MVPs, 3D landing pages & AI integrations for startups worldwide. 150+ projects delivered.",
    keywords:
      "freelance web developer, hire freelance developer, budget friendly web development, affordable web developer, startup web development agency, React developer, Next.js developer, full stack developer, SaaS MVP builder, 3D website design, AI integration, DraftoDeploy, Ayush Kumar",
    canonical: `${BASE_URL}/`,
    ogTitle:
      "DraftoDeploy — Best Freelance Developer & Low-Cost Web Agency for Startups",
    ogDescription:
      "Hire top freelance developers for budget-friendly web apps, mobile apps, SaaS MVPs, and 3D websites. Premium quality at affordable rates. 150+ startup projects delivered worldwide.",
    ogImage: `${BASE_URL}/logo.png`,
    ogType: "website",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  projects: {
    title:
      "Projects Portfolio — 150+ Delivered Web Apps, Mobile Apps & AI Platforms | DraftoDeploy",
    description:
      "Explore DraftoDeploy's portfolio of 150+ successfully delivered projects including React SaaS platforms, 3D WebGL landing pages, AI-powered dashboards, mobile apps, and e-commerce stores built for startups worldwide.",
    keywords:
      "DraftoDeploy projects, freelance developer portfolio, React projects, Next.js portfolio, SaaS MVP examples, 3D WebGL websites, AI dashboard examples, mobile app portfolio, startup projects",
    canonical: `${BASE_URL}/projects`,
    ogTitle: "DraftoDeploy Projects Portfolio — 150+ Successful Deliveries",
    ogDescription:
      "Browse our portfolio of 150+ delivered projects: SaaS MVPs, 3D interactive websites, AI integrations, mobile apps and e-commerce stores built for global startups.",
    ogImage: `${BASE_URL}/logo.png`,
    ogType: "website",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  blog: {
    title:
      "Tech Blog — Web Development, React, AI & Startup Engineering Guides | DraftoDeploy",
    description:
      "DraftoDeploy's tech blog features 50+ in-depth articles on React architecture, Next.js, Three.js 3D development, AI integrations, SaaS engineering, mobile app development, and startup tech strategy.",
    keywords:
      "web development blog, React tutorial, Next.js guide, Three.js tutorial, AI integration guide, SaaS engineering, mobile app development, startup tech blog, TypeScript guide, Node.js tutorial",
    canonical: `${BASE_URL}/blog`,
    ogTitle:
      "DraftoDeploy Tech Blog — React, AI, SaaS & Web Dev Engineering Guides",
    ogDescription:
      "50+ in-depth technical articles covering React 19, Next.js 15, Three.js WebGL, LangChain AI, SaaS architecture, mobile development and startup engineering best practices.",
    ogImage: `${BASE_URL}/logo.png`,
    ogType: "website",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

// ─── Utility helpers ────────────────────────────────────────────────────────

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
  // First try to update the existing static canonical element by ID
  let el = document.getElementById("canonical-tag") as HTMLLinkElement | null;
  if (!el) {
    // Fallback: find any canonical link
    el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  }
  if (!el) {
    el = document.createElement("link");
    el.id = "canonical-tag";
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setLinkTag(rel: string, href: string, id?: string) {
  let el = id
    ? (document.getElementById(id) as HTMLLinkElement | null)
    : document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (id) el.id = id;
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectOrUpdateSchema(id: string, schema: object) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

// ─── Schema builders ─────────────────────────────────────────────────────────

function setArticleSchema(props: SeoHeadProps) {
  if (props.page !== "blog-article" || !props.articleSlug) {
    const existing = document.getElementById("dynamic-article-schema");
    if (existing) existing.remove();
    return;
  }

  const url = `${BASE_URL}/blog/${props.articleSlug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": url,
    headline: props.articleTitle || "DraftoDeploy Technical Blog Post",
    description:
      props.articleDescription ||
      "An in-depth technical article from DraftoDeploy covering web development best practices.",
    url,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 1200,
      height: 630,
    },
    datePublished: props.articlePublishDate || "2026-08-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      name: props.articleAuthor || "Ayush Kumar",
      url: BASE_URL,
      sameAs: ["https://github.com/Ayush08k"],
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "DraftoDeploy",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      "@id": `${BASE_URL}/blog`,
      name: "DraftoDeploy Tech Blog",
      url: `${BASE_URL}/blog`,
    },
  };

  injectOrUpdateSchema("dynamic-article-schema", schema);
}

function setBreadcrumbSchema(
  page: SeoHeadProps["page"],
  articleTitle?: string,
  articleSlug?: string
) {
  const items: { name: string; item: string }[] = [
    { name: "Home", item: `${BASE_URL}/` },
  ];

  if (page === "projects") {
    items.push({ name: "Projects Portfolio", item: `${BASE_URL}/projects` });
  } else if (page === "blog") {
    items.push({ name: "Blog", item: `${BASE_URL}/blog` });
  } else if (page === "blog-article" && articleTitle) {
    items.push({ name: "Blog", item: `${BASE_URL}/blog` });
    items.push({
      name: articleTitle,
      item: `${BASE_URL}/blog/${articleSlug || ""}`,
    });
  }

  if (items.length <= 1) {
    const existing = document.getElementById("dynamic-breadcrumb-schema");
    if (existing) existing.remove();
    return;
  }

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

  injectOrUpdateSchema("dynamic-breadcrumb-schema", schema);
}

function setWebPageSchema(
  page: SeoHeadProps["page"],
  canonical: string,
  title: string,
  description: string
) {
  const typeMap: Record<string, string> = {
    home: "WebPage",
    projects: "CollectionPage",
    blog: "CollectionPage",
    "blog-article": "WebPage",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": typeMap[page] || "WebPage",
    "@id": canonical,
    url: canonical,
    name: title,
    description,
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: [canonical],
    },
  };

  injectOrUpdateSchema("dynamic-webpage-schema", schema);
}

// ─── Main component ──────────────────────────────────────────────────────────

export function SeoHead(props: SeoHeadProps) {
  const {
    page,
    articleSlug,
    articleTitle,
    articleDescription,
    articlePublishDate,
    articleAuthor,
  } = props;

  useEffect(() => {
    let config: (typeof SEO_CONFIG)["home"] | null = null;
    let articleKeywords = "";

    if (page === "blog-article" && articleTitle) {
      const slug = articleSlug || "blog-post";
      articleKeywords = `${articleTitle}, web development, tech tutorial, DraftoDeploy, Ayush Kumar, engineering guide, software architecture`;
      config = {
        title: `${articleTitle} | DraftoDeploy Tech Blog`,
        description:
          articleDescription ||
          `An in-depth technical article: ${articleTitle}. Read expert insights from DraftoDeploy's engineering team.`,
        keywords: articleKeywords,
        canonical: `${BASE_URL}/blog/${slug}`,
        ogTitle: `${articleTitle} | DraftoDeploy`,
        ogDescription:
          articleDescription ||
          `Technical deep dive: ${articleTitle}. Expert web development insights from DraftoDeploy.`,
        ogImage: `${BASE_URL}/logo.png`,
        ogType: "article",
        robots:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      };
    } else {
      config =
        SEO_CONFIG[page as keyof typeof SEO_CONFIG] || SEO_CONFIG.home;
    }

    // ── Core meta ──────────────────────────────────────────────────────────
    document.title = config.title;
    setMeta("description", config.description);
    setMeta("keywords", config.keywords || "");
    setMeta("robots", config.robots);
    setMeta("googlebot", config.robots);

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta("og:title", config.ogTitle, true);
    setMeta("og:description", config.ogDescription, true);
    setMeta("og:image", config.ogImage, true);
    setMeta("og:image:alt", "DraftoDeploy — Freelance Web Development Agency", true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:url", config.canonical, true);
    setMeta("og:type", config.ogType, true);
    setMeta("og:site_name", "DraftoDeploy", true);
    setMeta("og:locale", "en_US", true);

    // ── Article-specific OG tags ────────────────────────────────────────────
    if (page === "blog-article") {
      setMeta("article:author", `${BASE_URL}/#founder`, true);
      setMeta("article:publisher", `${BASE_URL}/#organization`, true);
      setMeta("article:section", "Technology", true);
      if (articlePublishDate) {
        setMeta("article:published_time", articlePublishDate, true);
      }
      setMeta(
        "article:modified_time",
        new Date().toISOString(),
        true
      );
    }

    // ── Twitter / X Card ────────────────────────────────────────────────────
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@draftodeploy");
    setMeta("twitter:creator", "@ayushkumardev");
    setMeta("twitter:title", config.ogTitle);
    setMeta("twitter:description", config.ogDescription);
    setMeta("twitter:image", config.ogImage);
    setMeta("twitter:image:alt", "DraftoDeploy — Freelance Web Development Agency");
    setMeta("twitter:url", config.canonical);

    // ── Canonical ──────────────────────────────────────────────────────────
    setCanonical(config.canonical);

    // ── Alternate / Prerender hints ────────────────────────────────────────
    setLinkTag("prerender", config.canonical, "prerender-hint");

    // ── JSON-LD schemas ────────────────────────────────────────────────────
    setWebPageSchema(page, config.canonical, config.title, config.description);
    setArticleSchema(props);
    setBreadcrumbSchema(page, articleTitle, articleSlug);
  }, [page, articleSlug, articleTitle, articleDescription, articlePublishDate, articleAuthor, props]);

  return null;
}

export default SeoHead;
