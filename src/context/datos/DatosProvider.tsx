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
    const {makeGet, data} = useFetch();
    const [inmuebleId, setInmuebleId] = useState<number | null>(null);
    const [inmuebles, setInmuebles]= useState(null);
    const [cuenta, setCuenta]= useState([]);
    const [numeroCuota, setNumeroCuota]= useState<number[] | []>([]);
    const [comercios, setComercios]= useState(null);
    const [cementerios, setCementerios]= useState(null);
    const [vehiculos, setVehiculos]= useState(null);
    const [cuotas, setCuotas]= useState<Cuota[]|[]>([]);
    const [cuotasSeleccionadas, setCuotasSeleccionadas]= useState<Cuota[]|[]>([]);
    const [updated, setUpdated]= useState({
      ruta:'',
      actualizar:false
    });
    

    useEffect(() => {
      if(user){
        traerInmuebles();
        traerComercios();
        traerCementerios();
      }
    }, [user])

    useEffect(() => {
     switch (updated.ruta) {
      case 'inmuebles':
        traerInmuebles();
        break;
      case 'comercios':
        traerComercios();
        break;
      case 'cementerios':
        traerCementerios();
        break;
      case 'vehiculos':
        traerVehiculos();
        break;
      default:
        console.log(`No se encontro el tipo ${updated.ruta.toUpperCase()}.`);
     }
    }, [updated])

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
                setComercios(data.comercios);
              break;
              case 'cementerios':
                setCementerios(data.cementerios);
              break;
            case 'vehiculos':
              setVehiculos(data);
              break;
            default:
              console.log(`No se encontro el tipo ${param.toUpperCase()}.`);
          }
        }
      }, [data]);

    const traerInmuebles = () =>{
        makeGet('/inmuebles/traerInmuebles', user?.token, undefined, 'inmuebles')
    };

    const traerComercios = () =>{
      makeGet('/comercios/traerComercios', user?.token, undefined, 'comercios')
    };

    const traerCementerios = () =>{
      makeGet('/cementerios/traerCementarios', user?.token, undefined, 'cementerios')
      };

    const traerVehiculos = () =>{
      makeGet('/vehiculos/traerVehiculos', user?.token, undefined, 'vehiculos')
      };
    
  return (
    <DatosContext.Provider
        value={{
            comercios,
            cementerios,
            inmuebles,
            vehiculos,
            cuotas,
            numeroCuota,
            cuotasSeleccionadas,
            setCuotasSeleccionadas,
            setNumeroCuota,
            setCuotas,
            inmuebleId,
            setInmuebleId,
            updated,
            setUpdated
        }}
    >
        {children}
    </DatosContext.Provider>
  )
}
