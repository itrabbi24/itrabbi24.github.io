'use client';
import { useId } from 'react';

/* ═══════════════════════════════════════════════════════
   ARG RABBY — Terminal Window Logo
   Unique concept: a mini code-editor/terminal icon
   showing  >_ AR█  with a blinking cursor
   and  </dev>  as a footer tagline inside the window
═══════════════════════════════════════════════════════ */

interface IconProps {
  size?: number;
  className?: string;
}

export function ArgLogoIcon({ size = 40, className = '' }: IconProps) {
  const uid   = useId().replace(/:/g, '_');
  const bgId  = `lb_${uid}`;
  const brdId = `lbr_${uid}`;
  const glId  = `lgl_${uid}`;

  /* proportions: 46 wide × 40 tall */
  const W = 46, H = 40;
  const px = Math.round(size * (H / W));

  return (
    <svg
      width={size} height={px}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ARG RABBY"
      role="img"
    >
      <defs>
        {/* Body gradient — deep navy */}
        <linearGradient id={bgId} x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#0d1130"/>
          <stop offset="100%" stopColor="#060c1f"/>
        </linearGradient>

        {/* Border gradient — violet → cyan */}
        <linearGradient id={brdId} x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#7c3aed"/>
          <stop offset="50%"  stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>

        {/* Glow drop shadow */}
        <filter id={glId} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Outer glow ring ── */}
      <rect width={W} height={H} rx="10"
        fill="#7c3aed" opacity="0.18" filter={`url(#${glId})`}/>

      {/* ── Main body ── */}
      <rect width={W} height={H} rx="10" fill={`url(#${bgId})`}/>

      {/* ── Gradient border ── */}
      <rect x="0.8" y="0.8" width={W-1.6} height={H-1.6} rx="9.3"
        fill="none" stroke={`url(#${brdId})`} strokeWidth="1.4"/>

      {/* ══ Title bar ══ */}
      <rect x="0.8" y="0.8" width={W-1.6} height="13" rx="9.3" fill="#111827"/>
      {/* square off bottom of title bar */}
      <rect x="0.8" y="9"   width={W-1.6} height="5"  fill="#111827"/>

      {/* Traffic-light dots */}
      <circle cx="8"    cy="7" r="2.2" fill="#ff5f57"/>
      <circle cx="14.5" cy="7" r="2.2" fill="#febc2e"/>
      <circle cx="21"   cy="7" r="2.2" fill="#28c840"/>

      {/* Tiny window title */}
      <text x={W - 4} y="9"
        fill="#374151" fontSize="4.5"
        fontFamily="'JetBrains Mono','Courier New',monospace"
        textAnchor="end">bash</text>

      {/* ══ Terminal body ══ */}

      {/* Prompt: >_ AR + cursor */}
      <text x="5" y="24"
        fill="#22d3ee" fontSize="8"
        fontFamily="'JetBrains Mono','Courier New',monospace"
        fontWeight="700">
        &gt;_
      </text>
      <text x="18" y="24"
        fill="white" fontSize="9"
        fontFamily="'JetBrains Mono','Courier New',monospace"
        fontWeight="900" letterSpacing="-0.5">
        AR
      </text>
      {/* blinking cursor block */}
      <rect x="32" y="16" width="5" height="9" rx="1" fill="#22d3ee" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1.1s" repeatCount="indefinite"/>
      </rect>

      {/* Tag line: </dev> */}
      <text x="5" y="36"
        fill="#6d28d9" fontSize="6"
        fontFamily="'JetBrains Mono','Courier New',monospace"
        fontWeight="600" opacity="0.85">
        &lt;/dev&gt;
      </text>

      {/* Subtle scanline stripe */}
      <rect x="1" y="27" width={W-2} height="0.6" rx="0.3"
        fill="rgba(34,211,238,0.06)"/>
    </svg>
  );
}

/* ─── Full horizontal lock-up ─── */
interface FullProps {
  iconSize?: number;
  className?: string;
}

export function ArgLogoFull({ iconSize = 40, className = '' }: FullProps) {
  const textSize  = Math.round(iconSize * 0.43);
  const monoSize  = Math.round(iconSize * 0.19);

  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <ArgLogoIcon size={iconSize}/>
      <span className="leading-snug">
        <span
          className="block font-black tracking-tight"
          style={{ fontSize: textSize, color: 'var(--text)' }}
        >
          ARG{' '}
          <span style={{
            background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            RABBY
          </span>
        </span>
        <span
          className="block font-mono font-semibold tracking-wider"
          style={{ fontSize: monoSize, color: 'var(--text-3)' }}
        >
          &lt;/&nbsp;full-stack dev&nbsp;&gt;
        </span>
      </span>
    </span>
  );
}

/* ─── Backwards-compat default ─── */
interface LegacyProps {
  variant?: 'icon' | 'full';
  className?: string;
  size?: number;
}
export default function ArgLogo({ variant = 'icon', className = '', size }: LegacyProps) {
  if (variant === 'full') return <ArgLogoFull iconSize={size ?? 40} className={className}/>;
  return <ArgLogoIcon size={size ?? 40} className={className}/>;
}
