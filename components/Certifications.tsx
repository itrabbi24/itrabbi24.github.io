'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink, FiCalendar, FiHash, FiCheckCircle } from 'react-icons/fi';
import portfolioData from '@/data/portfolio.json';

interface Cert {
  id: string; title: string; issuer: string;
  date: string; credentialId: string; verifyUrl: string;
}

const ISSUER_META: Record<string, { accent: string; bg: string; short: string }> = {
  'HackerRank':       { accent: '#34d399', bg: 'rgba(52,211,153,0.10)',  short: 'HR'  },
  'Udemy':            { accent: '#a78bfa', bg: 'rgba(167,139,250,0.10)', short: 'UD'  },
  'Google':           { accent: '#4ade80', bg: 'rgba(74,222,128,0.10)',  short: 'GG'  },
  'Great Learning':   { accent: '#22d3ee', bg: 'rgba(34,211,238,0.10)',  short: 'GL'  },
  'Programming Hero': { accent: '#f472b6', bg: 'rgba(244,114,182,0.10)', short: 'PH'  },
  'Microsoft':        { accent: '#60a5fa', bg: 'rgba(96,165,250,0.10)',  short: 'MS'  },
  'Default':          { accent: '#a78bfa', bg: 'rgba(167,139,250,0.08)', short: '★'   },
};


function getMeta(issuer: string) {
  for (const key of Object.keys(ISSUER_META)) {
    if (issuer.includes(key)) return ISSUER_META[key];
  }
  return ISSUER_META.Default;
}

export default function Certifications() {
  const certs = portfolioData.certifications as Cert[];
  const [active, setActive] = useState('All');
  const [ref, inView]       = useInView({ triggerOnce: true, threshold: 0.05 });

  const issuers = ['All', ...Array.from(new Set(certs.map(c => c.issuer)))];
  const visible = active === 'All' ? certs : certs.filter(c => c.issuer === active);
  const countFor = (iss: string) => iss === 'All' ? certs.length : certs.filter(c => c.issuer === iss).length;

  return (
    <section id="certifications" className="section relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] top-[-5%] right-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)' }} />
      <div className="orb w-[400px] h-[400px] bottom-[-5%] left-[-6%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-10"
        >
          <span className="section-label">Credentials & Achievements</span>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: 'var(--text)' }}>
              My <span className="gradient-text">Certifications</span>
            </h2>
            {/* stat pills */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <FiAward size={12} style={{ color: 'var(--violet)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                  {certs.length} Certificates
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <FiCheckCircle size={12} style={{ color: 'var(--cyan)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                  {issuers.length - 1} Issuers
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Issuer filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }} className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            {issuers.map(iss => {
              const meta    = iss === 'All' ? null : getMeta(iss);
              const isActive = active === iss;
              return (
                <button
                  key={iss}
                  onClick={() => setActive(iss)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                  style={{
                    background: isActive
                      ? (iss === 'All' ? 'linear-gradient(135deg, var(--cyan), var(--violet))' : `${meta!.accent}20`)
                      : 'var(--bg-card)',
                    borderColor: isActive ? (iss === 'All' ? 'transparent' : meta!.accent) : 'var(--border-hi)',
                    color: isActive ? (iss === 'All' ? '#fff' : meta!.accent) : 'var(--text-2)',
                    boxShadow: isActive && iss !== 'All' ? `0 0 14px ${meta!.accent}33` : 'none',
                  }}
                >
                  {iss === 'All' ? 'All' : iss}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.18)' : 'var(--bg-alt)',
                      color: isActive ? (iss === 'All' ? '#fff' : meta!.accent) : 'var(--text-3)',
                    }}
                  >
                    {countFor(iss)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((cert, i) => {
              const meta = getMeta(cert.issuer);
              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 16 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.06, 0.4) }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${meta.accent}55`;
                    el.style.boxShadow   = `0 16px 40px ${meta.accent}18, 0 0 0 1px ${meta.accent}22`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.boxShadow   = 'none';
                  }}
                >
                  {/* Colored top strip */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}44)` }} />

                  <div className="flex flex-col gap-3 p-5 flex-1">
                    {/* Issuer row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Issuer avatar */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-black"
                          style={{ background: meta.bg, color: meta.accent, border: `1px solid ${meta.accent}40` }}
                        >
                          {meta.short}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold leading-none" style={{ color: meta.accent }}>
                            {cert.issuer}
                          </p>
                          <p className="flex items-center gap-1 text-[10px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                            <FiCalendar size={9} /> {cert.date}
                          </p>
                        </div>
                      </div>
                      {/* verified badge */}
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold"
                        style={{ background: `${meta.accent}15`, color: meta.accent }}
                      >
                        <FiCheckCircle size={9} /> Verified
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-sm font-bold leading-snug flex-1" style={{ color: 'var(--text)' }}>
                      {cert.title}
                    </p>

                    {/* Footer */}
                    <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
                      {cert.credentialId && (
                        <p className="flex items-center gap-1.5 text-[10px] font-mono truncate" style={{ color: 'var(--text-3)' }}>
                          <FiHash size={9} />
                          {cert.credentialId}
                        </p>
                      )}
                      {cert.verifyUrl ? (
                        <a
                          href={cert.verifyUrl}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] font-semibold transition-all hover:gap-2"
                          style={{ color: meta.accent }}
                        >
                          <FiExternalLink size={11} /> View Certificate
                        </a>
                      ) : (
                        <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>No link available</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
