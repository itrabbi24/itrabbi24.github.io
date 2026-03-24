'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiBook, FiMapPin, FiCalendar } from 'react-icons/fi';

interface Experience {
  _id: string; type: 'work' | 'education';
  role: string; company: string; location: string; period: string;
  description: string; highlights: string[]; techStack: string[];
  current: boolean;
}

const DEFAULT: Experience[] = [
  { _id:'1', type:'work', role:'Software Engineer',
    company:'Sundarban Courier Service (SCS)', location:'Dhaka, Bangladesh',
    period:'Sep 2024 – Present', current: true,
    description:'Building and maintaining enterprise-scale courier and logistics management systems for one of Bangladesh\'s largest courier networks.',
    highlights:[
      'Developed PCM (Parcel & Courier Management) system with VB.NET + .NET Core',
      'Built Async SMS Service for real-time delivery notifications',
      'RESTful APIs for web and mobile client integration',
      'Optimized complex SQL Server queries for high-throughput operations',
    ],
    techStack:['VB.NET','.NET Core','C#','MS SQL Server','React','ASP.NET Core'] },

  { _id:'2', type:'work', role:'Software Engineer',
    company:'Shodagor Express Limited', location:'Dhaka, Bangladesh',
    period:'Jan 2022 – Sep 2024', current: false,
    description:'Designed and delivered full-stack enterprise solutions for logistics, HR, and field operations management.',
    highlights:[
      'FTS (Field Tracking System) for real-time field agent monitoring',
      'HR Management System — leave, attendance, payroll modules',
      'Automated reporting and analytics dashboards',
      'Integrated third-party logistics and payment APIs',
    ],
    techStack:['C#','ASP.NET Core','React','MS SQL Server','Laravel','MySQL'] },

  { _id:'3', type:'work', role:'Junior Executive (IT)',
    company:'Sundarban Courier Service (SCS)', location:'Dhaka, Bangladesh',
    period:'Oct 2019 – Jan 2022', current: false,
    description:'Developed internal enterprise tools for operations, inventory, and transport management across the courier network.',
    highlights:[
      'Time Sheet Management System for employee attendance tracking',
      'IT Stock Management for hardware/software inventory',
      'Transport Management System for vehicle tracking',
    ],
    techStack:['PHP','Laravel','MySQL','JavaScript','Bootstrap'] },

  { _id:'4', type:'work', role:'Computer Operator',
    company:'Sundarban Courier Service (SCS)', location:'Dhaka, Bangladesh',
    period:'Oct 2017 – Oct 2019', current: false,
    description:'Handled day-to-day IT operations and data entry for the courier management system, supporting branch-level operations.',
    highlights:[
      'Data entry and parcel tracking operations',
      'Maintained and updated daily operational reports',
      'Supported internal IT help-desk activities',
    ],
    techStack:['MS Office','Data Entry','IT Operations'] },

  { _id:'5', type:'education', role:'B.Sc in Computer Science & Engineering',
    company:'European University of Bangladesh (EUB)', location:'Dhaka, Bangladesh',
    period:'2019 – 2022', current: false,
    description:'Completed degree with Grade A, building a strong foundation in software engineering, algorithms, and web technologies.',
    highlights:['Grade: A','Focused on software engineering and web application development','Built multiple academic projects using modern tech stacks'],
    techStack:[] },

  { _id:'6', type:'education', role:'Diploma in Electrical Engineering',
    company:'Rajshahi Institute of Technology (RIT)', location:'Rajshahi, Bangladesh',
    period:'2012 – 2016', current: false,
    description:'Four-year diploma program covering electrical engineering fundamentals, providing a strong technical foundation.',
    highlights:['Studied electrical systems, circuits, and technical fundamentals','Developed analytical and problem-solving skills'],
    techStack:[] },
];

export default function Experience() {
  const [items,   setItems]   = useState<Experience[]>(DEFAULT);
  const [tab,     setTab]     = useState<'work' | 'education'>('work');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/experience').then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setItems(d);
    }).catch(() => {});
  }, []);

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
                  key={item._id}
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
