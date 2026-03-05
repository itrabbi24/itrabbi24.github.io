'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiStar, HiTag } from 'react-icons/hi';

type Project = {
  title: string;
  description: string;
  longDesc: string;
  tech: string[];
  category: string;
  github?: string;
  live?: string;
  featured?: boolean;
  gradient: string;
  emoji: string;
};

const projects: Project[] = [
  {
    title: 'PCM – Parcel Courier Management',
    description: 'Enterprise courier management platform with desktop & web apps for parcel tracking, dispatch, and SMS notifications.',
    longDesc: 'A full-scale Parcel Courier Management (PCM) system built for Sundarban Courier Service. Comprises a VB.NET desktop application and an ASP.NET Core web platform, both connected to SQL Server. Includes an Async SMS Service for centralized messaging across branches.',
    tech: ['VB.NET', '.NET Core', 'SQL Server', 'C#'],
    category: '.NET',
    github: 'https://github.com/itrabbi24',
    featured: true,
    gradient: 'from-indigo-600/20 to-purple-600/20',
    emoji: '📦',
  },
  {
    title: 'Financial Transaction System (FTS)',
    description: 'Centralized platform for end-to-end management of sales, expenses, and transaction settlements across multiple branches.',
    longDesc: 'Built for Shodagor Express Limited, the FTS manages all financial operations across company branches — sales tracking, expense recording, settlement workflows, and multi-branch reporting dashboards. Leverages LINQ for complex data querying.',
    tech: ['.NET Core', 'MSSQL', 'LINQ', 'Bootstrap', 'jQuery'],
    category: '.NET',
    github: 'https://github.com/itrabbi24',
    featured: true,
    gradient: 'from-emerald-600/20 to-teal-600/20',
    emoji: '💰',
  },
  {
    title: 'HR Management System',
    description: 'Comprehensive HR solution with attendance tracking, salary processing, leave management, and employee records.',
    longDesc: 'A complete HR platform covering the full employee lifecycle — onboarding, attendance tracking, payroll calculation, leave approval workflows, and performance reporting. Built with ASP.NET Core and MS SQL Server with a responsive Bootstrap frontend.',
    tech: ['.NET Core', 'MSSQL', 'LINQ', 'Bootstrap', 'jQuery'],
    category: '.NET',
    github: 'https://github.com/itrabbi24',
    featured: true,
    gradient: 'from-violet-600/20 to-purple-600/20',
    emoji: '👥',
  },
  {
    title: 'Transport Management System',
    description: 'Fleet and fuel management system for tracking vehicles, routes, drivers, and fuel consumption.',
    longDesc: 'A logistics-focused transport management solution covering vehicle fleet tracking, driver assignment, route planning, and a detailed fuel module for monitoring consumption and costs. Built with ASP.NET Core + SQL Server.',
    tech: ['.NET Core', 'SQL Server', 'Bootstrap', 'jQuery', 'LINQ'],
    category: '.NET',
    github: 'https://github.com/itrabbi24',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    emoji: '🚛',
  },
  {
    title: 'Time Sheet Management System',
    description: 'Transport time tracking and operational management system for logistics operations.',
    longDesc: 'A Laravel-based system for managing operational time sheets in transport logistics. Tracks work sessions, driver duty hours, route schedules, and generates summaries for payroll and compliance. Clean MVC architecture with MySQL backend.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    category: 'Laravel',
    github: 'https://github.com/itrabbi24',
    gradient: 'from-orange-600/20 to-red-600/20',
    emoji: '⏱️',
  },
  {
    title: 'IT Stock Inventory Management',
    description: 'Full inventory system for tracking IT equipment purchases, stock levels, storage, and servicing.',
    longDesc: 'Manages the complete IT asset lifecycle — procurement, stock-in/out, storage allocation, maintenance records, and service history. Built with Laravel + PHP + MySQL, featuring role-based access for IT admins and department heads.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    category: 'Laravel',
    github: 'https://github.com/itrabbi24',
    gradient: 'from-pink-600/20 to-rose-600/20',
    emoji: '🖥️',
  },
  {
    title: 'ArwizGlobal Inventory System',
    description: 'Modern web-based inventory management with Vue.js frontend and Laravel backend.',
    longDesc: 'A modern inventory management system with a Vue.js SPA frontend and Laravel REST API backend. Features real-time stock updates, supplier management, purchase orders, and dynamic reporting dashboards. Deployed with MySQL and Bootstrap.',
    tech: ['Laravel', 'PHP', 'Vue.js', 'MySQL', 'Bootstrap'],
    category: 'Laravel',
    github: 'https://github.com/itrabbi24',
    gradient: 'from-amber-600/20 to-yellow-600/20',
    emoji: '📊',
  },
];

const categories = ['All', '.NET', 'Laravel'];

const techColors: Record<string, string> = {
  'C#': '#512BD4', '.NET Core': '#6366f1', 'VB.NET': '#512BD4',
  'MSSQL': '#CC2927', 'SQL Server': '#CC2927', 'LINQ': '#512BD4',
  'React': '#61DAFB', 'Vue.js': '#4FC08D', 'Next.js': '#94a3b8',
  'TypeScript': '#3178C6', 'Node.js': '#339933',
  'Laravel': '#FF2D20', 'PHP': '#777BB4', 'MySQL': '#4479A1',
  'Bootstrap': '#7952B3', 'jQuery': '#0769AD',
};

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group cursor-pointer"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="card overflow-hidden relative">
        {/* Gradient header */}
        <div className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
          <div className="text-6xl">{project.emoji}</div>
          <div className="absolute inset-0 opacity-10"
               style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,.1) 25%, transparent 25%)', backgroundSize: '30px 30px' }} />
          {project.featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-2.5 py-1 text-yellow-400 text-xs font-medium">
              <HiStar size={12} /> Featured
            </div>
          )}
        </div>

        {/* Front content */}
        <div className="p-5">
          <h3 className="font-bold text-white text-lg mb-2 group-hover:text-indigo-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                    style={{ background: `${techColors[t] || '#6366f1'}15`, color: techColors[t] || '#6366f1', border: `1px solid ${techColors[t] || '#6366f1'}30` }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/5 text-slate-400 border border-white/10">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                 onClick={(e) => e.stopPropagation()}>
                <FiGithub size={14} /> <span>Code</span>
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                 onClick={(e) => e.stopPropagation()}>
                <FiExternalLink size={14} /> <span>Live</span>
              </a>
            )}
            <span className="ml-auto text-[10px] text-slate-600 group-hover:text-indigo-400 transition-colors select-none">
              hover for details ↑
            </span>
          </div>
        </div>

        {/* Slide-up detail overlay */}
        <motion.div
          initial={false}
          animate={{ y: expanded ? 0 : '100%' }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col p-6"
          style={{ background: 'rgba(8, 12, 30, 0.97)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl flex-shrink-0">{project.emoji}</span>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{project.title}</h3>
              {project.featured && (
                <span className="text-[10px] text-yellow-400 font-medium flex items-center gap-1 mt-0.5">
                  <HiStar size={10} /> Featured Project
                </span>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-3 flex-1 overflow-y-auto pr-1">
            {project.longDesc}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                    style={{ background: `${techColors[t] || '#6366f1'}20`, color: techColors[t] || '#6366f1', border: `1px solid ${techColors[t] || '#6366f1'}40` }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5"
                 onClick={(e) => e.stopPropagation()}>
                <FiGithub size={13} /><span>View Code</span>
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                 className="btn-outline py-2 px-4 text-xs flex items-center gap-1.5"
                 onClick={(e) => e.stopPropagation()}>
                <FiExternalLink size={13} /><span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-900/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-900/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-pink-400 uppercase tracking-widest">What I&apos;ve built</span>
          <h2 className="section-heading mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading">
            Real-world enterprise applications. Hover cards to flip and read more.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white glass border border-white/10'
              }`}
              style={activeCategory === cat ? {
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
              } : {}}
            >
              <HiTag size={12} />
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">Want to see more projects and open-source work?</p>
          <motion.a
            href="https://github.com/itrabbi24"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiGithub size={18} />
            <span>View All on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
