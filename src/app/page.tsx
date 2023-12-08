import React from 'react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { default as ArticleApi, IArticle } from '@/api/articles'
import Article from '@/app/components/Article'
import Border from '@/app/components/Border'

const getData = async () => {
  try {
    return await ArticleApi.articles()
  } catch (e) {
    console.error(e)
    return []
  }
}

const Page = async () => {
  unstable_setRequestLocale('en')

  const articles: IArticle[] = await getData()
  const t = await getTranslations('home')

  return (
    <>
      <div className="max-w-4xl lg:mx-0">
        <h2 className="text-center text-3xl font-light tracking-tighter sm:text-left sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mb-4 mt-2 text-center text-sm leading-8 text-gray-600 dark:text-gray-400 sm:text-left sm:text-base">
          {t('description')}
        </p>
      </div>

      <Border />

      <div className="mt-24 sm:mt-16">
        <div className="grid min-w-full max-w-2xl grid-cols-1 justify-items-center gap-x-8 gap-y-16 px-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Article key={article.id} slug={article.id} meta={article} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Page
