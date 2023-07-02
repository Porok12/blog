import fs from "fs";
import path from "path";
import React from "react";
import {NextPage} from "next";
import Image from "next/image";
import matter from "gray-matter";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote/rsc";
// import rehypeImageSize from "rehype-img-size";

interface Props {
    params: {
        slug: string
    }
}

export const generateStaticParams = async () => {
    let posts: string[] = [];
    try {
        const pathToPosts = path.join("src", "app", "posts");
        posts = fs.readdirSync(pathToPosts);
        return posts.filter(fileName => {
            const filePath = path.join(pathToPosts, fileName);
            return !fs.lstatSync(filePath).isDirectory();
        });
    } catch (e) {
        console.error(e);
    }

    return posts.map((post) => ({
        slug: post,
    }))
}

const getPost = async (slug: string) => {
    try {
        const pathToPosts = path.join("src", "app", "posts");
        const fileContents = fs.readFileSync(path.join(pathToPosts, `${slug}.mdx`), "utf8");
        const {data, content} = matter(fileContents);
        return {
            data,
            content,
        };
    } catch (e) {
        console.error(e);
        return {
            data: {},
            content: '',
        }
    }
};

const getData = async (slug: string) => {
    const post = await getPost(slug);
    const mdxSource = await serialize(post.content);
    return {
        data: post.data,
        content: post.content,
    }
}

const components = {
    img: (props: any) => (
        // height and width are part of the props, so they get automatically passed here with {...props}
        <Image {...props} fill="responsive" loading="lazy" alt="..."/>
    ),
};

const Page: NextPage<Props> = async ({params}) => {
    const {data, content} = await getData(params.slug);

    return (
        <div className="py-24 sm:py-32">
            <article className="mx-auto max-w-7xl px-6 lg:px-8 prose dark:prose-invert">
                {JSON.stringify(data)}
                <MDXRemote
                    source={content}
                    components={components}
                    options={{mdxOptions: {/*rehypePlugins: [[rehypeImageSize, {dir: "public"}]]*/}}}
                />
            </article>
        </div>
    )
}

export default Page;
