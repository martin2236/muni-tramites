import React,{useState,useEffect} from 'react';
import {Box,Center,Divider,Button,Spinner,ScrollView,Text} from 'native-base';
import { CustomAlert } from '../components/CustomAlert';
import { useFetch } from '../hooks/useFetch';
import { CustomInput } from '../components/CustomInput';
import {Formik} from 'formik';
import { olvideContraseñaSchema } from '../schemas/ValidationSchema';
import { background } from '../../App';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { KeyboardAvoidingView } from 'native-base';
import {Platform} from 'react-native';

interface Props extends StackScreenProps<RootStackParams,'OlvideContraseña'>{}

export const OlvideContraseña = ({navigation}:Props) => {
    const [service, setService] = useState("");
    const [alert,setAlert] = useState({
        status:'',
        title:''
    });
interface FormValues {
        cuit:string,
        clavevieja:string,
        clavenueva:string
    }
    const {makePut, data, cargando, setCargando} = useFetch()

    const onRegister = (values:FormValues) => {
        const{cuit,clavevieja,clavenueva}= values;
        const numero = Number(cuit);
        makePut('/users/changePassword',undefined,{cuit:Number(cuit),clavevieja,clavenueva});
    }

   useEffect(() => {
    console.log(data)
    if(data && !data.msj){
       setAlert({
        status:'error',
        title:'Ocurrió un error, por favor intente mas tarde'
       })
       setTimeout(() => {
        setAlert({
            status:'',
            title:''
        })
    }, 3000);
    }else if(data && data.msj){
        setAlert({
            status:'success',
            title:data.msj
        })
        setTimeout(() => {
            navigation.navigate('Login');
        }, 3000);
    }

}, [data])
return( 
  <Box flex={1} alignItems={'center'}>
        <Divider backgroundColor={'gray.600'} height={'1.5'}/>
        <Divider position={'absolute'} width={'90%'} height={'1.5'} backgroundColor={'gray.500'} alignSelf={'center'}/>
            <Box 
                height={'100%'} 
                width={'90%'} 
                backgroundColor={'white'}>
            
                {alert.status != '' &&  
                        <CustomAlert setAlert={setAlert} status={alert.status} title={alert.title}/>
                }
            
          <KeyboardAvoidingView  
            flex={1}
            keyboardVerticalOffset={60}
            behavior={Platform.OS == 'ios' ? 'padding' : undefined}
            >
          <Formik
                    initialValues={{ cuit:'', clavevieja:'', clavenueva:'' }}
                    validationSchema={olvideContraseñaSchema}
                    validateOnChange={false}
                    onSubmit={onRegister}
                >
                    {({ handleChange, setFieldValue, handleSubmit, values, errors }) => (
                    <ScrollView flex={1} width={'90%'} alignSelf={'center'} >
                       
                            
                            
                            <CustomInput
                                 
                                handleChange={handleChange}
                                errors={errors}
                                value={values.cuit}
                                placeholder={'CUIT'}
                                type={'cuit'}
                                errorCheck={errors.cuit}
                                keyboardType={'numeric'}
                                margin={10}
                            />
                            
                            
                                <CustomInput
                                    handleChange={handleChange}
                                    errors={errors}
                                    value={values.clavevieja}
                                    placeholder={'CLAVE ANTERIOR'}
                                    type={'clavevieja'}
                                    errorCheck={errors.clavevieja}
                                    keyboardType='default'
                                    margin={10}
                                />

                            <CustomInput
                            
                                handleChange={handleChange}
                                errors={errors}
                                value={values.clavenueva}
                                placeholder={'CLAVE NUEVA'}
                                type={'clavenueva'}
                                errorCheck={errors.clavenueva}
                                keyboardType='default'
                                margin={10}
                            />
                            <Button 
                                width={'100%'}
                                onPress={() => handleSubmit()}
                                height={'12'}
                                mt={8}
                                disabled={cargando}
                                borderRadius={'3xl'}
                                backgroundColor={background}>
                                    {
                                    cargando ? 
                                    <Box display={'flex'}  flexDirection={'row'} width={'100%'}>
                                        <Spinner size={20} color={'white'}/>
                                        <Text 
                                            ml={5} 
                                            color={'white'} 
                                            fontWeight={'bold'}>
                                                MODIFICANDO...
                                        </Text> 
                                    </Box>
                                    :
                                    <>
                                    <Text 
                                        color={'white'} 
                                        fontWeight={'bold'}>
                                           CAMBIAR CONTRASEÑA
                                    </Text>   
                                    </>
                                }      
                                      
                            </Button>
                    </ScrollView>
                )}
                </Formik>
          </KeyboardAvoidingView>
        </Box>
    </Box>
  )
}
