import { NextFC } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { RootState } from 'Redux'
import Page from '../components/page'

const Index: NextFC = (): JSX.Element => {
  return (
    <Page>
      <h1>Hello TS</h1>
      <p>Count:</p>
      <button>ADD</button>
      <br />
      <Link href="/blog">
        <a>BLOG</a>
      </Link>
    </Page>
  )
}

export default Index
