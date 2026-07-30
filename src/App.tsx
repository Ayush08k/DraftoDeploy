import RobotHero from "./RobotHero";
import AboutSection from "./components/AboutSection";

function App() {
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <RobotHero />

      {/* 2. About Section with Blurred Card & Bubble Background */}
      <AboutSection />
    </main>
  );
}

export default App;
