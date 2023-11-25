// 'use server'

import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'

// export function generateStaticParams() {
//   return [{locale: 'en'}]
// }

export default async function LocaleLayout({children}) {
  //console.log(params)
  const timeZone = 'Europe/Warsaw'
  let messages
  try {
    messages = (await import(`../../../locales/${'en'}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={'en'} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  )
}
