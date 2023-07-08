import type {IArticle} from "@/api/articles";


export abstract class TagApi {
    abstract tags(): Promise<string[]>;
}

class TagLocal implements TagApi {
    async tags(): Promise<string[]> {
        return [];
    }
}

class TagDevto implements TagApi {
    tags(): Promise<string[]> {
        return fetch("https://dev.to/api/articles?username=porok12")
            .then(response => response.json())
            .then(articles => articles.map((article: IArticle) => article.tags))
            .then((tags: string[]) => tags.flatMap(tags => tags.split(",")));
    }
}

const api: TagApi = new TagDevto();
export default api;
