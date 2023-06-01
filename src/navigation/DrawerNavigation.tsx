import React from 'react'
import {Box, Text} from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { DrawerMenu } from '../components/DrawerMenu';

export type RootStackParams = {
    Login:undefined,
    Home:undefined,
}

const Drawer = createDrawerNavigator<RootStackParams>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
        drawerStyle:{
            backgroundColor: '#FFFFFF',
        },
        headerStyle:{
            backgroundColor: '#2596be',
        },
        swipeEdgeWidth: 0,
        headerTintColor:'#ffffff',
        headerTitleAlign:'center'
    }}
        drawerContent={(props) => <DrawerMenu {...props}/>}
    >
      <Drawer.Screen name="Home" options={{headerTitle:()=>(<Box flexDirection={'row'} alignItems={'center'}><Text fontSize={22} fontWeight={'bold'} color={'white'}>TRÁMITES</Text></Box>)}} component={HomeScreen} />
    </Drawer.Navigator>
  );
}