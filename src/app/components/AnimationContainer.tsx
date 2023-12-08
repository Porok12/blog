import React, { useEffect, useRef, useState } from 'react'
import { useScroll, Variants } from 'framer-motion'

export const ANIMATION_STEPS = 9

export const variants: Record<number, Variants> = {
  1: {
    '0': {
      scale: 0.5,
      opacity: 0,
    },
    '1': {
      scale: 1,
      opacity: 1,
    },
    '2': {
      scale: 1,
      opacity: 1,
    },
    '3': {
      scale: 1.1,
      opacity: 1,
    },
    '4': {
      scale: 1,
      opacity: 1,
    },
    '5': {
      scale: 1,
      opacity: 1,
    },
    '6': {
      scale: 1,
      opacity: 1,
    },
    '7': {
      scale: 1,
      opacity: 1,
    },
    '8': {
      scale: 1,
      opacity: 1,
    },
    '9': {
      scale: 0.5,
      opacity: 0,
    },
  },
  2: {
    '0': {
      scale: 0.5,
      opacity: 0,
    },
    '1': {
      scale: 1,
      opacity: 1,
    },
    '2': {
      scale: 1,
      opacity: 1,
    },
    '3': {
      scale: 1,
      opacity: 1,
    },
    '4': {
      scale: 1,
      opacity: 1,
    },
    '5': {
      scale: 1.1,
      opacity: 1,
    },
    '6': {
      scale: 1,
      opacity: 1,
    },
    '7': {
      scale: 1,
      opacity: 1,
    },
    '8': {
      scale: 1,
      opacity: 1,
    },
    '9': {
      scale: 0.5,
      opacity: 0,
    },
  },
  3: {
    '0': {
      scale: 0.5,
      opacity: 0,
    },
    '1': {
      scale: 1,
      opacity: 1,
    },
    '2': {
      scale: 1,
      opacity: 1,
    },
    '3': {
      scale: 1,
      opacity: 1,
    },
    '4': {
      scale: 1,
      opacity: 1,
    },
    '5': {
      scale: 1,
      opacity: 1,
    },
    '6': {
      scale: 1,
      opacity: 1,
    },
    '7': {
      scale: 1.1,
      opacity: 1,
    },
    '8': {
      scale: 1,
      opacity: 1,
    },
    '9': {
      scale: 0.5,
      opacity: 0,
    },
  },
}

interface Props {
  children: (state: number) => React.ReactNode
}

const AnimationContainer = (props: Props) => {
  const { children } = props

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const [state, setState] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const stepLength = 1 / ANIMATION_STEPS
      setState(Math.floor(v / stepLength))
    })
  }, [scrollYProgress])

  // const [display, setDisplay] = useState(false)
  // const isInView = useInView(ref, {amount: 'some', margin: '0px'})
  // useEffect(() => {
  //   setDisplay(isInView)
  // }, [isInView])

  return (
    <div ref={ref} className="my-64 h-[3000px] w-full">
      {children(state)}
    </div>
  )
}

export default AnimationContainer
