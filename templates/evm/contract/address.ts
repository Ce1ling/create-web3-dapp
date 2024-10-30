import { dotenv } from '@/lib/env'

const prod = {
  // TODO: YOUR_CONTRACT_ADDRESS
  contractA: '0x000',
}

const dev = {
  // TODO: YOUR_CONTRACT_ADDRESS
  contractA: '0x000',
}

export const contractAddr = dotenv.isDev ? dev : prod
