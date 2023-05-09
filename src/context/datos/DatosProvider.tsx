import React, { useContext, useEffect,useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { UserContext } from '../usuario/Usercontext'
import { DatosContext, Inmueble } from './DatosContext'
import { Cuota } from '../../interfaces/inmuebles/deuda'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const DatosProvider = ({children}:Props) => {
    const {user} = useContext(UserContext);
    const {makeGet, makePost, data} = useFetch();
    const [inmuebleId, setInmuebleId] = useState<number | null>(null);
    const [inmuebles, setInmuebles]= useState(null);
    const [cuenta, setCuenta]= useState([]);
    const [numeroCuota, setNumeroCuota]= useState<number[] | []>([]);
    const [comercios, setComercios]= useState(null);
    const [vehiculos, setVehiculos]= useState(null);
    const [cuotas, setCuotas]= useState<Cuota[]|[]>([]);

    useEffect(() => {
      if(user){
        traerInmuebles();
      }
    }, [user])

    useEffect(() => {
      if(user){
        traerInmuebles();
      }
    }, [user])

    useEffect(() => {
        console.log('usando traer cuotas',numeroCuota)
    }, [numeroCuota])

    useEffect(() => {
        if(data){
            const param = Object.keys(data)[0];
        switch (param) {
            case 'inmuebles':
                setInmuebles(data.inmuebles);
                setCuenta(data.inmuebles[0].cuenta)
              break;
            case 'comercios':
                setComercios(data);
              break;
            case 'vehiculos':
              setVehiculos(data);
              break;
            default:
              console.log(`No se encontro el tipo ${param.toUpperCase()}.`);
          }
        }
      }, [data])
      
    

    const traerInmuebles = () =>{
        console.log('usando traer inmuebles')
        makeGet('/inmuebles/traerInmuebles', user?.token, undefined, 'inmuebles')
    }
    
    
  return (
    <DatosContext.Provider
        value={{
            inmuebles,
            cuotas,
            numeroCuota,
            setNumeroCuota,
            setCuotas,
            inmuebleId,
            setInmuebleId
        }}
    >
        {children}
    </DatosContext.Provider>
  )
}
