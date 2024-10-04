import { fallback, http, unstable_connector } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'wagmi/chains'

import { dotenv } from '@/lib/env'

const dev = {
  chians: [sepolia],
  transports: {
    [sepolia.id]: fallback([http(), unstable_connector(injected)]),
  },
}

// TODO: YOUR_WAGMI_CONFIG
export const wagmiConfig = getDefaultConfig({
  appName: 'YOUR_WALLETCONNECT_APP_NAME',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  ssr: true,
  chains: [mainnet, ...(dotenv.isDev ? dev.chians : [])],
  transports: {
    [mainnet.id]: fallback([http(), unstable_connector(injected)]),
    ...(dotenv.isDev ? dev.transports : ({} as typeof dev.transports)),
  },
})

// The Ids of all the chains you have configured.
export type ConfigChainIds = (typeof wagmiConfig.chains)[number]['id']
