import { useState, useEffect } from "react";
import AntennaNavbar from "./components/AntennaNavbar";
import RobotHero from "./RobotHero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PriceEstimatorSection from "./components/PriceEstimatorSection";
import ContactSection from "./components/ContactSection";
import ProjectsPage from "./ProjectsPage";

const DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Estimator", href: "#estimator" },
  { label: "Testimonials", href: "#testimonials" },
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

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden relative">
      {/* Global Fixed Navbar */}
      <AntennaNavbar leftItems={DEFAULT_NAV_ITEMS} />

      {isProjectsPage ? (
        <ProjectsPage />
      ) : (
        <>
          {/* 1. Hero Section */}
          <RobotHero />

          {/* 2. About Section with Blurred Card & Bubble Background */}
          <AboutSection />

          {/* 3. Services Section with Sticky Stacking Cards */}
          <ServicesSection />

          {/* 4. Testimonials Section – Infinite Scroll Columns */}
          <TestimonialsSection />

          {/* 5. Price Estimator Section – Interactive Services & Addons Calculator */}
          <PriceEstimatorSection />

          {/* 6. Contact Section – Inquiry Form & WhatsApp Direct Chat */}
          <ContactSection />
        </>
      )}
    </main>
  );
}

export default App;
