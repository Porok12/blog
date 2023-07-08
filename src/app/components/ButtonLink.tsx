import Link, {LinkProps} from "next/link";

interface Props<T> extends LinkProps<T> {

}

const ButtonLink = (props: Props<any>) => {
    const { href } = props;

    return (
        <Link href={href} passHref legacyBehavior>
            <a className="btn btn-primary">
                Button
            </a>
        </Link>
    )
}

export default ButtonLink;
