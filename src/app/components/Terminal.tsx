import {PropsWithChildren} from 'react'

interface Props extends PropsWithChildren {

}

const Terminal = (props: Props) => {
  const {children} = props;

  return (
    <div className="rounded-md bg-white shadow-lg dark:shadow-none dark:bg-gray-800 p-4 max-w-[500px]">
      <div className="flex">
        <div className="flex gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full"/>
          <span className="w-4 h-4 bg-yellow-500 rounded-full"/>
          <span className="w-4 h-4 bg-green-500 rounded-full"/>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <span className="font-semibold font-mono tracking-wide">
            bash
          </span>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default Terminal
