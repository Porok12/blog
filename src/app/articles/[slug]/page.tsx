import { LinkIcon } from '@heroicons/react/24/solid'
import rehypeToc from '@jsdevtools/rehype-toc'
// import rehypeKatex from 'rehype-katex'
// import rehypeDocument from 'rehype-document'
import scala from 'highlight.js/lib/languages/scala'
import { NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import '@/styles/highlight-js/github-dark.css'
import '@/styles/highlight-js/github.css'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import rehypeHighlight from 'rehype-highlight' // 7.0.0 is problematic
import rehypeSlug from 'rehype-slug'
import remarkEmoji from 'remark-emoji'
// import rehypeImageSize from 'rehype-img-size'
import remarkGfm from 'remark-gfm' // https://github.com/hashicorp/next-mdx-remote/issues/403
import { default as ArticleApi } from '@/api/articles'
import Border from '@/app/components/Border'
import CopyButton from '@/app/components/CopyButton'
import ShareSection from '@/app/components/ShareSection'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

export const generateStaticParams = async () => {
  const articles: string[] = []

  // try {
  //     const pathToPosts = path.join("src", "app", "posts");
  //     posts = fs.readdirSync(pathToPosts)
  //         .filter(fileName => !fs.lstatSync(path.join(pathToPosts, fileName)).isDirectory())
  //         .map(fileName => fileName.replace(".mdx", ""));
  // } catch (e) {
  //     console.error(e);
  // }

  const fetchedArticles = await ArticleApi.articles()
  fetchedArticles.forEach((article) => articles.push(article.id.toString()))

  console.debug('Generated params for /articles/[slug]: ' + articles.join(', '))

  return articles.map((article) => ({
    slug: article,
  }))
}

const getData = async (slug: string) => {
  console.debug('Generated page for /articles/' + slug)

  return await ArticleApi.article(slug.toString())
}

const getHostname = () => {
  let hostname: string | undefined
  if (process.env.VERCEL_URL) {
    hostname = process.env.VERCEL_URL
  } else if (process.env.NEXT_PUBLIC_HOST_URL) {
    hostname = process.env.NEXT_PUBLIC_HOST_URL
  }
  // console.debug('hostname: ' + hostname)
  return hostname
}

const components: MDXRemoteProps['components'] = {
  img: (props: any) => {
    return (
      <div className="relative h-[250px] sm:h-[300px] md:h-[600px]">
        {/*height and width are part of the props, so they get automatically passed here with {...props}*/}
        <Image
          {...props}
          fill
          style={{
            objectFit: 'contain',
            margin: 0,
          }}
          loading="lazy"
          alt="image"
        />
      </div>
    )
  },
  pre: (props) => (
    <div className="relative">
      <CopyButton className="absolute" content={props.children} />
      <pre {...props} />
    </div>
  ),
  h1: (props) => {
    const { ...others } = props
    return (
      <div className={'mb-8 ml-[-28px] flex items-center justify-start'}>
        <Link className="mr-2" href={`#${others.id}`}>
          <LinkIcon className="h-6 w-6 duration-100 hover:scale-125" />
        </Link>
        <h1 {...others} className="mb-0" />
      </div>
    )
  },
  h2: (props) => {
    const { ...others } = props
    return (
      <div className={'mb-6 ml-[-28px] mt-10 flex items-center justify-start'}>
        <Link className="mr-2" href={`#${others.id}`}>
          <LinkIcon className="h-5 w-5 duration-100 hover:scale-125" />
        </Link>
        <h2 {...others} className="my-0" />
      </div>
    )
  },
}

interface Props {
  params: {
    slug: string
  }
}

const Page: NextPage<Props> = async ({ params }) => {
  const article = await getData(params.slug)
  const hostname = getHostname()

  if (!article?.body_markdown) {
    notFound()
  }

  return (
    <>
      <article className="prose mx-auto max-w-7xl px-6 dark:prose-invert lg:px-8">
        <time>{new Date(article.published_at).toLocaleDateString()}</time>
        <h1>{article.title}</h1>
        <Border />
        <div className="my-16" />
        <Suspense fallback={<>Loading...</>}>
          <MDXRemote
            source={article.body_markdown}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkEmoji],
                rehypePlugins: [
                  [
                    rehypeHighlight,
                    {
                      languages: { scala },
                      subset: ['java', 'python'],
                      ignoreMissing: true,
                    },
                  ],
                  rehypeSlug,
                  [rehypeToc, { headings: ['h1', 'h2'] }],
                  // rehypeKatex,
                  // [rehypeDocument, {
                  //   css: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css'
                  // }],
                ],
                //rehypePlugins: [[rehypeImageSize, {dir: "public"}]]
              },
            }}
          />
        </Suspense>

        <div className="my-4">
          <Border />
          <ShareSection url={hostname + '/articles/' + params.slug} />
        </div>
      </article>
    </>
  )
}

export default Page
