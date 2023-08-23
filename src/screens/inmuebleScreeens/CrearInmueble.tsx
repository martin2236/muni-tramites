import { Formik } from 'formik'
import { Box, Button, Center, Divider, Input, Text } from 'native-base'
import React, {useState, useEffect, useContext } from 'react'
import { CustomInputForm } from '../../components/CustomInputForm'
import { UserContext } from '../../context/usuario/Usercontext'
import { useFetch } from '../../hooks/useFetch'
import { AgregarInmuebleSchema } from '../../schemas/ValidationSchema'
import { DatosContext } from '../../context/datos/DatosContext'
import { CustomAlert } from '../../components/CustomAlert';

interface NuevoInmueble{
    cuenta:string,
    partida:string,
    descripcion:string
}
interface Data {
    estado: boolean;
    msj:    string;
}


export const CrearInmueble = () => {

    const {makePost, data} = useFetch()
    const {user} = useContext(UserContext);
    const {traerInmuebles} = useContext(DatosContext)
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

    useEffect(() => {
        console.log(data);
        if(data && data.inmuebles.estado){
            setAlert({
                status:'success',
                title:'Inmueble agregado con Éxito'
            })
            traerInmuebles();
        }
    }, [data]);

    
    

    const crearInmueble = ( values: NuevoInmueble) => {
        //d-vefi es los que viene en cuenta municipal despues del / ej:57464/0
        const cuenta = values.cuenta.slice(0,-1);
        const d_vefi = values.cuenta.charAt(values.cuenta.length - 1);
        let datos = {
            cuenta: Number(cuenta),
            d_vefi:Number(d_vefi),
            partida: Number(values.partida),
            descripcion: values.descripcion,
            titular: true
        }
        console.log('ESTOS SON LOS DATOS',datos)
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
                    width={'90%'}
                    alignSelf={'center'}
                >
                   <Formik
                        initialValues={{ cuenta:'', partida:'', descripcion:'' }}
                        validateOnChange={false}
                        onSubmit={crearInmueble}
                        validationSchema={AgregarInmuebleSchema}
                   >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <CustomInputForm
                                 handleChange={handleChange}
                                 errors={errors}
                                 value={values.cuenta}
                                 placeholder={'CUENTA MUNICIPAL'}
                                 type={'cuenta'}
                                 errorCheck={errors.cuenta}
                                 margin={5}
                            />

                            <CustomInputForm
                                 handleChange={handleChange}
                                 errors={errors}
                                 value={values.partida}
                                 placeholder={'PARTIDA'}
                                 type={'partida'}
                                 errorCheck={errors.partida}
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

                            <Button
                                onPress={()=> handleSubmit()}
                                mt={8}
                                borderRadius={'2xl'}
                                height={'8'}
                                width={'80%'}
                                backgroundColor={'gray.500'}
                                py={0}
                                px={8}
                            >
                                <Text
                                    color={'white'}
                                >GUARDAR DATOS</Text>
                            </Button>
                        </>
                    )}
                   </Formik>
                </Center>
        </Box>
    </Box>
  )
}
