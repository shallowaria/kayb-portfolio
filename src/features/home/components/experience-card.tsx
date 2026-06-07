import { Leaf } from 'lucide-react'

import { useContent } from '@/shared/i18n/use-content'
import { PaperSection } from '@/features/home/components/paper-section'

export function ExperienceCard() {
  const content = useContent()

  return (
    <PaperSection id="experience" title={content.sections.experience}>
      <div className="divide-y divide-amber-900/10">
        {content.experiences.map((exp) => (
          <div key={exp.role} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
              <Leaf className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-semibold text-foreground">{exp.role}</h3>
                <span className="text-xs text-muted-foreground">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-primary/90">{exp.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {exp.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PaperSection>
  )
}
