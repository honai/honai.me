export interface CounterState {
  count: number
}

interface Action {
  type: string
}

const initialState: CounterState = {
  count: 0
}

export const INCREMENT = 'INCREMENT'

export function incement(): Action {
  return {
    type: INCREMENT
  }
}

export default function counter(state: CounterState = initialState, action: Action): CounterState {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}
