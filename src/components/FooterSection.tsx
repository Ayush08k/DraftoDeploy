import {
  HiOutlineMail,
  HiOutlineGlobeAlt,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineHome,
} from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { SiFiverr, SiFreelancer, SiUpwork, SiIndeed } from "react-icons/si";

// â”€â”€â”€ Navigation Links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects Portfolio", href: "#projects" },
  { label: "Client Reviews", href: "#reviews" },
  { label: "Price Estimator", href: "#estimator" },
  { label: "Tech Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

// â”€â”€â”€ Trust Signals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TRUST_BADGES = [
  { icon: HiOutlineCheckCircle, label: "150+ Projects Delivered" },
  { icon: HiOutlineShieldCheck, label: "99.9% Client Satisfaction" },
  { icon: HiOutlineLightningBolt, label: "MVP in Under 2 Weeks" },
  { icon: HiOutlineGlobeAlt, label: "40+ Countries Served" },
];

// â”€â”€â”€ Technology Tags â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TECH_TAGS = [
  "Vibe Coding", "AI Velocity", "React 19", "Next.js 15", "Node.js",
  "TypeScript", "Three.js", "WebGL", "React Native", "Flutter",
  "Swift", "Python", "LangChain", "OpenAI API", "PostgreSQL",
  "Docker", "Vercel", "Freelance & Contract Job Types",
];

export function FooterSection() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      window.location.hash = href;
      if (href === "#top" || href === "#blog" || href === "#projects") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      className="relative w-full bg-zinc-950 border-t border-white/10 text-white overflow-hidden"
      itemScope
      itemType="https://schema.org/WPFooter"
      aria-label="DraftoDeploy website footer"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ffc6]/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* â”€â”€ TOP SECTION: Trust Badges â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="py-8 border-b border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
              >
                <Icon className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                <span className="text-xs font-semibold text-zinc-300">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* â”€â”€ MAIN FOOTER CONTENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Brand & About */}
          <div
            className="lg:col-span-1 space-y-6"
            itemScope
            itemType="https://schema.org/Organization"
          >
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "#top")}
              aria-label="DraftoDeploy â€” Go to homepage"
              itemProp="url"
            >
              <img
                src="/logo.png"
                alt="DraftoDeploy Freelance Web Development Agency Logo"
                className="h-12 w-auto object-contain mix-blend-screen brightness-200"
                width="180"
                height="48"
                itemProp="logo"
                loading="lazy"
              />
            </a>

            {/* Agency Description */}
            <p
              className="text-sm text-zinc-400 leading-relaxed"
              itemProp="description"
            >
              DraftoDeploy is a top-rated budget-friendly freelance web development
              agency. We specialize in React, Next.js, mobile apps, SaaS MVPs,
              3D WebGL landing pages, and AI integrations for startups worldwide.
            </p>

            {/* Technology Tags for crawlability */}
            <div className="flex flex-wrap gap-1.5" aria-label="Technologies we use">
              {TECH_TAGS.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400 font-mono"
                  itemProp="knowsAbout"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Contact Info â€” Address schema for local SEO */}
            <address
              className="not-italic space-y-2"
              itemScope
              itemType="https://schema.org/PostalAddress"
              itemProp="address"
            >
              <a
                href="mailto:draftodeploy@gmail.com"
                className="flex items-center gap-2 text-sm text-[#00ffc6] hover:text-white transition-colors"
                itemProp="email"
                aria-label="Email DraftoDeploy"
              >
                <HiOutlineMail className="w-4 h-4 flex-shrink-0" />
                draftodeploy@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <HiOutlineGlobeAlt className="w-4 h-4 flex-shrink-0 text-zinc-500" />
                <span itemProp="addressCountry">India</span>
                <span className="text-zinc-600">Â·</span>
                <span className="text-zinc-500">Serving Worldwide</span>
              </div>
            </address>
          </div>

          {/* Column 2: Navigation */}
          <nav
            className="space-y-4"
            aria-label="Footer navigation links"
          >
            <h3 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-500">
              Navigation
            </h3>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-[#00ffc6] transition-colors"
                    aria-label={`Navigate to ${label}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#00ffc6] transition-colors flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Platforms & Social Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-500">
              Platforms & Social
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-2">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/draftodeploy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DraftoDeploy on LinkedIn â€” Freelance Web Development Agency Page"
                  title="DraftoDeploy LinkedIn Page â€” Freelance Web Developer & Startup Agency"
                  itemProp="sameAs"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60 transition-all"
                >
                  <FaLinkedinIn className="w-4 h-4 text-[#0A66C2]" />
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                {/* Fiverr */}
                <a
                  href="https://www.fiverr.com/ayush08k"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DraftoDeploy on Fiverr â€” Hire Top Rated Budget Friendly Freelance Developer"
                  title="DraftoDeploy Fiverr Profile â€” Hire React & Next.js Freelancer"
                  itemProp="sameAs"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1DBF73]/10 border border-[#1DBF73]/30 hover:bg-[#1DBF73]/20 hover:border-[#1DBF73]/60 transition-all"
                >
                  <SiFiverr className="w-4 h-4 text-[#1DBF73]" />
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">Fiverr Profile</span>
                </a>

                {/* Freelancer */}
                <a
                  href="https://www.freelancer.in/u/ayush08k?sb=t"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DraftoDeploy on Freelancer â€” Top Rated Full Stack Web Developer"
                  title="DraftoDeploy Freelancer.in Profile â€” Budget Startup MVPs & AI Engineering"
                  itemProp="sameAs"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#29B2FE]/10 border border-[#29B2FE]/30 hover:bg-[#29B2FE]/20 hover:border-[#29B2FE]/60 transition-all"
                >
                  <SiFreelancer className="w-4 h-4 text-[#29B2FE]" />
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">Freelancer.com</span>
                </a>

                {/* Upwork */}
                <a
                  href="https://www.upwork.com/freelancers/~018562aba5c499b197?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DraftoDeploy on Upwork â€” Top Rated Remote Web Developer & Vibe Coder"
                  title="DraftoDeploy Upwork Profile â€” Hire Freelance Full Stack Developer"
                  itemProp="sameAs"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#6FDA44]/10 border border-[#6FDA44]/30 hover:bg-[#6FDA44]/20 hover:border-[#6FDA44]/60 transition-all"
                >
                  <SiUpwork className="w-4 h-4 text-[#6FDA44]" />
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">Upwork Profile</span>
                </a>

                {/* Indeed */}
                <a
                  href="https://profile.indeed.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="DraftoDeploy on Indeed â€” Remote Work From Home Web Development Agency"
                  title="DraftoDeploy Indeed Profile â€” Remote Contract & Job Hiring Company"
                  itemProp="sameAs"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2164f3]/10 border border-[#2164f3]/30 hover:bg-[#2164f3]/20 hover:border-[#2164f3]/60 transition-all"
                >
                  <SiIndeed className="w-4 h-4 text-[#2164f3]" />
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">Indeed Company</span>
                </a>
              </div>

              {/* Remote-first badge */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                title="100% Remote â€” Our team works fully remote from home, serving clients worldwide"
              >
                <HiOutlineHome className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-zinc-300">
                  100% Remote Â· Work From Home
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: CTA / Hire Us */}
          <div className="space-y-6">
            <h3 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-500">
              Hire a Freelancer
            </h3>

            <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ffc6]/30 transition-colors">
              <h4 className="text-base font-bold text-white leading-tight">
                Ready to build your next product?
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Get a free project estimate instantly. Budget-friendly pricing,
                rapid delivery, enterprise quality.
              </p>

              <a
                href="#estimator"
                onClick={(e) => handleNavClick(e, "#estimator")}
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-[#00ffc6] text-zinc-900 text-sm font-bold hover:bg-[#00ffc6]/90 transition-colors"
                aria-label="Get a free project price estimate"
              >
                Get Free Estimate
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition-colors"
                aria-label="Contact DraftoDeploy for a project inquiry"
              >
                Contact Us
              </a>
            </div>

            {/* Availability status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffc6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ffc6]" />
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                Currently accepting new projects
              </span>
            </div>
          </div>
        </div>

        {/* â”€â”€ BOTTOM BAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            Â© {new Date().getFullYear()}{" "}
            <a
              href="https://draftodeploy.vercel.app"
              className="text-zinc-400 hover:text-[#00ffc6] transition-colors"
              itemProp="url"
            >
              DraftoDeploy
            </a>
            . All rights reserved. Freelance Web Development Agency.
          </p>

          {/* Keywords / Trust Tags */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-zinc-600">
            <span>Freelance Web Developer</span>
            <span className="text-zinc-800">Â·</span>
            <span>Vibe Coding Agency</span>
            <span className="text-zinc-800">Â·</span>
            <span>Remote Job & Contract Hiring</span>
            <span className="text-zinc-800">Â·</span>
            <span>Budget Friendly Agency</span>
            <span className="text-zinc-800">Â·</span>
            <span>Startup MVP Builder</span>
            <span className="text-zinc-800">Â·</span>
            <span>React & Next.js Expert</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
