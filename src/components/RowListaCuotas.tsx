import { Box, Checkbox, Text } from 'native-base'
import React,{useEffect, useState} from 'react'
import { Cuota } from '../../interfaces/inmuebles/deuda';

interface Props {
    item: any,
    cuota: Cuota[] | [],
    setCuotas: React.Dispatch<React.SetStateAction<[] | Cuota[]>>
}

export const RowListaCuotas = ({item,cuota ,setCuotas}:Props) => {
    

    const ordenarFecha = (fecha:string) => {
        if(fecha){
            const fechaArray = fecha.split('-');
        const dia = fechaArray[2].split('T')[0];
        return `${dia}/${fechaArray[1]}/${fechaArray[0]}`
        }
        return 'Sin fecha';
    }
    // checkbox onChange si es true setCuotas item si es false eliminar el item del estado
     const handleCheck = (value:boolean) => {
           
      if(value){
          setCuotas([...cuota as Cuota[], item as Cuota])
       }else{
            const newCuotas = cuota.filter((cuota:Cuota) => cuota.cuota !== item.cuota)
         setCuotas(newCuotas)
    }
}
useEffect(() => {
   console.log(cuota)
}, [cuota])
  return (
    <Box alignSelf={'center'} width={'95%'} mt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                    <Box width={'32%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Checkbox value='nuevo' onChange={ handleCheck } accessibilityLabel='algo'/>
                                <Text textAlign={'center'} fontSize={'sm'}>
                                    {ordenarFecha(item.fecha_pago)}
                                </Text>
                        </Box>
                        <Box width={'28%'} display={'flex'} alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={'sm'} >
                               {ordenarFecha(item.fecha_ven1)}
                            </Text>
                        </Box>
                        
                        <Box  width={'24%'} display={'flex'}  alignItems={'center'}>
                            <Text textAlign={'center'} fontSize={'sm'} >
                                {item.totalcuota.toFixed(2)}
                            </Text>
                        </Box>
                    </Box>
  )
}
