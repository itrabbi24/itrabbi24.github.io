'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiDotnet, SiPhp, SiNodedotjs, SiReact, SiVuedotjs,
  SiNextdotjs, SiTypescript, SiJavascript, SiLaravel, SiExpress,
  SiMysql, SiMongodb, SiSqlite,
  SiGit, SiGithub, SiLinux,
  SiTailwindcss, SiBootstrap, SiJquery,
  SiFlutter, SiDart, SiHtml5,
} from 'react-icons/si';

type Skill = {
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  color: string;
  level: number;
  category: string;
  desc: string;
};

const skills: Skill[] = [
  // Backend
  { Icon: SiDotnet,             label: 'C# / .NET Core',  color: '#512BD4', level: 90, category: 'Backend',  desc: 'ASP.NET Core, Web API, Entity Framework, VB.NET' },
  { Icon: SiPhp,                label: 'PHP',              color: '#777BB4', level: 80, category: 'Backend',  desc: 'Object-oriented PHP for web applications' },
  { Icon: SiLaravel,            label: 'Laravel',          color: '#FF2D20', level: 75, category: 'Backend',  desc: 'Elegant PHP framework for modern apps' },
  { Icon: SiNodedotjs,          label: 'Node.js',          color: '#339933', level: 70, category: 'Backend',  desc: 'Server-side JavaScript runtime' },
  { Icon: SiExpress,            label: 'Express',          color: '#aaaaaa', level: 65, category: 'Backend',  desc: 'Minimal Node.js web application framework' },
  // Frontend
  { Icon: SiHtml5,              label: 'HTML5',            color: '#E34F26', level: 95, category: 'Frontend', desc: 'Semantic markup & modern HTML standards' },
  { Icon: SiJavascript,         label: 'JavaScript',       color: '#F7DF1E', level: 85, category: 'Frontend', desc: 'Core web scripting language' },
  { Icon: SiTypescript,         label: 'TypeScript',       color: '#3178C6', level: 65, category: 'Frontend', desc: 'Typed superset of JavaScript' },
  { Icon: SiReact,              label: 'React',            color: '#61DAFB', level: 70, category: 'Frontend', desc: 'Component-based UI library' },
  { Icon: SiNextdotjs,          label: 'Next.js',          color: '#ffffff', level: 70, category: 'Frontend', desc: 'React framework with SSR & SSG' },
  { Icon: SiVuedotjs,           label: 'Vue.js',           color: '#4FC08D', level: 65, category: 'Frontend', desc: 'Progressive JavaScript framework' },
  { Icon: SiJquery,             label: 'jQuery',           color: '#0769AD', level: 90, category: 'Frontend', desc: 'Fast, lightweight JS library' },
  { Icon: SiBootstrap,          label: 'Bootstrap',        color: '#7952B3', level: 85, category: 'Frontend', desc: 'Responsive CSS component framework' },
  { Icon: SiTailwindcss,        label: 'Tailwind CSS',     color: '#06B6D4', level: 80, category: 'Frontend', desc: 'Utility-first CSS framework' },
  // Database
  { Icon: SiDotnet,             label: 'MS SQL Server',    color: '#CC2927', level: 85, category: 'Database', desc: 'Enterprise relational DB with LINQ & EF Core' },
  { Icon: SiMysql,              label: 'MySQL',            color: '#4479A1', level: 80, category: 'Database', desc: 'Relational database management' },
  { Icon: SiSqlite,             label: 'SQLite',           color: '#003B57', level: 75, category: 'Database', desc: 'Lightweight embedded relational DB' },
  { Icon: SiMongodb,            label: 'MongoDB',          color: '#47A248', level: 65, category: 'Database', desc: 'Document-oriented NoSQL database' },
  // Mobile & Tools
  { Icon: SiFlutter,            label: 'Flutter',          color: '#02569B', level: 55, category: 'Mobile',   desc: 'Cross-platform mobile UI toolkit (learning)' },
  { Icon: SiDart,               label: 'Dart',             color: '#0175C2', level: 50, category: 'Mobile',   desc: 'Language powering Flutter apps (learning)' },
  { Icon: SiGit,                label: 'Git',              color: '#F05032', level: 90, category: 'Tools',    desc: 'Distributed version control system' },
  { Icon: SiGithub,             label: 'GitHub',           color: '#ffffff', level: 88, category: 'Tools',    desc: 'Code hosting & collaboration' },
  { Icon: SiLinux,              label: 'Linux',            color: '#FCC624', level: 70, category: 'Tools',    desc: 'Server administration & scripting' },
];

const categories = ['All', 'Backend', 'Frontend', 'Database', 'Mobile', 'Tools'];

const categoryColors: Record<string, string> = {
  Backend:  '#6366f1',
  Frontend: '#22d3ee',
  Database: '#a855f7',
  Mobile:   '#02569B',
  Tools:    '#f472b6',
};

function SkillCard({ skill, inView }: { skill: Skill; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default"
      style={{ transition: 'transform 0.3s ease' }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
        style={{ background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)` }}
      />

      <div
        className="card p-5 h-full transition-all duration-300"
        style={{
          borderColor: hovered ? `${skill.color}60` : 'rgba(99,102,241,0.2)',
          background: hovered ? `${skill.color}08` : undefined,
        }}
      >
        <div
          className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider"
          style={{ background: `${categoryColors[skill.category]}20`, color: categoryColors[skill.category] }}
        >
          {skill.category}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: `${skill.color}15`,
              border: `1px solid ${skill.color}30`,
              boxShadow: hovered ? `0 0 16px ${skill.color}40` : 'none',
            }}
          >
            <skill.Icon size={20} style={{ color: skill.color }} />
          </div>
          <div>
            <div className="font-semibold text-sm text-white">{skill.label}</div>
            <div className="text-[11px] text-slate-500 line-clamp-1">{skill.desc}</div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
            <span>Proficiency</span>
            <span style={{ color: skill.color }}>{skill.level}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-purple-400 uppercase tracking-widest">What I know</span>
          <h2 className="section-heading mt-2">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="section-subheading">
            A curated set of tools and technologies I use to build exceptional products
          </p>
        </motion.div>

        {/* Category filter */}
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white glass border border-white/10'
              }`}
              style={activeCategory === cat ? {
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
              } : {}}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.label} skill={skill} inView={inView} />
          ))}
        </motion.div>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Backend Technologies', value: '5+',  color: '#6366f1' },
            { label: 'Frontend Libraries',   value: '9+',  color: '#22d3ee' },
            { label: 'Databases',            value: '4',   color: '#a855f7' },
            { label: 'Learning Now',         value: 'Flutter', color: '#02569B' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center p-6 card" style={{ borderColor: `${color}30` }}>
              <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
