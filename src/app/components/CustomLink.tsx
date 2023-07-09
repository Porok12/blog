import Link, {LinkProps} from 'next/link'
import {PropsWithChildren} from 'react'

interface Props<T> extends LinkProps<T>, PropsWithChildren {
    as: any;
}

const CustomLink = (props: Props<any>) => {
  const { href, children, as: Component } = props

  return (
    <Link href={href} passHref className="clickable">
      <Component>
        {children}
      </Component>
    </Link>
  )
}

export default CustomLink
