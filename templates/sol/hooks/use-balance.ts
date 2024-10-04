import { useQuery } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'

import { formatSol } from '@/utils/sol'

export const useSolBalance = (publicKey: web3.PublicKey | null) => {
  const { connection } = useConnection()

  const result = useQuery({
    queryKey: ['useSolBalance', publicKey],
    queryFn: () => connection.getBalance(publicKey!),
    enabled: !!publicKey,
    refetchInterval: 5_000,
  })
  const balanceLamports = result.data || 0
  const balance = formatSol(balanceLamports)

  return {
    balanceLamports,
    balance,
    ...result,
  }
}
