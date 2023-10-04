import { Formik } from 'formik'
import { Alert, Box, Button, Center, Divider, Input, Text } from 'native-base'
import React, { useEffect, useContext, useState } from 'react'
import { CustomInputForm } from '../../components/CustomInputForm'
import { UserContext } from '../../context/usuario/Usercontext'
import { useFetch } from '../../hooks/useFetch'
import { AgregarInmuebleSchema } from '../../schemas/ValidationSchema'
import { useResponsiveSize } from '../../hooks/useResponsiveSize'
import { background } from '../../../App'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigation'
import { DatosContext } from '../../context/datos/DatosContext'

interface Props extends StackScreenProps<RootStackParams,'CrearCementerio'>{}

interface NuevoInmueble{
    padron:string,
    descripcion:string
}
interface Data {
    estado: boolean;
    msj:    string;
}


export const CrearCementerioScreen = ({navigation,route}:Props) => {

    const {cementerios} = route.params;
    const {makePost, data} = useFetch();
    const {user} = useContext(UserContext);
    const {R14} = useResponsiveSize();
    const {traerCementerios} = useContext(DatosContext);
    const [registrados, setRegistrados] = useState([])
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

   useEffect(() =>{
    //! revisar el dato del cementerio
    const vehiculosRegistrados = cementerios.map((vehiculo:any) => vehiculo.partida) 
    setRegistrados(vehiculosRegistrados)
   },[cementerios])

    useEffect(() => {
        // convierte peticion de null a un objeto
        let peticion;
        if(!data){
            peticion = {};
            return
        };
        peticion = data;

        //si el back responde con un objeto con la propiedad cementerios se guardo
        if(peticion.cementerios){
            setAlert({
                status:'success',
                title:'VEHICULO agregado con Éxito'
            })
            traerCementerios();
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

    const crearCementerio = ( values: NuevoInmueble, resetForm:any) => {
        //! revisar los valores del filtro
        const vehiculoExistente = registrados.find(item => item == values.padron)
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
            padron: values.padron,
            descripcion: values.descripcion
        }
        makePost('/cementerios', datos, user?.token,'cementerios');
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
                <Text
                    mt={7}
                    alignSelf={'center'}
                    fontWeight={'bold'} 
                    fontSize={20}>
                    AGREGAR SEPULTURA
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
                        onSubmit={crearCementerio}
                        validationSchema={AgregarInmuebleSchema}
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
