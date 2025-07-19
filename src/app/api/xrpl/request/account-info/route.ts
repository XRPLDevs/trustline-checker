import type { AccountInfoResponse } from 'xrpl'
import { NextResponse } from 'next/server'
import { AccountInfoQuerySchema } from '@/app/api/xrpl/request/account-info/schema'
import { mapAccountInfoResponse } from '@/app/api/xrpl/request/account-info/mapper'
import { XRPL_NETWORKS } from '@/config/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const queryResult = AccountInfoQuerySchema.safeParse({
    network: searchParams.get('network'),
    account: searchParams.get('account')
  })

  if (!queryResult.success) {
    return NextResponse.json(
      {
        error: queryResult.error.message
      },
      { status: 400 }
    )
  }

  const { account, network } = queryResult.data

  const response = await fetch(XRPL_NETWORKS[network].url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: 'account_info',
      params: [
        {
          account: account
        }
      ]
    })
  })

  const data = (await response.json()) as AccountInfoResponse
  const accountInfo = mapAccountInfoResponse(data)

  return NextResponse.json(accountInfo)
}
