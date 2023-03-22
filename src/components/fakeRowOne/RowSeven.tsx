import { Box, Checkbox, Text } from 'native-base'
import React from 'react'

export const RowSeven = () => {
  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} justifyContent={'space-around'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                               
                                <Text textAlign={'center'} fontSize={12}>
                                    07/2022
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                15/08/2022
                            </Text>
                        </Box>
                        
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                $3000
                            </Text>
                        </Box>
                    </Box>
  )
}
