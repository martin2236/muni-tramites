import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Box, Pressable, Center, Text, Divider,Image } from 'native-base'
import React,{useContext} from 'react'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { UserContext } from '../context/usuario/Usercontext';
import { DatosContext } from '../context/datos/DatosContext';
import { background } from '../../App';
import { useResponsiveSize } from '../hooks/useResponsiveSize';


export const DrawerMenu = ({navigation}:DrawerContentComponentProps) => {

  const {user,setUser} = useContext(UserContext);
  const {R20,R13} = useResponsiveSize();
  const {setInmuebles,setComercios,setCementerios,setVehiculos} = useContext(DatosContext);

  const cerrarSesion = () => {
    setInmuebles(null);
    setComercios(null);
    setCementerios(null);
    setVehiculos(null);
    setUser(null);
  }

  return (
    <Box flex={1}>
        <Center height={140} bg={'#3FB2E8ff'}>
          <Box width={230} alignSelf={'center'} bg={background}>
                  <Text fontSize={R20} fontWeight={'bold'} textAlign={'center'} color={'white'} lineHeight={'sm'}>
                      PORTAL DE TRÁMITES
                  </Text>
                  <Divider background={'white'} height={'0.5'}/>
                  <Text textAlign={'center'} fontSize={R13} color={'white'}>
                      Secretaria de Recursos Públicos Dirección de Informática
                  </Text>
            </Box>
        </Center>
        <Center>
            
            <Pressable onPress={()=>navigation.navigate('Notificaciones')} height={'10'} mt={5} mb={2}  flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} width={'full'}>
              <Icon style={{marginLeft:10}} name='email' size={28}/>
              <Text ml={3} textAlign={'center'} fontSize={15} fontWeight={'bold'}>Notificaciones</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>

            <Pressable onPress={()=>navigation.navigate('MediosPago')} height={'10'} mb={2} flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} width={'full'}>
              <Icon style={{marginLeft:10}} name='card-bulleted' size={28}/>
              <Text ml={3} textAlign={'center'} fontSize={15} fontWeight={'bold'}>Medios de pago</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>

            <Pressable onPress={()=>navigation.navigate('Oficinas')} height={'10'} mb={2} flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} width={'full'}>
              <Icon style={{marginLeft:10}} name='office-building-marker' size={28}/>
              <Text ml={3} textAlign={'center'} fontSize={15} fontWeight={'bold'}>Atención al contribuyente</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>

            <Pressable onPress={()=>navigation.navigate('Contacto')} height={'10'} mb={2}  flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} width={'full'}>
              <Icon style={{marginLeft:10}} name='wechat' size={28}/>
              <Text ml={3} textAlign={'center'} fontSize={15} fontWeight={'bold'}>Contacto</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>

            <Pressable onPress={()=>navigation.navigate('Contraseña')} height={'10'} mb={2} flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} width={'full'}>
              <Icon style={{marginLeft:10}} name='key-variant' size={28}/>
              <Text  ml={3} textAlign={'center'} fontSize={15} fontWeight={'bold'}>Cambiar contraseña</Text>
            </Pressable>
            <Divider width={'80%'} mb={2} />
            
            <Pressable onPress={()=> cerrarSesion()} height={'10'} mb={2}  flexDir={'row'} alignItems={'center'} justifyContent={'flex-start'} width={'full'}>
            <Icon style={{marginLeft:10}} name='logout' size={28}/>
              <Text ml={3} textAlign={'center'} fontSize={15} fontWeight={'bold'}>Cerrar sesión</Text>
            </Pressable>
            <Divider width={'80%'} mb={2}/>
        </Center>
        <Text position={'absolute'} left={5} bottom={2}> V 1.0.0</Text>
    </Box>
  )
}
