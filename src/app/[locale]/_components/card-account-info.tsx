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
import { abbreviateString } from '@/utils'

const tabItems = [
  {
    id: 'account-info',
    label: 'Account Info'
  },
  {
    id: 'account-lines',
    label: 'Account Lines'
  }
]

export function CardAccountInfo() {
  const [accountRoot, setAccountRoot] = useState<any>(null)

  const { account, network } = useWalletStore()

  const { data: accountInfo } = useRequestAccountInfo()

  useEffect(() => {
    if (accountInfo) {
      setAccountRoot(accountInfo.account_root)
    }
  }, [accountInfo])

  return (
    <Card className="w-md">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-default-600">
              {abbreviateString(account, 10, 5)}
            </p>
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
                  {accountRoot?.domain || 'N/A'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  Balance
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.Balance || 'N/A'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  Sequence
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.Sequence || 'N/A'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  Flags
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.Flags || 'N/A'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  Owner Count
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.OwnerCount || 'N/A'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm font-medium text-default-600">
                  Transfer Rate
                </span>
                <span className="text-sm text-right text-default-900">
                  {accountRoot?.TransferRate || 'N/A'}
                </span>
              </div>
            </div>
          </Tab>
          <Tab key="account-lines" title="Account Lines">
            <div className="text-center text-default-500 py-4">
              Account lines data will be displayed here
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  )
}
