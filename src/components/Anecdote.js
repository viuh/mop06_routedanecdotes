import React from 'react'
//import actionFor from '../actionCreators'
import PropTypes from 'prop-types'

class Anecdote extends React.Component {

  componentDidMount() {
    const { store } = this.context

    //console.log('This props?', this.props)
    //console.log('Anecdote_store:', store)
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  shouldComponentUpdate() {
    console.log('Anecdote_shouldCompUpd?')
  }

  render () {
    const { id } = this.props
    //const anecdote = anecdotes.filter( { 'id': id }  )
    let anecdote = this.props.anecdotes.find( a => a.id === id)
    console.log('Anecdote_render:', this.props, '--', anecdote)

    return (
      <div>
        {console.log('DDUI', anecdote,'tila: ', this.context.store.getState())}
        {/*this.context.store.dispatch(
          actionFor.getOneAnecdote(1)
        )*/}
        {/*this.context.store.getState().anecdotes.find*/}
        <h2>{anecdote.content}</h2>
        <br/>
    has {anecdote.votes} votes<br/><br/>
    for more info see <a target="_new" href={anecdote.info}>{anecdote.info}</a>
        <br/><br/><br/>
      </div>
    )
  }

}

Anecdote.contextTypes = {
  store : PropTypes.object
}

export default Anecdote