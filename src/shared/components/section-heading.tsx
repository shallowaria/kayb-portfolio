import * as React from 'react'

import { cn } from '@/shared/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  /** Optional right-aligned slot, e.g. a "View all" link. */
  action?: React.ReactNode
}

export function SectionHeading({
  children,
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-4 flex items-center justify-between', className)}>
      <h2 className="flex items-center gap-2 text-[16px] font-semibold tracking-[0.08em] text-primary">
        <span className="size-2 rounded-full bg-primary" />
        {children}
      </h2>
      {action}
    </div>
  )
}
