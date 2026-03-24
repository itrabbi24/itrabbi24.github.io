'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiDotnet, SiPhp, SiLaravel, SiNodedotjs, SiPython,
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss,
  SiJavascript, SiHtml5, SiMysql, SiMongodb,
  SiPostgresql, SiRedis, SiFlutter, SiDart,
  SiDocker, SiGit, SiLinux, SiNginx, SiBlazor, SiBootstrap,
  SiFigma, SiPostman, SiGithub,
} from 'react-icons/si';
import { FiDatabase, FiCode } from 'react-icons/fi';

interface Skill { _id: string; name: string; category: string; proficiency: number; color: string; }
type SvgIcon = React.ComponentType<{ size?: number; color?: string }>;

const ICON_MAP: Record<string, SvgIcon> = {
  'C# / .NET':SiDotnet, 'ASP.NET Core':SiDotnet, 'Blazor':SiBlazor,
  'PHP / Laravel':SiLaravel, 'Node.js':SiNodedotjs, 'Python':SiPython,
  'React.js':SiReact, 'Next.js':SiNextdotjs, 'Vue.js':SiVuedotjs,
  'TypeScript':SiTypescript, 'JavaScript':SiJavascript, 'Tailwind CSS':SiTailwindcss,
  'HTML / CSS':SiHtml5, 'Bootstrap':SiBootstrap,
  'MS SQL Server':FiDatabase, 'MySQL':SiMysql, 'MongoDB':SiMongodb,
  'PostgreSQL':SiPostgresql, 'Redis':SiRedis,
  'Flutter':SiFlutter, 'Dart':SiDart,
  'Docker':SiDocker, 'Git / GitHub':SiGithub, 'Linux':SiLinux,
  'Nginx':SiNginx, 'Figma':SiFigma, 'Postman':SiPostman, 'Git':SiGit,
};

const DEFAULT_SKILLS: Skill[] = [
  { _id:'1',  name:'C# / .NET',     category:'Backend',  proficiency:95, color:'#a78bfa' },
  { _id:'5',  name:'ASP.NET Core',  category:'Backend',  proficiency:90, color:'#818cf8' },
  { _id:'31', name:'Blazor',        category:'Backend',  proficiency:82, color:'#a78bfa' },
  { _id:'2',  name:'PHP / Laravel', category:'Backend',  proficiency:92, color:'#f87171' },
  { _id:'3',  name:'Node.js',       category:'Backend',  proficiency:85, color:'#4ade80' },
  { _id:'4',  name:'Python',        category:'Backend',  proficiency:78, color:'#60a5fa' },
  { _id:'6',  name:'React.js',      category:'Frontend', proficiency:90, color:'#22d3ee' },
  { _id:'7',  name:'Next.js',       category:'Frontend', proficiency:88, color:'#a78bfa' },
  { _id:'8',  name:'Vue.js',        category:'Frontend', proficiency:82, color:'#4ade80' },
  { _id:'9',  name:'TypeScript',    category:'Frontend', proficiency:88, color:'#60a5fa' },
  { _id:'10', name:'JavaScript',    category:'Frontend', proficiency:90, color:'#fbbf24' },
  { _id:'11', name:'Tailwind CSS',  category:'Frontend', proficiency:92, color:'#22d3ee' },
  { _id:'12', name:'HTML / CSS',    category:'Frontend', proficiency:95, color:'#fb923c' },
  { _id:'30', name:'Bootstrap',     category:'Frontend', proficiency:90, color:'#a78bfa' },
  { _id:'13', name:'MS SQL Server', category:'Database', proficiency:90, color:'#f87171' },
  { _id:'14', name:'MySQL',         category:'Database', proficiency:88, color:'#60a5fa' },
  { _id:'15', name:'MongoDB',       category:'Database', proficiency:82, color:'#4ade80' },
  { _id:'16', name:'PostgreSQL',    category:'Database', proficiency:78, color:'#60a5fa' },
  { _id:'17', name:'Redis',         category:'Database', proficiency:75, color:'#f87171' },
  { _id:'18', name:'Flutter',       category:'Mobile',   proficiency:80, color:'#38bdf8' },
  { _id:'19', name:'Dart',          category:'Mobile',   proficiency:80, color:'#22d3ee' },
  { _id:'20', name:'Docker',        category:'DevOps',   proficiency:78, color:'#38bdf8' },
  { _id:'21', name:'Git / GitHub',  category:'DevOps',   proficiency:92, color:'#f87171' },
  { _id:'22', name:'Linux',         category:'DevOps',   proficiency:80, color:'#fbbf24' },
  { _id:'23', name:'Nginx',         category:'DevOps',   proficiency:75, color:'#4ade80' },
  { _id:'24', name:'Figma',         category:'Tools',    proficiency:70, color:'#f87171' },
  { _id:'25', name:'Postman',       category:'Tools',    proficiency:85, color:'#fb923c' },
];

const CATEGORIES = ['All', 'Backend', 'Frontend', 'Database', 'Mobile', 'DevOps', 'Tools'];

export default function Skills() {
  const [skills,  setSkills]  = useState<Skill[]>(DEFAULT_SKILLS);
  const [active,  setActive]  = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setSkills(d);
    }).catch(() => {});
  }, []);

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="section relative overflow-hidden">
      <div className="orb w-[450px] h-[450px] bottom-[-5%] left-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }}/>

      <div className="container-xl" ref={ref}>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-8"
        >
          <span className="section-label">Technologies I work with</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {/* category tabs — horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  background: active === cat
                    ? 'linear-gradient(135deg, var(--cyan), var(--violet))'
                    : 'var(--bg-card)',
                  borderColor: active === cat ? 'transparent' : 'var(--border-hi)',
                  color: active === cat ? '#fff' : 'var(--text-2)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* skills grid */}
        <motion.div layout
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => {
              const Icon = ICON_MAP[skill.name] || FiCode;
              return (
                <motion.div
                  key={skill._id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.28, delay: inView ? Math.min(i * 0.035, 0.55) : 0 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="group p-3 sm:p-4 rounded-2xl border cursor-default transition-all duration-300"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow  = `0 8px 24px ${skill.color}18`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow  = 'none';
                  }}
                >
                  <div className="mb-2.5 flex justify-between items-start">
                    <Icon size={22} color={skill.color}/>
                    <span className="text-[9px] sm:text-[10px] font-bold font-mono" style={{ color: 'var(--text-3)' }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-semibold mb-2 leading-snug" style={{ color: 'var(--text)' }}>
                    {skill.name}
                  </p>
                  <div className="progress-bar">
                    {inView && (
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.proficiency}%`,
                          background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                          animation: 'progress-in 1s ease-out forwards',
                          animationDelay: `${Math.min(i * 0.035, 0.55)}s`,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
