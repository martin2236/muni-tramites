import React,{useContext} from 'react';
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
import { PagoScreen } from '../screens/PagoScreen';
import { Deuda } from '../interfaces/inmuebles/deuda';
import { VerComercioScreen } from '../screens/comercioScreens/VerComercioScreen';
import { VerCementerioScreen } from '../screens/cementerioScreens/VerCementerioScreen';
import { FormularioPagos } from '../screens/FormularioPagos';
import { EditarReferenciaScreen } from '../screens/EditarReferenciaScreen';
import { MediosPagosScreen } from '../screens/MediosPagoScreen';
import { ContactoScreen } from '../screens/ContactoScreen';
import { ContraseñaScreen } from '../screens/ContraseñaScreen';
import { NotificacionesScreen } from '../screens/NotificacionesScreen';
import { OficinasScreen } from '../screens/OficinasScreen';
import { CrearComercioScreen } from '../screens/comercioScreens/CrearComercioScreen';
import { CrearCementerioScreen } from '../screens/cementerioScreens/CrearCementerioScreen';
import { VerVehiculo } from '../screens/vehiculosScreen/verVehiculo';
import { UserContext } from '../context/usuario/Usercontext';

export type RootStackParams = {
    Login:undefined,
    Main:undefined,
    Pagos:undefined,
    Inmueble:undefined,
    Contacto:undefined,
    Contraseña:undefined,
    MediosPago:undefined,
    Notificaciones:undefined,
    Oficinas:undefined,
    VerInmueble: {  referencia: string; id:number; ruta:string; updateInfo:object; deuda:any},
    Vehiculo:undefined,
    VerVehiculo: { deuda?: Deuda; referencia: string; ruta:string, id:number; updateInfo:object;},
    Comercio:undefined,
    VerComercio: { deuda?: Deuda; referencia: string; ruta:string, id:number; updateInfo:object;},
    Carousel:undefined,
    Cementerio:undefined,
    VerCementerio: { deuda?: Deuda;ruta:string, referencia: string; id:number; updateInfo:object;},
    CrearCementerio:undefined
    ObrasPrivadas:undefined,
    Escribanos:undefined,
    CrearInmueble:undefined,
    CrearComercio:undefined,
    FormularioPagos:undefined,
    EditarReferencia:{id:number,ruta:string, referencia:string ,updateInfo:object},
    Registro:undefined,
}

const Stack = createStackNavigator<RootStackParams>();
const user = null;

export const StackNavigation = () => {
  const {user} = useContext(UserContext)
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
      <Stack.Group>
        {
          !user ? 
          <>
            <Stack.Screen name="Carousel" options={{headerShown:false}} component={CarouselScreen}/>
            <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />
            <Stack.Screen name="Registro" options={{headerTitle:'Registro'}} component={RegisterScreen}/>
          </>
          :
          <>
           <Stack.Screen name="Main" options={{headerShown:false}} component={DrawerNavigation}/>
            <Stack.Screen name="Oficinas" options={{headerTitle:()=>(<IconRouteTitle icono='office-building-marker' titulo={'ATENCION AL CONTRIBUYENTE'}/>)}} component={OficinasScreen}/>
            <Stack.Screen name="Notificaciones" options={{headerTitle:'Notificaciones'}} component={NotificacionesScreen}/>
            <Stack.Screen name="Contraseña" options={{headerTitle:'Cambiar Contraseña'}} component={ContraseñaScreen}/>
            <Stack.Screen name="Contacto" options={{headerTitle:()=>(<IconRouteTitle icono='wechat' titulo={'CONTACTO'}/>)}} component={ContactoScreen}/>
            <Stack.Screen name="MediosPago" options={{headerTitle:()=>(<IconRouteTitle icono='card-bulleted' titulo={'MEDIOS DE PAGO'}/>)}} component={MediosPagosScreen}/>
            <Stack.Screen name="Pagos" options={{headerTitle:'Metodos de Pago'}} component={PagoScreen}/>
            <Stack.Screen name="FormularioPagos" options={{headerTitle:'Forma de Pago'}} component={FormularioPagos}/>
            <Stack.Screen name="Inmueble" options={{headerTitle:()=>(<IconRouteTitle icono='home' titulo={'INMUEBLE'}/>)}} component={InmuebleScreen}/>
            <Stack.Screen name="CrearInmueble" options={{headerTitle:()=>(<IconRouteTitle icono='home' titulo={'INMUEBLE'}/>)}} component={CrearInmueble}/>
            <Stack.Screen name="VerInmueble" options={{headerTitle:()=>(<IconRouteTitle icono='home' titulo={'INMUEBLE'}/>)}} component={VerInmueble}/>
            <Stack.Screen name="Vehiculo" options={{headerTitle:()=>(<IconRouteTitle icono='car' titulo={'VEHICULO'}/>)}} component={VehiculoScreen}/>
            <Stack.Screen name="VerVehiculo" options={{headerTitle:()=>(<IconRouteTitle icono='car' titulo={'VEHICULO'}/>)}} component={VerVehiculo}/>
            <Stack.Screen name="Comercio" options={{headerTitle:()=>(<IconRouteTitle icono='file-document' titulo={'COMERCIO'}/>)}} component={ComercioScreen}/>
            <Stack.Screen name="CrearComercio" options={{headerTitle:()=>(<IconRouteTitle icono='file-document' titulo={'COMERCIO'}/>)}} component={CrearComercioScreen}/>
            <Stack.Screen name="VerComercio" options={{headerTitle:()=>(<IconRouteTitle icono='file-document' titulo={'COMERCIO'}/>)}} component={VerComercioScreen}/>
            <Stack.Screen name="Cementerio" options={{headerTitle:()=>(<IconRouteTitle icono='bank' titulo={'CEMENTERIO'}/>)}} component={CementerioScreen}/>
            <Stack.Screen name="VerCementerio" options={{headerTitle:()=>(<IconRouteTitle icono='bank' titulo={'CEMENTERIO'}/>)}} component={VerCementerioScreen}/>
            <Stack.Screen name="CrearCementerio" options={{headerTitle:()=>(<IconRouteTitle icono='bank' titulo={'CEMENTERIO'}/>)}} component={CrearCementerioScreen}/>
            <Stack.Screen name="ObrasPrivadas" options={{headerTitle:()=>(<IconRouteTitle icono='paperclip' titulo={'OBRAS PRIVADAS'}/>)}} component={ObrasPrivadasScreen}/>
            <Stack.Screen name="EditarReferencia" options={{headerTitle:()=>(<IconRouteTitle icono='pencil' titulo={'EDITAR'}/>)}} component={EditarReferenciaScreen}/>
            <Stack.Screen name="Escribanos" options={{headerTitle:()=>(<IconRouteTitle icono='scale-balance' titulo={'ESCRIBANOS'}/>)}} component={EscribanosScreen}/>
          </>
        }   
       </Stack.Group>    
    </Stack.Navigator>
    );
}