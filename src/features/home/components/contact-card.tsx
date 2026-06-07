import { useState } from 'react'
import { Mail, Phone, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/shared/lib/utils'
import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'
import { QQIcon, WechatIcon } from '@/shared/components/icons/social-icons'
import { PaperSection } from '@/features/home/components/paper-section'
import { TravelingImage } from '@/features/home/components/traveling-image'

export function ContactCard() {
  const content = useContent()
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copy = async (key: string, label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(`${label} ${content.contact.copied}`)
    } catch {
      toast.error(value)
    }
    setCopiedKey(key)
    window.setTimeout(() => setCopiedKey((c) => (c === key ? null : c)), 1500)
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
    {
      key: 'qq',
      Icon: QQIcon,
      label: content.contact.qq,
      value: siteConfig.contact.qq,
    },
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
      panelClassName="relative flex flex-1 flex-col justify-center overflow-hidden"
    >
      {/* The little wanderer lives here now — loops the border, fully visible. */}
      <TravelingImage src="/scrollbar-thumb.png" size={48} duration={18} />

      <ul className="relative z-10 grid gap-5 sm:grid-cols-2">
        {/* QQ / WeChat — click the number or the button to copy */}
        {copyItems.map(({ key, Icon, label, value }) => {
          const isCopied = copiedKey === key
          return (
            <li key={key} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-900/15 bg-background/40 text-primary">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => copy(key, label, value)}
                    className="cursor-pointer truncate text-sm text-foreground/90 underline-offset-2 transition-colors hover:text-primary hover:underline"
                  >
                    {value}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(key, label, value)}
                    aria-label={`Copy ${label}`}
                    className={cn(
                      'shrink-0 cursor-pointer transition-colors',
                      isCopied
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary',
                    )}
                  >
                    {isCopied ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </li>
          )
        })}

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
