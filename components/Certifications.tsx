'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { FiExternalLink, FiAward, FiCheck } from 'react-icons/fi';
import { HiShieldCheck, HiCalendar, HiHashtag } from 'react-icons/hi';

type Cert = {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
};

const certifications: Cert[] = [
  {
    name: 'ASP.NET Core – SOLID and Clean Architecture',
    issuer: 'Udemy',
    date: 'Oct 2025',
    credentialId: 'UC-630ce1db-deb3-4a49-99f7-ef6fa600daf2',
    url: 'https://www.udemy.com/certificate/UC-630ce1db-deb3-4a49-99f7-ef6fa600daf2',
  },
  {
    name: 'Complete Web Development Course',
    issuer: 'Programming Hero',
    date: 'Dec 2024',
    credentialId: 'WEB9-0941',
    url: '',
  },
  {
    name: 'MERN Stack Level-2 Web Development',
    issuer: 'Programming Hero',
    date: 'Dec 2024',
    credentialId: 'MERN2-2025',
    url: '',
  },
  {
    name: 'Database Normalization',
    issuer: 'Great Learning',
    date: 'Oct 2024',
    credentialId: 'TVCETXRJ',
    url: 'https://www.mygreatlearning.com/certificate/TVCETXRJ',
  },
  {
    name: 'Prompt Engineering for ChatGPT',
    issuer: 'Great Learning',
    date: 'Oct 2024',
    credentialId: 'ERVZZYKK',
    url: 'https://www.mygreatlearning.com/certificate/ERVZZYKK',
  },
  {
    name: '.NET Core Microservices – The Complete Guide',
    issuer: 'Udemy',
    date: 'Oct 2023',
    credentialId: 'UC-5adc180e-cdb0-4d1c-a622-f11bc18ec48f',
    url: 'https://www.udemy.com/certificate/UC-5adc180e-cdb0-4d1c-a622-f11bc18ec48f',
  },
  {
    name: 'SQL (Advanced)',
    issuer: 'HackerRank',
    date: '',
    credentialId: '232C3CA6B8EA',
    url: 'https://www.hackerrank.com/certificates/232c3ca6b8ea',
  },
  {
    name: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    date: '',
    credentialId: '7AA2A56CBFE6',
    url: 'https://www.hackerrank.com/certificates/7aa2a56cbfe6',
  },
  {
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: '',
    credentialId: 'AF2E0E1B978F',
    url: 'https://www.hackerrank.com/certificates/af2e0e1b978f',
  },
  {
    name: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    date: 'Jun 2020',
    credentialId: 'HY8 239 TVV',
    url: '',
  },
];

const issuerMeta: Record<string, { color: string; bg: string; emoji: string }> = {
  'Udemy':                { color: '#a435f0', bg: 'rgba(164,53,240,0.12)', emoji: '🎓' },
  'Programming Hero':     { color: '#f97316', bg: 'rgba(249,115,22,0.12)', emoji: '🚀' },
  'Great Learning':       { color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)', emoji: '📘' },
  'HackerRank':           { color: '#00ea64', bg: 'rgba(0,234,100,0.12)',  emoji: '💻' },
  'Google Digital Garage':{ color: '#4285F4', bg: 'rgba(66,133,244,0.12)', emoji: '🔵' },
};

const allIssuers = ['All', ...Array.from(new Set(certifications.map((c) => c.issuer)))];

function CertCard({ cert, index, inView }: { cert: Cert; index: number; inView: boolean }) {
  const meta = issuerMeta[cert.issuer] ?? { color: '#6366f1', bg: 'rgba(99,102,241,0.12)', emoji: '🏅' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative card p-5 flex flex-col gap-4 transition-all duration-300"
      style={{ borderColor: `${meta.color}25` }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${meta.color}10, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: meta.bg, border: `1px solid ${meta.color}30` }}
        >
          {meta.emoji}
        </div>

        {/* Verify badge */}
        {cert.url ? (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-mono flex-shrink-0 transition-all duration-200 hover:scale-105"
            style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}30` }}
          >
            <FiCheck size={10} /> Verify
            <FiExternalLink size={9} className="ml-0.5" />
          </a>
        ) : (
          <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-mono flex-shrink-0 bg-white/5 text-slate-500 border border-white/10">
            <HiShieldCheck size={10} /> Issued
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h3 className="font-semibold text-white text-sm leading-snug mb-1.5 group-hover:text-indigo-200 transition-colors">
          {cert.name}
        </h3>
        <span
          className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full"
          style={{ background: meta.bg, color: meta.color }}
        >
          {cert.issuer}
        </span>
      </div>

      {/* Footer meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-auto pt-3 border-t border-white/5">
        {cert.date && (
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <HiCalendar size={12} style={{ color: meta.color }} />
            {cert.date}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono truncate">
          <HiHashtag size={11} style={{ color: meta.color }} />
          {cert.credentialId}
        </span>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIssuer, setActiveIssuer] = useState('All');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const filtered = activeIssuer === 'All'
    ? certifications
    : certifications.filter((c) => c.issuer === activeIssuer);

  return (
    <section id="certifications" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
             style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-amber-400 uppercase tracking-widest">Verified achievements</span>
          <h2 className="section-heading mt-2">
            Licenses &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subheading">
            Continuous learning through industry-recognized courses and certifications
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {Object.entries(issuerMeta).map(([issuer, meta]) => {
            const count = certifications.filter((c) => c.issuer === issuer).length;
            return (
              <div key={issuer} className="flex items-center gap-2.5 text-sm">
                <span className="text-base">{meta.emoji}</span>
                <span className="font-medium" style={{ color: meta.color }}>{issuer}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full" style={{ background: meta.bg, color: meta.color }}>
                  ×{count}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {allIssuers.map((issuer) => {
            const meta = issuerMeta[issuer];
            const isActive = activeIssuer === issuer;
            return (
              <motion.button
                key={issuer}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveIssuer(issuer)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                style={isActive ? {
                  background: meta ? `linear-gradient(135deg, ${meta.color}cc, ${meta.color}88)` : 'linear-gradient(135deg, #6366f1, #a855f7)',
                  color: '#fff',
                  boxShadow: meta ? `0 4px 16px ${meta.color}40` : '0 4px 16px rgba(99,102,241,0.3)',
                } : {
                  background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                  color: '#94a3b8',
                  border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {meta && <span>{meta.emoji}</span>}
                {issuer}
                <span className="font-mono opacity-70">
                  ({issuer === 'All' ? certifications.length : certifications.filter(c => c.issuer === issuer).length})
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cert, i) => (
            <CertCard key={cert.credentialId} cert={cert} index={i} inView={inView} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 text-center"
        >
          <a
            href="https://www.hackerrank.com/profile/itrabbi24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <FiAward className="text-amber-400 group-hover:scale-110 transition-transform" size={16} />
            View all credentials on HackerRank
            <FiExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
