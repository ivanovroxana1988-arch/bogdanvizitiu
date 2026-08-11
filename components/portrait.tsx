import { EditorialMedia } from './editorial-image'

/** Compatibility wrapper for internal pages. New work should use the named image treatments. */
export const Portrait = ({ event = false }: { event?: boolean }) => event
  ? <EditorialMedia mediaKey="speaking" label="Speaking documentation" crop="3:2" treatment="color" />
  : <EditorialMedia mediaKey="portraitDark" label="Editorial portrait" crop="4:5" treatment="monochrome" />

export const EditorialImage = ({ kind = 'portrait', label }: { kind?: 'portrait' | 'event' | 'workshop' | 'insight'; label?: string }) => {
  const configuration = {
    portrait: { mediaKey: 'portraitDark', crop: '4:5', treatment: 'monochrome' },
    event: { mediaKey: 'speaking', crop: '3:2', treatment: 'color' },
    workshop: { mediaKey: 'workshop', crop: '16:9', treatment: 'warm' },
    insight: { mediaKey: 'candid', crop: '16:10', treatment: 'monochrome' },
  } as const
  const selected = configuration[kind]
  return <EditorialMedia {...selected} label={label ?? `${kind} photography`} />
}
