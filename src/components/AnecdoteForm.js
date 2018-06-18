import React from 'react'
import PropTypes from 'prop-types'
//import actionFor from '../actionCreators'
import { Redirect } from 'react-router-dom'
//import anecdoteService from '../services/anecdotes'
import { createNew } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'


class anecdoteForm extends React.Component {

  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      creationClicked:false,
    }
  }

  componentDidMount() {
    const { store } = this.context

    console.log('AF_componentDidMount', store)

    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.setState({
      creationClicked: true
    })
  }


  addAnecdote = async (event) => {
    event.preventDefault()

    const kama = {
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    }
    event.target.content.value = ''


    //const newAne = await anecdoteService.createNew(kama)
    //this.props.anecdoteCreation(newAne)

    console.log('uusi tyyppi:',kama)
    this.props.createNew(kama)


    //let tobeAdded = actionFor.anecdoteCreation(kama)
    //console.log('AF_addAnecdote: ', kama, '-uusi-', tobeAdded)
    //this.context.store.dispatch(tobeAdded)

    //this.context.store.getState().concat(tobeAdded) //?


    this.setState({
      creationClicked: true
    })

  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.addAnecdote}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
        {this.state.creationClicked ? <Redirect to="/" />: <div/> }
      </div>
    )

  }


}

anecdoteForm.contextTypes = {
  store: PropTypes.object
}

//export default anecdoteForm

export default connect(
  null,
  { createNew }
)( anecdoteForm )

