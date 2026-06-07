import { AboutCard } from '@/features/home/components/about-card'
import { SkillsCard } from '@/features/home/components/skills-card'
import { EducationCard } from '@/features/home/components/education-card'
import { ExperienceCard } from '@/features/home/components/experience-card'
import { FeaturedProjects } from '@/features/home/components/featured-projects'
import { QuoteCard } from '@/features/home/components/quote-card'
import { ContactCard } from '@/features/home/components/contact-card'
import { Reveal } from '@/shared/components/reveal'

export function HomeContent() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[340px_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <AboutCard />
          </Reveal>
          <Reveal delay={0.08}>
            <SkillsCard />
          </Reveal>
          <Reveal delay={0.16}>
            <EducationCard />
          </Reveal>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.04}>
            <ExperienceCard />
          </Reveal>
          <Reveal delay={0.12}>
            <FeaturedProjects />
          </Reveal>
          <Reveal delay={0.2}>
            <QuoteCard />
          </Reveal>
          <Reveal delay={0.28} className="flex-1">
            <ContactCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
