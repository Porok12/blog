import React, { HTMLProps } from 'react'
import { m, Variants } from 'framer-motion'

interface Props extends HTMLProps<HTMLDivElement> {
  size?: number
  childrenVariant?: Variants
  childrenVariants?: Record<any, Variants>
}

const items = [1, 2, 3]

const Stack = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    size = 1,
    style,
    className,
    childrenVariant,
    childrenVariants,
  } = props

  return (
    <div
      ref={ref}
      className={'m-2 w-[300px] md:w-[500px] flex justify-center ' + className}
      style={{
        ...style,
        // width: 300 * size,
        height: (items.length * 80 + 100) * size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 10, position: 'relative' }}
        viewBox="-2 -1 36 25"
      >
        {items.map((key) => (
          <g key={key} transform={`translate(0 ${(3 - key) * 5})`}>
            <m.g
              transition={{ duration: 0.5 }}
              variants={childrenVariant || childrenVariants?.[key]}
            >
              <path
                className="fill-violet-100 dark:fill-violet-900"
                d="M16 0c-.676 0-1.353.094-1.871.282L.778 5.125c-1.037.376-1.037.98 0 1.357l13.35 4.842c1.037.376 2.706.376 3.743 0l13.352-4.842c1.036-.376 1.036-.981 0-1.357L17.87.282C17.353.094 16.676 0 16 0z"
              />
              <path
                className="fill-violet-200 dark:fill-violet-950"
                d="M.003 5.629v.028c.001-.01.001-.019.003-.028zm31.99 0 .002.013v-.013zM.004 5.74v1.291h.002c-.046.266.209.536.77.74l13.354 4.846c1.036.376 2.705.376 3.742 0l13.354-4.846c.56-.204.816-.474.77-.74V5.757c-.037.226-.292.448-.77.621L17.87 11.224c-1.037.377-2.706.377-3.742 0L.775 6.378c-.489-.177-.744-.405-.772-.637z"
              />
            </m.g>
          </g>
        ))}
      </svg>

      {/*{items.map(key => (*/}
      {/*  <div key={key} className="h-[70px]">*/}
      {/*    <m.svg*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*      style={{zIndex: key, position: 'relative'}}*/}
      {/*      viewBox="0 0 32 13"*/}
      {/*      //whileHover={{scale: 1.1}}*/}
      {/*      transition={{duration: 0.5}}*/}
      {/*      variants={childrenVariant || childrenVariants?.[key]}>*/}
      {/*      <g>*/}
      {/*        <path*/}
      {/*          className="fill-violet-100 dark:fill-violet-900"*/}
      {/*          d="M16 0c-.676 0-1.353.094-1.871.282L.778 5.125c-1.037.376-1.037.98 0 1.357l13.35 4.842c1.037.376 2.706.376 3.743 0l13.352-4.842c1.036-.376 1.036-.981 0-1.357L17.87.282C17.353.094 16.676 0 16 0z"/>*/}
      {/*        <path*/}
      {/*          className="fill-violet-200 dark:fill-violet-950"*/}
      {/*          d="M.003 5.629v.028c.001-.01.001-.019.003-.028zm31.99 0 .002.013v-.013zM.004 5.74v1.291h.002c-.046.266.209.536.77.74l13.354 4.846c1.036.376 2.705.376 3.742 0l13.354-4.846c.56-.204.816-.474.77-.74V5.757c-.037.226-.292.448-.77.621L17.87 11.224c-1.037.377-2.706.377-3.742 0L.775 6.378c-.489-.177-.744-.405-.772-.637z"/>*/}
      {/*      </g>*/}
      {/*    </m.svg>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  )
})

export default m(Stack, {})
