import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  unstable_setRequestLocale('en')

  let messages
  try {
    messages = (await import('../../../locales/en.json')).default
  } catch (error) {}

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

export default Layout
