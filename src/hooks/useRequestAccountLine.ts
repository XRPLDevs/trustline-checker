import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores'

export function useRequestAccountLine() {
  const { isConnected, account } = useWalletStore()

  return useQuery({
    queryKey: ['account-lines'],
    queryFn: async () => {
      const response = await fetch(
        `/api/xrpl/request/account-lines?account=${account}`
      )
      const data = await response.json()
      console.log('data: ', data)
      return data
    },
    enabled: isConnected && !!account
  })
}
