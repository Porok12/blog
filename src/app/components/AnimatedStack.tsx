// 'use client'

import { m, Variants, stagger } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
// import AnimatedText from '@/app/components/AnimatedText'

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

const AnimatedText = (props: any) => {
  const { text } = props

  return (
    <div className="font-mono">
      {text.split('').map((letter, index) => (
        <m.span
          key={index}
          variants={childrenVariant}
          transition={{ duration: 0 }}
          className={letter === '$' ? 'text-gray-400' : ''}
        >
          {letter}
        </m.span>
      ))}
    </div>
  )
}

interface Props {
  line1: string
  line2: string
  line3: string
}

const AnimatedStack = (props: Props) => {
  const { line1, line2, line3 } = props
  return (
    <m.div
      className="flex flex-col"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      <AnimatedText index={1} text={'$ ' + line1} /> {/*👋*/}
      <AnimatedText index={2} text={'$ ' + line2} />
      <AnimatedText index={3} text={'$ ' + line3} />
      {/*{children}*/}
    </m.div>
  )
}

export default AnimatedStack
