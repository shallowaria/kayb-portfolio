/** Language-neutral site metadata: links, images, identity. */
export const siteConfig = {
  name: 'Kayblis',
  email: 'shallowaria@gmail.com',
  website: 'www.kayblis.dev',
  resumeUrl: '/resume.pdf',

  // Decorative forest backdrop (also used as the hero image).
  heroImage: '/hero-bg.png',

  social: {
    github: 'https://github.com/shallowaria',
    twitter: 'https://x.com/Kaybliscy',
    bilibili: 'https://space.bilibili.com/7213886',
  },

  // Contact handles shown in the Contact section (replace the placeholders).
  contact: {
    qq: '123456789',
    wechat: 'kayblis',
    phone: '+86 138 0000 0000',
  },

  /**
   * Responsive image sources. To serve only the resolution a device needs,
   * export a few widths of each image into /public and fill `srcSet`, e.g.:
   *   srcSet: '/hero-768.webp 768w, /hero-1280.webp 1280w, /hero-1920.webp 1920w'
   * The single `src` is the fallback (and what loads when srcSet is empty).
   */
  images: {
    hero: {
      src: '/hero-bg.png',
      srcSet: '',
      sizes: '100vw',
      width: 1600,
      height: 1067,
    },
    about: {
      src: '/about-portrait.png',
      srcSet: '',
      sizes: '(min-width: 1024px) 320px, 100vw',
      width: 640,
      height: 416,
    },
    // Project covers keep their src in the i18n content (per-language captions),
    // these provide width-aware loading hints by index.
    projectSizes: '(min-width: 640px) 176px, 100vw',
  },
}
