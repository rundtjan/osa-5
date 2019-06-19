import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useKentta } from './hooks'
import IlmoitusOk from './components/IlmoitusOk'
import IlmoitusVirhe from './components/IlmoitusVirhe'
import Resettable from './components/Resettable'
import Togglable from './components/Togglable'
import Ploki from './components/Ploki'


function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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
    if (blogUser) {
      const user = JSON.parse(blogUser)
      setUser(user)
      console.log(user)
      blogService.teeToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    const username = userfield.value.toString()
    const password = passfield.value.toString()
    //console.log(uf, pw)
    event.preventDefault()
    try {
      
      const user = await loginService.login({ username, password })
      console.log(user)
      setUser(user)
      blogService.teeToken(user.token)
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      setViesti('Tervetuloa!')
      setTimeout(function(){setViesti('')}, 2000)
      userfield.value = ''
      passfield.value = ''

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
    setTimeout(function(){setUser(null); setVirhe('');} /*window.location.reload()}*/, 2000)
  }

  const handleSave = async (event) => {
    try{
      blogService.naytaToken()
      event.preventDefault()
      const uusiPloki = { title: title.value, author: author.value, url: url.value }
      await blogService.create(uusiPloki)
      author.value = ''
      title.value = ''
      url.value = ''
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
    console.log('never gets here?')
    const result = await blogService.getAll()
    setBlogs(result)
  }

  const userfield = useKentta('text')
  const passfield = useKentta('password')
  const title = useKentta('text')
  const author = useKentta('text')
  const url = useKentta('text')


  //console.log(user.token)
  if (user === null){
    return (
      <div className="App">
        <h3>Please, kirjaudu!</h3>
        <IlmoitusOk tieto={viesti} />
        <IlmoitusVirhe tieto={virhe} />
        <form onSubmit={handleLogin}>
          <Resettable {...userfield} />
          <Resettable {...passfield} />
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
          <Resettable {...title} />
        </div>
        <div>Plokkaaja 
          <Resettable {...author} />
        </div>
        <div>Url 
          <Resettable {...url} />
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </Togglable>
    {blogs.sort(function(a, b){return b.likes-a.likes}).map(blog => <Ploki className='ploki' key={blog.id} katsoja={user.name} title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} lisaaja={blog.user.name} id={blog.id} onClick={like} poista={deleteBlog}/>)}
  </div>)
}

export default App
