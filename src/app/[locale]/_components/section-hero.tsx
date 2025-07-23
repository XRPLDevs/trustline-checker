'use client'

import { WalletConnectButton } from '@/components/wallet-connect-button'
import { useWalletStore } from '@/stores'
import { CardAccountInfo } from '@/app/[locale]/_components/card-account-info'

export function SectionHero() {
  const { isConnected } = useWalletStore()

  return (
    <>
      <div className="flex gap-3 mb-5">
        {!isConnected && <WalletConnectButton />}
        {isConnected && (
          <div className="flex flex-col gap-3">
            <CardAccountInfo />
          </div>
        )}
      </div>
    </>
  )
}
