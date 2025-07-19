import { z } from 'zod'

export const AccountInfoQuerySchema = z.object({
  account: z.string().min(1, 'アカウントアドレスは必須です')
})

export const XRPLAccountInfoResponseSchema = z.object({
  result: z.object({
    account_data: z.object({
      Account: z.string(),
      Balance: z.string(),
      Flags: z.number(),
      LedgerEntryType: z.string(),
      OwnerCount: z.number(),
      PreviousTxnID: z.string(),
      PreviousTxnLgrSeq: z.number(),
      Sequence: z.number(),
      index: z.string()
    }).optional(),
    ledger_current_index: z.number().optional(),
    status: z.string(),
    validated: z.boolean()
  })
})

export type AccountInfoQuery = z.infer<typeof AccountInfoQuerySchema>
export type XRPLAccountInfoResponse = z.infer<typeof XRPLAccountInfoResponseSchema>
