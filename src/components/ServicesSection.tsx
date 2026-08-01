import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCode,
  HiOutlineDeviceMobile,
  HiOutlineCube,
  HiOutlineCloudUpload,
  HiOutlineSparkles,
  HiOutlineShoppingBag,
  HiOutlineGlobeAlt,
  HiOutlineDeviceTablet,
  HiOutlineRefresh,
  HiOutlineCheckCircle,
  HiOutlineArrowNarrowRight,
  HiOutlineChip,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import FloatingPathsBackground from './FloatingPathsBackground';

const SERVICES = [
  {
    id: 'fullstack', number: '01', title: 'Full Stack Development',
    tagline: 'Scalable Web Architectures & End-to-End Applications',
    description: 'We craft high-performance, robust web applications built with modern frontend frameworks (React 19, Next.js) and enterprise backend architectures (Node.js, Express, PostgreSQL, GraphQL).',
    icon: HiOutlineCode, gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20', accentColor: '#3b82f6',
    features: ['Real-Time WebSockets & Live Telemetry', 'Microservices & REST / GraphQL APIs', 'Database Modeling & Query Optimization', 'Serverless Edge Functions & Caching'],
    tech: ['React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'mobile', number: '02', title: 'Mobile Application Development',
    tagline: 'Cross-Platform & Native Mobile Experiences',
    description: 'Engineered for fluid 60 FPS performance across iOS and Android. Native device API integration, offline-first data sync, and intuitively responsive UI design systems.',
    icon: HiOutlineDeviceMobile, gradient: 'from-[#00ffc6]/20 via-cyan-500/20 to-blue-500/20', accentColor: '#00ffc6',
    features: ['Cross-Platform React Native & Flutter', 'Native Device Hardware & Sensor APIs', 'Push Notifications & Background Sync', 'Biometric Security & Encrypted Storage'],
    tech: ['React Native', 'Swift', 'Kotlin', 'Expo', 'Redux Toolkit', 'Firebase'],
  },
  {
    id: '3d-landing', number: '03', title: '3D Interactive Landing Page',
    tagline: 'Immersive WebGL & Three.js Web Experiences',
    description: 'Captivate users and drastically elevate conversion rates with bespoke 3D interactive graphics, custom shaders, and physics-driven motion tracking built directly into your website.',
    icon: HiOutlineCube, gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20', accentColor: '#ec4899',
    features: ['Custom WebGL Shaders & Raymarching', 'Interactive 3D Physics & Mouse Tracking', 'Blender Model Pipeline Optimization', 'High-FPS Smooth Rendering Engines'],
    tech: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP', 'GLSL', 'Framer Motion'],
  },
  {
    id: 'saas', number: '04', title: 'SaaS Development',
    tagline: 'Enterprise Multi-Tenant Software Platforms',
    description: 'Turn SaaS ideas into production-ready platforms complete with recurring subscription billing, user role management (RBAC), multi-tenant data isolation, and live analytics dashboards.',
    icon: HiOutlineCloudUpload, gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20', accentColor: '#f59e0b',
    features: ['Stripe & LemonSqueezy Subscription Billing', 'Role-Based Access Control (RBAC)', 'Multi-Tenant Database Architecture', 'Automated User Onboarding & Analytics'],
    tech: ['Next.js', 'Stripe API', 'Prisma ORM', 'Redis', 'Docker', 'AWS'],
  },
  {
    id: 'ai-integration', number: '05', title: 'AI Integration & Autonomous Agents',
    tagline: 'Smart LLM Workflows & Vector Search Systems',
    description: 'Empower your digital products with state-of-the-art AI capabilities including custom RAG vector search, automated agent workflows, LLM integrations, and predictive insights.',
    icon: HiOutlineSparkles, gradient: 'from-emerald-500/20 via-[#00ffc6]/20 to-teal-500/20', accentColor: '#10b981',
    features: ['OpenAI, Anthropic & Llama 3 API Pipeline', 'RAG & Vector Databases (Pinecone / Qdrant)', 'Autonomous AI Agent Orchestration', 'Custom Fine-Tuned Model Embedding'],
    tech: ['LangChain', 'OpenAI', 'Pinecone', 'Python', 'FastAPI', 'LlamaIndex'],
  },
  {
    id: 'ecommerce', number: '06', title: 'E-commerce & Shopify Solutions',
    tagline: 'High-Converting Online Stores & Headless Commerce',
    description: 'Custom Shopify themes, headless commerce storefronts with Next.js Hydrogen, custom Liquid development, and seamless payment gateway integrations built for ultra-fast load speed.',
    icon: HiOutlineShoppingBag, gradient: 'from-green-500/20 via-emerald-500/20 to-lime-500/20', accentColor: '#22c55e',
    features: ['Custom Shopify Liquid Theme Development', 'Headless Commerce via Shopify Storefront API', 'Checkout Optimization & Upsell Flows', 'Custom ERP & Inventory API Syncing'],
    tech: ['Shopify Hydrogen', 'Liquid', 'GraphQL', 'Stripe', 'Tailwind', 'Sanity CMS'],
  },
  {
    id: 'wordpress', number: '07', title: 'WordPress & Custom CMS',
    tagline: 'Bespoke WordPress Themes & Headless CMS',
    description: 'Ultra-fast custom WordPress development, bespoke Gutenberg blocks, headless WordPress setups with Next.js frontend, and enterprise-grade security hardening.',
    icon: HiOutlineGlobeAlt, gradient: 'from-sky-500/20 via-blue-500/20 to-cyan-500/20', accentColor: '#0ea5e9',
    features: ['Headless WordPress + Next.js GraphQL API', 'Custom Gutenberg Block & Plugin Development', '99+ Google Lighthouse Speed Score', 'Malware Shielding & Security Hardening'],
    tech: ['WordPress', 'PHP', 'WP GraphQL', 'Next.js', 'Gutenberg', 'MySQL'],
  },
  {
    id: 'ios', number: '08', title: 'iOS Development',
    tagline: 'Native iPhone & Apple Ecosystem Engineering',
    description: 'Native iOS applications designed specifically for iPhone, iPad, and Apple Watch using Swift and SwiftUI, leveraging on-device ML, WidgetKit, and App Store guidelines.',
    icon: HiOutlineDeviceTablet, gradient: 'from-pink-500/20 via-purple-500/20 to-indigo-500/20', accentColor: '#a855f7',
    features: ['Native Swift & SwiftUI Modern Architectures', 'On-Device AI with CoreML & Vision Framework', 'WidgetKit & Dynamic Island Live Activities', 'Seamless App Store Submission & Compliance'],
    tech: ['Swift 6', 'SwiftUI', 'Combine', 'CoreML', 'XCode', 'TestFlight'],
  },
  {
    id: 'upgradation', number: '09', title: 'Existing Project Upgradation',
    tagline: 'Modernization, Code Quality & Security Revamp',
    description: 'Revamp legacy codebases, eliminate technical debt, upgrade framework versions (React 19, Node.js), optimize bundle speeds, and patch security vulnerabilities without downtime.',
    icon: HiOutlineRefresh, gradient: 'from-violet-500/20 via-fuchsia-500/20 to-pink-500/20', accentColor: '#8b5cf6',
    features: ['Comprehensive Codebase Audit & Refactoring', 'Zero-Downtime Database & Cloud Migration', 'Page Speed & Bundle Size Optimization', 'Security Vulnerability Patching & Testing'],
    tech: ['TypeScript', 'Vite', 'Docker', 'Jest/Cypress', 'CI/CD Pipelines'],
  },
  {
    id: 'custom-software', number: '10', title: 'Custom Software',
    tagline: 'Bespoke Enterprise & Dedicated Software Systems',
    description: 'Custom desktop, web, and enterprise software solutions engineered from scratch to fit your exact business workflows, proprietary algorithms, and internal data structures.',
    icon: HiOutlineChip, gradient: 'from-rose-500/20 via-pink-500/20 to-red-500/20', accentColor: '#f43f5e',
    features: ['Bespoke Enterprise Software Architecture', 'Proprietary Algorithm & Workflow Automation', 'Cross-Platform Desktop & Cloud System Sync', 'High Concurrency & Custom Data Storage'],
    tech: ['Electron', 'React 19', 'Go', 'Rust', 'PostgreSQL', 'Docker'],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // ── IntersectionObserver: reliable in-view detection ──────────────────
    let sectionVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry.isIntersecting;
      },
      { threshold: 0.1 } // reduced threshold for mobile compatibility
    );
    observer.observe(section);

    // ── Wheel handler ─────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      if (!sectionVisible) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= maxScroll - 2;

      // At boundaries → let page scroll naturally to next/prev section
      if (e.deltaY < 0 && atStart) return;
      if (e.deltaY > 0 && atEnd) return;

      // Otherwise: intercept scroll → move cards horizontally
      e.preventDefault();
      track.scrollBy({ left: e.deltaY * 3, behavior: 'smooth' });
    };

    // ── Track scroll → update progress bar ───────────────────────────────
    const updateProgress = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setProgress(track.scrollLeft / Math.max(maxScroll, 1));
    };

    track.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      track.removeEventListener('scroll', updateProgress);
      observer.disconnect();
    };
  }, []);

  // ── Scroll one card width left or right (mobile/tablet buttons) ─────────
  const scrollCard = (dir: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    // find approximate card width from first child
    const card = track.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 32 : 320;
    track.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-zinc-950 text-white flex flex-col py-6 px-0"
    >
      {/* ── Floating Paths Background (contained to this section) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingPathsBackground position={1} className="w-full h-full">
          <></>
        </FloatingPathsBackground>
      </div>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/8 blur-[150px] pointer-events-none rounded-full z-0" />

      {/* Section Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto relative z-20 px-4 pt-2 pb-4 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-[#00ffc6] shadow-[0_0_20px_rgba(0,255,198,0.2)]"
        >
          <HiOutlineChip className="w-4 h-4 text-[#00ffc6]" />
          Services & Capabilities
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          End-to-End Engineering for{' '}
          <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Digital Products
          </span>
        </h2>
      </div>

      {/* Horizontal Snap Scroll Cards Track + Mobile Nav Buttons */}
      <div className="flex-1 relative flex items-center z-20">
        {/* LEFT button — mobile & tablet only */}
        <button
          onClick={() => scrollCard('left')}
          aria-label="Previous service"
          className="lg:hidden absolute left-1 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-zinc-800/90 border border-white/20 backdrop-blur-md text-white shadow-lg active:scale-95 transition-transform hover:border-[#00ffc6]/60 hover:text-[#00ffc6]"
        >
          <HiOutlineChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={trackRef}
          className="w-full overflow-x-auto snap-x snap-mandatory flex items-center gap-4 sm:gap-6 lg:gap-8 px-8 sm:px-12 lg:px-16 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="w-[82vw] sm:w-[420px] md:w-[520px] lg:w-[640px] flex-shrink-0 snap-center"
              >
                <div className={`relative overflow-hidden rounded-3xl border border-white/20 bg-zinc-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-gradient-to-br ${service.gradient} hover:border-[#00ffc6]/50 transition-all duration-300 group`}>
                  <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-20 bg-[#00ffc6]" />

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6" style={{ color: service.accentColor }} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{service.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-zinc-200">{service.tagline}</div>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-zinc-200 font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                          <HiOutlineCheckCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {service.tech.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-zinc-300">{t}</span>
                        ))}
                      </div>
                      <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-extrabold uppercase tracking-wider hover:bg-[#00ffc6] transition-colors shadow-md group/btn">
                        <span>Explore</span>
                        <HiOutlineArrowNarrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT button — mobile & tablet only */}
        <button
          onClick={() => scrollCard('right')}
          aria-label="Next service"
          className="lg:hidden absolute right-1 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-zinc-800/90 border border-white/20 backdrop-blur-md text-white shadow-lg active:scale-95 transition-transform hover:border-[#00ffc6]/60 hover:text-[#00ffc6]"
        >
          <HiOutlineChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div className="flex-shrink-0 w-full max-w-xs mx-auto px-4 pb-3 pt-2 z-20 relative">
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-500 rounded-full transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
