import React from 'react'
import { Center, Text, Box, Image, Divider, Input, Button} from 'native-base'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
const logo = require('../assets/loginLogo.png');

interface Props extends StackScreenProps<RootStackParams,'Login'>{}

export const LoginScreen = ({navigation}:Props) => {
    const onLogin = () => {
        navigation.navigate('Home')
    }
  return (
    <Box style={{flex:1, backgroundColor:'#2596be'}}>
        <Image height={200} width={200} alignSelf={'center'} source={logo} alt='logo'/>
        <Box width={210} alignSelf={'center'} mb={10}>
            <Text fontSize={32} fontWeight={'bold'} textAlign={'center'} color={'white'}>
                PORTAL DE TRÁMITES
            </Text>
            <Divider background={'purple.800'} height={'0.5'}/>
            <Text textAlign={'center'} color={'white'}>
                Secretaria de Recursos Públicos Dirección de Informática
            </Text>
        </Box>
        <Box width={'80%'} alignSelf={'center'} mt={10}>
            <Input
                borderRadius={'3xl'}
                backgroundColor={'white'}
                placeholder='CUIT'
                placeholderTextColor={'black'}
                textAlign={'center'}
                fontSize={18}
            />
            <Input
                mt={3}
                borderRadius={'3xl'}
                backgroundColor={'white'}
                placeholder='CONTRASEÑA'
                placeholderTextColor={'black'}
                textAlign={'center'}
                fontSize={18}
            />
            <Text 
                mt={1} 
                textAlign={'center'}
                fontSize={12} 
                color={'white'}>
                    OLVIDÉ MI CONTRASEÑA
            </Text>
            <Button 
                onPress={() => onLogin()}
                height={'12'}
                mt={5}
                borderRadius={'3xl'}
                backgroundColor={'purple.800'}>
                <Text 
                    color={'white'} 
                    fontWeight={'bold'}>
                        INGRESAR
                    </Text>        
            </Button>
        </Box>
    </Box>
  )
}
