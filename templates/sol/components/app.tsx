'use client'

import { type PropsWithChildren, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import { dotenv } from '@/lib/env'

const queryClient = new QueryClient()

export const AppProviders = ({ children }: PropsWithChildren) => {
  const network = dotenv.isDev
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => web3.clusterApiUrl(network), [network])
  const wallets = useMemo(() => [], [network])

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
