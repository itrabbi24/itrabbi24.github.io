'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMonitor, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { ArgLogoFull } from './ArgLogo';

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const opts = [
    { key: 'dark',   Icon: FiMoon    },
    { key: 'light',  Icon: FiSun     },
    { key: 'system', Icon: FiMonitor },
  ];
  const idx     = opts.findIndex(o => o.key === theme);
  const current = opts[idx] ?? opts[0];
  const next    = opts[(idx + 1) % opts.length];
  const { Icon } = current;

  return (
    <button
      onClick={() => setTheme(next.key)}
      title={`Switch to ${next.key} mode`}
      className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:scale-105"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-hi)', color: 'var(--text-3)' }}
    >
      <Icon size={14} />
    </button>
  );
}

export default function Navigation() {
  const [scrolled,    setScrolled]    = useState(false);
  const [active,      setActive]      = useState('');
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : ''}`}
      >
        <div className="container-xl h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <ArgLogoFull
              iconSize={30}
              className="transition-transform duration-200 group-hover:scale-105"
            />
          </button>

          {/* ── Desktop pill nav ── */}
          <nav
            className="hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="relative px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? '#fff' : 'var(--text-2)',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--cyan), var(--violet))'
                      : 'transparent',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:flex btn btn-primary py-2 px-4 text-xs"
            >
              Hire Me
            </button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border transition-all"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-hi)', color: 'var(--text-2)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b md:hidden"
            style={{ borderColor: 'var(--border)' }}
          >
            <nav className="container-xl py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = active === href.slice(1);
                return (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: isActive ? 'var(--cyan)' : 'var(--text-2)',
                      background: isActive ? 'rgba(34,211,238,0.07)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              <button onClick={() => scrollTo('#contact')} className="btn btn-primary mt-2 justify-center">
                Hire Me
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
