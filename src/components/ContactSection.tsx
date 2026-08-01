import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FireworksBackground from './FireworksBackground';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineGlobeAlt,
  HiOutlineChatAlt2,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlinePaperClip,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import type { EstimateData } from './PriceEstimatorSection';

const COUNTRIES = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Other / Worldwide', flag: '🌐' },
];

// ─── Free Google Apps Script Webhook URL ──────────────────────────────────────
const GOOGLE_WEBHOOK_URL: string = 'https://script.google.com/macros/s/AKfycbwkzQTED1WS40bMkpxWJ3q8bnzgayKui7rOTvj2ADSCs7KeL9PWGD59spolzXhCtYSOlw/exec';

export interface ContactSectionProps {
  attachedEstimate?: EstimateData | null;
  onEditEstimate?: () => void;
  onDeleteEstimate?: () => void;
}

export function ContactSection({
  attachedEstimate,
  onEditEstimate,
  onDeleteEstimate,
}: ContactSectionProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: 'United States',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalMessage = formData.message;

      if (attachedEstimate) {
        finalMessage += `\n\n==========================================\n📊 ATTACHED PROJECT PROPOSAL ESTIMATE\n==========================================\n• Total Investment: $${attachedEstimate.totalEstimate.toLocaleString()} USD\n• Services: ${attachedEstimate.services.join(', ')}\n• Scope: ${attachedEstimate.scope} (${attachedEstimate.scopeTimeframe})\n• Add-ons: ${attachedEstimate.addons.join(', ') || 'None'}\n• Velocity: ${attachedEstimate.deliverySpeed}\n• Page Count: ${attachedEstimate.pageCount} Pages\n==========================================`;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        country: formData.country,
        message: finalMessage,
        services: attachedEstimate ? attachedEstimate.services.join(', ') : 'None',
        addons: attachedEstimate ? (attachedEstimate.addons.join(', ') || 'None') : 'None',
        scope: attachedEstimate ? attachedEstimate.scope : 'N/A',
        totalPrice: attachedEstimate ? `$${attachedEstimate.totalEstimate.toLocaleString()} USD` : 'N/A',
        estimate: attachedEstimate
          ? {
              services: attachedEstimate.services.join(', '),
              scope: attachedEstimate.scope,
              timeframe: attachedEstimate.scopeTimeframe,
              addons: attachedEstimate.addons.join(', ') || 'None',
              velocity: attachedEstimate.deliverySpeed,
              pageCount: attachedEstimate.pageCount,
              totalInvestment: `$${attachedEstimate.totalEstimate.toLocaleString()} USD`,
            }
          : null,
      };

      if (GOOGLE_WEBHOOK_URL && GOOGLE_WEBHOOK_URL.trim() !== '') {
        await fetch(GOOGLE_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Fallback simulation if webhook URL is not yet pasted
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setSubmitted(true); // Still show success UI to user so conversion isn't blocked
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden select-none"
    >
      {/* Fireworks Canvas Background Animation */}
      <FireworksBackground className="absolute inset-0 pointer-events-none opacity-60" population={60} color="white" />

      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="w-full max-w-4xl lg:max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#00ffc6]/30 text-[11px] font-extrabold tracking-wider uppercase text-[#00ffc6]"
          >
            <HiOutlineSparkles className="w-3.5 h-3.5 text-[#00ffc6]" />
            GET IN TOUCH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-white tracking-tight"
          >
            Let’s Build Your <span className="text-[#00ffc6]">Next Project</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto"
          >
            Fill in your details below. Our team responds within 2 hours.
          </motion.p>
        </div>

        {/* Decent Sized Compact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-white/15 bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl max-w-xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative py-10 text-center space-y-5 overflow-hidden rounded-2xl"
              >
                {/* Spreading Colorful Dot Expansion Ripple */}
                <motion.div
                  initial={{ scale: 0, opacity: 0.9 }}
                  animate={{ scale: 38, opacity: 0.18 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-[#00ffc6] via-[#38bdf8] to-[#c084fc] pointer-events-none blur-sm"
                />

                {/* Animated Glowing Ring & Tick Mark */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: [0, 1.25, 1], rotate: 0 }}
                    transition={{ duration: 0.65, ease: "backOut" }}
                    className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#00ffc6]/20 via-[#38bdf8]/20 to-[#c084fc]/20 border-2 border-[#00ffc6] flex items-center justify-center text-[#00ffc6] shadow-[0_0_40px_rgba(0,255,198,0.5)] relative"
                  >
                    {/* Pulsing Outer Aura Ring */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: [1, 1.6, 2], opacity: [0.8, 0.4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-[#00ffc6]"
                    />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.35, type: "spring" }}
                    >
                      <HiOutlineCheckCircle className="w-9 h-9 text-[#00ffc6]" />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="relative z-10 space-y-1"
                >
                  <h3 className="text-2xl font-black text-white tracking-tight">Message Dispatched!</h3>
                  <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed font-medium">
                    Thank you, <strong className="text-[#00ffc6]">{formData.name}</strong>. Our engineering team will reach out to <span className="text-white font-semibold">{formData.email}</span> shortly.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="relative z-10 pt-2 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        whatsapp: '',
                        country: 'United States',
                        message: '',
                      });
                      setSubmitted(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Attached Estimate Preview Card (Uneditable with Edit & Delete Actions) */}
                {attachedEstimate && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border-2 border-[#00ffc6]/40 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,198,0.15)] space-y-3.5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <HiOutlinePaperClip className="w-4 h-4 text-[#00ffc6]" />
                        <span className="text-xs font-black text-white uppercase tracking-wider">
                          Attached Project Estimate
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold text-[#00ffc6] bg-[#00ffc6]/10 px-2.5 py-0.5 rounded-full border border-[#00ffc6]/30">
                        System Locked
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">Services</span>
                        <span className="font-bold text-white leading-tight block">{attachedEstimate.services.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">Scope & Velocity</span>
                        <span className="font-bold text-white block">{attachedEstimate.scope} ({attachedEstimate.deliverySpeed})</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">Add-ons</span>
                        <span className="font-bold text-white block">{attachedEstimate.addons.join(', ') || 'None'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">Estimated Total</span>
                        <span className="text-base font-black text-[#00ffc6]">
                          ${attachedEstimate.totalEstimate.toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    {/* 2 Buttons: 1 for Edit (scrolls back to estimate section), 1 for Delete (removes estimate data) */}
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={onEditEstimate}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      >
                        <HiOutlinePencil className="w-3.5 h-3.5 text-[#00ffc6]" />
                        <span>Edit Estimate</span>
                      </button>

                      <button
                        type="button"
                        onClick={onDeleteEstimate}
                        className="flex-1 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5 text-rose-400" />
                        <span>Delete Estimate</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                      <HiOutlineUser className="w-3.5 h-3.5 text-[#00ffc6]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-[#00ffc6] transition-all"
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                      <HiOutlineMail className="w-3.5 h-3.5 text-[#00ffc6]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-[#00ffc6] transition-all"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* WhatsApp & Country Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                      <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3.5 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-[#00ffc6] transition-all"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                      <HiOutlineGlobeAlt className="w-3.5 h-3.5 text-[#00ffc6]" />
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-[#00ffc6] transition-all cursor-pointer appearance-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.name} value={c.name} className="bg-zinc-900 text-white">
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                    <HiOutlineChatAlt2 className="w-3.5 h-3.5 text-[#00ffc6]" />
                    Project Details / Requirements *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project goals, required tech stack, and target timeline..."
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-[#00ffc6] transition-all resize-none"
                  />
                </div>

                {/* Submit Button Row */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#00ffc6] text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#00ffc6]/90 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,255,198,0.25)] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <HiOutlinePaperAirplane className="w-3.5 h-3.5 rotate-45" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Compact SLA Footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-zinc-400">
          <div className="flex items-center gap-1.5">
            <HiOutlineLightningBolt className="w-3.5 h-3.5 text-[#00ffc6]" />
            <span>2-Hour SLA Response</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineShieldCheck className="w-3.5 h-3.5 text-[#00ffc6]" />
            <span>30 Days Free Warranty</span>
          </div>
        </div>

        {/* Footer Navigation & Copyright in 1 Single Line */}
        <footer className="pt-6 border-t border-white/10 flex flex-row items-center justify-between gap-6 sm:gap-8 text-xs text-zinc-400 whitespace-nowrap overflow-x-auto no-scrollbar w-full">
          {/* Navbar Links List in 1 Line */}
          <div className="flex items-center gap-4 sm:gap-6 font-semibold text-zinc-300 shrink-0">
            {[
              { label: 'Home', href: '#top' },
              { label: 'Projects', href: '#projects' },
              { label: 'Blog', href: '#blog' },
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Estimator', href: '#estimator' },
              { label: 'Review', href: '#testimonials' },
              { label: 'Contact', href: '#contact' },
            ].map((nav) => (
              <a
                key={nav.label}
                href={nav.href}
                onClick={(e) => {
                  if (nav.href.startsWith('#')) {
                    e.preventDefault();
                    window.location.hash = nav.href;
                    if (nav.href === '#top' || nav.label === 'Home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      document.querySelector(nav.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="hover:text-[#00ffc6] transition-colors"
              >
                {nav.label}
              </a>
            ))}
          </div>

          <div className="text-[11px] text-zinc-500 shrink-0">
            © 2026 <strong className="text-white">DraftoDeploy Agency</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-4 font-medium text-[11px] shrink-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#00ffc6] transition-colors flex items-center gap-1"
            >
              Back to Top ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default ContactSection;
