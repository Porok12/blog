import fs from "fs";
import path from "path";
import React from "react";
import matter from "gray-matter";
import Post from "@/app/components/Post";

async function getData() {
    const pathToPosts = path.join("src", "app", "posts");
    const posts = fs.readdirSync(pathToPosts);
    return posts.filter(fileName => {
        const filePath = path.join(pathToPosts, fileName);
        return !fs.lstatSync(filePath).isDirectory();
    }).map(fileName => {
        const slug = fileName.replace(".mdx", "");
        const filePath = path.join(pathToPosts, fileName);
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const {data} = matter(fileContents);
        return {
            slug,
            data,
        }
    });
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
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {data.map(({slug, data}) => <Post key={slug} slug={slug} data={data}/>)}
                </div>
            </div>
        </div>
    )
}

export default Page;
