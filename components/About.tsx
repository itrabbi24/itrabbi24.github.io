'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiCode, FiZap, FiLayers, FiSmartphone } from 'react-icons/fi';
import Image from 'next/image';

interface AboutData {
  bio: string; location: string; email: string;
  github: string; linkedin: string;
  currentFocus: string; yearsExperience: string;
}

const DEFAULT: AboutData = {
  bio: "Experienced Full-Stack Software Developer with a strong focus on building scalable and maintainable web applications. Skilled across the full Software Development Life Cycle (SDLC) — from design and architecture to deployment. I specialize in .NET Core, PHP/Laravel, React, and Next.js, and I love creating products that are fast, reliable, and solve real problems.",
  location: 'Uttara, Dhaka, Bangladesh',
  email: 'itrabbi24@gmail.com',
  github: 'https://github.com/itrabbi24',
  linkedin: 'https://linkedin.com/in/itrabbi24',
  currentFocus: 'Building enterprise logistics and SaaS products',
  yearsExperience: '5+',
};

const STACK = [
  { key: '"backend"',  val: '".NET Core  ·  PHP/Laravel  ·  Node.js"' },
  { key: '"frontend"', val: '"React  ·  Next.js  ·  TypeScript"'       },
  { key: '"mobile"',   val: '"Flutter  ·  Dart"'                        },
  { key: '"database"', val: '"SQL Server  ·  MongoDB  ·  MySQL"'        },
  { key: '"devops"',   val: '"Docker  ·  Linux  ·  Nginx"'              },
];

const SERVICES = [
  { icon: FiLayers,     label: 'Full-Stack Web', desc: 'End-to-end apps from database to UI' },
  { icon: FiCode,       label: 'Enterprise APIs', desc: '.NET / Laravel RESTful services' },
  { icon: FiSmartphone, label: 'Mobile Apps',     desc: 'Cross-platform with Flutter' },
  { icon: FiZap,        label: 'Performance',     desc: 'Optimization & scalable architecture' },
];

const QUICK_LINKS = [
  { Icon: FiMapPin,   text: 'Uttara, Dhaka, Bangladesh', href: undefined           },
  { Icon: FiMail,     text: 'itrabbi24@gmail.com',       href: 'mailto:itrabbi24@gmail.com' },
  { Icon: FiGithub,   text: 'github.com/itrabbi24',      href: 'https://github.com/itrabbi24' },
  { Icon: FiLinkedin, text: 'linkedin.com/in/itrabbi24', href: 'https://linkedin.com/in/itrabbi24' },
];

const STATS = [
  { value: '5+',  label: 'Years Experience' },
  { value: '20+', label: 'Projects Delivered' },
  { value: '20+', label: 'Technologies' },
];

const fade  = (dir: 'left' | 'right', delay = 0) => ({
  initial:  { opacity: 0, x: dir === 'left' ? -28 : 28 },
  animate:  { opacity: 1, x: 0 },
  transition: { duration: 0.55, delay },
});

export default function About() {
  const [data, setData] = useState<AboutData>(DEFAULT);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.07 });

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(d => {
      if (d?.bio || d?.location) setData(prev => ({ ...prev, ...d }));
    }).catch(() => {});
  }, []);

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* bg orb */}
      <div className="orb w-[500px] h-[500px] top-0 right-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="section-label">Get to know me</span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ════ LEFT ════ */}
          <motion.div
            {...fade('left', 0.05)}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6"
          >
            {/* Photo */}
            <div className="relative">
              <div
                className="absolute inset-[-2px] rounded-2xl opacity-50 blur-[3px]"
                style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }}
              />
              <div
                className="relative w-52 h-52 rounded-2xl overflow-hidden border"
                style={{ borderColor: 'var(--border-hi)' }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/u/52894020?v=4"
                  alt="ARG RABBY" fill className="object-cover" priority
                />
              </div>
              {/* years badge */}
              <div
                className="absolute -bottom-3 -right-3 px-3.5 py-2 rounded-xl border shadow-lg"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-hi)' }}
              >
                <p className="gradient-text font-black text-sm leading-none">
                  {data.yearsExperience}
                </p>
                <p className="text-[9px] font-medium mt-0.5" style={{ color: 'var(--text-3)' }}>
                  Years Exp
                </p>
              </div>
            </div>

            {/* Quick links */}
            <div className="w-full space-y-2">
              {QUICK_LINKS.map(({ Icon, text, href }) => {
                const inner = (
                  <>
                    <Icon size={13} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
                    <span className="truncate text-[13px]">{text}</span>
                  </>
                );
                const base = `flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all`;
                const style = { background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-2)' };
                return href ? (
                  <a
                    key={text}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${base} hover:border-[var(--border-hi)] hover:text-[var(--cyan)]`}
                    style={style}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={text} className={base} style={style}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* "What I do" cards */}
            <div className="w-full grid grid-cols-2 gap-2">
              {SERVICES.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl border transition-all hover:border-[var(--border-hi)]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <Icon size={15} className="mb-2" style={{ color: 'var(--violet)' }} />
                  <p className="text-[11px] font-bold mb-0.5" style={{ color: 'var(--text)' }}>{label}</p>
                  <p className="text-[10px] leading-snug" style={{ color: 'var(--text-3)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════ RIGHT ════ */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {data.bio}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                Currently focused on{' '}
                <span className="font-semibold" style={{ color: 'var(--cyan)' }}>
                  {data.currentFocus}
                </span>
                . Passionate about clean code, system performance, and great developer experience.
              </p>
            </div>

            {/* Tech stack code block */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* header bar */}
              <div
                className="flex items-center gap-2.5 px-5 py-3 border-b"
                style={{ background: 'var(--bg-alt)', borderColor: 'var(--border)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
                <p className="font-mono text-[11px] ml-2" style={{ color: 'var(--text-3)' }}>
                  stack.json
                </p>
              </div>
              {/* code lines */}
              <div className="p-5 font-mono text-sm space-y-1.5">
                <p style={{ color: 'var(--text-3)' }}>{'{'}</p>
                {STACK.map(({ key, val }, i) => (
                  <motion.p
                    key={key}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.09 }}
                    className="pl-5"
                  >
                    <span style={{ color: 'var(--violet)' }}>{key}</span>
                    <span style={{ color: 'var(--text-3)' }}>: </span>
                    <span style={{ color: 'var(--emerald)' }}>{val}</span>
                    {i < STACK.length - 1 && <span style={{ color: 'var(--text-3)' }}>,</span>}
                  </motion.p>
                ))}
                <p style={{ color: 'var(--text-3)' }}>{'}'}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-5 rounded-2xl border transition-all hover:border-[var(--border-hi)]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <p className="text-2xl font-black gradient-text leading-none">{value}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: 'var(--text-3)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
