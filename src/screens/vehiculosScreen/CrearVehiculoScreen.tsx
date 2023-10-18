import { Formik,useFormik } from 'formik';
import { Box, Button, Center, CheckIcon, Divider, Select, Text } from 'native-base';
import React, {useState, useEffect, useContext } from 'react';
import { CustomInputForm } from '../../components/CustomInputForm';
import { UserContext } from '../../context/usuario/Usercontext';
import { useFetch } from '../../hooks/useFetch';
import { AgregarVehiculoSchema } from '../../schemas/ValidationSchema';
import { DatosContext } from '../../context/datos/DatosContext';
import { CustomAlert } from '../../components/CustomAlert';
import { background } from '../../../App';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Dimensions } from 'react-native';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';

const {width} = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams,'CrearVehiculo'>{}

interface NuevoInmueble{
    dominio:string,
    tipo:string,
    descripcion:string
}
interface Data {
    estado: boolean;
    msj:    string;
}


export const CrearVehiculoScreen = ({navigation,route}:Props) => {
    const {vehiculos} = route.params;
    const {makePost, data} = useFetch();
    const {user} = useContext(UserContext);
    const {textoBoton,R18} = useResponsiveSize();
    const {traerVehiculos} = useContext(DatosContext);
    const [tipoVehiculo, setTipoVehiculo] = useState("");
    const [registrados, setRegistrados] = useState([])
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

   useEffect(() =>{
    //! revisar el dato del vehiculo
    const vehiculosRegistrados = vehiculos.map((vehiculo:any) => vehiculo.dominio.trim()) 
    setRegistrados(vehiculosRegistrados)
   },[vehiculos])

    useEffect(() => {
        // convierte peticion de null a un objeto
        let peticion;
        if(!data){
            peticion = {};
            return
        };
        peticion = data;

        //si el back responde con un objeto con la propiedad vehiculos se guardo
        if(peticion.vehiculos){
            setAlert({
                status:'success',
                title:'VEHICULO agregado con Éxito'
            })
            traerVehiculos();
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

    const crearVehiculo = ( values: NuevoInmueble, resetForm:any) => {
        const vehiculoExistente = registrados.find(item => item == values.dominio)
        if(vehiculoExistente){
            setAlert({
                status:'error',
                title:'el vehiculo ya se encuentra registrado'
            })
            setTimeout(() => {
                setAlert({
                    status:'',
                    title:''
                })
            }, 3000);
            return
        }
        let datos = {
            dominio: values.dominio,
            tipo:values.tipo,
            descripcion: values.descripcion,
        }
        makePost('/vehiculos', datos, user?.token,'vehiculos');
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
                    AGREGAR VEHICULOS
                </Text>
                <Center 
                    mt={5}
                    flex={1}
                    width={'90%'}
                    alignSelf={'center'}
                >
                   <Formik
                        initialValues={{ dominio:'', tipo:'', descripcion:''}}
                        validateOnChange={false}
                        onSubmit={(values, resetForm) => crearVehiculo(values, resetForm)}
                        validationSchema={AgregarVehiculoSchema}
                   >
                    {({ handleChange, setFieldValue, handleSubmit, values, errors }) => (
                        <Box flex={1}>
                            <Box flex={6} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>


                                    <Box >
                                        <CustomInputForm
                                                width={width * 0.85}
                                                handleChange={handleChange}
                                                errors={errors}
                                                value={values.dominio}
                                                placeholder={'DOMINIO'}
                                                type={'dominio'}
                                                keyboardType='default'
                                                errorCheck={errors.dominio}
                                                margin={5}
                                            />
                                    </Box>

                                    <Box width={'100%'} >
                                <Select selectedValue={tipoVehiculo} alignSelf={'center'} accessibilityLabel="Choose Service" 
                                    placeholder="TIPO  DE VEHICULO"
                                    textAlign={'center'}
                                    borderColor={'cyan.500'}
                                    borderRadius={'3xl'}
                                    backgroundColor={'white'}
                                    placeholderTextColor={'muted.400'}
                                    fontSize={R18}
                                    width={width * 0.85}
                                    marginTop={4}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => {
                                            setTipoVehiculo(itemValue);
                                            setFieldValue("tipo", itemValue);
                                        }}>
                                    <Select.Item label="VEHICULO PARTICULAR" value="auto" />
                                    <Select.Item label="MOTO" value="moto" />
                                    <Select.Item label="PUBLICO" value="publico" />
                                </Select>
                                {'tipo' in errors ? <Text ml={3} color={'red.500'}> {errors.tipo} </Text> : null} 
                                </Box>
                                    
                                    <Box>
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
