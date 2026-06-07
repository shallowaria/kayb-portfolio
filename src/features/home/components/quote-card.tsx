import { Quote } from 'lucide-react'

import { useContent } from '@/shared/i18n/use-content'
import { PaperSection } from '@/features/home/components/paper-section'

export function QuoteCard() {
  const content = useContent()

  return (
    <PaperSection
      title={content.sections.quote}
      panelClassName="relative overflow-hidden"
    >
      {/* Foliage reclaiming the corner. */}
      <img
        src="/quote-foliage.png"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute bottom-0 right-0 w-40 select-none object-contain opacity-95 sm:w-48"
      />

      <div className="relative max-w-[70%]">
        <Quote className="size-5 text-primary/60" />
        <p className="mt-2 font-display text-base italic leading-relaxed text-foreground">
          {content.quote.text}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          — {content.quote.author}
        </p>
      </div>
    </PaperSection>
  )
}
