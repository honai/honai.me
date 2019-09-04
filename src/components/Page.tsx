import Head from 'next/head'

interface Props {
  title?: string
}

const Page: React.FC<React.Props<{}> & Props> = ({
  title,
  children
}: React.Props<{}> & Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title || 'honai.me'}</title>
        <link rel="stylesheet" href="https://use.typekit.net/bdo3rru.css" />
      </Head>
      <style jsx global>
        {`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          html {
            font-family: sans-serif;
            line-height: 2;
            -webkit-text-size-adjust: 100%;
          }
          body {
            color: #333;
            margin: 0;
            text-align: left;
          }
          main {
            display: block;
          }
          img {
            vertical-align: middle;
          }

          .century-gothic {
            font-family: century-gothic, sans-serif;
            font-style: normal;
            font-weight: 400;
          }
          ul.reset {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
          a.reset {
            text-decoration: none;
            color: inherit;
          }
          #__next {
            display: flex;
            flex-flow: column nowrap;
            min-height: 100vh;
          }
        `}
      </style>
      {children}
    </>
  )
}

export default Page
