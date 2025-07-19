'use client'

import { Button } from '@heroui/button'
import { useWalletConnect } from '@/hooks/useWalletConnect'

export const WalletDisconnectButton = () => {
  const { onDisconnect } = useWalletConnect()

  return (
    <Button color="danger" variant="flat" onPress={onDisconnect}>
      Disconnect
    </Button>
  )
}
