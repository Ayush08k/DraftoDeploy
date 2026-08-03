import React from "react";
import { motion } from "framer-motion";
import { HiStar, HiOutlineChatAlt2 } from "react-icons/hi";

// ─── Aurora Background Component ───────────────────────────────────────────────
export const AuroraBackground = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-black w-full ${className}`}>
      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base aurora layer */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40" />
        </div>
        
        {/* Animated aurora waves */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: "radial-gradient(ellipse 800px 600px at 50% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              animation: "aurora1 8s ease-in-out infinite alternate"
            }}
          />
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(ellipse 600px 400px at 80% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
              animation: "aurora2 6s ease-in-out infinite alternate-reverse"
            }}
          />
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(ellipse 700px 500px at 20% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              animation: "aurora3 10s ease-in-out infinite alternate"
            }}
          />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse 900px 300px at 60% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
              animation: "aurora4 7s ease-in-out infinite alternate-reverse"
            }}
          />
        </div>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes aurora1 {
          0% { transform: translateX(-100px) translateY(-50px) rotate(0deg) scale(1); }
          50% { transform: translateX(50px) translateY(30px) rotate(180deg) scale(1.1); }
          100% { transform: translateX(100px) translateY(-30px) rotate(360deg) scale(0.9); }
        }
        
        @keyframes aurora2 {
          0% { transform: translateX(80px) translateY(40px) rotate(45deg) scale(0.8); }
          50% { transform: translateX(-30px) translateY(-20px) rotate(225deg) scale(1.2); }
          100% { transform: translateX(-80px) translateY(60px) rotate(405deg) scale(0.9); }
        }
        
        @keyframes aurora3 {
          0% { transform: translateX(-50px) translateY(20px) rotate(90deg) scale(1.1); }
          50% { transform: translateX(70px) translateY(-40px) rotate(270deg) scale(0.8); }
          100% { transform: translateX(-20px) translateY(50px) rotate(450deg) scale(1.0); }
        }
        
        @keyframes aurora4 {
          0% { transform: translateX(30px) translateY(-20px) rotate(135deg) scale(0.9); }
          50% { transform: translateX(-60px) translateY(10px) rotate(315deg) scale(1.1); }
          100% { transform: translateX(40px) translateY(-60px) rotate(495deg) scale(0.8); }
        }
      `}</style>
    </div>
  );
};

// ─── Testimonial Data with Mixed International & Indian Clients + Real Projects ───
const testimonials = [
  {
    name: "Rohan Deshmukh",
    flag: "🇮🇳",
    location: "Bengaluru, India",
    role: "Co-Founder · DevDock",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=RohanD&backgroundColor=b6e3f4",
    tag: "Project Upgradation",
    text: "Our web app was slow and crashing under 10k users. DraftoDeploy executed a complete project upgradation to React 19 & Node.js. They refactored our architecture, cut load times by 70%, and launched our DevDock platform flawlessly.",
    stars: 5,
  },
  {
    name: "Marcus Vance",
    flag: "🇺🇸",
    location: "San Francisco, USA",
    role: "CTO · Apex Analytics",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Marcus&backgroundColor=ffd5dc",
    tag: "AI Integration",
    text: "We needed enterprise AI integration with LLM RAG pipelines & vector search for Apex Analytics. DraftoDeploy integrated custom PyTorch models into our dashboard in 2 weeks. Their technical depth and speed are unbelievable.",
    stars: 5,
  },
  {
    name: "Zaid Al-Hassan",
    flag: "🇦🇪",
    location: "Dubai, UAE",
    role: "CEO · SiteGuard Security",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Zaid&backgroundColor=c0e6d7",
    tag: "3D WebGL Landing",
    text: "DraftoDeploy built our SiteGuard security telemetry MVP from scratch. The 3D WebGL landing page and real-time dashboard completely wowed our investor panel. They handle everything from UI to cloud deployment effortlessly.",
    stars: 5,
  },
  {
    name: "Elena Rostova",
    flag: "🇬🇧",
    location: "London, UK",
    role: "Product Lead · FormForge",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Elena&backgroundColor=d4b8f0",
    tag: "SaaS Development",
    text: "Creating a dynamic form builder with drag-and-drop logic seemed daunting. DraftoDeploy stepped in, delivered clean TypeScript code, and shipped FormForge in 18 days. Easily the best engineering agency we've hired.",
    stars: 5,
  },
  {
    name: "Aarav Patel",
    flag: "🇮🇳",
    location: "Mumbai, India",
    role: "Founder · LocalBite Delivery",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aarav&backgroundColor=fbe8c8",
    tag: "Mobile App Development",
    text: "We needed a cross-platform mobile app for iOS & Android with live GPS tracking. DraftoDeploy delivered LocalBite in React Native with 60 FPS fluidity. Indian pricing config was super transparent and budget-friendly!",
    stars: 5,
  },
  {
    name: "David Miller",
    flag: "🇺🇸",
    location: "Austin, USA",
    role: "VP Engineering · KubeCloud",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=DavidM&backgroundColor=f9d6e8",
    tag: "DevOps & Cloud Pipeline",
    text: "DraftoDeploy upgraded our multi-tenant SaaS infrastructure to zero-downtime Docker & Vercel edge pipelines. They eliminated our deployment bottlenecks and fixed security vulnerabilities overnight. DraftoDeploy works like magic!",
    stars: 5,
  },
  {
    name: "Priya Nair",
    flag: "🇮🇳",
    location: "New Delhi, India",
    role: "Founder · LearnLoom AI",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=PriyaN&backgroundColor=b8d4f0",
    tag: "AI EdTech Platform",
    text: "DraftoDeploy integrated autonomous AI tutor agents and video streaming into LearnLoom. Our active student user base grew by 300% after launch. Their 150+ project experience really shows in code quality.",
    stars: 5,
  },
  {
    name: "Tariq Mansoor",
    flag: "🇦🇪",
    location: "Abu Dhabi, UAE",
    role: "Operations Lead · TaskSync",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Tariq&backgroundColor=c8f0e0",
    tag: "Custom Full-Stack",
    text: "Real-time WebSockets, multi-language i18n, and custom Stripe billing were all integrated seamlessly into TaskSync. DraftoDeploy turned our rough wireframes into a live, high-converting product.",
    stars: 5,
  },
  {
    name: "Oliver Smith",
    flag: "🇬🇧",
    location: "Manchester, UK",
    role: "CEO · DocuSigner",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Oliver&backgroundColor=f0e4c8",
    tag: "Enterprise Compliance",
    text: "Our document automation system required strict HIPAA/GDPR compliance and electronic signature workflows. DraftoDeploy built DocuSigner with end-to-end encryption and fixed-scope precision.",
    stars: 5,
  },
  {
    name: "Siddharth Rao",
    flag: "🇮🇳",
    location: "Hyderabad, India",
    role: "Lead Architect · EcoTrack",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Siddharth&backgroundColor=e8c8f0",
    tag: "Legacy Code Refactoring",
    text: "DraftoDeploy refactored our legacy PHP database into a modern Next.js & PostgreSQL stack for EcoTrack. Bundle size dropped by 65% and Lighthouse score hit 99. Incredible engineering team!",
    stars: 5,
  },
  {
    name: "Jessica Vance",
    flag: "🇨🇦",
    location: "Toronto, Canada",
    role: "Founder · Zenith Health",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Jessica&backgroundColor=c8e8f0",
    tag: "AI Healthcare MVP",
    text: "We needed an AI-powered medical diagnosis assistant and patient portal. DraftoDeploy wired Llama 3 models into a secure HIPAA-compliant app. The speed from initial draft to final deploy blew us away.",
    stars: 5,
  },
  {
    name: "Liam Hemsworth",
    flag: "🇦🇺",
    location: "Sydney, Australia",
    role: "Head of Growth · PagePulse",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Liam&backgroundColor=d0f0d0",
    tag: "SEO & Conversion Optimization",
    text: "Our SEO monitoring platform PagePulse was suffering from high bounce rates. DraftoDeploy redesigned our 3D landing page and optimized frontend asset delivery. Conversion rates jumped by 42%!",
    stars: 5,
  },
  {
    name: "Vikram Sengupta",
    flag: "🇮🇳",
    location: "Pune, India",
    role: "Founder · InvoiceFlow Fintech",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Vikram&backgroundColor=ffd5dc",
    tag: "Fintech Automated Invoicing",
    text: "DraftoDeploy built our automated fintech invoicing platform InvoiceFlow with custom Razorpay & Stripe integration. Their Indian pricing config made it affordable for our startup while getting top-tier quality.",
    stars: 5,
  },
  {
    name: "Felix Weber",
    flag: "🇩🇪",
    location: "Berlin, Germany",
    role: "Tech Director · WhisperChat",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4",
    tag: "Encrypted AI Messaging",
    text: "Building end-to-end encrypted messaging with voice AI assistant was complex. DraftoDeploy delivered WhisperChat on schedule with zero technical debt. Communication and sprint updates were top notch.",
    stars: 5,
  },
  {
    name: "Mei Ling Tan",
    flag: "🇸🇬",
    location: "Singapore",
    role: "Co-Founder · MailBlast",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=MeiLing&backgroundColor=c0e6d7",
    tag: "High-Scale Microservices",
    text: "We needed automated email workflow triggers and high-concurrency microservices. DraftoDeploy deployed MailBlast on AWS edge network in record time. I highly recommend DraftoDeploy to any founder.",
    stars: 5,
  },
];

// Split into 3 balanced columns
const col1 = testimonials.slice(0, 5);
const col2 = testimonials.slice(5, 10);
const col3 = testimonials.slice(10, 15);

// ─── Single Column ─────────────────────────────────────────────────────────────
const TestimonialsColumn = ({
  testimonials: items,
  duration = 20,
  className = "",
}: {
  testimonials: typeof testimonials;
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5 py-2"
      >
        {[...Array(2)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {items.map(({ text, image, name, role, flag, location, tag, stars }, i) => (
              <div
                key={`${loopIdx}-${i}`}
                className="relative p-5 sm:p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-black/50 max-w-xs sm:max-w-sm w-full group hover:border-[#00ffc6]/50 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00ffc6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Bar: Stars + Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: stars }).map((_, s) => (
                        <HiStar key={s} className="w-4 h-4 text-[#00ffc6]" />
                      ))}
                    </div>
                    {tag && (
                      <span className="text-[10px] font-bold text-[#00ffc6] bg-[#00ffc6]/10 border border-[#00ffc6]/30 px-2 py-0.5 rounded-full truncate">
                        {tag}
                      </span>
                    )}
                  </div>

                  {/* Review Case Study Text */}
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-4 relative z-10 font-normal">
                    "{text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/15 relative z-10">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full ring-2 ring-[#00ffc6]/40 bg-zinc-800/80 shadow-md flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-white tracking-tight leading-tight flex items-center gap-1.5 truncate">
                      <span>{name}</span>
                      <span className="text-sm flex-shrink-0">{flag}</span>
                    </div>
                    <div className="text-[11px] text-[#00ffc6] font-semibold leading-tight truncate">
                      {role}
                    </div>
                    <div className="text-[10px] text-zinc-400 leading-tight truncate mt-0.5">
                      {location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Section Component ──────────────────────────────────────────────────────────
export function TestimonialsSection() {
  return (
    <AuroraBackground className="py-20 px-4">
      <section id="reviews" className="relative w-full min-h-screen text-white overflow-hidden">
        {/* Support legacy #testimonials anchor link */}
        <div id="testimonials" className="absolute -top-20" />

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-[#00ffc6] shadow-[0_0_20px_rgba(0,255,198,0.2)]"
          >
            <HiOutlineChatAlt2 className="w-4 h-4 text-[#00ffc6]" />
            Client Case Studies & Reviews
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Trusted by Startups Across{" "}
            <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              India, USA, UAE & Worldwide
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            See how DraftoDeploy solved real engineering bottlenecks—from AI integrations and 3D WebGL landing pages to full-stack SaaS launches and project refactoring.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 sm:gap-14 pt-4 flex-wrap"
          >
            {[
              { value: "150+", label: "Projects Deployed" },
              { value: "99.9%", label: "Client Satisfaction" },
              { value: "40+", label: "Countries Served" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#00ffc6]">{value}</div>
                <div className="text-xs text-zinc-300 font-medium uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Infinite Scroll Columns */}
        <div className="relative z-10 flex gap-3 sm:gap-5 justify-center items-start max-w-6xl mx-auto h-[540px] sm:h-[680px] overflow-hidden px-2">
          {/* Edge fade masks */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

          <TestimonialsColumn testimonials={col1} duration={24} />
          <TestimonialsColumn testimonials={col2} duration={19} className="hidden sm:flex" />
          <TestimonialsColumn testimonials={col3} duration={27} className="hidden lg:flex" />
        </div>
      </section>
    </AuroraBackground>
  );
}

export default TestimonialsSection;
