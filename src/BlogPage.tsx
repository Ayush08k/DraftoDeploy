import { useEffect } from "react";
import BlogSection from "./components/BlogSection";
import AuroraBackground from "./components/aurora-background";
import SeoHead from "./components/SeoHead";

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Per-page SEO — sets title, description, canonical, OG, schemas */}
      <SeoHead page="blog" />

      <div
        className="w-full min-h-screen bg-zinc-950 text-white pt-16 selection:bg-red-500 selection:text-white"
        itemScope
        itemType="https://schema.org/Blog"
      >
        {/* Blog page breadcrumb — visible to crawlers + screen readers */}
        <nav
          aria-label="Breadcrumb"
          className="sr-only"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <ol>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <a itemProp="item" href="https://draftodeploy.vercel.app/">
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
                href="https://draftodeploy.vercel.app/blog"
              >
                <span itemProp="name">Tech Blog</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <AuroraBackground>
          <BlogSection />
        </AuroraBackground>
      </div>
    </>
  );
}
