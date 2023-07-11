import {HTMLProps} from 'react'

interface Props extends HTMLProps<HTMLDivElement> {

}

const Border = (props: Props) => {
  const { className,...others } = props
  return (
    <div {...others} className={`my-2 w-full border-t-2 border-gray-200 dark:border-gray-600 ${className}`} />
  )
}

export default Border
