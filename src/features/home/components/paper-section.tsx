import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { SectionHeading } from '@/shared/components/section-heading'
import { PaperPanel } from '@/features/home/components/paper-panel'

interface PaperSectionProps {
  title: React.ReactNode
  /** Optional right-aligned slot next to the heading (e.g. "View all"). */
  action?: React.ReactNode
  id?: string
  className?: string
  /** Extra classes for the framed content panel. */
  panelClassName?: string
  children: React.ReactNode
}

/**
 * A titled section on the parchment: the heading (dot + label) sits OUTSIDE,
 * and only the content below is wrapped in the inked frame.
 */
export function PaperSection({
  title,
  action,
  id,
  className,
  panelClassName,
  children,
}: PaperSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <SectionHeading action={action}>{title}</SectionHeading>
      <PaperPanel className={panelClassName}>{children}</PaperPanel>
    </section>
  )
}
