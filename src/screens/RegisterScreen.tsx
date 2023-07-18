import React, {useState,useEffect, useContext} from 'react'
import { Box, Center, Text, Button,ScrollView, Select, CheckIcon} from 'native-base'
import { CustomInput } from '../components/CustomInput'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { Formik } from 'formik';
import { registerSchema } from '../schemas/ValidationSchema';
import { useFetch } from '../hooks/useFetch';
import { UserContext } from '../context/usuario/Usercontext';

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
    const [service, setService] = useState("");
    const {setUser} = useContext(UserContext)
    const {makePost, data, cargando, setCargando} = useFetch()

   const onRegister = (values:FormValues) => {
    const{celular,celular_area,telefono,telefono_area,nombre,tipo_cuit,clave,mail,celular_empresa,cuit}= values;
    makePost('/auth/register',{cuit:Number(cuit),celular,celular_area,telefono,telefono_area,nombre,tipo_cuit,clave, mail,celular_empresa});
   }

   useEffect(() => {
    if(data){
        console.log('Respuesta del backend',data)
        const usuario = {
            ...data.user[0], token:data.token
        };
        if(usuario){
            setUser(usuario);
            navigation.replace('Main');
        };
    } 
}, [data])
  return (
    <Box flex={1} alignItems={'center'}>
        <Center mt={10} width={'80%'}>
            <Formik
                    initialValues={{ nombre:'',mail:'', cuit:0, clave:'', verificacion:'', tipo_cuit:'', telefono:'', telefono_area:'', celular:'', celular_area:'', celular_empresa:'' }}
                    validationSchema={registerSchema}
                    validateOnChange={false}
                    onSubmit={onRegister}
                >
                    {({ handleChange, setFieldValue, handleSubmit, values, errors }) => (
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
                                    width={'50%'}
                                    handleChange={handleChange}
                                    errors={errors}
                                    value={values.cuit}
                                    placeholder={'CUIT'}
                                    type={'cuit'}
                                    keyboardType={'numeric'}
                                    errorCheck={errors.cuit}
                                    margin={4}
                                />
                                <Box flex={1}>
                                <Select selectedValue={service} flex={1} accessibilityLabel="Choose Service" 
                                    placeholder="TIPO"
                                    textAlign={'center'}
                                    borderColor={'cyan.500'}
                                    borderRadius={'3xl'}
                                    backgroundColor={'white'}
                                    placeholderTextColor={'black'}
                                    fontSize={18}
                                    marginTop={4}
                                    marginLeft={4}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => {
                                            setService(itemValue);
                                            setFieldValue("tipo_cuit", itemValue);
                                        }}>
                                    <Select.Item label="FEMENINO" value="femenino" />
                                    <Select.Item label="MASCULINO" value="masculino" />
                                    <Select.Item label="EMPRESA" value="empresa" />
                                </Select>
                                {'tipo_cuit' in errors ? <Text ml={8} color={'red.500'}> {errors.celular_empresa} </Text> : null} 
                                </Box>
                              
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
                                    keyboardType='numeric'
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
                                    keyboardType='numeric'
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
                                keyboardType='numeric'
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
                                keyboardType='numeric'
                                margin={4}
                            />
                            </Box>
                            <Box>
                            <Select selectedValue={service} flex={1} accessibilityLabel="Choose Service" 
                                    placeholder="COMPAÑIA DE CELULAR"
                                    textAlign={'center'}
                                    borderColor={'cyan.500'}
                                    borderRadius={'3xl'}
                                    backgroundColor={'white'}
                                    placeholderTextColor={'black'}
                                    fontSize={18}
                                    marginTop={4}
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => {
                                            setService(itemValue);
                                            setFieldValue("celular_empresa", itemValue);
                                        }}>
                                    <Select.Item label="PERSONAL" value="personal" />
                                    <Select.Item label="MOVISTAR" value="movistar" />
                                    <Select.Item label="CLARO" value="claro" />
                                    <Select.Item label="TWENTI" value="twenti" />
                                </Select>
                                {'celular_empresa' in errors ? <Text ml={4} color={'red.500'}> {errors.celular_empresa} </Text> : null} 
                            </Box>
                            <Button 
                                width={'100%'}
                                onPress={() => handleSubmit()}
                                height={'12'}
                                mt={8}
                                borderRadius={'3xl'}
                                backgroundColor={'gray.500'}>
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
