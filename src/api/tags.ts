import { retry } from 'ts-retry-promise'
import { sleep } from '@/app/utils/sleep'

const debugPromise = async (response: Response): Promise<Response> => {
  const originalResponse = response.clone()
  try {
    const clone = response.clone()
    await clone.json()
    return originalResponse
  } catch (e) {
    console.debug(`${response.status}: ${response.statusText} - ${new Date()}`)
    console.debug(await response.text())
    return originalResponse
  }
}

export abstract class TagApi {
  abstract tags(): Promise<string[]>
}

class TagLocal implements TagApi {
  async tags(): Promise<string[]> {
    return [] // TODO
  }
}

class TagDevto implements TagApi {
  private workaroundCache: any = null

  private async devto(url: string): Promise<Response> {
    await sleep(Math.ceil(Math.random() * 5000))

    const { signal } = new AbortController()
    const response = await fetch('https://dev.to/api/' + url, {
      headers: {
        accept: 'application/vnd.forem.api-v1+json',
        'api-key': process.env.API_KEY,
      },
      next: { tags: ['articles'] },
      // cache: 'no-store', Turns to Dynamic Page
      signal,
    })

    // if (this.workaroundCache) {
    //   return this.workaroundCache
    // }
    // this.workaroundCache = response

    return response
  }

  async tags(): Promise<string[]> {
    const fetchPromise = () => this.devto('articles/me').then(debugPromise)
    // const response = await fetchPromise
    const response = await retry(fetchPromise, {
      retries: 3,
      delay: 500,
      backoff: 'LINEAR',
      // logger: (msg) => console.debug(msg),
    })

    try {
      const articles = await response.json()
      return articles.flatMap((article) => article.tag_list)
    } catch (e) {
      console.error('Error during fetch tags', e)
      return []
    }
  }
}

const api: TagApi = new TagDevto()
export default api
