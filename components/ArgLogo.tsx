'use client';
import { useId } from 'react';

/* ═══════════════════════════════════════════════════════
   ARG RABBY — Modern Code-Tag Logo
   Style: <ARG  RABBY/>
   Brackets + ARG in cyan-to-violet gradient
   RABBY in white/text
   Inspired by JSX/HTML tag syntax
═══════════════════════════════════════════════════════ */

interface IconProps {
  size?: number;
  className?: string;
}

export function ArgLogoIcon({ size = 36, className = '' }: IconProps) {
  const uid   = useId().replace(/:/g, '_');
  const gradId = `lg_${uid}`;

  /* viewBox: 44 × 36 — small square badge */
  const W = 44, H = 36;
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
        <linearGradient id={gradId} x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>

      {/* Opening bracket < */}
      <text x="2" y="26"
        fill={`url(#${gradId})`}
        fontSize="22" fontFamily="'JetBrains Mono','Fira Code','Courier New',monospace"
        fontWeight="700">
        &lt;
      </text>

      {/* AR text */}
      <text x="13" y="26"
        fill={`url(#${gradId})`}
        fontSize="18" fontFamily="'JetBrains Mono','Fira Code','Courier New',monospace"
        fontWeight="900" letterSpacing="-0.5">
        AR
      </text>

      {/* Closing bracket /> */}
      <text x="30" y="26"
        fill={`url(#${gradId})`}
        fontSize="22" fontFamily="'JetBrains Mono','Fira Code','Courier New',monospace"
        fontWeight="700">
        /&gt;
      </text>

      {/* Subtle underline glow */}
      <rect x="2" y="29" width={W - 4} height="1.5" rx="0.75"
        fill={`url(#${gradId})`} opacity="0.35"/>
    </svg>
  );
}

/* ─── Full horizontal lock-up  <ARG  RABBY/> ─── */
interface FullProps {
  iconSize?: number;
  className?: string;
}

export function ArgLogoFull({ iconSize = 36, className = '' }: FullProps) {
  const uid    = useId().replace(/:/g, '_');
  const gradId = `lf_${uid}`;

  const fontSize = Math.round(iconSize * 0.56);

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <svg
        width="0" height="0"
        style={{ position: 'absolute' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#22d3ee"/>
            <stop offset="100%" stopColor="#a78bfa"/>
          </linearGradient>
        </defs>
      </svg>

      <span
        className="font-black tracking-tight leading-none"
        style={{
          fontSize,
          fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
          letterSpacing: '-0.03em',
        }}
      >
        {/* < bracket */}
        <span style={{
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>&lt;</span>

        {/* ARG */}
        <span style={{
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>ARG</span>

        {/* space */}
        <span style={{ color: 'transparent' }}>&nbsp;</span>

        {/* RABBY in white/text */}
        <span style={{ color: 'var(--text, #fff)' }}>RABBY</span>

        {/* /> */}
        <span style={{
          background: 'linear-gradient(90deg, #a78bfa, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>/&gt;</span>
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
  if (variant === 'full') return <ArgLogoFull iconSize={size ?? 36} className={className}/>;
  return <ArgLogoIcon size={size ?? 36} className={className}/>;
}
