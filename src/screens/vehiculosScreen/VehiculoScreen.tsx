import React, { useContext, useState, useEffect } from 'react'
import { Text, Box, Divider, Button,Pressable, Center, FlatList, ScrollView, Spinner } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { TableItem } from '../../components/TableItem';
import { CustomModal } from '../../components/CustomModal';
import { DatosContext, Vehiculo } from '../../context/datos/DatosContext';

interface Props {
    navigation: StackNavigationProp<RootStackParams, "Vehiculo", undefined>,
    route:any
}
interface ListProps{
    index:number,
    item:Vehiculo
}
export interface InfoVehiculo {
    modal:boolean,
    tipoModal:string,
    referencia:string,
    dominioActual: string,
    dominioOriginal:string,
    modelo:string,
    marca: string,
    año: number,
    tipo: any,
}

export const VehiculoScreen = ({navigation,route}:Props) => {

    const { vehiculos} = useContext(DatosContext);
    const [info, setInfo] = useState<InfoVehiculo | null>(null);
    const renderItem = (item:ListProps)=> {return (<TableItem item={item} pantalla={'Vehiculo'} setData={setInfo} navigation={navigation}/>)};  
    const keyExtractor = (item:Vehiculo, index:number)=> `${item.dominio}${index}` 


  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
          
             <>
                   <Text
                    mt={7}
                    alignSelf={'center'}
                    fontWeight={'bold'} 
                    fontSize={'2xl'}>
                    MIS VEHICULOS
                </Text>
                <Button 
                    onPress={()=> navigation.navigate('CrearVehiculo',{vehiculos})}
                    height={'30px'}
                    py={0}
                    px={4}
                    mt={2}
                    borderRadius={'3xl'}
                    alignSelf={'center'}
                    backgroundColor={'gray.500'}
                    >
                    <Text fontWeight={'bold'} fontSize={'sm'} color={'white'}>AGREGAR VEHICULO</Text>
                </Button>
               {
                vehiculos && vehiculos.length ? (
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
                    <Center flex={1}>
                        <Text fontSize={20} color={'cyan.500'}>No hay vehiculos registrados</Text>
                    </Center>
                )
               }
               
             </>
            
             <Box mt={5}>
                    {
                    info ? 
                        <>
                            <CustomModal info={info} setData={setInfo} />
                        </>
                        :
                        null
                    }
                </Box>
        </Box>
    </Box>
  )
}
