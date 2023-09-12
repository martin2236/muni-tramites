import React,{useEffect,useState, useContext} from 'react';
import { Text, Box, Image, Divider, Button, ScrollView,Center,Spinner} from 'native-base';
import {KeyboardAvoidingView} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
const logo = require('../assets/loginLogo.png');
import { Formik } from 'formik';
import { CustomInput } from '../components/CustomInput';
import { loginSchema } from '../schemas/ValidationSchema';
import { useFetch } from '../hooks/useFetch';
import { Dimensions, Platform } from 'react-native';
import { User, UserContext } from '../context/usuario/Usercontext';
import { background } from '../../App';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import { CustomAlert } from '../components/CustomAlert';

const {width} = Dimensions.get('window');

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
    const {R12,R15, R32, customInputHeight, loginImageWidth, LoginImageHeight} = useResponsiveSize();
    const {makePost, data, cargando, setCargando} = useFetch();

    const [alert,setAlert] = useState({
        status:'',
        title:''
    });

    const {setUser} = useContext(UserContext);

    useEffect(() => {
        if(data != undefined && data.user){
            console.log('Respuesta del backend',data)
            const usuario = {
                ...(data as LoginReq).user[0], token:(data as LoginReq).token
            };
            if(usuario){
                setUser(usuario);
            };
        }else if(data != undefined && data.status){
            setAlert({
                status:data.status,
                title:'los datos de la cuenta no coinciden'
            })
            setTimeout(() => {
                setAlert({
                    status:'',
                    title:''
                })
            }, 3000);
        }
    }, [data])
    
    const onLogin = (values : Login) =>{
        setCargando(true);
       makePost('/auth/login',{cuit:Number(values.cuit), clave:values.clave},undefined,'login');
    }

  return (
    <Box flex={1} backgroundColor={background} >
        {
            alert.status != '' && 
            <Box alignSelf={'center'} mt={10} width={'80%'}>
                <CustomAlert setAlert={setAlert} status={alert.status} title={alert.title}/>
            </Box>
        }
       <KeyboardAvoidingView keyboardVerticalOffset={60} style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
       <Box flex={2} display={'flex'} flexDirection={'column'} justifyContent={'space-around'} bg={background}>
            <Image style={{ width: loginImageWidth, height: LoginImageHeight }} resizeMode='contain' alignSelf={'center'} source={logo} alt='logo'/>
            <Box width={230} alignSelf={'center'} bg={background}>
            <Text fontSize={R32} fontWeight={'bold'} textAlign={'center'} color={'white'} lineHeight={'sm'}>
                PORTAL DE TRÁMITES
            </Text>
            <Divider background={'white'} height={'0.5'}/>
            <Text textAlign={'center'} fontSize={R15} color={'white'}>
                Secretaria de Recursos Públicos Dirección de Informática
            </Text>
        </Box>
        </Box>
        <Box flex={3} >
        {
                cargando ? 
                <Center  backgroundColor={background} mt={10}>
                    <Spinner mt={10} size={50} color={"white"}/>
                    <Text mt={8} fontWeight={'bold'} fontSize={22} alignSelf={'center'} color={'white'}>
                        Iniciando sesión
                    </Text>
                </Center>
                :
                <Formik
                initialValues={{ cuit: '', clave:'' }}
                validationSchema={loginSchema}
                validateOnChange={false}
                onSubmit={onLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <Box
                mt={10}
                flex={1}
                backgroundColor={background}
                display={'flex'}
                flexDir={'column'}
                justifyContent={'space-between'}
            >
                <Box
                    width={'80%'}
                    alignSelf={'center'}
                    backgroundColor={background}
                >
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
                   
                    <Button 
                        variant={'link'}
                        colorScheme={'white'}
                        onPress={() => navigation.navigate('OlvideContraseña')}
                        mt={1} 
                        fontSize={R12} >
                            <Text color={'white'}>OLVIDÉ MI CONTRASEÑA</Text>
                    </Button>
                    <Button 
                        onPress={() => handleSubmit()}
                        height={customInputHeight}
                        mt={5}
                        borderRadius={'3xl'}
                        backgroundColor={'gray.500'}>
                        <Text 
                            color={'white'} 
                            fontWeight={'bold'}>
                                INGRESAR
                            </Text>        
                    </Button>
                </Box>
                <Box 
                    width={'80%'}
                    alignSelf={'center'}
                    mb={1}
                >
                    <Divider alignSelf={'center'} background={'white'} height={'0.5'}/>
                    <Button 
                        onPress={() => navigation.navigate('Registro')}
                        height={customInputHeight}
                        mt={3}
                        mb={4}
                        borderRadius={'3xl'}
                        backgroundColor={'white'}>
                        <Text 
                            color={background} 
                            fontWeight={'bold'}>
                                REGISTRARSE
                            </Text>        
                    </Button>
                </Box>
            </Box>
            )}
            </Formik>
        }
        </Box>
       </KeyboardAvoidingView>
    </Box>
  )
}
