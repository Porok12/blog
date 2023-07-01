'use client' // Error components must be Client Components

import {useEffect} from 'react'

interface Props {
    error: Error
    reset: () => void
}

export default function Error({error, reset}: Props) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error]);

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2>Something went wrong!</h2>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
