import {m, useScroll, useSpring} from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <m.div
      className="fixed w-full top-0 h-1 bg-indigo-600 z-10"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
