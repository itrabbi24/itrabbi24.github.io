'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiCode, FiZap, FiLayers, FiSmartphone } from 'react-icons/fi';
import Image from 'next/image';
import portfolioData from '@/data/portfolio.json';

const data = portfolioData.about;

const STACK = [
  { key: '"backend"',  val: '".NET Core  ·  PHP/Laravel  ·  Node.js"' },
  { key: '"frontend"', val: '"React  ·  Next.js  ·  TypeScript"'       },
  { key: '"mobile"',   val: '"Flutter  ·  Dart"'                        },
  { key: '"database"', val: '"SQL Server  ·  MongoDB  ·  MySQL"'        },
  { key: '"devops"',   val: '"Docker  ·  Linux  ·  Nginx"'              },
];

const SERVICES = [
  { icon: FiLayers,     label: 'Full-Stack Web', desc: 'End-to-end apps from database to UI' },
  { icon: FiCode,       label: 'Enterprise APIs', desc: '.NET / Laravel RESTful services' },
  { icon: FiSmartphone, label: 'Mobile Apps',     desc: 'Cross-platform with Flutter' },
  { icon: FiZap,        label: 'Performance',     desc: 'Optimization & scalable architecture' },
];

const QUICK_LINKS = [
  { Icon: FiMapPin,   label: 'Location', text: 'Uttara, Dhaka, Bangladesh',  href: undefined                           },
  { Icon: FiMail,     label: 'Email',    text: 'itrabbi24@gmail.com',         href: 'mailto:itrabbi24@gmail.com'        },
  { Icon: FiGithub,   label: 'GitHub',   text: 'github.com/itrabbi24',        href: 'https://github.com/itrabbi24'      },
  { Icon: FiLinkedin, label: 'LinkedIn', text: 'linkedin.com/in/itrabbi24',   href: 'https://linkedin.com/in/itrabbi24' },
];

const STATS = [
  { value: '5+',  label: 'Years Experience' },
  { value: '20+', label: 'Projects Delivered' },
  { value: '20+', label: 'Technologies' },
];

const fade  = (dir: 'left' | 'right', delay = 0) => ({
  initial:  { opacity: 0, x: dir === 'left' ? -28 : 28 },
  animate:  { opacity: 1, x: 0 },
  transition: { duration: 0.55, delay },
});

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.07 });

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* bg orb */}
      <div className="orb w-[500px] h-[500px] top-0 right-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="section-label">Get to know me</span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ════ LEFT ════ */}
          <motion.div
            {...fade('left', 0.05)}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6"
          >
            {/* Photo */}
            <div className="relative w-56 h-56 mx-auto lg:mx-0">
              {/* Outer glow ring */}
              <div
                className="absolute inset-[-4px] rounded-full blur-[10px] opacity-60"
                style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }}
              />
              {/* Gradient border ring */}
              <div
                className="absolute inset-[-2px] rounded-full"
                style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }}
              />
              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-transparent">
                <Image
                  src="https://avatars.githubusercontent.com/u/52894020?v=4"
                  alt="ARG RABBY" fill className="object-cover" priority
                />
              </div>

              {/* <Available /> badge — top right */}
              <div
                className="absolute -top-3 -right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-lg"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-hi)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold" style={{ color: 'var(--cyan)' }}>
                  &lt;Available /&gt;
                </span>
              </div>

              {/* yrs exp badge — bottom left */}
              <div
                className="absolute -bottom-3 -left-6 flex items-center gap-2 px-3.5 py-2 rounded-lg border shadow-lg"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-hi)' }}
              >
                <span className="font-black text-sm gradient-text leading-none">
                  {data.yearsExperience} yrs exp.
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="w-full grid grid-cols-2 gap-2">
              {QUICK_LINKS.map(({ Icon, label, text, href }) => {
                const content = (
                  <>
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                      style={{ background: 'rgba(34,211,238,0.1)' }}
                    >
                      <Icon size={14} style={{ color: 'var(--cyan)' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>
                        {label}
                      </p>
                      <p className="text-[12px] font-medium truncate" style={{ color: 'var(--text-2)' }}>
                        {text}
                      </p>
                    </div>
                  </>
                );
                const cls = `flex items-center gap-2.5 p-2.5 rounded-xl border transition-all`;
                const sty = { background: 'var(--bg-card)', borderColor: 'var(--border)' };
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={`${cls} hover:border-[var(--cyan)] hover:scale-[1.02]`} style={sty}>
                    {content}
                  </a>
                ) : (
                  <div key={label} className={cls} style={sty}>{content}</div>
                );
              })}
            </div>

            {/* "What I do" cards */}
            <div className="w-full grid grid-cols-2 gap-2">
              {SERVICES.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl border transition-all hover:border-[var(--border-hi)]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <Icon size={15} className="mb-2" style={{ color: 'var(--violet)' }} />
                  <p className="text-[11px] font-bold mb-0.5" style={{ color: 'var(--text)' }}>{label}</p>
                  <p className="text-[10px] leading-snug" style={{ color: 'var(--text-3)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════ RIGHT ════ */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {data.bio}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                Currently focused on{' '}
                <span className="font-semibold" style={{ color: 'var(--cyan)' }}>
                  {data.currentFocus}
                </span>
                . Passionate about clean code, system performance, and great developer experience.
              </p>
            </div>

            {/* Tech stack code block */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* header bar */}
              <div
                className="flex items-center gap-2.5 px-5 py-3 border-b"
                style={{ background: 'var(--bg-alt)', borderColor: 'var(--border)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
                <p className="font-mono text-[11px] ml-2" style={{ color: 'var(--text-3)' }}>
                  stack.json
                </p>
              </div>
              {/* code lines */}
              <div className="p-5 font-mono text-sm space-y-1.5">
                <p style={{ color: 'var(--text-3)' }}>{'{'}</p>
                {STACK.map(({ key, val }, i) => (
                  <motion.p
                    key={key}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.09 }}
                    className="pl-5"
                  >
                    <span style={{ color: 'var(--violet)' }}>{key}</span>
                    <span style={{ color: 'var(--text-3)' }}>: </span>
                    <span style={{ color: 'var(--emerald)' }}>{val}</span>
                    {i < STACK.length - 1 && <span style={{ color: 'var(--text-3)' }}>,</span>}
                  </motion.p>
                ))}
                <p style={{ color: 'var(--text-3)' }}>{'}'}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-5 rounded-2xl border transition-all hover:border-[var(--border-hi)]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <p className="text-2xl font-black gradient-text leading-none">{value}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: 'var(--text-3)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
