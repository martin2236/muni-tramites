import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Box, Pressable, Center, Text, Divider } from 'native-base'
import React from 'react'



export const DrawerMenu = ({navigation}:DrawerContentComponentProps) => {
  return (
    <Box>
        <Center>
            <Pressable height={'10'} mt={5} mb={2}  justifyContent={'center'} width={'full'}>
              <Text textAlign={'center'} fontSize={17} fontWeight={'bold'}>Cambiar contraseña</Text>
            </Pressable>
            <Divider width={'80%'} mb={2} />
            <Pressable height={'10'} mb={2}  justifyContent={'center'} width={'full'}>
              <Text textAlign={'center'} fontSize={17} fontWeight={'bold'}>Notificaciones</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>
            <Pressable height={'10'} mb={2} justifyContent={'center'} width={'full'}>
              <Text textAlign={'center'} fontSize={17} fontWeight={'bold'}>Medios de pago</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>
            <Pressable height={'10'} mb={2} justifyContent={'center'} width={'full'}>
              <Text textAlign={'center'} fontSize={17} fontWeight={'bold'}>Oficinas</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>
            <Pressable height={'10'} mb={2}  justifyContent={'center'} width={'full'}>
              <Text textAlign={'center'} fontSize={17} fontWeight={'bold'}>Contacto</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>
            <Pressable onPress={()=> navigation.navigate('Login')} height={'10'} mb={2}  justifyContent={'center'} width={'full'}>
              <Text textAlign={'center'} fontSize={17} fontWeight={'bold'}>Cerrar sesión</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>
        </Center>
    </Box>
  )
}
