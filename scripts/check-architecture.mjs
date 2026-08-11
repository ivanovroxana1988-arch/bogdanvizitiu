import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const sourceRoots = ['app', 'components', 'lib']
const legacyFiles = [
  'app/insights/page.tsx',
  'app/insights/[slug]/page.tsx',
  'app/programs/page.tsx',
  'app/programs/[slug]/page.tsx',
  'lib/data.ts',
]

function filesUnder(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? filesUnder(path) : [path]
  })
}

const staleFiles = legacyFiles.filter((file) => existsSync(join(root, file)))
if (staleFiles.length) throw new Error(`Legacy fixture files must be removed:\n${staleFiles.join('\n')}`)

const fixtureImports = sourceRoots
  .flatMap((directory) => filesUnder(join(root, directory)))
  .filter((file) => /\.(?:ts|tsx|js|jsx)$/.test(file))
  .filter((file) => readFileSync(file, 'utf8').includes('@/lib/data'))
  .map((file) => relative(root, file))

if (fixtureImports.length) throw new Error(`Forbidden @/lib/data imports found:\n${fixtureImports.join('\n')}`)

const globalNavigationFiles = ['components/header.tsx', 'components/footer.tsx']
const searchParamConsumers = globalNavigationFiles.filter((file) => {
  const path = join(root, file)
  return existsSync(path) && /\buseSearchParams\b/.test(readFileSync(path, 'utf8'))
})

if (searchParamConsumers.length) {
  throw new Error(
    `Global navigation must not use useSearchParams for locale state. Use locale routes and usePathname instead:\n${searchParamConsumers.join('\n')}`,
  )
}

console.log('Architecture check passed: no legacy fixtures or global useSearchParams consumers.')
