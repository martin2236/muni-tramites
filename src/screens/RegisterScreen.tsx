import React from 'react'
import { Box, Center, Text, Button,ScrollView } from 'native-base'
import { CustomInput } from '../components/CustomInput'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { Formik } from 'formik';
import { registerSchema } from '../schemas/ValidationSchema';
import { useFetch } from '../hooks/useFetch';

interface Props extends StackScreenProps<RootStackParams,'Registro'>{}
interface FormValues {
    nombre:string, 
    cuit?:number, 
    clave:string, 
    verificacion:string,
    mail:string, 
    tipo_cuit:string, 
    telefono?:string, 
    telefono_area:string, 
    celular:string, 
    celular_area:string, 
    celular_empresa:string,
    token?:string
}

export const RegisterScreen = ({navigation}:Props) => {

   const onRegister = (values:FormValues) => {
     navigation.navigate('Home')
   }
  return (
    <Box flex={1} alignItems={'center'}>
        <Center mt={10} width={'80%'}>
            <Formik
                    initialValues={{ nombre:'',mail:'', cuit:0, clave:'', verificacion:'', tipo_cuit:'', telefono:'', telefono_area:'', celular:'', celular_area:'', celular_empresa:'' }}
                    validationSchema={registerSchema}
                    validateOnChange={false}
                    onSubmit={onRegister}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                       <ScrollView
                        showsVerticalScrollIndicator={false}
                       >
                        <CustomInput
                                handleChange={handleChange}
                                errors={errors}
                                value={values.nombre}
                                placeholder={'NOMBRE'}
                                type={'nombre'}
                                errorCheck={errors.nombre}
                                margin={5}
                            />
                            <Box width={'100%'} flexDirection={'row'}>
                                <CustomInput
                                    width={'70%'}
                                    handleChange={handleChange}
                                    errors={errors}
                                    value={values.cuit}
                                    placeholder={'CUIT'}
                                    type={'cuit'}
                                    keyboardType={'numeric'}
                                    errorCheck={errors.cuit}
                                    margin={4}
                                />
                                <CustomInput
                                    width={'30%'}
                                    handleChange={handleChange}
                                    errors={errors}
                                    value={values.tipo_cuit}
                                    placeholder={'TIPO'}
                                    type={'tipo_cuit'}
                                    errorCheck={errors.tipo_cuit}
                                    margin={4}
                                />
                            </Box>
                            <CustomInput
                                handleChange={handleChange}
                                errors={errors}
                                value={values.clave}
                                placeholder={'CLAVE'}
                                type={'clave'}
                                errorCheck={errors.clave}
                                margin={4}
                            />
                            <CustomInput
                                handleChange={handleChange}
                                errors={errors}
                                value={values.verificacion}
                                placeholder={'VERIFICAR CLAVE'}
                                type={'verificacion'}
                                errorCheck={errors.verificacion}
                                margin={4}
                            />
                            <CustomInput
                                handleChange={handleChange}
                                errors={errors}
                                value={values.mail}
                                placeholder={'EMAIL'}
                                type={'mail'}
                                errorCheck={errors.mail}
                                keyboardType={'email-address'}
                                margin={4}
                            />
                            
                            <Box width={'100%'} flexDirection={'row'}>
                                <CustomInput
                                    width={'30%'}
                                    handleChange={handleChange}
                                    errors={errors}
                                    value={values.telefono_area}
                                    placeholder={'COD'}
                                    type={'telefono_area'}
                                    errorCheck={errors.telefono_area}
                                    margin={3}
                                />
                                <CustomInput
                                    width={'70%'}
                                    handleChange={handleChange}
                                    errors={errors}
                                    value={values.telefono}
                                    placeholder={'TELEFONO'}
                                    type={'telefono'}
                                    errorCheck={errors.telefono}
                                    margin={4}
                                />
                            </Box>
                            <Box width={'100%'} flexDirection={'row'}>
                            <CustomInput
                                width={'30%'}
                                handleChange={handleChange}
                                errors={errors}
                                value={values.celular_area}
                                placeholder={'COD'}
                                type={'celular_area'}
                                errorCheck={errors.celular_area}
                                margin={4}
                            />
                            <CustomInput
                                width={'70%'}
                                handleChange={handleChange}
                                errors={errors}
                                value={values.celular}
                                placeholder={'CELULAR'}
                                type={'celular'}
                                errorCheck={errors.celular}
                                margin={4}
                            />
                            </Box>
                            <CustomInput
                                handleChange={handleChange}
                                errors={errors}
                                value={values.celular_empresa}
                                placeholder={'EMPRESA DE CELULAR'}
                                type={'celular_empresa'}
                                errorCheck={errors.celular_empresa}
                                margin={4}
                            />
                            
                            <Button 
                                width={'100%'}
                                onPress={() => handleSubmit()}
                                height={'12'}
                                mt={8}
                                borderRadius={'3xl'}
                                backgroundColor={'#763E96'}>
                                <Text 
                                    color={'white'} 
                                    fontWeight={'bold'}>
                                        REGISTRARSE
                                    </Text>        
                            </Button>
                       </ScrollView>
                    </>
                )}
                </Formik>
        </Center>
    </Box>
  )
}
