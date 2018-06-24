
const notificationReducer = (state = [], action) => {
  switch(action.type) {
  case 'SHOW':

    console.log('notifRedu:', state, '--act--',action)
    return state.concat(action.data)
    //return state
  case 'HIDE':
    return null
  default:
    return state
  }
}

export const addMessageAction = ( msg ) => {
  console.log('RRRR', msg)
  return {
    type: 'SHOW',
    data: msg
  }
}

export const addMessage = ( msg ) => {
  return async (dispatch) => {
    dispatch( addMessageAction(msg) )
  }
}


export default notificationReducer
