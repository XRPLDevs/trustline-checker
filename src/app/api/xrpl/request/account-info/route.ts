import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { AccountInfoQuerySchema } from '@/app/api/xrpl/request/account-info/schema'
import { toHex160bit } from '@/utils/string'
import type { AccountInfoResponse } from 'xrpl'

const XRPL_API_URL = 'https://s.altnet.rippletest.net:51234/'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const queryResult = AccountInfoQuerySchema.safeParse({
    account: searchParams.get('account')
  })

  if (!queryResult.success) {
    return NextResponse.json({
      error: queryResult.error.message
    }, { status: 400 })
  }

  const { account } = queryResult.data

  const response = await fetch(XRPL_API_URL, {
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
  const result = data.result

  console.log('result: ', result)

  return NextResponse.json({
    result: result
  })
}
