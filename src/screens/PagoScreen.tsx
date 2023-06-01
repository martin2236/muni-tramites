import { useNavigation } from '@react-navigation/native'
import { Box, Button, Checkbox, CheckIcon, Divider, Image, Input, Select, Text } from 'native-base'
import React from 'react'
import { RootStackParams } from '../navigation/StackNavigation'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<RootStackParams,'Pagos'>{}

const visa = require('../assets/logo-visa.png')
const master = require('../assets/logo-master.png')

export const PagoScreen = ({navigation}:Props) => {
    const [service, setService] = React.useState("");
  return (
        <Box flex={1} backgroundColor={'gray.200'}>
            <Divider backgroundColor={'gray.600'} height={'1.5'}/>
            <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
            <Box 
            height={'100%'} 
            width={'90%'}
            flexDir={'column'}
            justifyContent={'space-between'}
            alignSelf={'center'} 
            backgroundColor={'white'}>
                <Box shadow={'9'} height={'35%'} bg={'white'} flexDirection={'column'} justifyContent={'space-around'}>
                    <Text ml={3}>
                        Mis Metodos de Pago
                    </Text>
                    
                    <Box height={'12'} flexDirection={'row'} justifyContent={'space-around'}  width={'90%'} alignSelf={'center'}  borderColor={'cyan.500'} borderRadius={'2xl'} borderWidth={'1'}>
                        <Image height={'10'} width={'10'} source={visa} alt={'visa'}/>
                        <Text mt={2} fontWeight={'bold'}> **** **** **** *068</Text>
                        <Checkbox borderRadius={'full'} colorScheme={'green'} onChange={() => navigation.navigate('FormularioPagos')}  mt={3} value={'algo'} accessibilityLabel='algo' />
                    </Box>
                    <Box height={'12'} mb={5} flexDirection={'row'} justifyContent={'space-around'}  width={'90%'} alignSelf={'center'}  borderColor={'cyan.500'} borderRadius={'2xl'} borderWidth={'1'}>
                        <Image height={'10'} width={'10'} source={master} alt={'visa'}/>
                        <Text mt={2} fontWeight={'bold'}> **** **** **** *235</Text>
                        <Checkbox borderRadius={'full'} onChange={() => navigation.navigate('FormularioPagos')}  mt={3} value={'algo'} accessibilityLabel='algo' />
                    </Box>
                </Box>
                <Box mb={5} bg={'white'}>
                    <Text ml={3}>
                        Agregar Nuevo
                    </Text>
                    <Select  selectedValue={service} borderRadius={'2xl'}  borderWidth={'1'}  borderColor={'cyan.500'} alignSelf={'center'} width={'90%'} placeholderTextColor={'black'} accessibilityLabel="Choose Service" placeholder="Master Card" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={5} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label='Master Card' value="ux" />
                    <Select.Item label="Visa" value="web" />
                    </Select>
                    <Input
                        mt={4}
                        type='text'
                        placeholder='Numero de Tarjeta'
                        borderRadius={'2xl'} borderWidth={'1'}  borderColor={'cyan.500'} alignSelf={'center'} width={'90%'} placeholderTextColor={'black'}
                    />
                    <Box width={'full'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'space-around'} alignItems={'center'}>
                        <Select  selectedValue={service} borderRadius={'2xl'} borderWidth={'1'}  borderColor={'cyan.500'} alignSelf={'center'} width={'150px'} placeholderTextColor={'black'} accessibilityLabel="Choose Service" placeholder="Fecha Vto" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={5} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label='Master Card' value="ux" />
                        <Select.Item label="Visa" value="web" />
                        </Select>

                        <Input
                        mt={4}
                        type='text'
                        placeholder='CVV'
                        borderRadius={'2xl'} borderWidth={'1'}  borderColor={'cyan.500'} alignSelf={'center'} width={'35%'} placeholderTextColor={'black'}
                    />
                    </Box>
                    <Button mt={'8'} borderRadius={'2xl'} bg={'gray.500'} alignSelf={'center'} width={'90%'}>
                        <Text color={'white'} fontWeight={'bold'} >
                            AGRAGAR NUEVO METODO
                        </Text>
                    </Button>
                </Box>
                
            </Box>
    </Box>
  )
}
