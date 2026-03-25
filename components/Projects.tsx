'use client';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp, FiLock, FiStar, FiCode, FiImage, FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi';
import Image from 'next/image';
import portfolioData from '@/data/portfolio.json';

interface Project {
  _id?: string; id?: string;
  title: string; shortDesc?: string; description: string;
  image: string; screenshots?: string[];
  category: string; techStack: string[];
  githubUrl: string; liveUrl: string;
  featured: boolean; status?: string; order?: number;
}

/* ── Lightbox (portal — renders outside transform context) ── */
function Lightbox({ images, title, startIdx, onClose }: { images: string[]; title: string; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [images.length, onClose]);

  const content = (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10">
        <FiX size={18} className="text-white" />
      </button>

      {/* title */}
      <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">{title}</p>

      {/* main image */}
      <div className="relative w-full max-w-5xl" style={{ height: 'min(75vh, 600px)' }} onClick={e => e.stopPropagation()}>
        <Image src={images[idx]} alt={`${title} ${idx + 1}`} fill className="object-contain rounded-xl" unoptimized />

        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/10">
              <FiChevronLeft size={20} className="text-white" />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/10">
              <FiChevronRight size={20} className="text-white" />
            </button>
            <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto max-w-full px-4" onClick={e => e.stopPropagation()}>
          {images.map((src, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className="relative shrink-0 rounded-lg overflow-hidden border-2 transition-all"
              style={{ width: 72, height: 48, borderColor: i === idx ? '#fff' : 'transparent', opacity: i === idx ? 1 : 0.45 }}>
              <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(content, document.body);
}

/* ── Image carousel used inside each project card ── */
function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }, [images.length]);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }, [images.length]);

  return (
    <>
      <div className="relative w-full h-full cursor-pointer" onClick={() => setLightbox(true)}>
        <Image src={images[idx]} alt={`${title} ${idx + 1}`} fill className="object-cover transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* expand icon — always visible */}
        <div className="absolute top-2 left-2 w-7 h-7 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all z-10">
          <FiMaximize2 size={11} className="text-white" />
        </div>

        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10">
              <FiChevronLeft size={14} className="text-white" />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10">
              <FiChevronRight size={14} className="text-white" />
            </button>
            {/* dot indicators — always visible */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                  className="rounded-full transition-all"
                  style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? '#fff' : 'rgba(255,255,255,0.55)' }} />
              ))}
            </div>
            {/* counter */}
            <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full z-10">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox images={images} title={title} startIdx={idx} onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

const CAT_META: Record<string, { accent: string; bg: string }> = {
  Enterprise: { accent: '#22d3ee', bg: 'rgba(34,211,238,0.08)'  },
  Frontend:   { accent: '#4ade80', bg: 'rgba(74,222,128,0.08)'  },
  Tools:      { accent: '#fbbf24', bg: 'rgba(251,191,36,0.08)'  },
  Mobile:     { accent: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
  '.NET':     { accent: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  Backend:    { accent: '#60a5fa', bg: 'rgba(96,165,250,0.08)'  },
};
const DEFAULT_META = { accent: '#a78bfa', bg: 'rgba(167,139,250,0.08)' };
function getMeta(cat: string) { return CAT_META[cat] || DEFAULT_META; }

function ProjectCard({ project, i, inView }: { project: Project; i: number; inView: boolean }) {
  const meta      = getMeta(project.category);
  const isOpenSrc = !!project.githubUrl;
  const key       = project._id || project.id || String(i);
  const initials  = project.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const images    = [project.image, ...(project.screenshots || [])].filter(Boolean) as string[];

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.5) }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${meta.accent}55`;
        el.style.boxShadow   = `0 20px 44px ${meta.accent}18, 0 0 0 1px ${meta.accent}22`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--border)';
        el.style.boxShadow   = 'none';
      }}
    >
      {/* ── Image area ── */}
      <div className="relative h-44 overflow-hidden">
        {images.length > 0 ? (
          <ProjectCarousel images={images} title={project.title} />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 relative"
            style={{ background: `linear-gradient(135deg, ${meta.bg}, transparent)` }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(${meta.accent}22 1px, transparent 1px), linear-gradient(90deg, ${meta.accent}22 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black border"
              style={{ background: meta.bg, borderColor: `${meta.accent}40`, color: meta.accent }}>
              {initials}
            </div>
            <span className="relative z-10 flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-3)' }}>
              <FiImage size={11} /> No screenshot yet
            </span>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${meta.accent}12, transparent 70%)` }} />
          </div>
        )}

        {/* category + featured badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.featured && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.9)', color: '#000' }}>
              <FiStar size={8} fill="#000" /> Featured
            </span>
          )}
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${meta.accent}dd`, color: '#000' }}>
            {project.category}
          </span>
        </div>

        {/* photo count badge */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
              <FiImage size={9} /> {images.length} photos
            </span>
          </div>
        )}

        {/* open/private badge */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', color: isOpenSrc ? '#4ade80' : '#94a3b8' }}>
            {isOpenSrc ? <FiCode size={9} /> : <FiLock size={9} />}
            {isOpenSrc ? 'Open' : 'Private'}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-bold text-[15px] leading-snug transition-colors duration-200 group-hover:text-[var(--cyan)]"
          style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>

        <p className="text-[13px] leading-relaxed flex-1 line-clamp-3" style={{ color: 'var(--text-2)' }}>
          {project.shortDesc || project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          {project.techStack?.map(t => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
              style={{ background: 'var(--bg-alt)', borderColor: 'var(--border-hi)', color: 'var(--text-3)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* action buttons */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex items-center gap-2 pt-1">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                style={{ background: 'var(--bg-alt)', borderColor: 'var(--border-hi)', color: 'var(--text-2)' }}>
                <FiGithub size={12} /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                style={{ background: meta.bg, borderColor: `${meta.accent}40`, color: meta.accent }}>
                <FiExternalLink size={12} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const staticProjects = portfolioData.projects as Project[];
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [active,  setActive]  = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [ref, inView]         = useInView({ triggerOnce: true, threshold: 0.05 });

  // Try to load admin-managed projects from DB; fall back to JSON
  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setDbProjects(d);
    }).catch(() => {});
  }, []);

  const projects   = dbProjects.length > 0 ? dbProjects : staticProjects;
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered   = active === 'All' ? projects : projects.filter(p => p.category === active);
  const featured   = filtered.filter(p => p.featured);
  const others     = filtered.filter(p => !p.featured);
  const openCount  = projects.filter(p => p.githubUrl).length;
  const countFor   = (cat: string) => cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;

  return (
    <section id="projects" className="section relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] top-[-5%] right-[-12%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />
      <div className="orb w-[400px] h-[400px] bottom-[-5%] left-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-10"
        >
          <span className="section-label">What I&apos;ve built</span>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: 'var(--text)' }}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <FiCode size={12} style={{ color: 'var(--cyan)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                  {projects.length} Projects
                </span>
              </div>
              <a href="https://github.com/itrabbi24" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:border-[var(--border-hi)]"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <FiGithub size={12} style={{ color: 'var(--text-3)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                  {openCount} Open Source
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }} className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            {categories.map(cat => {
              const meta     = cat === 'All' ? null : getMeta(cat);
              const isActive = active === cat;
              return (
                <button key={cat} onClick={() => { setActive(cat); setShowAll(false); }}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                  style={{
                    background: isActive ? (cat === 'All' ? 'linear-gradient(135deg, var(--cyan), var(--violet))' : `${meta!.accent}20`) : 'var(--bg-card)',
                    borderColor: isActive ? (cat === 'All' ? 'transparent' : meta!.accent) : 'var(--border-hi)',
                    color: isActive ? (cat === 'All' ? '#fff' : meta!.accent) : 'var(--text-2)',
                    boxShadow: isActive && cat !== 'All' ? `0 0 14px ${meta!.accent}33` : 'none',
                  }}
                >
                  {cat}
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.18)' : 'var(--bg-alt)',
                      color: isActive ? (cat === 'All' ? '#fff' : meta!.accent) : 'var(--text-3)',
                    }}>
                    {countFor(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Featured grid ── */}
        {featured.length > 0 && (
          <div className="mb-5">
            {active === 'All' && (
              <p className="text-xs font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-3)' }}>
                <FiStar size={11} style={{ color: '#fbbf24' }} /> Featured
              </p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p, i) => (
                <ProjectCard key={p._id || p.id || i} project={p} i={i} inView={inView} />
              ))}
            </div>
          </div>
        )}

        {/* ── More projects (collapsible) ── */}
        {others.length > 0 && (
          <>
            <AnimatePresence>
              {showAll && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  {active === 'All' && (
                    <p className="text-xs font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-3)' }}>
                      <FiCode size={11} /> More Projects
                    </p>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-5">
                    {others.map((p, i) => (
                      <ProjectCard key={p._id || p.id || i} project={p} i={i + featured.length} inView={inView} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }} className="flex justify-center pt-4">
              <button onClick={() => setShowAll(s => !s)} className="btn btn-outline gap-2">
                {showAll
                  ? <><FiChevronUp size={15} /> Show Less</>
                  : <><FiChevronDown size={15} /> Show {others.length} More Projects</>
                }
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
