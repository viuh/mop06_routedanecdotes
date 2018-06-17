import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteRenderer', () => {
  it('returns new state with action NEW_ANE', () => {
    const state = []
    const action = {
      type: 'NEW_ANE',
      data: {
        content: 'Try, try again',
        author: 'Tiivi-Taavi',
        info: 'someurl',
        id: 1
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

})