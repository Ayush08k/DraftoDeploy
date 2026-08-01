import { useState, useEffect } from "react";
import AntennaNavbar from "./components/AntennaNavbar";
import RobotHero from "./RobotHero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PriceEstimatorSection from "./components/PriceEstimatorSection";
import ContactSection from "./components/ContactSection";
import ProjectsPage from "./ProjectsPage";
import BlogSection from "./components/BlogSection";
import AuroraBackground from "./components/aurora-background";

const DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Estimator", href: "#estimator" },
  { label: "Review", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "#top");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#top");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isProjectsPage = currentHash === "#projects" || window.location.pathname === "/projects";
  const isBlogPage = currentHash === "#blog" || window.location.pathname === "/blog";

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden relative">
      {/* Global Fixed Navbar */}
      <AntennaNavbar leftItems={DEFAULT_NAV_ITEMS} />

      {isProjectsPage ? (
        <ProjectsPage />
      ) : isBlogPage ? (
        <div className="pt-12">
          <AuroraBackground>
            <BlogSection />
          </AuroraBackground>
        </div>
      ) : (
        <>
          {/* 1. Hero Section */}
          <RobotHero />

          {/* 2. About Section with Blurred Card & Bubble Background */}
          <AboutSection />

          {/* 3. Services Section with Sticky Stacking Cards */}
          <ServicesSection />

          {/* 4. Blog Section with SEO Technical Case Studies */}
          <AuroraBackground>
            <BlogSection />
          </AuroraBackground>

          {/* 5. Testimonials Section – Infinite Scroll Columns */}
          <TestimonialsSection />

          {/* 6. Price Estimator Section – Interactive Services & Addons Calculator */}
          <PriceEstimatorSection />

          {/* 7. Contact Section – Inquiry Form & WhatsApp Direct Chat */}
          <ContactSection />
        </>
      )}
    </main>
  );
}

export default App;
