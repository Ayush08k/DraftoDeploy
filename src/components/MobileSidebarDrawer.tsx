'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronRight,
  GalleryVerticalEnd,
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  PieChart,
  Map,
  Sparkles,
  LogOut,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import type { NavItem } from '../RobotHero';

interface MobileSidebarDrawerProps {
  navItemsLeft: NavItem[];
  contactText: string;
  contactHref: string;
  ctaText: string;
  onCtaClick?: () => void;
}

const DATA = {
  user: {
    name: 'Skyleen',
    email: 'skyleen@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  teams: [
    {
      name: 'DraftoDeploy Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise 3D Core',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      icon: SquareTerminal,
      items: ['History', 'Starred 3D Presets', 'Settings'],
    },
    {
      title: '3D Models',
      icon: Bot,
      items: ['Robot Hero Core', 'Canvas Explorer', 'Quantum Shaders'],
    },
    {
      title: 'Documentation',
      icon: BookOpen,
      items: ['Introduction', 'Get Started', 'WebGL Guide', 'Changelog'],
    },
    {
      title: 'Settings',
      icon: Settings2,
      items: ['General', 'Team', 'Billing', 'Limits'],
    },
  ],
  projects: [
    { name: 'Design Engineering', icon: Frame },
    { name: 'Sales & Marketing', icon: PieChart },
    { name: 'Travel Apps', icon: Map },
  ],
};

export function MobileSidebarDrawer({
  navItemsLeft,
  contactText,
  contactHref,
  ctaText,
  onCtaClick,
}: MobileSidebarDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    Playground: true,
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="lg:hidden pointer-events-auto">
      {/* Mobile Bar Top Header Trigger */}
      <div className="flex items-center justify-between w-full px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center text-[#00ffc6]">
            <GalleryVerticalEnd className="w-4 h-4" />
          </div>
          <span className="font-black text-sm text-white tracking-tight">DraftoDeploy</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-full bg-zinc-900/90 border border-white/20 text-white backdrop-blur-md hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
          aria-label="Toggle Mobile Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-[#00ffc6]" /> : <Menu className="w-5 h-5 text-[#00ffc6]" />}
        </button>
      </div>

      {/* Slide-over Drawer Backdrop & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-[85vw] max-w-sm bg-zinc-950 border-l border-white/15 shadow-2xl flex flex-col overflow-y-auto text-white"
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00ffc6]/15 border border-[#00ffc6]/30 flex items-center justify-center text-[#00ffc6]">
                    <GalleryVerticalEnd className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{DATA.teams[0].name}</div>
                    <div className="text-xs text-[#00ffc6] font-medium">{DATA.teams[0].plan}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navbar Quick Links */}
              <div className="p-4 border-b border-white/10 space-y-2">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 mb-2">
                  Navigation
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {navItemsLeft.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/15 transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  ))}
                  <a
                    href={contactHref}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/15 transition-colors flex items-center justify-between"
                  >
                    <span>{contactText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onCtaClick?.();
                  }}
                  className="w-full mt-3 py-3 rounded-xl bg-[#00ffc6] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,198,0.4)]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{ctaText}</span>
                </button>
              </div>

              {/* Platform Collapsible Menu */}
              <div className="flex-1 p-4 space-y-6">
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 mb-3">
                    Platform Tools
                  </div>
                  <div className="space-y-1">
                    {DATA.navMain.map((group) => {
                      const Icon = group.icon;
                      const isExpanded = !!openSections[group.title];
                      return (
                        <div key={group.title} className="rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleSection(group.title)}
                            className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs font-semibold text-zinc-200 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 text-[#00ffc6]" />
                              <span>{group.title}</span>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 text-zinc-400 transition-transform ${
                                isExpanded ? 'rotate-90 text-[#00ffc6]' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-white/10 ml-4 my-1">
                              {group.items.map((sub) => (
                                <a
                                  key={sub}
                                  href="#"
                                  onClick={() => setIsOpen(false)}
                                  className="block py-1.5 px-2 text-[11px] text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                >
                                  {sub}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Projects Section */}
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 mb-3">
                    Projects
                  </div>
                  <div className="space-y-1">
                    {DATA.projects.map((proj) => {
                      const Icon = proj.icon;
                      return (
                        <a
                          key={proj.name}
                          href="#"
                          onClick={() => setIsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-white/5 flex items-center gap-2.5 text-xs text-zinc-300 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-purple-400" />
                          <span>{proj.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer User Info */}
              <div className="p-4 border-t border-white/10 bg-zinc-900/80 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={DATA.user.avatar}
                    alt={DATA.user.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{DATA.user.name}</div>
                    <div className="text-[11px] text-zinc-400 truncate">{DATA.user.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-zinc-300 hover:bg-white/10 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00ffc6]" />
                    <span>Pro</span>
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileSidebarDrawer;
