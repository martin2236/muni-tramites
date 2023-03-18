import React, {type PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { NativeBaseProvider} from "native-base";
import { UserProvider } from './src/context/UserProvider';
import SplashScreen from 'react-native-splash-screen'

const AppState = ({children}:any) =>{
  return(
    <UserProvider>
      {children}
    </UserProvider>
  )
}

export const App = () => {
  return (
    <NativeBaseProvider>
       <AppState>
          <NavigationContainer>
              <StackNavigation/>
          </NavigationContainer>
       </AppState>
    </NativeBaseProvider>
  )
};


