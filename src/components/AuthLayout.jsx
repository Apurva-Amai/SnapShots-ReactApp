import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {     // File - AuthLayout  function - Protected   (file and function name maybe same or different)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector((state) => state.auth.userStatus)       // get user status from the store

  
  useEffect(() => { 

        // // On the basis of authStatus, we will navigate to the respective route
        // if(authStatus === true){
        //     navigate("/")
        // } else if(authStatus === false){
        //     navigate("/login")
        // }

    if(authentication && authStatus !== authentication) {      // [true && {false !== true} ==> true] ==>  true
      navigate("/login")
    } else if(!authentication && authStatus !== authentication) {   // [false && {true !== true} ==> false] ==> false
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])
  
//   useEffect(() => {
//     const redirectTo = authentication ? "/login" : "/";
//     if (authStatus !== authentication) {
//         navigate(redirectTo);
//     }
//     setLoader(false);
// }, [authStatus, navigate, authentication]);


  return loader ? <h1>...Loading</h1> : <>{children}</>
}
