import { Mail } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { GithubIcon, TwitterIcon } from '@/shared/components/icons/brand-icons'
import { BilibiliIcon } from '@/shared/components/icons/bilibili-icon'
import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'

export function SiteFooter() {
  const content = useContent()

  const socials = [
    {
      label: 'GitHub',
      href: siteConfig.social.github,
      Icon: GithubIcon,
      iconClass: 'text-[#181717] dark:text-white',
      fillClass: 'bg-[#181717]',
    },
    {
      label: 'Twitter',
      href: siteConfig.social.twitter,
      Icon: TwitterIcon,
      iconClass: 'text-[#1d9bf0]',
      fillClass: 'bg-[#1d9bf0]',
    },
    {
      label: 'Bilibili',
      href: siteConfig.social.bilibili,
      Icon: BilibiliIcon,
      iconClass: 'text-[#fb7299]',
      fillClass: 'bg-[#fb7299]',
    },
    {
      label: 'Email',
      href: `mailto:${siteConfig.email}`,
      Icon: Mail,
      iconClass: 'text-primary',
      fillClass: 'bg-primary',
    },
  ]

  return (
    <footer className="border-t border-primary/15">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row md:px-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {content.name} {content.brandTagline}.{' '}
          {content.footer.rights}
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon, iconClass, fillClass }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group/social relative flex size-9 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 hover:scale-110"
            >
              <Icon
                className={cn(
                  'relative z-10 size-[18px] transition-colors duration-300 group-hover/social:text-white',
                  iconClass,
                )}
              />
              {/* Brand-coloured fill sweeping in from the left on hover. */}
              <span
                className={cn(
                  'absolute inset-0 z-0 -translate-x-full rounded-xl transition-transform duration-300 ease-out group-hover/social:translate-x-0',
                  fillClass,
                )}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
