import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Box, Text} from 'native-base';
import { LoginScreen } from '../screens/LoginScreen';
import { DrawerNavigation } from './DrawerNavigation';
import { InmuebleScreen } from '../screens/inmuebleScreeens/InmuebleScreen';
import { VehiculoScreen } from '../screens/vehiculosScreen/VehiculoScreen';
import { ComercioScreen } from '../screens/comercioScreens/ComercioScreen';
import { CementerioScreen } from '../screens/cementerioScreens/CementerioScreen';
import { ObrasPrivadasScreen } from '../screens/obrasPrivadasScreens/ObrasPrivadasScreen';
import { EscribanosScreen } from '../screens/escribanosScreens/EscribanosScreen';
import { IconRouteTitle } from '../components/IconRouteTitle';
import { CrearInmueble } from '../screens/inmuebleScreeens/CrearInmueble';
import { VerInmueble } from '../screens/inmuebleScreeens/VerInmueble';
import { CarouselScreen } from '../screens/CarouselScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export type RootStackParams = {
    Login:undefined,
    Home:undefined,
    Inmueble:undefined,
    Vehiculo:undefined,
    Comercio:undefined,
    Carousel:undefined,
    Cementerio:undefined,
    ObrasPrivadas:undefined,
    Escribanos:undefined,
    CrearInmueble:undefined
    VerInmueble:undefined,
    Registro:undefined
}

const Stack = createStackNavigator<RootStackParams>();
const user = null;

export const StackNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerStyle:{
            backgroundColor:'#2596be'
        },
        headerTintColor:'#ffffff',
        headerTitleAlign:'center'
    }}
    >       
            <Stack.Screen name="Carousel" options={{headerShown:false}} component={CarouselScreen}/>
            <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />
            <Stack.Screen name="Home" options={{headerShown:false}} component={DrawerNavigation}/>
            <Stack.Screen name="Registro" options={{headerTitle:'Registro'}} component={RegisterScreen}/>
            <Stack.Screen name="Inmueble" options={{headerTitle:()=>(<IconRouteTitle icono='home-city' titulo={'INMUEBLE'}/>)}} component={InmuebleScreen}/>
            <Stack.Screen name="CrearInmueble" options={{headerTitle:()=>(<IconRouteTitle icono='home-city' titulo={'INMUEBLE'}/>)}} component={CrearInmueble}/>
            <Stack.Screen name="VerInmueble" options={{headerTitle:()=>(<IconRouteTitle icono='home-city' titulo={'INMUEBLE'}/>)}} component={VerInmueble}/>
            <Stack.Screen name="Vehiculo" options={{headerTitle:()=>(<IconRouteTitle icono='car-side' titulo={'VEHICULO'}/>)}} component={VehiculoScreen}/>
            <Stack.Screen name="Comercio" options={{headerTitle:()=>(<IconRouteTitle icono='file-document' titulo={'COMERCIO'}/>)}} component={ComercioScreen}/>
            <Stack.Screen name="Cementerio" options={{headerTitle:()=>(<IconRouteTitle icono='grave-stone' titulo={'CEMENTERIO'}/>)}} component={CementerioScreen}/>
            <Stack.Screen name="ObrasPrivadas" options={{headerTitle:()=>(<IconRouteTitle icono='paperclip' titulo={'OBRAS PRIVADAS'}/>)}} component={ObrasPrivadasScreen}/>
            <Stack.Screen name="Escribanos" options={{headerTitle:()=>(<IconRouteTitle icono='scale-balance' titulo={'ESCRIBANOS'}/>)}} component={EscribanosScreen}/>
    </Stack.Navigator>
  );
}