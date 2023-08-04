'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import ToggleTheme from '@/app/components/ToggleTheme'
import ThemeMenu from '@/app/components/ThemeMenu'
import Button from '@/app/components/Button'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

const ProfileDropdown = () => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                Settings
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const MobileButton = (props: any) => {
  const { open } = props;
  return (
    <Disclosure.Button
      className="inline-flex items-center justify-center rounded-md p-2 text-base hover:bg-gray-200 dark:hover:bg-slate-600">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon className="block h-6 w-6" />
      ) : (
        <Bars3Icon className="block h-6 w-6" />
      )}
    </Disclosure.Button>
  )
}

const NavBar = () => {
  return (
    <header>
      <Disclosure as="nav">
        {({open}) => (
          <>
            <div className="bg-gray-100 px-2 dark:bg-slate-700 sm:px-6 lg:px-8">
              <div className="container relative mx-auto flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <MobileButton open={open}/>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/pp.svg"
                      alt="PP"
                    />
                  </div>
                  <div className="hidden grow sm:ml-6 sm:block">
                    <div className="flex justify-center space-x-4">
                      <Link
                        href={process.env.GITHUB === 'true' ? 'https://porok12.github.io/blog/' : '/'}
                        className="btn btn-primary btn-outlined" replace>
                        Posts
                      </Link>
                      <Link
                        href="/tags"
                        className="btn btn-primary btn-outlined">
                        Tags
                      </Link>
                      <Link
                        href="/about"
                        className="btn btn-primary btn-outlined">
                        About
                      </Link>
                    </div>
                  </div>
                </div>


                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <ToggleTheme />
                </div>


              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 border-t bg-gray-100 px-2 pb-3 pt-2 dark:bg-slate-700">
                <Disclosure.Button
                  as={Link}
                  href={process.env.GITHUB === 'true' ? 'https://porok12.github.io/blog/' : '/'}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-400 hover:text-white dark:hover:bg-slate-600">
                  Posts
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/tags"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-400 hover:text-white dark:hover:bg-slate-600">
                  Tags
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/about"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-400 hover:text-white dark:hover:bg-slate-600">
                  About
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}

export default NavBar
