import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface IArticle {
  id: string
  title: string
  slug: string
  path: string
  url: string
  created_at: string
  edited_at: string
  description: string
  tag_list: Array<string>
  body_markdown?: string
  cover_image?: string
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
        .filter(fileName => {
          const filePath = path.join(pathToPosts, fileName)
          return !fs.lstatSync(filePath).isDirectory()
        })
        .map(fileName => {
          const slug = fileName.replace('.mdx', '')
          const filePath = path.join(pathToPosts, fileName)
          const fileContents = fs.readFileSync(filePath, 'utf-8')
          const {data} = matter(fileContents)
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
      const fileContents = fs.readFileSync(path.join(pathToPosts, `${slug}.mdx`), 'utf8')
      const {data, content} = matter(fileContents) as unknown as { content: string, data: IArticle }
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

  private devto(url: string): Promise<Response> {
    return fetch('https://dev.to/api/' + url, {
      headers: {
        'accept': 'application/vnd.forem.api-v1+json',
        'api-key': process.env.API_KEY,
      },
      next: {tags: ['articles']},
    })
  }

  async articles(): Promise<IArticle[]> {
    return await this.devto('articles/me')
      .then(response => response.json())
  }

  async article(id: string): Promise<IArticle> {
    return await this.devto(`articles/${id}`)
      .then(response => response.json())
      .then(response => ({...response, body_html: undefined, user: undefined}))
      .then(response => {
        console.debug(response)
        return response
      })
  }

  async articlesByTag(tag: string): Promise<IArticle[]> {
    return await this.devto('articles/me')
      .then(response => response.json())
      .then(response => {
        console.debug(response)
        return response
      })
      .then((articles: Array<IArticle>) => articles.filter(article => article.tag_list.includes(tag)))
  }
}

const api: ArticleApi = new ArticleDevto()
export default api
