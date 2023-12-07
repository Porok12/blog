'use client'

import { Menu as HMenu } from '@headlessui/react'
import React from 'react'

interface MenuItemProps {
  children?: any
}

const MenuItem = (props: MenuItemProps) => {
  const { children } = props

  return (
    <HMenu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-violet-500 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md p-2 text-sm`}
        >
          {children}
        </button>
      )}
    </HMenu.Item>
  )
}

export default MenuItem
