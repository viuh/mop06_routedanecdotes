import anecdoteService from '../services/anecdotes'

/*const initialState = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 2,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 2,
    id: '2'
  }
]*/


const anecdoteReducer = (state = [], action) => {
  const inits = anecdoteService.getAll()
  console.log('aR-inits_opt2:', inits)

  console.log('aR:', state , 'data:', action.data, 'type:', action.type)
  let id = null
  let res = null

  switch(action.type) {
  case 'NEW_ANE':
    console.log('aR, adding new one:', action.data)
    //return state.concat(action.data)
    console.log('aR-Uusi tila:', [...state, action.data])
    return [...state, action.data]
  case 'GET':  // TODO: turha?
    id = action.data
    console.log('aR-id:',id,'--kokotila:',state)
    res = state[0]
    console.log('aR-res', res)
    return res
    //return state.map(an => an.id !== id ? an : res)
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
  }
}

export default anecdoteReducer

