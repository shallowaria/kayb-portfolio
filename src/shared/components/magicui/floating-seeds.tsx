import * as React from 'react'

import { cn } from '@/shared/lib/utils'

interface FloatingSeedsProps {
  className?: string
  /** Number of drifting seeds. */
  count?: number
}

interface Seed {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  drift: number
}

/**
 * Subtle drifting motes that echo the dandelion seeds floating through the
 * Scavengers Reign artwork. Pure CSS transforms, no canvas, no deps.
 */
export function FloatingSeeds({ className, count = 14 }: FloatingSeedsProps) {
  const seeds = React.useMemo<Seed[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 10,
        drift: 20 + Math.random() * 50,
      })),
    [count],
  )

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {seeds.map((seed, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.45)]"
          style={
            {
              left: `${seed.left}%`,
              top: `${seed.top}%`,
              width: `${seed.size}px`,
              height: `${seed.size}px`,
              animation: `seed-float ${seed.duration}s ease-in-out ${seed.delay}s infinite`,
              '--drift': `${seed.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
      <style>{`
        @keyframes seed-float {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          15% { opacity: 0.8; }
          50% { transform: translate(var(--drift), -38px) scale(1.1); opacity: 0.6; }
          85% { opacity: 0.5; }
          100% { transform: translate(calc(var(--drift) * 1.6), -76px) scale(0.9); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
