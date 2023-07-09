import {NextPage} from 'next'
import {notFound} from 'next/navigation'
import Article from '@/app/components/Article'
import TagApi from '@/api/tags'
import ArticleApi from '@/api/articles'

export const generateStaticParams = async () => {
  const tags: string[] = await TagApi.tags()

  console.error('Generated params for /tags/[slug]: ' + tags.join(', '))

  return tags.map((tag) => ({
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

  if (!props.params.slug) {
    notFound()
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-4 text-3xl">Tag #{props.params.slug}</h2>
        <div>
          {articles.map(article => <Article key={article.id} slug={article.id} meta={article} />)}
        </div>
      </div>
    </div>
  )
}

export default Tags
