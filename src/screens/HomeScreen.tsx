import React,{useContext, useEffect, useState} from 'react';
import { Box, Divider, Text, Pressable,Center,Spinner } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/usuario/Usercontext';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParams } from '../navigation/DrawerNavigation';
import { background } from '../../App';
import { useResponsiveSize } from '../hooks/useResponsiveSize';

interface Props extends DrawerScreenProps<RootDrawerParams,'Home'>{}

export const HomeScreen = ({navigation}:Props) => {
    const {user} = useContext(UserContext);
    const [cuenta, setCuenta]= useState<any>(null);
    const [pantalla, setPantalla] = useState('');
    const [disabled,setDisabled] = useState<string | null>(null);
    const {makeGet, data, cargando} = useFetch();
    const [feed,setFeed] = useState<string | null>(null);
    const {R16,R14} = useResponsiveSize()

    //pide los datos a mostrar en la siguiente pantalla y desabilita la navegacion a otras
    //pantallas mientras los datos se cargan 
   
    const pedirInformacion = (data: string) =>{
      setFeed(data)
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
          console.log('ESTO ES FEED',feed);
    };

    //recibe los datos que trae la funcion traerInformaciony los procesa
    useEffect(() => {
      if(data && data.message){
        setCuenta(1)
      }
      if(data && data.Inmueble){
        const cuenta = data.Inmueble[0].cuenta;
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
        //una vez que se piden los vehiculos se chequea que haya alguno en la lista
        setCuenta({dominio:'',tipo:''});
      }
    }, [data]);

     //verifica la existencia de una cuenta para navegar a la pantalla seleccionada
     useEffect(()=>{
        if(cuenta && pantalla){
          console.log(cuenta,pantalla)
          //@ts-ignore
           navigation.navigate(pantalla as never,cuenta as never);
           setCuenta(null)
        }
    },[cuenta]);

    //quita la propiedad disabled despues de haber presionado una ruta
    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        setFeed(null)
        setDisabled(null)
      });
      return unsubscribe;
    }, [navigation]);
    

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
       {
        !cargando ? 
        <Center flex={1} alignSelf={'center'} width={'90%'} bg={'white'}>
            <Box 
                display={'flex'} 
                flexDir={'row'} 
                flexWrap={'wrap'} 
                justifyContent={'space-around'}
                alignItems={'center'}
                alignSelf={'center'} 
                backgroundColor={'white'}
              >
                <Pressable 
                  isDisabled={disabled !== null && disabled !== 'Inmueble'}
                  width={'50%'}
                  mb={5} 
                  onPress={()=> pedirInformacion('Inmueble')}
                  >
                    <Box 
                        height={120} 
                        alignSelf={'center'}
                        justifyContent={'center'} 
                        alignItems={'center'} 
                        borderRadius={'3xl'} 
                        width={120} 
                        backgroundColor={feed == 'Inmueble' || feed == null ? background : 'gray.400'}>
                        {feed == 'Inmueble'  ? 
                          <Spinner size={90} color={'white'}/>
                          :
                          <Icon 
                              name="home" 
                              size={90} 
                              color="#fff" 
                            />
                        }
                    </Box>
                    <Text 
                        mt={1} 
                        fontSize={R16}
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
                        backgroundColor={feed == 'Vehiculo' || feed == null ? background : 'gray.400'}
                      >
                        {feed == 'Vehiculo'  ? 
                          <Spinner size={90} color={'white'}/>
                          :
                          <Icon 
                              name="car" 
                              size={90} 
                              color="#fff" 
                            />
                        }
                    </Box>
                    <Text 
                        mt={1}
                        fontSize={R16} 
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
                        backgroundColor={feed == 'Comercio' || feed == null ? background : 'gray.400'}
                        >
                         {feed == 'Comercio'  ? 
                          <Spinner size={90} color={'white'}/>
                          :
                          <Icon 
                              name="file-document" 
                              size={90} 
                              color="#fff" 
                            />
                        }
                    </Box>
                    <Text 
                        mt={1}
                        fontSize={R16} 
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
                        backgroundColor={feed == 'Cementerio' || feed == null ? background : 'gray.400'}
                        >
                         {feed == 'Cementerio'  ? 
                          <Spinner size={90} color={'white'}/>
                          :
                          <Icon 
                              name="bank" 
                              size={90} 
                              color="#fff" 
                            />
                        }
                    </Box>
                    <Text 
                        mt={1}
                        fontSize={R16} 
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
                            size={90} 
                            color="#fff" />
                    </Box>
                    <Text 
                        mt={1}
                        fontSize={R16} 
                        fontWeight={'bold'}
                        color={'warmGray.400'}
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
                            size={90} 
                            color="#fff" />
                    </Box>
                    <Text 
                        mt={1}
                        fontSize={R16} 
                        fontWeight={'bold'} 
                        color={'warmGray.400'}
                        textAlign={'center'}>
                            Escribanos
                    </Text>
                </Pressable>
            </Box>
        </Center>
        :
        <Box>
            cargando
        </Box>
       }
    </Box>
  )
}
