import React from 'react'
import {NextPage} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {MDXRemote} from 'next-mdx-remote/rsc'
// import rehypeImageSize from "rehype-img-size";
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import rehypeHighlight from 'rehype-highlight'
import scala from 'highlight.js/lib/languages/scala'
import ArticleApi from '@/api/articles'
import Border from '@/app/components/Border'
import '@/styles/highlight-js/github-dark.css'
import type {MDXRemoteProps} from 'next-mdx-remote/rsc'

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
    <div className="py-24 sm:py-32">
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
                  ignoreMissing: true
                }],
              ],
              /*rehypePlugins: [[rehypeImageSize, {dir: "public"}]]*/
            }
          }}
        />
      </article>
    </div>
  )
}

export default Page
