import React, { type ComponentProps } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export const ConnectWalletDialog = ({
  children,
}: ComponentProps<typeof Dialog>) => {
  const { t } = useTranslation()
  const { wallets, select } = useWallet()

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (wallets.length <= 0) {
            e.preventDefault()
            toast.error(t('no-wallet'))
          } else if (wallets.length === 1) {
            e.preventDefault()
            select(wallets[0].adapter.name)
          }
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('connect.dialog-title')}:</DialogTitle>
        <ul className="space-y-2">
          {wallets.map(({ adapter }) => (
            <li key={adapter.name} className="w-full">
              <Button
                variant="secondary"
                className="space-x-2 w-full"
                onClick={() => select(adapter.name)}
              >
                <img src={adapter.icon} alt="logo" className="w-5 h-5" />
                <span>{adapter.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
