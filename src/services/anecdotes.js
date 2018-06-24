
import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  //console.log('getAll', response.data)
  return Promise.all(response.data)
}

const createNew = async (content) => {
  //console.log('UUsi nw', content , '<')
  const response = await axios.post(url,  content )
  return response.data
}

const get = async (id) => {
  //console.log('Ge from Service',id)
  try {
    const res = await axios.get(`${url}/${id}`)

    //console.log('Vastays ny:',res.data)
    return Promise.all(res.data)
  } catch (exception) {
    console.log(exception)
    return 'something went wrong'
  }
}
export default {
  getAll, createNew, get
}

