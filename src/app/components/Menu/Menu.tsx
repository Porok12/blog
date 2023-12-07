'use client'

import { Menu as HMenu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface MenuProps {
  label?: string
  children?: any
}

const Menu = (props: MenuProps) => {
  const { label, children } = props

  return (
    <HMenu as="div" className="relative inline-block text-left">
      <div>
        <HMenu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {/*{label}*/}
        </HMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HMenu.Items className="w-26 absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">{/*{children}*/}</div>
        </HMenu.Items>
      </Transition>
    </HMenu>
  )
}

export default Menu
