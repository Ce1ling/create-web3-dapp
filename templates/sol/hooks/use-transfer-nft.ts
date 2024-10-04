import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { web3 } from '@coral-xyz/anchor'
import { createTransferCheckedInstruction } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import { getAssociatedTokenAddressOrInstruction } from '@/utils/sol'

interface MutationParams {
  nftPubkey: web3.PublicKey
  toPubkey: web3.PublicKey
}

export const useTransferNft = <TContext = unknown>(
  options: Omit<
    UseMutationOptions<string, DefaultError, MutationParams, TContext>,
    'mutationKey' | 'mutationFn'
  >
) => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const results = useMutation({
    mutationKey: ['useTransferNft', publicKey],
    mutationFn: async ({ nftPubkey, toPubkey }) => {
      if (!publicKey) throw new Error('No wallet connect')

      const [fromToken, fromIx] = await getAssociatedTokenAddressOrInstruction(
        connection,
        publicKey,
        nftPubkey,
        publicKey
      )

      const [toToken, toIx] = await getAssociatedTokenAddressOrInstruction(
        connection,
        publicKey,
        nftPubkey,
        toPubkey
      )

      const tx = new web3.Transaction()

      if (fromIx) tx.add(fromIx)
      if (toIx) tx.add(toIx)

      tx.add(
        createTransferCheckedInstruction(
          fromToken,
          nftPubkey,
          toToken,
          publicKey,
          1,
          0
        )
      )

      return sendTransaction(tx, connection)
    },
    ...options,
  })

  return results
}
