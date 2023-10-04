import React, { useContext, useState,useEffect } from 'react';
import { Divider, Box, Text, Pressable, Button, Radio, FlatList } from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Cuota } from '../../interfaces/inmuebles/deuda';
import { RowAnios } from '../../components/RowAnios';
import { UserContext } from '../../context/usuario/Usercontext';
import { useFetch } from '../../hooks/useFetch';
import { UpdateInfo } from '../../components/TableItem';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { background } from '../../../App';

interface Props extends StackScreenProps<RootStackParams,'VerCementerio'>{}

interface CuotaAño {
    anio: number;
  }

interface AnioConCuotas {
anio: number;
cuotas: CuotaAño[];
cantidadCuotas:number
}

export const VerCementerioScreen = ({navigation, route}:Props) => {
    const {R13,R14,R16} = useResponsiveSize();

    const {user}= useContext(UserContext)
    const {makePost,data} = useFetch()
    const [selected, setSelected] = useState<Cuota[]>([]);
    const [anios, setAnios] = useState<string[] | null>(null);
    const [totalSelected, setTotalSelected] = useState(0);
    const [listaAnios,setListaAnios] = useState<AnioConCuotas[] | []>([]);
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
          if(anios){
              pagarPorAnios(anios);
          };
      },[anios])
  
      const toggleCuota = (cuota:Cuota) => {
          const index = selected.findIndex((item: Cuota) => item.cunica === cuota.cunica);
  
          let newSelected = [];
  
           newSelected = [...selected];
  
          if (index !== -1) {
              newSelected.splice(index, 1);
          } else {
              newSelected.push(cuota as never);
              if(cuota.tasa == '1'){
                  const anio = listaAnios.filter((item) => {return item.anio == Number(cuota.anio)});
                  const tasa8 = anio[0].cuotas.filter(item => item.tasa == '8' && item.cuota == cuota.cuota)
                  tasa8.length && newSelected.push(...tasa8);
              } 
          }
          const anosUnicos = new Set();
  
          // Iteramos sobre la lista de cuotas para agregar los años al conjunto
          newSelected.forEach((cuota) => {
          anosUnicos.add(cuota.anio);
          });
  
          const total = newSelected.reduce((acc, curr) => acc + curr.totalcuota, 0);
          setSelected(newSelected);
          setTotalSelected(total);
      }
  
     const pagarPorAnios = (anios:String[]) => {
      if(!anios.length){
          setSelected([]);
          setTotalSelected(0);
          return
      };
      const nuevaLista = deuda.filter((deuda:Cuota) => anios.includes(deuda.anio +''));
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
          
        const listaAnios = organizeDataByYear(deuda);
           // Actualiza los estados con los datos organizados
          setListaAnios(listaAnios);
        }, []);
        
        const organizeDataByYear = (deuda: CuotaAño[]): AnioConCuotas[] => {
          const infoByAnio: { [anio: number]: CuotaAño[] } = {};
        
           deuda.forEach((item) => {
              const anio = item.anio;
              if (!infoByAnio[anio]) {
              infoByAnio[anio] = [];
              }
              infoByAnio[anio].push(item);
          });
  
          const listaAnios: AnioConCuotas[] = [];
          for (const key in infoByAnio) {
              const anio = parseInt(key);
              const cuotas = infoByAnio[key];
              const cantidadCuotas = cuotas.length; 
  
              listaAnios.push({ anio, cuotas, cantidadCuotas });
          }
  
        
          return listaAnios;
        };
        
        // Llamar a la función y almacenar el resultado en una variable
  
      // verifica que haya alguna deuda seleccionada y que se haya 
      // elegido algun metodo de pago antes de pagar
      const imprimirPDF = async() => {
          if(!selected.length){
              setError({...error,cuota:true})
              console.log('no se selecciono ninguna cuota')
          }
              const cunica = selected.map(item => parseInt(item.cunica));
              const cuenta = (updateInfo as UpdateInfo).cuenta;
              //! cambiar a una fecha dinamica
              const vencimiento = new Date();
              const data = {
                  cuenta,
                  vencimiento,
                  cunica
              }
              // console.log('Imprimir pdf',{cunica})
  
              // makePost('/inmuebles/imprimirRecibo',{cuenta,vencimiento,cunica}, user?.token, 'pdf' );
              // setError({...error,pago:false});
              console.log('pidiendoPdf',data);
              let response = await fetch(`https://backend.tramites.lacosta.gob.ar/inmuebles/ImprimirRecibo`,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${user?.token}`,
              },
              body: JSON.stringify(data),
          })
          const datos = await response.json();
          console.log('respuesta del back', datos)
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
                    MIS SEPULTURAS
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
                                renderItem={({item}) => <RowAnios item={item}  anios={anios} setAnios={setAnios} toggleCuota={toggleCuota} selected={selected} setSelected={setSelected}/>}
                                keyExtractor={(item,index) => ` ${index}`}
                                nestedScrollEnabled={true}
                            />
                        </Box>
                        <Box mt={2} py={1} bg={'gray.300'} flexDirection={'row'} justifyContent={'flex-end'}>
                                <Text  fontSize={R16} fontWeight={'bold'}>
                                    TOTAL A PAGAR
                                </Text>
                                <Text width={"27%"} textAlign={'center'}  fontSize={R16} fontWeight={'bold'}>
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
                    <Button py={1} width={'45%'} background={background} borderRadius={50} onPress={()=> navigation.navigate('FormularioPagos')}>
                            <Text fontWeight={'bold'} textAlign={'center'} fontSize={R13}>PAGAR CON TARJETA DE CRÉDITO / DÉBITO</Text>
                        </Button>
                        <Button py={1} width={'45%'} background={background} borderRadius={50} onPress={()=>imprimirPDF()}>
                            <Text fontWeight={'bold'} textAlign={'center'} fontSize={R13}>DESCARGAR / IMPRIMIR RECIBO PARA PAGO</Text>
                        </Button>
                  </Box>
                       
                </Box>      
            </Box>
    )
    }
