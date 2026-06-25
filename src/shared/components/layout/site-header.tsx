import {
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  type MouseEvent,
} from "react";
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
import { SearchButton } from "@/features/search/search-button";
import { useContent, useLanguage } from "@/shared/i18n/use-content";
import { resources } from "@/shared/i18n/resources";
import { siteConfig } from "@/shared/config/site";

// Command palette (cmdk + Radix dialog) is split into its own chunk and only
// fetched the first time the user opens search — keeping it out of the initial
// bundle and off the critical path.
const SearchCommand = lazy(() => import("@/features/search/site-search"));

export function SiteHeader() {
  const content = useContent();
  const { current: lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overParchment, setOverParchment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Stays true once search has been opened, so the lazy chunk mounts on demand
  // and isn't torn down when the palette closes.
  const [searchLoaded, setSearchLoaded] = useState(false);
  const lastY = useRef(0);
  // Signed sum of same-direction scroll since the last direction flip. Lets a
  // small but deliberate swipe cross the show/hide threshold while ignoring the
  // tiny back-and-forth jitter mobile momentum scrolling produces.
  const scrollAccum = useRef(0);
  // Timestamp (ms) until which the show/hide logic ignores scroll deltas: a
  // language switch reflows the page and shifts scrollY, which would otherwise
  // read as a user swipe and slide the bar away. Set on language change.
  const reflowGuardUntil = useRef(0);
  // Document-space top of #content-start, measured off the scroll path so the
  // per-scroll handler can decide `overParchment` with arithmetic instead of a
  // getBoundingClientRect() — that read was forcing a synchronous reflow on
  // every scroll event.
  const contentStartTop = useRef(Infinity);

  const openSearch = () => {
    setSearchLoaded(true);
    setSearchOpen(true);
  };

  // Warm the lazy search chunk once the browser is idle. The eager hero image
  // loads at high priority and can saturate the connection on first paint, so
  // without this the chunk isn't fetched until the first click — making the
  // search button feel dead until the background settles. Same specifier as the
  // lazy() above, so it resolves from cache the moment the user opens search.
  useEffect(() => {
    const warm = () => void import("@/features/search/site-search");
    const ric = (
      window as Window &
        typeof globalThis & {
          requestIdleCallback?: (cb: () => void) => number;
          cancelIdleCallback?: (id: number) => void;
        }
    ).requestIdleCallback;
    if (ric) {
      const id = ric(warm);
      return () => {
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
      };
    }
    const t = window.setTimeout(warm, 2000);
    return () => window.clearTimeout(t);
  }, []);

  // A language switch reflows the page (different text lengths) and can shift
  // scrollY. Open a short window during which onScroll only resyncs its
  // baseline instead of toggling visibility, so the bar doesn't slide away on
  // its own. Skips the initial mount (no real switch happened yet).
  const didMountLang = useRef(false);
  useEffect(() => {
    if (!didMountLang.current) {
      didMountLang.current = true;
      return;
    }
    reflowGuardUntil.current = Date.now() + 400;
  }, [lang]);

  // Cmd/Ctrl+K opens the palette. Lives here (not in the lazy component) so the
  // shortcut works before the chunk has loaded.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchLoaded(true);
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Re-measured on mount / resize / load (fonts and images settle late and
    // shift this offset), never inside onScroll.
    const measure = () => {
      const start = document.getElementById("content-start");
      contentStartTop.current = start
        ? start.getBoundingClientRect().top + window.scrollY
        : Infinity;
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // During the post-language-switch reflow window, only track position —
      // a programmatic scrollY shift must not be read as a user swipe.
      if (Date.now() < reflowGuardUntil.current) {
        scrollAccum.current = 0;
        lastY.current = y;
        setOverParchment(y >= contentStartTop.current - 80);
        return;
      }
      // Near the very top the bar is always shown, no matter the direction.
      if (y <= 96) {
        setHidden(false);
        scrollAccum.current = 0;
      } else {
        const delta = y - lastY.current;
        // Reset the run whenever direction flips, so a deliberate swipe doesn't
        // have to first cancel out earlier opposite movement.
        if (delta > 0 !== scrollAccum.current > 0) scrollAccum.current = 0;
        scrollAccum.current += delta;
        // ~6px of sustained travel is enough to react — responsive to small
        // swipes, but above the noise floor of momentum/rubber-band jitter.
        if (scrollAccum.current > 6) setHidden(true);
        else if (scrollAccum.current < -6) setHidden(false);
      }
      lastY.current = y;
      // Has the header (80px tall) reached the parchment content yet?
      setOverParchment(y >= contentStartTop.current - 80);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
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
        "group/header sticky top-0 z-40 [view-transition-name:site-header] transition-[translate,background-color,border-color] duration-300 ease-out",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        overParchment
          ? // Over parchment: light-green → sky-blue gradient bar. Blur is
            // desktop-only — on mobile the backdrop-filter sits over the
            // GPU-promoted fixed backdrop and drops out during theme/language
            // repaints, so we lean on a more opaque gradient there instead.
            "border-b border-border/30 bg-gradient-to-r from-emerald-100/95 to-sky-200/95 lg:backdrop-blur-md lg:from-emerald-100/90 lg:to-sky-200/90 dark:from-emerald-950/90 dark:to-sky-950/90 lg:dark:from-emerald-950/85 lg:dark:to-sky-950/85"
          : scrolled || menuOpen
            ? // Scrolled, or menu open: frosted bar on mobile for legibility
              // (solid translucent fill, blur only on desktop).
              "border-b border-transparent max-lg:border-border/30 max-lg:bg-background/90 lg:backdrop-blur-md"
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
            onClick={openSearch}
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
            onClick={openSearch}
            label={content.search.label}
            className={headerActionToneMobile}
          />
          <LanguageSwitcher className={headerActionToneMobile} />
          <ThemeToggle className={headerActionToneMobile} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            // Spread the ARIA state instead of writing `aria-expanded={...}`
            // inline: the axe/aria static checker parses this TSX as HTML and
            // collapses any JSX expression to the literal `{expression}`, which
            // it then rejects as an invalid value. Spreading keeps the attribute
            // out of the literal source; React still serializes the boolean.
            {...{ "aria-expanded": menuOpen }}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/90 text-primary transition-colors hover:text-primary group-data-[parchment=true]/header:text-foreground/80"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Single shared command palette — mounted lazily after first open. */}
      {searchLoaded && (
        <Suspense fallback={null}>
          <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </Suspense>
      )}

      {/* Mobile menu — absolutely positioned so opening/closing never shifts
          the page content (no jump). */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-border/50 bg-background/98 lg:hidden"
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
