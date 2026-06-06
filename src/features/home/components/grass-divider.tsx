import * as React from 'react'

/** Deterministic pseudo-random so blades stay stable across renders. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const VIEW_W = 620
const VIEW_H = 150
const BLADES = 64

function buildBlades() {
  const blades: { d: string; opacity: number }[] = []
  for (let i = 0; i < BLADES; i++) {
    const base = (i / BLADES) * VIEW_W + rand(i) * 12
    const height = 64 + rand(i + 1) * 84
    const width = 6 + rand(i + 2) * 10
    const sway = (rand(i + 3) - 0.5) * 38
    const tipX = base + width / 2 + sway
    const tipY = VIEW_H - height
    const ctrl = (rand(i + 4) - 0.5) * 24
    const d =
      `M ${base.toFixed(1)} ${VIEW_H} ` +
      `Q ${(base + ctrl).toFixed(1)} ${(VIEW_H - height * 0.55).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} ` +
      `Q ${(base + width - ctrl).toFixed(1)} ${(VIEW_H - height * 0.55).toFixed(1)} ${(base + width).toFixed(1)} ${VIEW_H} Z`
    blades.push({ d, opacity: 0.6 + rand(i + 5) * 0.38 })
  }
  return blades
}

/**
 * Weeds reclaiming the seam where the hero meets the parchment. Only the LEFT
 * half is overgrown — kept fairly bold but still translucent so the background
 * reads through, for that "life returning after the figure walks away" feel.
 */
export function GrassDivider({ className }: { className?: string }) {
  const blades = React.useMemo(buildBlades, [])

  return (
    <div
      aria-hidden
      className={
        'pointer-events-none absolute bottom-0 left-0 z-10 h-28 w-1/2 md:h-36 ' +
        (className ?? '')
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <g className="fill-emerald-900/75 dark:fill-emerald-300/45">
          {blades.map((b, i) => (
            <path key={i} d={b.d} opacity={b.opacity} />
          ))}
        </g>
      </svg>
    </div>
  )
}
