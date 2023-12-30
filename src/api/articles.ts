import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { retry } from 'ts-retry-promise'
import { sleep } from '@/app/utils/sleep'

export interface IArticle {
  id: string
  title: string
  slug: string
  path: string
  url: string
  published_at: string
  description: string
  tag_list: Array<string>
  body_markdown?: string
  cover_image?: string
}

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

export abstract class ArticleApi {
  abstract articles(): Promise<IArticle[]>

  abstract article(slug: string): Promise<IArticle>

  abstract articlesByTag(tag: string): Promise<IArticle[]>
}

class ArticleLocal implements ArticleApi {
  async articles(): Promise<IArticle[]> {
    try {
      const pathToPosts = path.join('src', 'app', 'posts')
      const posts = fs.readdirSync(pathToPosts)
      return posts
        .filter((fileName) => {
          const filePath = path.join(pathToPosts, fileName)
          return !fs.lstatSync(filePath).isDirectory()
        })
        .map((fileName) => {
          const slug = fileName.replace('.mdx', '')
          const filePath = path.join(pathToPosts, fileName)
          const fileContents = fs.readFileSync(filePath, 'utf-8')
          const { data } = matter(fileContents)
          data.slug = slug
          return data as IArticle
        })
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async article(slug: string): Promise<IArticle> {
    try {
      const pathToPosts = path.join('src', 'app', 'posts')
      const fileContents = fs.readFileSync(
        path.join(pathToPosts, `${slug}.mdx`),
        'utf8',
      )
      const { data, content } = matter(fileContents) as unknown as {
        content: string
        data: IArticle
      }
      data.body_markdown = content
      return data
    } catch (e) {
      console.error(e)
      throw Error(`${slug} article not found`)
    }
  }

  articlesByTag(tag: string): Promise<IArticle[]> {
    return Promise.resolve([])
  }
}

class ArticleDevto implements ArticleApi {
  private workaroundCache: any = null

  private async devto(url: string): Promise<Response> {
    if (!process.env.API_KEY) {
      console.error('Empty API_KEY')
    }

    await sleep(Math.ceil(Math.random() * 5000))

    const { signal } = new AbortController()
    const response = await fetch('https://dev.to/api/' + url, {
      headers: {
        accept: 'application/vnd.forem.api-v1+json',
        'api-key': process.env.API_KEY,
      },
      next: { tags: ['articles'] },
      // cache: 'no-store', Turns to dynamic page
      signal,
    })

    // if (this.workaroundCache) {
    //   return this.workaroundCache
    // }
    // this.workaroundCache = response

    return response
  }

  async articles(): Promise<IArticle[]> {
    const fetchPromise = () => this.devto('articles/me').then(debugPromise)
    const response = await retry(fetchPromise, {
      retries: 3,
      delay: 500,
      backoff: 'LINEAR',
      // logger: (msg) => console.debug(msg),
    })

    try {
      return await response.json()
    } catch (e) {
      console.error('Error during fetch articles', e)
      return []
    }
  }

  async article(id: string): Promise<IArticle> {
    const fetchPromise = () => this.devto('articles/me').then(debugPromise)
    const response = await retry(fetchPromise, {
      retries: 3,
      delay: 500,
      backoff: 'LINEAR',
      // logger: (msg) => console.debug(msg),
    })

    try {
      return {
        ...(await response.json()),
        body_html: undefined,
        user: undefined,
      }
    } catch (e) {
      console.error(`Error during fetch articles by id '${id}'`, e)
      throw e
    }
  }

  async articlesByTag(tag: string): Promise<IArticle[]> {
    const fetchPromise = () => this.devto('articles/me').then(debugPromise)
    const response = await retry(fetchPromise, {
      retries: 3,
      delay: 500,
      backoff: 'LINEAR',
      // logger: (msg) => console.debug(msg),
    })

    try {
      return await response.json()
    } catch (e) {
      console.error(`Error during fetch articles by tag '${tag}'`, e)
      return []
    }
  }
}

const api: ArticleApi = new ArticleDevto()
export default api
