import { Formik,useFormik } from 'formik';
import { Box, Button, Center, Divider, Text } from 'native-base';
import React, {useState, useEffect, useContext } from 'react';
import { CustomInputForm } from '../../components/CustomInputForm';
import { UserContext } from '../../context/usuario/Usercontext';
import { useFetch } from '../../hooks/useFetch';
import { AgregarInmuebleSchema } from '../../schemas/ValidationSchema';
import { DatosContext } from '../../context/datos/DatosContext';
import { CustomAlert } from '../../components/CustomAlert';
import { background } from '../../../App';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Dimensions } from 'react-native';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';

const {width} = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams,'CrearInmueble'>{}

interface NuevoInmueble{
    cuenta:string,
    partida:string,
    descripcion:string
    digito:number
}
interface Data {
    estado: boolean;
    msj:    string;
}


export const CrearInmueble = ({navigation,route}:Props) => {
    const {inmuebles} = route.params;
    const {makePost, data} = useFetch();
    const {user} = useContext(UserContext);
    const {textoBoton} = useResponsiveSize();
    const {traerInmuebles} = useContext(DatosContext);
    const [registrados, setRegistrados] = useState([])
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

   useEffect(() =>{
    if(inmuebles && inmuebles.lenght){
        const inmueblesRegistrados = inmuebles.map((inmueble:any) => inmueble.partida) 
        setRegistrados(inmueblesRegistrados)
    }
   },[inmuebles])

    useEffect(() => {
        let peticion;
        if(!data){
            peticion = {};
            return
        };
        peticion = data;
        if(peticion.inmuebles){
            setAlert({
                status:'success',
                title:'Inmueble agregado con Éxito'
            })
            traerInmuebles();
            setTimeout(() => {
                navigation.pop();
            }, 3000);
        }else{
            setAlert({
                status:peticion.status,
                title:peticion.title.message
            })
            setTimeout(() => {
                setAlert({
                    status:'',
                    title:''
                })
            }, 3000);
        }
    }, [data]);

    const crearInmueble = ( values: NuevoInmueble, resetForm:any) => {
        const inmuebleExistente = registrados.find(item => item == values.partida)
        if(inmuebleExistente){
            setAlert({
                status:'error',
                title:'el inmueble ya se encuentra registrado'
            })
            setTimeout(() => {
                setAlert({
                    status:'',
                    title:''
                })
            }, 3000);
            return
        }
        const cuenta = values.cuenta;
        const d_vefi = values.digito;
        let datos = {
            cuenta: Number(cuenta),
            d_vefi:Number(d_vefi),
            partida: Number(values.partida),
            descripcion: values.descripcion,
            titular: true
        }
        makePost('/inmuebles', datos, user?.token,'inmuebles');
    }

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
    <Divider backgroundColor={'gray.600'} height={'1.5'}/>
    <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.400'} alignSelf={'center'}/>
        <Box 
            height={'100%'} 
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
                {
                alert.status != '' && 
                <Box alignSelf={'center'} mt={10} width={'80%'}>
                    <CustomAlert setAlert={setAlert} status={alert.status} title={alert.title}/>
                </Box>
                }
                <Text
                    mt={7}
                    alignSelf={'center'}
                    fontWeight={'bold'} 
                    fontSize={20}>
                    AGREGAR INMUEBLES
                </Text>
                <Center 
                    mt={5}
                    flex={1}
                    width={'90%'}
                    alignSelf={'center'}
                >
                   <Formik
                        initialValues={{ cuenta:'', partida:'', descripcion:'',digito:0 }}
                        validateOnChange={false}
                        onSubmit={(values, resetForm) => crearInmueble(values, resetForm)}
                        validationSchema={AgregarInmuebleSchema}
                   >
                    {({ handleChange, resetForm, handleSubmit, values, errors }) => (
                        <Box flex={1}>
                            <Box flex={6} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
                                    <Box width={'100%'}  flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <CustomInputForm
                                            handleChange={handleChange}
                                            width={'58%'}
                                            errors={errors}
                                            value={values.cuenta}
                                            placeholder={'CUENTA MUNICIPAL'}
                                            type={'cuenta'}
                                            keyboardType='numeric'
                                            errorCheck={errors.cuenta}
                                            margin={5}
                                        />
                                        <Text fontSize={25} mt={5} mx={2}>
                                            /
                                        </Text>
                                        <CustomInputForm
                                            width={'30%'}
                                            handleChange={handleChange}
                                            errors={errors}
                                            value={values.digito}
                                            placeholder={'DIGITO'}
                                            type={'digito'}
                                            keyboardType='numeric'
                                            errorCheck={errors.digito}
                                            margin={5}
                                        />
                                    </Box>

                                    <Box >
                                        <CustomInputForm
                                                width={width * 0.85}
                                                handleChange={handleChange}
                                                errors={errors}
                                                value={values.partida}
                                                placeholder={'PARTIDA'}
                                                type={'partida'}
                                                keyboardType='numeric'
                                                errorCheck={errors.partida}
                                                margin={5}
                                            />
                                    </Box>
                                    
                                    <Box >
                                    <CustomInputForm
                                        width={width * 0.85}
                                        handleChange={handleChange}
                                        errors={errors}
                                        value={values.descripcion}
                                        placeholder={'DESCRIPCIÓN/NOMBRE DE REFERENCIA'}
                                        type={'descripcion'}
                                        errorCheck={errors.descripcion}
                                        margin={5}
                                    />
                                    </Box>
                            </Box>

                            <Box flex={1}>
                            <Button
                                onPress={()=> handleSubmit()}
                                mt={20}
                                position={'absolute'}
                                bottom={5}
                                alignSelf={'center'}
                                borderRadius={'2xl'}
                                height={'10'}
                                width={'70%'}
                                backgroundColor={background}
                                py={0}
                                px={8}
                            >
                                <Text
                                    fontSize={textoBoton}
                                    color={'white'}
                                >GUARDAR REGISTRO</Text>
                            </Button>
                            </Box>
                        </Box>
                    )}
                   </Formik>
                </Center>
        </Box>
    </Box>
  )
}
