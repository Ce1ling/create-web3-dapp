import { ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

export const linkVariant = (...values: ClassValue[]) =>
  cn(
    'text-blue-600 cursor-pointer underline-offset-2 hover:underline',
    ...values
  )
