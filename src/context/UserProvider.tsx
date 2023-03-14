import React,{useEffect, useState} from 'react'
import { UserContext } from './Usercontext'
import { Inmuebles } from './Usercontext'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({children}:Props) => {
    const [inmuebleId, setInmuebleId] = useState<number | null>(null);
    const [user, setUser] = useState(null);
    const [inmuebles, setInmuebles] = useState<Inmuebles[] | null>(null);

    useEffect(() => {
      setInmuebles(inmuebleLista)
    }, [])

    const inmuebleLista: Inmuebles[] = [
        {   id:1,
            nombre:'Mi casa',
            cuenta:"476254/4",
            deuda:4.234,
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
            nombre:'Duplex 1',
            cuenta:"986254/4",
            deuda:0,
            info:{
                cuentaMunicipal:"986254/4",
                partidaPovincial:"986254",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        },
        {   
            id:3,
            nombre:'Duplex 2',
            cuenta:"766254/3",
            deuda:0,
            info:{
                cuentaMunicipal:"766254/3",
                partidaPovincial:"766254",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        },
        {   
            id:4,
            nombre:'Local santa teresita',
            cuenta:"396254/2",
            deuda:158.234,
            info:{
                cuentaMunicipal:"396254/2",
                partidaPovincial:"396254",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        },
        {   
            id:5,
            nombre:'Locar san ber',
            cuenta:"76231/3",
            deuda:33.234,
            info:{
                cuentaMunicipal:"76231/3",
                partidaPovincial:"76231",
                categoria:"UrbanoEdificado",
                codigoServicio:"Luz MerC C/Ab",
                baseImponible:1342343,
                nomenclaturaCatastral:"IV-J-0159-0011-5-0000----"
            }
        },
        {   
            id:6,
            nombre:'Garage',
            cuenta:"468254/4",
            deuda:11.304,
            info:{
                cuentaMunicipal:"468254/4",
                partidaPovincial:"468254",
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
        inmuebleId,
        setInmuebleId,
        inmuebles,
        setInmuebles
    }}
   >
    {children}
   </UserContext.Provider>
  )
}
