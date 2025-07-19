import type { AccountInfoResponse } from 'xrpl'
import type {
  MappedAccountData,
  MappedAccountFlags,
  MappedQueueData,
  MappedAccountInfoResponse
} from '@/app/api/xrpl/request/account-info/types'

const mapAccountRoot = (
  input: AccountInfoResponse['result']['account_data']
): MappedAccountData => {
  if (!input) {
    throw new Error('Account data is required')
  }

  return {
    account: input.Account,
    balance: input.Balance,
    flags: input.Flags,
    ledgerEntryType: input.LedgerEntryType,
    ownerCount: input.OwnerCount,
    sequence: input.Sequence,
    accountTxnID: input.AccountTxnID ?? '',
    ammID: input.AMMID ?? '',
    domain: input.Domain ?? '',
    emailHash: input.EmailHash ?? '',
    messageKey: input.MessageKey ?? '',
    regularKey: input.RegularKey ?? '',
    ticketCount: input.TicketCount ?? 0,
    tickSize: input.TickSize ?? 0,
    transferRate: input.TransferRate ?? 0,
    walletLocator: input.WalletLocator ?? '',
    burnedNFTokens: input.BurnedNFTokens ?? 0,
    firstNFTSequence: input.FirstNFTSequence ?? 0,
    mintedNFTokens: input.MintedNFTokens ?? 0,
    nftokenMinter: input.NFTokenMinter ?? ''
  }
}

const mapAccountFlags = (
  input: AccountInfoResponse['result']['account_flags']
): MappedAccountFlags => {
  if (!input) {
    return null
  }

  return {
    defaultRipple: input.defaultRipple,
    depositAuth: input.depositAuth,
    disableMasterKey: input.disableMasterKey,
    disallowIncomingCheck: input.disallowIncomingCheck ?? false,
    disallowIncomingNFTokenOffer: input.disallowIncomingNFTokenOffer ?? false,
    disallowIncomingPayChan: input.disallowIncomingPayChan ?? false,
    disallowIncomingTrustline: input.disallowIncomingTrustline ?? false,
    disallowIncomingXRP: input.disallowIncomingXRP,
    globalFreeze: input.globalFreeze,
    noFreeze: input.noFreeze,
    passwordSpent: input.passwordSpent,
    requireAuthorization: input.requireAuthorization,
    requireDestinationTag: input.requireDestinationTag,
    allowTrustLineClawback: input.allowTrustLineClawback
  }
}

export const mapQueueData = (
  input: AccountInfoResponse['result']['queue_data']
): MappedQueueData => {
  if (!input) {
    return null
  }

  return {
    txnCount: input.txn_count,
    authChangeQueued: input.auth_change_queued ?? false,
    lowestSequence: input.lowest_sequence ?? 0,
    highestSequence: input.highest_sequence ?? 0,
    maxSpendDropsTotal: input.max_spend_drops_total ?? '',
    transactions: input.transactions ?? []
  }
}

export const mapAccountInfoResponse = (
  input: AccountInfoResponse
): MappedAccountInfoResponse => {
  const result = input.result

  const accountData = mapAccountRoot(result.account_data)
  const accountFlags = mapAccountFlags(result.account_flags)
  const queueData = mapQueueData(result.queue_data)

  return {
    accountData,
    accountFlags,
    queueData,
    ledgerCurrentIndex: result.ledger_current_index ?? 0,
    validated: result.validated ?? false
  }
}
