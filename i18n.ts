import {getRequestConfig} from 'next-intl/server'

export default getRequestConfig(async ({locale}) => ({
  timeZone: 'Europe/Warsaw',
  messages: (await import(`./locales/${locale}.json`)).default,
}))
