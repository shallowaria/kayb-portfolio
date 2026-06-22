import { Leaf } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/shared/components/ui/button";
import { ShimmerButton } from "@/shared/components/magicui/shimmer-button";
import { FloatingSeeds } from "@/shared/components/magicui/floating-seeds";
import { GrassDivider } from "@/features/home/components/grass-divider";
import { useContent } from "@/shared/i18n/use-content";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const content = useContent();
  const { hero } = content;

  const goTo = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="top"
      className="relative isolate -mt-20 overflow-hidden"
      aria-label="Intro"
    >
      {/* Sheer sage glass panel (rgb 230,236,226) occupying the left, with a
          softly feathered right edge so the forest — and its trunk — take over
          the right side and divide the header. The forest reads faintly through
          the glass so text and scene fuse. Desktop only. */}
      <div
        aria-hidden
        className="hero-glass absolute inset-y-0 left-0 -z-10 hidden w-[60%] min-w-[340px] lg:block"
        style={{
          maskImage:
            "linear-gradient(to right, #000 0%, #000 72%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 0%, #000 72%, transparent 100%)",
        }}
      />
      {/* Mobile: no panel/weeds — the forest shows through directly; the copy
          gets a soft glow so it stays legible without a hazy overlay. */}
      <FloatingSeeds className="-z-10" count={16} />

      <div className="mx-auto max-w-6xl px-6 pb-32 pt-32 md:px-10 md:pb-40 md:pt-52">
        <div className="max-w-xl max-lg:[text-shadow:0_1px_14px_rgb(255_255_255_/_0.9)] dark:max-lg:[text-shadow:0_1px_14px_rgb(0_0_0_/_0.7)]">
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
            {hero.titleLines}
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground max-lg:font-medium max-lg:text-foreground/85"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex items-center gap-3"
          >
            <ShimmerButton
              onClick={goTo("projects")}
              className="h-12 min-w-[160px] justify-center rounded-full border-transparent px-8 text-sm font-medium tracking-wide shadow-lg shadow-primary/20 transition-[transform,filter] hover:brightness-110 active:brightness-95 max-lg:min-w-0 max-lg:flex-1"
              shimmerColor="#d9fbe8"
            >
              {hero.viewWork}
            </ShimmerButton>
            <Button
              asChild
              variant="outline"
              className="h-12 min-w-[160px] justify-center rounded-full border-2 border-black px-8 text-sm font-medium tracking-wide max-lg:min-w-0 max-lg:flex-1"
            >
              <a href="#contact">{hero.contact}</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Weeds reclaiming the seam between hero and parchment (desktop only). */}
      <GrassDivider className="max-lg:hidden" />
    </section>
  );
}
