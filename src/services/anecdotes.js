
import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  console.log('UUsi nw', content , '<')
  const response = await axios.post(url,  content )
  return response.data
}

const get = async (id) => {
  console.log('Ge from Service',id)
  try {
    //const allitems = await getAll()
    //const res = allitems.findById(id)
    //let res = allitems.find(a => a.id === id)
    //console.log('res:?', res)
    const res = await axios.get(`${url}/${id}`)

    console.log('Vastays ny:',res.data)
    return res.data
  } catch (exception) {
    console.log(exception)
    return 'something went wrong'
  }
}
export default {
  getAll, createNew, get
}

