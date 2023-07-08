import {NextPage} from "next";
import Chips from "@/app/components/Chips";

const getData = async () => {
    const tags: string[] = await fetch("https://dev.to/api/articles?username=porok12")
        .then(response => response.json())
        .then(articles => articles.map((article: any) => article.tags))
        .then((tags: string[]) => tags.flatMap(tags => tags.split(",")));
    return tags;
}

const Tags: NextPage = async () => {
    const tags = await getData();

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-3xl tracking-tight">Tags</h2>
                <div className="mt-4">
                    {tags.map(tag => <Chips key={tag}>{tag}</Chips>)}
                </div>
            </div>
        </div>
    )
}

export default Tags;
