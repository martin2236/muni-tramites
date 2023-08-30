import React from 'react'
import {Box, Text} from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { DrawerMenu } from '../components/DrawerMenu';
import { background } from '../../App';

export type RootDrawerParams = {
    Home:undefined,
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
        drawerStyle:{
            backgroundColor: '#FFFFFF',
        },
        headerStyle:{
            backgroundColor: background,
        },
        swipeEdgeWidth: 0,
        headerTintColor:'#ffffff',
        headerTitleAlign:'center'
    }}
        drawerContent={(props) => <DrawerMenu {...props}/>}
    >
      <Drawer.Screen name="Home" options={{unmountOnBlur:true,headerTitle:()=>(<Box flexDirection={'row'} alignItems={'center'}><Text fontSize={22} fontWeight={'bold'} color={'white'}>TRÁMITES</Text></Box>)}}  component={HomeScreen} />
    </Drawer.Navigator>
  );
}