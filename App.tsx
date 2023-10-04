import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { NativeBaseProvider} from "native-base";
import { UserProvider } from './src/context/usuario/UserProvider';
import SplashScreen from 'react-native-splash-screen'
import { DatosProvider } from './src/context/datos/DatosProvider';

export const background = '#3cb4ec'

const UserState = ({children}:any) =>{
  return(
    <UserProvider>
      {children}
    </UserProvider>
  )
}

const DatosState = ({children}:any) =>{
  return(
    <DatosProvider>
      {children}
    </DatosProvider>
  )
}

export const App = () => {

  useEffect(() => {
   SplashScreen.hide()
  }, [])
  

  return (
    <NativeBaseProvider>
       <UserState>
          <DatosProvider>
            <NavigationContainer>
                <StackNavigation/>
            </NavigationContainer>
          </DatosProvider>
       </UserState>
    </NativeBaseProvider>
  )
};


