'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink, FiCalendar, FiHash } from 'react-icons/fi';

interface Cert {
  _id: string; title: string; issuer: string;
  date: string; credentialId: string; verifyUrl: string;
  image: string; order: number;
}

const ISSUER_THEME: Record<string, { accent: string; bg: string }> = {
  'Programming Hero': { accent: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
  'Great Learning':   { accent: '#22d3ee', bg: 'rgba(34,211,238,0.08)'  },
  'Udemy':            { accent: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  'HackerRank':       { accent: '#34d399', bg: 'rgba(52,211,153,0.08)'  },
  'Google':           { accent: '#4ade80', bg: 'rgba(74,222,128,0.08)'  },
  'Microsoft':        { accent: '#60a5fa', bg: 'rgba(96,165,250,0.08)'  },
  'Default':          { accent: 'var(--violet)', bg: 'rgba(167,139,250,0.07)' },
};

function getTheme(issuer: string) {
  for (const key of Object.keys(ISSUER_THEME)) {
    if (issuer.includes(key)) return ISSUER_THEME[key];
  }
  return ISSUER_THEME.Default;
}

const DEFAULT_CERTS: Cert[] = [
  { _id:'1', title:'Complete Web Development', issuer:'Programming Hero', date:'Dec 2024', credentialId:'WEB9-0941', verifyUrl:'', image:'', order:1 },
  { _id:'2', title:'MERN Stack Level-2', issuer:'Programming Hero', date:'Dec 2024', credentialId:'MERN2-2025', verifyUrl:'', image:'', order:2 },
  { _id:'3', title:'Database Normalization', issuer:'Great Learning', date:'2024', credentialId:'TVCETXRJ', verifyUrl:'https://www.mygreatlearning.com/certificate/TVCETXRJ', image:'', order:3 },
  { _id:'4', title:'Prompt Engineering for ChatGPT', issuer:'Great Learning', date:'2024', credentialId:'ERVZZYKK', verifyUrl:'https://www.mygreatlearning.com/certificate/ERVZZYKK', image:'', order:4 },
  { _id:'5', title:'.NET Core Microservices', issuer:'Udemy', date:'2023', credentialId:'UC-5adc180e', verifyUrl:'https://www.udemy.com/certificate/UC-5adc180e/', image:'', order:5 },
  { _id:'6', title:'ASP.NET Core SOLID & Clean Architecture', issuer:'Udemy', date:'2023', credentialId:'UC-630ce1db', verifyUrl:'https://www.udemy.com/certificate/UC-630ce1db/', image:'', order:6 },
  { _id:'7', title:'Fundamentals of Digital Marketing', issuer:'Google Digital Garage', date:'2023', credentialId:'HY8 239 TVV', verifyUrl:'', image:'', order:7 },
  { _id:'8', title:'SQL (Basic, Intermediate & Advanced)', issuer:'HackerRank', date:'2023', credentialId:'', verifyUrl:'https://www.hackerrank.com/itrabbi24', image:'', order:8 },
];

export default function Certifications() {
  const [certs,  setCerts]  = useState<Cert[]>(DEFAULT_CERTS);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/certifications').then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setCerts(d);
    }).catch(() => {});
  }, []);

  return (
    <section id="certifications" className="section relative overflow-hidden">
      <div className="orb w-[450px] h-[450px] top-[-5%] left-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label">Credentials</span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
            My <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certs.map((cert, i) => {
            const theme = getTheme(cert.issuer);
            return (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: Math.min(i * 0.09, 0.55) }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-4 p-5 rounded-2xl border transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${theme.accent}35`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.2), 0 0 0 1px ${theme.accent}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* icon + issuer */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: theme.bg, border: `1px solid ${theme.accent}30` }}
                  >
                    <FiAward size={18} style={{ color: theme.accent }} />
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-bold mb-0.5"
                      style={{ color: theme.accent }}
                    >
                      {cert.issuer}
                    </p>
                    <p
                      className="flex items-center gap-1 text-[10px]"
                      style={{ color: 'var(--text-3)' }}
                    >
                      <FiCalendar size={9} /> {cert.date}
                    </p>
                  </div>
                </div>

                {/* title */}
                <p className="text-sm font-bold leading-snug flex-1" style={{ color: 'var(--text)' }}>
                  {cert.title}
                </p>

                {/* footer */}
                <div className="space-y-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  {cert.credentialId && (
                    <p
                      className="flex items-center gap-1 text-[10px] font-mono"
                      style={{ color: 'var(--text-3)' }}
                    >
                      <FiHash size={10} /> {cert.credentialId}
                    </p>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-70"
                      style={{ color: theme.accent }}
                    >
                      <FiExternalLink size={11} /> Verify Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
