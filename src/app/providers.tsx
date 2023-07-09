'use client'

import {ThemeProvider} from 'next-themes'

const Providers = ({children}: any) => {
  return (
    <ThemeProvider attribute='class'>
      {children}
    </ThemeProvider>
  )
}

export default Providers
