import React from 'react'
import Spinner from '@/app/components/Spinner'

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center">
      <Spinner />
    </div>
  )
}
