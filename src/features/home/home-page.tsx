import { HeroSection } from '@/features/home/components/hero-section'
import { HomeContent } from '@/features/home/components/home-content'
import { SiteFooter } from '@/shared/components/layout/site-footer'

export function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Lower half of the sheet. The parchment lives on its own layer so the
          torn-edge filter never distorts the content sitting above it. */}
      <div className="relative z-10 -mt-10">
        <div
          aria-hidden
          className="parchment parchment-torn absolute inset-x-0 -top-2 bottom-0"
        />
        <div className="relative">
          <HomeContent />
          <SiteFooter />
        </div>
      </div>
    </>
  )
}
