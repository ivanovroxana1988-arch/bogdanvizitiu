'use client'

import type { ReactNode } from 'react'
import { conversionEvent } from '@/lib/conversion-tracking'

export function SalesLabCta({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      className={className}
      href="#inscriere"
      onClick={() => conversionEvent('cta_click', 'course', 'sales-lab', 'ro')}
    >
      {children}
    </a>
  )
}
