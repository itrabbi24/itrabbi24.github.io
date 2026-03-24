'use client';

import { useEffect, useState } from 'react';
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

interface Skill {
  _id?: string;
  name: string;
  category: string;
  color?: string;
  order?: number;
}

type TechLogo = {
  id: string;
  label: string;
  category: Category;
  aliases: string[];
  color: string;
  Icon: IconType;
};

const GITHUB_STACK: TechLogo[] = [
  {
    id: 'dotnet-core',
    label: '.NET Core',
    category: 'Backend',
    aliases: ['.NET Core', 'ASP.NET Core', 'C# / .NET', '.NET'],
    color: '#512BD4',
    Icon: SiDotnet,
  },
  {
    id: 'php',
    label: 'PHP',
    category: 'Backend',
    aliases: ['PHP', 'PHP / Laravel'],
    color: '#777BB4',
    Icon: SiPhp,
  },
  {
    id: 'laravel',
    label: 'Laravel',
    category: 'Backend',
    aliases: ['Laravel', 'PHP / Laravel'],
    color: '#FF2D20',
    Icon: SiLaravel,
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'Backend',
    aliases: ['Node.js'],
    color: '#5FA04E',
    Icon: SiNodedotjs,
  },
  {
    id: 'express',
    label: 'Express.js',
    category: 'Backend',
    aliases: ['Express.js', 'Express'],
    color: 'var(--text)',
    Icon: SiExpress,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    category: 'Frontend',
    aliases: ['JavaScript'],
    color: '#F7DF1E',
    Icon: SiJavascript,
  },
  {
    id: 'jquery',
    label: 'jQuery',
    category: 'Frontend',
    aliases: ['jQuery'],
    color: '#0769AD',
    Icon: SiJquery,
  },
  {
    id: 'react',
    label: 'React',
    category: 'Frontend',
    aliases: ['React', 'React.js'],
    color: '#61DAFB',
    Icon: SiReact,
  },
  {
    id: 'vue',
    label: 'Vue.js',
    category: 'Frontend',
    aliases: ['Vue', 'Vue.js'],
    color: '#4FC08D',
    Icon: SiVuedotjs,
  },
  {
    id: 'html5',
    label: 'HTML5',
    category: 'Frontend',
    aliases: ['HTML', 'HTML5', 'HTML / CSS'],
    color: '#E34F26',
    Icon: SiHtml5,
  },
  {
    id: 'css3',
    label: 'CSS3',
    category: 'Frontend',
    aliases: ['CSS', 'CSS3', 'HTML / CSS'],
    color: '#1572B6',
    Icon: SiCss,
  },
  {
    id: 'bootstrap',
    label: 'Bootstrap',
    category: 'Frontend',
    aliases: ['Bootstrap'],
    color: '#7952B3',
    Icon: SiBootstrap,
  },
  {
    id: 'tailwindcss',
    label: 'Tailwind CSS',
    category: 'Frontend',
    aliases: ['Tailwind CSS'],
    color: '#06B6D4',
    Icon: SiTailwindcss,
  },
  {
    id: 'mssql',
    label: 'MS SQL Server',
    category: 'Database',
    aliases: ['MS SQL Server', 'MS SQL'],
    color: '#CC2927',
    Icon: FiDatabase,
  },
  {
    id: 'mysql',
    label: 'MySQL',
    category: 'Database',
    aliases: ['MySQL'],
    color: '#4479A1',
    Icon: SiMysql,
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'Database',
    aliases: ['PostgreSQL'],
    color: '#4169E1',
    Icon: SiPostgresql,
  },
  {
    id: 'sqlite',
    label: 'SQLite',
    category: 'Database',
    aliases: ['SQLite'],
    color: '#003B57',
    Icon: SiSqlite,
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    category: 'Database',
    aliases: ['MongoDB'],
    color: '#47A248',
    Icon: SiMongodb,
  },
  {
    id: 'git',
    label: 'Git',
    category: 'Tools',
    aliases: ['Git', 'Git / GitHub'],
    color: '#F05032',
    Icon: SiGit,
  },
  {
    id: 'github',
    label: 'GitHub',
    category: 'Tools',
    aliases: ['GitHub', 'Git / GitHub'],
    color: 'var(--text)',
    Icon: SiGithub,
  },
];

const CATEGORIES: Array<'All' | Category> = ['All', 'Backend', 'Frontend', 'Database', 'Tools'];

const CATEGORY_TEXT: Record<Category, string> = {
  Backend: 'Backend foundations from your GitHub stack.',
  Frontend: 'Frontend libraries and styling tools from your GitHub profile.',
  Database: 'Database technologies listed in your GitHub README.',
  Tools: 'Core development tools shown across your GitHub stack.',
};

export default function Skills() {
  const [remoteSkills, setRemoteSkills] = useState<Skill[]>([]);
  const [active, setActive] = useState<'All' | Category>('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/skills')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRemoteSkills(data);
        }
      })
      .catch(() => {});
  }, []);

  const visibleStack = GITHUB_STACK.filter((item) => active === 'All' || item.category === active).map((item) => {
    const remoteMatch = remoteSkills.find((skill) => item.aliases.includes(skill.name));
    return {
      ...item,
      color: remoteMatch?.color || item.color,
    };
  });

  return (
    <section id="skills" className="section relative overflow-hidden">
      <div
        className="orb w-[450px] h-[450px] bottom-[-5%] left-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }}
      />

      <div className="container-xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="section-label">Technologies I work with</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mt-1"
            style={{ color: 'var(--text)' }}
          >
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-2)' }}>
            A cleaner logo wall based on the stack shown on your GitHub profile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="mb-4"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  background:
                    active === category ? 'linear-gradient(135deg, var(--cyan), var(--violet))' : 'var(--bg-card)',
                  borderColor: active === category ? 'transparent' : 'var(--border-hi)',
                  color: active === category ? '#fff' : 'var(--text-2)',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-8 text-xs sm:text-sm"
          style={{ color: 'var(--text-3)' }}
        >
          {active === 'All' ? 'Hover a logo to inspect the stack.' : CATEGORY_TEXT[active]}
        </motion.p>

        <motion.div
          layout
          className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleStack.map((item, index) => {
              const Icon = item.Icon;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.24, delay: inView ? Math.min(index * 0.03, 0.32) : 0 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group relative aspect-square rounded-2xl border flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent), var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                  title={item.label}
                  aria-label={item.label}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${item.color}55, 0 14px 32px ${item.color}16`,
                    }}
                  />
                  <Icon size={30} color={item.color} aria-hidden="true" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
