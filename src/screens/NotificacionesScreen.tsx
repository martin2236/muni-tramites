import React from 'react'
import {Box, Text, Divider} from 'native-base'

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
          <Text>
              Notificaciones
          </Text>
        </Box>
    </Box>
  )
}
