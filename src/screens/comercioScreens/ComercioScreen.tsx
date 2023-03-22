import React from 'react'
import { Text, Box, Divider, Button, Center } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams,'Comercio'>{}

export const ComercioScreen = ({navigation}:Props) => {
  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'purple.800'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'purple.600'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
                <Text
                    mt={7}
                    alignSelf={'center'}
                    color={'purple.800'}
                    fontWeight={'bold'} 
                    fontSize={'2xl'}>
                    MIS COMERCIOS
                </Text>
                <Button 
                    onPress={()=> navigation.navigate('CrearInmueble')}
                    height={'30px'}
                    py={0}
                    px={4}
                    mt={2}
                    borderRadius={'3xl'}
                    alignSelf={'center'}
                    backgroundColor={'purple.800'}
                    >
                    <Text fontWeight={'bold'} fontSize={'sm'} color={'white'}>NUEVO COMERCIO</Text>
                </Button>
                <Center height={'64'}>
                  <Text width={300} textAlign={'center'} fontWeight={'bold'} color={'purple.800'}>
                      NO SE ENCONTRÓ NINGÚN COMERCIO REGISTRADO
                  </Text>
                </Center>
          </Box>
    </Box>
  )
}
