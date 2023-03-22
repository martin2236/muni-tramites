import { Formik } from 'formik'
import { Alert, Box, Button, Center, Divider, Input, Text } from 'native-base'
import React, { useEffect, useContext } from 'react'
import { CustomInputForm } from '../../components/CustomInputForm'
import { UserContext } from '../../context/Usercontext'
import { useFetch } from '../../hooks/useFetch'
import { AgregarInmuebleSchema } from '../../schemas/ValidationSchema'

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

    useEffect(() => {
        console.log('crear inmueble data',data)
    }, [data])
    

    const crearInmueble = ( values: NuevoInmueble) => {
        let datos = {
            cuenta: Number(values.cuenta),
            d_vefi: 4,
            partida: Number(values.partida),
            descripcion: values.descripcion,
            titular: true
        }
        makePost('/inmuebles', datos, user?.token);
    }

  return (
    <Box flex={1} backgroundColor={'gray.200'}>
    <Divider backgroundColor={'purple.800'} height={'1.5'}/>
    <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'purple.600'} alignSelf={'center'}/>
        <Box 
            height={'100%'} 
            width={'90%'} 
            alignSelf={'center'} 
            backgroundColor={'white'}>
                <Text
                    mt={7}
                    alignSelf={'center'}
                    color={'purple.800'}
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
                                backgroundColor={'purple.800'}
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
