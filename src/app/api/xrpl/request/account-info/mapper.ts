import type {
  AccountInfoRaw,
  AccountInfoRes
} from '@/app/api/xrpl/request/account-info/schema'

export const mapAccountInfoResponse = (raw: AccountInfoRaw): AccountInfoRes => {
  const r = raw.result

  const root = r.account_data
  const flags = r.account_flags
  const queue = r.queue_data

  return {
    root: {
      account: root.Account,
      balance: root.Balance,
      flags: root.Flags,
      ledgerEntryType: root.LedgerEntryType,
      ownerCount: root.OwnerCount,
      sequence: root.Sequence ?? 0,
      accountTxnID: root.AccountTxnID ?? '',
      ammID: root.AMMID ?? '',
      domain: root.Domain ?? '',
      emailHash: root.EmailHash ?? '',
      messageKey: root.MessageKey ?? '',
      regularKey: root.RegularKey ?? '',
      ticketCount: root.TicketCount ?? 0,
      tickSize: root.TickSize ?? 0,
      transferRate: root.TransferRate ?? 0,
      walletLocator: root.WalletLocator ?? '',
      burnedNFTokens: root.BurnedNFTokens ?? 0,
      firstNFTSequence: root.FirstNFTSequence ?? 0,
      mintedNFTokens: root.MintedNFTokens ?? 0,
      nftokenMinter: root.NFTokenMinter ?? ''
    },
    flags: {
      defaultRipple: flags?.defaultRipple ?? false,
      depositAuth: flags?.depositAuth ?? false,
      disableMasterKey: flags?.disableMasterKey ?? false,
      disallowIncomingCheck: flags?.disallowIncomingCheck ?? false,
      disallowIncomingNFTokenOffer:
        flags?.disallowIncomingNFTokenOffer ?? false,
      disallowIncomingPayChan: flags?.disallowIncomingPayChan ?? false,
      disallowIncomingTrustline: flags?.disallowIncomingTrustline ?? false,
      disallowIncomingXRP: flags?.disallowIncomingXRP ?? false,
      globalFreeze: flags?.globalFreeze ?? false,
      noFreeze: flags?.noFreeze ?? false,
      passwordSpent: flags?.passwordSpent ?? false,
      requireAuthorization: flags?.requireAuthorization ?? false,
      requireDestinationTag: flags?.requireDestinationTag ?? false,
      allowTrustLineClawback: flags?.allowTrustLineClawback ?? false
    },
    queue: {
      txnCount: queue?.txn_count ?? 0,
      authChangeQueued: queue?.auth_change_queued ?? false,
      lowestSequence: queue?.lowest_sequence ?? 0,
      highestSequence: queue?.highest_sequence ?? 0,
      maxSpendDropsTotal: queue?.max_spend_drops_total ?? ''
    },
    ledgerCurrentIndex: r.ledger_current_index ?? 0
  }
}
