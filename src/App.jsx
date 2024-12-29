import { useEffect, useState } from 'react'
import './App.css'
import { Header, Footer } from './components'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Link, Outlet } from 'react-router-dom'
 

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => setLoading(false))
  }, [])
  
    return !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
      </div>
    ) : (
      // <div>Loading...</div>
      /* From Uiverse.io by barisdogansutcu */ 
      <div className="flex items-center justify-center h-screen">
        <svg viewBox="25 25 50 50" className=''>
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
      
    )
  }
  
  export default App
  