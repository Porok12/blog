'use client'

import React from 'react'
import {NextPage} from 'next'
import Image from 'next/image'
import {LazyMotion, m} from 'framer-motion'
import AnimatedText from '@/app/components/AnimatedText'
import AnimationContainer, {variants} from '@/app/components/AnimationContainer'
import ScrollProgress from '@/app/components/ScrollProgress'
import SlideContent from '@/app/components/SlideContent'
import Stack from '@/app/components/Stack'
import Terminal from '@/app/components/Terminal'

const loadFeatures = () => import('@/app/utils/features')
  .then(res => res.default)

const About: NextPage = () => {
  return (
    <div className="flex flex-col items-center gap-y-8">

      <h2 className="my-4 text-3xl">Whoami</h2>

      <Terminal>
        <LazyMotion features={loadFeatures}>
          <div className="h-[100px] w-[80vw] max-w-[500px] ">
            <span className="text-gray-400">$ </span>
            <AnimatedText text="Hello world!"/>
          </div>
        </LazyMotion>
      </Terminal>

      Przemysław Papla

      <Image
        width={400}
        height={400}
        src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
        alt=""/>


      <LazyMotion features={loadFeatures}>
        <ScrollProgress/>

        <AnimationContainer>
          {(state) => (
            <>
              <SlideContent
                title={<h2 className="my-4 text-3xl">Tech Stack</h2>}
                active={state > 1 && state < 9}
                style={{top: '10%', right: '50%', marginRight: '-80px'}}
              />

              <SlideContent title="DevOps" active={state === 3} style={{top: '50%', right: '25%', marginTop: '-100px'}}>
                Hello world!
                <div className="mt-4 flex gap-4">
                  <i className="devicon-kubernetes-plain" style={{fontSize: 64, color: '#326de6'}}></i>
                  <i className="devicon-docker-plain" style={{fontSize: 64, color: '#239ced'}}></i>
                  <i className="devicon-linux-plain" style={{fontSize: 64, color: '#e8e8e8'}}></i>
                </div>
              </SlideContent>

              <SlideContent title="Backend" active={state === 5} style={{top: '50%', left: '25%', marginTop: '-100px'}}>
                Hello world!
                <div className="flex gap-4 mt-4">
                  <i className="devicon-scala-plain" style={{fontSize: 80, color: '#de3423'}}/>
                  <i className="devicon-java-plain" style={{fontSize: 80, color: '#e76f00'}}></i>
                  <i className="devicon-cplusplus-plain" style={{fontSize: 80, color: '#0181ce'}}></i>
                </div>
              </SlideContent>

              <SlideContent title="Frontend" active={state === 7}
                            style={{top: '50%', right: '25%', marginTop: '-100px'}}>
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
                  '0': {x: 0},
                  '1': {x: 0},
                  '2': {x: -500},
                  '3': {x: -500},
                  '4': {x: 500},
                  '5': {x: 500},
                  '6': {x: -500},
                  '7': {x: -500},
                  '8': {x: 0},
                  '9': {x: 0},
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
            </>
          )}
        </AnimationContainer>
      </LazyMotion>
    </div>
  )
}

export default About

