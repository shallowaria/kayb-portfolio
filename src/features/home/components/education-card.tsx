import { GraduationCap } from 'lucide-react'

import { useContent } from '@/shared/i18n/use-content'
import { PaperSection } from '@/features/home/components/paper-section'

export function EducationCard() {
  const content = useContent()

  return (
    <PaperSection title={content.sections.education}>
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
    </PaperSection>
  )
}
