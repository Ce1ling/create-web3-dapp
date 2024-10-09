import React, { type ComponentProps } from 'react'
import NextLink from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const linkVariant = cva(
  'text-blue-600 cursor-pointer underline-offset-2 hover:underline',
  {
    variants: {},
    defaultVariants: {},
  }
)

export const Link = ({
  className,
  ...props
}: ComponentProps<typeof NextLink> & VariantProps<typeof linkVariant>) => (
  <NextLink className={cn(linkVariant(), className)} {...props}></NextLink>
)
