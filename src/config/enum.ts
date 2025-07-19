/** Wallet Types */
export enum WalletTypes {
  XAMAN = 'XAMAN',
  GEMWALLET = 'GEMWALLET',
  CROSSMARK = 'CROSSMARK'
}

export type WalletType = (typeof WalletTypes)[keyof typeof WalletTypes]

/** Network Types */
export enum NetworkTypes {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
  DEVNET = 'DEVNET',
  XAHAU_MAINNET = 'XAHAU_MAINNET',
  XAHAU_TESTNET = 'XAHAU_TESTNET'
}

export type NetworkType = (typeof NetworkTypes)[keyof typeof NetworkTypes]
