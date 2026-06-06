/**
 * Tone for header icon actions (search / language / theme).
 * - light mode over the forest: white
 * - dark mode over the forest: green (primary)
 * - once the header is scrolled (frosted light/dark bar): normal foreground
 */
export const headerActionTone =
  'text-white/90 hover:text-white dark:text-primary dark:hover:text-primary ' +
  'group-data-[scrolled=true]/header:text-foreground/80 group-data-[scrolled=true]/header:hover:text-primary ' +
  'dark:group-data-[scrolled=true]/header:text-primary'
