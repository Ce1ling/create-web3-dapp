'use client'

import React, { forwardRef, type ComponentProps } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTranslation } from 'react-i18next'

import { ConnectWalletDialog } from './dialog'
import { formatAddress } from '@/utils/format'
import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'

type As = 'link' | 'button'

type AsSelect<
  T extends As = As,
  TLink = unknown,
  TButton = unknown
> = T extends 'link' ? TLink : T extends 'button' ? TButton : never

type AsProps<T extends As = As> = AsSelect<
  T,
  Omit<ComponentProps<typeof Link>, 'href'>,
  ComponentProps<typeof Button>
>

type AsRef<T extends As = As> = AsSelect<
  T,
  React.Ref<HTMLAnchorElement>,
  React.Ref<HTMLButtonElement>
>

type Props<T extends As = As> = {
  as: T
} & AsProps<T>

export const ConnectWallet = forwardRef(
  <T extends As = As>(props: Props<T>, ref: AsRef<T>) => {
    const { t } = useTranslation()
    const { connected, publicKey, disconnect } = useWallet()

    if (connected && props.children) return props.children
    if (connected) {
      return (
        <Trigger onClick={disconnect} ref={ref} {...props}>
          {formatAddress(publicKey?.toString() ?? '')}
        </Trigger>
      )
    }

    return (
      <ConnectWalletDialog>
        <Trigger ref={ref} {...props}>
          {t('connect')}
        </Trigger>
      </ConnectWalletDialog>
    )
  }
)

const Trigger = forwardRef(
  <T extends As = As>(
    { as, ...props }: Props<T>,
    ref: React.Ref<any> // I don't have a better way to handle this `any`.
  ) => {
    if (as === 'link') {
      return (
        <Link
          href="#"
          className="text-white"
          ref={ref}
          {...(props as AsProps<'link'>)}
        ></Link>
      )
    }
    if (as === 'button') {
      return (
        <Button
          variant="destructive"
          ref={ref}
          {...(props as AsProps<'button'>)}
        ></Button>
      )
    }
    throw new Error('Invalis as prop')
  }
)
