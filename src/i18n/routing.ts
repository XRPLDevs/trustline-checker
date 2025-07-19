import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ja'] as const,
  defaultLocale: 'ja'
})
