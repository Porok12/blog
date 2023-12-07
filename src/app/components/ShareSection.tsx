'use client'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'next-share'
import React from 'react'

interface Props {
  url: string
}

const ShareSection = (props: Props) => {
  const { url } = props

  return (
    <div className="my-4 flex justify-end gap-x-2">
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <EmailShareButton url={url}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}

export default ShareSection
