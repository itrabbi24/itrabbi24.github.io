'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiBriefcase, HiAcademicCap, HiLocationMarker, HiCalendar } from 'react-icons/hi';

type TimelineItem = {
  type: 'work' | 'education';
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  highlights: string[];
  tech?: string[];
  color: string;
};

const timeline: TimelineItem[] = [
  {
    type: 'work',
    role: 'Software Engineer',
    company: 'Sundarban Courier Service (Pvt) Ltd',
    location: 'Uttara, Dhaka, Bangladesh',
    period: 'Sep 2024 – Present',
    current: true,
    description: 'Building enterprise PCM (Parcel Courier Management) system — both desktop and web platforms — and centralized SMS services.',
    highlights: [
      'Developing PCM Desktop Application using VB.NET + SQL Server',
      'Building PCM Web Application with .NET Core + SQL Server',
      'Developed Async SMS Service for centralized SMS management across branches',
      'Designing scalable architecture for courier tracking & dispatch workflows',
    ],
    tech: ['VB.NET', '.NET Core', 'SQL Server', 'C#'],
    color: '#6366f1',
  },
  {
    type: 'work',
    role: 'Software Engineer',
    company: 'Shodagor Express Limited',
    location: 'Keraniganj, Dhaka, Bangladesh',
    period: 'Jan 2022 – Sep 2024 · 2 yrs 9 mos',
    description: 'Full-Stack development and system support. Designed, developed, and maintained scalable software solutions for logistics operations.',
    highlights: [
      'Built Financial Transaction System (FTS) for multi-branch sales & expense management',
      'Developed comprehensive HR Management System covering attendance, salary & leave',
      'Led user training & adoption programs for internal enterprise tools',
      'Maintained high-availability systems with minimal downtime',
    ],
    tech: ['.NET Core', 'MSSQL', 'Bootstrap', 'jQuery', 'LINQ'],
    color: '#a855f7',
  },
  {
    type: 'work',
    role: 'Junior Executive – IT & Software Development',
    company: 'Sundarban Courier Service (Pvt) Ltd',
    location: 'Uttara, Dhaka, Bangladesh',
    period: 'Oct 2019 – Jan 2022 · 2 yrs 4 mos',
    description: 'Full-stack development using ASP.NET Core, Laravel, and PHP. Built internal operational tools from scratch.',
    highlights: [
      'Built Time Sheet Management System (Laravel + PHP + MySQL)',
      'Developed IT Stock Inventory Management System (Laravel + PHP + MySQL)',
      'Delivered Transport Management System with fuel tracking module (.NET Core + SQL Server)',
      'Collaborated with operations team to gather requirements and automate manual processes',
    ],
    tech: ['.NET Core', 'Laravel', 'PHP', 'MySQL', 'SQL Server'],
    color: '#ec4899',
  },
  {
    type: 'work',
    role: 'Computer Operator',
    company: 'Sundarban Courier Service (Pvt) Ltd',
    location: 'Kallyanpur, Dhaka, Bangladesh',
    period: 'Oct 2017 – Oct 2019 · 2 yrs 1 mo',
    description: 'IT support specialist ensuring smooth computer system operations across the organization.',
    highlights: [
      'Managed day-to-day IT operations and hardware maintenance',
      'Provided technical support to 50+ staff members',
      'Assisted in data entry and internal reporting systems',
      'Developed early interest in software development, leading to a career transition',
    ],
    color: '#22d3ee',
  },
  {
    type: 'education',
    role: 'B.Sc. in Computer Science & Engineering (CSE)',
    company: 'European University of Bangladesh (EUB)',
    location: 'Dhaka, Bangladesh',
    period: '2019 – 2022 · Graduated Jan 2023',
    description: 'Graduated with Grade A. Equipped with a strong foundation in computer science principles and practical software engineering skills.',
    highlights: [
      'Graduated with Grade A from the CSE department',
      'Strong foundation in algorithms, data structures & OOP',
      'Completed final project on enterprise software architecture',
      'Applied academic knowledge directly in concurrent professional roles',
    ],
    color: '#f59e0b',
  },
  {
    type: 'education',
    role: 'Diploma Engineering in Electrical',
    company: 'Rajshahi Institute of Technology (RIT)',
    location: 'Rajshahi, Bangladesh',
    period: '2012 – 2016',
    description: 'Comprehensive technical education in Electrical Engineering with practical hands-on skills.',
    highlights: [
      'Covered electrical circuits, electronics, and power systems',
      'Built strong analytical and problem-solving foundation',
      'Technical background that supports hardware-level understanding in IT',
    ],
    color: '#10b981',
  },
];

function TimelineItem({ item, index, inView }: { item: TimelineItem; index: number; inView: boolean }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 mb-12 last:mb-0`}>
      {/* Desktop dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10 top-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${item.color}20`,
            border: `2px solid ${item.color}`,
            boxShadow: `0 0 20px ${item.color}40`,
          }}
        >
          {item.type === 'work'
            ? <HiBriefcase style={{ color: item.color }} size={20} />
            : <HiAcademicCap style={{ color: item.color }} size={20} />
          }
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12, duration: 0.6 }}
        className="md:w-[calc(50%-3rem)] w-full ml-8 md:ml-0"
      >
        {/* Mobile dot */}
        <div
          className="md:hidden absolute left-0 top-6 w-4 h-4 rounded-full"
          style={{ background: item.color, boxShadow: `0 0 12px ${item.color}` }}
        />

        <div className="card p-6 hover:shadow-card-hover transition-all duration-300" style={{ borderColor: `${item.color}30` }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {item.current && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider"
                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                >
                  {item.type === 'work' ? 'Work' : 'Education'}
                </span>
              </div>
              <h3 className="font-bold text-white text-lg leading-tight">{item.role}</h3>
              <div className="text-base font-semibold mt-0.5" style={{ color: item.color }}>{item.company}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1.5">
              <HiCalendar size={13} style={{ color: item.color }} />
              {item.period}
            </span>
            <span className="flex items-center gap-1.5">
              <HiLocationMarker size={13} style={{ color: item.color }} />
              {item.location}
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

          <ul className="space-y-2 mb-4">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                {h}
              </li>
            ))}
          </ul>

          {item.tech && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {item.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/5 text-slate-400 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-cyan-400 uppercase tracking-widest">My journey</span>
          <h2 className="section-heading mt-2">
            Experience &amp; <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subheading">
            A timeline of my professional growth and academic background
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
               style={{ background: 'linear-gradient(180deg, #6366f1, #a855f7, #ec4899, #22d3ee, #f59e0b, #10b981)' }} />
          <div className="md:hidden absolute left-1.5 top-0 bottom-0 w-0.5"
               style={{ background: 'linear-gradient(180deg, #6366f1, #a855f7, #ec4899, #22d3ee, #f59e0b, #10b981)' }} />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Years of Experience', value: '7+',  color: '#6366f1' },
            { label: 'Companies Worked',    value: '2',   color: '#a855f7' },
            { label: 'Projects Delivered',  value: '10+', color: '#ec4899' },
            { label: 'Certifications',      value: '10+', color: '#22d3ee' },
          ].map(({ label, value, color }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              className="card p-6 text-center"
              style={{ borderColor: `${color}30` }}
            >
              <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
