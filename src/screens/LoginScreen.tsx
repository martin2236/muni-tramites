import React,{useState, useEffect} from 'react'
import { Text, Box, Image, Divider, Button, ScrollView} from 'native-base'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
const logo = require('../assets/loginLogo.png');
import { Formik } from 'formik';
import { CustomInput } from '../components/CustomInput';
import { loginSchema } from '../schemas/ValidationSchema';
import { useFetch } from '../hooks/useFetch';

interface Props extends StackScreenProps<RootStackParams,'Login'>{}

interface Login {
    cuit:string,
    clave:string
}

export const LoginScreen = ({navigation}:Props) => {

    
    const onLogin = (values : Login) =>{
        console.log('se hizo login');
        navigation.navigate('Home');
    }

  return (
    <Box flex={1} backgroundColor={'#2596be'} flexDirection={'column'} justifyContent={'space-around'}>
        <Image mt={10} alignSelf={'center'} source={logo} alt='logo'/>
        <ScrollView mt={10}>
        <Box width={230} alignSelf={'center'}>
            <Text fontSize={32} fontWeight={'bold'} textAlign={'center'} color={'#763E96'} lineHeight={'sm'}>
                PORTAL DE TRÁMITES
            </Text>
            <Divider background={'white'} height={'0.5'}/>
            <Text textAlign={'center'} color={'#763E96'}>
                Secretaria de Recursos Públicos Dirección de Informática
            </Text>
        </Box>
        <Box width={'80%'} mt={5} alignSelf={'center'} backgroundColor={'#2596be'}>
            <Formik
                initialValues={{ cuit: '', clave:'' }}
                validationSchema={loginSchema}
                validateOnChange={false}
                onSubmit={onLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                    <CustomInput
                        handleChange={handleChange}
                        errors={errors}
                        value={values.cuit}
                        placeholder={'CUIT/CUIL'}
                        keyboardType={'numeric'}
                        type={'cuit'}
                        errorCheck={errors.cuit}
                    />
                    <CustomInput
                        handleChange={handleChange}
                        errors={errors}
                        value={values.clave}
                        placeholder={'CONTRASEÑA'}
                        type={'clave'}
                        errorCheck={errors.clave}
                        margin={5}
                    />
                   
                    <Text 
                        mt={1} 
                        textAlign={'center'}
                        fontSize={12} 
                        color={'white'}>
                            OLVIDÉ MI CONTRASEÑA
                    </Text>
                    <Button 
                        onPress={() => handleSubmit()}
                        height={'12'}
                        mt={5}
                        borderRadius={'3xl'}
                        backgroundColor={'#763E96'}>
                        <Text 
                            color={'white'} 
                            fontWeight={'bold'}>
                                INGRESAR
                            </Text>        
                    </Button>
                    <Button 
                        onPress={() => navigation.navigate('Registro')}
                        height={'12'}
                        mt={3}
                        borderRadius={'3xl'}
                        backgroundColor={'#763E96'}>
                        <Text 
                            color={'white'} 
                            fontWeight={'bold'}>
                                REGISTRARSE
                            </Text>        
                    </Button>
                </>
            )}
            </Formik>
        </Box>
        </ScrollView>
    </Box>
  )
}
