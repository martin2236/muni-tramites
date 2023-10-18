import { Formik } from 'formik'
import { Alert, Box, Button, Center, Divider, Input, Text } from 'native-base'
import React, { useEffect, useContext, useState } from 'react'
import { CustomInputForm } from '../../components/CustomInputForm'
import { UserContext } from '../../context/usuario/Usercontext'
import { useFetch } from '../../hooks/useFetch'
import { AgregarComercioSchema } from '../../schemas/ValidationSchema'
import { useResponsiveSize } from '../../hooks/useResponsiveSize'
import { background } from '../../../App'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigation'
import { DatosContext } from '../../context/datos/DatosContext'
import { CustomAlert } from '../../components/CustomAlert'

interface Props extends StackScreenProps<RootStackParams,'CrearComercio'>{}

interface NuevoInmueble{
    padron:string,
    descripcion:string
}
interface Data {
    estado: boolean;
    msj:    string;
}

export const CrearComercioScreen = ({navigation,route}:Props) => {

    const {comercios} = route.params;
    const {makePost, data} = useFetch();
    const {user} = useContext(UserContext);
    const {R14} = useResponsiveSize();
    const {traerComercios} = useContext(DatosContext);
    const [registrados, setRegistrados] = useState([])
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

   useEffect(() =>{
    //! revisar el dato del cementerio
    const comerciosRegistrados = comercios.map((comercio:any) => comercio.padron) 
    setRegistrados(comerciosRegistrados)
   },[comercios])

    useEffect(() => {
        // convierte peticion de null a un objeto
        let peticion;
        if(!data){
            peticion = {};
            return
        };
        peticion = data;

        //si el back responde con un objeto con la propiedad comercios se guardo
        if(peticion.comercios){
            setAlert({
                status:'success',
                title:'COMERCIO agregado con Éxito'
            })
            traerComercios();
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

    const crearComercio = ( values: NuevoInmueble, resetForm:any) => {
        //! revisar los valores del filtro
        const comercioExistente = registrados.find(item => item == Number(values.padron))
        if(comercioExistente){
            setAlert({
                status:'error',
                title:'el comercio ya se encuentra registrado'
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
            padron: Number(values.padron),
            descripcion: values.descripcion
        }
        console.log('creando comercio', datos)
        makePost('/comercios', datos, user?.token,'comercios');
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
                    AGREGAR COMERCIO
                </Text>
                <Center 
                    mt={5}
                    flex={1}
                    width={'90%'}
                    alignSelf={'center'}
                >
                   <Formik
                        initialValues={{ padron:'', descripcion:'' }}
                        validateOnChange={false}
                        onSubmit={crearComercio}
                        validationSchema={AgregarComercioSchema}
                   >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <CustomInputForm
                                 handleChange={handleChange}
                                 errors={errors}
                                 value={values.padron}
                                 placeholder={'PADRON'}
                                 type={'padron'}
                                 errorCheck={errors.padron}
                                 margin={5}
                            />

                            
                            <CustomInputForm
                                handleChange={handleChange}
                                errors={errors}
                                value={values.descripcion}
                                placeholder={'DESCRIPCIÓN/NOMBRE DE REFERENCIA'}
                                type={'descripcion'}
                                errorCheck={errors.descripcion}
                                margin={5}
                            />

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
                                        fontSize={R14}
                                        color={'white'}
                                    >GUARDAR REGISTRO</Text>
                                </Button>
                            </Box>
                        </>
                    )}
                   </Formik>
                </Center>
        </Box>
    </Box>
  )
}
