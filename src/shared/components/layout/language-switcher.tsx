import { useEffect, useRef } from 'react'
import { Languages, Check } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { useContent, useLanguage } from '@/shared/i18n/use-content'
import { LANGS, type Lang } from '@/shared/i18n/resources'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { current, setLanguage } = useLanguage()
  const content = useContent()
  const rootRef = useRef<HTMLDivElement>(null)

  // The dropdown opens via :focus-within. On touch, tapping the trigger leaves
  // it focused, so it would otherwise stay open while the page scrolls. Drop
  // focus on scroll to dismiss it (desktop hover is unaffected).
  useEffect(() => {
    const onScroll = () => {
      const root = rootRef.current
      const active = document.activeElement
      if (root && active instanceof HTMLElement && root.contains(active)) {
        active.blur()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const labels: Record<Lang, string> = {
    zh: content.language.zh,
    en: content.language.en,
  }

  return (
    <div ref={rootRef} className="group/lang relative">
      <button
        type="button"
        aria-label={content.language.label}
        className={cn(
          'flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-primary/10 group-hover/lang:bg-primary/10',
          className,
        )}
      >
        <Languages className="size-[18px]" />
      </button>

      {/* Dropdown — slides down on hover/focus. */}
      <div
        className={cn(
          'invisible absolute right-0 top-full z-50 mt-2 w-36 -translate-y-1 opacity-0 transition-all duration-300',
          'group-hover/lang:visible group-hover/lang:translate-y-0 group-hover/lang:opacity-100',
          'group-focus-within/lang:visible group-focus-within/lang:translate-y-0 group-focus-within/lang:opacity-100',
        )}
      >
        <div className="overflow-hidden rounded-xl border border-primary/15 bg-popover/95 p-1.5 shadow-xl backdrop-blur-md">
          {LANGS.map((lang) => {
            const active = lang === current
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  'group/item flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-gradient-to-r from-primary to-primary/70 text-primary-foreground'
                    : 'text-foreground/85 hover:bg-primary/10 hover:text-primary',
                )}
              >
                {/* Text shifts right on hover (0.5s), returns on leave (0.5s). */}
                <span className="transition-transform duration-500 ease-out group-hover/item:translate-x-1.5">
                  {labels[lang]}
                </span>
                {active && <Check className="size-4 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
