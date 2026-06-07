import { useState } from 'react'
import { Mail, Phone, Check, Copy } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'
import { QQIcon, WechatIcon } from '@/shared/components/icons/social-icons'
import { PaperSection } from '@/features/home/components/paper-section'

export function ContactCard() {
  const content = useContent()
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(key)
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500)
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
    { key: 'qq', Icon: QQIcon, label: content.contact.qq, value: siteConfig.contact.qq },
    {
      key: 'wechat',
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
        {/* QQ / WeChat — click to copy */}
        {copyItems.map(({ key, Icon, label, value }) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => copy(key, value)}
              className="group flex w-full items-center gap-3 text-left"
              title={`${label}: ${value}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  {label}
                  {copied === key ? (
                    <Check className="size-3 text-primary" />
                  ) : (
                    <Copy className="size-3 opacity-0 transition-opacity group-hover:opacity-60" />
                  )}
                </p>
                <p
                  className={cn(
                    'truncate text-sm transition-colors',
                    copied === key
                      ? 'text-primary'
                      : 'text-foreground/90 group-hover:text-primary',
                  )}
                >
                  {copied === key ? content.contact.copied : value}
                </p>
              </div>
            </button>
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
