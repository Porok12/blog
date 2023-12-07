'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import IconButton from '@/app/components/IconButton'

const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const lightTheme = resolvedTheme === 'light'

  const toggleTheme = () => {
    lightTheme ? setTheme('dark') : setTheme('light')
  }

  return (
    <IconButton Icon={lightTheme ? SunIcon : MoonIcon} onClick={toggleTheme} />
  )
}

export default ToggleTheme
