import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  size?: 'small' | 'medium' | 'large'
}

const Chips = (props: Props) => {
  const { size = 'small', children } = props

  return <div className={`chips chips-${size}`}>{children}</div>
}

export default Chips
