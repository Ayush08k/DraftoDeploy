import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    id: 'basic-website', number: '01', title: 'Basic Website',
    tagline: 'Fast, Clean & Responsive Web Presence for Businesses',
    description: 'Perfect for landing pages, portfolio sites, and local businesses needing a fast, professional, and mobile-friendly web presence with 3 free pages included.',
    icon: HiOutlineGlobeAlt, gradient: 'from-sky-400/20 via-cyan-400/20 to-teal-400/20', accentColor: '#38bdf8',
    features: ['Mobile & Tablet Responsive Design', '99+ Google Lighthouse Speed Score', 'Contact Form & Social Media Links', '3 Free Pages Included'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React 19', 'Tailwind', 'Vite'],
  },
  {
    id: 'fullstack', number: '02', title: 'Full Stack Development',
    tagline: 'Scalable Web Architectures & End-to-End Applications',
    description: 'We craft high-performance, robust web applications built with modern frontend frameworks (React 19, Next.js) and enterprise backend architectures (Node.js, Express, PostgreSQL, GraphQL).',
    icon: HiOutlineCode, gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20', accentColor: '#3b82f6',
    features: ['Real-Time WebSockets & Live Telemetry', 'Microservices & REST / GraphQL APIs', 'Database Modeling & Query Optimization', 'Serverless Edge Functions & Caching'],
    tech: ['TypeScript', 'JavaScript', 'React 19', 'Next.js 15', 'Node.js', 'PostgreSQL', 'GraphQL', 'Prisma'],
  },
  {
    id: 'mobile', number: '03', title: 'Mobile Application Development',
    tagline: 'Cross-Platform & Native Mobile Experiences',
    description: 'Engineered for fluid 60 FPS performance across iOS and Android. Native device API integration, offline-first data sync, and intuitively responsive UI design systems.',
    icon: HiOutlineDeviceMobile, gradient: 'from-[#00ffc6]/20 via-cyan-500/20 to-blue-500/20', accentColor: '#00ffc6',
    features: ['Cross-Platform React Native & Flutter', 'Native Device Hardware & Sensor APIs', 'Push Notifications & Background Sync', 'Biometric Security & Encrypted Storage'],
    tech: ['TypeScript', 'Swift', 'Kotlin', 'Dart', 'React Native', 'Flutter', 'Expo', 'Firebase'],
  },
  {
    id: '3d-landing', number: '04', title: '3D Interactive Landing Page',
    tagline: 'Immersive WebGL & Three.js Web Experiences',
    description: 'Captivate users and drastically elevate conversion rates with bespoke 3D interactive graphics, custom shaders, and physics-driven motion tracking built directly into your website.',
    icon: HiOutlineCube, gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20', accentColor: '#ec4899',
    features: ['Custom WebGL Shaders & Raymarching', 'Interactive 3D Physics & Mouse Tracking', 'Blender Model Pipeline Optimization', 'High-FPS Smooth Rendering Engines'],
    tech: ['JavaScript', 'GLSL Shaders', 'Three.js', 'React Three Fiber', 'WebGL', 'GSAP', 'Framer Motion'],
  },
  {
    id: 'saas', number: '05', title: 'SaaS Development',
    tagline: 'Enterprise Multi-Tenant Software Platforms',
    description: 'Turn SaaS ideas into production-ready platforms complete with recurring subscription billing, user role management (RBAC), multi-tenant data isolation, and live analytics dashboards.',
    icon: HiOutlineCloudUpload, gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20', accentColor: '#f59e0b',
    features: ['Stripe & LemonSqueezy Subscription Billing', 'Role-Based Access Control (RBAC)', 'Multi-Tenant Database Architecture', 'Automated User Onboarding & Analytics'],
    tech: ['TypeScript', 'Next.js 15', 'Node.js', 'PostgreSQL', 'Stripe API', 'Prisma', 'Redis', 'Docker'],
  },
  {
    id: 'ai-integration', number: '06', title: 'AI Integration & Autonomous Agents',
    tagline: 'Smart LLM Workflows & Vector Search Systems',
    description: 'Empower your digital products with state-of-the-art AI capabilities including custom RAG vector search, automated agent workflows, LLM integrations, and predictive insights.',
    icon: HiOutlineSparkles, gradient: 'from-emerald-500/20 via-[#00ffc6]/20 to-teal-500/20', accentColor: '#10b981',
    features: ['OpenAI, Anthropic & Llama 3 API Pipeline', 'RAG & Vector Databases (Pinecone / Qdrant)', 'Autonomous AI Agent Orchestration', 'Custom Fine-Tuned Model Embedding'],
    tech: ['Python', 'TypeScript', 'LangChain', 'OpenAI API', 'Pinecone Vector DB', 'FastAPI', 'PyTorch'],
  },
  {
    id: 'ecommerce', number: '07', title: 'E-commerce & Shopify Solutions',
    tagline: 'High-Converting Online Stores & Headless Commerce',
    description: 'Custom Shopify themes, headless commerce storefronts with Next.js Hydrogen, custom Liquid development, and seamless payment gateway integrations built for ultra-fast load speed.',
    icon: HiOutlineShoppingBag, gradient: 'from-green-500/20 via-emerald-500/20 to-lime-500/20', accentColor: '#22c55e',
    features: ['Custom Shopify Liquid Theme Development', 'Headless Commerce via Shopify Storefront API', 'Checkout Optimization & Upsell Flows', 'Custom ERP & Inventory API Syncing'],
    tech: ['Liquid', 'JavaScript', 'Shopify Hydrogen', 'GraphQL', 'Next.js', 'Stripe', 'Tailwind'],
  },
  {
    id: 'wordpress', number: '08', title: 'WordPress & Custom CMS',
    tagline: 'Bespoke WordPress Themes & Headless CMS',
    description: 'Ultra-fast custom WordPress development, bespoke Gutenberg blocks, headless WordPress setups with Next.js frontend, and enterprise-grade security hardening.',
    icon: HiOutlineGlobeAlt, gradient: 'from-sky-500/20 via-blue-500/20 to-cyan-500/20', accentColor: '#0ea5e9',
    features: ['Headless WordPress + Next.js GraphQL API', 'Custom Gutenberg Block & Plugin Development', '99+ Google Lighthouse Speed Score', 'Malware Shielding & Security Hardening'],
    tech: ['PHP', 'JavaScript', 'WordPress API', 'WP GraphQL', 'Next.js', 'MySQL', 'CSS3'],
  },
  {
    id: 'ios', number: '09', title: 'iOS Development',
    tagline: 'Native iPhone & Apple Ecosystem Engineering',
    description: 'Native iOS applications designed specifically for iPhone, iPad, and Apple Watch using Swift and SwiftUI, leveraging on-device ML, WidgetKit, and App Store guidelines.',
    icon: HiOutlineDeviceTablet, gradient: 'from-pink-500/20 via-purple-500/20 to-indigo-500/20', accentColor: '#a855f7',
    features: ['Native Swift & SwiftUI Modern Architectures', 'On-Device AI with CoreML & Vision Framework', 'WidgetKit & Dynamic Island Live Activities', 'Seamless App Store Submission & Compliance'],
    tech: ['Swift 6', 'SwiftUI', 'Combine', 'Objective-C', 'CoreML', 'WidgetKit', 'Xcode'],
  },
  {
    id: 'upgradation', number: '10', title: 'Existing Project Upgradation',
    tagline: 'Modernization, Code Quality & Security Revamp',
    description: 'Revamp legacy codebases, eliminate technical debt, upgrade framework versions (React 19, Node.js), optimize bundle speeds, and patch security vulnerabilities without downtime.',
    icon: HiOutlineRefresh, gradient: 'from-violet-500/20 via-fuchsia-500/20 to-pink-500/20', accentColor: '#8b5cf6',
    features: ['Comprehensive Codebase Audit & Refactoring', 'Zero-Downtime Database & Cloud Migration', 'Page Speed & Bundle Size Optimization', 'Security Vulnerability Patching & Testing'],
    tech: ['TypeScript', 'JavaScript', 'React 19', 'Node.js', 'Vite', 'Docker', 'Jest', 'CI/CD'],
  },
  {
    id: 'custom-software', number: '11', title: 'Custom Software',
    tagline: 'Bespoke Enterprise & Dedicated Software Systems',
    description: 'Custom desktop, web, and enterprise software solutions engineered from scratch to fit your exact business workflows, proprietary algorithms, and internal data structures.',
    icon: HiOutlineChip, gradient: 'from-rose-500/20 via-pink-500/20 to-red-500/20', accentColor: '#f43f5e',
    features: ['Bespoke Enterprise Software Architecture', 'Proprietary Algorithm & Workflow Automation', 'Cross-Platform Desktop & Cloud System Sync', 'High Concurrency & Custom Data Storage'],
    tech: ['Go (Golang)', 'Rust', 'TypeScript', 'C++', 'Electron', 'React 19', 'PostgreSQL', 'Docker'],
  },
];

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Infinite loop navigation
  const prevService = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const nextService = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevService();
      if (e.key === 'ArrowRight') nextService();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextService, prevService]);

  // Render 3 visible cards at a time (infinite wrap-around)
  const firstService = SERVICES[currentIndex % SERVICES.length];
  const secondService = SERVICES[(currentIndex + 1) % SERVICES.length];
  const thirdService = SERVICES[(currentIndex + 2) % SERVICES.length];

  // 90FPS Ultra-Fast Animation variants for instant responsive sliding
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.5 },
        opacity: { duration: 0.12 },
        scale: { duration: 0.12 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.5 },
        opacity: { duration: 0.08 },
        scale: { duration: 0.08 },
      },
    }),
  };

  const renderCard = (service: typeof SERVICES[0], displayClass = 'flex') => {
    const Icon = service.icon;
    return (
      <article
        className={`relative overflow-hidden rounded-3xl border border-white/25 bg-zinc-950/60 sm:bg-zinc-950/50 backdrop-blur-2xl sm:backdrop-blur-3xl p-5 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.9)] bg-gradient-to-br ${service.gradient} group transform-gpu flex flex-col justify-between h-full ${displayClass}`}
        itemScope
        itemType="https://schema.org/Service"
        aria-label={`${service.title} — ${service.tagline}`}
      >
        {/* Card Ambient Glow */}
        <div className="hidden sm:block absolute -right-16 -top-16 w-56 h-56 rounded-full blur-[80px] pointer-events-none opacity-20 bg-[#00ffc6]" />

        <div className="relative z-10 space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg shrink-0">
                <Icon className="w-6 h-6" style={{ color: service.accentColor }} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight" itemProp="name">{service.title}</h3>
              </div>
            </div>
          </div>

          {/* Tagline & Description */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-zinc-200" itemProp="alternateName">{service.tagline}</div>
            <p className="text-zinc-300 text-xs leading-relaxed" itemProp="description">{service.description}</p>
          </div>

          {/* Feature List */}
          <div className="space-y-1.5 pt-1">
            {service.features.map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-2 text-xs text-zinc-200 font-medium bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-xl backdrop-blur-sm"
              >
                <HiOutlineCheckCircle className="w-3.5 h-3.5 text-[#00ffc6] shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Languages & Technology Stack Bar */}
        <div className="pt-3 mt-4 border-t border-white/10 flex flex-col gap-2.5 relative z-10">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#00ffc6] flex items-center gap-1.5">
            <span>Required Languages & Tech Stack:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {service.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-zinc-200 hover:bg-[#00ffc6]/20 hover:text-[#00ffc6] hover:border-[#00ffc6]/40 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href="#estimator"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent('select-estimator-service', {
                    detail: { serviceId: service.id },
                  })
                );
                window.location.hash = '#estimator';
                const el = document.getElementById('estimator');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-[11px] font-extrabold uppercase tracking-wider hover:bg-[#00ffc6] transition-colors shadow-lg group/btn shrink-0"
            >
              <span>Estimate Cost</span>
              <HiOutlineArrowNarrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      id="services"
      className="relative w-full min-h-[750px] lg:min-h-[840px] bg-zinc-950 text-white flex flex-col justify-between py-12 px-3 sm:px-6 lg:px-10 overflow-hidden select-none"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* ── Floating Paths Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingPathsBackground position={1} className="w-full h-full">
          <></>
        </FloatingPathsBackground>
      </div>

      {/* Desktop Ambient Glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full z-0" />

      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto relative z-20 pt-2">
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

        <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          End-to-End Engineering for{' '}
          <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Digital Products
          </span>
        </h2>
      </div>

      {/* ── 3 CARDS INFINITE LOOP SLIDER ── */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-6 z-20 flex items-center justify-between gap-1 sm:gap-4">
        
        {/* BORDERLESS LEFT ARROW BUTTON */}
        <button
          onClick={prevService}
          aria-label="Previous Service"
          className="p-1 sm:p-2 text-zinc-400 hover:text-[#00ffc6] active:scale-90 transition-all duration-200 shrink-0 z-30 group focus:outline-none"
        >
          <HiOutlineChevronLeft className="w-8 h-8 sm:w-12 sm:h-12 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* 3 CARDS SIDE-BY-SIDE 90FPS FLUID SLIDING GRID */}
        <div className="flex-1 overflow-hidden py-2 px-1 relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={firstService.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -25) nextService();
                if (info.offset.x > 25) prevService();
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch cursor-grab active:cursor-grabbing"
            >
              {renderCard(firstService, 'flex')}
              {renderCard(secondService, 'hidden md:flex')}
              {renderCard(thirdService, 'hidden lg:flex')}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BORDERLESS RIGHT ARROW BUTTON */}
        <button
          onClick={nextService}
          aria-label="Next Service"
          className="p-1 sm:p-2 text-zinc-400 hover:text-[#00ffc6] active:scale-90 transition-all duration-200 shrink-0 z-30 group focus:outline-none"
        >
          <HiOutlineChevronRight className="w-8 h-8 sm:w-12 sm:h-12 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

      {/* ── Clean Pagination Indicator Dots Only ── */}
      <div className="hidden sm:flex flex-col items-center gap-3 relative z-20 pb-2">
        <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-full px-4">
          {SERVICES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to ${s.title}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-[#00ffc6] shadow-[0_0_12px_rgba(0,255,198,0.6)]'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
