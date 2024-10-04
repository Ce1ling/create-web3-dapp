// TODO: YOUR_COMMON_API_TYPES

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PaginationReq {
  page: number
  pageSize: number
}

export interface PaginationRes<T = unknown> {
  total: number
  list: T[]
}

export type ApiLocales = Partial<{
  zh: string
  en: string
  [k: string]: string
}>

export enum ApiCodes {}
