import React,{useContext, useEffect, useState} from 'react';
import { Center,Button,Box,Divider,Input,Text,Spinner} from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/usuario/Usercontext';
import { DatosContext } from '../context/datos/DatosContext';
import { CustomInput } from '../components/CustomInput';
import { background } from '../../App';
import { useResponsiveSize } from '../hooks/useResponsiveSize';

interface Props extends StackScreenProps<RootStackParams,'EditarReferencia'>{};

export const EditarReferenciaScreen = ({navigation,route}:Props) => {
  const {id, ruta,referencia,deuda,updateInfo} =  route.params;
  const {customInputHeight,R18} = useResponsiveSize();
  const[nuevaReferencia, setNuevaReferencia] = useState('');
  const [show, setShow] = useState(true);
  const {user} = useContext(UserContext);
  const{updated,setUpdated}= useContext(DatosContext);
  const {makePut,data} = useFetch();

  
  const onUpdate = () => {
    setShow(false);
    let data = {
      ...updateInfo,
      descripcion:nuevaReferencia
    }
    if(user?.token){
      if(ruta === 'Inmueble'){
          console.log(`inmueble/${id}`,user.token,data)
        return makePut(`inmuebles/${id}`,user.token,data,)
      }else if(ruta === 'Comercio'){
        console.log(`comercios/${id}`,user.token,data)
         return makePut(`comercios/${id}`,user.token, data);
      }else if(ruta === 'Vehiculo'){
        console.log(`vehiculos/${id}`,user.token,data)
        return  makePut(`vehiculos/${id}`,user.token,data);
      } else if( ruta === 'Cementerio'){
        console.log(`cementerio/${id}`,user.token,data)
          makePut(`cementerios/${id}`,user.token,data);
      };
  };
};
//!revisar aca
  useEffect(() => {
    if(data && nuevaReferencia){
      switch (ruta) {
        case 'Inmueble':
          setUpdated({ruta:'inmuebles',actualizar:!updated.actualizar})
          navigation.navigate('VerInmueble',{id,ruta,deuda,referencia:nuevaReferencia,updateInfo})
          break;
        case 'Comercio':
          setUpdated({ruta:'comercios',actualizar:!updated.actualizar})
          navigation.navigate('VerComercio',{id,ruta,deuda, referencia:nuevaReferencia,updateInfo})
          break;
        case 'Cementerio':
          setUpdated({ruta:'cementerios',actualizar:!updated.actualizar})
          navigation.navigate('VerCementerio',{id,ruta,deuda, referencia:nuevaReferencia,updateInfo})
          break;
        case 'Vehiculo':
          setUpdated({ruta:'vehiculos',actualizar:!updated.actualizar})
          navigation.navigate('VerVehiculo',{id,ruta,deuda, referencia:nuevaReferencia,updateInfo})
          break;
      
        default:
          break;
      }
    }
  }
  ,[data])

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
                    EDITAR REFERENCIA
                  </Text>
              {
                show ? 
                (<>
                  <Text textAlign={'center'}mt={10} fontWeight={'bold'} color={background} mb={10} fontSize={R18} >
                  REFERENCIA ANTERIOR: "{referencia}" 
                 </Text>

                 
                 <Input
                  placeholder='NUEVA REFERENCIA'
                  onChangeText={(text) => setNuevaReferencia(text)}
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
                  Actualizando referencia a: "{nuevaReferencia}"
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
