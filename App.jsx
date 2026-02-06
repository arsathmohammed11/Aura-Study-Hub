import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import AI from './components/About'
import Login from './components/Login'
import Profile from './components/Profile'
import Chat from './components/Chat'
import Calendar from './components/Calendar'
import Study from './components/Study'

function App() {
  const [route, setRoute] = useState('login')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [user, setUser] = useState(null)

  const handleLogin = (u) => {
    setUser(u)
    setRoute('home')
  }

  const handleDelete = () => {
    setUser(null)
    setRoute('login')
  }

  const handleLogout = () => {
    setUser(null)
    setRoute('login')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div id="root" className="app-root">
      {route !== 'login' && (
        <Header route={route} setRoute={setRoute} theme={theme} toggleTheme={toggleTheme} setTheme={setTheme} user={user} onLogout={handleLogout} />
      )}

      <main className={`content ${route === 'login' ? 'login' : ''}`}>
        {route === 'home' && <Home />}
        {route === 'about' && <AI />}
        {route === 'study' && <Study />}
        {route === 'calendar' && <Calendar />}
        {route === 'chat' && <Chat />}
        {route === 'profile' && <Profile user={user} onUpdate={(u) => setUser(u)} toggleTheme={toggleTheme} onDelete={handleDelete} setTheme={setTheme} />}
        {route === 'login' && <Login onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} setTheme={setTheme} />}
        {user && <div className="welcome">Signed in as {user.email}</div>}
      </main>

      {route !== 'login' && <footer className="footer">Made with ♥ — small demo app</footer>}
    </div>
  )
}

export default App
