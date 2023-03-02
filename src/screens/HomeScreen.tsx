import React from 'react';
import { Box, Divider, Text, Pressable } from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';



export const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'purple.800'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'purple.400'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'}  
            display={'flex'} 
            flexDir={'row'} 
            flexWrap={'wrap'} 
            justifyContent={'space-around'}
            alignSelf={'center'} 
            backgroundColor={'white'}>
            <Divider mb={10}/>
            <Pressable 
                mb={5} 
                onPress={()=> navigation.navigate('Inmueble' as never)}>
                <Box 
                    height={120} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    borderRadius={'3xl'} 
                    width={120} 
                    backgroundColor={'#2596be'}>
                    <Icon 
                        name="home" 
                        size={70} 
                        color="#fff" />
                </Box>
                <Text 
                    mt={1} 
                    fontWeight={'bold'} 
                    textAlign={'center'}>
                        Inmueble
                </Text>
            </Pressable>
            <Pressable 
                mb={5} 
                onPress={()=> navigation.navigate("Vehiculo" as never)}>
                <Box 
                    height={120} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    borderRadius={'3xl'} 
                    width={120} 
                    backgroundColor={'#2596be'}>
                    <Icon 
                        name="car" 
                        size={70} 
                        color="#fff" />
                </Box>
                <Text 
                    mt={1} 
                    fontWeight={'bold'} 
                    textAlign={'center'}>
                        Vehiculo
                </Text>
            </Pressable>
            <Pressable 
                mb={5}
                onPress={()=> navigation.navigate("Comercio" as never)}
                >
                <Box 
                    height={120} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    borderRadius={'3xl'} 
                    width={120} 
                    backgroundColor={'#2596be'}>
                    <Icon 
                        name="file-document" 
                        size={70} 
                        color="#fff" />
                </Box>
                <Text 
                    mt={1} 
                    fontWeight={'bold'} 
                    textAlign={'center'}>
                        Comercio
                </Text>
            </Pressable>
            <Pressable 
                mb={5}
                onPress={()=> navigation.navigate("Cementerio" as never)}
                >
                <Box 
                    height={120} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    borderRadius={'3xl'} 
                    width={120} 
                    backgroundColor={'#2596be'}>
                    <Icon 
                        name="bank" 
                        size={70} 
                        color="#fff" />
                </Box>
                <Text 
                    mt={1} 
                    fontWeight={'bold'} 
                    textAlign={'center'}>
                        Cementerio
                </Text>
            </Pressable>
            <Pressable 
                mb={5}
                onPress={()=> navigation.navigate("ObrasPrivadas" as never)}
                >
                <Box 
                    height={120} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    borderRadius={'3xl'} 
                    width={120} 
                    backgroundColor={'gray.400'}>
                    <Icon 
                        name="paperclip" 
                        size={70} 
                        color="#fff" />
                </Box>
                <Text 
                    mt={1} 
                    fontWeight={'bold'} 
                    textAlign={'center'}>
                        Obras privadas
                </Text>
            </Pressable>
            <Pressable 
                mb={5}
                onPress={()=> navigation.navigate("Escribanos" as never)}
                >
                <Box 
                    height={120} 
                    justifyContent={'center'} 
                    alignItems={'center'} 
                    borderRadius={'3xl'} 
                    width={120} 
                    backgroundColor={'gray.400'}>
                    <Icon 
                        name="scale-balance" 
                        size={70} 
                        color="#fff" />
                </Box>
                <Text 
                    mt={1} 
                    fontWeight={'bold'} 
                    textAlign={'center'}>
                        Escribanos
                </Text>
            </Pressable>
        </Box>
    </Box>
  )
}
