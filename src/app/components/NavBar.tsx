'use client'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Route } from 'next'
import Link from 'next/link'
import React from 'react'
import ToggleTheme from '@/app/components/ToggleTheme'

export interface LinkType {
  href: Route
  title: string
}

const PP = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
  >
    <path
      className="fill-gray-400 dark:fill-slate-200"
      d="M14.298 0c-1.148 0-2.376.051-3.687.153a29.718 29.718 0 0 0-3.933.495L0 26.68h5.161l2.417-9.337H9.79c.105 0 .204-.005.309-.006l1.038-4.052c-.15.003-.294.017-.444.017h-2.09l2.336-9.11a25.89 25.89 0 0 1 2.866-.153c1.718 0 3.07.266 4.071.79 1.018-.065 2-.107 2.913-.107 1.386 0 2.633.108 3.753.313-.41-1.287-1.21-2.346-2.418-3.167C20.32.623 17.712 0 14.298 0Zm7.131 5.32c-1.147 0-2.378.05-3.689.152a29.713 29.713 0 0 0-3.933.495L7.13 32h5.163l2.417-9.339h2.212c2.213 0 4.234-.177 6.064-.532 1.857-.381 3.442-.98 4.753-1.793 1.338-.813 2.375-1.854 3.113-3.124.765-1.296 1.148-2.859 1.148-4.689 0-2.312-.917-4.09-2.747-5.335-1.802-1.245-4.41-1.869-7.824-1.869Zm-.492 4.04c1.776 0 3.169.278 4.18.837 1.037.56 1.556 1.487 1.556 2.782 0 1.119-.247 2.048-.739 2.785-.491.711-1.147 1.282-1.966 1.714-.82.406-1.761.698-2.827.876a20.123 20.123 0 0 1-3.319.268h-2.088l2.335-9.11c.464-.05.93-.09 1.394-.115a26.46 26.46 0 0 1 1.474-.037zm.732.765a25.887 25.887 0 0 0-2.763.143c-.034.058-.064.12-.101.177-.022.03-.048.057-.07.087l-1.523 5.946c1.284-.366 2.416-.853 3.395-1.46 1.338-.814 2.377-1.855 3.115-3.125a7.59 7.59 0 0 0 .642-1.473c-.774-.189-1.661-.295-2.695-.295z"
    />
  </svg>
)

const HamburgerButton = (props: { open?: boolean }) => {
  const { open } = props
  return (
    <Disclosure.Button className="rounded-md p-2 transition ease-in-out hover:bg-gray-200 dark:hover:bg-slate-600">
      {open ? (
        <XMarkIcon className="block h-6 w-6" />
      ) : (
        <Bars3Icon className="block h-6 w-6" />
      )}
    </Disclosure.Button>
  )
}

interface Props {
  links: LinkType[]
}

const NavBar = (props: Props) => {
  const { links } = props

  return (
    <header className="static z-50">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="bg-gray-100 px-2 dark:bg-slate-700 sm:px-6 lg:px-8">
              <div className="container relative mx-auto flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <HamburgerButton open={open} />
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-0 items-center">
                    <PP />
                  </div>
                  <div className="hidden grow sm:ml-6 sm:block">
                    <div className="flex justify-center space-x-4">
                      {links.map(({ href, title }) => (
                        <Link
                          key={href}
                          href={href}
                          className="btn btn-primary btn-outlined"
                        >
                          {title}
                        </Link>
                      ))}
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
                {links.map(({ href, title }) => (
                  <Disclosure.Button
                    as={Link}
                    key={href}
                    href={href}
                    className="btn btn-primary btn-outlined"
                  >
                    {title}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}

export default NavBar
