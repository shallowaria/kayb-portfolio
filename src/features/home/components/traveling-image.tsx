import { motion } from 'motion/react'

import { cn } from '@/shared/lib/utils'

interface TravelingImageProps {
  src: string
  /** Square size in px. */
  size?: number
  /** Seconds for one full lap. */
  duration?: number
  className?: string
}

/**
 * A small image that loops around the inside edge of its (relative) container,
 * staying FULLY visible — the offset path is inset by half the image size so it
 * never crosses the border to get clipped.
 */
export function TravelingImage({
  src,
  size = 48,
  duration = 16,
  className,
}: TravelingImageProps) {
  const inset = size / 2
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      className={cn(
        'pointer-events-none absolute left-0 top-0 select-none object-contain',
        className,
      )}
      style={{
        width: size,
        height: size,
        offsetPath: `rect(${inset}px calc(100% - ${inset}px) calc(100% - ${inset}px) ${inset}px round ${inset}px)`,
        offsetRotate: '0deg',
      }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: ['0%', '100%'] }}
      transition={{ repeat: Infinity, ease: 'linear', duration }}
    />
  )
}
