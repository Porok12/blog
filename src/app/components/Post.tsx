import React from "react";
import {NextPage} from "next";
import Link from "next/link";

export interface MetaPost {
    title: string;
    date: string;
    datetime?: string;
    description: string;
    categories: string;
}

interface Props {
    slug: string;
    meta: MetaPost
}

const Post: NextPage<Props> = (props) => {
    const {slug, meta} = props;

    const categories = meta.categories.split(",");

    return (
        <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={meta.datetime} className="text-gray-500">
                    {meta.date}
                </time>
                {categories.map(category => (
                    <Link
                        key={category}
                        href={`/tags/${slug}`}
                        className="relative z-10 rounded-full px-3 py-1.5 font-medium bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-white hover:bg-gray-100"
                    >
                        {category}
                    </Link>
                ))}
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/articles/${slug}`}>
                        <span className="absolute inset-0"/>
                        {meta.title}
                    </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{meta.description}</p>
            </div>
        </article>
    )
}

export default Post;
