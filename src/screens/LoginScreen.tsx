import React,{useState} from 'react'
import { Text, Box, Image, Divider, Input, Button, FormControl} from 'native-base'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
const logo = require('../assets/loginLogo.png');
import {instance} from '../connection/connection';
import { Formik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';

let loginSchema = object({
    cuit: 
    string()
    .required('Ingrese un numero de CUIT')
    .max(12,'El CUIT debe tener menos de 11 caracteres')
    ,
    contraseña: string().min(5,'La contraseña debe tener mas de 5 caracteres').required('ingrese una contraseña'),
  });


interface Props extends StackScreenProps<RootStackParams,'Login'>{}

interface Login {
    cuit:string,
    contraseña:string
}

export const LoginScreen = ({navigation}:Props) => {

    const [cuit, setCuit] = useState('')
    const [errors, setErrors] = useState({})

    const checkCuit = async () =>{
        let numberCuit = parseInt(cuit);
      try {
        const response = await instance.get(`users/controlCuit/${numberCuit}`);
        const data = await response.data
        console.log(data)
      } catch (error) {
        console.log(error)
      }  
    }
    const onLogin = async (values : Login) =>{
         
        // const res = await fetch(`https://backend.tramites.lacosta.gob.ar/users/controlCuit/20335970420` )
        // console.log(res.json())
        // const response = await instance.get(`users/controlCuit/${parseInt(values.cuit)}`)
        // console.log('response',response.data)
        // try {
        //     const response = await instance.post(`users/controlCuit/auth/login`,{cuit:parseInt(values.cuit),clave:values.contraseña});
        //     const data = await response.data
        //     console.log(data)
        //   } catch (error) {
        //     console.log(error)
        //   }  
         navigation.push('Comercio', );
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
                initialValues={{ cuit: '', contraseña:'' }}
                validationSchema={loginSchema}
                validateOnChange={false}
                onSubmit={onLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                    <FormControl isRequired isInvalid={'cuit' in errors}>
                        <Input
                            onChangeText={handleChange('cuit')}
                            borderRadius={'3xl'}
                            backgroundColor={'white'}
                            placeholder='CUIT/CUIL'
                            placeholderTextColor={'black'}
                            keyboardType={'numeric'}
                            value={values.cuit}
                            textAlign={'center'}
                            fontSize={18}
                        />
                        {'cuit' in errors ? <Text ml={4} color={'red.500'}> {errors.cuit} </Text> : null}  
                    </FormControl>
                    <FormControl isRequired isInvalid={'contraseña' in errors}>
                        <Input
                            mt={3}
                            onChangeText={handleChange('contraseña')}
                            borderRadius={'3xl'}
                            backgroundColor={'white'}
                            placeholder='CONTRASEÑA'
                            value={values.contraseña}
                            placeholderTextColor={'black'}
                            textAlign={'center'}
                            fontSize={18}
                        />
                        {'contraseña' in errors ? <Text ml={4} color={'red.500'}> {errors.contraseña}</Text> : null}
                        </FormControl>
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
                </>
            )}
            </Formik>
        </Box>
    </Box>
  )
}
