import React, { useContext, useState } from 'react'
import { Text, Box, Divider, Button,Pressable, Center, FlatList, ScrollView } from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import {Inmuebles, UserContext } from '../../context/Usercontext';
import { TableItem } from '../../components/TableItem';
import { CustomModal } from '../../components/CustomModal';

interface Props extends StackScreenProps<RootStackParams,'Inmueble'>{}
interface ListProps{
    index:number,
    item:Inmuebles
}
export interface Info {
    cuentaMunicipal: string;
    partidaPovincial: string;
    categoria: string;
    codigoServicio: string;
    baseImponible: number;
    nomenclaturaCatastral: string;
}


export const InmuebleScreen = ({navigation}:Props) => {

        const {inmuebles, setInmuebles ,modalVisible, setModalVisible} = useContext(UserContext);
        const [info, setInfo] = useState<Info | null>(null);

        var renderItem = (item:ListProps)=> {return (<TableItem item={item}  setData={setInfo}/>)};  
        var keyExtractor = (item:Inmuebles, index:number)=> `${item.id}${index}` 

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'purple.800'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'purple.600'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
                <Text
                    mt={7}
                    alignSelf={'center'}
                    color={'purple.800'}
                    fontWeight={'bold'} 
                    fontSize={20}>
                    MIS INMUEBLES
                </Text>
                <Button 
                    onPress={()=> navigation.navigate('CrearInmueble')}
                    height={'30px'}
                    p={0}
                    mt={2}
                    borderRadius={'3xl'}
                    alignSelf={'center'}
                    backgroundColor={'purple.800'}
                    width={'42%'}>
                    <Text fontWeight={'bold'}  color={'white'}>NUEVO INMUEBLE</Text>
                </Button>
                <Box mt={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'27%'} textAlign={'center'} fontWeight={'bold'}>
                        REFERENCIA
                    </Text>
                    <Text width={'25%'} textAlign={'center'} fontWeight={'bold'}>
                        CUENTA
                    </Text>
                    <Text width={'27%'} textAlign={'center'} fontWeight={'bold'}>
                        DEUDA TOTAL
                    </Text>
                    <Text width={'15%'} textAlign={'center'} fontWeight={'bold'}>
                        PAGAR
                    </Text>
                </Box>
                <Divider mt={1}/>
                <Box height={'56'}>
                        <FlatList
                            data={inmuebles}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                        />
                </Box>
                    
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
                            width={'60%'}
                            shadow={'6'}
                            backgroundColor={'white'}
                            borderRadius={'3xl'} 
                            alignSelf={'center'}
                            alignItems={'center'}
                            zIndex={200}
                            justifyContent={'space-around'}>
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
                                <Text fontWeight={'bold'} color={'cyan.500'}>Información del inmueble</Text>
                                </Box>
                                <Box mt={7} width={'90%'} borderColor={'cyan.500'} borderRadius={'md'} borderWidth={1} position={'absolute'} alignSelf={'center'} zIndex={10}>
                                    <Box mt={5} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Cuenta municipal :</Text>
                                        <Text ml={2}>{info.cuentaMunicipal}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Partida provincial :</Text>
                                        <Text ml={2}>{info.partidaPovincial}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Categoria :</Text>
                                        <Text ml={2}>{info.categoria}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Código de servicio :</Text>
                                        <Text ml={2}>{info.codigoServicio}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Base imponible :</Text>
                                        <Text ml={2}>{info.baseImponible}</Text>
                                    </Box>
                                    <Box mt={1} flexDirection={'row'}>
                                        <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Nomenclatura catastral :</Text>
                                        <Text ml={1} fontSize={12} >{info.nomenclaturaCatastral}</Text>
                                    </Box>
                            </Box>
                        </>
                        :
                        null
                    }
                </Box>
                <CustomModal/>
        </Box>
    </Box>
  )
}
