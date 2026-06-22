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
      <h2 className="flex items-center gap-2 text-[16px] font-semibold tracking-[0.08em] text-primary [text-shadow:0_1px_10px_rgb(247_252_245_/_0.85)] dark:[text-shadow:0_1px_12px_rgb(8_18_13_/_0.8)]">
        <span className="size-2 rounded-full bg-primary" />
        {children}
      </h2>
      {action}
    </div>
  )
}
