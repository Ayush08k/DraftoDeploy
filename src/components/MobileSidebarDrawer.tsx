'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Layers } from 'lucide-react';
import type { NavItem } from '../RobotHero';

interface MobileSidebarDrawerProps {
  navItemsLeft: NavItem[];
}

export function MobileSidebarDrawer({
  navItemsLeft,
}: MobileSidebarDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    window.location.hash = href;

    if (href === '#top' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Mobile Top Floating Glass Header Bar */}
      <div className="lg:hidden pointer-events-auto w-full max-w-md mx-auto">
        <div className="flex items-center justify-between w-full px-4 py-2.5 rounded-full bg-zinc-900/90 border border-white/20 backdrop-blur-xl shadow-lg">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="flex items-center text-white font-black text-sm tracking-tight"
          >
            <img
              src="/logo.png"
              alt="Drafto Deploy Logo"
              className="h-10 sm:h-11 w-auto object-contain mix-blend-screen scale-115 origin-left"
            />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#00ffc6]" /> : <Menu className="w-5 h-5 text-[#00ffc6]" />}
          </button>
        </div>
      </div>

      {/* Slide-over Mobile & Tablet Drawer via React Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm pointer-events-auto"
                />

                {/* Sidebar Drawer Panel */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="fixed top-0 right-0 bottom-0 z-[9999] h-screen h-dvh w-[85vw] max-w-sm bg-zinc-950 border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto text-white pointer-events-auto"
                >
                  {/* Drawer Top Header */}
                  <div>
                    <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/60">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/logo.png"
                          alt="Drafto Deploy Logo"
                          className="h-7 w-auto object-contain mix-blend-screen"
                        />
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Navigation Items (Desktop Navbar Sections) */}
                    <div className="p-5 space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1 mb-2">
                        Menu Sections
                      </div>

                      <div className="space-y-2">
                        {navItemsLeft.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/10 hover:border-[#00ffc6]/40 hover:bg-zinc-900 transition-all flex items-center justify-between group"
                          >
                            <span className="text-sm font-bold text-zinc-200 group-hover:text-[#00ffc6] transition-colors">
                              {item.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#00ffc6] group-hover:translate-x-1 transition-all" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer CTA */}
                  <div className="p-5 border-t border-white/10 bg-zinc-900/80 space-y-3">
                    <a
                      href="#estimator"
                      onClick={(e) => handleNavClick(e, '#estimator')}
                      className="w-full py-3 rounded-xl bg-[#00ffc6] text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#00ffc6]/90 transition-all shadow-[0_0_20px_rgba(0,255,198,0.3)]"
                    >
                      <span>Get Instant Price Quote</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    <div className="text-center text-[10px] text-zinc-500 font-medium">
                      © 2026 DraftoDeploy Agency
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default MobileSidebarDrawer;
