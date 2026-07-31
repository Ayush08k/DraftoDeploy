import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCalculator,
  HiOutlineCode,
  HiOutlineDeviceMobile,
  HiOutlineCube,
  HiOutlineCloudUpload,
  HiOutlineSparkles,
  HiOutlineShoppingBag,
  HiOutlineGlobeAlt,
  HiOutlineDeviceTablet,
  HiOutlineRefresh,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineAdjustments,
  HiOutlineDocumentText,
  HiOutlineChip,
  HiOutlineViewGrid,
  HiOutlineSparkles as HiSparklesIcon,
} from 'react-icons/hi';

// ─── Service Data ─────────────────────────────────────────────────────────────
interface ServiceOption {
  id: string;
  title: string;
  tagline: string;
  basePrice: number;
  freePages: number;
  icon: any;
  accentColor: string;
  popularAddons: string[];
}

const SERVICES: ServiceOption[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    tagline: 'React 19, Next.js, Node.js & PostgreSQL',
    basePrice: 600,
    freePages: 6,
    icon: HiOutlineCode,
    accentColor: '#3b82f6',
    popularAddons: ['cicd', 'seo', 'auth'],
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    tagline: 'Cross-Platform React Native & Flutter',
    basePrice: 750,
    freePages: 8,
    icon: HiOutlineDeviceMobile,
    accentColor: '#00ffc6',
    popularAddons: ['push', 'biometric', 'offline'],
  },
  {
    id: '3d-landing',
    title: '3D Interactive Landing',
    tagline: 'Three.js, WebGL & Shader Physics',
    basePrice: 300,
    freePages: 1,
    icon: HiOutlineCube,
    accentColor: '#ec4899',
    popularAddons: ['shader', 'blender', 'gsap'],
  },
  {
    id: 'saas',
    title: 'SaaS Platform Development',
    tagline: 'Multi-Tenant Architecture & Subscriptions',
    basePrice: 700,
    freePages: 5,
    icon: HiOutlineCloudUpload,
    accentColor: '#f59e0b',
    popularAddons: ['stripe', 'rbac', 'analytics'],
  },
  {
    id: 'ai-integration',
    title: 'AI & Autonomous Agents',
    tagline: 'LLMs, RAG Pipelines & Vector DBs',
    basePrice: 400,
    freePages: 2,
    icon: HiOutlineSparkles,
    accentColor: '#10b981',
    popularAddons: ['rag', 'vector', 'agent'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Headless Shopify',
    tagline: 'Next.js Hydrogen & Shopify Storefront',
    basePrice: 400,
    freePages: 5,
    icon: HiOutlineShoppingBag,
    accentColor: '#22c55e',
    popularAddons: ['erp', 'upsell', 'speed'],
  },
  {
    id: 'wordpress',
    title: 'WordPress & Headless CMS',
    tagline: 'Bespoke Gutenberg & WP GraphQL',
    basePrice: 200,
    freePages: 5,
    icon: HiOutlineGlobeAlt,
    accentColor: '#0ea5e9',
    popularAddons: ['seo', 'security', 'speed'],
  },
  {
    id: 'ios',
    title: 'Native iOS Development',
    tagline: 'SwiftUI, CoreML & Apple Ecosystem',
    basePrice: 1000,
    freePages: 8,
    icon: HiOutlineDeviceTablet,
    accentColor: '#a855f7',
    popularAddons: ['widgets', 'coreml', 'appstore'],
  },
  {
    id: 'upgradation',
    title: 'Project Upgradation & Revamp',
    tagline: 'Refactoring, React 19 & Security Audits',
    basePrice: 300,
    freePages: 5,
    icon: HiOutlineRefresh,
    accentColor: '#8b5cf6',
    popularAddons: ['audit', 'speed', 'testing'],
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    tagline: 'Bespoke Enterprise & Dedicated Software Systems',
    basePrice: 700,
    freePages: 8,
    icon: HiOutlineChip,
    accentColor: '#f43f5e',
    popularAddons: ['cicd', 'owner-dashboard', 'ai-addon'],
  },
];

// ─── Scope Tiers ──────────────────────────────────────────────────────────────
interface ScopeTier {
  id: string;
  name: string;
  price: number;
  description: string;
  timeframe: string;
}

const SCOPE_TIERS: ScopeTier[] = [
  {
    id: 'mvp',
    name: 'Starter / MVP',
    price: 0,
    description: 'Essential core features ready to launch fast to market.',
    timeframe: '1 - 2 Weeks',
  },
  {
    id: 'growth',
    name: 'Growth Platform',
    price: 100,
    description: 'Polished features, scaled architecture, and complete workflows.',
    timeframe: '2 - 3 Weeks',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Grade',
    price: 300,
    description: 'High concurrency, advanced security, SOC2/HIPAA compliance & SLAs.',
    timeframe: '4 - 6 Weeks',
  },
];

// ─── Extra Add-ons ────────────────────────────────────────────────────────────
interface AddonOption {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
}

const ADDONS: AddonOption[] = [
  {
    id: 'cicd',
    title: 'Cloud CI/CD & Automated Deployment',
    price: 100,
    category: 'DevOps',
    description: 'GitHub Actions, Docker containers, AWS/Vercel zero-downtime pipeline.',
  },
  {
    id: 'stripe',
    title: 'Stripe & Subscription Billing Integration',
    price: 100,
    category: 'Fintech',
    description: 'Multi-tier plans, customer portal, invoices & webhooks.',
  },
  {
    id: 'owner-dashboard',
    title: 'Owner Dashboard',
    price: 100,
    category: 'Dashboard',
    description: 'Admin analytics, user controls, data overview & management dashboard.',
  },
  {
    id: 'ai-addon',
    title: 'AI Integration',
    price: 200,
    category: 'AI Tech',
    description: 'LLM API integration, smart chat assistant & automated agent workflows.',
  },
  {
    id: 'seo',
    title: 'Google 99+ Lighthouse & Technical SEO',
    price: 150,
    category: 'Performance',
    description: 'Schema markup, image optimization, dynamic sitemaps, speed audit.',
  },
  {
    id: 'i18n',
    title: 'Multi-Language Localization (i18n)',
    price: 150,
    category: 'Features',
    description: 'Dynamic locale switching, RTL support, string translation management.',
  },
  {
    id: 'maintenance',
    title: '+30 Days Warranty and maintenance',
    price: 150,
    category: 'Services',
    description: 'Extended priority support, server monitoring & bug fixes.',
  },
];

export function PriceEstimatorSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['fullstack']);
  const [selectedScope, setSelectedScope] = useState<string>('growth');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['cicd', 'seo']);
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  // Free pages calculation dynamically per selected service
  const freePages = useMemo(() => {
    return selectedServices.reduce((sum, sId) => {
      const s = SERVICES.find((item) => item.id === sId);
      return sum + (s ? s.freePages : 5);
    }, 0);
  }, [selectedServices]);
  const extraPages = Math.max(0, pageCount - freePages);
  const extraPagesCost = extraPages * 25;

  // Toggle Service selection
  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  // Toggle Add-on selection
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ── Calculation Logic ────────────────────────────────────────────────────────
  const { totalEstimate, baseServicesCost, addonsCost, scopeTierObj, totalDiscount } = useMemo(() => {
    const scopeTierObj = SCOPE_TIERS.find((s) => s.id === selectedScope) || SCOPE_TIERS[0];
    
    // Sum selected services base prices
    const rawServicesSum = selectedServices.reduce((sum, serviceId) => {
      const s = SERVICES.find((item) => item.id === serviceId);
      return sum + (s ? s.basePrice : 0);
    }, 0);

    // Bundle discount if multi-services selected (10% off for 2, 15% off for 3+)
    let multiServiceDiscount = 0;
    if (selectedServices.length === 2) multiServiceDiscount = 0.10;
    if (selectedServices.length >= 3) multiServiceDiscount = 0.15;

    const discountedServicesSum = rawServicesSum * (1 - multiServiceDiscount);

    // Sum selected add-ons
    const addonsSum = selectedAddons.reduce((sum, addonId) => {
      const a = ADDONS.find((item) => item.id === addonId);
      return sum + (a ? a.price : 0);
    }, 0);

    // Subtotal: services + add-ons + scope tier flat fee + extra pages cost ($25/page beyond free limit)
    let total = discountedServicesSum + addonsSum + scopeTierObj.price + extraPagesCost;

    // Express delivery surcharge (25%)
    if (deliverySpeed === 'express') {
      total *= 1.25;
    }

    return {
      totalEstimate: Math.round(total),
      baseServicesCost: Math.round(discountedServicesSum),
      addonsCost: Math.round(addonsSum),
      scopeTierObj,
      totalDiscount: Math.round(rawServicesSum * multiServiceDiscount),
    };
  }, [selectedServices, selectedScope, selectedAddons, deliverySpeed, extraPagesCost]);

  const copySummary = () => {
    const selectedServiceNames = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .join(', ');
    const selectedAddonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.title)
      .join(', ');

    const summaryText = `DraftoDeploy Project Estimate:\n• Services: ${selectedServiceNames}\n• Scope: ${scopeTierObj.name}\n• Add-ons: ${selectedAddonNames || 'None'}\n• Velocity: ${deliverySpeed.toUpperCase()}\n• Estimated Total: $${totalEstimate.toLocaleString()} USD`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="estimator"
      className="relative w-full min-h-screen bg-zinc-950 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background Mesh & Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-[#00ffc6] shadow-[0_0_20px_rgba(0,255,198,0.2)]"
          >
            <HiOutlineCalculator className="w-4 h-4 text-[#00ffc6]" />
            Configurator & Quote Generator
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Instant Project{' '}
            <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Price Estimator
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Configure your technical requirements below to generate a transparent real-time quote for your digital product.
          </motion.p>
        </div>

        {/* Futuristic 3-Step Navigation Bar */}
        <div className="max-w-3xl mx-auto flex items-center justify-between p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          {[
            { step: 1, label: '1. Select Services', count: selectedServices.length },
            { step: 2, label: '2. Project Scope', count: scopeTierObj.name.split(' ')[0] },
            { step: 3, label: '3. Add-ons & Velocity', count: selectedAddons.length },
          ].map(({ step, label, count }) => {
            const isActive = activeStep === step;
            return (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                type="button"
                className={`flex-1 py-3 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-[#00ffc6] text-black shadow-[0_0_20px_rgba(0,255,198,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-[#00ffc6]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Configurator Panel (7-8 Columns) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: Services Grid */}
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <HiOutlineCode className="w-5 h-5 text-[#00ffc6]" />
                        Select Core Services
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Select one or multiple services. Multi-service selection unlocks automatic discounts.
                      </p>
                    </div>

                    {selectedServices.length > 1 && (
                      <span className="text-xs font-bold text-[#00ffc6] bg-[#00ffc6]/10 px-3 py-1.5 rounded-full border border-[#00ffc6]/30 animate-pulse">
                        {selectedServices.length === 2 ? '⚡ 10% Bundle Discount' : '⚡ 15% Bundle Discount'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {SERVICES.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`relative cursor-pointer p-5 rounded-2xl border transition-all duration-300 group flex flex-col justify-between min-h-[160px] ${
                            isSelected
                              ? 'bg-white/15 border-[#00ffc6] shadow-[0_0_30px_rgba(0,255,198,0.25)]'
                              : 'bg-zinc-900/60 border-white/10 hover:border-white/30 hover:bg-zinc-900/90'
                          }`}
                        >
                          {/* Selected Glow Corner */}
                          {isSelected && (
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00ffc6]/20 to-transparent rounded-tr-2xl pointer-events-none" />
                          )}

                          <div className="flex items-start justify-between w-full relative z-10">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                                isSelected ? 'bg-[#00ffc6] text-black' : 'bg-white/10 text-white'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-[#00ffc6] border-[#00ffc6] text-black scale-110 shadow-[0_0_10px_#00ffc6]'
                                  : 'border-white/30 group-hover:border-white/60'
                              }`}
                            >
                              {isSelected && <HiOutlineCheck className="w-4 h-4 stroke-[3]" />}
                            </div>
                          </div>

                          <div className="mt-4 relative z-10 space-y-1">
                            <h4 className="text-sm font-bold text-white group-hover:text-[#00ffc6] transition-colors leading-tight">
                              {service.title}
                            </h4>
                            <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                              {service.tagline}
                            </p>
                            <div className="pt-2 flex items-center justify-between text-xs">
                              <span className="font-extrabold text-[#00ffc6]">
                                From ${service.basePrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                                {service.freePages} free {service.freePages === 1 ? 'page' : 'pages'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      <span>Proceed to Project Scope</span>
                      <HiOutlineArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Project Scope */}
              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <HiOutlineAdjustments className="w-5 h-5 text-[#00ffc6]" />
                      Choose Project Scale & Concurrency
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Determine the architectural complexity and capacity required for your product.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {SCOPE_TIERS.map((tier) => {
                      const isSelected = selectedScope === tier.id;
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedScope(tier.id)}
                          className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative ${
                            isSelected
                              ? 'bg-white/15 border-[#00ffc6] shadow-[0_0_30px_rgba(0,255,198,0.25)]'
                              : 'bg-zinc-900/60 border-white/10 hover:border-white/30 hover:bg-zinc-900/90'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-base font-black text-white">{tier.name}</span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'bg-[#00ffc6] border-[#00ffc6] text-black' : 'border-white/30'
                                }`}
                              >
                                {isSelected && <HiOutlineCheck className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">{tier.description}</p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                            <div className="text-[11px] font-bold text-[#00ffc6] flex items-center justify-between">
                              <span>Additional Cost:</span>
                              <span className="font-extrabold">{tier.price === 0 ? 'Free (+$0)' : `+$${tier.price}`}</span>
                            </div>
                            <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                              <span>Estimated Sprint:</span>
                              <span className="font-bold text-white">{tier.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Page Count Interactive Slider */}
                  <div className="p-6 rounded-2xl border border-white/15 bg-zinc-900/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-base font-black text-white flex items-center gap-2">
                          <span>Page Count & Screen Customization</span>
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Every project includes <strong className="text-[#00ffc6]">{freePages} Free Pages</strong>. Additional pages are billed at $25 / page.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <div className="bg-[#00ffc6]/10 border border-[#00ffc6]/30 px-3 py-1.5 rounded-xl text-xs font-black text-[#00ffc6]">
                          {pageCount} Total {pageCount === 1 ? 'Page' : 'Pages'}
                        </div>
                        {extraPages > 0 ? (
                          <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl text-xs font-bold text-white">
                            +{extraPages} Extra (+${extraPagesCost})
                          </div>
                        ) : (
                          <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400">
                            Included (Free)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Range Slider Controls */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setPageCount((p) => Math.max(1, p - 1))}
                          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-base flex items-center justify-center transition-all active:scale-95"
                        >
                          -
                        </button>

                        <input
                          type="range"
                          min={1}
                          max={35}
                          value={pageCount}
                          onChange={(e) => setPageCount(Number(e.target.value))}
                          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00ffc6]"
                        />

                        <button
                          type="button"
                          onClick={() => setPageCount((p) => Math.min(40, p + 1))}
                          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-base flex items-center justify-center transition-all active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-bold transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      <span>Proceed to Add-ons</span>
                      <HiOutlineArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Add-ons & Velocity */}
              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <HiSparklesIcon className="w-5 h-5 text-[#00ffc6]" />
                      Select Extra Technical Add-ons
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Enhance your build with dedicated infrastructure, security, SEO, or AI extensions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ADDONS.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-white/15 border-[#00ffc6] shadow-[0_0_20px_rgba(0,255,198,0.2)]'
                              : 'bg-zinc-900/60 border-white/10 hover:border-white/30 hover:bg-zinc-900/90'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#00ffc6] border-[#00ffc6] text-black' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <HiOutlineCheck className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold text-white leading-tight">
                                {addon.title}
                              </span>
                              <span className="text-xs font-black text-[#00ffc6] flex-shrink-0">
                                +${addon.price}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-snug">{addon.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Delivery Velocity Selector */}
                  <div className="p-5 rounded-2xl border border-white/15 bg-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00ffc6]/10 border border-[#00ffc6]/30 flex items-center justify-center text-[#00ffc6]">
                        <HiOutlineLightningBolt className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Delivery Velocity</h4>
                        <p className="text-xs text-zinc-400">Expedited dual-sprint execution option.</p>
                      </div>
                    </div>

                    <div className="flex items-center bg-black/60 p-1.5 rounded-xl border border-white/15">
                      <button
                        type="button"
                        onClick={() => setDeliverySpeed('standard')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          deliverySpeed === 'standard'
                            ? 'bg-white/20 text-white shadow-md'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliverySpeed('express')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          deliverySpeed === 'express'
                            ? 'bg-[#00ffc6] text-black shadow-md shadow-[#00ffc6]/30'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Express 2x
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-bold transition-all"
                    >
                      ← Back
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Real-Time Glass HUD Terminal / Receipt (4-5 Columns Sticky) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              {/* Radial Top Glow Accent */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-56 h-56 bg-[#00ffc6]/20 blur-[80px] pointer-events-none rounded-full" />

              <div className="relative z-10 space-y-6">
                {/* Receipt Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-2.5">
                    <HiOutlineDocumentText className="w-5 h-5 text-[#00ffc6]" />
                    <h3 className="text-lg font-black text-white tracking-tight">Live Terminal Quote</h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#00ffc6] bg-[#00ffc6]/10 px-2.5 py-1 rounded-full border border-[#00ffc6]/20">
                    REAL-TIME
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center text-zinc-300">
                    <span>Selected Services ({selectedServices.length}):</span>
                    <span className="font-bold text-white">${baseServicesCost.toLocaleString()}</span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="flex justify-between items-center text-[#00ffc6]">
                      <span>Multi-Service Discount:</span>
                      <span className="font-bold">-${totalDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-zinc-300">
                    <span>Extra Add-ons ({selectedAddons.length}):</span>
                    <span className="font-bold text-white">+${addonsCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span>Scope Tier ({scopeTierObj.name}):</span>
                    <span className="font-bold text-white">
                      {scopeTierObj.price === 0 ? 'Free (+$0)' : `+$${scopeTierObj.price}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span>Page Count ({pageCount} Pages):</span>
                    <span className="font-bold text-white">
                      {extraPages > 0 ? `+$${extraPagesCost} (${extraPages} extra @ $25/pg)` : 'Free Included'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#00ffc6]">
                    <span>Project Warranty:</span>
                    <span className="font-bold">30 Days Free Included</span>
                  </div>

                  {deliverySpeed === 'express' && (
                    <div className="flex justify-between items-center text-amber-400">
                      <span>Express Velocity (+25%):</span>
                      <span className="font-bold">Active</span>
                    </div>
                  )}
                </div>

                {/* Main Estimated Total Display */}
                <div className="border-t border-white/15 pt-5 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#00ffc6]">
                    Estimated Total Investment
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ${totalEstimate.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold">USD</span>
                  </div>

                  <p className="text-[11px] text-zinc-300 flex items-center gap-1.5 pt-1">
                    <HiOutlineInformationCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                    Estimated Delivery: <strong className="text-white">~{scopeTierObj.timeframe}</strong>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <a
                    href="#contact"
                    className="w-full py-4 rounded-2xl bg-[#00ffc6] hover:bg-[#00e6b3] text-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,198,0.4)] group"
                  >
                    <span>Request Proposal</span>
                    <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <button
                    type="button"
                    onClick={copySummary}
                    className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    {copied ? '✓ Quote Copied to Clipboard!' : 'Copy Quote Summary'}
                  </button>
                </div>

                {/* Value Add / Guarantee Highlights */}
                <div className="pt-3 border-t border-white/10 space-y-2 text-[11px] text-zinc-300">
                  <div className="flex items-center gap-2">
                    <HiOutlineCheckCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                    <span>Fixed-price scope contract & zero hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                    <span>100% Source Code & IP Ownership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceEstimatorSection;
