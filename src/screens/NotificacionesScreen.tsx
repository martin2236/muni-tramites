import React from 'react'
import {Box, Text, Divider,Checkbox, CheckIcon} from 'native-base'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const NotificacionesScreen = () => {
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
              <Box mt={5} width={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Box width={'50%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Text ml={3} fontSize={20}>Total :</Text>
                    <Text fontSize={20} ml={1} fontWeight={'bold'}>12</Text>

                    <Text ml={2} fontSize={20}>Sin leer :</Text>
                    <Text fontSize={20} fontWeight={'bold'} ml={1}>14</Text>
                </Box>
                <Box>
                    <Icon name="reload" size={25} color={'#000'}/>
                </Box>
              </Box>
              <Box>
                  <Checkbox value={'nuevo'}/>
                  <Icon name="trash-can-outline" size={25}/>
              </Box>
        </Box>
    </Box>
  )
}
