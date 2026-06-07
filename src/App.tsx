import { Toaster } from "sonner";

import { SiteHeader } from "@/shared/components/layout/site-header";
import { HomePage } from "@/features/home/home-page";
import { TornFilter } from "@/shared/components/torn-filter";
import { ResponsiveImage } from "@/shared/components/responsive-image";
import { siteConfig } from "@/shared/config/site";

function App() {
  return (
    <div className="relative min-h-svh w-full">
      <TornFilter />

      {/* Fixed forest backdrop — shows on the left/right margins of the sheet.
          A gradient sits underneath as an instant placeholder / fallback.
          The image is shifted 150px to the left so the trunk fills the gap
          behind the header's right-hand actions. */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.8 0.07 162), oklch(0.72 0.08 168)), radial-gradient(120% 90% at 70% 20%, oklch(0.74 0.09 168), oklch(0.62 0.08 172))",
        }}
      >
        <ResponsiveImage
          eager
          src={siteConfig.images.hero.src}
          srcSet={siteConfig.images.hero.srcSet}
          sizes={siteConfig.images.hero.sizes}
          width={siteConfig.images.hero.width}
          height={siteConfig.images.hero.height}
          className="absolute inset-y-0 left-[-500px] h-full w-[calc(100%+500px)] max-w-none object-cover"
        />
      </div>
      {/* Dims the forest in dark mode. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-transparent transition-colors dark:bg-black/45"
      />

      {/* The centered "page sheet" floating over the forest. */}
      <div className="relative mx-auto max-w-[1180px] shadow-[0_0_60px_-12px_rgba(20,40,30,0.55)]">
        <SiteHeader />
        <main>
          <HomePage />
        </main>
      </div>

      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
