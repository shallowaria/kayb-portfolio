import { ExternalLink } from 'lucide-react'

import { SectionHeading } from '@/shared/components/section-heading'
import { ResponsiveImage } from '@/shared/components/responsive-image'
import { useContent } from '@/shared/i18n/use-content'
import type { ProjectItem } from '@/shared/i18n/types'
import { siteConfig } from '@/shared/config/site'
import { PaperPanel } from '@/features/home/components/paper-panel'

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <PaperPanel className="overflow-hidden p-0">
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="group flex"
      >
        {/* Cover fills the whole left side, edge to edge (35% of the card). */}
        <div
          className="relative w-[35%] shrink-0 self-stretch"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.72 0.08 168), oklch(0.55 0.09 175))',
          }}
        >
          <ResponsiveImage
            src={project.cover}
            sizes={siteConfig.images.projectSizes}
            width={352}
            height={264}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1 p-5">
          <h3 className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 group-hover:underline">
            {project.linkLabel}
            <ExternalLink className="size-3.5" />
          </span>
        </div>
      </a>
    </PaperPanel>
  )
}

export function FeaturedProjects() {
  const content = useContent()

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionHeading>{content.sections.projects}</SectionHeading>

      <div className="space-y-5">
        {content.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
