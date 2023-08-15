import React from 'react'
import {Stack,VStack,HStack,Alert,Text, IconButton,CloseIcon} from 'native-base'

interface Props {
  status: string,
  title: string
  setAlert:React.Dispatch<React.SetStateAction<{
    status: string;
    title: string;
}>>
}

export const CustomAlert = ({status,title,setAlert}:Props) => {
      return <Stack space={3} w="100%" position={'absolute'} zIndex={200} top={-35}>
          <Alert w="100%" status={status}>
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="1" />
                      <Text fontSize="md" color="coolGray.800">
                        {title}
                      </Text>
                    </HStack>
                    <IconButton onPress={()=> setAlert({status:'',title:''})} variant="unstyled" _focus={{
                  borderWidth: 0
                }} icon={<CloseIcon size="3" />} _icon={{
                  color: "coolGray.600"
                }} />
                  </HStack>
                </VStack>
              </Alert>
        </Stack>
  
}
