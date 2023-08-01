import {PropsWithChildren} from 'react'

type Props = PropsWithChildren

const Chips = (props: Props) => {
  const {children} = props

  return (
    <div className="rounded-full bg-indigo-400 px-3 py-1 text-xs font-semibold uppercase text-white dark:bg-indigo-700">
      {children}
    </div>
  )
}

export default Chips
