import { MapPin, Mail, Globe } from 'lucide-react'

import { BorderBeam } from '@/shared/components/magicui/border-beam'
import { ResponsiveImage } from '@/shared/components/responsive-image'
import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'
import { PaperSection } from '@/features/home/components/paper-section'

export function AboutCard() {
  const content = useContent()

  return (
    <PaperSection
      id="about"
      title={content.sections.about}
      panelClassName="relative overflow-hidden p-0"
    >
      {/* portrait fills the top edge-to-edge — no padding gap */}
      <div
        className="relative h-52 w-full"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 20%, oklch(0.78 0.08 168), oklch(0.55 0.09 172))',
        }}
      >
        <ResponsiveImage
          src={siteConfig.images.about.src}
          srcSet={siteConfig.images.about.srcSet}
          sizes={siteConfig.images.about.sizes}
          width={siteConfig.images.about.width}
          height={siteConfig.images.about.height}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {content.about.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <ul className="mt-5 space-y-2.5 text-sm text-foreground/85">
          <li className="flex items-center gap-2.5">
            <MapPin className="size-4 text-primary" />
            {content.about.location}
          </li>
          <li className="flex items-center gap-2.5">
            <Mail className="size-4 text-primary" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
              {siteConfig.email}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Globe className="size-4 text-primary" />
            <a
              href={`https://${siteConfig.website}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              {siteConfig.website}
            </a>
          </li>
        </ul>
      </div>

      <BorderBeam size={70} duration={9} />
    </PaperSection>
  )
}
