import { Quote } from 'lucide-react'

import { SectionHeading } from '@/shared/components/section-heading'
import { useContent } from '@/shared/i18n/use-content'
import { PaperPanel } from '@/features/home/components/paper-panel'

export function QuoteCard() {
  const content = useContent()

  return (
    <PaperPanel>
      <SectionHeading>{content.sections.quote}</SectionHeading>
      <Quote className="size-5 text-primary/60" />
      <p className="mt-2 font-display text-base italic leading-relaxed text-foreground">
        {content.quote.text}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        — {content.quote.author}
      </p>
    </PaperPanel>
  )
}
