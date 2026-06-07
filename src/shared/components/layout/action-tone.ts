/**
 * Header icon-action tones. The header carries `group/header` and
 * `data-parchment` (true once it overlaps the parchment content).
 */

// Desktop: white over the forest, green in dark, ink once over the parchment.
export const headerActionToneDesktop =
  'text-white/90 hover:text-white dark:text-primary dark:hover:text-primary ' +
  'group-data-[parchment=true]/header:text-foreground/80 group-data-[parchment=true]/header:hover:text-primary'

// Mobile: green by default (readable on the frosted bar), ink over the parchment.
export const headerActionToneMobile =
  'text-primary hover:text-primary ' +
  'group-data-[parchment=true]/header:text-foreground/80 group-data-[parchment=true]/header:hover:text-primary'
