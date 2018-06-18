import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
//import anecdoteService from './services/anecdotes'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

/*anecdoteService.getAll().then(anes =>
  anes.forEach(ane => {
    store.dispatch({type:'NEW_ANE', data: ane })
  }))*/



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


//const render = () => {
//render()
//store.subscribe(render)

