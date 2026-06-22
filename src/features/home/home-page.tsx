import { HeroSection } from "@/features/home/components/hero-section";
import { HomeContent } from "@/features/home/components/home-content";
import { GrassDivider } from "@/features/home/components/grass-divider";
import { SiteFooter } from "@/shared/components/layout/site-footer";

export function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Lower half of the sheet. The parchment lives on its own layer so the
          torn-edge filter never distorts the content sitting above it. */}
      <div id="content-start" className="relative z-10 -mt-10">
        <div
          aria-hidden
          className="parchment parchment-torn absolute inset-x-0 -top-2 bottom-0"
        />
        {/* Weeds sprouting from the parchment's torn top edge, growing upward
            into the hero forest (desktop only — no seam on mobile).
            Root height: the negative bottom margin seats the roots into the
            parchment. More negative = lower/deeper; positive = lifts onto the
            forest. Tune this single pixel value. */}
        <GrassDivider className="absolute bottom-full left-0 z-[1] mb-[9px] max-lg:hidden" />
        <div className="relative">
          <HomeContent />
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
