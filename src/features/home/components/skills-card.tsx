import { SectionHeading } from '@/shared/components/section-heading'
import { useContent } from '@/shared/i18n/use-content'
import { PaperPanel } from '@/features/home/components/paper-panel'

export function SkillsCard() {
  const content = useContent()

  return (
    <PaperPanel>
      <SectionHeading>{content.sections.skills}</SectionHeading>
      <div className="flex flex-wrap gap-2.5">
        {content.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-amber-900/15 bg-background/40 px-3 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </PaperPanel>
  )
}
