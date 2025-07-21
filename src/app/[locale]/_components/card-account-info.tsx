'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Tooltip } from '@heroui/tooltip'
import { Info } from 'lucide-react'
import { useRequestAccountInfo } from '@/hooks'
import type { AccountInfoRes } from '@/app/api/xrpl/request/account-info/schema'

type AccountRoot = AccountInfoRes['root'] | null

export function CardAccountInfo() {
  const [accRoot, setAccRoot] = useState<AccountRoot>(null)
  const router = useRouter()

  const { data: accountInfo } = useRequestAccountInfo()

  useEffect(() => {
    if (accountInfo) {
      setAccRoot(accountInfo.root)
    }
  }, [accountInfo])

  return (
    <Card className="w-lg px-2">
      <CardHeader className="flex justify-between items-center">
        <p className="text-xl font-semibold">Account Info</p>
      </CardHeader>
      <Divider />
      <CardBody className="py-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-default-600">
                Domain
              </span>
              <Tooltip
                className="max-w-lg"
                content={
                  <div className="flex flex-col gap-1 p-2">
                    <p className="text-sm font-bold text-default-600">
                      Domain とは
                    </p>
                    <p className="text-sm text-default-600">
                      ドメイン名（例：example.com）をアカウントに関連付けることで、所有者であることを証明できます。この設定は信頼性やバリデーター識別に役立ち、AccountSetトランザクションで行うことができます。
                    </p>
                    <p className="text-sm text-default-600">
                      なお、ドメインの .well-known ディレクトリに
                      xrp-ledger.toml
                      ファイルを配置し、必ずHTTPS経由で公開する必要があります。
                    </p>
                    <p className="text-sm text-default-600">
                      詳細は{' '}
                      <a
                        href="https://xrpl.org/xrp-ledger-toml.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        XRPL ドキュメント
                      </a>{' '}
                      を参照してください。
                    </p>
                  </div>
                }
              >
                <Info className="text-default-500" size={16} />
              </Tooltip>
            </div>
            <span className="text-sm text-right text-default-900">
              {accRoot?.domain || '未設定'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="text-sm font-medium text-default-600">
              EmailHash
            </span>
            <span className="text-sm text-right text-default-900">
              {accRoot?.emailHash || '未設定'}
            </span>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end">
        <Button
          color="primary"
          onPress={() => router.push('/account-set')}
          isDisabled
        >
          アカウント情報を更新
        </Button>
      </CardFooter>
    </Card>
  )
}
