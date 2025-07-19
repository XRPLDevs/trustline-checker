'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    window.gtag?.('config', process.env.NEXT_PUBLIC_GA_ID ?? '', {
      page_path: url
    })
  }, [pathname, searchParams])
}
