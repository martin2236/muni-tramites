import React,{useContext, useEffect, useState} from 'react';
import { Box, Divider, Text, Pressable } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/usuario/Usercontext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams,'Main'>{}


export const HomeScreen = ({navigation}:Props) => {
    const {user} = useContext(UserContext);
    const [cuenta, setCuenta]= useState<any>(null);
    const [pantalla, setPantalla] = useState('');
    const [disabled,setDisabled] = useState<string | null>(null);
    const {makeGet, data, cargando} = useFetch();

    useEffect(() => {
      if(data && data.Inmueble){
        const cuenta = data.Inmueble[0].cuenta;
        console.log('esta es la cuenta',cuenta)
       setCuenta(cuenta) 
      }
      if(data && data.Comercio){
        const cuenta = data.Comercio[0].padron;
        setCuenta(cuenta) 
      }
      if(data && data.Cementerio){
        const cuenta = data.Cementerio[0].num_orden;
        setCuenta(cuenta) 
      }
      if(data && data.Vehiculo){
        const vehiculo = data.Vehiculo[0].tipo
        const cuenta = {
            dominio:data.Vehiculo[0].dominio.trim(),
            tipo:data.Vehiculo[0].tipo
        };
        switch (vehiculo) {
            case "Vehiculo Particular":
              cuenta.tipo = "auto"
              break;
            case "Moto":
              cuenta.tipo = "moto"
              break;
            default:
              cuenta.tipo = "publico"
              break;
          }
        setCuenta(cuenta) 
      }
    }, [data])

    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        console.log('ruta focused')
        setDisabled(null)
      });
  
      return unsubscribe;
    }, [navigation]);

    useEffect(()=>{
        if(cuenta && pantalla){
           navigation.navigate(pantalla as never,cuenta as never);
           setCuenta(null)
        }
    },[cuenta])
    
    const pedirInformacion = (data: string) =>{
      setDisabled(data)
        switch (data) {
            case 'Inmueble':
                makeGet('/inmuebles/traerInmuebles', user?.token, undefined, 'Inmueble')
                setPantalla('Inmueble');
              break;
            case 'Comercio':
                makeGet('/comercios/traerComercios', user?.token, undefined, 'Comercio')
                setPantalla('Comercio');
              break;
              case 'Cementerio':
                makeGet('/cementerios/traerCementerios', user?.token, undefined, 'Cementerio')
                setPantalla('Cementerio');
              break;
            case 'Vehiculo':
                makeGet('/vehiculos/traerVehiculos', user?.token, undefined, 'Vehiculo')
                setPantalla('Vehiculo');
              break;
            default:
              console.log(`No se encontro el tipo ${data}.`);
          }
    };

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
       {
        !cargando ? 
        <>
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
                  isDisabled={disabled !== null && disabled !== 'Inmueble'}
                    width={'50%'}
                    mb={5} 
                    onPress={()=> pedirInformacion('Inmueble')}>
                    <Box 
                        height={120} 
                        alignSelf={'center'}
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
                    isDisabled={disabled !== null && disabled !== 'Vehiculo'}
                    width={'50%'}
                    mb={5} 
                    onPress={()=> pedirInformacion("Vehiculo")}>
                    <Box 
                        height={120} 
                        alignSelf={'center'}
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
                    isDisabled={disabled !== null && disabled !== 'Comercio'}
                    width={'50%'}
                    mb={5}
                    onPress={() => pedirInformacion('Comercio')}
                    >
                    <Box 
                        height={120} 
                        alignSelf={'center'}
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
                    isDisabled={disabled !== null && disabled !== 'Cementerio'}
                    width={'50%'}
                    mb={5}
                    onPress={() => pedirInformacion('Cementerio')}
                    >
                    <Box 
                        height={120} 
                        alignSelf={'center'}
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
                    width={'50%'}
                    mb={5}
                    >
                    <Box 
                        height={120} 
                        alignSelf={'center'}
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
                    width={'50%'}
                    mb={5}
                    >
                    <Box 
                        height={120} 
                        alignSelf={'center'}
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
        </>
        :
        <Box>
            cargando
        </Box>
       }
    </Box>
  )
}
