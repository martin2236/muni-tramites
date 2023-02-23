import React from 'react'
import {Box, Text} from 'native-base'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
interface Props{
    icono:string
    titulo:string
}

export const IconRouteTitle = ({icono, titulo}:Props) => {
  return (
    <Box 
        flexDirection={'row'} 
        alignItems={'center'}>
            <Icon 
                mr={2} 
                name={icono}
                size={25} 
                color="#fff" />
                <Text 
                    ml={2} 
                    fontSize={22} 
                    fontWeight={'bold'} 
                    color={'white'}>
                        {titulo}
                </Text>
    </Box>
  )
}
