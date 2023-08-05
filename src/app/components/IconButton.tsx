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
      className="icon-btn"
    >
      <Icon className="h-6 w-6 text-base"/>
    </button>
  )
}

export default IconButton
