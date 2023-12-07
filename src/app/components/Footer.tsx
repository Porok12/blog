import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import Border from '@/app/components/Border'

interface Props extends PropsWithChildren {
  rights: string
}

const Footer = (props: Props) => {
  const { rights } = props
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-[-1px]"
        viewBox="0 0 50 2"
      >
        <path
          d="M 0 0 V 2 H 50"
          className="fill-gray-200 dark:fill-slate-800"
        />
      </svg>
      <footer className="bg-gray-200 dark:bg-slate-800">
        <div className="container mx-auto flex h-48 flex-col justify-end py-8">
          <div className="my-2 flex justify-center gap-4">
            <Link href="https://www.linkedin.com/in/przemys%C5%82aw-p-478864149">
              <i className="devicon-linkedin-plain" style={{ fontSize: 32 }} />
            </Link>
            <Link href="https://github.com/Porok12">
              <i className="devicon-github-original" style={{ fontSize: 32 }} />
            </Link>
          </div>
          <Border />
          <div className="mt-4 text-center text-sm sm:text-base">{rights}</div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
