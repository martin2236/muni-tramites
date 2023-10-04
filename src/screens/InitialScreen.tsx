import React from 'react';
import {Text, Spinner, Center} from 'native-base'
import { useResponsiveSize } from '../hooks/useResponsiveSize';

export const InitialScreen = () => {
    const {R20} = useResponsiveSize()
  return (
        <Center display={'flex'} flex={1}>
            <Text fontSize={R20} color={'cyan.500'}>Cargando configuraciones...</Text>
            <Spinner size={60} color={'cyan.500'}/>
        </Center>
  )
}

