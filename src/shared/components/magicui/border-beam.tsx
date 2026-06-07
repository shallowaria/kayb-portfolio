'use client'

import { motion, type MotionStyle, type Transition } from 'motion/react'

import { cn } from '@/shared/lib/utils'

interface BorderBeamProps {
  /** The size of the border beam. */
  size?: number
  /** The duration of the border beam animation (seconds). */
  duration?: number
  /** The delay of the border beam (seconds). */
  delay?: number
  /** The color of the border beam from. */
  colorFrom?: string
  /** The color of the border beam to. */
  colorTo?: string
  /** The class name of the border beam. */
  className?: string
  /** The style of the border beam. */
  style?: React.CSSProperties
  /** Whether to reverse the animation direction. */
  reverse?: boolean
  /** The border width. */
  borderWidth?: number
  /** Optional image to travel along the border instead of the gradient beam. */
  image?: string
}

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#7dd3a0',
  colorTo = '#2f8f6b',
  style,
  reverse = false,
  borderWidth = 1.5,
  image,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ '--border-beam-width': `${borderWidth}px` } as React.CSSProperties}
    >
      <motion.div
        className={cn(
          'absolute aspect-square',
          !image &&
            'bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent',
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            '--color-from': colorFrom,
            '--color-to': colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${reverse ? 100 : 0}%` }}
        animate={{
          offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'],
        }}
        transition={
          {
            repeat: Infinity,
            ease: 'linear',
            duration,
            delay: -delay,
          } as Transition
        }
      >
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden
            className="size-full object-contain"
          />
        )}
      </motion.div>
    </div>
  )
}
