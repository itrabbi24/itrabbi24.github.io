'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import {
  SiDotnet, SiPhp, SiNodedotjs, SiReact, SiVuedotjs,
  SiMysql, SiMongodb, SiGit, SiTypescript, SiLaravel,
  SiNextdotjs, SiFlutter,
} from 'react-icons/si';
import { HiCode, HiLightningBolt, HiCube, HiGlobe } from 'react-icons/hi';

const highlights = [
  { icon: HiCode,          label: 'Clean Architecture', desc: 'SOLID principles & design patterns'   },
  { icon: HiLightningBolt, label: 'High Performance',   desc: 'Optimized, scalable web solutions'    },
  { icon: HiCube,          label: 'Full-Stack Expertise',desc: 'End-to-end development capabilities' },
  { icon: HiGlobe,         label: 'RESTful API Design',  desc: 'Web API & enterprise integrations'   },
];

const techIcons = [
  { Icon: SiDotnet,              label: '.NET / C#',    color: '#512BD4' },
  { Icon: SiPhp,                 label: 'PHP',          color: '#777BB4' },
  { Icon: SiLaravel,             label: 'Laravel',      color: '#FF2D20' },
  { Icon: SiNodedotjs,           label: 'Node.js',      color: '#339933' },
  { Icon: SiReact,               label: 'React',        color: '#61DAFB' },
  { Icon: SiNextdotjs,           label: 'Next.js',      color: '#ffffff' },
  { Icon: SiVuedotjs,            label: 'Vue.js',       color: '#4FC08D' },
  { Icon: SiTypescript,          label: 'TypeScript',   color: '#3178C6' },
  { Icon: SiMysql,               label: 'SQL Server',   color: '#CC2927' },
  { Icon: SiMysql,               label: 'MySQL',        color: '#4479A1' },
  { Icon: SiMongodb,             label: 'MongoDB',      color: '#47A248' },
  { Icon: SiFlutter,             label: 'Flutter',      color: '#02569B' },
  { Icon: SiGit,                 label: 'Git',          color: '#F05032' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { theme } = useTheme();
  const nextjsColor = theme === 'light' ? '#1a1a1a' : '#ffffff';

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-900/10 to-transparent blur-3xl" />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-indigo-400 uppercase tracking-widest">Get to know me</span>
          <h2 className="section-heading mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading">
            Passionate developer crafting exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-40 scale-110 animate-pulse-slow" />

              {/* Photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-indigo-500/50">
                <Image
                  src="https://avatars.githubusercontent.com/u/52894020?v=4"
                  alt="ARG RABBY"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass border border-emerald-500/30 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400"
              >
                &lt;Available /&gt;
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 glass border border-indigo-500/30 rounded-xl px-3 py-2 text-xs font-mono text-indigo-400"
              >
                7+ yrs exp.
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Hi! I&apos;m <span className="text-white font-semibold">ARG RABBY</span>, an experienced Full-Stack Software Developer
                with <span className="text-indigo-400 font-medium">7+ years</span> of professional experience building scalable,
                maintainable web and desktop applications that solve real business problems.
              </p>
              <p>
                I specialize in <span className="text-purple-400 font-medium">enterprise backend systems</span> using
                C#/.NET Core, PHP/Laravel, and Node.js. On the frontend I build responsive interfaces with
                React, Next.js, and Vue.js. My database expertise covers
                <span className="text-pink-400 font-medium"> MS SQL Server, MySQL, and MongoDB</span>, with deep knowledge
                of LINQ and Entity Framework.
              </p>
              <p>
                Currently working as a <span className="text-indigo-400 font-medium">Software Engineer at Sundarban Courier Service</span>,
                building PCM (Parcel Courier Management) systems. I&apos;m also exploring
                <span className="text-cyan-400 font-medium"> Dart &amp; Flutter</span> for cross-platform mobile development.
              </p>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Location', value: 'Uttara, Dhaka, BD'      },
                { label: 'Email',    value: 'itrabbi24@gmail.com'     },
                { label: 'GitHub',   value: '@itrabbi24'              },
                { label: 'Currently', value: 'Dart / Flutter'        },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                    <div className="text-sm font-medium text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-2">
              <motion.a
                href="https://github.com/itrabbi24"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <span>View GitHub</span>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="card p-6 text-center group cursor-default neon-border"
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                   style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Icon className="text-indigo-400 group-hover:text-purple-400 transition-colors" size={24} />
              </div>
              <div className="font-semibold text-white text-sm mb-1">{label}</div>
              <div className="text-xs text-slate-500">{desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Tech row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-6">Technologies I work with</div>
          <div className="flex flex-wrap justify-center gap-4">
            {techIcons.map(({ Icon, label, color: rawColor }, i) => {
              const color = rawColor === '#ffffff' ? nextjsColor : rawColor;
              return (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.04 }}
                whileHover={{ y: -4, scale: 1.15 }}
                title={label}
                className="group flex flex-col items-center gap-1.5 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-all duration-300">
                  <Icon size={24} style={{ color }} />
                </div>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">{label}</span>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
