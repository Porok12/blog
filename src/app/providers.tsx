'use client'

import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}

export default Providers
