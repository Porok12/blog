'use client'

import {PropsWithChildren} from 'react'

type Props = PropsWithChildren

const Card = (props: Props) => {
  const {children} = props
  return (
    <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg dark:bg-slate-800">
      <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
        <p className="text-base text-gray-700 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
          perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-slate-900 dark:text-gray-200">
          #photography
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-slate-900 dark:text-gray-200">
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-slate-900 dark:text-gray-200">
          #winter
        </span>
      </div>
    </div>
  )
}

export default Card
