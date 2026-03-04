'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'About',          href: '#about'           },
  { label: 'Skills',         href: '#skills'          },
  { label: 'Projects',       href: '#projects'        },
  { label: 'Experience',     href: '#experience'      },
  { label: 'Certificates',   href: '#certifications'  },
  { label: 'Contact',        href: '#contact'         },
];

export default function Navigation() {
  const { theme, mounted, toggleTheme } = useTheme();
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState('');
  const [menuOpen, setMenuOpen]     = useState(false);

  // In light mode the nav is transparent when at top, sitting over the always-dark hero.
  // Only flip to dark text once the glass background appears (scrolled).
  const lightScrolled = mounted && theme === 'light' && scrolled;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = navLinks.map((l) => l.href.slice(1));
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono font-bold text-xl"
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text">&lt;ARG</span>
            <span
              className="text-white/80"
              style={lightScrolled ? { color: '#1e293b' } : { color: '#f8fafc' }}
            > RABBY</span>
            <span className="gradient-text">/&gt;</span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = activeSection === id;
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={lightScrolled ? { color: isActive ? '#1e293b' : '#64748b' } : {}}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full glass border border-white/10 text-slate-300 hover:text-white transition-colors"
              style={lightScrolled ? { color: '#475569' } : {}}
              aria-label="Toggle theme"
            >
              {!mounted ? <HiSun size={18} /> : theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
            </motion.button>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block btn-primary text-sm px-5 py-2.5"
            >
              <span>Hire Me</span>
            </motion.a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg glass border border-white/10 text-slate-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 glass md:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(href)}
                  className="text-2xl font-bold text-white/80 hover:text-white transition-colors"
                >
                  <span className="gradient-text"># </span>{label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                onClick={() => scrollTo('#contact')}
                className="btn-primary mt-4"
              >
                <span>Hire Me</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
