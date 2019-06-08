import { NextFC } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { RootState } from 'Redux'

const Index: NextFC = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Hello TS</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>ADD</button>
      <br />
      <Link href="/blog">
        <a>BLOG</a>
      </Link>
    </div>
  )
}

export default Index
