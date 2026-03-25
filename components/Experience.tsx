'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiBook, FiMapPin, FiCalendar } from 'react-icons/fi';
import portfolioData from '@/data/portfolio.json';

interface Experience {
  id: string; type: 'work' | 'education';
  role: string; company: string; location: string; period: string;
  description: string; highlights: string[]; techStack: string[];
  current: boolean;
}

export default function Experience() {
  const items = portfolioData.experience as Experience[];
  const [tab, setTab] = useState<'work' | 'education'>('work');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = items.filter(i => i.type === tab);

  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bottom-0 right-[-5%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="section-label">My journey</span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        {/* tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-10"
        >
          {([
            ['work',      'Work Experience', FiBriefcase],
            ['education', 'Education',       FiBook],
          ] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all"
              style={{
                background: tab === key
                  ? 'linear-gradient(135deg, var(--cyan), var(--violet))'
                  : 'var(--bg-card)',
                borderColor: tab === key ? 'transparent' : 'var(--border-hi)',
                color: tab === key ? '#fff' : 'var(--text-2)',
              }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </motion.div>

        {/* timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: tab === 'work' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === 'work' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* vertical line */}
            <div
              className="absolute left-5 top-4 bottom-4 w-[1px] timeline-line"
              style={{ opacity: 0.5 }}
            />

            <div className="space-y-5 pl-14">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="relative group"
                >
                  {/* dot */}
                  <div
                    className="absolute -left-[2.55rem] top-5 w-4 h-4 rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: 'var(--bg)',
                      background: item.current ? 'var(--cyan)' : 'var(--text-3)',
                      boxShadow: item.current ? '0 0 14px var(--glow-c)' : 'none',
                    }}
                  />

                  {/* card */}
                  <div
                    className="rounded-2xl border p-6 transition-all duration-300"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {/* role + meta */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-[15px]" style={{ color: 'var(--text)' }}>
                          {item.role}
                        </h3>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--cyan)' }}>
                          {item.company}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {item.current && (
                          <span
                            className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border font-semibold"
                            style={{
                              background: 'rgba(52,211,153,0.08)',
                              color: 'var(--emerald)',
                              borderColor: 'rgba(52,211,153,0.2)',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ background: 'var(--emerald)' }}
                            />
                            Current
                          </span>
                        )}
                        <div className="flex items-center gap-3">
                          <span
                            className="flex items-center gap-1 text-xs font-mono"
                            style={{ color: 'var(--text-3)' }}
                          >
                            <FiCalendar size={11} /> {item.period}
                          </span>
                          <span
                            className="hidden sm:flex items-center gap-1 text-xs"
                            style={{ color: 'var(--text-3)' }}
                          >
                            <FiMapPin size={11} /> {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* description */}
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                      {item.description}
                    </p>

                    {/* highlights */}
                    {item.highlights?.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {item.highlights.map((h, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: 'var(--text-2)' }}
                          >
                            <span
                              className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                              style={{ background: 'var(--cyan)' }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* tech stack */}
                    {item.techStack?.length > 0 && (
                      <div
                        className="flex flex-wrap gap-1.5 pt-3 border-t"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        {item.techStack.map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
