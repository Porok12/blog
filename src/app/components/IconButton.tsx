import React, {PropsWithChildren} from 'react'

interface Props extends PropsWithChildren {
    Icon: any;
    onClick?: () => void;
}

const IconButton = (props: Props) => {
  const {Icon, onClick} = props

  return (
    <button
      onClick={onClick}
      className="middle none center rounded-full p-2 hover:bg-gray-200 dark:hover:bg-slate-600"
    >
      <Icon className="h-6 w-6 text-base"/>
    </button>
  )
}

export default IconButton
