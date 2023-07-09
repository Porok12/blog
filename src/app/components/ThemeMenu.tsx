'use client'

import {Menu, Transition} from '@headlessui/react'
import React, {Fragment} from 'react'
import {ComputerDesktopIcon, MoonIcon, SunIcon} from '@heroicons/react/24/outline'

interface Props {

}

const ThemeMenu = (props: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Theme
        </Menu.Button>
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
        <Menu.Items
          className="w-26 absolute left-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({active}) => (
                <button
                  className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md p-2 text-sm`}
                >
                  <SunIcon className="mr-2 h-5 w-5"/>
                  Light
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({active}) => (
                <button
                  className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md p-2 text-sm`}
                >
                  <MoonIcon className="mr-2 h-5 w-5"/>
                  Dark
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({active}) => (
                <button
                  className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md p-2 text-sm`}
                >
                  <ComputerDesktopIcon className="mr-2 h-5 w-5"/>
                  System
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ThemeMenu
