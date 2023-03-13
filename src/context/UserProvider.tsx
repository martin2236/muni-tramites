import React,{useEffect, useState} from 'react'
import { UserContext } from './Usercontext'
import { Inmuebles } from './Usercontext'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}:Props) => {
    const [user, setUser] = useState(null);
    const [inmuebles, setInmuebles] = useState<Inmuebles[] | null>(null);

    useEffect(() => {
      setInmuebles(inmuebleLista)
    }, [])

    const inmuebleLista: Inmuebles[] = [
        {   id:1,
            nombre:'casa de Lucy',
            cuenta:"456254/4",
            deuda:58.234,
            info:{
                cuentaMunicipal:"153423/4",
                partidaPovincial:"153423",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        },
        {   
            id:2,
            nombre:'casa de Lucy',
            cuenta:"456254/4",
            deuda:58.234,
            info:{
                cuentaMunicipal:"153423/4",
                partidaPovincial:"153423",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        },
        {   
            id:3,
            nombre:'casa de Lucy',
            cuenta:"456254/4",
            deuda:58.234,
            info:{
                cuentaMunicipal:"153423/4",
                partidaPovincial:"153423",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        }
    ]

  return (
   <UserContext.Provider
    value={{
        inmuebles,
        setInmuebles
    }}
   >
    {children}
   </UserContext.Provider>
  )
}
