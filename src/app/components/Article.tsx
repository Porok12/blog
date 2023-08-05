import React from 'react'
import {NextPage} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Chips from '@/app/components/Chips'
import CustomLink from '@/app/components/CustomLink'
import type {IArticle} from '@/api/articles'

interface Props {
    slug: string;
    meta: IArticle;
}

const Article: NextPage<Props> = (props) => {
  const {slug, meta} = props

  const categories: string[] = meta.tags.split(',')

  return (
    <article className="group relative flex w-full max-w-xl flex-col items-start justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-slate-900">

      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <div className="relative min-h-[240px] min-w-full overflow-hidden rounded-2xl 2xl:min-h-[280px]">
          <Link href={`/articles/${slug}`}>
            <Image
              alt=""
              src={meta.cover_image || 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG'}
              className="object-cover transition duration-500 group-hover:scale-110"
              style={{objectFit: 'cover' }}
              fill
            />
          </Link>
        </div>
      </div>

      <div className="mx-2 mt-4 w-full grow">
        <div className="flex gap-x-2">
          <time dateTime={meta.created_at} className="text-gray-500 dark:text-gray-200">
            {new Date(meta.created_at).toLocaleDateString('pl')}
          </time>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map(category => (
              <CustomLink key={category} as={Chips} href={`/tags/${category}`}>
                {category}
              </CustomLink>
            ))}
          </div>
        </div>

        <div className="">
          <h3 className="font-semilight mt-3 text-2xl leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300">
            <Link href={`/articles/${slug}`}>
              {meta.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200">{meta.description}</p>
        </div>
      </div>

    </article>
  )
}

export default Article
