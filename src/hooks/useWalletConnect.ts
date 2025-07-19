import { Xumm } from 'xumm'
import { useWalletStore, initialWallet, type Wallet } from '@/stores'
import { WalletTypes, NetworkTypes, type WalletType } from '@/config/enum'

export function useWalletConnect() {
  const { connect, disconnect, type } = useWalletStore()

  const onConnect = async (walletType: WalletType): Promise<void> => {
    try {
      const wallet: Wallet = initialWallet

      switch (walletType) {
        case WalletTypes.XAMAN:
          const xumm = new Xumm('b08e1736-b029-4ee3-afea-3eee68a4b45c')
          const response = await xumm.authorize()

          if (response instanceof Error || !response) {
            throw response
          }

          console.log('response: ', response.me.networkType)

          wallet.type = WalletTypes.XAMAN
          wallet.account = response.me.account

          if (response.me.networkType === 'MAINNET') {
            wallet.network = NetworkTypes.MAINNET
          } else if (response.me.networkType === 'TESTNET') {
            wallet.network = NetworkTypes.TESTNET
          } else if (response.me.networkType === 'DEVNET') {
            wallet.network = NetworkTypes.DEVNET
          } else if (response.me.networkType === 'XAHAU') {
            wallet.network = NetworkTypes.XAHAU_MAINNET
          } else if (response.me.networkType === 'XAHAUTESTNET') {
            wallet.network = NetworkTypes.XAHAU_TESTNET
          } else {
            localStorage.removeItem('XummPkceJwt')
            localStorage.removeItem('pkce_state')
            throw new Error('E_001_002')
          }

          break
        case WalletTypes.GEMWALLET:
          break
        case WalletTypes.CROSSMARK:
          break
      }

      connect(wallet)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const onDisconnect = () => {
    if (type === WalletTypes.XAMAN) {
      localStorage.removeItem('XummPkceJwt')
      localStorage.removeItem('pkce_state')
    }

    disconnect()
  }

  return {
    onConnect,
    onDisconnect
  }
}
