import BlogSection from "./components/BlogSection";
import AuroraBackground from "./components/aurora-background";

export default function BlogPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white pt-16 selection:bg-red-500 selection:text-white">
      <AuroraBackground>
        <BlogSection />
      </AuroraBackground>
    </div>
  );
}
