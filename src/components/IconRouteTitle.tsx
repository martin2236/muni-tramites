import React from 'react'
import {Box, Text} from 'native-base'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
interface Props{
    icono:string
    titulo:string
}

export const IconRouteTitle = ({icono, titulo}:Props) => {
  const {R18, textoTitulo} = useResponsiveSize();
  return (
    <Box 
    ml={2}
        flexDirection={'row'} 
        alignItems={'center'}>
            <Icon 
                mr={2} 
                name={icono}
                size={25} 
                color="#fff" />
                <Text 
                    ml={2} 
                    fontSize={textoTitulo} 
                    fontWeight={'bold'} 
                    color={'white'}>
                        {titulo}
                </Text>
    </Box>
  )
}
