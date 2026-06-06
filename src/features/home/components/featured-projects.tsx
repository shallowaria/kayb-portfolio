import { ArrowRight, ExternalLink } from 'lucide-react'

import { SectionHeading } from '@/shared/components/section-heading'
import { ResponsiveImage } from '@/shared/components/responsive-image'
import { useContent } from '@/shared/i18n/use-content'
import type { ProjectItem } from '@/shared/i18n/types'
import { siteConfig } from '@/shared/config/site'
import { PaperPanel } from '@/features/home/components/paper-panel'

function ProjectRow({ project }: { project: ProjectItem }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:aspect-auto sm:w-44 sm:shrink-0"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.72 0.08 168), oklch(0.55 0.09 175))',
        }}
      >
        <ResponsiveImage
          src={project.cover}
          sizes={siteConfig.images.projectSizes}
          width={352}
          height={198}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {project.linkLabel}
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const content = useContent()

  return (
    <PaperPanel id="projects" className="scroll-mt-24">
      <SectionHeading
        action={
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            {content.actions.viewAll}
            <ArrowRight className="size-3.5" />
          </a>
        }
      >
        {content.sections.projects}
      </SectionHeading>

      <div className="space-y-6 divide-y divide-amber-900/10 [&>*:not(:first-child)]:pt-6">
        {content.projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>
    </PaperPanel>
  )
}
