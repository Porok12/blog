declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_GOOGLE_ANALYTICS?: string;
    }
  }
}

export {}
