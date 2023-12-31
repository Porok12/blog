import { m, useInView, useScroll, useTransform, Variants } from 'framer-motion'
import { CSSProperties, useEffect, useRef, useState } from 'react'

const styles = (scroll: number): CSSProperties => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  marginTop: '-50px',
  marginLeft: '-50px',
  zIndex: 10,

  rotate: `${scroll * 360}deg`,

  // animation: 'rotate 1s linear infinite',
  // animationPlayState: 'paused',
  // animationDelay: `calc(${scroll} * -1s)`,

  // animationIterationCount: '1',
  // animationFillMode: 'both',
})

const variants: Variants = {
  '0': {
    scale: 1,
  },
  '1': {
    scale: 1.5,
    x: 200,
  },
  '2': {
    scale: 2,
  },
  '3': {
    scale: 2.5,
    x: -200,
  },
}

const FixedScroll = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 'some', margin: '0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    // container: ref,
  })
  const distance = 360
  const v = useTransform(scrollYProgress, [0, 1], [0, distance])
  // useMotionValueEvent(???, 'change', () => ???)

  const [state, setState] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v <= 0.25) {
        setState(0)
      } else if (v < 0.5) {
        setState(1)
      } else if (v < 0.75) {
        setState(2)
      } else {
        setState(3)
      }
    })
    // return scrollYProgress.on('change', v=> setHookedYPosition(v))
  }, [scrollYProgress])

  const [display, setDisplay] = useState(false)
  useEffect(() => {
    setDisplay(isInView)
  }, [isInView])

  // console.log(display)

  return (
    <div ref={ref} className="flex,justify-center h-[2000px] w-full">
      {/*className="h-[1000px] w-full" style={{ overflow: 'scroll' }}*/}
      <div style={{ display: display ? 'block' : 'none' }}>
        <m.svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          style={{
            ...styles(0),
            rotate: v,
          }}
          initial="0"
          animate={`${state}`}
          variants={variants}
        >
          <m.path
            fill="#fff"
            d="M21,9H15V22H13V16H11V22H9V9H3V7H21M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6C10.89,6 10,5.1 10,4C10,2.89 10.89,2 12,2Z"
          />
        </m.svg>
      </div>
    </div>
  )
}

export default FixedScroll
