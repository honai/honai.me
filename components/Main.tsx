const Main = ({ children }: React.Props<{}>): JSX.Element => {
  return (
    <main>
      {children}
      <style jsx>{`
        main {
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          padding: 10px;
          flex: 1 0 auto;
        }
      `}</style>
    </main>
  )
}

export default Main
