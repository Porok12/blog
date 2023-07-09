import {PropsWithChildren} from 'react'
import {XMarkIcon} from '@heroicons/react/24/solid'

type Props = PropsWithChildren

const Alert = (props: Props) => {
  const { children } = props

  return (
    <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
      <strong className="font-bold">Holy smokes!</strong>
      <span className="block sm:inline">Something seriously bad happened.</span>
      <span className="absolute inset-y-0 right-0 px-4 py-3">
        <XMarkIcon className="h-6 w-6 text-red-500" role="button" />
      </span>
    </div>
  )
}

export default Alert
