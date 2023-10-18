import React, { useContext, useEffect,useState } from 'react';
import {Text, Spinner, Center} from 'native-base'
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<RootStackParams,'Inicio'>{}

export const InitialScreen = ({navigation}:Props) => {
    const {R20} = useResponsiveSize();

    useEffect(()=>{
      getCarouselStatus();
    },[]);

    const getCarouselStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('@carousel');
        console.log('datos guardados',value)
        if (value === null) {
         navigation.navigate('Carousel')
        }else{
          navigation.navigate('Login')
        }
      } catch (e) {
          console.log('no se pudo traer el value del storage')
        // error reading value
      }
    };
  return (
        <Center display={'flex'} flex={1}>
            <Text fontSize={R20} color={'cyan.500'}>Cargando configuraciones...</Text>
            <Spinner size={60} color={'cyan.500'}/>
        </Center>
  )
}

