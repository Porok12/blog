'use client'

import React from 'react'
import {NextPage} from 'next'
import {LazyMotion, m} from 'framer-motion'
import Card from '@/app/components/Card'

const loadFeatures = () => import('@/app/utils/features')
  .then(res => res.default)

const About: NextPage = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        Przemysław Papla
        <Card>Hello</Card>
        <img src="/test.svg" alt=""/>

        <LazyMotion features={loadFeatures}>
          <m.div
            className="h-24 w-24 bg-red-600"
            whileHover={{scale: 1.2}}
            whileTap={{scale: 0.8}}
          ></m.div>
        </LazyMotion>

        <i className="devicon-scala-plain" style={{fontSize: 80, color: 'red'}}/>
        <i className="devicon-java-plain" style={{fontSize: 80, color: 'red'}}></i>
        <i className="devicon-cplusplus-plain" style={{fontSize: 80, color: 'red'}}></i>

        <i className="devicon-kubernetes-plain" style={{fontSize: 64}}></i>
        <i className="devicon-docker-plain" style={{fontSize: 64}}></i>
        <i className="devicon-linux-plain" style={{fontSize: 64}}></i>

        <i className="devicon-react-plain" style={{fontSize: 64}}></i>
        <i className="devicon-nextjs-plain" style={{fontSize: 64}}></i>
        <i className="devicon-angularjs-plain" style={{fontSize: 64}}></i>
        <i className="devicon-typescript-plain" style={{fontSize: 64}}></i>

        <i className="devicon-linkedin-plain"></i>
        <i className="devicon-github-original"></i>

      </div>
    </div>
  )
}

export default About
