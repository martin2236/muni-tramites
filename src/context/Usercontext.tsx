import React, { createContext } from 'react';

interface User{
    name:''
}

type ContextProps = {
    user: User,
    setUser: (user:User | null) => void
  };

export const UserContext = createContext<ContextProps | {}>  ({});