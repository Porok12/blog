import React, {CSSProperties, PropsWithChildren} from 'react'
import {m} from 'framer-motion'

interface Props extends PropsWithChildren {
  active?: boolean
  style?: CSSProperties
  axis?: 'y' | 'x'
  title: string | React.ReactNode
  className?: string,
}

const SlideContent = (props: Props) => {
  const {
    active = false,
    style = {},
    axis = 'y',
    title = 'Title',
    children = undefined,
    className,
  } = props

  return (
    <m.div
      initial="hidden"
      animate={active ? 'active' : 'hidden'}
      variants={{
        hidden: {[axis]: -100, opacity: 0},
        active: {[axis]: 0, opacity: 1},
      }}
      style={{position: 'fixed', ...style}}
      className={className}
    >
      {typeof title === 'string' ? <div className="mb-4 text-3xl">{title}</div> : title}
      {children && <div className="text-base">{children}</div>}
    </m.div>
  )
}

export default SlideContent
