import React, { useContext, useState,memo } from 'react'
import { Text, Box, Divider, Button,Pressable,FlatList,Center} from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { TableItem } from '../../components/TableItem';
import { CustomModal } from '../../components/CustomModal';
import { Inmueble,DatosContext } from '../../context/datos/DatosContext';
import { useFontSize } from '../../hooks/useFontsize';


interface Props {
    navigation: StackNavigationProp<RootStackParams, "Inmueble", undefined>,
    route:any
}
interface ListProps{
    index:number,
    item:Inmueble
}
export interface Info {
    modal:boolean;
    cuentaMunicipal: string;
    partidaPovincial: number;
    categoria: string;
    codigoServicio: string;
    baseImponible: number;
    nomenclatura: string;
}
//esta pantalla muestra los datos que se pidieron en el context al iniciar la app
//tambien envia el numero de cuenta para que el flatList pueda hacer la peticion post
//de traerCuotas, hace un post por cada item de la lista 
//tambien muestra la info de los inmuebles que se genera en el componente tableItem al
//apretar el boton i
export const InmuebleScreen = memo(({navigation}:Props) => {
        const { inmuebles} = useContext(DatosContext);
        const {texto16} = useFontSize();
        const [info, setInfo] = useState<Info | null>(null);
        const renderItem = (item:ListProps)=> {return (<TableItem item={item} pantalla={'Inmueble'} setData={setInfo} navigation={navigation}/>)};  
        const keyExtractor = (item:Inmueble, index:number)=> `${item.pkinmueble}${index}`;

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box 
            height={'100%'}
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}
            >
                <>
                    <Text
                        mt={7}
                        alignSelf={'center'}
                        fontWeight={'bold'} 
                        fontSize={'2xl'}>
                        MIS INMUEBLES
                    </Text>
                    <Button 
                        onPress={()=> navigation.navigate('CrearInmueble')}
                        height={'30px'}
                        py={0}
                        px={4}
                        mt={2}
                        borderRadius={'3xl'}
                        alignSelf={'center'}
                        backgroundColor={'gray.500'}
                        >
                        <Text fontWeight={'bold'} fontSize={'sm'} color={'white'}>AGREGAR INMUEBLE</Text>
                    </Button>
                {
                    inmuebles ? (
                    <>
                        <Box mt={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                            <Text width={'40%'} fontSize={texto16} textAlign={'center'} fontWeight={'bold'}>
                                REFERENCIA
                            </Text>
                            <Text width={'40%'} fontSize={texto16}  textAlign={'center'} fontWeight={'bold'}>
                                DEUDA
                            </Text>
                            <Text width={'20%'} fontSize={texto16}  textAlign={'center'} fontWeight={'bold'}>
                                PAGAR
                            </Text>
                        </Box>
                        <Divider mt={1}/>
                        <Box flex={1}>
                            <FlatList
                                data={inmuebles}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                            />
                        </Box>
                    </>
                    )
                    : 
                    (
                        <Center flex={1}>
                            <Text fontSize={20} color={'cyan.500'}>No hay inmuebles registrados</Text>
                        </Center>
                    )
                }
                <Box mt={5}>
                    {
                    info ? 
                        <>
                        <CustomModal info={info} setData={setInfo} modalOpen={info.modal} cuenta={info.cuentaMunicipal} categoria={info.categoria} partida={info.partidaPovincial} servicio={info.codigoServicio} base={info.baseImponible} nomenclatura={info.nomenclatura}/>
                        </>
                        :
                        null
                    }
                </Box>
             </>
        </Box>
    </Box>
  )
})
