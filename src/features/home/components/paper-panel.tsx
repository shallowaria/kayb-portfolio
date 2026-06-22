import * as React from 'react'

import { cn } from '@/shared/lib/utils'

/** A worn paper sub-panel used throughout the portfolio content area. */
export function PaperPanel({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('parchment-panel rounded-2xl p-6', className)}
      {...props}
    />
  )
}
