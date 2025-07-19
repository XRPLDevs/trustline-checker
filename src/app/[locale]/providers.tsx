'use client'

import type { ThemeProviderProps } from 'next-themes'

import * as React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider as NextIntlClientProviderBase } from 'next-intl'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
  locale: string
  messages: Record<string, any>
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({
  children,
  themeProps,
  locale,
  messages
}: ProvidersProps) {
  const router = useRouter()

  const queryClient = new QueryClient()

  return (
    <NextIntlClientProviderBase
      locale={locale}
      messages={messages}
      timeZone="Asia/Tokyo"
    >
      <HeroUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </QueryClientProvider>
      </HeroUIProvider>
    </NextIntlClientProviderBase>
  )
}
