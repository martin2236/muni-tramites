import { Box, Checkbox, Text } from 'native-base'
import React from 'react'

export const RowSix = () => {
  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                               
                                <Text textAlign={'center'} fontSize={10}>
                                    06/2022
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={10} >
                                15/07/2022
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'} >
                            <Text textAlign={'center'} fontSize={10} >
                                pago
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