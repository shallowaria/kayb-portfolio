import * as React from 'react'

/** Deterministic pseudo-random so blades stay stable across renders. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const VIEW_W = 1200
const VIEW_H = 130
const BLADES = 70

function buildBlades() {
  const blades: { d: string; opacity: number }[] = []
  for (let i = 0; i < BLADES; i++) {
    const base = (i / BLADES) * VIEW_W + rand(i) * 14
    const height = 46 + rand(i + 1) * 78
    const width = 5 + rand(i + 2) * 9
    const sway = (rand(i + 3) - 0.5) * 34
    const tipX = base + width / 2 + sway
    const tipY = VIEW_H - height
    const ctrl = (rand(i + 4) - 0.5) * 22
    const d =
      `M ${base.toFixed(1)} ${VIEW_H} ` +
      `Q ${(base + ctrl).toFixed(1)} ${(VIEW_H - height * 0.55).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} ` +
      `Q ${(base + width - ctrl).toFixed(1)} ${(VIEW_H - height * 0.55).toFixed(1)} ${(base + width).toFixed(1)} ${VIEW_H} Z`
    blades.push({ d, opacity: 0.4 + rand(i + 5) * 0.45 })
  }
  return blades
}

/**
 * A band of weeds growing along the seam where the hero meets the parchment —
 * kept translucent so the background reads through, for that "life returning
 * after the figure walks away" feel.
 */
export function GrassDivider({ className }: { className?: string }) {
  const blades = React.useMemo(buildBlades, [])

  return (
    <div
      aria-hidden
      className={
        'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 md:h-28 ' +
        (className ?? '')
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <g className="fill-emerald-900/55 dark:fill-emerald-300/35">
          {blades.map((b, i) => (
            <path key={i} d={b.d} opacity={b.opacity} />
          ))}
        </g>
      </svg>
    </div>
  )
}
