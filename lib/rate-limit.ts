import { createHash } from 'node:crypto'

type MemoryBucket = {
  count: number
  resetAt: number
}

type UpstashResult = {
  result?: number | string | null
  error?: string
}

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  backend: 'upstash' | 'memory'
}

const memoryBuckets = new Map<string, MemoryBucket>()

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

function hashIdentifier(identifier: string) {
  return createHash('sha256').update(identifier).digest('hex').slice(0, 32)
}

function getSettings() {
  return {
    limit: positiveInteger(process.env.CONTACT_RATE_LIMIT_MAX, 5),
    windowSeconds: positiveInteger(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS, 600),
  }
}

function cleanupMemoryBuckets(now: number) {
  if (memoryBuckets.size < 1000) return
  for (const [key, bucket] of memoryBuckets) {
    if (bucket.resetAt <= now) memoryBuckets.delete(key)
  }
}

function checkMemoryRateLimit(key: string, now: number, limit: number, windowSeconds: number) {
  cleanupMemoryBuckets(now)
  const windowMs = windowSeconds * 1000
  const bucketNumber = Math.floor(now / windowMs)
  const bucketKey = `${bucketNumber}:${key}`
  const resetAt = (bucketNumber + 1) * windowMs
  const current = memoryBuckets.get(bucketKey)
  const count = (current?.count ?? 0) + 1

  memoryBuckets.set(bucketKey, { count, resetAt })

  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    resetAt,
    backend: 'memory' as const,
  }
}

async function checkUpstashRateLimit(
  key: string,
  now: number,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '')
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  const windowMs = windowSeconds * 1000
  const bucketNumber = Math.floor(now / windowMs)
  const resetAt = (bucketNumber + 1) * windowMs
  const redisKey = `contact-rate:${bucketNumber}:${key}`

  try {
    const response = await fetch(`${url}/multi-exec`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', redisKey],
        ['EXPIRE', redisKey, windowSeconds + 5],
      ]),
      cache: 'no-store',
    })

    if (!response.ok) throw new Error(`Upstash rate limit returned ${response.status}`)

    const results = (await response.json()) as UpstashResult[]
    const count = Number(results[0]?.result)
    if (!Number.isFinite(count)) throw new Error('Upstash rate limit returned an invalid counter')

    return {
      allowed: count <= limit,
      limit,
      remaining: Math.max(0, limit - count),
      resetAt,
      backend: 'upstash',
    }
  } catch (error) {
    console.warn('Durable contact rate limit unavailable; using in-memory fallback', error)
    return null
  }
}

export function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip')?.trim()
  const userAgent = request.headers.get('user-agent') || 'unknown-agent'
  return ip || `unknown:${userAgent}`
}

export async function checkContactRateLimit(
  identifier: string,
  now = Date.now(),
): Promise<RateLimitResult> {
  const { limit, windowSeconds } = getSettings()
  const key = hashIdentifier(identifier)
  const durableResult = await checkUpstashRateLimit(key, now, limit, windowSeconds)

  return durableResult ?? checkMemoryRateLimit(key, now, limit, windowSeconds)
}
