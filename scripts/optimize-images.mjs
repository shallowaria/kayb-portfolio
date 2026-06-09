// Generates width-resized WebP variants of the heavy source PNGs so the browser
// only downloads the resolution a given device actually needs.
//
//   pnpm optimize:images
//
// Sources live in /image-sources (kept out of the deploy). Output lands in
// /public next to the app's other static assets. Re-run after editing a source.
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'image-sources')
const outDir = path.join(root, 'public')

// width: the pixel widths to emit (skipped if larger than the source).
// quality: WebP quality 0-100. Decorative art tolerates a lower number.
const targets = [
  { file: 'hero-bg.png', widths: [480, 768, 1078], quality: 58 },
  { file: 'about-portrait.png', widths: [384, 640, 768], quality: 62 },
  { file: 'quote-foliage.png', widths: [192, 384], quality: 72 },
  { file: 'scrollbar-thumb.png', widths: [96, 192], quality: 80 },
]

const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`

async function run() {
  await mkdir(outDir, { recursive: true })
  let totalIn = 0
  let totalOut = 0

  for (const { file, widths, quality } of targets) {
    const input = path.join(srcDir, file)
    const base = path.basename(file, path.extname(file))
    const image = sharp(input)
    const meta = await image.metadata()
    totalIn += (await stat(input)).size

    for (const width of widths) {
      if (width > meta.width) continue // never upscale
      const outName = `${base}-${width}.webp`
      const outPath = path.join(outDir, outName)
      const info = await sharp(input)
        .resize({ width })
        .webp({ quality, effort: 6 })
        .toFile(outPath)
      totalOut += info.size
      console.log(`  ${outName.padEnd(28)} ${String(width).padStart(4)}w  ${kib(info.size)}`)
    }
  }

  console.log(
    `\nSources ${kib(totalIn)} → variants ${kib(totalOut)} ` +
      `(${(100 - (totalOut / totalIn) * 100).toFixed(0)}% smaller)`,
  )
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
