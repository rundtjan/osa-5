import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'
//import logo from './logo.svg';
//import './App.css';

const IlmoitusOk = ({ tieto }) => {
  const ilmoitusStyle = {
    backgroundColor: 'green',
    color: 'white',
    fontStyle: 'bold',
    fontSize: 15,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10
  }

  if (tieto === '') {
    return null
  }

  return (
    <div style={ilmoitusStyle}>
      {tieto}
    </div>
  )
}

const IlmoitusVirhe = ({ tieto }) => {
  const ilmoitusStyle = {
    backgroundColor:'red',
    color: 'white',
    fontStyle: 'bold',
    fontSize: 15,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10
  }

  if (tieto === '') {
    return null
  }

  return (
    <div style={ilmoitusStyle}>
      {tieto}
    </div>
  )
}

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Piilota lomake</button>
      </div>
    </div>
  )
}

const Ploki = ({ title, author, url, likes, lisaaja, id, onClick, poista, katsoja }) => {
  const [visible] = useState(lisaaja === katsoja ? '' : 'none')
  const plokyTyyli = {
    marginBottom: 5
  }

  const deleteStyle = {
    display: visible
  }
  const [showExtra, setShowExtra] = useState(false)
  const naytaExtra = { display: showExtra ? '' : 'none' }

  return (
    <div style={plokyTyyli} >
      <div onClick={() => setShowExtra(!showExtra)}>{title} {author}</div>
      <div style={naytaExtra}>
        <div>{url}</div>
        <div>Tykkäävät: {likes}</div>
        <div>Tallentanut: {lisaaja}</div>
        <button id={id} onClick={onClick}>Tykkään!</button>
        <button style={deleteStyle} id={'delete-' + id} onClick={poista}>Poista!</button>
      </div>
    </div>
  )
}

Ploki.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  lisaaja: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  poista: PropTypes.func.isRequired,
  katsoja: PropTypes.string.isRequired
}


function App() {

  const [blogs, setBlogs] = useState([])
  //const [newNote, setNewNote] = useState('')
  //const [showAll, setShowAll] = useState(true)
  //const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [viesti, setViesti] = useState('')
  const [virhe, setVirhe] = useState('')

  useEffect(() => {
    blogService.getAll().then(haetutBlogit => {
      console.log(haetutBlogit)
      setBlogs(haetutBlogit)
    })
  }, [])

  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser')
    if (blogUser) {const user = JSON.parse(blogUser)
      setUser(user)
      console.log(user)
      blogService.teeToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      setUser(user)
      blogService.teeToken(user.token)
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      setViesti('Tervetuloa!')
      setTimeout(function(){setViesti('')}, 2000)
      setUsername('')
      setPassword('')

    }
    catch (exception){
      setVirhe('Kuka sinä oikein olet?')
      setTimeout(function(){setVirhe('')}, 2000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    setVirhe('Kirjauduit ulos, senkin!')
    setTimeout(function(){setUser(''); setVirhe(''); window.location.reload()}, 2000)
  }

  const handleSave = async (event) => {
    try{
      blogService.naytaToken()
      event.preventDefault()
      const uusiPloki = { title: title, author: author, url: url }
      await blogService.create(uusiPloki)
      setAuthor('')
      setTitle('')
      setUrl('')
      const result = await blogService.getAll()
      console.log(result)
      setBlogs(result)
      setViesti('Tallennettu!')
      setTimeout(function(){setViesti('')}, 2000)
    } catch (exception){
      setVirhe('Jokin meni hassusti!')
      setTimeout(function(){setVirhe('')}, 2000)
    }
  }

  const like = async (event) => {
    console.log(event.target.id)
    await blogService.like(event.target.id)
    const result = await blogService.getAll()
    setBlogs(result)
  }

  const deleteBlog = async (event) => {
    console.log(event.target.id.split('-')[1])
    await blogService.trash(event.target.id.split('-')[1])
    const result = await blogService.getAll()
    setBlogs(result)
  }

  //console.log(user.token)
  if (user === null){
    return (
      <div className="App">
        <IlmoitusOk tieto={viesti} />
        <IlmoitusVirhe tieto={virhe} />
        <form onSubmit={handleLogin}>
          <div>Käyttäjätunnus
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>Salasana
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )
  }
  return (<div className="App">
    <h3>Plokeja</h3>
    <IlmoitusOk tieto={viesti} />
    <IlmoitusVirhe tieto={virhe} />
    <p>Taidat olla itse {user.name}</p>
    <button onClick={handleLogout}>Kirjaudu ulos</button>
    <Togglable buttonLabel="Tallenna uusi">
      <h4>Tallenna uusi ploki</h4>
      <form onSubmit={handleSave}>
        <div>Plokin nimi 
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>Plokkaaja 
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>Url 
          <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </Togglable>
    {blogs.sort(function(a, b){return b.likes-a.likes}).map(blog => <Ploki key={blog.id} katsoja={user.name} title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} lisaaja={blog.user.name} id={blog.id} onClick={like} poista={deleteBlog}/>)}
  </div>)
}



export default App
