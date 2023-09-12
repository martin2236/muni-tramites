import React, { useEffect, memo, useState, useContext} from 'react';
import { Divider, Box, Text, Pressable, Button, FlatList } from 'native-base';

//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Cuota } from '../../interfaces/inmuebles/deuda';
import { RowAnios } from '../../components/RowAnios';
import { UpdateInfo } from '../../components/TableItem';
import { useFetch } from '../../hooks/useFetch';
import { UserContext } from '../../context/usuario/Usercontext';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { background } from '../../../App';

interface Props extends StackScreenProps<RootStackParams,'VerInmueble'>{}

interface CuotaAño {
    anio: number;
    // Otras propiedades de Cuota
  }
  
  interface InfoByAnio {
    [anio: number]: CuotaAño[];
  }

export const VerInmueble = memo(({navigation, route}:Props) => {
    const {user}= useContext(UserContext);
    const {R14,textoTotal,textoResponsive} = useResponsiveSize();
    const {makePost,data} = useFetch();
    const [selected, setSelected] = useState<Cuota[]>([]);
    const [anios, setAnios] = useState<string[] | null>(null);
    const [totalSelected, setTotalSelected] = useState(0);
    const [listaAnios,setListaAnios] = useState<CuotaAño[][] | []>([]);
    const [opcion, setOpcion] = useState<string | undefined>(undefined);
    const [error, setError]= useState({
        pago: false,
        cuota:false
      });

    useEffect(() =>{
        if(data && data.pdf){
            console.log(data)
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
        console.log('estos son los anios en verInmuebles',anios)
        if(anios){
            pagarPorAnios(anios);
        };
    },[anios])

   const pagarPorAnios = (anios:String[]) => {
    if(!anios.length){
        setSelected([]);
        setTotalSelected(0);
        return
    };
    const nuevaLista = deuda.filter((deuda:Cuota) => anios.includes(deuda.anio +''));
    //!inmueble nueva3 tiene items con la cunica repetida por eso se rompe,
    //nuevaLista.forEach((item:Cuenta) => console.log(item.cunica))
    const total = nuevaLista.reduce((acc:number,curr:Cuota)=> acc + curr['totalcuota'] ,0);
    setSelected(nuevaLista);
    setTotalSelected(total);
    }
    
    const infoByAnio:any = {};
    //organiza las deudas por año
   
    useEffect(() => {
        // Organiza las deudas por año
        console.log('cambio deudas y acomodo todas las cuentas')
        const infoByAnio: InfoByAnio = {};

        deuda.forEach((item: CuotaAño) => {
          if (!infoByAnio[item.anio]) {
            infoByAnio[item.anio] = [];
          }
          infoByAnio[item.anio].push(item);
        });
        
        const listaAnios: CuotaAño[][] = [];
        for (const key in infoByAnio) {
          listaAnios.push(infoByAnio[key]);
        }
    
        // Actualiza los estados con los datos organizados
        setListaAnios(listaAnios);
      }, []);

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
            
            makePost('/inmuebles/traerCuotas',{cuenta,vencimiento,cunica}, user?.token, 'pdf' );
            setError({...error,pago:false});
        }
        else{
            console.log('no se seleccionó una opcion')
            setError({...error,pago:true})
        }
    };

  return (
    <Box flex={3} backgroundColor={'gray.200'}>
    <Divider backgroundColor={'gray.600'} height={'1.5'}/>
    <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.500'} alignSelf={'center'}/>
        <Box 
            height={'100%'} 
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
        {/* nuevo box */}
            <Box flex={1} >
            <Text
                mt={5}
                alignSelf={'center'}
                fontWeight={'bold'} 
                fontSize={20}>
                MIS INMUEBLES
            </Text>
            <Box flex={1}  alignSelf={'center'} width={'95%'} justifyContent={'center'} mt={5}>
                <Box 
                    position={'absolute'}
                    zIndex={100}
                    width={70}
                    height={70}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'full'}
                    backgroundColor={background}>
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
                    <Text ml={3} width={'40%'}  fontSize={R14} fontWeight={'bold'}>
                        REFERENCIA
                    </Text>
                    <Text fontSize={R14} width={'30%'} textAlign={'center'} ellipsizeMode={'tail'} numberOfLines={1} fontWeight={'bold'}>
                        {referencia}
                    </Text>
                    <Pressable borderWidth={1} bg={'white'} borderColor={background} onPress={() => navigation.navigate('EditarReferencia',editar)} borderRadius={5} position={'absolute'} right={2}>
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
                    <Text ml={3}  width={'40%'} fontWeight={'bold'} fontSize={R14} >
                        CUENTA
                    </Text>
                    <Text width={'30%'} fontSize={R14} textAlign={'center'}>
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
                    <Text ml={3} width={'40%'} fontWeight={'bold'} fontSize={R14} >
                        PARTIDA
                    </Text>
                    <Text width={'30%'} fontSize={R14} textAlign={'center'}>
                        157420
                    </Text>
                </Box>
            </Box>
            </Box>
            {/*+++++++++++++++++++++++++ lista +++++++++++++++++++*/}
            <Box flex={3} >
                <Box mt={7} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                        <Text width={'15%'} fontSize={R14} textAlign={'center'} fontWeight={'medium'}>
                            AÑO
                        </Text>
                        <Text width={'29%'} fontSize={R14} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                            IMPORTE ORIGINAL
                        </Text>
                        <Text width={'29%'} fontSize={R14} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                            IMPORTE ACTUALIZADO
                        </Text>
                        <Text width={'27%'} fontSize={R14} textAlign={'center'} fontWeight={'medium'} lineHeight={'sm'}>
                            TOTAL A PAGAR
                        </Text>
                    </Box>
                    <Divider mt={1} height={0.5}/>
                    <Box flex={2}>
                        {/* lista */}
                        <FlatList
                            data={listaAnios}
                            renderItem={({item}) => <RowAnios item={item} setTotalSelected={(nuevaSuma) => setTotalSelected(nuevaSuma)} anios={anios} setAnios={setAnios} selected={selected} setSelected={setSelected}/>}
                            keyExtractor={(item,index) => ` ${index}`}
                            nestedScrollEnabled={true}
                        />
                    </Box>
                    <Box mt={2} py={1} bg={'gray.300'} flexDirection={'row'} justifyContent={'flex-end'}>
                            <Text  fontSize={textoTotal} fontWeight={'bold'}>
                                TOTAL A PAGAR
                            </Text>
                            <Text width={"27%"} textAlign={'center'}  fontSize={textoTotal} fontWeight={'bold'}>
                                ${totalSelected.toFixed(2)}
                            </Text>
                        </Box>
                        {
                            error.cuota ?
                            <Text textAlign={'center'} color={'red.500'}>Seleccione una cuota antes de continuar</Text>
                            :
                            null
                        }
            </Box>
              <Box mb={5} mt={5} width={'full'} display={'flex'} flexDir={'row'} alignItems={'center'} justifyContent={'space-around'}>
                <Button py={1} width={'45%'} background={background} borderRadius={50}>
                        <Text fontWeight={'bold'} textAlign={'center'} fontSize={textoResponsive}>PAGAR CON TARJETA DE CRÉDITO / DÉBITO</Text>
                    </Button>
                    <Button py={1} width={'45%'} background={background} borderRadius={50}>
                        <Text fontWeight={'bold'} textAlign={'center'} fontSize={textoResponsive}>DESCARGAR / IMPRIMIR RECIBO PARA PAGO</Text>
                    </Button>
              </Box>
                   
            </Box>
        </Box>
        )
    })
