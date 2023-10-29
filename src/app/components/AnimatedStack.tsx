import {m, Variants, stagger} from 'framer-motion'
import React, {PropsWithChildren} from 'react'
// import AnimatedText from '@/app/components/AnimatedText'

const parentVariant: Variants = {
  initial: {opacity: 0},
  animate: {opacity: 1, transition: {staggerChildren: 0.05}},
}

const childrenVariant: Variants = {
  initial: {opacity: 0},
  animate: {opacity: 1},
}

const AnimatedText = (props: any) => {
  const {text} = props

  return (
    <div className="font-mono">
      {text.split('').map((letter, index) => (
        <m.span
          key={index}
          variants={childrenVariant}
          transition={{duration: 0}}
          className={letter === '$' ? 'text-gray-400' : ''}
        >
          {letter}
        </m.span>
      ))}
    </div>
  )
}

interface Props extends PropsWithChildren {

}

const AnimatedStack = (props: Props) => {
  const {
    children,
  } = props
  return (
    <m.div
      className="flex flex-col"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      <AnimatedText index={1} text={'$ Hello, I\'m Przemysław Papla \uD83D\uDC4B'}/> {/*👋*/}
      <AnimatedText index={2} text={'$ Programming is my passion, I don\'t limit myself to one language.'}/>
      <AnimatedText index={3} text={'$ Full-stack is my element!'}/>
      {/*{children}*/}
    </m.div>
  )
}

export default AnimatedStack
