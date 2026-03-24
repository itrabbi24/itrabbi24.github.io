'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiMapPin,
} from 'react-icons/fi';
import { useForm } from 'react-hook-form';

interface FormData { name: string; email: string; subject: string; message: string; }

const SOCIAL = [
  { Icon: FiGithub,   label: 'GitHub',   href: 'https://github.com/itrabbi24',      text: 'github.com/itrabbi24'      },
  { Icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/itrabbi24', text: 'linkedin.com/in/itrabbi24' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true); reset();
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to send. Please try again.');
    }
    setLoading(false);
  };

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all`;

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] top-[-10%] left-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
      <div className="orb w-[400px] h-[400px] bottom-[-10%] right-[-8%]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />

      <div className="container-xl" ref={ref}>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="section-label">Let&apos;s talk</span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mt-1" style={{ color: 'var(--text)' }}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* ═══ LEFT ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-base leading-relaxed max-w-sm" style={{ color: 'var(--text-2)' }}>
              Have a project in mind, a job opportunity, or just want to say hi?
              I&apos;m always open to new conversations and collaborations.
            </p>

            {/* email card */}
            <a
              href="mailto:itrabbi24@gmail.com"
              className="group flex items-center gap-4 p-5 rounded-2xl border transition-all"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}
              >
                <FiMail size={20} style={{ color: 'var(--cyan)' }} />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>Send an email</p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>itrabbi24@gmail.com</p>
              </div>
            </a>

            {/* location */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}
              >
                <FiMapPin size={20} style={{ color: 'var(--violet)' }} />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>Location</p>
                <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Uttara, Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* social links */}
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, href, label, text }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-hi)',
                    color: 'var(--text-2)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
                  }}
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>

            {/* availability badge */}
            <div
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border w-fit"
              style={{ background: 'rgba(52,211,153,0.07)', borderColor: 'rgba(52,211,153,0.18)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="avail-ping absolute inset-0 rounded-full" style={{ background: 'var(--emerald)' }} />
                <span className="relative rounded-full h-2 w-2" style={{ background: 'var(--emerald)' }} />
              </span>
              <p className="text-sm font-semibold" style={{ color: 'var(--emerald)' }}>
                Available for new projects
              </p>
            </div>
          </motion.div>

          {/* ═══ RIGHT: Form ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}
                  >
                    <FiCheck size={26} style={{ color: 'var(--emerald)' }} />
                  </motion.div>
                  <div>
                    <p className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>Message Sent!</p>
                    <p className="text-sm" style={{ color: 'var(--text-3)' }}>I&apos;ll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-3)' }}>
                        Name
                      </label>
                      <input
                        {...register('name', { required: true })}
                        placeholder="John Doe"
                        className={inputCls}
                        style={{
                          background: 'var(--bg-alt)',
                          borderColor: errors.name ? 'rgba(248,113,113,0.5)' : 'var(--border)',
                          color: 'var(--text)',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
                        onBlur={e => (e.target.style.borderColor = errors.name ? 'rgba(248,113,113,0.5)' : 'var(--border)')}
                      />
                      {errors.name && <p className="text-xs mt-1 text-red-400">Required</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-3)' }}>
                        Email
                      </label>
                      <input
                        {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        type="email" placeholder="john@example.com"
                        className={inputCls}
                        style={{
                          background: 'var(--bg-alt)',
                          borderColor: errors.email ? 'rgba(248,113,113,0.5)' : 'var(--border)',
                          color: 'var(--text)',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
                        onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(248,113,113,0.5)' : 'var(--border)')}
                      />
                      {errors.email && <p className="text-xs mt-1 text-red-400">Valid email required</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-3)' }}>
                      Subject
                    </label>
                    <input
                      {...register('subject', { required: true })}
                      placeholder="Project inquiry / Job opportunity"
                      className={inputCls}
                      style={{
                        background: 'var(--bg-alt)',
                        borderColor: errors.subject ? 'rgba(248,113,113,0.5)' : 'var(--border)',
                        color: 'var(--text)',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
                      onBlur={e => (e.target.style.borderColor = errors.subject ? 'rgba(248,113,113,0.5)' : 'var(--border)')}
                    />
                    {errors.subject && <p className="text-xs mt-1 text-red-400">Required</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-3)' }}>
                      Message
                    </label>
                    <textarea
                      {...register('message', { required: true, minLength: 20 })}
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className={`${inputCls} resize-none`}
                      style={{
                        background: 'var(--bg-alt)',
                        borderColor: errors.message ? 'rgba(248,113,113,0.5)' : 'var(--border)',
                        color: 'var(--text)',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
                      onBlur={e => (e.target.style.borderColor = errors.message ? 'rgba(248,113,113,0.5)' : 'var(--border)')}
                    />
                    {errors.message && <p className="text-xs mt-1 text-red-400">Min 20 characters</p>}
                  </div>

                  {error && (
                    <div
                      className="p-3 rounded-xl border text-sm"
                      style={{
                        background: 'rgba(248,113,113,0.08)',
                        borderColor: 'rgba(248,113,113,0.2)',
                        color: '#f87171',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50 hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)',
                      boxShadow: '0 4px 20px rgba(124,58,237,0.4), 0 1px 0 rgba(255,255,255,0.12) inset',
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <><FiSend size={14} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
