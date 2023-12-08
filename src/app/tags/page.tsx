import React from 'react'
import { NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import Border from '@/app/components/Border'
import Chips from '@/app/components/Chips'
import CustomLink from '@/app/components/CustomLink'
import { default as TagApi } from '@/api/tags'

const getData = async () => {
  const tags = await TagApi.tags()
  const countedTags = tags.reduce(
    (acc, curr) => {
      const index = acc.findIndex((tag) => tag.name === curr)
      if (index >= 1) {
        acc[index].count += 1
        return acc
      } else {
        return [...acc, { name: curr, count: 1 }]
      }
    },
    [] as { name: string; count: number }[],
  )
  return countedTags.sort((a, b) => b.count - a.count)
}

const Tags: NextPage = async () => {
  // unstable_setRequestLocale('en')

  const tags = await getData()
  const t = await getTranslations({ locale: 'en', namespace: 'tags' })

  return (
    <>
      <h2 className="mb-6 text-center text-3xl font-light tracking-tighter sm:text-left sm:text-5xl">
        {t('title')}
      </h2>

      <Border />

      <div className="mx-8 mt-12 flex flex-wrap gap-4">
        {tags.map((tag) => (
          <CustomLink
            key={tag.name}
            as={(props: any) => <Chips size="large" {...props} />}
            href={`/tags/${tag.name}`}
          >
            {tag.name}
            <span className="ml-2">{tag.count}</span>
          </CustomLink>
        ))}
      </div>
    </>
  )
}

export default Tags
