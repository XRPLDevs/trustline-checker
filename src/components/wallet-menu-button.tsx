'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@heroui/button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@heroui/dropdown'
import { Wallet } from 'lucide-react'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import { useWalletStore } from '@/stores'
import { XRPL_NETWORKS } from '@/config/constants'
import { NetworkType } from '@/config/enum'

export const WalletMenuButton = () => {
  const t = useTranslations('WalletMenuButton')

  const { account, network } = useWalletStore()
  const { onDisconnect } = useWalletConnect()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded" color="default" isIconOnly>
          <Wallet className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Wallet Menu">
        <DropdownSection showDivider>
          <DropdownItem key="wallet-info">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-default-500 uppercase tracking-wide">
                  Account
                </p>
                <p className="text-sm font-mono text-default-900 truncate">
                  {account}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-default-500 uppercase tracking-wide">
                  Network
                </p>
                <p className="text-sm text-default-900">
                  {XRPL_NETWORKS[network as NetworkType]?.name || 'Unknown'}
                </p>
              </div>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onPress={onDisconnect}
          >
            {t('disconnect')}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
