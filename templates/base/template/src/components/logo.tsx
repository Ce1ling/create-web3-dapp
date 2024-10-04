import { type ComponentProps } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export const Logo = ({
  className,
  children,
  ...props
}: ComponentProps<'img'>) => {
  return (
    <Link href="/">
      {children || (
        <img
          // TODO: YOUR_LOGO
          src="YOUR_LOGO"
          alt="logo"
          className={cn(className, '')}
          {...props}
        />
      )}
    </Link>
  )
}
