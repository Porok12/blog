import fs from "fs";
import path from "path";
import React from "react";
import matter from "gray-matter";
import Post, {MetaPost} from "@/app/components/Post";

const getData = async () => {
    const devto = await fetch("https://dev.to/api/articles?username=porok12")
        .then(response => response.json())
        .then(posts => posts.map(({title, description, slug, created_at, tags}: any) => ({
            slug: slug,
            data: {
                title,
                description,
                date: created_at,
                categories: tags,
            }
        })));

    try {
        const pathToPosts = path.join("src", "app", "posts");
        const posts = fs.readdirSync(pathToPosts);
        const local = posts.filter(fileName => {
            const filePath = path.join(pathToPosts, fileName);
            return !fs.lstatSync(filePath).isDirectory();
        }).map(fileName => {
            const slug = fileName.replace(".mdx", "");
            const filePath = path.join(pathToPosts, fileName);
            const fileContents = fs.readFileSync(filePath, "utf-8");
            const {data} = matter(fileContents) as unknown as { data: MetaPost };
            return {
                slug,
                data,
            }
        });
        return [...devto, ...local];
    } catch (e) {
        console.error(e);
        return [];
    }
}

const Page = async () => {
    const data = await getData();

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        From the blog
                    </h2>
                    <p className="mt-2 text-lg leading-8">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>

                <div
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {data.map(({slug, data}) => <Post key={slug} slug={slug} meta={data}/>)}
                </div>
            </div>
        </div>
    )
}

export default Page;
