import React,{useState, useEffect} from 'react'
import { Text, Box, Image, Divider, Button} from 'native-base'
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

    
    const onLogin = async (values : Login) =>{
        console.log('se hizo login');
        navigation.navigate('Home');
    }

  return (
    <Box style={{flex:1, backgroundColor:'#2596be'}}>
        <Image mt={'16'} mb={10}  alignSelf={'center'} source={logo} alt='logo'/>
        <Box width={210} alignSelf={'center'} mb={10}>
            <Text fontSize={32} fontWeight={'bold'} textAlign={'center'} color={'#763E96'} lineHeight={'sm'}>
                PORTAL DE TRÁMITES
            </Text>
            <Divider background={'white'} height={'0.5'}/>
            <Text textAlign={'center'} color={'#763E96'}>
                Secretaria de Recursos Públicos Dirección de Informática
            </Text>
        </Box>
        <Box width={'80%'} alignSelf={'center'} mt={10}>
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
    </Box>
  )
}
