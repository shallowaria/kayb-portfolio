import * as React from 'react'

import { cn } from '@/shared/lib/utils'

export interface ResponsiveImageProps {
  src?: string
  /** e.g. "/hero-768.webp 768w, /hero-1280.webp 1280w, /hero-1920.webp 1920w" */
  srcSet?: string
  /** e.g. "(min-width: 1024px) 320px, 100vw" — tells the browser which width to fetch. */
  sizes?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  /** Above-the-fold images load eagerly with high priority; others lazy-load. */
  eager?: boolean
}

/**
 * A plain <img> tuned for performance: width-based srcset so the browser only
 * downloads the resolution it needs, lazy-loading below the fold, async decode,
 * and intrinsic dimensions to prevent layout shift. Renders nothing when no
 * source is supplied, letting a CSS gradient placeholder show through.
 */
export function ResponsiveImage({
  src,
  srcSet,
  sizes,
  alt = '',
  width,
  height,
  className,
  eager = false,
}: ResponsiveImageProps) {
  const [failed, setFailed] = React.useState(false)
  if ((!src && !srcSet) || failed) return null

  return (
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={cn('block', className)}
    />
  )
}
