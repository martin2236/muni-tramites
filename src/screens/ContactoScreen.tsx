import React from 'react'
import {Box, Text, Divider} from 'native-base'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const ContactoScreen = () => {
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
           <Box width={'100%'}>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='whatsapp' size={25}/>
                <Text ml={3} fontSize={18}>
                  VIA WHATSAPP
                </Text>
              </Box>
                <Text mt={2} ml={'12'}>
                  2246 580442
                </Text>
                <Text mt={2} ml={'12'}>
                  2246 501000
                </Text>
                <Text mt={2} ml={'12'}>
                  2246 557480
                </Text>
                <Text mt={2} ml={'12'}>
                  2246 409587
                </Text>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='phone' size={25}/>
                <Text ml={3} fontSize={18}>
                  VIA TELEFÓNICA (lunes a viernes de 9 a 14 hs)
                </Text>
              </Box>
              
              <Text mt={2} ml={12}>
                  2246 580442
                </Text>
                <Text mt={2} ml={12}>
                  2246 501000
                </Text>
                <Text mt={2} ml={12}>
                  2246 557480
                </Text>
                <Text mt={2} ml={12}>
                  2246 409587
                </Text>
              <Box mt={5} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='email' size={25}/>
                <Text ml={3} fontSize={18}>
                VIA CORREO ELECTRONICO
                </Text>
              </Box>
              <Text mt={2} ml={12}>
                  atenciónadistacia@lacosta.gob.ar
                </Text>
                <Text mt={2} ml={12}>
                  contribuyentes@lacosta.gob.ar
                </Text>
                <Text mt={2} ml={12}>
                  recursos@lacosta.gob.ar
                </Text>
                <Text mt={2} ml={12}>
                  consultadeuda@lacosta.gob.ar
                </Text>
                <Text mt={2} ml={12}>
                  recaudaciones@lacosta.gob.ar
                </Text>
                <Text mt={2} ml={12}>
                  catastro@lacosta.gob.ar
                </Text>
                <Text mt={2} ml={12}>
                  patentes@lacosta.gob.ar
                </Text>
           </Box>
        </Box>
    </Box>
  )
}
