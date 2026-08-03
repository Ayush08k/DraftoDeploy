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
  const isBlogPage = currentHash === "#blog" || currentPath === "/blog";

  // Determine current SEO page
  const seoPage = isProjectsPage ? "projects" : isBlogPage ? "blog" : "home";

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
      {/* Dynamic per-page SEO meta updater */}
      <SeoHead page={seoPage} />

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
