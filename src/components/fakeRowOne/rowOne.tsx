import { Box, Checkbox, Text } from 'native-base'
import React from 'react'

export const RowOne = () => {
  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Box width={'24%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' defaultIsChecked={true} accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={10}>
                                    01/2023
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={10} >
                                15/02/2023
                            </Text>
                        </Box>
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'} >
                            <Text textAlign={'center'} fontSize={10} >
                                impago
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
