import { leadershipAiSpritePart1 } from '@/lib/generated/leadership-ai-sprite-part-1'
import { leadershipAiSpritePart2 } from '@/lib/generated/leadership-ai-sprite-part-2'
import { leadershipAiSpritePart3 } from '@/lib/generated/leadership-ai-sprite-part-3'
import { leadershipAiSpritePart4 } from '@/lib/generated/leadership-ai-sprite-part-4'
import { leadershipAiSpritePart5 } from '@/lib/generated/leadership-ai-sprite-part-5'
import { leadershipAiSpritePart6 } from '@/lib/generated/leadership-ai-sprite-part-6'

const IMAGE_BASE64 = [
  leadershipAiSpritePart1,
  leadershipAiSpritePart2,
  leadershipAiSpritePart3,
  leadershipAiSpritePart4,
  leadershipAiSpritePart5,
  leadershipAiSpritePart6,
].join('')

export async function GET() {
  const bytes = Uint8Array.from(atob(IMAGE_BASE64), (char) => char.charCodeAt(0))

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
