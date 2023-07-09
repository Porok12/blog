import {PropsWithChildren} from 'react'

type Props = PropsWithChildren

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-200 dark:bg-slate-800">
      <div className="container mx-auto h-64 py-8">
        footer
      </div>
    </footer>
  )
}

export default Footer
