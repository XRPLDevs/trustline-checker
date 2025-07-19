import { useQuery } from '@tanstack/react-query'
import { useAccountStore, useWalletStore } from '@/stores'

export function useRequestAccountInfo() {
  const { isConnected, account, network } = useWalletStore()
  const { setAccount, setLoading } = useAccountStore()

  return useQuery({
    queryKey: ['account-info'],
    queryFn: async () => {
      setLoading(true)
      const response = await fetch(
        `/api/xrpl/request/account-info?account=${account}&network=${network}`
      )
      const data = await response.json()
      setAccount(data)
      setLoading(false)
      return data
    },
    enabled: isConnected && !!account && !!network
  })
}
