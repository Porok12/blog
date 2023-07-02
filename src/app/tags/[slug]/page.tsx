import {NextPage} from "next";

export const generateStaticParams = async () => {
    let tags: string[] = ['xd'];

    console.error('Generated params for /tags/[slug]' + tags.join(', '))

    return tags.map((tag) => ({
        slug: tag,
    }))
}

const Tags: NextPage<any> = (props) => {
    return (
        <>
            Slug {props?.slug}
        </>
    )
}

export default Tags;
