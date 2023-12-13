import React, { useEffect, memo, useState, useContext} from 'react';
import { Divider, Box, Text, Pressable, Button, FlatList, Spinner } from 'native-base';
import RNFetchBlob from 'react-native-blob-util';

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
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { CustomAlert } from '../../components/CustomAlert';

async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Permisos de almacenamiento",
        message: "Esta App necesita acceso al almacenamiento para descargar PDFs.",
        buttonPositive: "Aceptar"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Storage permission granted");
    } else {
      console.log("Storage permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}


interface Props extends StackScreenProps<RootStackParams,'VerInmueble'>{}

interface CuotaAño {
    anio: number;
  }

interface AnioConCuotas {
anio: number;
cuotas: CuotaAño[];
cantidadCuotas:number
}
 

export const VerInmueble = memo(({navigation, route}:Props) => {
    const {user}= useContext(UserContext);
    const {R14,R16,R20} = useResponsiveSize();
    const {makePost,data} = useFetch();
    const [selected, setSelected] = useState<Cuota[]>([]);
    const [anios, setAnios] = useState<string[] | null>(null);
    const [totalSelected, setTotalSelected] = useState(0);
    const [listaAnios,setListaAnios] = useState<AnioConCuotas[] | []>([]);
    const [pdf, setPdf] = useState<boolean>(false);
    const [error, setError]= useState({
        pago: false,
        cuota:false
      });
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

    const {id,ruta, referencia, updateInfo,deuda} =  route.params;

        let editar = {
            id,
            ruta,
            deuda,
            referencia,
            updateInfo
        }

        useEffect(()=>{
            console.log('selected',selected)
        },[selected])

        useEffect(() => {
            if(anios){
                pagarPorAnios(anios);
            };
        },[anios])

        const toggleCuota = (cuota:Cuota) => {
            const index = selected.findIndex((item: Cuota) => item.cunica === cuota.cunica);
            let newSelected = [...selected];
    
            if (index !== -1) {
                newSelected.splice(index, 1);
                // If the cuota being removed has a tasa of 8
                if(cuota.tasa == '8'){
                    // Find the corresponding cuota with a tasa of 1
                    const indexTasa1 = newSelected.findIndex((item: Cuota) => item.cuota === cuota.cuota && item.tasa == '1');
                    // If found, remove it
                    if(indexTasa1 !== -1){
                        newSelected.splice(indexTasa1, 1);
                    }
                }
            } else {
                newSelected.push(cuota as Cuota);
                if(cuota.tasa == '1'){
                    const anio = listaAnios.filter((item) => {return Number(item.anio) == Number(cuota.anio)});
                    const tasa8 = anio[0].cuotas.filter((item : any) => item.tasa == '8' && item.cuota == cuota.cuota)
                    tasa8.length && newSelected.push(...tasa8);
                } 
            }
            const anosUnicos = new Set();
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
            const total = nuevaLista.reduce((acc:number,curr:Cuota)=> acc + curr['totalcuota'] ,0);
            setSelected(nuevaLista);
            setTotalSelected(total);
        }
    
        const infoByAnio:any = {};
        //organiza las deudas por año
   
        useEffect(() => {
            // Organiza las deudas por año
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

    // verifica que haya alguna deuda seleccionada y que se haya 
    // elegido algun metodo de pago antes de pagar
    const descargarPDF = async ()=>{
        if (!selected.length) {
            setError({ ...error, cuota: true });
        };
        setPdf(true)
        const cunica = selected.map(item => item.cunica);
        const cuenta = (updateInfo as UpdateInfo).cuenta;
        const data = {
            cuenta,
            cunica
        };
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('es-AR', { hour12: false, hour: '2-digit', minute: '2-digit' });
        const dateTimeStr = `${dateStr}-${timeStr}`;
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
            fileCache:true,
            addAndroidDownloads: {
            notification:true,
            title:`Comprobante de pago de inmuebles ${dateTimeStr}`,
            description: `Comprobante de pago de inmuebles`,
            mime: 'application/pdf',
            mediaScannable:true,
            },
            path: `${dirToSave}/comprobante de pago inmuebles ${dateTimeStr}.pdf`,
        }
        const configOptions = Platform.select({
            ios:{
                fileCache: configfb.fileCache,
                path: configfb.path,
                //@ts-ignore
                appendExt: 'pdf',
            },
            android: configfb,
        });
    
        RNFetchBlob.config(configOptions)
        .fetch('POST', `https://backend.tramites.lacosta.gob.ar/inmuebles/ImprimirRecibo`, {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
        }, JSON.stringify(data))
        .then((res) => {
            setPdf(false)
        })
        .catch((e) => {
            console.log('The file saved to ERROR', e.message)
            setPdf(false)
        });
    }
    const imprimirPDF = async () => {
        if(!selected.length){
           return setAlert({
                status:'error',
                title:'Seleccione alguna cuota antes de continuar'
            })
        }
        const cuenta = (updateInfo as UpdateInfo).cuenta;
        const data = {
            cuenta,
            selected
        }
        requestStoragePermission();
        descargarPDF();
    };

    const pagarCuotas = () => {
        if(!selected.length){
            console.log('algo')
           return setAlert({
                status:'error',
                title:'Seleccione alguna cuota antes de continuar'
            })
        }
        const cuenta = (updateInfo as UpdateInfo).cuenta;
        const data = {
            cuenta,
            selected,
            pantalla:"inmueble"
        }
        navigation.navigate('FormularioPagos',{data})
    }

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
            {
                alert.status != '' && 
                <Box alignSelf={'center'} mt={10} width={'80%'}>
                    <CustomAlert setAlert={setAlert} status={alert.status} title={alert.title}/>
                </Box>
            }
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
                       {(updateInfo as any).cuenta}
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
                        {(updateInfo as any).partida}
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
                            renderItem={({item}) => <RowAnios item={item} screen={"inmuebles"}  anios={anios} setAnios={setAnios} toggleCuota={toggleCuota} selected={selected} setSelected={setSelected}/>}
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
                <Button py={1} width={'45%'} background={background} borderRadius={50} onPress={()=> pagarCuotas()}>
                        <Text fontWeight={'bold'} textAlign={'center'} fontSize={R14}>PAGAR CON TARJETA DE CRÉDITO / DÉBITO</Text>
                    </Button>
                    <Button py={1} width={'45%'} background={background} borderRadius={50} onPress={()=>imprimirPDF()}>
                        <Text fontWeight={'bold'} textAlign={'center'} fontSize={R14}>DESCARGAR / IMPRIMIR RECIBO PARA PAGO</Text>
                    </Button>
              </Box>
                 {
                    pdf ? 
                    <Box position={'absolute'} zIndex={100} flexDir={'column'} justifyContent={'center'} height={'100%'} width={'100%'} backgroundColor={'#FFF'}>
                        <Spinner mb={5} size={80} color={background}/>
                        <Text fontSize={R20} mb={10} textAlign={'center'} color={background}>Descargando comprobante</Text>
                    </Box>
                    :
                    null
                 }
            </Box>
        </Box>
        )
    })
