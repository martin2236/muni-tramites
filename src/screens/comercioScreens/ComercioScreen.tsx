import React, { useContext, useState} from 'react'
import { Text, Box, Divider, Button, Center, FlatList } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackNavigationProp} from '@react-navigation/stack';
import { TableItem } from '../../components/TableItem';
import { CustomModal } from '../../components/CustomModal';
import { DatosContext, Comercio } from '../../context/datos/DatosContext';

interface Props {
    navigation: StackNavigationProp<RootStackParams, "Comercio", undefined>,
    route:any
}
interface ListProps{
    index:number,
    item:Comercio
}
export interface InfoComercio {
    modal:boolean,
    tipoModal:string,
    referencia:string,
    numeroPadron: number,
    razonSocial:string,
    domicilio:string,
    habilitacion: string,
    condicion: string,
}

export const ComercioScreen = ({navigation,route}:Props) => {
    const { comercios} = useContext(DatosContext);
    const [info, setInfo] = useState<InfoComercio | null>(null);
    const renderItem = (item:ListProps)=> {return (<TableItem item={item} pantalla={'Comercio'} setData={setInfo} navigation={navigation}/>)};  
    const keyExtractor = (item:Comercio, index:number)=> `${item.padron}${index}` 

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
                    MIS COMERCIOS
                </Text>
                <Button 
                    onPress={()=> navigation.navigate('CrearComercio',{comercios})}
                    height={'30px'}
                    py={0}
                    px={4}
                    mt={2}
                    borderRadius={'3xl'}
                    alignSelf={'center'}
                    backgroundColor={'gray.500'}
                    >
                    <Text fontWeight={'bold'} fontSize={'sm'} color={'white'}>AGREGAR COMERCIO</Text>
                </Button>
               {
                comercios ? (
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
                                    data={comercios}
                                    renderItem={renderItem}
                                    keyExtractor={keyExtractor}
                                />
                        </Box>
                  </>
                )
                : 
                (
                    <Center flex={1}>
                        <Text fontSize={20} color={'cyan.500'}>No hay comercios registrados</Text>
                    </Center>
                )
               }
                    
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
             </>
        </Box>
    </Box>
  )
}
