export const getXummApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_XUMM_API_KEY

  if (!apiKey) {
    throw new Error(
      'NEXT_PUBLIC_XUMM_API_KEY is not defined in environment variables'
    )
  }

  return apiKey
}
