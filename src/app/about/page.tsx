'use client'

import AnimatedText from '@/app/components/AnimatedText'
import AnimationContainer from '@/app/components/AnimationContainer'
import FixedScroll from '@/app/components/FixedScroll'
import ScrollProgress from '@/app/components/ScrollProgress'
import Stack from '@/app/components/Stack'
import Terminal from '@/app/components/Terminal'
import {LazyMotion, m} from 'framer-motion'
import {NextPage} from 'next'
import Image from 'next/image'
import React from 'react'
import './termynal.css'

const loadFeatures = () => import('@/app/utils/features')
  .then(res => res.default)

const About: NextPage = () => {
  return (
    <div className="flex flex-col items-center gap-y-8">

      <h2 className="my-4 text-3xl">Whoami</h2>

      <Terminal>
        <LazyMotion features={loadFeatures}>
          <m.div
            className="w-[600px] h-[100px]"
            initial="disabled"
            animate="active"
            transition={{
              staggerChildren: 0.1,
              when: 'beforeChildren',
            }}>
            <span className="text-gray-400">$ </span>
            <AnimatedText text="Hello world!"/>
            <m.div
              className="w-2 h-4 bg-white" animate={{opacity: 0}}
              transition={{duration: 0.01, repeatDelay: 0.5, repeat: Infinity, repeatType: 'reverse'}} />
          </m.div>
        </LazyMotion>
      </Terminal>

      Przemysław Papla

      <Image
        width={400}
        height={400}
        src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
        alt="" />


      <LazyMotion features={loadFeatures}>
        <ScrollProgress/>

        <AnimationContainer />
      </LazyMotion>
    </div>
  )
}

export default About

