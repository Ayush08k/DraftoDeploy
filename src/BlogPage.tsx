import { useEffect } from "react";
import BlogSection from "./components/BlogSection";
import AuroraBackground from "./components/aurora-background";

export default function BlogPage() {
  // Update document title, meta description and scroll to top for the Blog page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title =
      "Tech Blog — Web Dev, React, AI & Startup Engineering Guides | DraftoDeploy";
    const metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDesc) {
      metaDesc.content =
        "DraftoDeploy's tech blog features 35+ in-depth articles on React architecture, Next.js, Three.js 3D development, AI integrations, SaaS engineering, mobile app development, and startup tech strategy.";
    }
    return () => {
      // Restore homepage title on unmount
      document.title =
        "DraftoDeploy — #1 Freelance Developer & Budget-Friendly Web Development Agency for Startups";
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-zinc-950 text-white pt-16 selection:bg-red-500 selection:text-white"
      itemScope
      itemType="https://schema.org/Blog"
    >
      {/* Blog page breadcrumb — hidden visually but crawlable */}
      <nav
        aria-label="Breadcrumb"
        className="sr-only"
      >
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a itemProp="item" href="https://www.draftodeploy.com/">
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a
              itemProp="item"
              href="https://www.draftodeploy.com/blog"
            >
              <span itemProp="name">Blog</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <AuroraBackground>
        <BlogSection />
      </AuroraBackground>
    </div>
  );
}
