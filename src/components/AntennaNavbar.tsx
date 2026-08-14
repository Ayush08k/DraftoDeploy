'use client';

import { useState, useEffect, useRef } from 'react';
import MobileSidebarDrawer from './MobileSidebarDrawer';
import type { NavItem } from '../RobotHero';

export default function AntennaNavbar({
  leftItems,
}: {
  leftItems: NavItem[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY <= 10) {
            // Always show at the very top
            setVisible(true);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling UP → show navbar
            setVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            // Scrolling DOWN → hide navbar
            setVisible(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      
      if (item.label.toLowerCase() === 'home' || item.href === '#top') {
        window.history.pushState(null, '', '/#top');
        window.location.hash = '#top';
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (item.href === '#blog') {
        window.history.pushState(null, '', '/blog');
        window.location.hash = '#blog';
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (item.href === '#projects') {
        window.history.pushState(null, '', '/projects');
        window.location.hash = '#projects';
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // In-page section anchors (About, Services, Estimator, Contact, Review)
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', `/${item.href}`);
        window.dispatchEvent(new Event('popstate'));
      }
      window.location.hash = item.href;

      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className="fixed top-4 inset-x-0 z-50 pointer-events-none flex justify-center px-4"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(calc(-100% - 2rem))',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center relative pointer-events-auto">
        {/* Mobile Sidebar Trigger & Drawer */}
        <MobileSidebarDrawer navItemsLeft={leftItems} />

        {/* Desktop Navbar (Large Screens) */}
        <div className="hidden lg:flex justify-center items-center w-full relative">
          <div className="flex items-center gap-1 sm:gap-2 px-5 py-2 rounded-full bg-white/60 border border-white/80 backdrop-blur-3xl backdrop-saturate-200 shadow-[0_12px_40px_rgba(0,0,0,0.25)] z-20">
            {/* Logo before Home */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/#top');
                window.location.hash = '#top';
                window.dispatchEvent(new Event('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center pr-3 pl-1 -my-2 hover:opacity-90 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="Drafto Deploy Logo"
                className="h-11 sm:h-12 w-auto object-contain mix-blend-multiply scale-120 origin-left"
              />
            </a>

            {leftItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                rel={
                  item.target === '_blank' ? 'noopener noreferrer' : undefined
                }
                onClick={(e) => handleNavClick(e, item)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-1.5 text-xs sm:text-sm font-bold text-zinc-900 hover:text-black transition-colors"
              >
                {item.label}
                {hoveredIndex === idx && (
                  <div className="absolute inset-0 bg-black/10 rounded-full -z-10 transition-all duration-200" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
