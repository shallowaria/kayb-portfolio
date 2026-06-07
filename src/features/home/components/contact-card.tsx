import { Mail, Phone, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'
import { QQIcon, WechatIcon } from '@/shared/components/icons/social-icons'
import { PaperSection } from '@/features/home/components/paper-section'

export function ContactCard() {
  const content = useContent()

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(`${label} ${content.contact.copied}`)
    } catch {
      toast.error(value)
    }
  }

  const linkItems = [
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

  const copyItems = [
    { Icon: QQIcon, label: content.contact.qq, value: siteConfig.contact.qq },
    {
      Icon: WechatIcon,
      label: content.contact.wechat,
      value: siteConfig.contact.wechat,
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
        {/* QQ / WeChat — account number with an always-on copy button */}
        {copyItems.map(({ Icon, label, value }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">{label}</p>
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm text-foreground/90">
                  {value}
                </span>
                <button
                  type="button"
                  onClick={() => copy(label, value)}
                  aria-label={`Copy ${label}`}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
          </li>
        ))}

        {/* Email / Phone — direct links */}
        {linkItems.map(({ Icon, label, value, href }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{label}</p>
              <a
                href={href}
                className="block truncate text-sm text-foreground/90 hover:text-primary"
              >
                {value}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </PaperSection>
  )
}
