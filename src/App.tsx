import AntennaNavbar from "./components/AntennaNavbar";
import RobotHero from "./RobotHero";
import AboutSection from "./components/AboutSection";

const DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Estimator", href: "#estimator" },
  { label: "Blog", href: "#blog" },
  { label: "Speed Showcase", href: "#showcase" },
  { label: "Contact", href: "#contact" },
];

function App() {
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden relative">
      {/* Global Fixed Navbar */}
      <AntennaNavbar leftItems={DEFAULT_NAV_ITEMS} />

      {/* 1. Hero Section */}
      <RobotHero />

      {/* 2. About Section with Blurred Card & Bubble Background */}
      <AboutSection />
    </main>
  );
}

export default App;
