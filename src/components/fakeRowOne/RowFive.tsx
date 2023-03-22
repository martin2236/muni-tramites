import { Box, Checkbox, Text } from 'native-base'
import React from 'react'

export const RowFive = () => {
  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} justifyContent={'space-around'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' defaultIsChecked={true} accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={12}>
                                    05/2022
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={12} >
                                15/06/2022
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
