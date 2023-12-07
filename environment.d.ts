declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string
      NODE_ENV: 'development' | 'production' | 'test'
      VERCEL_URL?: string
      NEXT_PUBLIC_HOST_URL?: string
      NEXT_PUBLIC_GOOGLE_ANALYTICS?: string
    }
  }
}

export {}
