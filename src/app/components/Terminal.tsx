import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title?: string
}

const Terminal = (props: Props) => {
  const { title = 'bash', children } = props

  return (
    <div className="rounded-md bg-white p-2 shadow-lg dark:bg-gray-800 dark:shadow-none md:p-4">
      <div className="flex">
        <div className="flex gap-2">
          <span className="h-4 w-4 rounded-full bg-red-500" />
          <span className="h-4 w-4 rounded-full bg-yellow-500" />
          <span className="h-4 w-4 rounded-full bg-green-500" />
        </div>
        <div className="flex grow items-center justify-center">
          <span className="font-mono font-semibold tracking-wide">{title}</span>
        </div>
      </div>
      <div className="p-2 md:p-6">{children}</div>
    </div>
  )
}

export default Terminal
