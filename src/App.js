import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Media } from 'react-bootstrap'
import anecdoteService from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import actionFor from './actionCreators'
import PropTypes from 'prop-types'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'


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


const notificationStyle = {
  color: 'green',
  fontStyle : 'italic',
  fontSize: 14,
  borderStyle: 'dotted',
  borderRadius: 5,
  padding: 10
}

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
      anecdotes: [],
      notification: ''
    }
  }

  addNewXXXX = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    let msg = 'a new anecdote: ' + anecdote.content + ' created!'
    anecdoteService.createNew(anecdote)
    const anecdotes2= this.state.anecdotes.concat(anecdote)
    this.setState({ anecdotes: anecdotes2 ,
      notification: msg
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 10000)

  }

  anecdoteById = (id) => {
    //let res = this.state.anecdotes.find(a => a.id === id)

    let res = this.context.store.dispatch(
      actionFor.getOneAnecdote( { 'id': id } )
    )

    //let res = anecdoteService.get(id)
    //  .then(res => { return res } )
    return res   //returning as array otherwise AL croaks.
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  componentDidMount () {

    this.props.initializeAnecdotes()
    const { store } = this.context

    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentWillMount() {
    //console.log('comWillMount')
    anecdoteService.getAll().then(res => {
      this.setState({ items: res.data })
      //console.log('cwm_internal', res.data)
    })
    //console.log('cwm: ',this.state.items)
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

              {(this.state.notification &&
          <p style={notificationStyle}>
            {this.state.notification}
          </p>
              )}

              {console.log('Mainis:', this.context.store.getState().anecdotes)}
              {console.log('Full store:', this.context.store.getState())}
              {console.log('OOPS:', this.state)}
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


export default connect(
  null,
  { initializeAnecdotes }
) (App)

