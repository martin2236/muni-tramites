import React, {useState} from 'react'
import {Box, Text, Divider, Input, Center, Button, Spinner} from 'native-base'
import { useResponsiveSize } from '../hooks/useResponsiveSize'
import { background } from '../../App'

export const ContraseñaScreen = () => {
  const [show, setShow] = useState(true)
  const [nuevaContraseña, setNuevaContraseña] = useState<string | null>(null)
  const {R18,customInputHeight} = useResponsiveSize();
  const onUpdate = () => {
    console.log(nuevaContraseña)
  }

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
            <Box
              flex={1}
            >
                <Text
                    mt={7}
                    alignSelf={'center'}
                    fontWeight={'bold'} 
                    fontSize={20}>
                    EDITAR CONTRASEÑA
                  </Text>
              {
                show ? 
                (<>
                 <Input
                  mt={'1/3'}
                  placeholder='NUEVA CONTRASEÑA'
                  onChangeText={(text) => setNuevaContraseña(text)}
                  height={customInputHeight}
                  fontSize={R18}
                  borderRadius={'3xl'}
                  textAlign={'center'}
                  borderColor={'cyan.500'}
                  alignSelf={'center'}
                  width={'90%'}
                 >
                 </Input>
                 <Button
                  onPress={() => onUpdate()}
                  mt={8}
                  position={'absolute'}
                  bottom={5}
                  alignSelf={'center'}
                  borderRadius={'2xl'}
                  height={customInputHeight}
                  width={'70%'}
                  backgroundColor={background}
                  py={0}
                  px={8}
                 >
                     Guardar Cambios
                 </Button>
                </>)
                 :
                 (
                 <Center>
                   <Text mt={10} mb={10} fontWeight={'bold'} color={background} fontSize={20} >
                  Actualizando contraseña
                  </Text>
                  <Spinner size={70} color={'#2596be'}>
                    
                  </Spinner>
                 </Center>
                 )
              }

            </Box>
            </Box>
    </Box>
  )
}
