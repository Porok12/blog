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

        <Stack
          initial="hidden"
          whileInView="visible"
          viewport={{once: true}}
          transition={{staggerChildren: 0.5, staggerDirection: 1}}
          childrenVariant={{'hidden': {opacity: 0, y: 20}, 'visible': {opacity: 1, y: 0}}}
        />

        <AnimationContainer />
      </LazyMotion>

      <h2 className="my-4 text-3xl">Tech Stack</h2>

      <i className="devicon-scala-plain" style={{fontSize: 80, color: '#de3423'}}/>
      <i className="devicon-java-plain" style={{fontSize: 80, color: '#e76f00'}}></i>
      <i className="devicon-cplusplus-plain" style={{fontSize: 80, color: '#0181ce'}}></i>

      <i className="devicon-kubernetes-plain" style={{fontSize: 64, color: '#326de6'}}></i>
      <i className="devicon-docker-plain" style={{fontSize: 64, color: '#239ced'}}></i>
      <i className="devicon-linux-plain" style={{fontSize: 64, color: '#282828'}}></i>

      <i className="devicon-react-plain" style={{fontSize: 64, color: '#61dafb'}}></i>
      <i className="devicon-nextjs-plain" style={{fontSize: 64, color: '#000000'}}></i>
      <i className="devicon-angularjs-plain" style={{fontSize: 64, color: '#dd1b16'}}></i>
      <i className="devicon-typescript-plain" style={{fontSize: 64, color: '#007acc'}}></i>

      <h2 className="my-4 text-3xl">Todo</h2>

      <h2 className="my-4 text-3xl">More sections</h2>
    </div>
  )
}

export default About

