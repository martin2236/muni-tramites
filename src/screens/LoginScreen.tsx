import React,{useEffect, useContext} from 'react'
import { Text, Box, Image, Divider, Button, ScrollView, KeyboardAvoidingView, Spinner} from 'native-base'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
const logo = require('../assets/loginLogo.png');
import { Formik } from 'formik';
import { CustomInput } from '../components/CustomInput';
import { loginSchema } from '../schemas/ValidationSchema';
import { useFetch } from '../hooks/useFetch';
import { Dimensions } from 'react-native';
import { User, UserContext } from '../context/usuario/Usercontext';

const height = Dimensions.get('window').height;

interface Props extends StackScreenProps<RootStackParams,'Login'>{}

interface Login {
    cuit:string,
    clave:string
}
export interface LoginReq {
    user:  User[];
    token: string;
}

export const LoginScreen = ({navigation}:Props) => {

    const {makePost, data, cargando, setCargando} = useFetch()

    const {setUser} = useContext(UserContext)

    useEffect(() => {
        if(data){
            const usuario = {
                ...(data as LoginReq).user[0], token:(data as LoginReq).token
            };
            if(usuario){
                setUser(usuario);
                navigation.replace('Main');
            };
        } 
    }, [data])
    
    const onLogin = (values : Login) =>{
        setCargando(true);
       makePost('/auth/login',{cuit:Number(values.cuit), clave:values.clave});
    }

  return (
    <Box flex={1} backgroundColor={'#2596be'} flexDirection={'column'} justifyContent={'space-around'}>
       <KeyboardAvoidingView behavior='height'>
       <Image mt={10} alignSelf={'center'} source={logo} alt='logo'/>
        <Box height={height * 75 / 100}>
        <ScrollView mt={10} >
        <Box width={230} mb={5} alignSelf={'center'}>
            <Text fontSize={32} fontWeight={'bold'} textAlign={'center'} color={'white'} lineHeight={'sm'}>
                PORTAL DE TRÁMITES
            </Text>
            <Divider background={'white'} height={'0.5'}/>
            <Text textAlign={'center'} color={'white'}>
                Secretaria de Recursos Públicos Dirección de Informática
            </Text>
        </Box>
        <Box width={'80%'} mt={5} alignSelf={'center'} backgroundColor={'#2596be'}>
            {
                cargando ? 
                <Box backgroundColor={'#2596be'}>
                    <Spinner mt={10} size={50} color={"white"}/>
                    <Text mt={8} fontWeight={'bold'} fontSize={22} alignSelf={'center'} color={'white'}>
                        Iniciando sesión
                    </Text>
                </Box>
                :
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
                        backgroundColor={'gray.500'}>
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
                        backgroundColor={'gray.500'}>
                        <Text 
                            color={'white'} 
                            fontWeight={'bold'}>
                                REGISTRARSE
                            </Text>        
                    </Button>
                </>
            )}
            </Formik>
            }
        </Box>
        </ScrollView>
        </Box>
       </KeyboardAvoidingView>
    </Box>
  )
}
