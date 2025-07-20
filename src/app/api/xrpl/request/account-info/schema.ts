import { z, ZodType } from 'zod'
import { NetworkTypes } from '@/config/enum'
import type { AccountInfoResponse as AccountInfoRawType } from 'xrpl'

export const accountInfoReqSchema = z.object({
  network: z.enum(NetworkTypes),
  account: z.string().min(1, 'Invalid account address')
})

export const accountInfoResSchema = z.object({
  root: z.object({
    account: z.string(),
    balance: z.string(),
    flags: z.number(),
    ledgerEntryType: z.string(),
    ownerCount: z.number(),
    sequence: z.number(),
    accountTxnID: z.string(),
    ammID: z.string(),
    domain: z.string(),
    emailHash: z.string(),
    messageKey: z.string(),
    regularKey: z.string(),
    ticketCount: z.number(),
    tickSize: z.number(),
    transferRate: z.number(),
    walletLocator: z.string(),
    burnedNFTokens: z.number(),
    firstNFTSequence: z.number(),
    mintedNFTokens: z.number(),
    nftokenMinter: z.string()
  }),
  flags: z.object({
    defaultRipple: z.boolean(),
    depositAuth: z.boolean(),
    disableMasterKey: z.boolean(),
    disallowIncomingCheck: z.boolean(),
    disallowIncomingNFTokenOffer: z.boolean(),
    disallowIncomingPayChan: z.boolean(),
    disallowIncomingTrustline: z.boolean(),
    disallowIncomingXRP: z.boolean(),
    globalFreeze: z.boolean(),
    noFreeze: z.boolean(),
    passwordSpent: z.boolean(),
    requireAuthorization: z.boolean(),
    requireDestinationTag: z.boolean(),
    allowTrustLineClawback: z.boolean()
  }),
  queue: z.object({
    txnCount: z.number(),
    authChangeQueued: z.boolean(),
    lowestSequence: z.number(),
    highestSequence: z.number(),
    maxSpendDropsTotal: z.string()
    // TODO: add transactions
  }),
  ledgerCurrentIndex: z.number()
})

export const accountInfoRawSchema: ZodType<AccountInfoRawType> = z.any().refine(
  (data): data is AccountInfoRawType => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'result' in data &&
      typeof data.result === 'object'
    )
  },
  {
    message: 'Invalid XRPL AccountInfoResponse format'
  }
)

export type AccountInfoReq = z.infer<typeof accountInfoReqSchema>
export type AccountInfoRes = z.infer<typeof accountInfoResSchema>
export type AccountInfoRaw = z.infer<typeof accountInfoRawSchema>
