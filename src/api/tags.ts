import type {IArticle} from '@/api/articles'


export abstract class TagApi {
  abstract tags(): Promise<string[]>;
}

class TagLocal implements TagApi {
  async tags(): Promise<string[]> {
    return []
  }
}

class TagDevto implements TagApi {

  private devto(url: string): Promise<Response> {
    return fetch('https://dev.to/api/' + url, {
      headers: {
        'accept': 'application/vnd.forem.api-v1+json',
        'api-key': process.env.API_KEY,
      },
      next: {tags: ['articles']},
    })
  }

  async tags(): Promise<string[]> {
    return await this.devto('articles/me')
      .then(response => response.json())
      .then((articles: Array<IArticle>) => articles.flatMap(article => article.tag_list))
      .then((tags: string[]) => tags.map(tag => tag.trim()).filter(tag => tag !== ''))
  }
}

const api: TagApi = new TagDevto()
export default api
