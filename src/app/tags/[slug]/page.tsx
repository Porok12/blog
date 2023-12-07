import React from 'react'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Article from '@/app/components/Article'
import Border from '@/app/components/Border'
import ArticleApi from '@/api/articles'
import TagApi from '@/api/tags'

export const generateStaticParams = async () => {
  const tags: string[] = await TagApi.tags()
  const uniqueTags = tags.filter(
    (val, index, arr) => arr.indexOf(val) === index,
  )

  console.error('Generated params for /tags/[slug]: ' + uniqueTags.join(', '))

  return uniqueTags.map((tag) => ({
    slug: tag,
  }))
}

const getData = async (slug: string) => {
  return await ArticleApi.articlesByTag(slug)
}

interface Props {
  params: {
    slug: string
  }
}

const Tags: NextPage<Props> = async (props) => {
  const articles = await getData(props.params.slug)
  const t = await getTranslations({ locale: 'en', namespace: 'tags' })

  if (!props.params.slug) {
    notFound()
  }

  return (
    <>
      <h2 className="mb-4 text-3xl">
        {t('tag')} #{props.params.slug}
      </h2>

      <Border />

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 justify-items-center gap-x-8 gap-y-16 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {articles.map((article) => (
          <Article key={article.id} slug={article.id} meta={article} />
        ))}
      </div>
    </>
  )
}

export default Tags
