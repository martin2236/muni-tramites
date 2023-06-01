import React, { useContext, useState } from 'react';
import { Divider, Box, Text, Pressable, Checkbox, Button, ScrollView, FlatList } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import {DatosContext } from '../../context/datos/DatosContext';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Cuota } from '../../interfaces/inmuebles/deuda';
import { RowAnios } from '../../components/RowAnios';

interface Props extends StackScreenProps<RootStackParams,'VerComercio'>{}

export const VerComercioScreen = ({navigation, route}:Props) => {
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState([])
    const [totalSelected, setTotalSelected] = useState(0);
    const {cuotas} = useContext(DatosContext);
    const handlePress = () =>{
        setShow(show => !show)
    }
    const {deuda, referencia} =  route.params;
    console.log(cuotas)

    const infoByAnio = {};

    cuotas.forEach( (item:Cuota) => {
        //@ts-ignore
    if (!infoByAnio[item.anio]) {
        //@ts-ignore
        infoByAnio[item.anio] = [];
    }
    //@ts-ignore
    infoByAnio[item.anio].push(item);
    });
    const listaAnios = [];
    for (const key in infoByAnio) {
        //@ts-ignore
        listaAnios.push(infoByAnio[key]);
    }

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
    <Divider backgroundColor={'gray.600'} height={'1.5'}/>
    <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.500'} alignSelf={'center'}/>
        <Box 
            height={'100%'} 
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
            <Text
                mt={7}
                alignSelf={'center'}
                fontWeight={'bold'} 
                fontSize={20}>
                MIS COMERCIOS
            </Text>
            <Box alignSelf={'center'} width={'95%'} justifyContent={'center'} mt={5}>
                <Box 
                    position={'absolute'}
                    zIndex={100}
                    width={70}
                    height={70}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'full'}
                    backgroundColor={'#2596be'}>
                    <Icon name={'home'} size={50} color={'#fff'}/>
                </Box>
                <Box 
                    zIndex={10}
                    alignSelf={'flex-end'}
                    width={'90%'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    backgroundColor={'gray.300'}>
                    <Box width={'15%'}></Box>
                    <Text  width={'30%'}  fontSize={'sm'} fontWeight={'bold'}>
                        REFERENCIA
                    </Text>
                    <Text width={'30%'} textAlign={'center'} ellipsizeMode={'tail'} numberOfLines={1} fontSize={'sm'} fontWeight={'bold'}>
                        {referencia}
                    </Text>
                    
                </Box>
                <Box 
                    mt={'0.5'}
                    zIndex={10}
                    alignSelf={'flex-end'}
                    width={'90%'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    backgroundColor={'gray.300'}>
                        <Box width={'15%'}></Box>
                    <Text  width={'30%'} fontWeight={'bold'} fontSize={'sm'} >
                        CUENTA
                    </Text>
                    <Text width={'30%'} fontSize={'sm'} textAlign={'center'}>
                        456254/4
                    </Text>
                </Box>
                <Box 
                    mt={'0.5'}
                    zIndex={10}
                    alignSelf={'flex-end'}
                    width={'90%'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    backgroundColor={'gray.300'}>
                        <Box width={'15%'}></Box>
                    <Text width={'30%'} fontWeight={'bold'} fontSize={'sm'} >
                        PARTIDA
                    </Text>
                    <Text width={'30%'} fontSize={'sm'} textAlign={'center'}>
                        157420
                    </Text>
                </Box>
            </Box>
            <Box mt={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'15%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'}>
                        AÑO
                    </Text>
                    <Text width={'29%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                        IMPORTE ORIGINAL
                    </Text>
                    <Text width={'29%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                        IMPORTE ACTUALIZADO
                    </Text>
                    <Text width={'27%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                        TOTAL A PAGAR
                    </Text>
                </Box>
                <Divider mt={1} height={0.5}/>
                <Box height={'64'}>
                    <FlatList 
                        data={listaAnios}
                        keyExtractor={(item,index) => ` ${index}`}
                        renderItem={({item}) => <RowAnios item={item} setTotalSelected={setTotalSelected} selected={selected} setSelected={setSelected}/>}
                        nestedScrollEnabled={true}
                    />
                </Box>
                <Box mt={2} bg={'gray.300'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Text  fontSize={'sm'} fontWeight={'bold'}>
                            TOTAL A PAGAR
                        </Text>
                        <Text width={"27%"} textAlign={'center'}  fontSize={'sm'} fontWeight={'bold'}>
                            ${totalSelected.toFixed(2)}
                        </Text>
                    </Box>
              
                {/*********************METODOS DE PAGO************/}
                    <Box width={'80%'} mt={3} alignSelf={'center'} >
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={'sm'} fontWeight={'bold'} lineHeight={'sm'}>PAGAR CON TARJETA DE CREDITO/DEBITO</Text>
                        </Box>
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={'sm'} lineHeight={'sm'}>DESCARGAR/IMPRIMIR RECIBO PARA PAGO</Text>
                        </Box>
                    </Box>
                    <Button onPress={()=>navigation.navigate('Pagos')} alignSelf={'center'} borderRadius={'2xl'} py={0} height={8} mt={3} backgroundColor={'#2596be'} width='30%'>
                        <Text color={'white'} fontSize={'md'} my={0}>
                            PAGAR
                        </Text>
                    </Button>
                </Box>
            </Box>
        )
    }
