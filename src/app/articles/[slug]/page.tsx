import React from 'react'
import {NextPage} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {MDXRemote} from 'next-mdx-remote/rsc'
// import rehypeImageSize from 'rehype-img-size'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import rehypeHighlight from 'rehype-highlight'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'
// import rehypeKatex from 'rehype-katex'
// import rehypeDocument from 'rehype-document'
import scala from 'highlight.js/lib/languages/scala'
import ArticleApi from '@/api/articles'
import Border from '@/app/components/Border'
import CopyButton from '@/app/components/CopyButton'
import {HashtagIcon, LinkIcon} from '@heroicons/react/24/solid'
import '@/styles/highlight-js/github.css'
import '@/styles/highlight-js/github-dark.css'
import type {MDXRemoteProps} from 'next-mdx-remote/rsc'
// import {
//   FacebookShareButton,
//   FacebookIcon,
// } from 'next-share'


export const generateStaticParams = async () => {
  const articles: string[] = [];
  // try {
  //     const pathToPosts = path.join("src", "app", "posts");
  //     posts = fs.readdirSync(pathToPosts)
  //         .filter(fileName => !fs.lstatSync(path.join(pathToPosts, fileName)).isDirectory())
  //         .map(fileName => fileName.replace(".mdx", ""));
  // } catch (e) {
  //     console.error(e);
  // }
  (await ArticleApi.articles()).forEach(article => articles.push(article.id + ''))

  console.debug('Generated params for /articles/[slug]: ' + articles.join(', '))

  return articles.map((article) => ({
    slug: article,
  }))
}

const getData = async (slug: string) => {
  return await ArticleApi.article(slug + '')
}

const components: MDXRemoteProps['components'] = {
  img: (props: any) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Image {...props} fill="responsive" loading="lazy" alt="..."/>
  ),
  pre: props => (
    <div className="relative">
      <CopyButton className="absolute" content={props.children} />
      <pre {...props} />
    </div>
  ),
  h1: props => {
    const {...others} = props
    return (
      (
        <div className={'mb-8 flex items-center justify-start'}>
          <h1 {...others} className="mb-0"/>
          <Link className="ml-2" href={`#${others.id}`}>
            <LinkIcon className="h-6 w-6 duration-100 hover:scale-125"/>
          </Link>
        </div>
      )
    )
  },
  h2: props => {
    const {...others} = props
    return (
      (
        <div className={'mb-6 mt-10 flex items-center justify-start'}>
          <h2 {...others} className="my-0"/>
          <Link className="ml-2" href={`#${others.id}`}>
            <LinkIcon className="h-5 w-5 duration-100 hover:scale-125"/>
          </Link>
        </div>
      )
    )
  },
}

interface Props {
    params: {
        slug: string
    }
}

const Page: NextPage<Props> = async ({params}) => {
  const article = await getData(params.slug)

  if (!article?.body_markdown) {
    notFound()
  }

  return (
    <>
      <article className="prose mx-auto max-w-7xl px-6 dark:prose-invert lg:px-8">
        <time>{new Date(article.created_at).toLocaleDateString()}</time>
        <h1>{article.title}</h1>
        <Border/>
        <div className="my-16"/>
        <MDXRemote
          source={article.body_markdown}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkEmoji],
              rehypePlugins: [
                [rehypeHighlight, {
                  languages: {scala},
                  subset: ['java', 'python'],
                  ignoreMissing: true,
                }],
                rehypeSlug,
                [rehypeToc, {headings: ['h1', 'h2']}],
                // rehypeKatex,
                // [rehypeDocument, {
                //   css: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css'
                // }],
              ],
              /*rehypePlugins: [[rehypeImageSize, {dir: "public"}]]*/
            },
          }}
        />

        <div className="my-4">
          <Border/>
          <div className="flex">
            {/*<FacebookShareButton*/}
            {/*  url={'https://github.com/next-share'}*/}
            {/*  quote={'next-share is a social share buttons for your next React apps.'}*/}
            {/*  hashtag={'#nextshare'}*/}
            {/*>*/}
            {/*  <FacebookIcon size={32} round />*/}
            {/*</FacebookShareButton>*/}
          </div>
        </div>

      </article>
    </>
  )
}

export default Page
