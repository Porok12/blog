'use client'

import React from 'react'
import {useTheme} from 'next-themes'
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline'
import IconButton from '@/app/components/IconButton'

const ToggleTheme = () => {
  const {resolvedTheme, setTheme} = useTheme()
  const lightTheme = resolvedTheme === 'light'

  const toggleTheme = () => {
    lightTheme ? setTheme('dark') : setTheme('light')
  }

  return (
    <IconButton Icon={lightTheme ? SunIcon : MoonIcon} onClick={toggleTheme} />
  )

  return (
    <button
      onClick={toggleTheme}
      className="middle none center hover:bg-gray-2'00 rounded-full  p-2 dark:hover:bg-slate-600"
    >
      {lightTheme ? <SunIcon className="h-6 w-6 text-black" /> : <MoonIcon className="h-6 w-6 text-white" />}
    </button>
  )
}

export default ToggleTheme
