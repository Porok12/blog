import {m, useInView, useScroll, useTransform, Variants} from 'framer-motion'
import React, {CSSProperties, useEffect, useRef, useState} from 'react'
import Stack from '@/app/components/Stack'

const variants: Record<number, Variants> = ({
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
})

const AnimationContainer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {amount: 'some', margin: '0px'})
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const [state, setState] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const ticks = 9
      const length  = 1 / ticks
      setState(Math.floor(v / length))
    })
    // return scrollYProgress.on('change', v=> setHookedYPosition(v))
  }, [scrollYProgress])

  // const [display, setDisplay] = useState(false)
  // useEffect(() => {
  //   setDisplay(isInView)
  // }, [isInView])

  return (
    <div
      ref={ref}
      className="flex,justify-center h-[3000px] w-full my-64"
    >
      <span className="fixed left-0 top-10">{state}</span>


      <m.div
        initial="hidden"
        animate={state > 1 && state < 9 ? 'active' : 'hidden'}
        variants={{
          hidden: {
            y: -100,
            opacity: 0,
          },
          active: {
            y: 0,
            opacity: 1,
          },
        }}
        style={{
          position: 'fixed',
          top: '10%',
          right: '50%',
          marginRight: '-80px',
        }}
      >
        <h2 className="my-4 text-3xl">Tech Stack</h2>
      </m.div>

      <m.div
        initial="hidden"
        animate={state === 3 ? 'active' : 'hidden'}
        variants={{
          hidden: {
            y: -100,
            opacity: 0,
          },
          active: {
            y: 0,
            opacity: 1,
          },
        }}
        // className="fixed right-0 top-0 mt-[50%]"
        style={{
          position: 'fixed',
          top: '50%',
          right: '25%',
          marginTop: '-100px',
          // marginLeft: '-250px',
        }}
      >
        <div className="text-3xl mb-4">DevOps</div>
        <div className="text-base mb-8">
          Hello world!
        </div>
        <div className="flex gap-4">
          <i className="devicon-kubernetes-plain" style={{fontSize: 64, color: '#326de6'}}></i>
          <i className="devicon-docker-plain" style={{fontSize: 64, color: '#239ced'}}></i>
          <i className="devicon-linux-plain" style={{fontSize: 64, color: '#e8e8e8'}}></i>
        </div>
      </m.div>

      <m.div
        initial="hidden"
        animate={state === 5 ? 'active' : 'hidden'}
        variants={{
          hidden: {
            y: -100,
            opacity: 0,
          },
          active: {
            y: 0,
            opacity: 1,
          },
        }}
        // className="fixed right-0 top-0 mt-[50%]"
        style={{
          position: 'fixed',
          top: '50%',
          left: '25%',
          marginTop: '-100px',
          // marginLeft: '-350px',
        }}
      >
        <div className="text-3xl mb-4">Backend</div>
        <div className="text-base mb-8">
          Hello world!
        </div>
        <div className="flex gap-4">
          <i className="devicon-scala-plain" style={{fontSize: 80, color: '#de3423'}}/>
          <i className="devicon-java-plain" style={{fontSize: 80, color: '#e76f00'}}></i>
          <i className="devicon-cplusplus-plain" style={{fontSize: 80, color: '#0181ce'}}></i>
        </div>
      </m.div>

      <m.div
        initial="hidden"
        animate={state === 7 ? 'active' : 'hidden'}
        variants={{
          hidden: {
            y: -100,
            opacity: 0,
          },
          active: {
            y: 0,
            opacity: 1,
          },
        }}
        // className="fixed right-0 top-0 mt-[50%]"
        style={{
          position: 'fixed',
          top: '50%',
          right: '25%',
          marginTop: '-100px',
          // marginLeft: '-150px',
        }}
      >
        <div className="text-3xl mb-4">Frontend</div>
        <div className="text-base mb-8">
          Hello world!
        </div>
        <div className="flex gap-4">
          <i className="devicon-react-plain" style={{fontSize: 64, color: '#61dafb'}}></i>
          <i className="devicon-nextjs-plain" style={{fontSize: 64, color: '#efefef'}}></i>
          <i className="devicon-angularjs-plain" style={{fontSize: 64, color: '#dd1b16'}}></i>
          <i className="devicon-typescript-plain" style={{fontSize: 64, color: '#007acc'}}></i>
        </div>
      </m.div>

      <Stack
        initial="0"
        animate={`${state}`}
        transition={{
          staggerChildren: state === 1 || state === 9 ? 0.25 : 0,
          staggerDirection: state === 9 ? -1 : 1,
        }}
        childrenVariants={variants}
        variants={{
          '0': {
            x: 0,
          },
          '1': {
            x: 0,
          },
          '2': {
            x: -500,
          },
          '3': {
            x: -500,
          },
          '4': {
            x: 500,
          },
          '5': {
            x: 500,
          },
          '6': {
            x: -500,
          },
          '7': {
            x: -500,
          },
          '8': {
            x: 0,
          },
          '9': {
            x: 0,
          },
        }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          marginTop: '-100px',
          marginLeft: '-250px',
          zIndex: 10,
        }}
      />
    </div>
  )
}

export default AnimationContainer
