import {easeIn, easeInOut, m, useScroll, useSpring, useTransform} from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleY = useTransform(scrollYProgress, [0, 0.1], [0, 1], {ease: easeInOut})
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <m.div
      className="fixed top-0 z-10 h-1 w-full bg-indigo-600"
      style={{ scaleX, scaleY }}
    />
  )
}

export default ScrollProgress
