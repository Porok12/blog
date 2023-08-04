import {CSSProperties, useEffect, useRef, useState} from 'react'
import {
  m,
  MotionValue,
  useElementScroll, useInView, useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useViewportScroll,
} from 'framer-motion'

const styles = (scroll: number): CSSProperties => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  marginTop: '-50px',
  marginLeft: '-50px',
  zIndex: 10,

  rotate: `${scroll*360}deg`,

  // animation: 'rotate 1s linear infinite',
  // animationPlayState: 'paused',
  // animationDelay: `calc(${scroll} * -1s)`,

  // animationIterationCount: '1',
  // animationFillMode: 'both',
})

const FixedScroll = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {amount: 'some', margin: '0px'})
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    // container: ref,
  })
  const distance = 360
  const y = useTransform(scrollYProgress, [0, 1], [0, 1000])
  const v = useTransform(scrollYProgress, [0, 1], [0, distance])
  // useMotionValueEvent(???, 'change', () => ???)

  // const [scroll, setHookedYPosition] = useState(0)
  // useEffect(()=> {
  //   return scrollYProgress.on('change', v=> setHookedYPosition(v))
  // },[scrollYProgress])

  const [display, setDisplay] = useState(false)
  useEffect(() => { setDisplay(isInView) }, [isInView])

  console.log(display)

  return (
    <div ref={ref} className="h-[2000px] w-full flex,justify-center">
      {/*className="h-[1000px] w-full" style={{ overflow: 'scroll' }}*/}
      <div style={{display: display ? 'block' : 'none'}}>
        <m.svg width="100" height="100" viewBox="0 0 24 24" style={{
          ...styles(0),
          rotate: v,
        }}>
          <path
            fill="#fff"
            d="M21,9H15V22H13V16H11V22H9V9H3V7H21M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6C10.89,6 10,5.1 10,4C10,2.89 10.89,2 12,2Z"/>
        </m.svg>
      </div>
    </div>
  )
}

export default FixedScroll
