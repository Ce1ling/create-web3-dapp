'use client'

import { type PropsWithChildren, useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import { dotenv } from '@/lib/env'

export const SolProvider = ({ children }: PropsWithChildren) => {
  const network = dotenv.isDev
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => web3.clusterApiUrl(network), [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
