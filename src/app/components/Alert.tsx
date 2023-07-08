import {PropsWithChildren} from "react";
import {XMarkIcon} from '@heroicons/react/24/solid';

interface Props extends PropsWithChildren {

}

const Alert = (props: Props) => {
    const { children } = props;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Holy smokes!</strong>
            <span className="block sm:inline">Something seriously bad happened.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <XMarkIcon className="h-6 w-6 text-red-500" role="button" />
            </span>
        </div>
    )
}

export default Alert;
