import React, { useContext, useState,useEffect } from 'react';
import { Divider, Box, Text, Pressable, Button, Radio, FlatList } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {DatosContext } from '../../context/datos/DatosContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Cuota } from '../../interfaces/inmuebles/deuda';
import { RowAnios } from '../../components/RowAnios';
import { UserContext } from '../../context/usuario/Usercontext';
import { useFetch } from '../../hooks/useFetch';
import { UpdateInfo } from '../../components/TableItem';

interface Props extends StackScreenProps<RootStackParams,'VerComercio'>{}

export const VerComercioScreen = ({navigation, route}:Props) => {
    const {cuotas, cuotasSeleccionadas} = useContext(DatosContext);

    const {user}= useContext(UserContext)
    const {makePost,data} = useFetch()
    const [selected, setSelected] = useState<Cuota[]>([]);
    const [anios, setAnios] = useState<string[] | []>([]);
    const [totalSelected, setTotalSelected] = useState(0);
    const [opcion, setOpcion] = useState<string | undefined>(undefined);
    const [error, setError]= useState({
        pago: false,
        cuota:false
      });

    useEffect(() =>{
        if(data && data.pdf){
            console.log('pdf',data)
        }
    },[data]);
     
    const {id,ruta, referencia, updateInfo,deuda} =  route.params;
    let editar = {
        id,
        ruta,
        deuda,
        referencia,
        updateInfo
    }
    useEffect(() => {
        pagarPorAnios(anios)
    },[anios])

   const pagarPorAnios = (anios:String[]) => {
    const nuevaLista = deuda.filter((deuda:Cuota) => anios.includes(deuda.anio));
    const total = nuevaLista.reduce((acc:number,curr:Cuota)=> acc + curr['totalcuota'] ,0);
    setSelected(nuevaLista);
    setTotalSelected(total);
    }
    
    
    const infoByAnio = {};

    //organiza las deudas por año
    deuda.forEach( (item:Cuota) => {
        //@ts-ignore
    if (!infoByAnio[item.anio]) {
        //@ts-ignore
        infoByAnio[item.anio] = [];
    }
    //@ts-ignore
    infoByAnio[item.anio].push(item);
    });
    const listaAnios = [];
    for (const key in infoByAnio) {
        //@ts-ignore
        listaAnios.push(infoByAnio[key]);
    }

    // verifica que haya alguna deuda seleccionada y que se haya 
    // elegido algun metodo de pago antes de pagar
    const verificarPago = () => {
        if(!selected.length){
            setError({...error,cuota:true})
            console.log('no se selecciono ninguna cuota')
        }else if(opcion =='macro'){
            navigation.navigate('FormularioPagos')
            setError({...error,pago:false})
        }else if(opcion == 'pdf'){
            const cuotas = selected.map(item => item.cunica);
            const cunica = cuotas.join(",");
            const cuenta = (updateInfo as UpdateInfo).cuenta;
            //! cambiar a una fecha dinamica
            const vencimiento = "2023-08-14T13:01:23.832Z";
            setError({...error,pago:false});
        }
        else{
            console.log('no se seleccionó una opcion')
            setError({...error,pago:true})
        }
    };
  return (
    <Box flex={1} backgroundColor={'gray.200'}>
    <Divider backgroundColor={'gray.600'} height={'1.5'}/>
    <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.500'} alignSelf={'center'}/>
        <Box 
            height={'100%'} 
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
            <Box flex={1}>
                <Text
                    mt={7}
                    alignSelf={'center'}
                    fontWeight={'bold'} 
                    fontSize={20}>
                    MIS COMERCIOS
                </Text>
                <Box alignSelf={'center'} width={'95%'} justifyContent={'center'} mt={5}>
                    <Box 
                        position={'absolute'}
                        zIndex={100}
                        width={70}
                        height={70}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'full'}
                        backgroundColor={'#2596be'}>
                        <Icon name={'home'} size={50} color={'#fff'}/>
                    </Box>
                    <Box 
                        zIndex={10}
                        alignSelf={'flex-end'}
                        width={'90%'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        backgroundColor={'gray.300'}>
                        <Box width={'15%'}></Box>
                        <Text  width={'30%'}  fontSize={'sm'} fontWeight={'bold'}>
                            REFERENCIA
                        </Text>
                        <Text width={'30%'} textAlign={'center'} ellipsizeMode={'tail'} numberOfLines={1} fontSize={'sm'} fontWeight={'bold'}>
                            {referencia}
                        </Text>
                        <Pressable borderWidth={1} onPress={() => navigation.navigate('EditarReferencia',editar)} borderRadius={5} position={'absolute'} right={2}>
                            <Icon name={'pencil-outline'} size={15} color={'gray'}/>
                        </Pressable>
                    </Box>
                    <Box 
                        mt={'0.5'}
                        zIndex={10}
                        alignSelf={'flex-end'}
                        width={'90%'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        backgroundColor={'gray.300'}>
                            <Box width={'15%'}></Box>
                        <Text  width={'30%'} fontWeight={'bold'} fontSize={'sm'} >
                            CUENTA
                        </Text>
                        <Text width={'30%'} fontSize={'sm'} textAlign={'center'}>
                            456254/4
                        </Text>
                    </Box>
                    <Box 
                        mt={'0.5'}
                        zIndex={10}
                        alignSelf={'flex-end'}
                        width={'90%'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        backgroundColor={'gray.300'}>
                            <Box width={'15%'}></Box>
                        <Text width={'30%'} fontWeight={'bold'} fontSize={'sm'} >
                            PARTIDA
                        </Text>
                        <Text width={'30%'} fontSize={'sm'} textAlign={'center'}>
                            157420
                        </Text>
                    </Box>
                </Box>
            </Box>
                <Box flex={3}>
                    <Box mt={7} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                        <Text width={'15%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'}>
                            AÑO
                        </Text>
                        <Text width={'29%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                            IMPORTE ORIGINAL
                        </Text>
                        <Text width={'29%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                            IMPORTE ACTUALIZADO
                        </Text>
                        <Text width={'27%'} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                            TOTAL A PAGAR
                        </Text>
                    </Box>
                    <Divider mt={1} height={0.5}/>
                    <Box flex={2}>
                        <FlatList 
                            data={listaAnios}
                            keyExtractor={(item,index) => ` ${index}`}
                            renderItem={({item}) => <RowAnios item={item} setTotalSelected={(nuevaSuma) => setTotalSelected(nuevaSuma)} anios={anios} setAnios={setAnios} selected={selected} setSelected={setSelected}/>}
                            nestedScrollEnabled={true}
                        />
                    </Box>
                    <Box mt={2} bg={'gray.300'} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Text  fontSize={'sm'} fontWeight={'bold'}>
                            TOTAL A PAGAR
                        </Text>
                        <Text width={"27%"} textAlign={'center'}  fontSize={'sm'} fontWeight={'bold'}>
                            ${totalSelected.toFixed(2)}
                        </Text>
                    </Box>
                </Box>
              
                {/*********************METODOS DE PAGO************/}
                  <Box flex={1}  width={'80%'}mb={3} alignSelf={'center'}>
                    <Radio.Group width={'100%'} mt={3} name="myRadioGroup" accessibilityLabel="favorite number" value={opcion} onChange={nextValue => {
                            setOpcion(nextValue);
                        }}>
                            <Box  alignSelf={'center'} flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                                <Radio value='macro'  accessibilityLabel='algo2' />
                                <Text ml={5} width={'60%'} fontSize={'sm'} fontWeight={'bold'} lineHeight={'sm'}>PAGAR CON TARJETA DE CREDITO/DEBITO</Text>
                            </Box>
                            <Box alignSelf={'center'} flexDirection={'row'} mt={2} alignItems={'center'} justifyContent={'space-around'}>
                                <Radio value='pdf'  accessibilityLabel='algo2' />
                                <Text ml={5} width={'60%'} fontSize={'sm'} lineHeight={'sm'}>DESCARGAR/IMPRIMIR RECIBO PARA PAGO</Text>
                            </Box>
                        </Radio.Group>

                        <Button onPress={()=> verificarPago()} alignSelf={'center'} borderRadius={'2xl'} py={0} height={8} mt={3} backgroundColor={'#2596be'} width='30%'>
                            <Text color={'white'} fontSize={'md'} my={0}>
                                PAGAR
                            </Text>
                        </Button>
                  </Box>
                    
                </Box>
            </Box>
        )
    }
