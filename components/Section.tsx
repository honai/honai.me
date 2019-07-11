import { primaryColor } from './theme'

interface Props {
  title?: string
}

const Section = ({ title, children }: React.Props<{}> & Props): JSX.Element => {
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
          color: ${primaryColor};
          opacity: 0.75;
          content: '#';
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
