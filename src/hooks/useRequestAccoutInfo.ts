import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores'

export function useRequestAccountInfo() {
  const { isConnected, account, network } = useWalletStore()

  return useQuery({
    queryKey: ['account-info'],
    queryFn: async () => {
      const response = await fetch(
        `/api/xrpl/request/account-info?account=${account}&network=${network}`
      )
      const data = await response.json()
      return data
    },
    enabled: isConnected && !!account && !!network
  })
}
