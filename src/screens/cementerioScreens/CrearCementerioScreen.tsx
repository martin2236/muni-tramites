import { Formik } from 'formik'
import { Alert, Box, Button, Center, Divider, Input, Text } from 'native-base'
import React, { useEffect, useContext } from 'react'
import { CustomInputForm } from '../../components/CustomInputForm'
import { UserContext } from '../../context/usuario/Usercontext'
import { useFetch } from '../../hooks/useFetch'
import { AgregarInmuebleSchema } from '../../schemas/ValidationSchema'

interface NuevoInmueble{
    padron:string,
    descripcion:string
}
interface Data {
    estado: boolean;
    msj:    string;
}


export const CrearCementerioScreen = () => {

    const {makePost, data} = useFetch()
    const {user} = useContext(UserContext);

    useEffect(() => {
        console.log('crear inmueble data',data)
    }, [data])
    

    const crearCementerio = ( values: NuevoInmueble) => {
        let datos = {
            cuenta: Number(values.padron),
            descripcion: values.descripcion,
        }
        makePost('/cementerios', datos, user?.token);
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
