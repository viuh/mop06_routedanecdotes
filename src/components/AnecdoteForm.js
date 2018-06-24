import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { createNew } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

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

    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange = (e) => {
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
    this.setState({ notification : msg })

    this.setState({
      creationClicked: true
    })

  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.addAnecdote}>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <FormControl type='text' name='content' value={this.state.content} onChange={this.handleChange} />
            <ControlLabel>Author</ControlLabel>
            <FormControl type='text' name='author' value={this.state.author} onChange={this.handleChange} />
            <ControlLabel>URL for more info</ControlLabel>
            <FormControl type='text' name='info' value={this.state.info} onChange={this.handleChange} />
            <Button bsStyle="success" type="submit">Create</Button>
          </FormGroup>
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

