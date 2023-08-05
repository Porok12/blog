import React from 'react'
import {NextPage} from 'next'
import Border from '@/app/components/Border'
import CustomLink from '@/app/components/CustomLink'
import Chips from '@/app/components/Chips'
import type {IArticle} from '@/api/articles'

const getData = async () => {
  return await fetch('https://dev.to/api/articles?username=porok12')
    .then(response => response.json())
    .then((articles: Array<IArticle>) => articles.map(article => article.tags))
    .then((tags: string[]) => tags.flatMap(tags => tags.split(', ')))
    .then((tags: string[]) => tags.map(tag => tag.trim()))
    .then((tags: string[]) => tags.reduce((acc, curr) => {
      const index = acc.findIndex(tag => tag.name === curr)
      if (index >= 1) {
        acc[index].count += 1
        return acc
      } else {
        return [...acc, { name: curr, count: 1 }]
      }
    }, [] as {name: string, count: number}[]))
}

const Tags: NextPage = async () => {
  const tags = await getData()
  return (
    <>
      <h2 className="mb-6 text-center text-3xl font-light tracking-tighter sm:text-left sm:text-5xl">
        Tags
      </h2>

      <Border/>

      <div className="mt-12 flex flex-wrap gap-4">
        {tags.map(tag => (
          <CustomLink key={tag.name} as={(props: any) => <Chips size='large' {...props}/>} href={`/tags/${tag.name}`}>
            {tag.name}<span className="ml-2">{tag.count}</span>
          </CustomLink>
        ))}
      </div>
    </>
  )
}

export default Tags
