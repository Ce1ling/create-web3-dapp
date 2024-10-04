import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'

import '@/styles/globals.css'
import { AppProviders } from '@/components/providers/app'
import { Toaster } from '@/components/ui/sonner'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AppProviders>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </AppProviders>
  )
}
