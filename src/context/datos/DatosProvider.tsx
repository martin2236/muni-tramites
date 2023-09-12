import React, { useContext, useEffect,useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { UserContext } from '../usuario/Usercontext';
import { DatosContext, Inmueble } from './DatosContext';
import { Cuota } from '../../interfaces/inmuebles/deuda';
import Carousel from 'react-native-reanimated-carousel';

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
    
    //ni bien la aplicacion detecta un usuario manda a pedir toda la data 
    useEffect(() => {
      if(user){
        traerInmuebles();
        traerComercios();
        traerCementerios();
        traerVehiculos();
      }
    }, [user]);
    
   //este useEffect se activa cuando se modifica alguna referencia pidiendo los datos otra vez
   //para que el inmueble muestre el nuevo nombre 
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
    }, [updated]);
    
    // a medida que se van ejecutando la funciones traerInmuebles(), traerComercios(),
    // traerCementerio(),traerVehiculos() la data va cambiando lo que dispara este useEffect
    // haciendo que se guarden en el estado los inmuebles, comercios, cementerios y vehiculos de usuario
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
              setVehiculos(data.vehiculos);
              break;
            default:
              console.log(`No se encontro el tipo ${param.toUpperCase()}.`);
          }
        }
      }, [data]);
    
    // funciones para pedir datos en el backend
    const traerInmuebles = () =>{
        makeGet('/inmuebles/traerInmuebles', user?.token, undefined, 'inmuebles')
    };

    const traerComercios = () =>{
      makeGet('/comercios/traerComercios', user?.token, undefined, 'comercios')
    };

    const traerCementerios = () =>{
      makeGet('/cementerios/traerCementerios', user?.token, undefined, 'cementerios')
      };

    const traerVehiculos = () =>{
      makeGet('/vehiculos/traerVehiculos', user?.token, undefined, 'vehiculos')
      };
    
    
  return (
    <DatosContext.Provider
        value={{
            comercios,
            setComercios,
            cementerios,
            setCementerios,
            inmuebles,
            setInmuebles,
            vehiculos,
            setVehiculos,
            cuotas,
            numeroCuota,
            cuotasSeleccionadas,
            setCuotasSeleccionadas,
            setNumeroCuota,
            setCuotas,
            inmuebleId,
            setInmuebleId,
            updated,
            setUpdated,
            traerInmuebles,
        }}
    >
        {children}
    </DatosContext.Provider>
  )
}
