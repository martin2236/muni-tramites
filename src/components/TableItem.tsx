import React ,{useContext}from 'react'
import {Box, Divider, Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Inmuebles, UserContext} from '../context/Usercontext'
import {Info} from '../screens/inmuebleScreeens/InmuebleScreen';
import { useNavigation } from '@react-navigation/native';

interface ListItem{
    item:Inmuebles
}

interface Props{
    setData:React.Dispatch<React.SetStateAction< Info|null>>,
    item:ListItem 
}

export const TableItem = ({item, setData}:Props) => {
    const {setInmuebleId} = useContext(UserContext);
    const navigation = useNavigation();
    const nombre = item.item.nombre;
    const cuenta = item.item.cuenta;
    const deuda = item.item.deuda;
    const info = item.item.info;

    const guardarId = ()=>{
        console.log('guardando el item', item.item.id)
        setInmuebleId(item.item.id)
    }

  return (
    <>
    <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Box width={'27%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Pressable
                     onPress={()=> navigation.navigate('VerInmueble' as never)}
                >
                    <Text textAlign={'center'} fontSize={12}>
                        {nombre}
                    </Text>
                </Pressable>
                <Pressable 
                   onPress={()=> guardarId()}
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
                onPress={()=> setData(info)}
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
                    $ {deuda}
                </Text>
            </Box>
            <Box width={'10%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Pressable 
                    onPress={() => console.log('Imprimir')}
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
