'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { IconType } from 'react-icons';
import { FiDatabase } from 'react-icons/fi';
import {
  SiBootstrap,
  SiCss,
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiVuedotjs,
} from 'react-icons/si';

type Category = 'Backend' | 'Frontend' | 'Database' | 'Tools';

type TechLogo = {
  id: string;
  label: string;
  category: Category;
  aliases: string[];
  color: string;
  Icon: IconType;
};

const GITHUB_STACK: TechLogo[] = [
  { id: 'dotnet-core', label: '.NET Core',     category: 'Backend',   aliases: ['.NET Core', 'ASP.NET Core', 'C# / .NET', '.NET'], color: '#512BD4', Icon: SiDotnet    },
  { id: 'php',         label: 'PHP',           category: 'Backend',   aliases: ['PHP', 'PHP / Laravel'],                           color: '#777BB4', Icon: SiPhp       },
  { id: 'laravel',     label: 'Laravel',       category: 'Backend',   aliases: ['Laravel', 'PHP / Laravel'],                       color: '#FF2D20', Icon: SiLaravel   },
  { id: 'nodejs',      label: 'Node.js',       category: 'Backend',   aliases: ['Node.js'],                                        color: '#5FA04E', Icon: SiNodedotjs },
  { id: 'express',     label: 'Express.js',    category: 'Backend',   aliases: ['Express.js', 'Express'],                          color: '#888888', Icon: SiExpress   },
  { id: 'javascript',  label: 'JavaScript',    category: 'Frontend',  aliases: ['JavaScript'],                                     color: '#F7DF1E', Icon: SiJavascript},
  { id: 'jquery',      label: 'jQuery',        category: 'Frontend',  aliases: ['jQuery'],                                         color: '#0769AD', Icon: SiJquery    },
  { id: 'react',       label: 'React',         category: 'Frontend',  aliases: ['React', 'React.js'],                              color: '#61DAFB', Icon: SiReact     },
  { id: 'vue',         label: 'Vue.js',        category: 'Frontend',  aliases: ['Vue', 'Vue.js'],                                  color: '#4FC08D', Icon: SiVuedotjs  },
  { id: 'html5',       label: 'HTML5',         category: 'Frontend',  aliases: ['HTML', 'HTML5', 'HTML / CSS'],                    color: '#E34F26', Icon: SiHtml5     },
  { id: 'css3',        label: 'CSS3',          category: 'Frontend',  aliases: ['CSS', 'CSS3', 'HTML / CSS'],                      color: '#1572B6', Icon: SiCss       },
  { id: 'bootstrap',   label: 'Bootstrap',     category: 'Frontend',  aliases: ['Bootstrap'],                                      color: '#7952B3', Icon: SiBootstrap },
  { id: 'tailwindcss', label: 'Tailwind CSS',  category: 'Frontend',  aliases: ['Tailwind CSS'],                                   color: '#06B6D4', Icon: SiTailwindcss},
  { id: 'mssql',       label: 'MS SQL',        category: 'Database',  aliases: ['MS SQL Server', 'MS SQL'],                        color: '#CC2927', Icon: FiDatabase  },
  { id: 'mysql',       label: 'MySQL',         category: 'Database',  aliases: ['MySQL'],                                          color: '#4479A1', Icon: SiMysql     },
  { id: 'postgresql',  label: 'PostgreSQL',    category: 'Database',  aliases: ['PostgreSQL'],                                     color: '#4169E1', Icon: SiPostgresql},
  { id: 'sqlite',      label: 'SQLite',        category: 'Database',  aliases: ['SQLite'],                                         color: '#44A8D0', Icon: SiSqlite    },
  { id: 'mongodb',     label: 'MongoDB',       category: 'Database',  aliases: ['MongoDB'],                                        color: '#47A248', Icon: SiMongodb   },
  { id: 'git',         label: 'Git',           category: 'Tools',     aliases: ['Git', 'Git / GitHub'],                            color: '#F05032', Icon: SiGit       },
  { id: 'github',      label: 'GitHub',        category: 'Tools',     aliases: ['GitHub', 'Git / GitHub'],                         color: '#aaaaaa', Icon: SiGithub    },
];

const CATEGORIES: Array<'All' | Category> = ['All', 'Backend', 'Frontend', 'Database', 'Tools'];

const CATEGORY_COLORS: Record<Category, string> = {
  Backend:  '#512BD4',
  Frontend: '#06B6D4',
  Database: '#47A248',
  Tools:    '#F05032',
};

export default function Skills() {
  const [active, setActive]   = useState<'All' | Category>('All');
  const [hovered, setHovered] = useState<string | null>(null);
  const [ref, inView]         = useInView({ triggerOnce: true, threshold: 0.05 });

  const visibleStack = GITHUB_STACK.filter(item => active === 'All' || item.category === active);

  const countFor = (cat: 'All' | Category) =>
    cat === 'All' ? GITHUB_STACK.length : GITHUB_STACK.filter(i => i.category === cat).length;

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* bg orbs */}
      <div className="orb w-[500px] h-[500px] bottom-[-5%] left-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
      <div className="orb w-[400px] h-[400px] top-[10%] right-[-6%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-10"
        >
          <span className="section-label">Technologies I work with</span>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: 'var(--text)' }}>
              My <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                {GITHUB_STACK.length} technologies
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }} className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map(cat => {
              const isActive = active === cat;
              const accentColor = cat === 'All' ? undefined : CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                  style={{
                    background: isActive
                      ? (cat === 'All' ? 'linear-gradient(135deg, var(--cyan), var(--violet))' : `${accentColor}22`)
                      : 'var(--bg-card)',
                    borderColor: isActive ? (cat === 'All' ? 'transparent' : accentColor!) : 'var(--border-hi)',
                    color: isActive ? (cat === 'All' ? '#fff' : accentColor!) : 'var(--text-2)',
                    boxShadow: isActive && cat !== 'All' ? `0 0 12px ${accentColor}33` : 'none',
                  }}
                >
                  {cat}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-alt)',
                      color: isActive ? (cat === 'All' ? '#fff' : accentColor!) : 'var(--text-3)',
                    }}
                  >
                    {countFor(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-10 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {visibleStack.map((item, index) => {
              const Icon = item.Icon;
              const isHovered = hovered === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.75, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.75, y: 10 }}
                  transition={{ duration: 0.22, delay: inView ? Math.min(index * 0.03, 0.35) : 0 }}
                  whileHover={{ y: -6, scale: 1.06 }}
                  onHoverStart={() => setHovered(item.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="group relative flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border cursor-default transition-all duration-300"
                  style={{
                    background: isHovered
                      ? `linear-gradient(160deg, ${item.color}18 0%, var(--bg-card) 100%)`
                      : 'var(--bg-card)',
                    borderColor: isHovered ? `${item.color}66` : 'var(--border)',
                    boxShadow: isHovered ? `0 8px 28px ${item.color}22` : 'none',
                  }}
                  title={item.label}
                  aria-label={item.label}
                >
                  {/* glow dot top-right */}
                  <span
                    className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-opacity duration-300"
                    style={{
                      background: item.color,
                      opacity: isHovered ? 0.9 : 0,
                    }}
                  />

                  {/* icon */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
                    style={{
                      background: isHovered ? `${item.color}22` : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <Icon size={22} color={item.color} aria-hidden="true" />
                  </div>

                  {/* label */}
                  <p
                    className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight transition-colors duration-200 truncate w-full px-1"
                    style={{ color: isHovered ? item.color : 'var(--text-3)' }}
                  >
                    {item.label}
                  </p>

                  {/* bottom color bar */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      background: item.color,
                      width: isHovered ? '60%' : '0%',
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
