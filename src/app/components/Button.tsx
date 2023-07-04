import {MoonIcon} from "@heroicons/react/24/outline";
import React from "react";

interface Props {
    active?: boolean;
}

const Button = (props: Props) => {
    const {active} = props;

    return (
        <button
            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
            <MoonIcon className="mr-2 h-5 w-5"/>
            Dark
        </button>
    )
}

export default Button;
