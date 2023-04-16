import React ,{useContext}from 'react'
import {Box, Divider, Pressable, Text} from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Info} from '../screens/inmuebleScreeens/InmuebleScreen';
import { DatosContext,Inmueble } from '../context/datos/DatosContext';
import { Deuda } from '../interfaces/inmuebles/deuda';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';

interface ListItem{
    item:Inmueble
}

interface Props{
    setData:React.Dispatch<React.SetStateAction< Info|null>>,
    item:ListItem,
    deuda: {deudas:Deuda} | null,
    navigation: StackNavigationProp<RootStackParams, "Inmueble", undefined>
}

export const TableItem = ({item, setData,deuda, navigation}:Props) => {
    const {setInmuebleId} = useContext(DatosContext);
    const nombre = item.item.descripcion;
    const {deudas} = deuda!;

    const data = {
        deuda: deudas,
        referencia: nombre
    }

    const guardarInfo = () => {
        const info = {
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
        setData(info);
    }

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
                    $ {deudas.totalCuotas.toFixed(2)}
                </Text>
            </Box>
            <Box width={'20%'} display={'flex'}  alignItems={'center'}>
            <Pressable      
                    onPress={() => navigation.navigate('VerInmueble', data )}
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
