import React from 'react'
import { Switch } from '@headlessui/react'

interface Props {
  checked?: boolean
  onChange?: () => void
}

const Toggle = (props: Props) => {
  const { checked, onChange } = props

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={
        'relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 dark:bg-gray-200'
      }
    >
      <span
        className={
          'inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition dark:translate-x-1'
        }
      />
    </Switch>
  )
}

export default Toggle
