import React, {type PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { NativeBaseProvider} from "native-base";

export const App = () => {


  return (
    <NativeBaseProvider>
        <NavigationContainer>
            <StackNavigation/>
        </NavigationContainer>
    </NativeBaseProvider>
  )
};


