import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { Box, Center, Text } from 'native-base'
import React from 'react'



export const DrawerMenu = ({navigation}:DrawerContentComponentProps) => {
  return (
    <Box>
        <Center>
            <Text>
                menu
            </Text>
        </Center>
    </Box>
  )
}
