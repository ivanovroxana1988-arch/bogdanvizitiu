import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const parts = Array.from({ length: 6 }, (_, index) =>
  resolve(root, `source/assets/bogdan-hero/${String(index).padStart(2, '0')}.b64`),
)

const encoded = (await Promise.all(parts.map((part) => readFile(part, 'utf8'))))
  .join('')
  .replace(/\s+/g, '')

const image = Buffer.from(encoded, 'base64')
const digest = createHash('sha256').update(image).digest('hex')
const expectedBytes = 30171
const expectedDigest = 'e70bed315028a557c3a104917aa0986e4bd015444a2d06c487f5741919a417d6'

if (image.length !== expectedBytes || digest !== expectedDigest) {
  throw new Error(
    `Hero image integrity check failed: ${image.length} bytes, sha256 ${digest}`,
  )
}

const target = resolve(root, 'public/images/bogdan/bogdan-hero.avif')
await mkdir(dirname(target), { recursive: true })
await writeFile(target, image)

console.log(`Prepared HD hero image (${image.length} bytes).`)
