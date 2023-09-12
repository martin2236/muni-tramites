import React from 'react'
import {Box, Text, Divider, ScrollView} from 'native-base'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useResponsiveSize } from '../hooks/useResponsiveSize';

export const MediosPagosScreen = () => {
  const {R18,R16} = useResponsiveSize();
  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box 
                height={'100%'}
                width={'90%'}  
                display={'flex'} 
                flexDir={'row'} 
                flexWrap={'wrap'} 
                justifyContent={'space-around'}
                alignSelf={'center'} 
                backgroundColor={'white'}>
            
            <Box flex={1} display={'flex'} flexDirection={'column'}>
            <ScrollView flex={1}>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='credit-card' size={25}/>
                <Text ml={3} fontSize={R18}>
                    TARJETAS DE CRÉDITO Y DÉBITO
                </Text>
              </Box>
              <Text ml={12} fontSize={R16}>
                Visa, Visa Electrón, Mastercard, American Express
              </Text>
              <Text ml={12} fontSize={R16}>
                En todas las delegaciones municipales con atención al público
              </Text>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='bank-check' size={25}/>
                <Text ml={3} fontSize={R18}>
                  ENTIDADES BANCARIAS
              </Text>
              </Box>
              
              <Text ml={12} fontSize={R16}>
                Banco Provincia, Banco Nación, Banco Ciudad, Banco Itaú
              </Text>
              <Box>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='cash' size={25}/>
                <Text ml={3} fontSize={R18}>
                  MEDIOS DE PAGO
              </Text>
              </Box>
                
              </Box>
              
              <Text ml={12} fontSize={R16}>
                Pago fácil, Provincia NET, Rapipago, Ripsa, Cobro Express, Pronto Pago, E-Pagos, Brubank
              </Text>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='cash-fast' size={25}/>
                <Text ml={3} fontSize={R18}>
                  DEBITO AUTOMÁTICO
              </Text>
              </Box>
              
              <Text ml={12} fontSize={R16}>
                A travéz de las tarjetas VISA Crédito y Débito, Mastercard y American Express o de CBU (Clave Única Bancaria)
              </Text>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='laptop' size={25}/>
                <Text ml={3} fontSize={R18}>
                  PAGOS POR INTERNET
              </Text>
              </Box>
              
              <Text ml={12} fontSize={R16}>
                A travéz de Red Link, Banelco, Interbanking, Pago Mis Cuentas y Visa Home
              </Text>
              </ScrollView>
            </Box>
            
        </Box>
    </Box>
  )
}
