import React ,{useContext}from 'react'
import {Box, Divider, Pressable, Text} from 'native-base';
//@ts-ignore
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
        setInmuebleId(item.item.id)
    }
    const guardarInfo = () => {
        setData(info);
        console.log(info);
    }

  return (
    <>
    <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <Box width={'40%'} flexDir={'row'} justifyContent={'space-around'}>
            
            <Pressable 
                    display={'flex'} 
                    flexDirection={'row'} 
                    alignItems={'center'} 
                    justifyContent={'space-between'}
                    onPress={()=> guardarInfo()}
                >
                    <Box
                        mr={2}
                        height={5}
                        borderWidth={2}
                        borderColor={'#2596be'} 
                        borderRadius={'4'}
                        alignItems={'center'}
                        justifyContent={'center'} 
                        width={5}
                        >
                        <Icon name={'information-variant'} size={12}/> 
                    </Box>

                    <Text width={'70%'} ellipsizeMode='tail' numberOfLines={1} textAlign={'center'} fontSize={13} >
                        {nombre}
                    </Text>
                </Pressable>
            </Box>
           
            <Box width={'40%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Text textAlign={'center'} fontSize={13} fontWeight={'bold'}>
                    $ {deuda.total.toFixed(3)}
                </Text>
            </Box>
            <Box width={'20%'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Pressable      
                    onPress={() => navigation.navigate('VerInmueble' as never)}
                    alignSelf={'center'}
                    ml={1}
                    height={5}
                    backgroundColor={'#2596be'}
                    borderRadius={'4'} 
                    alignItems={'center'}
                    justifyContent={'center'} 
                    width={5}>
                        <Icon name={'printer'} color={'#fff'} size={14}/>
                </Pressable>
            </Box>
        </Box>
        <Divider mt={1}/>
    </>
  )
}
