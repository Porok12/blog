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
  async tags(): Promise<string[]> {
    return await fetch('https://dev.to/api/articles?username=porok12', {next: {tags: ['articles']}})
      .then(response => response.json())
      .then(articles => articles.map((article: IArticle) => article.tags))
      .then((tags: string[]) => tags.flatMap(tags => tags.split(', ')))
      .then((tags: string[]) => tags.map(tag => tag.trim()).filter(tag => tag !== ''))
  }
}

const api: TagApi = new TagDevto()
export default api
