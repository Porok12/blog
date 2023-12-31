import React, { PropsWithChildren } from 'react'
import classNames from '@/app/utils/classNames'

interface Props extends PropsWithChildren {
  active?: boolean
  variant?: 'outlined' | 'solid'
  fullwidth?: boolean
  StartIcon?: any
  EndIcon?: any
  onClick?: () => void
}

const Button = (props: Props) => {
  const { children, fullwidth, StartIcon, EndIcon, onClick } = props

  // group flex w-full items-center

  return (
    <button
      className={classNames('btn btn-primary', fullwidth ? 'w-full' : '')}
      onClick={onClick}
    >
      {StartIcon && <StartIcon className="mr-2 h-5 w-5" />}
      {children}
      {EndIcon && <EndIcon className="ml-2 h-5 w-5" />}
    </button>
  )
}

export default Button
