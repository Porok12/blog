import React from "react";
import {NextPage} from "next";
import Link from "next/link";

interface Props {
    slug: string;
    data: {
        title: string;
        date: string;
        datetime?: string;
        description: string;
        categories: string;
    }
}

const Post: NextPage<Props> = (props) => {
    const {slug, data} = props;

    const categories = data.categories.split(",");

    return (
        <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={data.datetime} className="text-gray-500">
                    {data.date}
                </time>
                {categories.map(category => (
                    <Link
                        key={category}
                        href={`tags/${slug}`}
                        className="relative z-10 rounded-full px-3 py-1.5 font-medium bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-white hover:bg-gray-100"
                    >
                        {category}
                    </Link>
                ))}
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`articles/${slug}`}>
                        <span className="absolute inset-0"/>
                        {data.title}
                    </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{data.description}</p>
            </div>
        </article>
    )
}

export default Post;
