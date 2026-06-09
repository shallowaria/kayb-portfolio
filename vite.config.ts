import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Inlines the emitted CSS into index.html and drops the render-blocking
 * <link rel="stylesheet">. The app's CSS is small (~11 KiB) so inlining it
 * removes a round-trip from the critical path and lets first paint happen
 * without waiting on a separate stylesheet request.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find(
        (c) => c.type === 'asset' && c.fileName.endsWith('.html'),
      )
      if (!html || html.type !== 'asset') return

      let source = String(html.source)
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'asset' || !chunk.fileName.endsWith('.css')) continue
        const css = String(chunk.source)
        // Remove the <link> that points at this stylesheet, then inline it.
        const linkRe = new RegExp(
          `<link[^>]*href="[^"]*${chunk.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
          'g',
        )
        source = source.replace(linkRe, '')
        source = source.replace('</head>', `<style>${css}</style></head>`)
        // Drop the now-inlined file from the output so it isn't shipped twice.
        delete bundle[chunk.fileName]
      }
      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
