'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { SiHackerrank } from 'react-icons/si';

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const socials = [
  { icon: FiGithub,     href: 'https://github.com/itrabbi24',                      label: 'GitHub'     },
  { icon: FiLinkedin,   href: 'https://www.linkedin.com/in/itrabbi24',             label: 'LinkedIn'   },
  { icon: SiHackerrank, href: 'https://www.hackerrank.com/profile/itrabbi24',      label: 'HackerRank' },
  { icon: FiMail,       href: 'mailto:itrabbi24@gmail.com',                        label: 'Email'      },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 py-12">
      {/* Gradient line top */}
      <div className="absolute top-0 left-0 right-0 h-px"
           style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, #ec4899, transparent)' }} />

      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono font-bold text-xl"
            >
              <span className="gradient-text">&lt;ARG</span>
              <span className="text-white/60"> RABBY</span>
              <span className="gradient-text">/&gt;</span>
            </button>
            <p className="text-xs text-slate-500 mt-1">Full-Stack Software Developer</p>
          </motion.div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title={label}
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} ARG RABBY. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <FiHeart className="text-pink-500" size={12} /> using Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
