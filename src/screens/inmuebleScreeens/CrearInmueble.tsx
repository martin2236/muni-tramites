import { Box, Button, Center, Divider, Input, Text } from 'native-base'
import React from 'react'

export const CrearInmueble = () => {
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
                    fontSize={20}>
                    AGREGAR INMUEBLES
                </Text>
                <Center 
                    mt={5}
                    width={'90%'}
                    alignSelf={'center'}
                >
                    <Input
                        mb={3}
                        borderRadius={'2xl'}
                        height={'10'}
                        backgroundColor={'white'}
                        placeholder='CUENTA MUNICIPAL'
                        borderColor={'purple.800'}
                    />
                    <Input
                        mb={3}
                        borderRadius={'2xl'}
                        height={'10'}
                        backgroundColor={'white'}
                        placeholder='PARTIDA'
                        borderColor={'purple.800'}
                    />
                    <Input
                        mb={3}
                        borderRadius={'2xl'}
                        height={'10'}
                        backgroundColor={'white'}
                        placeholder='DESCRIPCIÓN/NOMBRE DE REFERENCIA'
                        borderColor={'purple.800'}
                    />

                    <Button
                        mt={5}
                        borderRadius={'2xl'}
                        height={'8'}
                        backgroundColor={'purple.800'}
                        py={0}
                        px={8}
                    >
                        <Text
                            color={'white'}
                        >GUARDAR DATOS</Text>
                    </Button>
                </Center>
        </Box>
    </Box>
  )
}
