'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck } from 'react-icons/fi';
import { SiHackerrank } from 'react-icons/si';
import { HiLocationMarker, HiPhone } from 'react-icons/hi';

type FormData = { name: string; email: string; subject: string; message: string };

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    type Dot = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const dots: Dot[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 3 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${d.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const socials = [
  { icon: FiGithub,      label: 'GitHub',     href: 'https://github.com/itrabbi24',                        color: '#6366f1' },
  { icon: FiLinkedin,    label: 'LinkedIn',   href: 'https://www.linkedin.com/in/itrabbi24',               color: '#0ea5e9' },
  { icon: SiHackerrank,  label: 'HackerRank', href: 'https://www.hackerrank.com/profile/itrabbi24',        color: '#00ea64' },
  { icon: FiMail,        label: 'Email',      href: 'mailto:itrabbi24@gmail.com',                          color: '#ec4899' },
];

const contactInfo = [
  { icon: HiLocationMarker, label: 'Location', value: 'Uttara, Dhaka, Bangladesh' },
  { icon: FiMail,           label: 'Email',    value: 'itrabbi24@gmail.com'       },
  { icon: HiPhone,          label: 'Phone',    value: '+880 1955-109710'          },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Form data:', data);
    setSubmitting(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10"
           style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.03) 50%, transparent 100%)' }} />
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
             style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-indigo-400 uppercase tracking-widest">Let&apos;s talk</span>
          <h2 className="section-heading mt-2">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subheading">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="card p-6 space-y-6 relative overflow-hidden">
              <FloatingParticles />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I&apos;m currently available for freelance projects and full-time opportunities. Let&apos;s build something great.
                </p>
              </div>

              <div className="space-y-4 relative z-10">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                      <Icon className="text-indigo-400" size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</div>
                      <div className="text-sm text-white font-medium">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full relative z-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} />

              {/* Socials */}
              <div className="relative z-10">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-4">Find me online</div>
                <div className="flex gap-4">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      title={label}
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="relative z-10 p-4 rounded-xl"
                   style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-4">Open to remote and on-site opportunities</p>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="card p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}
                    >
                      <FiCheck size={36} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Your Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300
                            ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-indigo-500/60'}
                          `}
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid' }}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                          })}
                          placeholder="john@example.com"
                          type="email"
                          className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300
                            ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-indigo-500/60'}
                          `}
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid' }}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Subject *</label>
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="Project Inquiry / Collaboration / Other"
                        className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300
                          ${errors.subject ? 'border-red-500/50' : 'border-white/10 focus:border-indigo-500/60'}
                        `}
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid' }}
                      />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                        rows={5}
                        placeholder="Tell me about your project, goals, or just say hello..."
                        className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 resize-none
                          ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-indigo-500/60'}
                        `}
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid' }}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={!submitting ? { scale: 1.02 } : {}}
                      whileTap={!submitting ? { scale: 0.98 } : {}}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
