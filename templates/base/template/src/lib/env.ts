export const dotenv = {
  isDev: process.env.NEXT_ENV === 'dev',
  isProd: process.env.NEXT_ENV === 'prod',
}
