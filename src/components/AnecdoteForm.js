import React from 'react'
import PropTypes from 'prop-types'
//import actionFor from '../actionCreators'
import { Redirect } from 'react-router-dom'
//import anecdoteService from '../services/anecdotes'
import { createNew } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
//import { addMessage } from '../reducers/notificationReducer'


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

    //console.log('AF_componentDidMount', store)

    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange = (e) => {
    //console.log(e.target.name, e.target.value)
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

    this.props.createNew(kama)

    let msg = 'a new anecdote: ' + this.state.content + ' created!'
    //this.context.store.notification = msg
    this.setState({ notification : msg })
    console.log('this.stoe? ', this.context.store.getState())
    //this.props.addMessage( msg )
    //this.context.store.getState().concat(tobeAdded) //?
    console.log('Addnew: ', this.context.store.getState())

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notitification
  }
}

export default connect(
  mapStateToProps,
  { createNew }
)( anecdoteForm )

