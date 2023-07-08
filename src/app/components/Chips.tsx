import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {

}

const Chips = (props: Props) => {
    const {children} = props;

    return (
        <span className="relative rounded-full px-3 py-1 text-sm font-light text-white bg-indigo-400 dark:bg-indigo-700">
            {children}
        </span>
    )
}

export default Chips;
