import type { AccountQueueTransaction } from 'xrpl'

export type MappedAccountData = {
  account: string
  balance: string
  flags: number
  ledgerEntryType: string
  ownerCount: number
  sequence: number
  accountTxnID: string
  ammID: string
  domain: string
  emailHash: string
  messageKey: string
  regularKey: string
  ticketCount: number
  tickSize: number
  transferRate: number
  walletLocator: string
  burnedNFTokens: number
  firstNFTSequence: number
  mintedNFTokens: number
  nftokenMinter: string
}

export type MappedAccountFlags = {
  defaultRipple: boolean
  depositAuth: boolean
  disableMasterKey: boolean
  disallowIncomingCheck: boolean
  disallowIncomingNFTokenOffer: boolean
  disallowIncomingPayChan: boolean
  disallowIncomingTrustline: boolean
  disallowIncomingXRP: boolean
  globalFreeze: boolean
  noFreeze: boolean
  passwordSpent: boolean
  requireAuthorization: boolean
  requireDestinationTag: boolean
  allowTrustLineClawback: boolean
} | null

export type MappedQueueData = {
  txnCount: number
  authChangeQueued: boolean
  lowestSequence: number
  highestSequence: number
  maxSpendDropsTotal: string
  transactions: AccountQueueTransaction[]
} | null

export type MappedAccountInfoResponse = {
  accountData: MappedAccountData
  accountFlags: MappedAccountFlags
  queueData: MappedQueueData
  ledgerCurrentIndex: number
  validated: boolean
}
