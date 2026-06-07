import { Mail } from 'lucide-react'

import { GithubIcon, TwitterIcon } from '@/shared/components/icons/brand-icons'
import { BilibiliIcon } from '@/shared/components/icons/bilibili-icon'
import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'

export function SiteFooter() {
  const content = useContent()

  const socials = [
    { label: 'GitHub', href: siteConfig.social.github, Icon: GithubIcon },
    { label: 'Twitter', href: siteConfig.social.twitter, Icon: TwitterIcon },
    { label: 'Bilibili', href: siteConfig.social.bilibili, Icon: BilibiliIcon },
    { label: 'Email', href: `mailto:${siteConfig.email}`, Icon: Mail },
  ]

  return (
    <footer className="border-t border-amber-900/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row md:px-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {content.name} {content.brandTagline}.{' '}
          {content.footer.rights}
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Icon className="size-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
