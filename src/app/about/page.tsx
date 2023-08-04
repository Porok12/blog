'use client'

import AnimatedText from '@/app/components/AnimatedText'
import FixedScroll from '@/app/components/FixedScroll'
import Parallax from '@/app/components/Parallax'
import ScrollProgress from '@/app/components/ScrollProgress'
import ScrollTest from '@/app/components/ScrollTest'
import Terminal from '@/app/components/Terminal'
import {LazyMotion, m} from 'framer-motion'
import {NextPage} from 'next'
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
            <m.div className="w-2 h-4 bg-white" animate={{opacity: 0}} transition={{duration: 0.01, repeatDelay: 0.5, repeat: Infinity, repeatType: 'reverse'}}></m.div>
          </m.div>
        </LazyMotion>
      </Terminal>

      Przemysław Papla


      <LazyMotion features={loadFeatures}>
        <ScrollProgress />

        <m.div
          className="flex flex-col-reverse justify-end w-[500px] h-[340px] h-[420px] m-2"
          initial="hidden"
          // animate="visible"
          whileInView="visible"
          viewport={{once: true}}
          transition={{staggerChildren: 0.5, staggerDirection: 1}}>
          {[1, 2, 3, 4].map(key => (
            <div key={key} className="h-[70px]">
              <m.svg style={{marginTop: 0, zIndex: key, position: 'relative'}} xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 32 13" whileHover={{scale: 1.1}} transition={{duration: 0.5}}
                     variants={{hidden: {opacity: 0, y: 20}, visible: {opacity: 1, y: 0}}}>
                <g>
                  <path className="fill-violet-100 dark:fill-violet-900"
                        d="M16 0c-.676 0-1.353.094-1.871.282L.778 5.125c-1.037.376-1.037.98 0 1.357l13.35 4.842c1.037.376 2.706.376 3.743 0l13.352-4.842c1.036-.376 1.036-.981 0-1.357L17.87.282C17.353.094 16.676 0 16 0z"/>
                  <path className="fill-violet-200 dark:fill-violet-950"
                        d="M.003 5.629v.028c.001-.01.001-.019.003-.028zm31.99 0 .002.013v-.013zM.004 5.74v1.291h.002c-.046.266.209.536.77.74l13.354 4.846c1.036.376 2.705.376 3.742 0l13.354-4.846c.56-.204.816-.474.77-.74V5.757c-.037.226-.292.448-.77.621L17.87 11.224c-1.037.377-2.706.377-3.742 0L.775 6.378c-.489-.177-.744-.405-.772-.637z"/>
                </g>
              </m.svg>
            </div>
          ))}
        </m.div>

        <ScrollTest />

        <FixedScroll />

        {/*<div className="my-64">*/}
        {/*  <Parallax />*/}
        {/*</div>*/}

        <m.div layoutScroll style={{ overflow: 'scroll' }}>
          <m.div layout>
            Test
          </m.div>
        </m.div>
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

