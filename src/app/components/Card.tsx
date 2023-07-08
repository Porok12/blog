'use client'

import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {

}

const Card = (props: Props) => {
    const {children} = props;
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800">
            <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                    <p className="text-gray-700 text-base dark:text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                        perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block rounded-full px-3 py-1.5 mr-2 mb-2 text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-900">
                        #photography
                    </span>
                    <span className="inline-block rounded-full px-3 py-1.5 mr-2 mb-2 text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-900">
                        #travel
                    </span>
                    <span className="inline-block rounded-full px-3 py-1.5 mr-2 mb-2 text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-slate-900">
                        #winter
                    </span>
                </div>
        </div>
    )
}

export default Card;
