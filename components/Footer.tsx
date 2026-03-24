'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { ArgLogoFull } from './ArgLogo';

const NAV = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Projects',       href: '#projects'       },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact'        },
];

const SOCIAL = [
  { Icon: FiGithub,   href: 'https://github.com/itrabbi24',      label: 'GitHub'   },
  { Icon: FiLinkedin, href: 'https://linkedin.com/in/itrabbi24', label: 'LinkedIn' },
  { Icon: FiMail,     href: 'mailto:itrabbi24@gmail.com',        label: 'Email'    },
];

export default function Footer() {
  const scrollTo = (href: string) =>
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      {/* top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent)' }}
      />

      <div className="container-xl py-14 relative z-10">

        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mb-3 hover:opacity-90 transition-opacity"
            >
              <ArgLogoFull iconSize={38} />
            </button>
            <p className="text-[13px] leading-relaxed mb-4 max-w-[200px]" style={{ color: 'var(--text-3)' }}>
              Full-Stack Developer building scalable, high-impact applications.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:scale-110"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-hi)',
                    color: 'var(--text-3)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--cyan)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--cyan)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-3)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
              Navigation
            </p>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-left text-sm transition-all hover:translate-x-0.5"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
              Contact
            </p>
            <div className="space-y-2 text-sm" style={{ color: 'var(--text-3)' }}>
              <a href="mailto:itrabbi24@gmail.com" className="block hover:text-[var(--cyan)] transition-colors">itrabbi24@gmail.com</a>
              <a href="https://github.com/itrabbi24" target="_blank" rel="noopener noreferrer" className="block hover:text-[var(--cyan)] transition-colors">github.com/itrabbi24</a>
              <a href="https://linkedin.com/in/itrabbi24" target="_blank" rel="noopener noreferrer" className="block hover:text-[var(--cyan)] transition-colors">linkedin.com/in/itrabbi24</a>
              <p>Uttara, Dhaka, Bangladesh</p>
              <div
                className="mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border w-fit"
                style={{ background: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.18)' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="avail-ping absolute inset-0 rounded-full" style={{ background: 'var(--emerald)' }} />
                  <span className="relative rounded-full h-1.5 w-1.5" style={{ background: 'var(--emerald)' }} />
                </span>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--emerald)' }}>
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} ARG RABBY. Made with{' '}
            <FiHeart size={11} className="text-red-400" />{' '}
            in Bangladesh
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--text-3)' }}>
            Next.js · TypeScript · Tailwind · MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
