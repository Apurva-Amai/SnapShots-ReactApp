import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const handlelogout = () => {
        authService.logout()         // logout from appwrite
        .then(() => {
            dispatch(logout())       // logout from store
        })
        .catch((error) => console.log(error))
    }


  return (
    <button onClick={handlelogout} className='inline-block px-6 py-2 duration-200 hover:bg-red-500 rounded-full'>
        Logout
    </button>
  )
}

export default LogoutBtn