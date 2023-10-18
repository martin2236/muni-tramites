import React from 'react'
import {Box, Text, Divider,Checkbox, CheckIcon} from 'native-base'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import { background } from '../../App';

export const NotificacionesScreen = () => {
  const {R18,R14} = useResponsiveSize();
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
              <Box height={'16'} width={'100%'} bg={'gray.50'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Box width={'50%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Text ml={3} fontSize={20}>Total :</Text>
                    <Text fontSize={20} ml={1} fontWeight={'bold'}>3</Text>

                    <Text ml={2} fontSize={20}>Sin leer :</Text>
                    <Text fontSize={20} fontWeight={'bold'} ml={1}>3</Text>
                </Box>
                <Box>
                    <Icon name="reload" size={25} color={'#000'}/>
                </Box>
              </Box>
              <Box width={'100%'} mt={3} flexDir={'column'} alignItems={'center'} justifyContent={'space-between'}>
                <Box width={'100%'} mt={3} px={4} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Checkbox  value={'nuevo'} accessibilityLabel='nuevo'/>
                  <Icon name="trash-can-outline" size={25}/>
                </Box>

                <Box mt={5} width={'100%'} bg={'gray.50'} height={'20'} flexDir={'row'}>
                  <Box width={'10%'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Checkbox ml={1} value={'nuevo'} accessibilityLabel='nuevo'/>
                  </Box>
                  <Box width={'90%'} justifyContent={'center'} flexDir={'column'}>
                    <Text fontSize={R18} fontWeight={'bold'}  color={background}>Patente Automotor</Text>
                    <Text fontSize={R14}>Ya se encuentra disponible para el pago ...</Text>
                  </Box>
                </Box>
                <Divider width={'80%'}mb={2}/>

                <Box width={'100%'} bg={'gray.50'} height={'20'} flexDir={'row'}>
                  <Box width={'10%'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Checkbox ml={1} value={'nuevo'} accessibilityLabel='nuevo'/>
                  </Box>
                  <Box width={'90%'} justifyContent={'center'} flexDir={'column'}>
                    <Text fontSize={R18} fontWeight={'bold'}  color={background}>Grandes Contribuyentes</Text>
                    <Text fontSize={R14}>Recuerda realizar la presentacion de la ...</Text>
                  </Box>
                </Box>
                <Divider width={'80%'}mb={2}/>

                <Box width={'100%'} bg={'gray.50'} height={'20'} flexDir={'row'}>
                  <Box width={'10%'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Checkbox ml={1} value={'nuevo'} accessibilityLabel='nuevo'/>
                  </Box>
                  <Box width={'90%'} justifyContent={'center'} flexDir={'column'}>
                    <Text fontSize={R18} fontWeight={'bold'} color={background}>Comercios</Text>
                    <Text fontSize={R14}>El 30/10/2023 es el último dia para realizar ...</Text>
                  </Box>
                </Box>
                <Divider width={'80%'}mb={2}/>
              </Box>
              
        </Box>
    </Box>
  )
}
