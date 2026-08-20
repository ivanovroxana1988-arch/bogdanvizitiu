import imagePart1 from '@/lib/generated/ai-adoption-image-part-1'
import imagePart2 from '@/lib/generated/ai-adoption-image-part-2'

const image = Buffer.from(imagePart1 + imagePart2, 'base64')

export const dynamic = 'force-static'

export async function GET() {
  return new Response(image, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
