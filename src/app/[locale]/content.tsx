'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardHeader } from '@heroui/card'
import { Chip } from '@heroui/chip'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@heroui/table'
import { WalletConnectButton } from '@/components/wallet-connect-button'
import { WalletDisconnectButton } from '@/components/wallet-disconnect-button'
import { XRPL_NETWORKS } from '@/config/constants'
import { NetworkType } from '@/config/enum'

import { title, subtitle } from '@/components/primitives'
import { useWalletStore } from '@/stores'
import { useRequestAccountInfo } from '@/hooks/useRequestAccoutInfo'
import { useRequestAccountLine } from '@/hooks/useRequestAccountLine'
import { abbreviateString } from '@/utils/string'

export default function Content() {
  const t = useTranslations('Home')

  const { isConnected, account, network } = useWalletStore()

  const { data: accountInfo } = useRequestAccountInfo()
  const { data: accountLines } = useRequestAccountLine()

  useEffect(() => {
    console.log('accountLines: ', accountLines)
  }, [accountLines])

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>{t('title1')}</span>
        <span className={title({ color: 'violet' })}>&nbsp;{t('title2')}</span>
        <div className={subtitle({ class: 'mt-4' })}>{t('subtitle')}</div>
      </div>

      <div className="flex gap-3">
        {!isConnected && <WalletConnectButton />}
        {isConnected && (
          <div className="flex flex-col gap-3">
            <Card className="w-96">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <p className="text-small font-semibold leading-none text-default-600">
                      {abbreviateString(account, 10, 5)}
                    </p>
                    <Chip
                      color={
                        XRPL_NETWORKS[network as NetworkType]?.color ||
                        'default'
                      }
                      variant="dot"
                      size="sm"
                    >
                      {XRPL_NETWORKS[network as NetworkType]?.name || 'Unknown'}
                    </Chip>
                  </div>
                </div>
                <WalletDisconnectButton />
              </CardHeader>
            </Card>

            <Table aria-label="account-lines-table">
              <TableHeader>
                <TableColumn>{t('table.header.token')}</TableColumn>
                <TableColumn>{t('table.header.limit')}</TableColumn>
                <TableColumn>{t('table.header.balance')}</TableColumn>
              </TableHeader>
              <TableBody>
                {accountLines?.lines.map((line: any) => {
                  return (
                    <TableRow key={line.id}>
                      <TableCell>{line.currency}</TableCell>
                      <TableCell>{line.limit}</TableCell>
                      <TableCell>{line.balance}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  )
}
