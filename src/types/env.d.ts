declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_XUMM_API_KEY: string
    }
  }
}

export {}
