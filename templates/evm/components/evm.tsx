'use client'

import { type PropsWithChildren } from 'react'

import { WagmiProvider } from 'wagmi'
import {
  type Locale,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'

import { wagmiConfig } from '@/config/wagmi'
import { i18nConfig } from '@/i18n'

export const EvmProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider
        locale={i18nConfig.language as Locale}
        modalSize="compact"
        theme={darkTheme({
          accentColor: 'white',
          accentColorForeground: 'black',
          borderRadius: 'medium',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
