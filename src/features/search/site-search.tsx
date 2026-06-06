import { useEffect } from 'react'
import {
  Search,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { headerActionTone } from '@/shared/components/layout/action-tone'
import { useContent } from '@/shared/i18n/use-content'

/** Icon trigger — render as many as needed (desktop + mobile). */
export function SearchButton({
  onClick,
  label,
  className,
}: {
  onClick: () => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-primary/10',
        headerActionTone,
        className,
      )}
    >
      <Search className="size-[18px]" />
    </button>
  )
}

/** The single, controlled command palette. Mounted once per page. */
export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const content = useContent()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  const goToAnchor = (id: string) => {
    onOpenChange(false)
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
    )
  }

  const openLink = (url: string) => {
    onOpenChange(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const sections = [
    { id: 'about', label: content.sections.about, Icon: User },
    { id: 'experience', label: content.sections.experience, Icon: Briefcase },
    { id: 'projects', label: content.sections.projects, Icon: FolderGit2 },
    { id: 'about', label: content.sections.education, Icon: GraduationCap },
    { id: 'contact', label: content.nav.contact, Icon: Mail },
  ]

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={content.search.label}
      description={content.search.placeholder}
    >
      <CommandInput placeholder={content.search.placeholder} />
      <CommandList>
        <CommandEmpty>{content.search.empty}</CommandEmpty>

        <CommandGroup heading={content.search.sections}>
          {sections.map((s) => (
            <CommandItem
              key={s.label}
              value={s.label}
              onSelect={() => goToAnchor(s.id)}
            >
              <s.Icon />
              {s.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading={content.search.projects}>
          {content.projects.map((p) => (
            <CommandItem
              key={p.title}
              value={`${p.title} ${p.description}`}
              onSelect={() => openLink(p.link)}
            >
              <FolderGit2 />
              <span className="flex-1 truncate">{p.title}</span>
              <ArrowUpRight className="size-3.5" />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
