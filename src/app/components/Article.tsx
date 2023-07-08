import React from "react";
import {NextPage} from "next";
import Link from "next/link";
import Image from "next/image";
import Chips from "@/app/components/Chips";
import type {IArticle} from "@/api/articles";
import CustomLink from "@/app/components/CustomLink";

interface Props {
    slug: string;
    meta: IArticle;
}

// (
//     <Link
//         key={category}
//         href={`/tags/${category}`}
//         className="relative z-10 rounded-full px-3 py-1.5 font-medium bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-white hover:bg-gray-100"
//     >
//         {category}
//     </Link>
// )

const avatar_url = "https://res.cloudinary.com/practicaldev/image/fetch/s--QL4f43GF--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1111913/f9379047-d578-4958-8829-0575c33fb47c.png"

const Article: NextPage<Props> = (props) => {
    const {slug, meta} = props;

    const categories: string[] = meta.tags.split(",");

    return (
        <article className="flex max-w-xl flex-col items-start justify-between">
            <img
                alt=""
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
                className="rounded-2xl"
                style={{width: '100%', height: 'auto'}}
            />

            <div className="mx-2 mt-4 flex-grow">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={meta.created_at} className="text-gray-500 dark:text-gray-200">
                        {new Date(meta.created_at).toLocaleDateString("pl")}
                    </time>
                    {categories.map(category => (
                        <CustomLink key={category} as={Chips} href={`tags/${category}`}>
                            {category}
                        </CustomLink>
                    ))}
                </div>

                <div className="group relative">
                    <h3 className="mt-3 text-3xl font-semilight leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300">
                        <Link href={`/articles/${slug}`}>
                            <span className="absolute inset-0"/>
                            {meta.title}
                        </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200">{meta.description}</p>
                </div>
            </div>

            <div className="relative mt-8 flex items-center gap-x-4 hidden">
                <img src={avatar_url} alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
                <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        <a href="#">
                            <span className="absolute inset-0" />
                            Przemysław Papla
                        </a>
                    </p>
                    <p className="text-gray-600">FullStack</p>
                </div>
            </div>
        </article>
    )
}

export default Article;
