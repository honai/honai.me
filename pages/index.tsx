import { NextFC } from 'next'
import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'

const Index: NextFC = (): JSX.Element => {
  return (
    <Page>
      <Header />
      <Main>
        <h1>Hello TypeScript!</h1>
      </Main>
    </Page>
  )
}

export default Index
