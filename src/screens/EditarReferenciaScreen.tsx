import React,{useContext, useEffect, useState} from 'react'
import { Center,Button,Box,Divider,Input,Text,Spinner} from 'native-base'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/StackNavigation'
import { useFetch } from '../hooks/useFetch'
import { UserContext } from '../context/usuario/Usercontext'
import { DatosContext } from '../context/datos/DatosContext'

interface Props extends StackScreenProps<RootStackParams,'EditarReferencia'>{}

export const EditarReferenciaScreen = ({navigation,route}:Props) => {
  const {id, ruta,referencia,updateInfo} =  route.params;
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
      switch(ruta){
        case 'Inmueble':
          makePut(`inmuebles/${id}`,user.token,data,)
          break;
        case 'Comercio':
          makePut(`comercios/${id}`,user.token, data);
        case 'Vehiculo':
          makePut(`vehiculos/${id}`,user.token,data);
        case  'Cementerio':
          makePut(`cementerios/${id}`,user.token,data);
    }
  }
}

  useEffect(() => {
    if(data && nuevaReferencia){
      
      const path = data.ruta
      console.log('EditarReferenciaScreen',path);
      switch (path) {
        case 'inmuebles':
          setUpdated({ruta:'inmuebles',actualizar:!updated.actualizar})
          navigation.navigate('VerInmueble',{id,ruta, referencia:nuevaReferencia,updateInfo})
          break;
        case 'comercios':
          setUpdated({ruta:'comercios',actualizar:!updated.actualizar})
          navigation.navigate('VerComercio',{id,ruta, referencia:nuevaReferencia,updateInfo})
          break;
        case 'cementerios':
          setUpdated({ruta:'cementerios',actualizar:!updated.actualizar})
          navigation.navigate('VerCementerio',{id,ruta, referencia:nuevaReferencia,updateInfo})
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
            <Center
              flex={1}
            >
              {
                show ? 
                (<>
                  <Text mb={10} fontSize={20} >
                  Referencia anterior: "{referencia}" 
                 </Text>
                 <Input
                 placeholder='Nueva Referencia'
                 onChangeText={(text) => setNuevaReferencia(text)}
   
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
                  Actualizando referencia a: "{nuevaReferencia}"
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
