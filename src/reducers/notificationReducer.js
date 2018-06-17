
const notificationReducer = (state = [], action) => {
  switch(action.type) {
  case 'SHOW':
    //return state.concat(action.data)
    return state
  case 'HIDE':
    return null
  default:
    return state
  }
}
export default notificationReducer
