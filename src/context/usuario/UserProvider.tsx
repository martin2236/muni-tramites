import React,{useEffect, useState} from 'react'
import { User, UserContext } from './Usercontext'
import { Inmuebles } from './Usercontext'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}:Props) => {
    
    const [user, setUser] = useState<User | null >(null);
    
  return (
   <UserContext.Provider
    value={{
        user,
        setUser,
    }}
   >
    {children}
   </UserContext.Provider>
  )
}
