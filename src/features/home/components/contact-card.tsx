import { MessageSquare, MessageCircle, Mail, Phone } from 'lucide-react'

import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'
import { PaperSection } from '@/features/home/components/paper-section'

export function ContactCard() {
  const content = useContent()

  const items = [
    { Icon: MessageSquare, label: content.contact.qq, value: siteConfig.contact.qq },
    {
      Icon: MessageCircle,
      label: content.contact.wechat,
      value: siteConfig.contact.wechat,
    },
    {
      Icon: Mail,
      label: content.contact.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      Icon: Phone,
      label: content.contact.phone,
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`,
    },
  ]

  return (
    <PaperSection
      id="contact"
      title={content.sections.contact}
      className="flex h-full flex-col"
      panelClassName="flex flex-1 flex-col justify-center"
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {items.map(({ Icon, label, value, href }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{label}</p>
              {href ? (
                <a
                  href={href}
                  className="block truncate text-sm text-foreground/90 hover:text-primary"
                >
                  {value}
                </a>
              ) : (
                <p className="truncate text-sm text-foreground/90">{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PaperSection>
  )
}
