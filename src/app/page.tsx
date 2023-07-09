import React from 'react'
import Article from '@/app/components/Article'
import Button from '@/app/components/Button'
import Border from '@/app/components/Border'
import ArticleApi, {IArticle} from '@/api/articles'

export const fetchCache = 'force-no-store'

const getData = async () => {
  try {
    return await ArticleApi.articles()
  } catch(e) {
    console.error(e)
    return []
  }
}

const Page = async () => {
  const articles: IArticle[] = await getData()

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My development journey
          </h2>
          <p className="mt-2 text-lg leading-8">
            Hello learn with me awesome things...
          </p>
          <Button>Hello</Button>
        </div>

        <Border/>

        <div
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {articles.map((article) => <Article key={article.id} slug={article.id} meta={article}/>)}
        </div>
      </div>
    </div>
  )
}

export default Page
