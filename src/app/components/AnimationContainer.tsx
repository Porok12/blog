import React, {useEffect, useRef, useState} from 'react'
import {m, useInView, useScroll, Variants} from 'framer-motion'
import Stack from '@/app/components/Stack'

const ANIMATION_STEPS = 9

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

const SlideContent = (props: any) => {
  const {
    active = false,
    style = {},
    axis = 'y',
    title = 'Title',
    children = undefined,
  } = props

  return (
    <m.div
      initial="hidden"
      animate={active ? 'active' : 'hidden'}
      variants={{
        hidden: { [axis]: -100, opacity: 0 },
        active: { [axis]: 0, opacity: 1 },
      }}
      style={{ position: 'fixed', ...style }}
    >
      {typeof title === 'string' ? <div className="mb-4 text-3xl">{title}</div> : title}
      {children && <div className="text-base">{children}</div>}
    </m.div>
  )
}

const AnimationContainer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {amount: 'some', margin: '0px'})
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const [state, setState] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const stepLength  = 1 / ANIMATION_STEPS
      setState(Math.floor(v / stepLength))
    })
  }, [scrollYProgress])

  // const [display, setDisplay] = useState(false)
  // useEffect(() => {
  //   setDisplay(isInView)
  // }, [isInView])

  return (
    <div
      ref={ref}
      className="flex,justify-center my-64 h-[3000px] w-full"
    >
      <span className="fixed left-0 top-10">{state}</span>


      <SlideContent
        title={<h2 className="my-4 text-3xl">Tech Stack</h2>}
        active={state > 1 && state < 9}
        style={{ top: '10%', right: '50%', marginRight: '-80px' }}
      />

      <SlideContent title="DevOps" active={state === 3} style={{ top: '50%', right: '25%', marginTop: '-100px' }}>
        Hello world!
        <div className="flex gap-4 mt-4">
          <i className="devicon-kubernetes-plain" style={{fontSize: 64, color: '#326de6'}}></i>
          <i className="devicon-docker-plain" style={{fontSize: 64, color: '#239ced'}}></i>
          <i className="devicon-linux-plain" style={{fontSize: 64, color: '#e8e8e8'}}></i>
        </div>
      </SlideContent>

      <SlideContent title="Backend" active={state === 5} style={{ top: '50%', left: '25%', marginTop: '-100px' }}>
        Hello world!
        <div className="flex gap-4 mt-4">
          <i className="devicon-scala-plain" style={{fontSize: 80, color: '#de3423'}}/>
          <i className="devicon-java-plain" style={{fontSize: 80, color: '#e76f00'}}></i>
          <i className="devicon-cplusplus-plain" style={{fontSize: 80, color: '#0181ce'}}></i>
        </div>
      </SlideContent>

      <SlideContent title="Frontend" active={state === 7} style={{ top: '50%', right: '25%', marginTop: '-100px' }}>
        Hello world!
        <div className="flex gap-4 mt-4">
          <i className="devicon-react-plain" style={{fontSize: 64, color: '#61dafb'}}></i>
          <i className="devicon-nextjs-plain" style={{fontSize: 64, color: '#efefef'}}></i>
          <i className="devicon-angularjs-plain" style={{fontSize: 64, color: '#dd1b16'}}></i>
          <i className="devicon-typescript-plain" style={{fontSize: 64, color: '#007acc'}}></i>
        </div>
      </SlideContent>

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
