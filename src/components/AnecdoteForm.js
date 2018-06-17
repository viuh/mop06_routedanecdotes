import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'
import { Redirect } from 'react-router-dom'

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


  addAnecdote = (event) => {
    event.preventDefault()

    const kama = {
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    }
    let tobeAdded = actionFor.anecdoteCreation(kama)
    console.log('AF_addAnecdote: ', kama, '-uusi-', tobeAdded)
    this.context.store.dispatch(tobeAdded)

    //this.context.store.getState().concat(tobeAdded) //?

    event.target.content.value = ''

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

export default anecdoteForm