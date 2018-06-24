
const notificationReducer = (state = '' , action) => {
  //console.log('ACTION: ', action)
  let msg

  switch(action.type) {
  case 'SHOW':
    msg = 'New anecdote: '+action.data.content+' created'
    //console.log('notifRedu:', state, '--act--',action)
    return msg
    //return state
  case 'NEW_ANE':
    msg = 'New anecdote: '+action.data.content+' created'
    //console.log('notifRedu222:', state, '--act--',action)
    return msg
  case 'HIDE':
    return ''
  default:
    return state
  }
}

export const addMessageAction = ( msg ) => {
  this.state.notification = msg

  return {
    type: 'SHOW',
    data: msg
  }

}

export const addMessage = ( msg ) => {

  return async (dispatch) => {
    dispatch(addMessageAction(msg))
  }
  //}
}

export const hideMessageAction = () => {
  return {
    type: 'HIDE'
  }
}


export const hideMessage = () => {
  //console.log('hideMessas')

  return async ( dispatch ) => {
    dispatch(hideMessageAction())
  }
}



export default notificationReducer
