import React,{useState} from 'react'
import { UserContext } from './Usercontext'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}:Props) => {
    const [user, setUser] = useState({});


  return (
   <UserContext.Provider
    value={{
        user,
        setUser
    }}
   >
    {children}
   </UserContext.Provider>
  )
}
