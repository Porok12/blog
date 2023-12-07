'use client'

import React from 'react'
import { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { LazyMotion, m } from 'framer-motion'
import AnimatedAvatar from '@/app/components/AnimatedAvatar'
import AnimatedStack from '@/app/components/AnimatedStack'
// import AnimatedText from '@/app/components/AnimatedText'
import AnimationContainer, {
  variants,
} from '@/app/components/AnimationContainer'
import ScrollProgress from '@/app/components/ScrollProgress'
import SlideContent from '@/app/components/SlideContent'
import Stack from '@/app/components/Stack'
import Terminal from '@/app/components/Terminal'

const loadFeatures = () =>
  import('@/app/utils/features').then((res) => res.default)

const About: NextPage = () => {
  // const t = await getTranslations('about')
  const t = useTranslations('about')

  return (
    <div className="flex flex-col items-center gap-y-8">
      <LazyMotion features={loadFeatures}>
        <AnimatedAvatar />

        <Terminal title={t('terminal.title')}>
          <div className="min-h-[100px] w-[80vw] max-w-[500px] ">
            <AnimatedStack
              line1={t('terminal.line1')}
              line2={t('terminal.line2')}
              line3={t('terminal.line3')}
            />
          </div>
        </Terminal>

        <ScrollProgress />

        <AnimationContainer>
          {(state) => (
            <>
              <SlideContent
                title={<h2 className="text-3xl">{t('stack.title')}</h2>}
                active={state > 1 && state < 9}
                style={{ top: '4%', right: '50%', marginRight: '-80px' }}
              />

              <SlideContent
                title="DevOps"
                active={state === 3}
                // style={{top: '50%', right: '25%', marginTop: '-100px'}}
                className="right-[0%] top-[60%] mt-[0px] max-w-[400px] p-2 lg:right-[25%] lg:top-[50%] lg:mt-[-100px]"
              >
                {t('stack.devops')}
                <div className="mt-4 flex gap-4">
                  <i
                    className="devicon-kubernetes-plain"
                    style={{ fontSize: 64, color: '#326de6' }}
                  ></i>
                  <i
                    className="devicon-docker-plain"
                    style={{ fontSize: 64, color: '#239ced' }}
                  ></i>
                  <i
                    className="devicon-linux-plain"
                    style={{ fontSize: 64, color: '#e8e8e8' }}
                  ></i>
                </div>
              </SlideContent>

              <SlideContent
                title="Backend"
                active={state === 5}
                // style={{top: '50%', left: '25%', marginTop: '-100px'}}
                className="left-[10%] top-[20%] mt-[0px] max-w-[400px]  p-2 lg:left-[25%] lg:top-[50%] lg:mt-[-100px]"
                // className="top-[50]% md:top-[50]% left-[25%] mt-[-100px] md:left-[25%] md:mt-[-100px]"
              >
                {t('stack.backend')}
                <div className="mt-4 flex gap-4">
                  <i
                    className="devicon-scala-plain"
                    style={{ fontSize: 64, color: '#de3423' }}
                  />
                  <i
                    className="devicon-java-plain"
                    style={{ fontSize: 64, color: '#e76f00' }}
                  ></i>
                  <i
                    className="devicon-cplusplus-plain"
                    style={{ fontSize: 64, color: '#0181ce' }}
                  ></i>
                </div>
              </SlideContent>

              <SlideContent
                title="Frontend"
                active={state === 7}
                // style={{top: '50%', right: '25%', marginTop: '-100px'}}
                className="right-[10%] top-[60%] mt-[0px] max-w-[400px] p-2 lg:right-[25%] lg:top-[50%] lg:mt-[-100px]"
              >
                {t('stack.frontend')}
                <div className="mt-4 flex gap-4">
                  <i
                    className="devicon-react-plain"
                    style={{ fontSize: 48, color: '#61dafb' }}
                  ></i>
                  <i
                    className="devicon-nextjs-plain"
                    style={{ fontSize: 48, color: '#efefef' }}
                  ></i>
                  <i
                    className="devicon-angularjs-plain"
                    style={{ fontSize: 48, color: '#dd1b16' }}
                  ></i>
                  <i
                    className="devicon-typescript-plain"
                    style={{ fontSize: 48, color: '#007acc' }}
                  ></i>
                </div>
              </SlideContent>

              <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
                <Stack
                  className="hidden lg:block"
                  initial="0"
                  animate={`${state}`}
                  transition={{
                    staggerChildren: state === 1 || state === 9 ? 0.25 : 0,
                    staggerDirection: state === 9 ? -1 : 1,
                  }}
                  childrenVariants={variants}
                  variants={{
                    '0': { x: 0 },
                    '1': { x: 0 },
                    '2': { x: '-75%' },
                    '3': { x: '-75%' },
                    '4': { x: '75%' },
                    '5': { x: '75%' },
                    '6': { x: '-75%' },
                    '7': { x: '-75%' },
                    '8': { x: 0 },
                    '9': { x: 0 },
                  }}
                />
                <Stack
                  className="block lg:hidden"
                  initial="0"
                  animate={`${state}`}
                  transition={{
                    staggerChildren: state === 1 || state === 9 ? 0.25 : 0,
                    staggerDirection: state === 9 ? -1 : 1,
                  }}
                  childrenVariants={variants}
                  variants={{
                    '0': { y: 0 },
                    '1': { y: 0 },
                    '2': { y: '-50%' },
                    '3': { y: '-50%' },
                    '4': { y: '60%' },
                    '5': { y: '60%' },
                    '6': { y: '-50%' },
                    '7': { y: '-50%' },
                    '8': { y: 0 },
                    '9': { y: 0 },
                  }}
                />
              </div>
            </>
          )}
        </AnimationContainer>
      </LazyMotion>
    </div>
  )
}

export default About
