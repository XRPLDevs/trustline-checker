import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WalletType, NetworkType } from '@/config/enum'

export type Wallet = {
  type: WalletType | null
  network: NetworkType | null
  account: string
}

export type WalletState = {
  isConnected: boolean
}

export type WalletAction = {
  connect: (input: Wallet) => void
  disconnect: () => void
}

export const initialWallet: Wallet = {
  type: null,
  network: null,
  account: ''
}

export const useWalletStore = create<Wallet & WalletState & WalletAction>()(
  persist(
    (set) => ({
      // State
      isConnected: false,
      type: null,
      network: null,
      account: '',
      // Actions
      connect: (input: Wallet) => {
        set({ isConnected: true, ...input })
      },
      disconnect: () => {
        set({
          isConnected: false,
          ...initialWallet
        })
      }
    }),
    {
      name: 'wallet-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
