import { useState, useEffect } from "react";
import AntennaNavbar from "./components/AntennaNavbar";
import RobotHero from "./RobotHero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PriceEstimatorSection, { type EstimateData } from "./components/PriceEstimatorSection";
import ContactSection from "./components/ContactSection";
import ProjectsPage from "./ProjectsPage";
import BlogPage from "./BlogPage";
import BlogDetailPage from "./BlogDetailPage";
import SeoHead from "./components/SeoHead";
import FooterSection from "./components/FooterSection";

const DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Estimator", href: "#estimator" },
  { label: "Review", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "#top");
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [attachedEstimate, setAttachedEstimate] = useState<EstimateData | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentHash(window.location.hash || "#top");
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const isProjectsPage = currentHash === "#projects" || currentPath === "/projects";
  const isBlogListPage = (currentHash === "#blog" || currentPath === "/blog") && !currentHash.startsWith("#blog-") && currentPath !== "/blog/";
  
  // Extract blog post slug if on dedicated blog post page
  let blogPostSlug: string | null = null;
  if (currentPath.startsWith("/blog/") && currentPath.length > 6) {
    blogPostSlug = currentPath.replace(/^\/blog\//, "").replace(/\/$/, "");
  } else if (currentHash.startsWith("#blog-") && currentHash.length > 6) {
    blogPostSlug = currentHash.replace(/^#blog-/, "");
  }

  const isBlogDetailPage = !!blogPostSlug;
  const isBlogPage = isBlogListPage && !isBlogDetailPage;

  useEffect(() => {
    if (isProjectsPage || isBlogPage || isBlogDetailPage || currentHash === "#top" || !currentHash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentHash.startsWith("#")) {
      const timer = setTimeout(() => {
        const el = document.querySelector(currentHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentHash, currentPath, isProjectsPage, isBlogPage, isBlogDetailPage]);

  // Determine current SEO page
  const seoPage = isProjectsPage ? "projects" : isBlogDetailPage ? "blog-article" : isBlogPage ? "blog" : "home";

  const handleEditEstimate = () => {
    const estimatorEl = document.getElementById("estimator");
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteEstimate = () => {
    setAttachedEstimate(null);
  };

  return (
    <>

      {/* Dynamic per-page SEO — only for home & projects; blog pages manage their own SeoHead */}
      {(seoPage === "home" || seoPage === "projects") && (
        <SeoHead page={seoPage} />
      )}


      <div
        className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden relative"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Global Fixed Navbar */}
        <AntennaNavbar leftItems={DEFAULT_NAV_ITEMS} />

        {isProjectsPage ? (
          <main id="main-content" aria-label="Projects Portfolio Page">
            <ProjectsPage />
            <FooterSection />
          </main>
        ) : isBlogDetailPage && blogPostSlug ? (
          <main id="main-content" aria-label="Tech Case Study Deep Dive">
            <BlogDetailPage
              slug={blogPostSlug}
              onNavigateHome={() => {
                window.location.hash = "#top";
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }}
              onNavigateBlogList={() => {
                window.location.hash = "#blog";
                window.history.pushState(null, '', '/blog');
                window.dispatchEvent(new Event('popstate'));
              }}
              onSelectPost={(newSlug) => {
                window.location.hash = `#blog-${newSlug}`;
                window.history.pushState(null, '', `/blog/${newSlug}`);
                window.dispatchEvent(new Event('popstate'));
              }}
            />
            <FooterSection />
          </main>
        ) : isBlogPage ? (
          <main id="main-content" aria-label="Tech Blog Page">
            <BlogPage />
            <FooterSection />
          </main>
        ) : (
          <main id="main-content" aria-label="DraftoDeploy Freelance Web Development Agency">
            {/* 1. Hero Section — H1 lives here */}
            <RobotHero />

            {/* 2. About Section with Blurred Card & Bubble Background */}
            <AboutSection />

            {/* 3. Services Section with Sticky Stacking Cards */}
            <ServicesSection />

            {/* 4. Testimonials Section – Infinite Scroll Columns */}
            <TestimonialsSection />

            {/* 5. Price Estimator Section – Interactive Services & Addons Calculator */}
            <PriceEstimatorSection
              onRequestProposal={(estimate) => setAttachedEstimate(estimate)}
            />

            {/* 6. Contact Section – Inquiry Form & Attached Estimate Handler */}
            <ContactSection
              attachedEstimate={attachedEstimate}
              onEditEstimate={handleEditEstimate}
              onDeleteEstimate={handleDeleteEstimate}
            />

            {/* 7. SEO Footer — Trust signals, nav, services, contact schema */}
            <FooterSection />
          </main>
        )}
      </div>
    </>
  );
}

export default App;
