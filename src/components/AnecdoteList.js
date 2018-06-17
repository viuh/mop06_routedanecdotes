import React from 'react'
import PropTypes from 'prop-types'
//import actionFor from '../actionCreators'
//import Anecdote from './Anecdote'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class AnecdoteList extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {

    return (
      <div>
        <h2>Anecdotes</h2>
        <ListGroup>
          {this.context.store.getState().anecdotes.map(anecdote =>
            <ListGroupItem key={anecdote.id}
              href={`/anecdotes/${anecdote.id}`}>{anecdote.content}
            </ListGroupItem>
          )}
        </ListGroup>
      </div>
    )
  }

}

AnecdoteList.contextTypes = {
  store : PropTypes.object
}

export default AnecdoteList


