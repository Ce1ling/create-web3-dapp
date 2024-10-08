'use client'

import { type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const H5 = ({ className, ...props }: ComponentProps<'h5'>) => {
  return (
    <h5
      className={cn(
        'scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    ></h5>
  )
}
