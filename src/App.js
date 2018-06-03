import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Media } from 'react-bootstrap';


const AnecdoteList = ({ anecdotes }) => (
  
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} 
          href={`/anecdotes/${anecdote.id}`}>{anecdote.content}</ListGroupItem>
      )}
    </ListGroup>  
  </div>
)


/*const AnecdoteList = ({ anecdotes }) => (
  
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id}>
        <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
        </li>
      )}
    </ul>  
  </div>
)*/

const Anecdote = ( { anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <br/>
    has {anecdote.votes} votes<br/><br/>
    for more info see <a target="_new" href={anecdote.info}>{anecdote.info}</a>
    <br/><br/><br/>
  </div>
)



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

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      creationClicked:false,
    }
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

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
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
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    let msg = "a new anecdote: " + anecdote.content + " created!"
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) ,
      notification: msg
    })
    setTimeout(() => {
      this.setState({notification: null})
    }, 10000)
    
  }

  anecdoteById = (id) => {
    let res = this.state.anecdotes.find(a => a.id === id)
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

  render() {
    return (
      <div className="container">
      <div>
        <Router>
        <div>
        <h1>Software anecdotes</h1>
        {/*console.log('Tila paassa: ', this.state)*/}

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


        <Route exact path="/" render={()=><AnecdoteList anecdotes={this.state.anecdotes} />} />
        <Route exact path="/anecdotes" render={()=><AnecdoteList anecdotes={this.state.anecdotes} />} />
        
        <Route exact path="/create" render={()=><CreateNew addNew={this.addNew}/>} />
        <Route exact path="/about" render={()=><About />}/>
        
        <Route exact path="/anecdotes/:id" render={({match})=>
          <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
        />

          <Footer />
        </div>
        </Router>
      </div>  
      </div>
    );
  }
}

export default App;


