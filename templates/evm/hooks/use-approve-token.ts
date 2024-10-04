import { useTranslation } from 'react-i18next'
import { useAccount, useWriteContract } from 'wagmi'
import { Address, erc20Abi, formatEther } from 'viem'
import { readContract } from 'wagmi/actions'
import { toast } from 'sonner'
import { BigNumber } from 'bignumber.js'

import { type ConfigChainIds, wagmiConfig } from '@/config/wagmi'
import { APPROVE_TOKEN_MAX_VALUE } from '@/constants/contract'

export const useApprove = (chainId: number) => {
  const { t } = useTranslation()
  const { address } = useAccount()

  const {
    isPending: isApproving,
    writeContractAsync,
    reset: resetApprove,
  } = useWriteContract({
    mutation: {
      onMutate: () => toast.loading(t('approve.loading')),
      onSettled: (_, __, ___, id) => toast.dismiss(id),
      onError: (err) => {
        console.error(err.message || err)
        toast.error(t('approve.failed'))
      },
      onSuccess: () => toast.success(t('approve.success')),
    },
  })

  const approvalForAll = async (
    token: Address,
    spender: Address,
    amount: string
  ) => {
    const isApproved = await checkForApproval(token, spender, amount)
    if (isApproved) return true

    try {
      await writeContractAsync({
        abi: erc20Abi,
        address: token,
        chainId,
        functionName: 'approve',
        args: [spender, APPROVE_TOKEN_MAX_VALUE],
      })
      return true
    } catch (err: any) {
      console.error(err.message || err)
      return false
    } finally {
      resetApprove()
    }
  }

  const checkForApproval = async (
    token: Address,
    spender: Address,
    amount: string
  ) => {
    try {
      if (!address) return false
      const value = await readContract(wagmiConfig, {
        abi: erc20Abi,
        address: token,
        functionName: 'allowance',
        chainId: chainId as ConfigChainIds,
        args: [address, spender],
      })

      return BigNumber(formatEther(value)).gte(amount)
    } catch (err: any) {
      console.error(err.message || err)
      return false
    }
  }

  return {
    isApproving,
    checkForApproval,
    approvalForAll,
    resetApprove,
  }
}
