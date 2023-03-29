import React, { useState } from 'react';
import {View} from 'react-native';
import { Divider, Box, Text, Pressable, Checkbox, Button, ScrollView } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { RowOne } from '../../components/fakeRowOne/rowOne';
import { RowTwo } from '../../components/fakeRowOne/RowTwo';
import { RowThree } from '../../components/fakeRowOne/RowThree';
import { RowFour } from '../../components/fakeRowOne/RowFour';
import { RowFive } from '../../components/fakeRowOne/RowFive';
import { RowSeven } from '../../components/fakeRowOne/RowSeven';
import { RowEight } from '../../components/fakeRowOne/RowEight';
import { RowNine } from '../../components/fakeRowOne/RowNine';
import { RowTen } from '../../components/fakeRowOne/RowTen';
import { RowEleven } from '../../components/fakeRowOne/RowEleven';
import { RowTwelve } from '../../components/fakeRowOne/RowTwelve';
import { RowSix } from '../../components/fakeRowOne/RowSix';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams,'VerInmueble'>{}

export const VerInmueble = ({navigation, route}:Props) => {
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(false)
    const handlePress = () =>{
        setShow(show => !show)
    }
    const datos =  route.params;

    console.log(datos!.deuda.cuotas)
    
    
    const infoByAnio = {};

    datos!.deuda.cuotas.forEach( item => {
    if (!infoByAnio[item.anio]) {
        infoByAnio[item.anio] = [];
    }
    infoByAnio[item.anio].push(item);
    });

    console.log(infoByAnio);


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
                MIS INMUEBLES
            </Text>
            <Box alignSelf={'center'} width={'95%'} justifyContent={'center'} mt={5}>
                <Box 
                    position={'absolute'}
                    zIndex={100}
                    width={'60px'}
                    height={'60px'}
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
                    <Text  width={'30%'}  fontSize={10} fontWeight={'bold'}>
                        REFERENCIA
                    </Text>
                    <Text width={'30%'} textAlign={'center'} fontSize={10} fontWeight={'bold'}>
                        {datos!.referencia}
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
                    <Text  width={'30%'} fontWeight={'bold'} fontSize={10} >
                        CUENTA
                    </Text>
                    <Text width={'30%'} fontSize={10} textAlign={'center'}>
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
                    <Text width={'30%'} fontWeight={'bold'} fontSize={10} >
                        PARTIDA
                    </Text>
                    <Text width={'30%'} fontSize={10} textAlign={'center'}>
                        157420
                    </Text>
                </Box>
            </Box>
            <Box mt={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'15%'} fontSize={10} textAlign={'center'} fontWeight={'bold'}>
                        AÑO
                    </Text>
                    <Text width={'29%'} fontSize={10} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        IMPORTE ORIGINAL
                    </Text>
                    <Text width={'29%'} fontSize={10} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        IMPORTE ACTUALIZADO
                    </Text>
                    <Text width={'27%'} fontSize={10} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        TOTAL A PAGAR
                    </Text>
                </Box>
                <Divider mt={1} height={0.5}/>
                <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box width={'17%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Pressable width={'100%'} flexDirection={'row'}>
                            <Icon name={'chevron-right'} size={15} color={'cyan'}/>
                            <Text textAlign={'center'} fontSize={10}>
                                2020
                            </Text>
                        </Pressable>
                    </Box>
                    <Box width={'29%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={10} >
                            $0
                        </Text>
                    </Box>
                    <Box width={'29%'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <Text textAlign={'center'} fontSize={10} fontWeight={'bold'}>
                            $ 0
                        </Text>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={10} >
                            $0
                        </Text>
                    </Box>
                </Box>
                <Divider mt={1}/>
                {/*************ROWS REPETIDOS***************/}
                <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box width={'17%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Pressable width={'100%'} flexDirection={'row'}>
                            <Icon name={'chevron-right'} size={15} color={'cyan'}/>
                            <Text textAlign={'center'} fontSize={10}>
                                2021
                            </Text>
                        </Pressable>
                    </Box>
                    <Box width={'29%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={10} >
                            $0
                        </Text>
                    </Box>
                    <Box width={'29%'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <Text textAlign={'center'} fontSize={10} fontWeight={'bold'}>
                            $ 0
                        </Text>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={10} >
                            $0
                        </Text>
                    </Box>
                </Box>
                <Divider mt={1}/>
                <Box bg={show ? 'gray.300' : 'white'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Pressable onPress={()=> handlePress()} width={'17%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box  width={'100%'} flexDirection={'row'}>
                            <Icon name={ show ?'chevron-down' : 'chevron-right' } size={15} color={'cyan'}/>
                            <Text textAlign={'center'} fontSize={10}>
                                2022
                            </Text>
                        </Box>
                    </Pressable>
                    <Box width={'29%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={10} >
                            $10.000
                        </Text>
                    </Box>
                    <Box width={'29%'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <Text textAlign={'center'} fontSize={10} fontWeight={'bold'}>
                            $ 0
                        </Text>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={10} >
                            $10.000
                        </Text>
                    </Box>
                </Box>
                <Divider mt={1}/>

                {/********************MOSTRAR DEUDA*************************/}
                    { show?
                    <Animatable.View animation='fadeInDown' style={{backgroundColor:'white'}}>
                         <Box  mt={2} alignSelf={'center'} width={'95%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'24%'}fontSize={10} color={'#2596be'} textAlign={'center'} fontWeight={'bold'}>
                        CUOTA
                    </Text>
                    <Text width={'28%'} fontSize={10} color={'#2596be'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        VENCIMIENTO.
                    </Text>
                    
                    <Text width={'24%'} fontSize={10} color={'#2596be'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        TOTAL
                    </Text>
                </Box>
                       <ScrollView height={'40'} >

                       <RowOne/>
                       <Divider mt={1}/>

                       <RowTwo/>
                       <Divider mt={1}/>

                       <RowThree/>
                       <Divider mt={1}/>

                       <RowFour/>
                       <Divider mt={1}/>

                       <RowFive/>
                       <Divider mt={1}/>

                       <RowSix/>
                       <Divider mt={1}/>

                       <RowSeven/>
                       <Divider mt={1}/>

                       <RowEight/>
                       <Divider mt={1}/>

                       <RowNine/>
                       <Divider mt={1}/>

                       <RowTen/>
                       <Divider mt={1}/>

                       <RowEleven/>
                       <Divider mt={1}/>

                       <RowTwelve/>
                       <Divider mt={1}/>
                       
                       </ScrollView>

                        <Box mt={2} bg={'gray.300'} flexDirection={'row'} justifyContent={'flex-end'}>
                            <Text  fontSize={10} fontWeight={'bold'}>
                                TOTAL A PAGAR
                            </Text>
                            <Text width={"27%"} textAlign={'center'}  fontSize={10} fontWeight={'bold'}>
                                $10.000
                            </Text>
                        </Box>

                    
                    </Animatable.View>
                    : null}
                {/*********************METODOS DE PAGO************/}
                    <Box width={'80%'} mt={3} alignSelf={'center'} >
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={10} fontWeight={'bold'} lineHeight={'sm'}>PAGAR CON TARJETA DE CREDITO/DEBITO</Text>
                        </Box>
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={10} fontWeight={'bold'} lineHeight={'sm'}>DESCARGAR/IMPRIMIR RECIBO PARA PAGO</Text>
                        </Box>
                    </Box>
                    <Button onPress={()=> navigation.navigate('Pagos')} alignSelf={'center'} borderRadius={'2xl'} py={0} height={8} mt={3} backgroundColor={'#2596be'} width='30%'>
                        <Text color={'white'} fontSize={10} my={0}>
                            PAGAR
                        </Text>
                    </Button>
                </Box>
            </Box>
        )
    }
