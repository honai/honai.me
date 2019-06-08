import { NextFC } from 'next'
import { useSelector, useDispatch } from 'react-redux'

const Index: NextFC = (): JSX.Element => {
  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Hello TS</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>ADD</button>
    </div>
  )
}

export default Index
