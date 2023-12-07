'use client'

import React from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

function textContent(elem: React.ReactElement | string): string {
  if (!elem) {
    return ''
  }
  if (typeof elem === 'string') {
    return elem
  }
  const children = elem.props && elem.props.children
  if (children instanceof Array) {
    return children.map(textContent).join('')
  }
  return textContent(children)
}

const CopyButton = (props: any) => {
  const { className, content, ...others } = props
  return (
    <button
      {...others}
      onClick={() => navigator.clipboard.writeText(textContent(content))}
      className={`${className} right-2 top-2 rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
    >
      <ClipboardDocumentListIcon className="h-6 w-6" />
    </button>
  )
}

export default CopyButton
