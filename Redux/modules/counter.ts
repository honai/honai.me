interface State {
  count: number
}

interface Action {
  type: string
}

const initialState: State = {
  count: 0
}

export const INCREMENT = 'INCREMENT'

export function incement(): Action {
  return {
    type: INCREMENT
  }
}

export default function counter(state: State = initialState, action: Action): State {
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
