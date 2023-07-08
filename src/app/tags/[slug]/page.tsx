import {NextPage} from "next";
import TagApi from "@/api/tags";

export const generateStaticParams = async () => {
    let tags: string[] = await TagApi.tags();

    console.error('Generated params for /tags/[slug]' + tags.join(', '))

    return tags.map((tag) => ({
        slug: tag,
    }))
}

const getData = async () => {

}

const Tags: NextPage<any> = async (props) => {
    const data  = await getData();

    return (
        <>
            Slug {props?.slug}
        </>
    )
}

export default Tags;
