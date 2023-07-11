import React from 'react'
import Article from '@/app/components/Article'
import Border from '@/app/components/Border'
import ArticleApi, {IArticle} from '@/api/articles'

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
    <>
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          My development journey
        </h2>
        <p className="mt-2 text-lg leading-8">
          Hello learn with me awesome things...
        </p>
      </div>

      <Border/>

      <div
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 justify-items-center gap-x-8 gap-y-16 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        {articles.map((article) => <Article key={article.id} slug={article.id} meta={article}/>)}
      </div>
    </>
  )
}

export default Page
