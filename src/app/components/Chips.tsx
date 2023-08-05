import {PropsWithChildren} from 'react'

const className = 'rounded-full bg-indigo-400 font-semibold uppercase text-white dark:bg-indigo-700'

interface Props extends PropsWithChildren {
  size?: 'lg' | 'md' | 'sm'
}

const Chips = (props: Props) => {
  const {
    size = 'sm',
    children,
  } = props

  switch (size) {
  case 'lg':
    return (
      <div className={`${className} px-5 py-3 text-md`}>
        {children}
      </div>
    )
  case 'md':
    return (
      <div className={`${className} px-4 py-2 text-sm`}>
        {children}
      </div>
    )
  case 'sm':
    return (
      <div className={`${className} px-3 py-1 text-xs`}>
        {children}
      </div>
    )
  }
}

export default Chips
