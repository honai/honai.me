import { primaryColor } from './theme'
import { JsxChildren } from '../types'

interface Props {
  title?: string
}

const Section = ({ title, children }: Props & JsxChildren): JSX.Element => {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {children}
      <style jsx>{`
        h2 {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
        }
        h2::before {
          content: '';
          display: block;
          height: 1.5rem;
          border-radius: 2px;
          width: 4px;
          background-color: ${primaryColor};
          margin-right: 10px;
        }
        h2::after {
          background-color: rgba(0, 0, 0, 0.3);
          content: '';
          display: block;
          flex: 1 1 auto;
          height: 1px;
          margin-left: 10px;
        }
      `}</style>
    </section>
  )
}

export default Section
