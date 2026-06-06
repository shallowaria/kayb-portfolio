import { Leaf, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/shared/components/ui/button'
import { ShimmerButton } from '@/shared/components/magicui/shimmer-button'
import { FloatingSeeds } from '@/shared/components/magicui/floating-seeds'
import { useContent } from '@/shared/i18n/use-content'

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
  const content = useContent()
  const { hero } = content

  return (
    <section
      id="top"
      className="relative isolate -mt-20 overflow-hidden"
      aria-label="Intro"
    >
      {/* The forest is supplied by the fixed page backdrop (App.tsx). Here we
          float a feathered, semi-transparent panel of paper-light behind the
          copy so it melts into the foliage instead of cutting a hard edge. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-y-0 left-0 w-[68%] bg-background/55 backdrop-blur-[3px]"
          style={{
            maskImage:
              'radial-gradient(135% 115% at 8% 42%, #000 30%, rgba(0,0,0,0.6) 55%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(135% 115% at 8% 42%, #000 30%, rgba(0,0,0,0.6) 55%, transparent 80%)',
          }}
        />
        {/* extra soft lift directly under the headline for legibility */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-background/45 to-transparent"
        />
      </div>
      <FloatingSeeds className="-z-10" count={16} />

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-44 md:px-10 md:pb-36 md:pt-52">
        <div className="max-w-xl">
          <motion.p
            {...fade}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 text-lg font-medium text-foreground/90"
          >
            {hero.greeting}
            <Leaf className="size-4 text-primary" />
          </motion.p>

          <motion.h1
            {...fade}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl"
          >
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ShimmerButton
              className="font-medium tracking-wide shadow-lg shadow-primary/20"
              shimmerColor="#d9fbe8"
            >
              <a href="#projects">{hero.viewWork}</a>
            </ShimmerButton>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-7 py-3 font-medium tracking-wide"
            >
              <a href="#contact">
                {hero.contact}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
