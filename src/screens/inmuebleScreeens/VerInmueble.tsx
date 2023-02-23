import React, { useState } from 'react'
import { Divider, Box, Text, Pressable, Checkbox, Button } from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const VerInmueble = () => {
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(false)
    const handlePress = () =>{
        setShow(show => !show)
    }
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
            <Box alignSelf={'center'} width={'95%'} justifyContent={'center'} mt={5}>
                <Box 
                    position={'absolute'}
                    zIndex={100}
                    width={'50px'}
                    height={'50px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'full'}
                    backgroundColor={'purple.800'}>
                    <Icon name={'home-city'} size={30} color={'#fff'}/>
                </Box>
                <Box 
                    zIndex={10}
                    alignSelf={'flex-end'}
                    width={'90%'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    backgroundColor={'purple.300'}>
                    <Text width={'30%'} textAlign={'center'} fontSize={13} fontWeight={'bold'}>
                        REFERENCIA
                    </Text>
                    <Text width={'30%'} textAlign={'center'} fontSize={13} fontWeight={'bold'}>
                        CUENTA
                    </Text>
                    <Text width={'30%'} textAlign={'center'} fontSize={13} fontWeight={'bold'}>
                        PARTIDA
                    </Text>
                </Box>
                <Box 
                    mt={'0.5'}
                    zIndex={10}
                    alignSelf={'flex-end'}
                    width={'90%'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    backgroundColor={'purple.300'}>
                    <Text width={'30%'} textAlign={'center'}>
                        Mi casa
                    </Text>
                    <Text width={'30%'} textAlign={'center'}>
                        456254/4
                    </Text>
                    <Text width={'30%'} textAlign={'center'}>
                        123223
                    </Text>
                </Box>
            </Box>
            <Box mt={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'15%'} textAlign={'center'} fontWeight={'bold'}>
                        AÑO
                    </Text>
                    <Text width={'27%'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        IMPORTE ORIGINAL
                    </Text>
                    <Text width={'27%'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        IMPORTE ACTUALIZADO
                    </Text>
                    <Text width={'27%'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        TOTAL A PAGAR
                    </Text>
                </Box>
                <Divider mt={1} height={0.5}/>
                <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box width={'15%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Pressable width={'100%'} flexDirection={'row'}>
                            <Icon name={'chevron-right'} size={15} color={'purple'}/>
                            <Text textAlign={'center'} fontSize={12}>
                                2020
                            </Text>
                        </Pressable>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={12} >
                            $1.242.020
                        </Text>
                    </Box>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <Text textAlign={'center'} fontSize={12} fontWeight={'bold'}>
                            $ 0
                        </Text>
                    </Box>
                    <Box width={'20%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={12} >
                            $1.242.020
                        </Text>
                    </Box>
                </Box>
                <Divider mt={1}/>
                {/*************ROWS REPETIDOS***************/}
                <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box width={'15%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Pressable width={'100%'} flexDirection={'row'}>
                            <Icon name={'chevron-right'} size={15} color={'purple'}/>
                            <Text textAlign={'center'} fontSize={12}>
                                2021
                            </Text>
                        </Pressable>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={12} >
                            $42.020
                        </Text>
                    </Box>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <Text textAlign={'center'} fontSize={12} fontWeight={'bold'}>
                            $ 0
                        </Text>
                    </Box>
                    <Box width={'20%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={12} >
                            $42.020
                        </Text>
                    </Box>
                </Box>
                <Divider mt={1}/>
                <Box bg={show ? 'purple.300' : 'white'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Box  width={'15%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Pressable onPress={()=> handlePress()} width={'100%'} flexDirection={'row'}>
                            <Icon name={ show ?'chevron-down' : 'chevron-right' } size={15} color={'purple'}/>
                            <Text textAlign={'center'} fontSize={12}>
                                2022
                            </Text>
                        </Pressable>
                    </Box>
                    <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={12} >
                            $55.320
                        </Text>
                    </Box>
                    <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <Text textAlign={'center'} fontSize={12} fontWeight={'bold'}>
                            $ 0
                        </Text>
                    </Box>
                    <Box width={'20%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Text textAlign={'center'} fontSize={12} >
                            $55.320
                        </Text>
                    </Box>
                </Box>
                <Divider mt={1}/>

                {/********************MOSTRAR DEUDA*************************/}
                    { show?
                    <>
                         <Box  mt={2} alignSelf={'center'} width={'95%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                    <Text width={'24%'} color={'purple.800'} textAlign={'center'} fontWeight={'bold'}>
                        CUOTA
                    </Text>
                    <Text width={'28%'} color={'purple.800'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        VENCIMIENTO
                    </Text>
                    <Text width={'24%'} color={'purple.800'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        ESTADO
                    </Text>
                    <Text width={'24%'} color={'purple.800'} textAlign={'center'} fontWeight={'bold'} lineHeight={'sm'}>
                        TOTAL
                    </Text>
                </Box>
                <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' defaultIsChecked={true} accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={12}>
                                    11/2020
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                05/12/2020
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'} >
                            <Text textAlign={'center'} fontSize={12} >
                                impago
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                $3000
                            </Text>
                        </Box>
                    </Box>

                    {/*************ROWS REPETIDOS******************/}

                    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={12}>
                                    11/2020
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                05/12/2020
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'} >
                            <Text textAlign={'center'} fontSize={12} >
                                impago
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                $3000
                            </Text>
                        </Box>
                    </Box>
                    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={12}>
                                    11/2020
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                05/12/2020
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'} >
                            <Text textAlign={'center'} fontSize={12} >
                                impago
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                $3000
                            </Text>
                        </Box>
                    </Box>
                    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={12}>
                                    11/2020
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                05/12/2020
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'} >
                            <Text textAlign={'center'} fontSize={12} >
                                impago
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                $3000
                            </Text>
                        </Box>
                    </Box>
                    <Box mt={2} bg={'gray.200'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Text color={'purple.800'} fontWeight={'bold'}>
                            TOTAL A PAGAR
                        </Text>
                        <Text width={"27%"} textAlign={'center'} color={'purple.800'} fontWeight={'bold'}>
                            $3000
                        </Text>
                    </Box>
                    </>
                    : null}
                {/*********************METODOS DE PAGO************/}
                    <Box width={'70%'} mt={5} alignSelf={'center'} >
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={12} fontWeight={'bold'} lineHeight={'sm'}>PAGAR CON TARJETA DE CREDITO/DEBITO</Text>
                        </Box>
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={12} fontWeight={'bold'} lineHeight={'sm'}>INTERBANKING</Text>
                        </Box>
                        <Box flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                            <Checkbox value='nuevo' accessibilityLabel='algo2'/>
                            <Text width={'60%'} fontSize={12} fontWeight={'bold'} lineHeight={'sm'}>DESCARGAR/IMPRIMIR RECIBO PARA PAGO</Text>
                        </Box>
                    </Box>
                    <Button alignSelf={'center'} borderRadius={'2xl'} py={0} height={8} mt={3} backgroundColor={'purple.800'} width='30%'>
                        <Text color={'white'} my={0}>
                            PAGAR
                        </Text>
                    </Button>
                </Box>
            </Box>
        )
    }
