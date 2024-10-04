import {
  useMutation,
  DefaultError,
  UseMutationOptions,
} from '@tanstack/react-query'
import { web3 } from '@coral-xyz/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

interface MutationParams {
  toPubkey: web3.PublicKey
  lamports: number | bigint
}

export const useTransferSol = <TContext = unknown>(
  options: Omit<
    UseMutationOptions<string, DefaultError, MutationParams, TContext>,
    'mutationKey' | 'mutationFn'
  >
) => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const results = useMutation({
    mutationKey: ['useTransferSol', publicKey],
    mutationFn: async ({ toPubkey, lamports }) => {
      if (!publicKey) throw new Error('No wallet connect')

      const latestBlock = await connection.getLatestBlockhash()
      const tx = new web3.Transaction({
        ...latestBlock,
        feePayer: publicKey,
      }).add(
        web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey,
          lamports,
        })
      )

      return sendTransaction(tx, connection)
    },
    ...options,
  })

  return results
}
