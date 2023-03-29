import { Box, Checkbox, Text } from 'native-base'
import React from 'react'

export const RowFour = () => {
  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} justifyContent={'space-around'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                
                                <Text textAlign={'center'} fontSize={10}>
                                    04/2022
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={10} >
                                15/05/2022
                            </Text>
                        </Box>
                      
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={10} >
                                $3000
                            </Text>
                        </Box>
                    </Box>
  )
}
