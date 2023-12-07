import { m } from 'framer-motion'

interface Props {
  text: string
}

const AnimatedText = (props: Props) => {
  const { text } = props

  return (
    <div className="font-mono">
      {text.split('').map((letter, index) => (
        <m.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0, delay: index * 0.1 }}
        >
          {letter}
        </m.span>
      ))}
    </div>
  )
}

export default m(AnimatedText)
