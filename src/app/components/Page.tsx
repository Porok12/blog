import {PropsWithChildren} from 'react'

type Props = PropsWithChildren

const Page = (props: PropsWithChildren) => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {props.children}
      </div>
    </div>
  )
}

export default Page
