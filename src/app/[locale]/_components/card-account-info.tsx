'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { Tabs, Tab } from '@heroui/tabs'
import { WalletDisconnectButton } from '@/components/wallet-disconnect-button'
import { XRPL_NETWORKS } from '@/config/constants'
import { NetworkType } from '@/config/enum'
import { useRequestAccountInfo } from '@/hooks'
import { useWalletStore } from '@/stores'
import type { AccountInfoRes } from '@/app/api/xrpl/request/account-info/schema'

const tabItems = [
  {
    id: 'account-info',
    label: 'Account Info'
  }
]

export function CardAccountInfo() {
  const [accountRoot, setAccountRoot] = useState<AccountInfoRes['root'] | null>(
    null
  )

  const { account, network } = useWalletStore()

  const { data: accountInfo } = useRequestAccountInfo()

  useEffect(() => {
    if (accountInfo) {
      setAccountRoot(accountInfo.root)
    }
  }, [accountInfo])

  return (
    <Card className="w-lg">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-default-600">{account}</p>
            <Chip
              color={XRPL_NETWORKS[network as NetworkType]?.color || 'default'}
              variant="dot"
              size="sm"
            >
              {XRPL_NETWORKS[network as NetworkType]?.name || 'Unknown'}
            </Chip>
          </div>
        </div>
        <WalletDisconnectButton />
      </CardHeader>
      <CardBody className="pt-0">
        <Tabs aria-label="account-info-tabs" variant="solid" items={tabItems}>
          <Tab key="account-info" title="Account Info">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  Domain
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.domain || '未設定'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  RegularKey
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.regularKey || '未設定'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  EmailHash
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.emailHash || '未設定'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  MessageKey
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.messageKey || '未設定'}
                </span>
              </div>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  )
}
