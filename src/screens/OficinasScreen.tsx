import React from 'react'
import {Box, Text, Divider, ScrollView} from 'native-base'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useResponsiveSize } from '../hooks/useResponsiveSize';

export const OficinasScreen = () => {
  const {textoTotal} = useResponsiveSize();
  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box
            height={'100%'}
            width={'90%'}  
            display={'flex'} 
            flexDir={'column'}
            alignSelf={'center'} 
            backgroundColor={'white'}>
              
          <ScrollView
          flex={1}
             display={'flex'} 
             flexDir={'column'}
             alignSelf={'center'}
             backgroundColor={'white'}>
              <Box mt={5} flex={1}>
                <Box  display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} fontSize={textoTotal}>MUNICIPALIDAD DE LA COSTA</Text>
                </Box>
                <Text ml={12}>Av. Costanera 8001 - Mar del Tuyú</Text>
                <Text mt={1} ml={12}>Tel: (02246) 433003 / 433025 / 433028 / 433036 / 433071</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3}  fontSize={textoTotal}>CASA DE LA COSTA / CABA</Text>
                </Box>
                <Text  ml={12}>Santiago del Estero N°318</Text>
                <Text mt={1} ml={12}>Tel: (011) 5256 4379 / 5256 4381</Text>
              </Box>
              <Box mt={5} flex={1} >
              <Box  display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                <Text mt={1} ml={3} maxWidth={'85%'} fontSize={textoTotal}>UNIDAD DE GESTIÓN SAN CLEMENTE DEL TUYÚ</Text>
              </Box>
                <Text ml={12}>Av San Martin N°481</Text>
                <Text ml={12}>Tel: (02252) 421280</Text>
              </Box>
              <Box mt={5} flex={1}>
                  <Box  display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} maxWidth={'90%'} fontSize={textoTotal}>UNIDAD DE GESTIÓN LAS TONINAS</Text>
                </Box>
                <Text ml={12}>Av 26 y rotonda</Text>
                <Text mt={1} ml={12}>Tel: (02246) 431079</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box  display={'flex'}  flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} pr={2} maxWidth={'85%'} fontSize={textoTotal}>UNIDAD DE GESTIÓN SANTA TERESITA</Text>
                </Box>
                <Text ml={12}>Calle 17 y 34</Text>
                <Text mt={1} ml={12}>Tel: (02246) 420909</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} pr={1} maxWidth={'85%'} fontSize={textoTotal}>UNIDAD DE GESTIÓN SANTA TERESITA / LAS QUINTAS</Text>
                </Box>
                <Text ml={12}>Calle 17 y 34</Text>
                <Text mt={1} ml={12}>Tel: (02246) 420909</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} pr={2} maxWidth={'90%'} fontSize={textoTotal}>UNIDAD DE GESTIÓN SAN BERNARDO</Text>
                </Box>
                <Text   ml={12}>Calle Falkner y Madariaga</Text>
                <Text mt={1} ml={12}>Tel: (02257) 460244 / 464817</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box  display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} pr={2} maxWidth={'85%'} fontSize={textoTotal}>UNIDAD DE GESTIÓN MAR DE AJÓ NORTE</Text>
                </Box>
                <Text ml={12}>Calle Entre Rios y San Juan</Text>
                <Text mt={1} ml={12}>Tel: (02246) 422248</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} pr={2} maxWidth={'90%'}  fontSize={textoTotal}>UNIDAD DE GESTIÓN MAR DE AJÓ</Text>
                </Box>
                <Text ml={12}>Calle Libres del Sur y Blanco Encalada</Text>
                <Text mt={1} ml={12}>Tel: (02246) 420292</Text>
              </Box>
              <Box mt={5} flex={1}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Icon style={{marginLeft:10}} name='map-marker-radius' size={25}/>
                  <Text ml={3} pr={2} maxWidth={'85%'}  fontSize={textoTotal}>UNIDAD DE GESTIÓN NUEVA ATLANTIS</Text>
                </Box>
                <Text ml={12}>Calle Rolda y Olmos</Text>
                <Text mt={1} ml={12} mb={10}>Tel: (02246) 420909</Text>
              </Box>
          </ScrollView>
        </Box>
    </Box>
  )
}

