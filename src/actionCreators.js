const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export default {

  anecdoteCreation (content)  {
    content.id = generateId()

    console.log('Incoming', content)
    return {
      type: 'NEW_ANE',
      data: content
    }
  },

  getOneAnecdote (content) {
    console.log('actCrea_goA: ', content)
    return {
      type: 'GET',
      data: content
    }
  }

}
