import { useAccount, useSwitchChain } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export const useCheckAccount = () => {
  const { address, isConnected, chainId: accountChainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { openConnectModal } = useConnectModal()

  const checkForConnect = () => {
    if (!isConnected || !address) {
      openConnectModal?.()
      return false
    }
    return true
  }

  const checkForChain = async (chainId: number | string | undefined) => {
    if (!chainId) return false

    chainId = +chainId
    if (accountChainId === chainId) return true

    try {
      await switchChainAsync({ chainId })
      return true
    } catch (err: any) {
      console.error(err.message || err)
      return false
    }
  }

  const checkAccount = async (chainId: number | string | undefined) => {
    if (!checkForConnect()) return false
    if (!(await checkForChain(chainId))) return false
    return true
  }

  return {
    address,
    isConnected,
    chainId: accountChainId,
    checkForConnect,
    checkForChain,
    checkAccount,
  }
}
