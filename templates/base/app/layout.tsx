import type { Metadata, Viewport } from 'next'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjsZh from 'dayjs/locale/zh-cn'
import dayjsEn from 'dayjs/locale/en'

import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/components/providers'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(dayjsZh)
dayjs.locale(dayjsEn)

export const metadata: Metadata = {
  title: 'TODO:YOUR_APP_TITLE',
  description: 'TODO:YOUR_APP_DESCRIPTION',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
