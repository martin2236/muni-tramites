import React, { useContext, useState, useEffect } from 'react'
import { Text, Box, Divider, Button,Pressable, Center, FlatList, ScrollView, Spinner } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { TableItem } from '../../components/TableItem';
import { CustomModal } from '../../components/CustomModal';
import { Inmueble,DatosContext, Vehiculo } from '../../context/datos/DatosContext';
import { useFetch } from '../../hooks/useFetch';
import { UserContext } from '../../context/usuario/Usercontext';
import { Cuota } from '../../interfaces/inmuebles/deuda';

interface Props {
    navigation: StackNavigationProp<RootStackParams, "Inmueble", undefined>,
    route:any
}
interface ListProps{
    index:number,
    item:Vehiculo
}
export interface Info {
    cuentaMunicipal: string;
    partidaPovincial: number;
    categoria: string;
    codigoServicio: string;
    baseImponible: number;
    nomenclatura: string;
}

export const VehiculoScreen = ({navigation,route}:Props) => {

        const { vehiculos, setCuotas} = useContext(DatosContext);
        const {user} = useContext(UserContext);
        const datos ={
            dominio:route.params.dominio,
            tipo:route.params.tipo,
            vencimiento: "2023-03-28T15:46:20.265Z"
        }

        const [info, setInfo] = useState<Info | null>(null);
        const [deuda, setDeuda] = useState(null);
        const { makePost, data} = useFetch();
       
        const renderItem = (item:ListProps)=> {return (<TableItem item={item} pantalla={'Vehiculo'} setData={setInfo} deuda={deuda} navigation={navigation}/>)};  
        const keyExtractor = (item:Vehiculo, index:number)=> `${item.dominio}${index}` 

        useEffect(() => {
            makePost('/vehiculos/traerCuotas',datos, user?.token, 'deudas' )
        }, [])

        useEffect(()=>{
            //! aca pido la data de la deuda y la seteo en el state de deuda
            if(data){
                console.log('estas son los inmuebles',vehiculos);
                const checkedCuotas = data.deudas.cuotas.map((cuota:Cuota)=>{
                    return {
                        ...cuota,
                        checked:false
                    }
                })
                setDeuda(data);
                setCuotas(checkedCuotas);
            }
        },[data])

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
            {
             deuda ? 
             <>
                   <Text
                    mt={7}
                    alignSelf={'center'}
                    fontWeight={'bold'} 
                    fontSize={'2xl'}>
                    MIS VEHICULOS
                </Text>
                <Button 
                    onPress={()=> navigation.navigate('CrearInmueble')}
                    height={'30px'}
                    py={0}
                    px={4}
                    mt={2}
                    borderRadius={'3xl'}
                    alignSelf={'center'}
                    backgroundColor={'gray.500'}
                    >
                    <Text fontWeight={'bold'} fontSize={'sm'} color={'white'}>AGREGAR INMUEBLE</Text>
                </Button>
               {
                vehiculos ? (
                  <>
                      <Box mt={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                        <Text width={'40%'} fontSize={'12px'} textAlign={'center'} fontWeight={'bold'}>
                            REFERENCIA
                        </Text>
                        <Text width={'40%'} fontSize={'12px'}  textAlign={'center'} fontWeight={'bold'}>
                            DEUDA
                        </Text>
                        <Text width={'20%'} fontSize={'12px'}  textAlign={'center'} fontWeight={'bold'}>
                            PAGAR
                        </Text>
                        </Box>
                            <Divider mt={1}/>
                        <Box height={'56'}>
                                <FlatList
                                    data={vehiculos}
                                    renderItem={renderItem}
                                    keyExtractor={keyExtractor}
                                />
                        </Box>
                  </>
                )
                : 
                (
                    <Text>No hay inmuebles</Text>
                )
               }
                    
                <Box mt={5}>
                    {
                        info ? 
                        <>
                            <Box 
                            height={'10'}
                            display={'flex'} 
                            flexDirection={'row'} 
                            borderWidth={1}
                            borderColor={'cyan.500'} 
                            width={'80%'}
                            shadow={'6'}
                            backgroundColor={'white'}
                            borderRadius={'3xl'} 
                            alignSelf={'center'}
                            alignItems={'center'}
                            zIndex={200}
                            justifyContent={'space-evenly'}>
                                <Pressable 
                                    height={4}
                                    borderWidth={2}
                                    borderColor={'cyan.500'} 
                                    borderRadius={'4'}
                                    alignItems={'center'}
                                    justifyContent={'center'} 
                                    width={4}>
                                        <Icon name={'information-variant'} size={12}/>
                                </Pressable>
                                <Text fontWeight={'bold'} fontSize={13} color={'cyan.500'}>Información del inmueble</Text>
                                </Box>
                                <Box mt={7} width={'90%'} borderColor={'cyan.500'} borderRadius={'md'} borderWidth={1} position={'absolute'} alignSelf={'center'} zIndex={10}>
                                    <Box mt={5} flexDirection={'row'}>
                                        <Text ml={2} fontSize={12} fontWeight={'bold'} color={'cyan.500'}>Cuenta municipal :</Text>
                                        <Text ml={2}>{info.cuentaMunicipal}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Partida provincial :</Text>
                                        <Text ml={2}>{info.partidaPovincial}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontSize={12} fontWeight={'bold'} color={'cyan.500'}>Categoria :</Text>
                                        <Text ml={2}>{info.categoria}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontSize={12} fontWeight={'bold'} color={'cyan.500'}>Código de servicio :</Text>
                                        <Text ml={2}>{info.codigoServicio}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Base imponible :</Text>
                                        <Text ml={2}>{info.baseImponible}</Text>
                                    </Box>
                                    <Box mt={1} mb={3} flexDirection={'row'}>
                                        <Text ml={2} fontSize={12} fontWeight={'bold'} color={'cyan.500'}>N/ catastral :</Text>
                                        <Text ml={1} fontSize={12} >{info.nomenclatura}</Text>
                                    </Box>
                            </Box>
                        </>
                        :
                        null
                    }
                </Box>
             </>
             :
             <Center flex={1}>
                <Spinner size={50} color={'cyan.400'} />
                <Text mt={5} fontSize={18} fontWeight={'bold'}>
                    Cargando la Informacion
                </Text>
             </Center>
            }
                <CustomModal/>
        </Box>
    </Box>
  )
}
