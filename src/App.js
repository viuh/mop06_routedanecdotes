import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Media, Alert } from 'react-bootstrap'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import actionFor from './actionCreators'
import PropTypes from 'prop-types'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { hideMessage } from './reducers/notificationReducer'


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Media>
      <Media.Left>
      According to Wikipedia:
        <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
      </Media.Left>
      <Media.Right>
        <img title="Ada Lovelace" alt="Ada Lovelace" width={200} src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Ada_Lovelace_in_1852.jpg"></img>
      </Media.Right>
    </Media>
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

const activeLinkStyle={
  fontWeight: 'bold',
  color: 'blue',
  backgroundColor: 'lightgray',
}

const baseLinkStyle={
  color: 'teal',
  fontSize: 14
}

class App extends React.Component {


  constructor() {
    super()

    this.state = {
      notification: 'It begins.1..'
    }
  }

  anecdoteById = (id) => {

    let res = this.context.store.dispatch(
      actionFor.getOneAnecdote( { 'id': id } )
    )

    return res
  }

  componentDidMount () {

    this.props.initializeAnecdotes()
    const { store } = this.context

    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUpdate () {
    //console.log('CompWillUpdate')

    if (this.context.store.getState().notification !== '') {
      setTimeout(() => {
        this.props.hideMessage()
      }, 5000)
    }

  }

  componentWillUnmount() {
    this.unsubscribe()
  }


  render() {
    return (
      <div className="container">
        <div>
          <Router>
            <div>
              <h1>Software anecdotes</h1>
              <div>
                <NavLink exact style={baseLinkStyle} activeStyle={activeLinkStyle} to="/">anecdotes</NavLink> &nbsp;
                <NavLink style={baseLinkStyle} activeStyle={activeLinkStyle} to="/create">create new</NavLink> &nbsp;
                <NavLink style={baseLinkStyle} activeStyle={activeLinkStyle} to="/about">about</NavLink>
              </div>

              { (this.context.store.getState().notification &&
              <Alert color="success">{this.context.store.getState().notification}
              </Alert>
              )}

              <Route exact path="/" render={() => <AnecdoteList />} />
              <Route exact path="/anecdotes" render={() => <AnecdoteList />} />

              <Route exact path="/create" render={() => <AnecdoteForm />} />
              <Route exact path="/about" render={() => <About />}/>

              <Route exact path="/anecdotes/:id" render={({ match }) =>
                <Anecdote anecdotes={this.context.store.getState().anecdotes} id={match.params.id} />}
              />

              <Footer />
            </div>
          </Router>
        </div>
      </div>
    )
  }
}

App.contextTypes = {
  store : PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notitification
  }
}

//this gives the this.props. -accss to to dispatch
export default connect(
  mapStateToProps,
  { initializeAnecdotes, hideMessage }
) (App)

