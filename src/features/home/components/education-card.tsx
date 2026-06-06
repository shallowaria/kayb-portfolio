import { GraduationCap } from 'lucide-react'

import { SectionHeading } from '@/shared/components/section-heading'
import { useContent } from '@/shared/i18n/use-content'
import { PaperPanel } from '@/features/home/components/paper-panel'

export function EducationCard() {
  const content = useContent()

  return (
    <PaperPanel>
      <SectionHeading>{content.sections.education}</SectionHeading>
      <div className="space-y-5">
        {content.education.map((edu) => (
          <div key={edu.degree} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
              <GraduationCap className="size-4" />
            </span>
            <div>
              <p className="font-semibold text-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.school}</p>
              <p className="mt-1 text-xs text-muted-foreground">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    </PaperPanel>
  )
}
