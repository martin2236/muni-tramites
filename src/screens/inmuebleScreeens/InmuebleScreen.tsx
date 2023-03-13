import React, { useContext } from 'react'
import { Text, Box, Divider, Button,Pressable, Center, FlatList } from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import {Inmuebles, UserContext } from '../../context/Usercontext';
import { TableItem } from '../../components/TableItem';

interface Props extends StackScreenProps<RootStackParams,'Inmueble'>{}

export const InmuebleScreen = ({navigation}:Props) => {

        const {inmuebles, setInmuebles} = useContext(UserContext);

        var renderItem = (item:Inmuebles)=> (<TableItem nombre={item.nombre} cuenta={item.cuenta} deuda={item.deuda}/>);  
        var keyExtractor = (item:Inmuebles, index:number)=> `${item.id}${index}` 

        console.log('estos son los inmuebles ', inmuebles)

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
                <FlatList
                    data={inmuebles}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
                    {/*BORRAR DESDE ACA*/}
                <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text textAlign={'center'} fontSize={12}>
                            Depto Toninas
                        </Text>
                        <Pressable 
                            
                            height={4}
                            borderWidth={1}
                            borderColor={'purple.800'} 
                            borderRadius={'4'}
                            alignItems={'center'}
                            justifyContent={'center'} 
                            width={4}>
                                <Icon name={'pencil'} size={12}/>
                        </Pressable>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                        <Text textAlign={'center'} fontSize={12}>
                            456254/4
                        </Text>
                        <Pressable 
                            height={4}
                            borderWidth={1}
                            borderColor={'purple.800'} 
                            borderRadius={'4'}
                            alignItems={'center'}
                            justifyContent={'center'} 
                            width={4}>
                                <Icon name={'information-variant'} size={12}/>
                        </Pressable>
                    </Box>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                        <Text textAlign={'center'} fontSize={12} fontWeight={'bold'}>
                            $ 25.654
                        </Text>
                    </Box>
                    <Box width={'10%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Pressable 
                            alignSelf={'center'}
                            ml={1}
                            height={4}
                            backgroundColor={'#2596be'}
                            borderRadius={'4'} 
                            alignItems={'center'}
                            justifyContent={'center'} 
                            width={4}>
                                <Icon name={'printer'} color={'#fff'} size={14}/>
                        </Pressable>
                    </Box>
                </Box>
                <Divider mt={1}/>
                <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Pressable
                        onPress={()=> navigation.navigate('VerInmueble')}>
                            <Text textAlign={'center'} fontSize={12}>
                                Mi casa
                            </Text>
                        </Pressable>
                        <Pressable 
                            height={4}
                            borderWidth={1}
                            borderColor={'purple.800'} 
                            borderRadius={'4'}
                            alignItems={'center'}
                            justifyContent={'center'} 
                            width={4}>
                                <Icon name={'pencil'} size={12}/>
                        </Pressable>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                        <Text textAlign={'center'} fontSize={12}>
                            456254/4
                        </Text>
                        <Pressable 
                            height={4}
                            borderWidth={1}
                            borderColor={'purple.800'} 
                            borderRadius={'4'}
                            alignItems={'center'}
                            justifyContent={'center'} 
                            width={4}>
                                <Icon name={'information-variant'} size={12}/>
                        </Pressable>
                    </Box>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                        <Text textAlign={'center'} fontSize={12} fontWeight={'bold'}>
                            $ 44.200
                        </Text>
                    </Box>
                    <Box width={'10%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Pressable 
                            alignSelf={'center'}
                            ml={1}
                            height={4}
                            backgroundColor={'#2596be'}
                            borderRadius={'4'} 
                            alignItems={'center'}
                            justifyContent={'center'} 
                            width={4}>
                                <Icon name={'printer'} color={'#fff'} size={14}/>
                        </Pressable>
                    </Box>
                </Box>
                <Divider mt={1}/>
                <Box mt={10}>
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
                            <Text ml={2}>153423/4</Text>
                        </Box>
                        <Box mt={1} flexDirection={'row'}>
                            <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Partida provincial :</Text>
                            <Text ml={2}>153423</Text>
                        </Box>
                        <Box mt={1} flexDirection={'row'}>
                            <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Categoria :</Text>
                            <Text ml={2}>UrbanoEdificado</Text>
                        </Box>
                        <Box mt={1} flexDirection={'row'}>
                            <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Código de servicio :</Text>
                            <Text ml={2}>luz Merc C/Ab</Text>
                        </Box>
                        <Box mt={1} flexDirection={'row'}>
                            <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Base imponible :</Text>
                            <Text ml={2}>1342343</Text>
                        </Box>
                        <Box mt={1} flexDirection={'row'}>
                            <Text ml={2} fontWeight={'bold'} color={'cyan.500'}>Nomenclatura catastral :</Text>
                            <Text ml={1} fontSize={12} >IV-J-0159-0011-5-0000----</Text>
                        </Box>
                    </Box>
                </Box>
        </Box>
    </Box>
  )
}
