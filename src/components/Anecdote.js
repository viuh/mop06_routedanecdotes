import React from 'react'
//import actionFor from '../actionCreators'
import PropTypes from 'prop-types'
import anecdoteService from '../services/anecdotes'

class Anecdote extends React.Component {

  constructor() {
    super()

    this.state = {
      notYet:true,
      items: []
    }
  }

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

/*  shouldComponentUpdate() {
    //console.log('Anecdote_shouldCompUpd?')
    return this.state.notYet
  }*/

  componentWillUpdate () {
    //console.log('cwillupdate ??? ')

    if (typeof (this.state.items)==='undefined') {
      anecdoteService.getAll().then(res => {
        this.setState({ items: res.data , notYet: false })
        //console.log('cwm_internal', res.data)
      })
    }
  }

  render () {
    const { id , anec } = this.props
    //const anecdote = anecdotes.filter( { 'id': id }  )

    let allanecs = this.props.anecdotes || []

    let anecdote = allanecs.find( a => a.id === id)

    if (typeof (anecdote) === 'undefined' || anecdote === null) {
      anecdote = { content : 'loading',
        votes : 0,
        info:''
      }
      console.log('Initialization of anecdote?')
    } else {
      //this.setState({ notYet: false })
    }
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