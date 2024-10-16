'use client'

import { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { i18nConfig } from '@/i18n'

const queryClient = new QueryClient()

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  )
}
