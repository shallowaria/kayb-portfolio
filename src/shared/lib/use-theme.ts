import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

/**
 * Shared theme state (all toggles stay in sync via an external store).
 * `toggle` plays a circular reveal from the click point using the View
 * Transitions API, gracefully degrading when unsupported or reduced-motion.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light')

  const toggle = useCallback(
    (event?: { clientX: number; clientY: number }) => {
      const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark'

      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const canAnimate =
        'startViewTransition' in document && !reduce

      if (!canAnimate) {
        applyTheme(next)
        return
      }

      const x = event?.clientX ?? window.innerWidth / 2
      const y = event?.clientY ?? window.innerHeight / 2
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const goingDark = next === 'dark'
      const root = document.documentElement
      const dirClass = goingDark ? 'vt-to-dark' : 'vt-to-light'
      root.classList.add(dirClass)
      const clearDir = () => root.classList.remove('vt-to-dark', 'vt-to-light')

      let transition: { ready: Promise<void> } | undefined
      try {
        transition = (
          document as Document & {
            startViewTransition: (cb: () => void) => { ready: Promise<void> }
          }
        ).startViewTransition(() => applyTheme(next))
      } catch {
        applyTheme(next)
        clearDir()
        return
      }

      transition.ready
        .then(() => {
          const grow = `circle(${endRadius}px at ${x}px ${y}px)`
          const point = `circle(0px at ${x}px ${y}px)`
          const opts = {
            duration: 520,
            easing: 'ease-in-out',
            fill: 'forwards' as const,
          }
          if (goingDark) {
            // Dark expands outward from the click point.
            root.animate(
              { clipPath: [point, grow] },
              { ...opts, pseudoElement: '::view-transition-new(root)' },
            )
          } else {
            // Light fills inward: the old dark layer shrinks toward the point.
            root.animate(
              { clipPath: [grow, point] },
              { ...opts, pseudoElement: '::view-transition-old(root)' },
            )
          }
        })
        .catch(() => {})

      // Remove the direction marker once the animation is over.
      window.setTimeout(clearDir, 800)
      // Safety net: ensure the theme lands even if the callback was skipped.
      window.setTimeout(() => {
        if ((getSnapshot() === 'dark') !== (next === 'dark')) applyTheme(next)
      }, 250)
    },
    [],
  )

  return { theme, toggle }
}
