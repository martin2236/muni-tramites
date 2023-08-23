import React ,{memo,useState,useEffect,useCallback,useContext}from 'react'
import {Box, Divider, Pressable, Text} from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Info} from '../screens/inmuebleScreeens/InmuebleScreen';
import { Comercio,Inmueble, Cementerio, Vehiculo } from '../context/datos/DatosContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/usuario/Usercontext';

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
    setData:React.Dispatch<React.SetStateAction< Info|null>>,
    item:ListItem,
    pantalla: string,
    navigation: StackNavigationProp<RootStackParams, "Inmueble", undefined> | StackNavigationProp<RootStackParams, "Comercio", undefined> | StackNavigationProp<RootStackParams, "Cementerio", undefined> | StackNavigationProp<RootStackParams, "Vehiculo", undefined>
}

export const TableItem = ({item, navigation,setData, pantalla}:Props) => {
    const {user} = useContext(UserContext);
    const [deuda, setDeuda] = useState<Deuda | null>(null);
    const [cuotas,setCuotas] = useState(null);
    const { makePost, data} = useFetch();
    const nombre = item.item.descripcion;

    let datos = {
        id:0,
        ruta:'',
        deuda: cuotas,
        referencia: nombre,
        updateInfo:{}
    }
    //chequea los datos y hace un post al endpoint correspondiente
    const clasificarTipo = (valor:any) => {
       //! cambiar a una fecha dinamica
        if((valor as Inmueble).cuenta){
            const cuenta = (valor as Inmueble).cuenta
            const vencimiento = "2023-03-28T15:46:20.265Z"
            return makePost('/inmuebles/traerCuotas',{cuenta, vencimiento}, user?.token, 'deudas' );
        }
        if((valor as Comercio).padron){
            const padron = (valor as Comercio).padron
            const vencimiento = "2023-03-28T15:46:20.265Z"
            return makePost('/comercios/traerCuotas',{padron,vencimiento}, user?.token, 'deudas' );
        }
        if((valor as Cementerio).num_orden){
            const orden = (valor as Cementerio).num_orden;
            const vencimiento = "2023-06-28T15:46:20.265Z";
            return makePost('/cementerios/traerCuotas',{orden,vencimiento}, user?.token, 'deudas' );
        }
        if((valor as Vehiculo).dominio){
            const dominio = (valor as Vehiculo).dominio;
            const vencimiento = "2023-06-28T15:46:20.265Z";
            let tipo;
            switch (item.item.tipo) {
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
            console.log('CAMBIO DATA')
            setDeuda(data);
        }
    },[data])
    
    // verifica que se hayan acomodados los datos cuando se ejecuta el switch y navega a otra pantalla
    useEffect(()=> {
        if(datos.deuda){
            navigation.navigate(`Ver${pantalla}` as never, datos as never )
        }
    },[datos])

    //verifica que haya cuotas y agrega la propiedad checked para
    //despues poder seleccionarla
    const organizarData = () => {
        if(!deuda){
          return console.log('no hay deudas')
        }
        const datos = deuda.deudas.cuotas.map((cuota:any)=>{
            return {
                ...cuota,
                checked:false
            }
        })
       setCuotas(datos);
    }
    //acomoda los datos para usarse en la pantalla `ver${pantalla}`
    switch (pantalla) {
        case 'Inmueble':
            datos.id = (item.item as Inmueble).pkinmueble;
            datos.ruta = 'Inmueble';
            datos.updateInfo = {
                cuenta:(item.item as Inmueble).cuenta,
                d_verifi:(item.item as Inmueble).d_vefi,
                partida:(item.item as Inmueble).partida,
            }
            break;
        case 'Comercio':
            datos.id = (item.item as Comercio).pkcomercio;
            datos.ruta = 'Comercio';
            datos.updateInfo={
                padron:(item.item as Comercio).padron
            }
            break;
        case 'Cementerio':
            datos.id = (item.item as Cementerio).pkcementerio;
            datos.ruta = 'Cementerio';
            datos.updateInfo={
                padron:(item.item as Cementerio).num_orden
            }
            break;
        case 'Vehiculo':
            datos.id = parseInt((item.item as Vehiculo).pkvehiculo);
            datos.ruta = 'Vehiculo';
            break;
        default:
            break;
    }
    //guarda la informacion del inmueble
    const guardarInfo = () => {
        if(deuda && deuda.deudas.datosPadron){
            const {deudas} = deuda;
            const informacion = {
                cuentaMunicipal: deudas.datosPadron.nro_cta,
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
            setData(informacion);
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
                        borderWidth={2}
                        borderColor={'#2596be'} 
                        borderRadius={'4'}
                        alignItems={'center'}
                        justifyContent={'center'} 
                        width={5}
                        >
                        <Icon name={'information-variant'} size={12}/> 
                    </Box>

                    <Text width={'70%'} ellipsizeMode='tail' numberOfLines={1} textAlign={'center'} fontSize={13} >
                        { nombre }
                    </Text>
                </Pressable>
            </Box>
           
            <Box width={'40%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Text textAlign={'center'} fontSize={13} fontWeight={'bold'}>
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
                    backgroundColor={'#2596be'}
                    borderRadius={'4'} 
                    alignItems={'center'}
                    justifyContent={'center'} 
                    width={5}>
                        <Icon name={'printer'} color={'#fff'} size={14}/>
                </Pressable>
            </Box>
        </Box>
        <Divider mt={1}/>
    </>
  )
}
