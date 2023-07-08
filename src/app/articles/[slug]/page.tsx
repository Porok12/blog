import fs from "fs";
import path from "path";
import React from "react";
import {NextPage} from "next";
import Image from "next/image";
import matter from "gray-matter";
// import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote/rsc";
// import rehypeImageSize from "rehype-img-size";
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaidjs';
import {Components} from "@mdx-js/react/lib";
import scala from 'highlight.js/lib/languages/scala';
import "@/styles/highlight-js/github-dark.css";
import ArticleApi, {IArticle} from "@/api/articles";

export const generateStaticParams = async () => {
    let articles: string[] = [];
    // try {
    //     const pathToPosts = path.join("src", "app", "posts");
    //     posts = fs.readdirSync(pathToPosts)
    //         .filter(fileName => !fs.lstatSync(path.join(pathToPosts, fileName)).isDirectory())
    //         .map(fileName => fileName.replace(".mdx", ""));
    // } catch (e) {
    //     console.error(e);
    // }
    (await ArticleApi.articles()).forEach(article => articles.push(article.id+""));

    console.debug('Generated params for /articles/[slug]: ' + articles.join(', '))

    return articles.map((article) => ({
        slug: article,
    }))
}

const getData = async (slug: string) => {
    const post: IArticle = await ArticleApi.article(slug+"");
    console.debug(slug, post);
    return post;
}

const components: Components = {
    img: (props: any) => (
        // height and width are part of the props, so they get automatically passed here with {...props}
        <Image {...props} fill="responsive" loading="lazy" alt="..."/>
    ),
};

interface Props {
    params: {
        slug: string
    }
}

const Page: NextPage<Props> = async ({params}) => {
    const article = await getData(params.slug);

    return (
        <div className="py-24 sm:py-32">
            <article className="mx-auto max-w-7xl px-6 lg:px-8 prose dark:prose-invert">
                <MDXRemote
                    source={article.body_markdown!}
                    components={components}
                    options={{mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkEmoji],
                        rehypePlugins: [[rehypeHighlight, { languages: { scala }, subset: ['java', 'python'], ignoreMissing: true }], rehypeMermaid],
                        /*rehypePlugins: [[rehypeImageSize, {dir: "public"}]]*/
                    }}}
                />
            </article>
        </div>
    )
}

export default Page;
