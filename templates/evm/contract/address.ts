import { dotenv } from '@/lib/env'

const prod = {}

const dev = {}

export const contractAddr = dotenv.isDev ? dev : prod
