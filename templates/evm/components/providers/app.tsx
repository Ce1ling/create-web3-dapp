'use client'

import { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  type Locale,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'

import { i18nConfig } from '@/i18n'
import { wagmiConfig } from '@/config/wagmi'

const queryClient = new QueryClient()

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={i18nConfig}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </WagmiProvider>
    </I18nextProvider>
  )
}
