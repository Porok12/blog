import React, {PropsWithChildren} from 'react'
import Link from 'next/link'
import Border from '@/app/components/Border'

type Props = PropsWithChildren

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-200 dark:bg-slate-800">
      <div className="container mx-auto flex h-64 flex-col justify-end py-8">
        <div className="my-2 flex justify-center gap-4">
          <Link href="https://www.linkedin.com/in/przemys%C5%82aw-p-478864149">
            <i className="devicon-linkedin-plain" style={{ fontSize: 32 }} />
          </Link>
          <Link href="https://github.com/Porok12">
            <i className="devicon-github-original" style={{ fontSize: 32 }} />
          </Link>
        </div>
        <Border />
        <div className="mt-4 text-center">
          ©2023 Przemysław Papla | All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer
