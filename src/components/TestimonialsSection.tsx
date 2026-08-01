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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
        </div>
        
        {/* Animated aurora waves */}
        <div className="absolute inset-0">
          {/* Wave 1 */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: "radial-gradient(ellipse 800px 600px at 50% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              animation: "aurora1 8s ease-in-out infinite alternate"
            }}
          ></div>
          
          {/* Wave 2 */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(ellipse 600px 400px at 80% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
              animation: "aurora2 6s ease-in-out infinite alternate-reverse"
            }}
          ></div>
          
          {/* Wave 3 */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(ellipse 700px 500px at 20% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              animation: "aurora3 10s ease-in-out infinite alternate"
            }}
          ></div>
          
          {/* Wave 4 */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse 900px 300px at 60% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
              animation: "aurora4 7s ease-in-out infinite alternate-reverse"
            }}
          ></div>
        </div>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
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

// ─── Testimonial Data ──────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Aryan Mehta",
    role: "Founder · FinEdge SaaS",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aryan&backgroundColor=b6e3f4",
    text: "DraftoDeploy shipped our entire SaaS MVP in under 3 weeks. The dashboard, Stripe billing, and multi-tenant architecture worked perfectly right out of the gate. Absolutely elite work.",
    stars: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "CEO · LuxeCommerce",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc",
    text: "Our custom Shopify headless store loads in under 1.2 seconds and conversion rates jumped by 34%. The team understood exactly what a premium e-commerce brand needed. World-class.",
    stars: 5,
  },
  {
    name: "Lucas Ferreira",
    role: "CTO · NovaTech Labs",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Lucas&backgroundColor=c0e6d7",
    text: "The AI integration they built — RAG pipelines, vector search, autonomous agent workflows — was beyond anything I expected. Real production-grade engineering, not just wrapper code.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Product Lead · MedSync",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Priya&backgroundColor=d4b8f0",
    text: "We handed them a spaghetti legacy codebase from 2018. They refactored the entire thing to TypeScript, upgraded our stack to React 19, and cut bundle size by 62%. Pure magic.",
    stars: 5,
  },
  {
    name: "James O'Connor",
    role: "Founder · SportsPulse App",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=James&backgroundColor=fbe8c8",
    text: "The React Native app they built handles real-time sports telemetry for 50k+ concurrent users without a hiccup. iOS and Android both feel buttery smooth. Genuinely impressed.",
    stars: 5,
  },
  {
    name: "Nina Becker",
    role: "Marketing Director · GlowBrand",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Nina&backgroundColor=f9d6e8",
    text: "The 3D landing page they built stopped visitors in their tracks. We saw average session duration double overnight. It's the most stunning website in our entire industry.",
    stars: 5,
  },
  {
    name: "Rohan Kapoor",
    role: "Engineering Manager · CloudBase",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Rohan&backgroundColor=b8d4f0",
    text: "Full-stack delivery from database schema to CI/CD pipeline in one seamless engagement. Zero ambiguity, zero excuses — just clean, tested, documented code every single sprint.",
    stars: 5,
  },
  {
    name: "Emily Chen",
    role: "Solo Founder · PodcastPro",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Emily&backgroundColor=c8f0e0",
    text: "As a non-technical founder, I was nervous. But DraftoDeploy made every decision transparent. The iOS app hit App Store approval on the first submission. I couldn't believe it.",
    stars: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    role: "VP Engineering · RetailX",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Ahmed&backgroundColor=f0e4c8",
    text: "Our WordPress site went from a 38 to a 99 on Lighthouse after their optimization pass. SEO traffic doubled in 60 days. The ROI on this project is simply unmatched.",
    stars: 5,
  },
  {
    name: "Sofia Navarro",
    role: "Design Lead · Luminary Studio",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Sofia&backgroundColor=e8c8f0",
    text: "They took our Figma designs and translated them pixel-perfectly into SwiftUI. The animation quality rivaled apps from FAANG companies. Our clients were completely blown away.",
    stars: 5,
  },
  {
    name: "Tyler Nguyen",
    role: "Founder · DeployKit",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Tyler&backgroundColor=c8e8f0",
    text: "The team integrated OpenAI, built custom fine-tuning workflows, and wired it all into our existing Next.js platform in two weeks. Fast, precise, and genuinely knowledgeable in LLMs.",
    stars: 5,
  },
  {
    name: "Kavya Reddy",
    role: "COO · HealthVault",
    image: "https://api.dicebear.com/8.x/avataaars/svg?seed=Kavya&backgroundColor=d0f0d0",
    text: "HIPAA-compliant architecture, end-to-end encryption, role-based access control — they handled all of it without breaking a sweat. Security-first development at its finest.",
    stars: 5,
  },
];

// Split into 3 columns
const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);
const col3 = testimonials.slice(8, 12);

// ─── Single Column ─────────────────────────────────────────────────────────────
const TestimonialsColumn = ({
  testimonials: items,
  duration = 18,
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
            {items.map(({ text, image, name, role, stars }, i) => (
              <div
                key={`${loopIdx}-${i}`}
                className="relative p-5 sm:p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-black/50 max-w-xs w-full group hover:border-[#00ffc6]/50 hover:bg-white/15 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00ffc6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: stars }).map((_, s) => (
                    <HiStar key={s} className="w-4 h-4 text-[#00ffc6]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-zinc-200 leading-relaxed mb-4 relative z-10 font-normal">
                  "{text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/15">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full ring-2 ring-[#00ffc6]/40 bg-zinc-800/80 shadow-md"
                  />
                  <div>
                    <div className="text-sm font-bold text-white tracking-tight leading-tight">{name}</div>
                    <div className="text-xs text-zinc-300 leading-tight mt-0.5">{role}</div>
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

// ─── Section ───────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  return (
    <AuroraBackground className="py-20 px-4">
      <section id="testimonials" className="relative w-full min-h-screen text-white overflow-hidden">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-[#00ffc6] shadow-[0_0_20px_rgba(0,255,198,0.2)]"
          >
            <HiOutlineChatAlt2 className="w-4 h-4" />
            Client Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Trusted by Founders{" "}
            <span className="bg-gradient-to-r from-[#00ffc6] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Real feedback from real clients — from solo founders to enterprise engineering teams who chose us to build and ship their vision.
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
              { value: "150+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
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
        <div className="relative z-10 flex gap-3 sm:gap-5 justify-center items-start max-w-5xl mx-auto h-[500px] sm:h-[640px] overflow-hidden px-2">
          {/* Edge fade masks */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

          <TestimonialsColumn testimonials={col1} duration={22} />
          <TestimonialsColumn testimonials={col2} duration={17} className="hidden sm:flex" />
          <TestimonialsColumn testimonials={col3} duration={25} className="hidden lg:flex" />
        </div>
      </section>
    </AuroraBackground>
  );
}

export default TestimonialsSection;

