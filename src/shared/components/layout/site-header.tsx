import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { LanguageSwitcher } from "@/shared/components/layout/language-switcher";
import { ThemeToggle } from "@/shared/components/layout/theme-toggle";
import { MainNav } from "@/shared/components/layout/main-nav";
import {
  headerActionToneDesktop,
  headerActionToneMobile,
} from "@/shared/components/layout/action-tone";
import { SearchButton, SearchCommand } from "@/features/search/site-search";
import { useContent } from "@/shared/i18n/use-content";
import { resources } from "@/shared/i18n/resources";
import { siteConfig } from "@/shared/config/site";

export function SiteHeader() {
  const content = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overParchment, setOverParchment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Slide the bar up when scrolling down, reveal it when scrolling up.
      if (y > lastY.current && y > 96) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
      // Has the header reached the parchment content yet? (header height = 80px)
      const start = document.getElementById("content-start");
      setOverParchment(start ? start.getBoundingClientRect().top <= 80 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const navItems = [
    { key: "home", label: content.nav.home, href: "#top" },
    { key: "experience", label: content.nav.experience, href: "#experience" },
    { key: "projects", label: content.nav.projects, href: "#projects" },
    { key: "contact", label: content.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  return (
    <header
      data-parchment={overParchment ? "true" : "false"}
      className={cn(
        "group/header sticky top-0 z-40 transition-[transform,background-color,backdrop-filter,border-color] duration-300 ease-out",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        overParchment
          ? // Over parchment: light-green → sky-blue gradient bar.
            "border-b border-border/30 bg-gradient-to-r from-emerald-100/90 to-sky-200/90 backdrop-blur-md dark:from-emerald-950/85 dark:to-sky-950/85"
          : scrolled || menuOpen
            ? // Scrolled, or menu open: frosted bar on mobile for legibility.
              "border-b border-transparent max-lg:border-border/30 max-lg:bg-background/70 max-lg:backdrop-blur-md"
            : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        {/* Left cluster (sits over the sage panel): brand + nav */}
        <div className="flex items-center gap-8">
          <a href="#top" className="leading-tight">
            <div className="font-display text-xl font-semibold tracking-tight text-foreground">
              {content.name.toUpperCase()}
            </div>
            {/* dual-language sizer keeps the brand width fixed across locales */}
            <div className="grid text-[0.6rem] font-medium tracking-[0.45em] text-muted-foreground">
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 whitespace-nowrap"
              >
                {resources.zh.brandTagline.toUpperCase()}
              </span>
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 whitespace-nowrap"
              >
                {resources.en.brandTagline.toUpperCase()}
              </span>
              <span className="col-start-1 row-start-1 whitespace-nowrap">
                {content.brandTagline.toUpperCase()}
              </span>
            </div>
          </a>

          <MainNav />
        </div>

        {/* Desktop actions (sit over the forest, divided from the nav by the
            trunk in the backdrop) */}
        <div className="hidden items-center gap-2 lg:flex">
          <SearchButton
            onClick={() => setSearchOpen(true)}
            label={content.search.label}
            className={headerActionToneDesktop}
          />
          <LanguageSwitcher className={headerActionToneDesktop} />
          <ThemeToggle className={headerActionToneDesktop} />
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
            className={headerActionToneMobile}
          />
          <LanguageSwitcher className={headerActionToneMobile} />
          <ThemeToggle className={headerActionToneMobile} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/70 text-primary backdrop-blur-sm transition-colors hover:text-primary group-data-[parchment=true]/header:text-foreground/80"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Single shared command palette */}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile menu — absolutely positioned so opening/closing never shifts
          the page content (no jump). */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
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
  );
}
