import React ,{memo,useState,useEffect,useCallback,useContext}from 'react'
import {Box, Divider, Image, Pressable, Text} from 'native-base';
import { Comercio,Inmueble, Cementerio, Vehiculo } from '../context/datos/DatosContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/usuario/Usercontext';
//@ts-ignoreinfo
import info from '../assets/info-icon.png'
//@ts-ignore
import pago from '../assets/pago-icon.png'
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import { InfoVehiculo } from '../screens/vehiculosScreen/VehiculoScreen';
import { InfoComercio } from '../screens/comercioScreens/ComercioScreen';
import { InfoInmueble } from '../screens/inmuebleScreeens/InmuebleScreen';
import { InfoCementerio } from '../screens/cementerioScreens/CementerioScreen';

interface ListItem{
    item:Inmueble | Comercio | Cementerio | Vehiculo
}
interface Deuda{
    deudas:any
}
export interface UpdateInfo{
    padron?:number | string,
    cuenta?:number | string,
    d_verifi?:number | string,
    partida?:number |string

}
interface Props{
    setData:React.Dispatch<React.SetStateAction< InfoInmueble | InfoComercio | InfoVehiculo | InfoCementerio|null>>,
    item:ListItem,
    pantalla: string,
    navigation: StackNavigationProp<RootStackParams, "Inmueble", undefined> | StackNavigationProp<RootStackParams, "Comercio", undefined> | StackNavigationProp<RootStackParams, "Cementerio", undefined> | StackNavigationProp<RootStackParams, "Vehiculo", undefined>
}

export const TableItem = ({item, navigation,setData, pantalla}:Props) => {
    const {user} = useContext(UserContext);
    const { R16} = useResponsiveSize();
    const [deuda, setDeuda] = useState<Deuda | null>(null);
    const [cuotas,setCuotas] = useState(null);
    const { makePost, data} = useFetch();
    const nombre = item.item.descripcion;
    const [datos,setDatos] = useState<any>({
        id:0,
        ruta:'',
        deuda: cuotas,
        referencia: nombre,
        updateInfo:{}
        });

    //chequea los datos y hace un post al endpoint correspondiente
    const clasificarTipo = (valor:any) => {
       //! cambiar a una fecha dinamica
        if((valor as Inmueble).cuenta){
            const cuenta = (valor as Inmueble).cuenta
            const vencimiento = new Date()
            return makePost('/inmuebles/traerCuotas',{cuenta, vencimiento}, user?.token, 'deudas' );
        }
        if((valor as Comercio).padron){
            const padron = (valor as Comercio).padron
            const vencimiento = new Date()
            return makePost('/comercios/traerCuotas',{padron,vencimiento}, user?.token, 'deudas' );
        }
        if((valor as Cementerio).num_orden){
            const orden = (valor as Cementerio).fnrorden;
            const vencimiento = new Date()
            return makePost('/cementerios/traerCuotas',{orden,vencimiento}, user?.token, 'deudas' );
        }
        if((valor as Vehiculo).dominio){
            const dominio = (valor as Vehiculo).dominio;
            const vencimiento = new Date()
            let tipo;
            switch ((item.item as Vehiculo).tipo) {
                case "Vehiculo Particular":
                  tipo = "auto"
                  break;
                case "Moto":
                  tipo = "moto"
                  break;
                default:
                  tipo = "publico"
                  break;
              }
            return makePost('/vehiculos/traerCuotas',{dominio,tipo,vencimiento}, user?.token, 'deudas' );
    }
}
    // llama a la funcion clasificarTipo al montarse la pantalla
    useEffect(() => {
        clasificarTipo(item.item)
    }, [])

    //chequea cuando cambia el estado de data y si no es null guarda la deuda
    useEffect(()=>{
        if(data){
            setDeuda(data);
        }
    },[data])
    
    // verifica que se hayan acomodados los datos cuando se ejecuta el switch y navega a otra pantalla
    useEffect(()=> {
        if(datos.deuda){
            //@ts-ignore 
            navigation.navigate(`Ver${pantalla}` as never, datos as never )
        }
    },[datos.deuda])

    //verifica que haya cuotas y agrega la propiedad checked para
    //despues poder seleccionarla
    const organizarData = () => {
        if(!deuda){
          return console.log('no hay deudas')
        }
        const dato = deuda.deudas.cuotas.map((cuota:any)=>{
            return {
                ...cuota,
                checked:false
            }
        })
        
        setDatos({
            ...datos,
            deuda:dato
        })
       setCuotas(datos);
    }

    //acomoda los datos para usarse en la pantalla `ver${pantalla}`
   useEffect(()=>{
        if(pantalla === 'Inmueble'){
          return setDatos({...datos, 
            id:(item.item as Inmueble).pkinmueble,
            ruta:'Inmueble',
            updateInfo:{
            cuenta:(item.item as Inmueble).cuenta,
            d_verifi:(item.item as Inmueble).d_vefi,
            partida:(item.item as Inmueble).partida
        }
    })
        }else if(pantalla === 'Comercio'){
           return setDatos({
            ...datos,
            id:(item.item as Comercio).pkcomercio,
            ruta:'Comercio',
            updateInfo:{
            padron:(item.item as Comercio).padron
            }
        })
        }else if(pantalla === 'Vehiculo'){
          return  setDatos({
                ...datos,
            id: parseInt((item.item as Vehiculo).pkvehiculo),
            ruta:'Vehiculo',
            updateInfo:{
                dominio:(item.item as Vehiculo).dominio,
                descripcion: (item.item as Vehiculo).descripcion,
                tipo:(item.item as Vehiculo).tipo
            }
            })
        } else if( pantalla === 'Cementerio'){
            return setDatos({
                ...datos,
                id:(item.item as Cementerio).pkcementerio,
                ruta:'Cementerio',
                updateInfo:{
                    padron:(item.item as Cementerio).fnrorden
                }
            })
        }
   },[pantalla])
    
    //guarda la informacion que se va a mostrar en el custom modal
    const guardarInfo = () => {
        if(deuda && deuda.deudas.datosPadron.baseimpo){
            const {deudas} = deuda;
            const informacion = {
                modal:true,
                tipoModal:'inmueble',
                referencia:item.item.descripcion,
                cuentaMunicipal: deudas.datosPadron.cuenta,
                partidaPovincial:deudas.datosPadron.part_prov,
                baseImponible:deudas.datosPadron.baseimpo,
                categoria: deudas.datosPadron.catDeta,
                destino: deudas.datosPadron.destDeta,
                codigoServicio: deudas.datosPadron.servDeta,
                nomenclatura: deudas.datosPadron.nc_circ.trim() +"-"+ deudas.datosPadron.nc_sec.trim() +"-"+ deudas.datosPadron.nc_mzna.trim() +"-"+
                deudas.datosPadron.nc_letmzna.trim() +"-"+ deudas.datosPadron.nc_parc.trim() +"-"+ deudas.datosPadron.nc_letparc.trim() +"-"+
                deudas.datosPadron.nc_uf.trim() +"-"+ deudas.datosPadron.nc_chacra.trim() +"-"+ deudas.datosPadron.nc_lchacra.trim() +"-"+
                deudas.datosPadron.nc_quinta.trim() +"-"+ deudas.datosPadron.nc_fracci.trim() +"-"+ deudas.datosPadron.n_c_serv.trim()
            }   
           return setData(informacion);
        }
        if(deuda && deuda.deudas.datosPadron.fec_habi){
            const {deudas} = deuda;
            const informacion = {
                modal:true,
                tipoModal:'comercio',
                referencia:item.item.descripcion,
                numeroPadron: deudas.datosPadron.nrropadro,
                razonSocial:deudas.datosPadron.razosoci,
                domicilio:'',
                habilitacion: deudas.datosPadron.fec_habi,
                condicion: deudas.datosPadron.destDeta,
            }   
            return setData(informacion);
        }
        if(deuda && deuda.deudas.datosPadron.desmodelo){
            const {deudas} = deuda;
            const informacion = {
                modal:true,
                tipoModal:'vehiculo',
                referencia:item.item.descripcion,
                dominioActual: deudas.datosPadron.domia,
                dominioOriginal:deudas.datosPadron.domio,
                modelo:deudas.datosPadron.desmodelo,
                marca: deudas.datosPadron.marcamot,
                año: deudas.datosPadron.modelo,
                tipo: deudas.datosPadron.modelo,
            }   
            return setData(informacion);
        }
        if(deuda && deuda.deudas.datosPadron.fallfech){
            const {deudas} = deuda;
            const informacion = {
                modal:true,
                tipoModal:'cementerio',
                referencia:item.item.descripcion,
                numOrden: deudas.datosPadron.fnrorden,
                nombre:deudas.datosPadron.fapenom,
                fechaIngresp:deudas.datosPadron.feching,
                fechaFallecido: deudas.datosPadron.fallfech,
                codigoPago: deudas.datosPadron.t_deta,
                galeria:deudas.datosPadron.galeria,
                sector:deudas.datosPadron.sector,
                manzana:deudas.datosPadron.manzana,
                fila:deudas.datosPadron.fila,
                nicho:deudas.datosPadron.nicho,
                sepultura:deudas.datosPadron.sepultura
            }   
            return setData(informacion as InfoCementerio);
        }
    };

  return (
    <>
    <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Box width={'40%'} flexDir={'row'} justifyContent={'space-around'}>
            
            <Pressable 
                    display={'flex'} 
                    flexDirection={'row'} 
                    alignItems={'center'} 
                    justifyContent={'space-between'}
                    onPress={()=> guardarInfo()}
                    p={1}
                >
                    <Box
                        mr={2}
                        height={5}
                        alignItems={'center'}
                        justifyContent={'center'} 
                        width={5}
                        >
                            
                        <Image size={7} source={info} alt='icono'/>
                    </Box>

                    <Text width={'70%'} ellipsizeMode='tail' numberOfLines={1} textAlign={'center'} fontSize={R16} >
                        { nombre }
                    </Text>
                </Pressable>
            </Box>
           
            <Box width={'40%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Text textAlign={'center'} fontSize={R16} fontWeight={'bold'}>
                    {
                        deuda ? 
                        <Text>${deuda.deudas.totalCuotas.toFixed(2)}</Text> 
                        :
                        <Text>
                            Calculando ...
                        </Text>
                    }
                </Text>
            </Box>
            <Box width={'20%'} display={'flex'}  alignItems={'center'}>
            <Pressable      
                onPress={() => organizarData()}
                alignSelf={'center'}
                ml={1}
                height={5}
                alignItems={'center'}
                justifyContent={'center'} 
                width={5}
                >
                    <Image size={7} source={pago} alt='icono'/>
            </Pressable>
            </Box>
        </Box>
        <Divider mt={1}/>
    </>
  )
}
