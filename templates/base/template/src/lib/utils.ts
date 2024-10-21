import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { first, isEmpty } from 'lodash'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const joinPaths = (...paths: (string | number)[]) => {
  if (isEmpty(paths)) return ''

  const hasSlash = first(paths)?.toString().startsWith('/')
  const path = paths
    .map((a) => String(a).replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/')

  return hasSlash ? `/${path}` : path
}

export const sleep = (delay = 1000) =>
  new Promise((resolve) => setTimeout(resolve, delay))

export const getSub = (n: number) => {
  const map = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
  } as Record<string, string>

  const result = n
    .toString()
    .split('')
    .map((n) => map[n])
    .join('')

  return result
}
