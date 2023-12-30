'use client'

interface Props {
  error: Error
  reset: () => void
}

const GlobalError = ({ reset }: Props) => {
  return (
    <html>
      <body>
        <h2 className="mb-2">Something went wrong!</h2>
        <button className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  )
}

export default GlobalError
