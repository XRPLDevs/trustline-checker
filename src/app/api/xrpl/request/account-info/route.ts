import { NextResponse } from 'next/server'
import {
  accountInfoReqSchema,
  accountInfoResSchema,
  accountInfoRawSchema
} from '@/app/api/xrpl/request/account-info/schema'
import { mapAccountInfoResponse } from '@/app/api/xrpl/request/account-info/mapper'
import { XRPL_NETWORKS } from '@/config/constants'
import { typedFetch } from '@/libs/typedFetch'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const requestChecked = accountInfoReqSchema.safeParse({
    network: searchParams.get('network'),
    account: searchParams.get('account')
  })

  if (!requestChecked.success) {
    return NextResponse.json(
      { error: 'Invalid parameters', issues: requestChecked.error.issues },
      { status: 400 }
    )
  }

  const { account, network } = requestChecked.data

  try {
    const raw = await typedFetch.post({
      url: XRPL_NETWORKS[network].url,
      schema: accountInfoRawSchema,
      body: {
        method: 'account_info',
        params: [{ account }]
      }
    })

    const response = accountInfoResSchema.parse(mapAccountInfoResponse(raw))

    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
