import { Search } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

/**
 * Icon trigger — render as many as needed (desktop + mobile). Lives in its own
 * module so the header can show it without pulling in the heavy command-palette
 * chunk (cmdk + Radix dialog); that loads lazily on first open.
 */
export function SearchButton({
  onClick,
  label,
  className,
}: {
  onClick: () => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-primary/10',
        className,
      )}
    >
      <Search className="size-[18px]" />
    </button>
  )
}
