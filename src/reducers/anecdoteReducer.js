
const initialState = [
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
]



const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NEW_ANE':
    //return state.concat(action.data)
    return [...state, action.data]
  case 'INIT':
    return state
  default:
    return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const anecdoteCreation = (content) => {
  content.id = generateId()

  console.log('Incoming', content)
  return {
    type: 'NEW_ANE',
    data: content
    /*    data: {
      content,
      id: generateId()
    }*/
  }
}


export default anecdoteReducer

