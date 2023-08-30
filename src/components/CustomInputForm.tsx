import { FormikErrors } from 'formik/dist/types';
import { FormControl, Input, Text } from 'native-base'
import { ResponsiveValue } from 'native-base/lib/typescript/components/types/responsiveValue';
import React from 'react'
import { KeyboardTypeOptions } from 'react-native';

interface Props{
    handleChange:{
                    (e: React.ChangeEvent<any>): void;
                    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
                },
    errors:     FormikErrors<{}>,
    value:any
    placeholder:string,
    keyboardType?:KeyboardTypeOptions,
    type:string,
    errorCheck:string | undefined,
    margin?:number
    width?: ResponsiveValue<"px" | "0" | "sm" | "md" | "lg" | "xl" | "2xl" | (string & {}) | (number & {}) | "container" | "3xs" | "2xs" | "xs" | "0.5" | "1" | "1.5" | "2" | "2.5" | "3" | "3.5" | "4" | "5" | "6"  | "full">
}

export const CustomInputForm = ({handleChange, errors, value, placeholder,keyboardType, type, margin = 0 ,errorCheck, width = '100%'}:Props) => {
 
  return (
    <FormControl  width={width} isRequired isInvalid={type in errors}>
        <Input
            onChangeText={handleChange(type)}
            borderRadius={'2xl'}
            backgroundColor={'white'}
            placeholder={placeholder}
            keyboardType={keyboardType}
            textAlign={'center'}
            value={value}
            borderColor={'cyan.500'}
            fontSize={14}
            height={10}
            mt={margin}
        />
        {type in errors ? <Text ml={4} color={'red.500'}> {errorCheck} </Text> : null}  
    </FormControl>
  )
}
