import { create } from 'zustand'
import type { MappedAccountInfoResponse } from '@/app/api/xrpl/request/account-info/types'

export type AccountState = {
  accountInfo: MappedAccountInfoResponse | null
  isLoading: boolean
}

export type AccountAction = {
  setAccount(input: MappedAccountInfoResponse): void
  clearAccount(): void
  setLoading(input: boolean): void
}

export const useAccountStore = create<AccountState & AccountAction>((set) => ({
  accountInfo: null,
  isLoading: false,
  setAccount: (input: MappedAccountInfoResponse) => {
    set({ accountInfo: input })
  },
  clearAccount: () => {
    set({ accountInfo: null })
  },
  setLoading: (input: boolean) => {
    set({ isLoading: input })
  }
}))
