import { useRef } from 'react'
import {
  m,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion'
import './parallax.css'

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

const Parallax = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  const id = '1'

  return (
    <section>
      <div ref={ref}>
        <img src="https://uploads.codesandbox.io/uploads/user/6480904d-d79b-484b-9f16-8d5a3eff77e3/7F9g-DSCF1586.jpg" alt="A London skyscraper" />
      </div>
      <m.h2 style={{ y }}>{`#00${id}`}</m.h2>
    </section>
  )
}

export default Parallax
