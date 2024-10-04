export const dotenv = {
  isDev: process.env.NEXT_PUBLIC_NEXT_ENV === 'dev',
  isProd: process.env.NEXT_PUBLIC_NEXT_ENV === 'prod',
}
