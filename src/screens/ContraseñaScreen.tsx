import React, {useState} from 'react'
import {Box, Text, Divider, Input, Center, Button, Spinner} from 'native-base'

export const ContraseñaScreen = () => {
  const [show, setShow] = useState(true)
  const [nuevaContraseña, setNuevaContraseña] = useState<string | null>(null)

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
            <Center
              flex={1}
            >
              {
                show ? 
                (<>
                  <Text mb={10} fontSize={20} >
                  cambiar contraseña
                 </Text>
                 <Input
                 placeholder='Nueva Contraseña'
                 onChangeText={(text) => setNuevaContraseña(text)}
   
                   width={'90%'}
                 >
                 </Input>
                 <Button
                   onPress={() => onUpdate()}
                   marginTop={5}
                   width={'90%'}
                 >
                     Guardar Cambios
                 </Button>
                </>)
                 :
                 (
                 <>
                   <Text mb={10} fontWeight={'bold'} color={'#2596be'} fontSize={20} >
                  Cave actualizada con éxito
                  </Text>
                  <Spinner size={70} color={'#2596be'}>
                    
                  </Spinner>
                 </>
                 )
              }

            </Center>
            </Box>
    </Box>
  )
}
