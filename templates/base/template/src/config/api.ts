import { dotenv } from '@/lib/env'

// TODO: YOUR_API_URL
const prod = {
  example: 'YOUR_API_URL',
}

const dev = {
  example: 'YOUR_API_URL',
}

export const apiUrl = dotenv.isDev ? dev : prod
