'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Project {
  _id: string; title: string; description: string; image: string;
  category: string; techStack: string[]; githubUrl: string; liveUrl: string;
  featured: boolean; order: number;
}

const DEFAULT_PROJECTS: Project[] = [
  { _id:'1', title:'Field Tracking System (FTS)', description:'Real-time field agent tracking and management system for logistics operations. Enables supervisors to monitor field staff, assign tasks, and track delivery statuses across thousands of daily operations.',
    image:'', category:'Enterprise', techStack:['C#','ASP.NET Core','React','MS SQL Server','SignalR'], githubUrl:'', liveUrl:'', featured:true, order:1 },
  { _id:'2', title:'Transport Management System', description:'Comprehensive vehicle and transport management platform for tracking fleet operations, driver assignments, route planning, and transport scheduling across the courier network.',
    image:'', category:'Enterprise', techStack:['PHP','Laravel','MySQL','JavaScript','Bootstrap'], githubUrl:'', liveUrl:'', featured:true, order:2 },
  { _id:'3', title:'HR Management System', description:'Full-featured HR platform with modules for employee management, leave tracking, attendance, payroll calculation, and performance reporting. Used by hundreds of employees across multiple branches.',
    image:'', category:'Enterprise', techStack:['C#','ASP.NET Core','React','MS SQL Server'], githubUrl:'', liveUrl:'', featured:true, order:3 },
  { _id:'4', title:'ArwizGlobal Inventory System', description:'End-to-end inventory management system for global product tracking, stock control, purchase orders, and multi-warehouse management for an international business.',
    image:'', category:'Enterprise', techStack:['PHP','Laravel','Vue.js','MySQL'], githubUrl:'', liveUrl:'', featured:false, order:4 },
  { _id:'5', title:'PCM — Parcel & Courier Management', description:'Core enterprise system for managing the full lifecycle of courier parcels — booking, tracking, delivery confirmation, and reporting for Bangladesh\'s major courier network.',
    image:'', category:'Enterprise', techStack:['VB.NET','.NET Core','MS SQL Server','React'], githubUrl:'', liveUrl:'', featured:false, order:5 },
  { _id:'6', title:'Git Message Generator', description:'AI-powered Git commit message generator CLI. Helps developers write meaningful, consistent commit messages following conventional commits standards.',
    image:'', category:'Tools', techStack:['TypeScript','AI/ML','Git','CLI'], githubUrl:'https://github.com/itrabbi24/Git_Message_Generator', liveUrl:'', featured:false, order:6 },
  { _id:'7', title:'DashLook', description:'Modern, feature-rich dashboard UI kit built for rapid admin panel development. Multiple layout options, dark/light mode, fully responsive design.',
    image:'', category:'Frontend', techStack:['React','Tailwind CSS','TypeScript'], githubUrl:'https://github.com/itrabbi24/DashLook', liveUrl:'', featured:false, order:7 },
  { _id:'8', title:'Sonner.NetCore', description:'.NET Core port of the popular Sonner toast notification library. Elegant, accessible toast notifications for ASP.NET Core and Blazor with zero dependencies.',
    image:'', category:'.NET', techStack:['C#','.NET Core','Blazor'], githubUrl:'https://github.com/itrabbi24/Sonner.NetCore', liveUrl:'', featured:false, order:8 },
  { _id:'9', title:'CN Formatter', description:'Flutter/Dart utility package for formatting consignment note (CN) numbers and courier tracking codes for Bangladesh courier services.',
    image:'', category:'Mobile', techStack:['Flutter','Dart'], githubUrl:'https://github.com/itrabbi24/CN_Formatter_ARG_RABBY', liveUrl:'', featured:false, order:9 },
  { _id:'10', title:'SS Interior Studio', description:'Professional website for SS Interior Studio — services showcase, portfolio gallery, and contact system for an interior design company.',
    image:'', category:'Frontend', techStack:['HTML','CSS','JavaScript'], githubUrl:'https://github.com/itrabbi24/SS-Interior-Studio', liveUrl:'http://ssinteriorstudio.com', featured:false, order:10 },
];

const CAT_ACCENT: Record<string, string> = {
  Enterprise: 'var(--cyan)',
  Frontend:   'var(--emerald)',
  Tools:      'var(--amber)',
  Mobile:     '#f472b6',
  '.NET':     'var(--violet)',
  Backend:    '#60a5fa',
};

function getCatColor(cat: string) {
  return CAT_ACCENT[cat] || 'var(--violet)';
}

function ProjectCard({
  project, i, inView, featured,
}: {
  project: Project; i: number; inView: boolean; featured: boolean;
}) {
  const accent = getCatColor(project.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.55) }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
        featured ? 'min-h-[200px]' : ''
      }`}
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}35`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.25), 0 0 0 1px ${accent}20`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {project.featured && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    background: 'rgba(251,191,36,0.08)',
                    color: 'var(--amber)',
                    borderColor: 'rgba(251,191,36,0.2)',
                  }}
                >
                  Featured
                </span>
              )}
              <span
                className="text-[10px] font-semibold"
                style={{ color: accent }}
              >
                {project.category}
              </span>
            </div>
            <h3
              className="font-bold text-base leading-snug group-hover:text-[var(--cyan)] transition-colors"
              style={{ color: 'var(--text)' }}
            >
              {project.title}
            </h3>
          </div>

          {/* links */}
          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:scale-110"
                style={{
                  borderColor: 'var(--border-hi)',
                  color: 'var(--text-3)',
                }}
                onClick={e => e.stopPropagation()}
              >
                <FiGithub size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:scale-110"
                style={{
                  borderColor: 'var(--border-hi)',
                  color: 'var(--text-3)',
                }}
                onClick={e => e.stopPropagation()}
              >
                <FiExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>
          {project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          {project.techStack?.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects,  setProjects]  = useState<Project[]>(DEFAULT_PROJECTS);
  const [showAll,   setShowAll]   = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setProjects(d);
    }).catch(() => {});
  }, []);

  const featured = projects.filter(p => p.featured);
  const others   = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="section relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] top-[-5%] right-[-12%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="section-label">What I&apos;ve built</span>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/itrabbi24"
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-all hover:opacity-80 shrink-0 mb-1"
            style={{ color: 'var(--text-3)' }}
          >
            <FiGithub size={15} /> GitHub profile
          </a>
        </motion.div>

        {/* featured 3-col grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {featured.map((p, i) => (
            <ProjectCard key={p._id} project={p} i={i} inView={inView} featured />
          ))}
        </div>

        {/* other projects (collapsible) */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2 pb-5">
                {others.map((p, i) => (
                  <ProjectCard
                    key={p._id} project={p}
                    i={i + featured.length}
                    inView={inView} featured={false}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* toggle button */}
        {others.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex justify-center pt-4"
          >
            <button
              onClick={() => setShowAll(s => !s)}
              className="btn btn-outline gap-2"
            >
              {showAll ? (
                <><FiChevronUp size={15} /> Show Less</>
              ) : (
                <><FiChevronDown size={15} /> Show {others.length} More Projects</>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
