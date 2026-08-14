import image0 from './chunk-0'
import image1 from './chunk-1'
import image2 from './chunk-2'
import image3 from './chunk-3'

const IMAGE_BASE64 = image0 + image1 + image2 + image3

export const dynamic = 'force-dynamic'

export function GET() {
  const image = Buffer.from(IMAGE_BASE64, 'base64')
  return new Response(image, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
