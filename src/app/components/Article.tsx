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

// (
//     <Link
//         key={category}
//         href={`/tags/${category}`}
//         className="relative z-10 rounded-full px-3 py-1.5 font-medium bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-white hover:bg-gray-100"
//     >
//         {category}
//     </Link>
// )

const avatar_url = 'https://res.cloudinary.com/practicaldev/image/fetch/s--QL4f43GF--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1111913/f9379047-d578-4958-8829-0575c33fb47c.png'

const Article: NextPage<Props> = (props) => {
  const {slug, meta} = props

  const categories: string[] = meta.tags.split(',')

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="relative h-64 w-full">
        <Image
          alt=""
          src={meta.cover_image || ''}
          className="rounded-2xl shadow-md shadow-gray-200 dark:shadow-none"
          style={{objectFit: 'cover' }}
          fill
        />
      </div>

      <div className="mx-2 mt-4 grow">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={meta.created_at} className="text-gray-500 dark:text-gray-200">
            {new Date(meta.created_at).toLocaleDateString('pl')}
          </time>
          {categories.map(category => (
            <CustomLink key={category} as={Chips} href={`/tags/${category}`}>
              {category}
            </CustomLink>
          ))}
        </div>

        <div className="group relative">
          <h3 className="font-semilight mt-3 text-3xl leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300">
            <Link href={`/articles/${slug}`}>
              <span className="absolute inset-0"/>
              {meta.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200">{meta.description}</p>
        </div>
      </div>

      <div className="flex-backup relative mt-8 hidden items-center gap-x-4">
        <img src={avatar_url} alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="#">
              <span className="absolute inset-0" />
              Przemysław Papla
            </a>
          </p>
          <p className="text-gray-600">FullStack</p>
        </div>
      </div>
    </article>
  )
}

export default Article
