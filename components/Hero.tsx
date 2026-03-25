'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi';
import Image from 'next/image';

const ROLES = [
  'Full-Stack Software Developer',
  '.NET Core & C# Expert',
  'PHP / Laravel Developer',
  'React & Next.js Developer',
  'Problem Solver & Tech Lover',
];

const STATS = [
  { value: '5+',   label: 'Years Exp.'   },
  { value: '20+',  label: 'Projects'     },
  { value: '20+',  label: 'Technologies' },
  { value: '100%', label: 'Commitment'   },
];

const TERM: { type: 'prompt' | 'cmd' | 'out' | 'ok'; text: string }[] = [
  { type: 'prompt', text: 'ARG_RABBY@portfolio:~$' },
  { type: 'cmd',    text: 'whoami' },
  { type: 'out',    text: 'ARG RABBY  —  Full-Stack Developer' },
  { type: 'cmd',    text: 'ls expertise/' },
  { type: 'out',    text: '.NET   React   Laravel   Flutter' },
  { type: 'cmd',    text: 'git log --oneline -2' },
  { type: 'out',    text: 'a1b2  Built enterprise courier system' },
  { type: 'out',    text: 'd4e5  Delivered 20+ production apps' },
  { type: 'cmd',    text: 'status --check' },
  { type: 'ok',     text: '● Available for new opportunities' },
];

const BADGES = [
  { label: '.NET',    color: '#a78bfa' },
  { label: 'React',   color: '#22d3ee' },
  { label: 'Laravel', color: '#f87171' },
  { label: 'Flutter', color: '#38bdf8' },
  { label: 'SQL',     color: '#f59e0b' },
  { label: 'Docker',  color: '#60a5fa' },
];

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);
  const [termIdx,   setTermIdx]   = useState(0);
  const [cur,       setCur]       = useState(true);

  /* typewriter */
  useEffect(() => {
    const role = ROLES[roleIdx % ROLES.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (displayed.length < role.length)
        t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 52);
      else t = setTimeout(() => setDeleting(true), 2400);
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 26);
      else { setDeleting(false); setRoleIdx(i => i + 1); }
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  /* terminal line-by-line reveal */
  useEffect(() => {
    if (termIdx < TERM.length) {
      const t = setTimeout(() => setTermIdx(i => i + 1), 380);
      return () => clearTimeout(t);
    }
  }, [termIdx]);

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setCur(c => !c), 580);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background orbs ── */}
      <div className="orb w-[500px] h-[500px] -top-[15%] -left-[10%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)' }}/>
      <div className="orb w-[500px] h-[500px] -bottom-[15%] -right-[8%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)' }}/>

      {/* dot grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--text-3) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}/>

      <div className="container-xl relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

          {/* ════════ LEFT — Text ════════ */}
          <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Mobile avatar — only on small screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex lg:hidden mb-6 relative"
            >
              <div
                className="w-24 h-24 rounded-2xl overflow-hidden border-2"
                style={{ borderColor: 'var(--cyan)', boxShadow: '0 0 20px var(--glow-c)' }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/u/52894020?v=4"
                  alt="ARG RABBY" width={96} height={96} className="object-cover w-full h-full" priority
                />
              </div>
              {/* small badge */}
              <div
                className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-hi)', color: 'var(--emerald)' }}
              >
                &lt;/ARG_RABBY&gt;
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
              style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.22)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="avail-ping absolute inset-0 rounded-full" style={{ background: 'var(--emerald)' }}/>
                <span className="relative rounded-full h-2 w-2" style={{ background: 'var(--emerald)' }}/>
              </span>
              <span className="text-xs font-semibold" style={{ color: 'var(--emerald)' }}>
                Available for new opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-sm font-medium mb-1" style={{ color: 'var(--text-3)' }}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl xs:text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black leading-none tracking-tight mb-4"
            >
              <span style={{ color: 'var(--text)' }}>ARG </span>
              <span className="shimmer-text">RABBY</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-2.5 mb-5 h-7 w-full"
            >
              <div
                className="w-[3px] h-6 rounded-full shrink-0"
                style={{ background: 'linear-gradient(to bottom, var(--cyan), var(--violet))' }}
              />
              <p className="text-sm sm:text-base font-semibold font-mono truncate" style={{ color: 'var(--cyan)' }}>
                {displayed}<span className="cursor" style={{ color: 'var(--violet)' }}>|</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-sm sm:text-base leading-relaxed mb-7 max-w-lg"
              style={{ color: 'var(--text-2)' }}
            >
              Experienced Full-Stack Developer focused on building scalable, maintainable
              web applications. Skilled across the full SDLC — from design to deployment.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8"
            >
              <button onClick={() => scrollTo('contact')} className="btn btn-primary text-sm py-2.5 px-5">
                <FiMail size={14}/> Get in Touch
              </button>
              <a
                href="https://www.rotexit.com/cv.pdf"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline text-sm py-2.5 px-5"
              >
                <FiDownload size={14}/> Download CV
              </a>
              <a href="https://github.com/itrabbi24" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline !px-3" aria-label="GitHub">
                <FiGithub size={16}/>
              </a>
              <a href="https://linkedin.com/in/itrabbi24" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline !px-3" aria-label="LinkedIn">
                <FiLinkedin size={16}/>
              </a>
            </motion.div>

            {/* Mobile tech badges row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="flex lg:hidden flex-wrap justify-center gap-2 mb-7"
            >
              {BADGES.map(b => (
                <span
                  key={b.label}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
                  style={{
                    background: `${b.color}12`,
                    borderColor: `${b.color}30`,
                    color: b.color,
                  }}
                >
                  {b.label}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="flex justify-center lg:justify-start gap-6 sm:gap-8 pt-6 border-t w-full"
              style={{ borderColor: 'var(--border)' }}
            >
              {STATS.map(s => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black gradient-text leading-none">{s.value}</p>
                  <p className="text-[10px] sm:text-xs mt-1 font-medium" style={{ color: 'var(--text-3)' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════════ RIGHT — Terminal (desktop only) ════════ */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0,  scale: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="order-1 lg:order-2 hidden lg:flex justify-end"
          >
            <div className="relative w-full max-w-[420px]">

              {/* Avatar circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                className="absolute -right-3 -top-5 w-16 h-16 rounded-full overflow-hidden border-2 z-10"
                style={{ borderColor: 'var(--cyan)', boxShadow: '0 0 18px var(--glow-c)' }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/u/52894020?v=4"
                  alt="ARG RABBY" fill className="object-cover" priority
                />
              </motion.div>

              {/* Terminal window */}
              <div
                className="rounded-2xl overflow-hidden border"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-hi)',
                  boxShadow: '0 28px 56px rgba(0,0,0,0.5), 0 0 0 1px var(--border)',
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-3 px-4 py-2.5 border-b"
                  style={{ background: 'var(--bg-alt)', borderColor: 'var(--border)' }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
                  </div>
                  <span className="text-[11px] font-mono flex-1 text-center" style={{ color: 'var(--text-3)' }}>
                    ~/ARG_RABBY — bash
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 font-mono text-[13px] space-y-1 min-h-[260px]">
                  {TERM.slice(0, termIdx).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {line.type === 'prompt' && (
                        <p>
                          <span style={{ color: 'var(--emerald)' }}>❯ </span>
                          <span style={{ color: 'var(--cyan)' }}>{line.text}</span>
                        </p>
                      )}
                      {line.type === 'cmd' && (
                        <p>
                          <span style={{ color: 'var(--violet)' }}>$ </span>
                          <span style={{ color: 'var(--text)' }}>{line.text}</span>
                        </p>
                      )}
                      {line.type === 'out' && (
                        <p className="pl-4 text-[12px]" style={{ color: 'var(--text-2)' }}>{line.text}</p>
                      )}
                      {line.type === 'ok' && (
                        <p className="pl-4 font-semibold" style={{ color: 'var(--emerald)' }}>{line.text}</p>
                      )}
                    </motion.div>
                  ))}
                  {termIdx >= TERM.length && (
                    <div className="flex items-center gap-1 pt-1">
                      <span style={{ color: 'var(--violet)' }}>$ </span>
                      <span
                        className="inline-block w-[7px] h-[14px] rounded-sm"
                        style={{ background: 'var(--cyan)', opacity: cur ? 0.9 : 0, transition: 'opacity 0.08s' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Floating tech badges — desktop only */}
              {[
                { label: '.NET',    color: '#a78bfa', cls: 'absolute -left-10 top-[15%] float'   },
                { label: 'React',   color: '#22d3ee', cls: 'absolute -left-8  top-[48%] float-2' },
                { label: 'Laravel', color: '#f87171', cls: 'absolute -left-10 bottom-[18%] float-3' },
                { label: 'Flutter', color: '#38bdf8', cls: 'absolute -right-6 bottom-[8%]  float-4' },
              ].map(b => (
                <div
                  key={b.label}
                  className={`${b.cls} px-3 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-sm`}
                  style={{
                    background:   `${b.color}14`,
                    borderColor:  `${b.color}35`,
                    color: b.color,
                  }}
                >
                  {b.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        style={{ color: 'var(--text-3)' }}
        onClick={() => scrollTo('about')}
      >
        <span className="text-[9px] tracking-[0.22em] uppercase font-semibold">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <FiArrowDown size={13}/>
        </motion.div>
      </motion.div>
    </section>
  );
}
