import { NetworkTypes } from '@/config/enum'

export const XRPL_NETWORKS = {
  [NetworkTypes.MAINNET]: {
    name: 'Mainnet',
    color: 'primary',
    url: 'https://xrplcluster.com/',
    wsUrl: 'wss://xrplcluster.com/',
    description: 'Production XRPL network'
  },
  [NetworkTypes.TESTNET]: {
    name: 'Testnet',
    color: 'warning',
    url: 'https://s.altnet.rippletest.net:51234/',
    wsUrl: 'wss://s.altnet.rippletest.net:51234/',
    description: 'XRPL test network'
  },
  [NetworkTypes.DEVNET]: {
    name: 'Devnet',
    color: 'danger',
    url: 'https://s.devnet.rippletest.net:51234/',
    wsUrl: 'wss://s.devnet.rippletest.net:51234/',
    description: 'XRPL development network'
  },
  [NetworkTypes.XAHAU_MAINNET]: {
    name: 'Xahau Mainnet',
    color: 'primary',
    url: 'https://xahau.xrpl.org/',
    wsUrl: 'wss://xahau.xrpl.org/',
    description: 'Xahau Mainnet'
  },
  [NetworkTypes.XAHAU_TESTNET]: {
    name: 'Xahau Testnet',
    color: 'warning',
    url: 'https://xahau.xrpl.org/',
    wsUrl: 'wss://xahau.xrpl.org/',
    description: 'Xahau Testnet'
  }
} as const
