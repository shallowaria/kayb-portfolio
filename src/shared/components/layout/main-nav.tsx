import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { useContent } from '@/shared/i18n/use-content'
import { resources } from '@/shared/i18n/resources'

type Key = 'home' | 'about' | 'experience' | 'projects' | 'contact'

const KEYS: Key[] = ['home', 'about', 'experience', 'projects', 'contact']
const HREF: Record<Key, string> = {
  home: '#top',
  about: '#about',
  experience: '#experience',
  projects: '#projects',
  contact: '#contact',
}
const SECTION_IDS: { id: string; key: Key }[] = [
  { id: 'top', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'projects' },
  { id: 'contact', key: 'contact' },
]

export function MainNav() {
  const content = useContent()
  const [active, setActive] = useState<Key>('home')
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Partial<Record<Key, HTMLAnchorElement | null>>>({})
  const [underline, setUnderline] = useState({ left: 0, width: 0 })

  // Position the sliding underline beneath the active item.
  useLayoutEffect(() => {
    const el = itemRefs.current[active]
    if (el) setUnderline({ left: el.offsetLeft, width: el.offsetWidth })
  }, [active, content])

  useEffect(() => {
    const onResize = () => {
      const el = itemRefs.current[active]
      if (el) setUnderline({ left: el.offsetLeft, width: el.offsetWidth })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (top) {
          const match = SECTION_IDS.find((s) => s.id === top.target.id)
          if (match) setActive(match.key)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    SECTION_IDS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav ref={navRef} className="relative hidden lg:block" aria-label="Primary">
      <ul className="flex items-center gap-7">
        {KEYS.map((key) => (
          <li key={key}>
            <a
              ref={(el) => {
                itemRefs.current[key] = el
              }}
              href={HREF[key]}
              onClick={() => setActive(key)}
              aria-current={active === key ? 'page' : undefined}
              className="group relative grid place-items-center py-1 text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
            >
              {/* Invisible sizers in both languages reserve the max width so
                  switching language never shifts the layout. */}
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 whitespace-nowrap"
              >
                {resources.zh.nav[key]}
              </span>
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 whitespace-nowrap"
              >
                {resources.en.nav[key]}
              </span>
              <span className="col-start-1 row-start-1 whitespace-nowrap">
                {content.nav[key]}
              </span>

              {/* Hover line grows from the centre on non-active items. */}
              <span
                className={cn(
                  'pointer-events-none absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-foreground transition-[width] duration-300 ease-out',
                  active !== key && 'group-hover:w-full',
                )}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* The active underline slides/jumps between items. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1.5 h-px bg-foreground transition-[left,width] duration-300 ease-out"
        style={{ left: underline.left, width: underline.width }}
      />
    </nav>
  )
}
