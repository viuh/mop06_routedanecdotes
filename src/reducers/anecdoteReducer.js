import anecdoteService from '../services/anecdotes'
import { addMessage } from './notificationReducer'

const anecdoteReducer = (state = [], action) => {
  const inits = anecdoteService.getAll()

  let id = null
  let res = null

  switch(action.type) {
  case 'NEW_ANE':
    return [...state, action.data]
  case 'GET':  // TODO: turha?
    id = action.data
    res = state[0]
    return res
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'NEW_ANE',
    data
  }
}


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anes
    })
  }
}


export const createNew = (content) => {
  return async (dispatch) => {
    const newAne = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANE',
      data: newAne
    })
    addMessage( 'luotu' )

    //notificationReducer.dispatch('SHOW')
  }
}

export default anecdoteReducer

