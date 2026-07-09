"use client";

import { motion } from "motion/react";

/**
 * Ambient technical background: tech grid + subtle drifting particles
 * and a couple of connection lines. Kept deliberately restrained.
 */
export function BackgroundGrid() {
  const particles = Array.from({ length: 22 });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      {/* radial glow top */}
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 55%, var(--background) 100%)",
        }}
      />

      <svg className="absolute inset-0 h-full w-full">
        {particles.map((_, i) => {
          const x = (i * 137) % 100;
          const y = (i * 71) % 100;
          const dur = 6 + (i % 5) * 2;
          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={i % 4 === 0 ? 1.8 : 1}
              fill={i % 3 === 0 ? "var(--info)" : "var(--primary)"}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.1, 0.55, 0.1], cy: [`${y}%`, `${(y + 4) % 100}%`, `${y}%`] }}
              transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
