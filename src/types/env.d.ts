declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GA_ID: string
      NEXT_PUBLIC_XUMM_API_KEY: string
    }
  }

  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export {}
