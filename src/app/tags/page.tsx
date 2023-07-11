import React from 'react'
import {NextPage} from 'next'
import CustomLink from '@/app/components/CustomLink'
import Chips from '@/app/components/Chips'

const getData = async () => {
  const tags: string[] = await fetch('https://dev.to/api/articles?username=porok12')
    .then(response => response.json())
    .then(articles => articles.map(article => article.tags))
    .then((tags: string[]) => tags.flatMap(tags => tags.split(',')))
  return tags
}

const Tags: NextPage = async () => {
  const tags = await getData()
  return (
    <>
      <h2 className="text-3xl tracking-tight">Tags</h2>
      <div className="mt-4">
        {tags.map(tag => (
          <CustomLink key={tag} as={Chips} href={`tags/${tag}`}>
            {tag}
          </CustomLink>
        ))}
      </div>
    </>
  )
}

export default Tags
