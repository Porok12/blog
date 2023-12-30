'use client'

import { useEffect } from 'react'
import Button from '@/app/components/Button'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-8">
        <h2 className="text-center text-4xl font-light">
          Something went wrong!
        </h2>
        <div className="flex items-center justify-center">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </>
  )
}
