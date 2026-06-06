import { Moon, Sun } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { useTheme } from '@/shared/lib/use-theme'
import { headerActionTone } from '@/shared/components/layout/action-tone'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={(e) => toggle({ clientX: e.clientX, clientY: e.clientY })}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-primary/10',
        headerActionTone,
        className,
      )}
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  )
}
