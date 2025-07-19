import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { toHex160bit } from '@/utils/string'
import type { AccountLinesResponse, AccountLinesTrustline } from 'xrpl'

const XRPL_API_URL = 'https://s.altnet.rippletest.net:51234/'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const account = searchParams.get('account')

  const response = await fetch(XRPL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: 'account_lines',
      params: [
        {
          account: account
        }
      ]
    })
  })

  const data = (await response.json()) as AccountLinesResponse
  const result = data.result

  console.log('result: ', result)

  const isRippling = (noRipple?: boolean) => {
    if (noRipple === undefined) {
      return true
    }
    return noRipple ? false : true
  }

  return NextResponse.json({
    account: result.account,
    ledgerCurrentIndex: result.ledger_current_index,
    lines: result.lines.map((line: AccountLinesTrustline) => ({
      id: uuidv4(),
      account: line.account,
      balance: Number(line.balance),
      currency:
        line.currency.length > 3 ? toHex160bit(line.currency) : line.currency,
      limit: Number(line.limit),
      limitPeer: Number(line.limit_peer),
      qualityIn: Number(line.quality_in),
      qualityOut: Number(line.quality_out),
      rippling: isRippling(line?.no_ripple),
      noRipple: line?.no_ripple ?? false,
      noRipplePeer: line?.no_ripple_peer ?? false,
      authorized: line?.authorized ?? false,
      peerAuthorized: line?.peer_authorized ?? false,
      freeze: line?.freeze ?? false,
      freezePeer: line?.freeze_peer ?? false
    }))
  })
}
