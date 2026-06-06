import * as React from 'react'
import { motion } from 'motion/react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  /** Travel distance in px (default 24). */
  y?: number
}

/** Fade-and-rise on scroll into view. Animates once. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
