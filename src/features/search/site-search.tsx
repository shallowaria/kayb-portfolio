import {
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { useContent } from '@/shared/i18n/use-content'

/**
 * The single, controlled command palette. Loaded lazily (cmdk + Radix dialog)
 * the first time the user opens search, so it stays out of the initial bundle.
 */
export default function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const content = useContent()

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
