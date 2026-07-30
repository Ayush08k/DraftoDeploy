import React from "react";
import { motion } from "framer-motion";
import { HiStar, HiOutlineChatAlt2 } from "react-icons/hi";

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
        className="flex flex-col gap-4"
      >
        {[...Array(2)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {items.map(({ text, image, name, role, stars }, i) => (
              <div
                key={`${loopIdx}-${i}`}
                className="relative p-6 rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-xl shadow-black/40 max-w-xs w-full group hover:border-[#00ffc6]/40 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00ffc6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: stars }).map((_, s) => (
                    <HiStar key={s} className="w-4 h-4 text-[#00ffc6]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                  "{text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full ring-2 ring-[#00ffc6]/30 bg-zinc-800"
                  />
                  <div>
                    <div className="text-sm font-bold text-white tracking-tight leading-tight">{name}</div>
                    <div className="text-xs text-zinc-400 leading-tight mt-0.5">{role}</div>
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
    <section
      id="testimonials"
      className="relative w-full min-h-screen bg-zinc-950 text-white overflow-hidden py-20 px-4"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#00ffc6]/8 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] pointer-events-none rounded-full" />

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
          className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Real feedback from real clients — from solo founders to enterprise engineering teams who chose us to build and ship their vision.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-8 sm:gap-14 pt-4 flex-wrap"
        >
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "40+", label: "Countries Served" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#00ffc6]">{value}</div>
              <div className="text-xs text-zinc-400 font-medium uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Scroll Columns */}
      <div className="relative z-10 flex gap-5 justify-center items-start max-w-5xl mx-auto h-[640px] overflow-hidden">
        {/* Edge fade masks */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent z-20 pointer-events-none" />

        <TestimonialsColumn testimonials={col1} duration={22} />
        <TestimonialsColumn testimonials={col2} duration={17} className="hidden sm:flex" />
        <TestimonialsColumn testimonials={col3} duration={25} className="hidden lg:flex" />
      </div>
    </section>
  );
}

export default TestimonialsSection;
