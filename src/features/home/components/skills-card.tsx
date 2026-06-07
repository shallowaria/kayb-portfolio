import { useContent } from '@/shared/i18n/use-content'
import { skillCategories } from '@/shared/config/skills'
import { PaperSection } from '@/features/home/components/paper-section'

export function SkillsCard() {
  const content = useContent()

  return (
    <PaperSection title={content.sections.skills}>
      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.key}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {content.skillCategories[category.key]}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-amber-900/15 bg-background/40 px-3 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  {skill.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PaperSection>
  )
}
