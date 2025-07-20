import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '@/stores'
import type { AccountInfoRes } from '@/app/api/xrpl/request/account-info/schema'

export function useRequestAccountInfo() {
  const { isConnected, account, network } = useWalletStore()

  return useQuery<AccountInfoRes>({
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
