declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      HOST_URL?: string;
      VERCEL_URL?: string;
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_GOOGLE_ANALYTICS?: string;
    }
  }
}

export {}
