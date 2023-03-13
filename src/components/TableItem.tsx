import React from 'react'
import {Box, Divider, Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

interface Props {
    nombre:string,
    cuenta:string,
    deuda:number
}

export const TableItem = ({nombre, cuenta, deuda}:Props) => {
  return (
    <>
    <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Pressable>
                    <Text textAlign={'center'} fontSize={12}>
                        {nombre}
                    </Text>
                </Pressable>
                <Pressable 
                    height={4}
                    borderWidth={1}
                    borderColor={'purple.800'} 
                    borderRadius={'4'}
                    alignItems={'center'}
                    justifyContent={'center'} 
                    width={4}>
                        <Icon name={'pencil'} size={12}/>
                </Pressable>
            </Box>
            <Box width={'25%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                <Text textAlign={'center'} fontSize={12} >
                    {cuenta}
                </Text>
                <Pressable 
                    height={4}
                    borderWidth={1}
                    borderColor={'purple.800'} 
                    borderRadius={'4'}
                    alignItems={'center'}
                    justifyContent={'center'} 
                    width={4}>
                        <Icon name={'information-variant'} size={12}/>
                </Pressable>
            </Box>
            <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Text textAlign={'center'} fontSize={12} fontWeight={'bold'}>
                    ${deuda}
                </Text>
            </Box>
            <Box width={'10%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Pressable 
                    alignSelf={'center'}
                    ml={1}
                    height={4}
                    backgroundColor={'#2596be'}
                    borderRadius={'4'} 
                    alignItems={'center'}
                    justifyContent={'center'} 
                    width={4}>
                        <Icon name={'printer'} color={'#fff'} size={14}/>
                </Pressable>
            </Box>
        </Box>
        <Divider mt={1}/>
    </>
  )
}
