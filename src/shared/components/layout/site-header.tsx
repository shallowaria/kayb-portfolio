import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, Menu, X } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { LanguageSwitcher } from '@/shared/components/layout/language-switcher'
import { ThemeToggle } from '@/shared/components/layout/theme-toggle'
import { SearchButton, SearchCommand } from '@/features/search/site-search'
import { useContent } from '@/shared/i18n/use-content'
import { siteConfig } from '@/shared/config/site'

export function SiteHeader() {
  const content = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { key: 'home', label: content.nav.home, href: '#top' },
    { key: 'about', label: content.nav.about, href: '#about' },
    { key: 'experience', label: content.nav.experience, href: '#experience' },
    { key: 'projects', label: content.nav.projects, href: '#projects' },
    { key: 'contact', label: content.nav.contact, href: '#contact' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'border-b border-border/50 bg-background/70 shadow-[0_8px_30px_-18px_rgba(20,40,30,0.5)] backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        {/* Brand */}
        <a href="#top" className="leading-tight">
          <div className="font-display text-xl font-semibold tracking-tight text-foreground">
            {siteConfig.name.toUpperCase()}
          </div>
          <div className="text-[0.6rem] font-medium tracking-[0.45em] text-muted-foreground">
            {content.brandTagline.toUpperCase()}
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item, i) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                'relative text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground',
                i === 0 &&
                  'text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-foreground',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <SearchButton
            onClick={() => setSearchOpen(true)}
            label={content.search.label}
          />
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="ml-1 rounded-full px-4"
          >
            <a href={siteConfig.resumeUrl} download>
              {content.actions.downloadResume}
              <Download className="size-4" />
            </a>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <SearchButton
            onClick={() => setSearchOpen(true)}
            label={content.search.label}
          />
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground/80 backdrop-blur-sm transition-colors hover:text-foreground"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Single shared command palette */}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border/50 bg-background/90 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-2 w-full rounded-full"
              >
                <a href={siteConfig.resumeUrl} download>
                  {content.actions.downloadResume}
                  <Download className="size-4" />
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
