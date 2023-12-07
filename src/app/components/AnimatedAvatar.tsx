import React from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import myFace from '@/app/about/1659428254247.jpeg'

const AnimatedAvatar = () => {
  return (
    <m.div
      initial={{ opacity: 0, rotate: '-15deg' }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 2 }}
    >
      <Image
        width={400}
        height={400}
        src={myFace}
        className="scale-75 rounded-full md:scale-100"
        alt=""
      />
    </m.div>
  )
}

export default AnimatedAvatar
